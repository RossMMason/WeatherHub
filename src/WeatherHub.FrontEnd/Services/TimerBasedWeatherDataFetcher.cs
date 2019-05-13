// <copyright file="TimerBasedWeatherDataFetcher.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Services
{
    using System;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Logging;

    public abstract class TimerBasedWeatherDataFetcher
        : IWeatherDataFetcher, IDisposable
    {
        private readonly ILogger _logger;
        private Timer _timer;
        private bool _disposedValue = false;
        private List<int> _collectionIntervals;
        private bool _isRunning = false;

        public TimerBasedWeatherDataFetcher(ILogger logger)
        {
            _logger = logger;
            _collectionIntervals = new List<int>();
        }

        public virtual Task StartAsync()
        {
            _logger.LogInformation("Timed weather collection service is starting.");

            _timer = new Timer(async e => { await TriggerWeatherCollection(); }, null, TimeSpan.FromDays(1000), TimeSpan.FromDays(1000));
            SynchroniseTimer();

            _isRunning = true;

            return Task.CompletedTask;
        }

        public virtual Task StopAsync()
        {
            _logger.LogInformation("Timed weather collection service is stopping.");

            _timer?.Change(Timeout.InfiniteTimeSpan, Timeout.InfiniteTimeSpan);

            _isRunning = false;

            return Task.CompletedTask;
        }

        public void ScheduleAddHockCollection(TimeSpan delay)
        {
            SynchroniseTimer(delay);
        }

        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    _timer = null;
                }

                _disposedValue = true;
            }
        }

        protected abstract Task CollectWeatherAsync();

        protected void ScheduleCollection(int minutePastTheHour)
        {
            if (minutePastTheHour < 0 || minutePastTheHour > 59)
            {
                throw new ArgumentException($"{minutePastTheHour} is not a valid interval", nameof(minutePastTheHour));
            }

            if (_collectionIntervals.Contains(minutePastTheHour))
            {
                return;
            }

            _collectionIntervals.Add(minutePastTheHour);
            _collectionIntervals.Sort();

            if (_isRunning)
            {
                SynchroniseTimer();
            }
        }

        private async Task TriggerWeatherCollection()
        {
            await CollectWeatherAsync();
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
                _timer.Change(overrideDelay.Value, Timeout.InfiniteTimeSpan);
                return;
            }

            if (_collectionIntervals.Count == 0)
            {
                _timer.Change(Timeout.InfiniteTimeSpan, Timeout.InfiniteTimeSpan);
                return;
            }

            DateTime currentTime = DateTime.UtcNow;
            int collectionIntervalIndex = 0;

            while (collectionIntervalIndex < _collectionIntervals.Count
                && _collectionIntervals[collectionIntervalIndex] <= currentTime.TimeOfDay.Minutes)
            {
                collectionIntervalIndex++;
            }

            int nextInterval;
            if (collectionIntervalIndex == _collectionIntervals.Count)
            {
                nextInterval = _collectionIntervals[0];
            }
            else
            {
                nextInterval = _collectionIntervals[collectionIntervalIndex];
            }

            TimeSpan oneMinute = TimeSpan.FromMinutes(1);

            DateTime nextCollection = new DateTime(
                currentTime.Year,
                currentTime.Month,
                currentTime.Day,
                currentTime.Hour,
                currentTime.Minute,
                currentTime.Second);

            nextCollection.Add(oneMinute);

            while (nextCollection.Minute != nextInterval)
            {
                nextCollection.Add(oneMinute);
            }

            _timer.Change(nextCollection - currentTime, Timeout.InfiniteTimeSpan);
        }
    }
}
