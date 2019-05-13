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
        private readonly ILogger<WeatherCollector> _logger;
        private readonly IWeatherStationRepository _weatherStationRepository;
        private readonly Func<WeatherStation, IWeatherDataFetcher> _weatherDataFetcherFactory;

        private List<IWeatherDataFetcher> _weatherDataFetchers;

        public WeatherCollector(
            ILogger<WeatherCollector> logger,
            IWeatherStationRepository weatherStationRepository,
            Func<WeatherStation, IWeatherDataFetcher> weatherDataFetcherFactory)
        {
            _logger = logger;
            _weatherStationRepository = weatherStationRepository;
            _weatherDataFetcherFactory = weatherDataFetcherFactory;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _weatherDataFetchers = new List<IWeatherDataFetcher>();

            _logger.LogInformation("Starting up weather fetcher services");

            IEnumerable<WeatherStation> stations = await _weatherStationRepository.GetAllAsync();

            foreach (WeatherStation station in stations)
            {
                CreateFetcherForStation(station);
            }

            _logger.LogInformation($"Attempting to start {_weatherDataFetchers.Count} weather data fetchers.");

            Task[] startTasks = _weatherDataFetchers.Select(x => x.StartAsync()).ToArray();
            await Task.WhenAll(startTasks);

            _logger.LogInformation($"Startup complete.");
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Attempting to shutdown and stop {_weatherDataFetchers.Count} weather data fetchers.");

            Task[] stopTasks = _weatherDataFetchers.Select(x => x.StopAsync()).ToArray();

            await Task.WhenAll(stopTasks);

            _weatherDataFetchers.Clear();

            _logger.LogInformation($"Shutdown complete.");
        }

        private void CreateFetcherForStation(WeatherStation station)
        {
            try
            {
                _logger.LogInformation($"Trying to create fetcher for station: {station.Id}");
                _weatherDataFetchers.Add(_weatherDataFetcherFactory(station));
                _logger.LogInformation($"Created fetcher for station: {station.Id}");
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    $"Could not create fetcher for station: {station.Id}. This is probably because the fetcher type was not registered on app startup.");
            }
        }
    }
}
