// <copyright file="NoaaExtResult.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Models.Weatherlink
{
    using System.Text.Json.Serialization;

    public class NoaaExtResult
    {
        // "15 minutes after the hour"
        [JsonPropertyName("suggested_pickup")]
        public string SuggestedPickup { get; set; }

        // "6.1"
        [JsonPropertyName("dewpoint_c")]
        public string DewPointC { get; set; }

        // "43.0"
        [JsonPropertyName("dewpoint_f")]
        public string DewPointF { get; set; }

        // "43.0 F (6.1 C)"
        [JsonPropertyName("dewpoint_string")]
        public string DewPointString { get; set; }

        // "6.7"
        [JsonPropertyName("heat_index_c")]
        public string HeatIndexC { get; set; }

        // "44.0"
        [JsonPropertyName("heat_index_f")]
        public string HeatIndexF { get; set; }

        // "44.0 F (6.7 C)"
        [JsonPropertyName("heat_index_string")]
        public string HeatIndexString { get; set; }

        // "England, UK"
        [JsonPropertyName("location")]
        public string Location { get; set; }

        // "53.30631"
        [JsonPropertyName("latitude")]
        public string Latitude { get; set; }

        // "-1.73368"
        [JsonPropertyName("longitude")]
        public string Longitude { get; set; }

        // "Last Updated on Apr 18 2019, 1:30 am BST"
        [JsonPropertyName("observation_time")]
        public string ObservationTime { get; set; }

        // "Thu, 18 Apr 2019 01:30:00 +0100"
        [JsonPropertyName("observation_time_rfc822")]
        public string ObservationTimeRfc822 { get; set; }

        // "30.225"
        [JsonPropertyName("pressure_in")]
        public string PressureIn { get; set; }

        // "1023.5"
        [JsonPropertyName("pressure_mb")]
        public string PressureMb { get; set; }

        // "1023.5 mb"
        [JsonPropertyName("pressure_string")]
        public string PressureString { get; set; }

        // "95"
        [JsonPropertyName("relative_humidity")]
        public string RelativeHumidity { get; set; }

        // "leecooper"
        [JsonPropertyName("station_id")]
        public string StationId { get; set; }

        // "temp_c"
        [JsonPropertyName("temp_c")]
        public string TempC { get; set; }

        // "temp_f"
        [JsonPropertyName("temp_f")]
        public string TempF { get; set; }

        // "temperature_string"
        [JsonPropertyName("temperature_string")]
        public string TemperatureString { get; set; }

        // "64"
        [JsonPropertyName("wind_degrees")]
        public string WindDegrees { get; set; }

        // "East-northeast"
        [JsonPropertyName("wind_dir")]
        public string WindDir { get; set; }

        // "11.3"
        [JsonPropertyName("wind_kt")]
        public string WindKt { get; set; }

        // "13.0"
        [JsonPropertyName("wind_mph")]
        public string WindMph { get; set; }

        // "3.3"
        [JsonPropertyName("windchill_c")]
        public string WindChillC { get; set; }

        // "38"
        [JsonPropertyName("windchill_F")]
        public string WindChillF { get; set; }

        // "38.0 F (3.3 C)"
        [JsonPropertyName("windchill_string")]
        public string WindChillString { get; set; }

        [JsonPropertyName("davis_current_observation")]
        public DavisCurrentObservation CurrentObservation { get; set; }
    }
}
