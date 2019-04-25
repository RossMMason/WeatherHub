// <copyright file="StationDayStatistics.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Entities
{
    using System;

    public class StationDayStatistics : IVersionedEntity
    {
        public Guid Id { get; set; }

        public WeatherStation Station { get; set; }

        public DateTime Date { get; set; }

        public float DewpointHighC { get; set; }

        public TimeSpan DewpointHighTime { get; set; }

        public float DewpointLowC { get; set; }

        public TimeSpan DewpointLowTime { get; set; }

        public float HeatIndexHighC { get; set; }

        public TimeSpan HeatIndexHighTime { get; set; }

        public float HeatIndexLowC { get; set; }

        public TimeSpan HeatIndexLowTime { get; set; }

        public float PressureHighC { get; set; }

        public TimeSpan PressureHighTime { get; set; }

        public float PressureLowC { get; set; }

        public TimeSpan PressureLowTime { get; set; }

        public decimal TotalRainCm { get; set; }

        public float RainRateHighCmPerHour { get; set; }

        public float RelativeHumidityHigh { get; set; }

        public TimeSpan RelativeHumidyHighTime { get; set; }

        public float RelativeHumidityLow { get; set; }

        public TimeSpan RelativeHumidyLowTime { get; set; }

        public float TempHighC { get; set; }

        public TimeSpan TempHighTime { get; set; }

        public float TempLowC { get; set; }

        public TimeSpan TempLowTime { get; set; }

        public float WindHighMph { get; set; }

        public TimeSpan WidHighTime { get; set; }

        public float WindChillLow { get; set; }

        public TimeSpan WindChillLowTime { get; set; }

        public byte[] Version { get; set; }
    }
}
