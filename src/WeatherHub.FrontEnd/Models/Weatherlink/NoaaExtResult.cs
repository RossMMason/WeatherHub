// <copyright file="NoaaExtResult.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Models.Weatherlink
{
    using Newtonsoft.Json;

    public class NoaaExtResult
    {
        // "15 minutes after the hour"
        [JsonProperty("suggested_pickup")]
        public string SuggestedPickup { get; set; }

        // "6.1"
        [JsonProperty("dewpoint_c")]
        public string DewPointC { get; set; }

        // "43.0"
        [JsonProperty("dewpoint_f")]
        public string DewPointF { get; set; }

        // "43.0 F (6.1 C)"
        [JsonProperty("dewpoint_string")]
        public string DewPointString { get; set; }

        // "6.7"
        [JsonProperty("heat_index_c")]
        public string HeatIndexC { get; set; }

        // "44.0"
        [JsonProperty("heat_index_f")]
        public string HeatIndexF { get; set; }

        // "44.0 F (6.7 C)"
        [JsonProperty("heat_index_string")]
        public string HeatIndexString { get; set; }

        // "England, UK"
        [JsonProperty("location")]
        public string Location { get; set; }

        // "53.30631"
        [JsonProperty("latitude")]
        public string Latitude { get; set; }

        // "-1.73368"
        [JsonProperty("longitude")]
        public string Longitude { get; set; }

        // "Last Updated on Apr 18 2019, 1:30 am BST"
        [JsonProperty("observation_time")]
        public string ObservationTime { get; set; }

        // "Thu, 18 Apr 2019 01:30:00 +0100"
        [JsonProperty("observation_time_rfc822")]
        public string ObservationTimeRfc822 { get; set; }

        // "30.225"
        [JsonProperty("pressure_in")]
        public string PressureIn { get; set; }

        // "1023.5"
        [JsonProperty("pressure_mb")]
        public string PressureMb { get; set; }

        // "1023.5 mb"
        [JsonProperty("pressure_string")]
        public string PressureString { get; set; }

        // "95"
        [JsonProperty("relative_humidity")]
        public string RelativeHumidity { get; set; }

        // "leecooper"
        [JsonProperty("station_id")]
        public string StationId { get; set; }

        // "temp_c"
        [JsonProperty("temp_c")]
        public string TempC { get; set; }

        // "temp_f"
        [JsonProperty("temp_f")]
        public string TempF { get; set; }

        // "temperature_string"
        [JsonProperty("temperature_string")]
        public string TemperatureString { get; set; }

        // "64"
        [JsonProperty("wind_degrees")]
        public string WindDegrees { get; set; }

        // "East-northeast"
        [JsonProperty("wind_dir")]
        public string WindDir { get; set; }

        // "11.3"
        [JsonProperty("wind_kt")]
        public string WindKt { get; set; }

        // "13.0"
        [JsonProperty("wind_mph")]
        public string WindMph { get; set; }

        // "3.3"
        [JsonProperty("windchill_c")]
        public string WindChillC { get; set; }

        // "38"
        [JsonProperty("windchill_F")]
        public string WindChillF { get; set; }

        // "38.0 F (3.3 C)"
        [JsonProperty("windchill_string")]
        public string WindChillString { get; set; }

        [JsonProperty("davis_current_observation")]
        public DavisCurrentObservation CurrentObservation { get; set; }
    }
}
