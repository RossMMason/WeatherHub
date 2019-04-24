using System;
using System.Collections.Generic;
using System.Text;

namespace WeatherHub.Database.Model
{
    public class WeatherStation
    {
        public Guid Id { get; set; }

        public float Latitudue { get; set; }

        public float Longitude { get; set; }

        public float AltitudeM { get; set; }

        public string Name { get; set; }

        public string LocationDescriptionHtml { get; set; }

        public string StationContact { get; set; }
    }
}
