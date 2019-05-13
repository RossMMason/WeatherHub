// <copyright file="WeatherCollector.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using WeatherHub.Domain.Entities;
    using WeatherHub.Domain.Repositories;

    public class WeatherCollector : IHostedService
    {
        private Dictionary<Guid, IWeatherDataFetcher> _weatherFetchers =
            new Dictionary<Guid, IWeatherDataFetcher>();

        private ILogger<WeatherCollector> _logger;
        private IWeatherStationRepository _weatherStationRepository;

        public WeatherCollector(
            ILogger<WeatherCollector> logger,
            IWeatherStationRepository weatherStationRepository)
        {
            _logger = logger;
            _weatherStationRepository = weatherStationRepository;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Starting up weather fetcher services");

            IEnumerable<WeatherStation> stations = await _weatherStationRepository.GetAllAsync();

            foreach (WeatherStation station in stations)
            {
                CreateFetcherForStation(station);
            }

            _logger.LogInformation($"Attempting to start {_weatherFetchers.Count} weather data fetchers.");

            Task[] startTasks = _weatherFetchers.Values.Select(x => x.StartAsync()).ToArray();
            await Task.WhenAll(startTasks);

            _logger.LogInformation($"Startup complete.");
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Attempting to shutdown and stop {_weatherFetchers.Count} weather data fetchers.");

            Task[] stopTasks = _weatherFetchers.Values.Select(x => x.StopAsync()).ToArray();

            await Task.WhenAll(stopTasks);

            _logger.LogInformation($"Shutdown complete.");
        }

        private void CreateFetcherForStation(WeatherStation station)
        {
            station.FetcherType.
        }
    }
}
