// <copyright file="StationDayStatisticsDto.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Models
{
    using System;

    public class StationDayStatisticsDto
    {
        public Guid Id { get; set; }

        public DateTime Date { get; set; }

        public float DewpointHighC { get; set; }

        public TimeSpan DewpointHighTime { get; set; }

        public float DewpointLowC { get; set; }

        public TimeSpan DewpointLowTime { get; set; }

        public float HeatIndexHighC { get; set; }

        public TimeSpan HeatIndexHighTime { get; set; }

        public float PressureHighMbar { get; set; }

        public TimeSpan PressureHighTime { get; set; }

        public float PressureLowMbar { get; set; }

        public TimeSpan PressureLowTime { get; set; }

        public float RainRateHighCmPerHour { get; set; }

        public float RelativeHumidityHigh { get; set; }

        public TimeSpan RelativeHumidyHighTime { get; set; }

        public float RelativeHumidityLow { get; set; }

        public TimeSpan RelativeHumidyLowTime { get; set; }

        public float TempHighC { get; set; }

        public TimeSpan TempHighTime { get; set; }

        public float TempLowC { get; set; }

        public TimeSpan TempLowTime { get; set; }

        public float TotalRainCm { get; set; }

        public float WindChillLowC { get; set; }

        public TimeSpan WindChillLowTime { get; set; }

        public float WindHighMph { get; set; }

        public TimeSpan WindHighTime { get; set; }
    }
}
