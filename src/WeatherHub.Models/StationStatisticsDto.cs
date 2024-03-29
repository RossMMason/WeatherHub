﻿// <copyright file="StationStatisticsDto.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Models
{
    using System;

    public class StationStatisticsDto
    {
        public StationDayStatisticsDto DayStatistics { get; set; }

        public DateTime? LastRain { get; set; }
    }
}
