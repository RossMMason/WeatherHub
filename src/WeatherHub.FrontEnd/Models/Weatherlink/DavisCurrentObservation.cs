// <copyright file="DavisCurrentObservation.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Models.Weatherlink
{
    using Newtonsoft.Json;

    public class DavisCurrentObservation
    {
        // "001D0A8083DF"
        [JsonProperty("DID")]
        public string DeviceId { get; set; }

        // "DSC & DLGC Weather Station"
        [JsonProperty("station_name")]
        public string StationName { get; set; }

        // 134
        [JsonProperty("observation_age")]
        public int ObservationAge { get; set; }

        // "43"
        [JsonProperty("dewpoint_day_high_f")]
        public string DewpoindDayHigh { get; set; }

        // "1:00am"
        [JsonProperty("dewpoint_day_high_time")]
        public string DewpoindDayHighTime { get; set; }

        // "43"
        [JsonProperty("dewpoint_day_low_f")]
        public string DewpoindDayLow { get; set; }

        // "1:00am"
        [JsonProperty("dewpoint_day_low_time")]
        public string DewpoindDayLowTime { get; set; }

        // "44"
        [JsonProperty("heat_index_day_high_f")]
        public string HeatIndexDayHigh { get; set; }

        // "1:00am"
        [JsonProperty("heat_index_day_high_time")]
        public string HeatIndexDayHighTime { get; set; }

        // "30.225"
        [JsonProperty("pressure_day_high_in")]
        public string PressureDayHighIn { get; set; }

        // "1:07am"
        [JsonProperty("pressure_day_high_time")]
        public string PressureDayHighTime { get; set; }

        // "30.225"
        [JsonProperty("pressure_day_low_in")]
        public string PressureDayLowIn { get; set; }

        // "1:07am"
        [JsonProperty("pressure_day_low_time")]
        public string PressureDayLowTime { get; set; }

        // "Steady"
        [JsonProperty("pressure_tendency_string")]
        public string PressureTendancyString { get; set; }

        // "0.0000"
        [JsonProperty("rain_day_in")]
        public string RainDayIn { get; set; }

        // "0.0000"
        [JsonProperty("rain_month_in")]
        public string RainMonthIn { get; set; }

        // "0.0000"
        [JsonProperty("rain_rate_day_high_in_per_hr")]
        public string RainRateDayHighInPerHour { get; set; }

        // "0.0000"
        [JsonProperty("rain_rate_hour_high_in_per_hr")]
        public string RainRateHourHighInPerHour { get; set; }

        // "0.0000"
        [JsonProperty("rain_rate_in_per_hr")]
        public string RainRateInPerHour { get; set; }

        // "0.0000"
        [JsonProperty("rain_rate_month_high_in_per_hr")]
        public string RainRateMonthHighInPerHour { get; set; }

        // "0.0000"
        [JsonProperty("rain_rate_year_high_in_per_hr")]
        public string RainRateYearHighInPerHour { get; set; }

        // "0.0000"
        [JsonProperty("rain_storm_in")]
        public string RainStormIn { get; set; }

        // "0.0000"
        [JsonProperty("rain_year_in")]
        public string RainYearIn { get; set; }

        // "95"
        [JsonProperty("relative_humidity_day_high")]
        public string RelativeHumidityDayHigh { get; set; }

        // "1:00am"
        [JsonProperty("relative_humidity_day_high_time")]
        public string RelativeHumidityDayHighTime { get; set; }

        // "95"
        [JsonProperty("relative_humidity_day_low")]
        public string RelativeHumidityDayLow { get; set; }

        // "1:00am"
        [JsonProperty("relative_humidity_day_low_time")]
        public string RelativeHumidityDayLowTime { get; set; }

        // "44.4"
        [JsonProperty("temp_day_high_f")]
        public string TempDayHighF { get; set; }

        // "1:19am"
        [JsonProperty("temp_day_high_time")]
        public string TempDayHighTime { get; set; }

        // "44.4"
        [JsonProperty("temp_day_low_f")]
        public string TempDayLowF { get; set; }

        // "1:19am"
        [JsonProperty("temp_day_low_time")]
        public string TempDayLowTime { get; set; }

        // "17.0"
        [JsonProperty("wind_day_high_mph")]
        public string WindDayHigh { get; set; }

        // "1:23am"
        [JsonProperty("wind_day_high_time")]
        public string WindDayHighTime { get; set; }

        // "13.0"
        [JsonProperty("wind_ten_min_avg_mph")]
        public string WindTenMinAvgMph { get; set; }

        // "17.0"
        [JsonProperty("wind_ten_min_gust_mph")]
        public string WindTenMinGustMph { get; set; }

        // "37"
        [JsonProperty("windchill_day_low_f")]
        public string WindChillDayLowF { get; set; }

        // "1:18am"
        [JsonProperty("windchill_day_low_time")]
        public string WindChillDayLowTime { get; set; }
    }
}
