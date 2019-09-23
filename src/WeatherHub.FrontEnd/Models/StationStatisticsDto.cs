// <copyright file="StationDayStatisticsDto.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Models
{
    using System;

    public class StationStatisticsDto 
    {
        public StationDayStatisticsDto DayStatistics { get; set; }

        public DateTime? LastRain { get; set; }

    }
}
