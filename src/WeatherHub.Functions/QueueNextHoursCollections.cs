// <copyright file="QueueNextHoursCollections.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Functions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Azure.Storage.Queues;
    using Microsoft.Azure.Functions.Worker;
    using Microsoft.Extensions.Logging;
    using WeatherHub.Domain.Entities;
    using WeatherHub.Domain.Repositories;

    public class QueueNextHoursCollections
    {
        private readonly ILogger<QueueNextHoursCollections> _logger;
        private readonly IWeatherStationRepository _weatherStationRepository;
        private readonly StorageQueueSettings _storageQueueSettings;

        public QueueNextHoursCollections(
            ILogger<QueueNextHoursCollections> logger,
            IWeatherStationRepository weatherStationRepository,
            StorageQueueSettings storageQueueSettings)
        {
            _logger = logger;
            _weatherStationRepository = weatherStationRepository;
            _storageQueueSettings = storageQueueSettings;
        }

        // Runs every hour on the hour and is responsible for queueing the next hours data collections
        [Function("QueueNextHoursCollections")]
        public async Task Run([TimerTrigger("0 0 * * * *")] TimerInfo myTimer, FunctionContext context)
        {
            var scheduledRunTime = myTimer.ScheduleStatus.Next;
            _logger.LogInformation($"Beginning QueueDavisNextHoursCollections function for {scheduledRunTime:u}.");

            var weatherStations = await _weatherStationRepository.GetAllAsync();

            foreach (var weatherStation in weatherStations)
            {
                switch (weatherStation.FetcherType)
                {
                    case "DavisWeatherlinkFetcher":
                        await QueueDavisNextHoursCollections(weatherStation);
                        break;
                    default:
                        _logger.LogError($"Unrecognised fetcher type: '{weatherStation.FetcherType}'.");
                        break;
                }
            }

            // Calculate the run times for all weather collectors and send a delayed queue item to the respective queue for the collector for any due in the next hour.
        }

        private async Task QueueDavisNextHoursCollections(WeatherStation weatherStation)
        {
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

            int pickupPeriod;

            if (!int.TryParse(pickupPeriodSetting.Value, out pickupPeriod)
                || pickupPeriod < 1
                || pickupPeriod > 60)
            {
                _logger.LogError($"'PickupPeriod' for weather station with Id: {weatherStation.Id} could not be parsed. Should be an integer value from 1 to 60.");
                return;
            }

            TimeZoneInfo timezone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneIdSetting.Value);
            if (timezone == null)
            {
                _logger.LogError($"'TimeZoneId' for weather station with Id: {weatherStation.Id} could not be parsed. For the UK use 'GMT Standard Time'");
                return;
            }

            // We pickup at 1 minute past the period type to give the weather station time to generate the record.
            List<int> minutesPastHour = new List<int>();

            if (pickupPeriod == 60)
            {
                minutesPastHour.Add(1);
            }
            else
            {
                var thisPeriod = 1;

                while (thisPeriod < 60)
                {
                    minutesPastHour.Add(thisPeriod);
                    thisPeriod += pickupPeriod;
                }
            }

            QueueClient queueClient = new (
                _storageQueueSettings.StorageConnectionString,
                "davis-station-collections",
                new QueueClientOptions { MessageEncoding = QueueMessageEncoding.Base64 });

            DateTime thisHour = new DateTime(
                DateTime.UtcNow.Year,
                DateTime.UtcNow.Month,
                DateTime.UtcNow.Day,
                DateTime.UtcNow.Hour,
                0,
                0,
                0,
                DateTimeKind.Utc);

            foreach (var minutePastHour in minutesPastHour)
            {
                DateTime fetchTime = thisHour.AddMinutes(minutePastHour);
                TimeSpan fetchDelay = fetchTime - DateTime.UtcNow;

                if (fetchDelay < TimeSpan.Zero)
                {
                    continue;
                }

                _logger.LogInformation($"Enqueued Davis weather data fetch for station '{weatherStation.Id}' for {fetchTime}.");

                await queueClient.SendMessageAsync(weatherStation.Id.ToString("D"), fetchDelay);
            }
        }
    }
}
