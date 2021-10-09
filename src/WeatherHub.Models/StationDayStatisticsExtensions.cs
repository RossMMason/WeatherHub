// <copyright file="StationDayStatisticsExtensions.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Models
{
    using WeatherHub.Domain.Entities;

    public static class StationDayStatisticsExtensions
    {
        public static StationDayStatisticsDto ToStationDayStatisticsDto(this StationDayStatistics stationDayStatistics)
        {
            StationDayStatisticsDto dto = new StationDayStatisticsDto();
            dto.Id = stationDayStatistics.Id;
            dto.Date = stationDayStatistics.Date;
            dto.DewpointHighC = stationDayStatistics.DewpointHighC;
            dto.DewpointHighTime = stationDayStatistics.DewpointHighTime;
            dto.DewpointLowC = stationDayStatistics.DewpointLowC;
            dto.DewpointLowTime = stationDayStatistics.DewpointLowTime;
            dto.HeatIndexHighC = stationDayStatistics.HeatIndexHighC;
            dto.HeatIndexHighTime = stationDayStatistics.HeatIndexHighTime;
            dto.PressureHighMbar = stationDayStatistics.PressureHighMbar;
            dto.PressureHighTime = stationDayStatistics.PressureHighTime;
            dto.PressureLowMbar = stationDayStatistics.PressureLowMbar;
            dto.PressureLowTime = stationDayStatistics.PressureLowTime;
            dto.RainRateHighCmPerHour = stationDayStatistics.RainRateHighCmPerHour;
            dto.RelativeHumidityHigh = stationDayStatistics.RelativeHumidityHigh;
            dto.RelativeHumidityLow = stationDayStatistics.RelativeHumidityLow;
            dto.RelativeHumidyHighTime = stationDayStatistics.RelativeHumidyHighTime;
            dto.RelativeHumidyLowTime = stationDayStatistics.RelativeHumidyLowTime;
            dto.TempHighC = stationDayStatistics.TempHighC;
            dto.TempHighTime = stationDayStatistics.TempHighTime;
            dto.TempLowC = stationDayStatistics.TempLowC;
            dto.TempLowTime = stationDayStatistics.TempLowTime;
            dto.TotalRainCm = stationDayStatistics.TotalRainCm;
            dto.WindChillLowC = stationDayStatistics.WindChillLowC;
            dto.WindChillLowTime = stationDayStatistics.WindChillLowTime;
            dto.WindHighMph = stationDayStatistics.WindHighMph;
            dto.WindHighTime = stationDayStatistics.WindHighTime;

            return dto;
        }
    }
}
