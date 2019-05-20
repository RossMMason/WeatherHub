// <copyright file="StationReadingDto.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Models
{
    using System;

    public class StationReadingDto
    {
        public Guid Id { get; set; }

        public DateTime When { get; set; }

        public float DewpointC { get; set; }

        public float HeatIndexC { get; set; }

        public float PressureMb { get; set; }

        public float RelativeHumidity { get; set; }

        public float TempC { get; set; }

        public float WindDegrees { get; set; }

        public float WindAvgMph { get; set; }

        public float WindAvgGustMph { get; set; }

        public float WindChillC { get; set; }

        public float RainCmPerHour { get; set; }
    }
}
