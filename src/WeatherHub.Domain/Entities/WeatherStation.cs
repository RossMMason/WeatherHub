// <copyright file="WeatherStation.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Entities
{
    using System;
    using System.Collections.Generic;

    public class WeatherStation : IVersionedEntity
    {
        public Guid Id { get; set; }

        public float Latitudue { get; set; }

        public float Longitude { get; set; }

        public float AltitudeM { get; set; }

        public string Name { get; set; }

        public string LocationDescriptionHtml { get; set; }

        public string StationContact { get; set; }

        public string FetcherType { get; set; }

        public ICollection<FetcherSetting> FetcherSettings { get; set; }

        public byte[] Version { get; set; }
    }
}
