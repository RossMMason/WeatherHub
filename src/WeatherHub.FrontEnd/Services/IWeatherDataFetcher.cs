// <copyright file="IWeatherDataFetcher.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Services
{
    using System.Threading.Tasks;

    public interface IWeatherDataFetcher
    {
        Task StartAsync();

        Task StopAsync();
    }
}
