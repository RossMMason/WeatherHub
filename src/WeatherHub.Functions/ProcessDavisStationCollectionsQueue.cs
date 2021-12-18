// <copyright file="ProcessDavisStationCollectionsQueue.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Functions
{
    using System;
    using System.Linq;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using Azure.Storage.Queues;
    using Microsoft.AspNetCore.SignalR.Client;
    using Microsoft.Azure.Functions.Worker;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;
    using WeatherHub.Domain;
    using WeatherHub.Domain.Entities;
    using WeatherHub.Domain.Repositories;
    using WeatherHub.FrontEnd.Models;
    using WeatherHub.Models;
    using WeatherHub.Models.Weatherlink;

    public class ProcessDavisStationCollectionsQueue
    {
        private readonly ILogger<ProcessDavisStationCollectionsQueue> _logger;
        private readonly SignalRSettings _signalRSettings;
        private readonly IWeatherStationRepository _weatherStationRepository;
        private readonly IStationReadingRepository _stationReadingRepository;
        private readonly IStationDayStatisticsRepository _stationDayStatisticsRepository;
        private readonly IDbContext _dbContext;
        private readonly StorageQueueSettings _storageQueueSettings;

        public ProcessDavisStationCollectionsQueue(
            ILogger<ProcessDavisStationCollectionsQueue> logger,
            SignalRSettings signalRSettings,
            IWeatherStationRepository weatherStationRepository,
            IStationReadingRepository stationReadingRepository,
            IStationDayStatisticsRepository stationDayStatisticsRepository,
            IDbContext dbContext,
            StorageQueueSettings storageQueueSettings)
        {
            _logger = logger;
            _signalRSettings = signalRSettings;
            _weatherStationRepository = weatherStationRepository;
            _stationReadingRepository = stationReadingRepository;
            _stationDayStatisticsRepository = stationDayStatisticsRepository;
            _dbContext = dbContext;
            _storageQueueSettings = storageQueueSettings;
        }

        [Function("ProcessDavisStationCollectionsQueue")]
        public async Task Run(
            [QueueTrigger("davis-station-collections")] string queueItem)
        {
            // Queue item format is seperated by pipes: "[weather station ID]|[report epoch]|[collection attempt number]"
            string[] queueItemParts = queueItem.Split('|');

            if (!Guid.TryParse(queueItemParts[0], out Guid weatherStationId))
            {
                _logger.LogError($"Could not parse weather station id from queue item: '{queueItem}'.");
                return;
            }

            if (!DateTime.TryParse(queueItemParts[1], out DateTime reportEpoch))
            {
                _logger.LogError($"Could not parse report epoch from queue item: '{queueItem}'.");
                return;
            }

            if (!int.TryParse(queueItemParts[2], out int collectionAttemptNumber))
            {
                _logger.LogError($"Could not parse collection attempt number from queue item: '{queueItem}'.");
                return;
            }

            _logger.LogInformation($"Processing data collection for weather station: {weatherStationId}, report epoch: {reportEpoch:u}, collection attempt: {collectionAttemptNumber}");

            HttpResponseMessage httpResponse;

            WeatherStation weatherStation = await _weatherStationRepository.GetByIdAsync(weatherStationId);

            if (weatherStation == null)
            {
                _logger.LogError($"Could not find the weather station with id: {weatherStationId}.");
                return;
            }

            var userSetting = weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "User");
            var passwordSetting = weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "Password");
            var apiTokenSetting = weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "ApiToken");
            var pickupPeriodSetting = weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "PickupPeriod");
            var timeZoneIdSetting = weatherStation.FetcherSettings.SingleOrDefault(x => x.Key == "TimeZoneId");

            if (userSetting == null)
            {
                _logger.LogError($"Weather station with the Id: {weatherStation.Id} does not provide a value for 'User'.");
                return;
            }

            if (passwordSetting == null)
            {
                _logger.LogError($"Weather station with the Id: {weatherStation.Id} does not provide a value for 'Password'.");
                return;
            }

            if (apiTokenSetting == null)
            {
                _logger.LogError($"Weather station with the Id: {weatherStation.Id} does not provide a value for 'ApiKey'.");
                return;
            }

            if (pickupPeriodSetting == null)
            {
                _logger.LogError($"Weather station with the Id: {weatherStation.Id} does not provide a value for 'PickupPeriod'.");
                return;
            }

            if (timeZoneIdSetting == null)
            {
                _logger.LogError($"Weather station with the Id: {weatherStation.Id} does not provide a value for 'TimeZoneId'.");
                return;
            }

            var timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneIdSetting.Value);
            if (timeZone == null)
            {
                _logger.LogError($"'TimeZoneId' for weather station with Id: {weatherStationId} could not be parsed. For the UK use 'GMT Standard Time'");
            }

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    var requestUrl = $"https://api.weatherlink.com/v1/NoaaExt.json?user={userSetting.Value}&pass={passwordSetting.Value}&apiToken={apiTokenSetting.Value}";
                    httpResponse = await client.GetAsync(requestUrl);

                    if (!httpResponse.IsSuccessStatusCode)
                    {
                        _logger.LogError($"Could not query weather API for station with id: {weatherStationId}. Response code was {httpResponse.StatusCode}");
                        return;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Exception trying to receive weather information from API for weather station: {weatherStationId}");
                return;
            }

            string responseBody = await httpResponse.Content.ReadAsStringAsync();
            var weatherStationInfo = JsonConvert.DeserializeObject<NoaaExtResult>(responseBody);

            // Station Reading
            StationReading receivedReading = weatherStationInfo.ToStationReading(weatherStation);

            _logger.LogInformation($"Parsed reading for station: {weatherStationId} reading date: {receivedReading.When:u}.");

            // This is not the report we were looking for! Maybe queue another attempt?
            if (receivedReading.When != reportEpoch)
            {
                if (collectionAttemptNumber < 3)
                {
                    QueueClient queueClient = new (
                        _storageQueueSettings.StorageConnectionString,
                        "davis-station-collections",
                        new QueueClientOptions { MessageEncoding = QueueMessageEncoding.Base64 });

                    int nextCollectionNumber = collectionAttemptNumber + 1;
                    DateTime nextAttemptEpoch = reportEpoch.AddMinutes(nextCollectionNumber);
                    TimeSpan nextAttemptDelay = DateTime.UtcNow - nextAttemptEpoch;

                    // 1 here denotes the collection attempt number for this report epoch
                    await queueClient.SendMessageAsync($"{weatherStation.Id:D}|{reportEpoch:u}|{nextCollectionNumber}", nextAttemptDelay);

                    _logger.LogWarning($"Attempt to receive report: {reportEpoch:u} but recieved: {receivedReading.When:u} for attempt {collectionAttemptNumber} @ {DateTime.UtcNow:u}. Enqueed another attempt at: {nextAttemptEpoch:u}.");
                }
                else
                {
                    _logger.LogError($"Attempt to receive report: {reportEpoch:u} but recieved: {receivedReading.When:u} for attempt {collectionAttemptNumber} @ {DateTime.UtcNow:u}. Not enqueuing another attempt.");
                }

                return;
            }

            var stationUpdateHub = new HubConnectionBuilder()
                .WithUrl(_signalRSettings.HubUri, connectionOptions =>
                {
                    connectionOptions.Headers.Add("Authorization", $"SharedKey {_signalRSettings.SharedKey}");
                })
                .Build();

            try
            {
                await stationUpdateHub.StartAsync(CancellationToken.None);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error connecting to Signal R server. This will effect the real time updating of information in the widget.");
            }

            StationReading latestReading = await _stationReadingRepository.FetchLatestReadingAsync(weatherStationId);
            if (latestReading == null || latestReading.When != receivedReading.When)
            {
                _stationReadingRepository.Create(receivedReading);

                if (stationUpdateHub.State == HubConnectionState.Connected)
                {
                    await stationUpdateHub.SendAsync("NewStationReading", weatherStationId, receivedReading.ToStationReadingDto(weatherStation.AltitudeM));
                }
            }

            // Station Day Statistics
            DateTime statisticsDate = TimeZoneInfo.ConvertTimeFromUtc(receivedReading.When, timeZone).Date;
            StationDayStatistics latestDayStatistics = await _stationDayStatisticsRepository.FetchForDateAsync(weatherStationId, statisticsDate);

            StationDayStatistics receivedStats = weatherStationInfo.CurrentObservation.ToStationDayStatistics(weatherStation, statisticsDate);

            _logger.LogInformation($"Parsed daily stats for station: {weatherStationId} reading date: {statisticsDate}.");

            if (latestDayStatistics == null)
            {
                _stationDayStatisticsRepository.Create(receivedStats);
                _logger.LogInformation($"Creating new stats for: {weatherStationId} reading date: {statisticsDate}.");
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
                _logger.LogInformation($"Updating stats for: {weatherStationId} reading date: {statisticsDate}.");
            }

            await _dbContext.SaveChangesAsync(CancellationToken.None);

            DateTime? lastRain = await _stationReadingRepository.FetchLastRainDateAsync(weatherStationId);
            StationStatisticsDto statisticsDto = new StationStatisticsDto
            {
                DayStatistics = latestDayStatistics.ToStationDayStatisticsDto(),
                LastRain = lastRain,
            };

            if (stationUpdateHub.State == HubConnectionState.Connected)
            {
                await stationUpdateHub.SendAsync("UpdatedStationStatistics", weatherStationId, statisticsDto);
            }

            await stationUpdateHub.StopAsync();
            await stationUpdateHub.DisposeAsync();

            _logger.LogInformation($"Processed data collection for weather station: {weatherStationId}");
        }
    }
}
