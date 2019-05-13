// <copyright file="WeatherFetcherFactory.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Services
{
    using System;
    using System.Collections.Generic;
    using WeatherHub.Domain.Entities;

    public class WeatherFetcherFactory
    {
        private IDictionary<string, Func<WeatherStation, IWeatherDataFetcher>> _factoryLookup
            = new Dictionary<string, Func<WeatherStation, IWeatherDataFetcher>>();

        public WeatherFetcherFactory()
        {
            _factoryLookup = new Dictionary<string, Func<WeatherStation, IWeatherDataFetcher>>();
        }

        public IWeatherDataFetcher CreateFetcher(WeatherStation weatherStation)
        {
            if (_factoryLookup.TryGetValue(weatherStation.FetcherType, out Func<WeatherStation, IWeatherDataFetcher> fetcherFactory))
            {
                return fetcherFactory(weatherStation);
            }

            throw new Exception($"Unsupported Weather Fetcher Type: {weatherStation.FetcherType}");
        }

        public void RegisterWeatherFetcherType(string fetcherType, Func<WeatherStation, IWeatherDataFetcher> weatherFetcherFactory)
        {
            _factoryLookup[fetcherType] = weatherFetcherFactory;
        }
    }
}
