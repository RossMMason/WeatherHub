// <copyright file="StationReadingExtensions.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Models
{
    using System;
    using WeatherHub.Domain.Entities;

    public static class StationReadingExtensions
    {
        /// <summary>
        /// Returns station reading DTO to be used by clients.
        /// Note: Cloudbase calculations taken from https://en.wikipedia.org/wiki/Cloud_base.
        /// </summary>
        /// <param name="stationReading">The station reading.</param>
        /// <param name="stationHeightInM">The station height in M.</param>
        /// <returns>Station reading Data Transfer Object.</returns>
        ///
        public static StationReadingDto ToStationReadingDto(this StationReading stationReading, float stationHeightInM)
        {
            StationReadingDto dto = new StationReadingDto();

            dto.DewpointC = stationReading.DewpointC;
            dto.HeatIndexC = stationReading.HeatIndexC;
            dto.Id = stationReading.Id;
            dto.PressureMb = stationReading.PressureMb;
            dto.RainCmPerHour = stationReading.RainCmPerHour;
            dto.RelativeHumidity = stationReading.RelativeHumidity;
            dto.TempC = stationReading.TempC;
            dto.When = DateTime.SpecifyKind(stationReading.When, DateTimeKind.Utc);
            dto.WindChillC = stationReading.WindChillC;
            dto.WindDegrees = stationReading.WindDegrees;
            dto.WindAvgGustMph = stationReading.WindAvgGustMph;
            dto.WindAvgMph = stationReading.WindAvgMph;

            float spread = stationReading.TempC - stationReading.DewpointC;
            float cloudBaseAgl = spread / 2.5f * 1000;
            dto.EstimatedCloudBaseFt = cloudBaseAgl + stationHeightInM.ToFeetFromM();

            return dto;
        }
    }
}
