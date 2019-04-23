// <copyright file="WeatherCollector.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Services
{
    using System;
    using System.Net.Http;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;
    using WeatherHub.FrontEnd.Models.Weatherlink;

    public class WeatherCollector : IHostedService, IDisposable
    {
        private readonly TimeSpan _fifteenMinutes = TimeSpan.FromMinutes(15);
        private readonly ILogger _logger;
        private Timer _timer;

        public WeatherCollector(ILogger<WeatherCollector> logger)
        {
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Weather Collector Service is starting.");

            _timer = new Timer(async e => { await CollectWeather(); }, null, TimeSpan.FromHours(24), TimeSpan.FromHours(24));
            SynchroniseTimer();

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Weather Collector Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        private async Task CollectWeather()
        {
            HttpResponseMessage httpResponse;

            try
            {
                HttpClient client = new HttpClient();
                httpResponse = await client.GetAsync("https://api.weatherlink.com/v1/NoaaExt.json?user=001D0A8083DF&pass=derbyshire18&apiToken=E78E69894E0D4BBA9FC6B35AE81AE9F2");

                if (!httpResponse.IsSuccessStatusCode)
                {
                    _logger.LogError($"Could not query weather API. Response code was {httpResponse.StatusCode}");

                    // If response code indicates an error. Back off for one minute then try again.
                    SynchroniseTimer(TimeSpan.FromMinutes(1));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception trying to receive weather information from API.");

                // If we hit an exception. Back off for one minute then try again.
                SynchroniseTimer(TimeSpan.FromMinutes(1));
                return;
            }

            string responseBody = await httpResponse.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<NoaaExtResult>(responseBody);

            // https://api.weatherlink.com/v1/NoaaExt.json?user=001D0A8083DF&pass=derbyshire18&apiToken=E78E69894E0D4BBA9FC6B35AE81AE9F2
            // https://api.weatherlink.com/v1/StationStatus.json?user=001D0A8083DF&pass=derbyshire18&apiToken=E78E69894E0D4BBA9FC6B35AE81AE9F2
            SynchroniseTimer();
        }

        private void SynchroniseTimer()
        {
            SynchroniseTimer(null);
        }

        private void SynchroniseTimer(TimeSpan? overrideDelay)
        {
            if (overrideDelay.HasValue)
            {
                _timer.Change(overrideDelay.Value, overrideDelay.Value);
                return;
            }

            // Weather is received at 00, 15, 30, 45 minutes past the hour. So we attempt to collect them at 01, 16, 31 and 45 minutes past the hour.
            var minsPast15MinInterval = DateTime.UtcNow.TimeOfDay.TotalMinutes % 15;
            var minsToNext15MinInterval = 15 - minsPast15MinInterval;
            var nextCollection = TimeSpan.FromMinutes(minsToNext15MinInterval + 1);
            _timer.Change(nextCollection, _fifteenMinutes);
        }
    }
}
