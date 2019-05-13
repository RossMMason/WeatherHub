﻿// <copyright file="DavisWeatherlinkFetcher.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Services
{
    using System;
    using System.Linq;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;
    using WeatherHub.Domain;
    using WeatherHub.Domain.Entities;
    using WeatherHub.Domain.Repositories;
    using WeatherHub.FrontEnd.Models;
    using WeatherHub.FrontEnd.Models.Weatherlink;

    public class DavisWeatherlinkFetcher
        : TimerBasedWeatherDataFetcher
    {
        private ILogger _logger;
        private WeatherStation _weatherStation;
        private IDbContext _dbContext;
        private IStationReadingRepository _stationReadingRepository;
        private IStationDayStatistics _stationDayStatisticsRepository;
        private TimeSpan _oneMinute = TimeSpan.FromMinutes(1);
        private string _user;
        private string _password;
        private FetcherSetting _apiToken;
        private int _pickupPeriod;
        private TimeZoneInfo _timeZone;
        private CancellationTokenSource _cancellationTokenSource;

        public DavisWeatherlinkFetcher(
            ILogger<DavisWeatherlinkFetcher> logger, 
            WeatherStation weatherStation,
            IDbContext dbContext,
            IStationReadingRepository stationReadingRepository,
            IStationDayStatistics stationDayStatisticsRepository)
            : base(logger)
        {
            _logger = logger;
            _weatherStation = weatherStation;
            _dbContext = dbContext;
            _stationReadingRepository = stationReadingRepository;
            _stationDayStatisticsRepository = stationDayStatisticsRepository;

            var user = _weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "User");
            var password = _weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "Password");
            var apiToken = _weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "ApiToken");
            var pickupPeriod = _weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "PickupPeriod");
            var timeZoneId = _weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "TimeZoneId");

            if (user == null)
            {
                _logger.LogError($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'User'.");
                throw new Exception($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'User'.");
            }

            if (password == null)
            {
                _logger.LogError($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'Password'.");
                throw new Exception($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'Password'.");
            }

            if (apiToken == null)
            {
                _logger.LogError($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'ApiKey'.");
                throw new Exception($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'ApiKey'.");
            }

            if (pickupPeriod == null)
            {
                _logger.LogError($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'PickupPeriod'.");
                throw new Exception($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'PickupPeriod'.");
            }

            if (timeZoneId == null)
            {
                _logger.LogError($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'TimeZoneId'.");
                throw new Exception($"Weather station with the Id: {_weatherStation.Id} does not provide a value for 'TimeZoneId'.");
            }

            if (!int.TryParse(pickupPeriod.Value, out _pickupPeriod)
                || _pickupPeriod < 1
                || _pickupPeriod > 60)
            {
                _logger.LogError($"'PickupPeriod' for weather station with Id: {_weatherStation.Id} could not be parsed. Should be an integer value from 1 to 60.");
                throw new Exception($"'PickupPeriod' for weather station with Id: {_weatherStation.Id} could not be parsed. Should be an integer value from 1 to 60.");
            }

            _timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId.Value);
            if (_timeZone == null)
            {
                _logger.LogError($"'TimeZoneId' for weather station with Id: {_weatherStation.Id} could not be parsed. For the UK use 'GMT Standard Time '");
                throw new Exception($"'TimeZoneId' for weather station with Id: {_weatherStation.Id} could not be parsed. For the UK use 'GMT Standard Time '");
            }

            _user = user.Value;
            _password = password.Value;
            _apiToken = apiToken;

            // We pickup at 1 minute past the period type to give the weather station time to generate the record.
            if (_pickupPeriod == 60)
            {
                ScheduleCollection(1);
            }
            else
            {
                var thisPeriod = 1;

                while (thisPeriod < 60)
                {
                    ScheduleCollection(thisPeriod);
                    thisPeriod += _pickupPeriod;
                }
            }
        }

        public override Task StartAsync()
        {
            _cancellationTokenSource = new CancellationTokenSource();
            return base.StartAsync();
        }

        public override Task StopAsync()
        {
            _cancellationTokenSource.Cancel();
            return base.StopAsync();
        }

        protected async override Task CollectWeatherAsync()
        {
            HttpResponseMessage httpResponse;

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    var requestUrl = $"https://api.weatherlink.com/v1/NoaaExt.json?user={_user}&pass={_password}&apiToken={_apiToken}";
                    httpResponse = await client.GetAsync(requestUrl);

                    if (!httpResponse.IsSuccessStatusCode)
                    {
                        _logger.LogError($"Could not query weather API. Response code was {httpResponse.StatusCode}");

                        // If response code indicates an error. Back off for one minute then try again.
                        ScheduleAddHockCollection(_oneMinute);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception trying to receive weather information from API.");

                // If we hit an exception. Back off for one minute then try again.
                ScheduleAddHockCollection(_oneMinute);
                return;
            }

            string responseBody = await httpResponse.Content.ReadAsStringAsync();
            var weatherStationInfo = JsonConvert.DeserializeObject<NoaaExtResult>(responseBody);

            // Station Reading
            StationReading receivedReading = weatherStationInfo.ToStationReading(_weatherStation);

            StationReading latestReading = await _stationReadingRepository.FetchLatestReadingAsync();
            if (latestReading.When != receivedReading.When)
            {
                _stationReadingRepository.Create(receivedReading);
            }

            // Station Day Statistics
            DateTime statisticsDate = TimeZoneInfo.ConvertTimeFromUtc(receivedReading.When, _timeZone).Date;
            StationDayStatistics latestDayStatistics = await _stationDayStatisticsRepository.FetchForDateAsync(statisticsDate);

            StationDayStatistics receivedStats = weatherStationInfo.CurrentObservation.ToStationDayStatistics(_weatherStation, statisticsDate);

            if (latestDayStatistics == null)
            {
                _stationDayStatisticsRepository.Create(receivedStats);
            }
            else
            {
                latestDayStatistics.DewpointHighC = receivedStats.DewpointHighC;
                latestDayStatistics.DewpointHighTime = receivedStats.DewpointHighTime;
                latestDayStatistics.DewpointLowC = receivedStats.DewpointLowC;
                latestDayStatistics.DewpointLowTime = receivedStats.DewpointLowTime;
                latestDayStatistics.HeatIndexHighC = receivedStats.HeatIndexHighC;
                latestDayStatistics.HeatIndexHighTime = receivedStats.HeatIndexHighTime;
                latestDayStatistics.PressureHighMbar = receivedStats.PressureHighMbar;
                latestDayStatistics.PressureHighTime = receivedStats.PressureHighTime;
                latestDayStatistics.PressureLowMbar = receivedStats.PressureLowMbar;
                latestDayStatistics.PressureLowTime = receivedStats.PressureLowTime;
                latestDayStatistics.RainRateHighCmPerHour = receivedStats.RainRateHighCmPerHour;
                latestDayStatistics.RelativeHumidityHigh = receivedStats.RelativeHumidityHigh;
                latestDayStatistics.RelativeHumidityLow = receivedStats.RelativeHumidityLow;
                latestDayStatistics.RelativeHumidyHighTime = receivedStats.RelativeHumidyHighTime;
                latestDayStatistics.RelativeHumidyLowTime = receivedStats.RelativeHumidyLowTime;
                latestDayStatistics.TempHighC = receivedStats.TempHighC;
                latestDayStatistics.TempHighTime = receivedStats.TempHighTime;
                latestDayStatistics.TempLowC = receivedStats.TempLowC;
                latestDayStatistics.TempLowTime = receivedStats.TempLowTime;
                latestDayStatistics.TotalRainCm = receivedStats.TotalRainCm;
                latestDayStatistics.WindChillLowC = receivedStats.WindChillLowC;
                latestDayStatistics.WindChillLowTime = receivedStats.WindChillLowTime;
                latestDayStatistics.WindHighMph = receivedStats.WindHighMph;
                latestDayStatistics.WindHighTime = receivedStats.WindHighTime;
                _stationDayStatisticsRepository.Update(latestDayStatistics);
            }

            await _dbContext.SaveChangesAsync(_cancellationTokenSource.Token);
        }
    }
}
