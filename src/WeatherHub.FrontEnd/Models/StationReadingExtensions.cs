// <copyright file="StationReadingExtensions.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Models
{
    using WeatherHub.Domain.Entities;

    public static class StationReadingExtensions
    {
        public static StationReadingDto ToStationReadingDto(this StationReading stationReading)
        {
            StationReadingDto dto = new StationReadingDto();
            dto.DewpointC = stationReading.DewpointC;
            dto.HeatIndexC = stationReading.HeatIndexC;
            dto.Id = stationReading.Id;
            dto.PressureMb = stationReading.PressureMb;
            dto.RainCmPerHour = stationReading.RainCmPerHour;
            dto.RelativeHumidity = stationReading.RelativeHumidity;
            dto.TempC = stationReading.TempC;
            dto.When = stationReading.When;
            dto.WindChillC = stationReading.WindChillC;
            dto.WindDegrees = stationReading.WindDegrees;
            dto.WindAvgGustMph = stationReading.WindAvgGustMph;
            dto.WindAvgMph = stationReading.WindAvgMph;

            return dto;
        }
    }
}
