// <copyright file="IStationUpdateHub.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Hubs
{
    using System;
    using System.Threading.Tasks;
    using WeatherHub.Models;

    public interface IStationUpdateHub
    {
        Task NewStationReading(Guid stationId, StationReadingDto stationReading);

        Task UpdatedStationStatistics(Guid stationId, StationStatisticsDto stationStatistics);
    }
}
