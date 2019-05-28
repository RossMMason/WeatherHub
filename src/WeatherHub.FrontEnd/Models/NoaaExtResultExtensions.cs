// <copyright file="NoaaExtResultExtensions.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Models
{
    using System;
    using WeatherHub.Domain.Entities;
    using WeatherHub.FrontEnd.Models.Weatherlink;

    public static class NoaaExtResultExtensions
    {
        public static StationReading ToStationReading(this NoaaExtResult noaaExtResult, WeatherStation station)
        {
            StationReading stationReading = new StationReading();

            stationReading.Station = station;
            stationReading.When = DateTime.Parse(noaaExtResult.ObservationTimeRfc822).ToUniversalTime();

            if (float.TryParse(noaaExtResult.DewPointC, out float dewpointC))
            {
                stationReading.DewpointC = dewpointC;
            }

            if (float.TryParse(noaaExtResult.HeatIndexC, out float heatIndexC))
            {
                stationReading.HeatIndexC = heatIndexC;
            }

            if (float.TryParse(noaaExtResult.PressureMb, out float pressureMb))
            {
                stationReading.PressureMb = pressureMb;
            }

            if (float.TryParse(noaaExtResult.RelativeHumidity, out float relativeHuimidity))
            {
                stationReading.RelativeHumidity = relativeHuimidity;
            }

            if (float.TryParse(noaaExtResult.TempC, out float tempC))
            {
                stationReading.TempC = tempC;
            }

            if (float.TryParse(noaaExtResult.WindChillC, out float windChillC))
            {
                stationReading.WindChillC = windChillC;
            }

            if (float.TryParse(noaaExtResult.WindDegrees, out float windDegrees))
            {
                stationReading.WindDegrees = windDegrees;
            }

            if (float.TryParse(noaaExtResult.WindMph, out float WindMph))
            {
                stationReading.WindMph = WindMph;
            }

            if (noaaExtResult.CurrentObservation != null)
            {
                if (float.TryParse(noaaExtResult.CurrentObservation.RainRateInPerHour, out float rainRateInPerHour))
                {
                    stationReading.RainCmPerHour = rainRateInPerHour.ToCmFromInches();
                }

                if (float.TryParse(noaaExtResult.CurrentObservation.WindTenMinAvgMph, out float windAvgMph))
                {
                    stationReading.WindAvgMph = windAvgMph;
                }

                if (float.TryParse(noaaExtResult.CurrentObservation.WindTenMinGustMph, out float windGustMph))
                {
                    stationReading.WindAvgGustMph = windGustMph;
                }
            }

            return stationReading;
        }

        public static StationDayStatistics ToStationDayStatistics(this DavisCurrentObservation currentObservation, WeatherStation station, DateTime date)
        {
            StationDayStatistics stationDayStatistics = new StationDayStatistics();
            stationDayStatistics.Date = date;
            stationDayStatistics.Station = station;

            float dewpointHighF;
            if (float.TryParse(currentObservation.DewpointDayHighF, out dewpointHighF))
            {
                stationDayStatistics.DewpointHighC = dewpointHighF.ToCelsiusFromFahrenheit();
            }

            DateTime dewpointHighTime;
            if (DateTime.TryParse(currentObservation.DewpointDayHighTime, out dewpointHighTime))
            {
                stationDayStatistics.DewpointHighTime = dewpointHighTime.TimeOfDay;
            }

            float dewpointLowF;
            if (float.TryParse(currentObservation.DewpointDayLowF, out dewpointLowF))
            {
                stationDayStatistics.DewpointLowC = dewpointLowF.ToCelsiusFromFahrenheit();
            }

            DateTime dewpointLowTime;
            if (DateTime.TryParse(currentObservation.DewpointDayLowTime, out dewpointLowTime))
            {
                stationDayStatistics.DewpointLowTime = dewpointLowTime.TimeOfDay;
            }

            float heatIndexHighF;
            if (float.TryParse(currentObservation.HeatIndexDayHighF, out heatIndexHighF))
            {
                stationDayStatistics.HeatIndexHighC = heatIndexHighF.ToCelsiusFromFahrenheit();
            }

            DateTime heatIndexHighTime;
            if (DateTime.TryParse(currentObservation.HeatIndexDayHighTime, out heatIndexHighTime))
            {
                stationDayStatistics.HeatIndexHighTime = heatIndexHighTime.TimeOfDay;
            }

            float pressureDayHighIn;
            if (float.TryParse(currentObservation.PressureDayHighIn, out pressureDayHighIn))
            {
                stationDayStatistics.PressureHighMbar = pressureDayHighIn.ToMbarFromInHG();
            }

            DateTime pressureDayHighTime;
            if (DateTime.TryParse(currentObservation.PressureDayHighTime, out pressureDayHighTime))
            {
                stationDayStatistics.PressureHighTime = pressureDayHighTime.TimeOfDay;
            }

            float pressureDayLowIn;
            if (float.TryParse(currentObservation.PressureDayLowIn, out pressureDayLowIn))
            {
                stationDayStatistics.PressureLowMbar = pressureDayLowIn.ToMbarFromInHG();
            }

            DateTime pressureDayLowTime;
            if (DateTime.TryParse(currentObservation.PressureDayLowTime, out pressureDayLowTime))
            {
                stationDayStatistics.PressureLowTime = pressureDayLowTime.TimeOfDay;
            }

            float rainRateDayHighInPerHour;
            if (float.TryParse(currentObservation.RainRateDayHighInPerHour, out rainRateDayHighInPerHour))
            {
                stationDayStatistics.RainRateHighCmPerHour = rainRateDayHighInPerHour.ToCmFromInches();
            }

            float rainDayIn;
            if (float.TryParse(currentObservation.RainDayIn, out rainDayIn))
            {
                stationDayStatistics.TotalRainCm = rainDayIn.ToCmFromInches();
            }

            float relativeHumidityDayHigh;
            if (float.TryParse(currentObservation.RelativeHumidityDayHigh, out relativeHumidityDayHigh))
            {
                stationDayStatistics.RelativeHumidityHigh = relativeHumidityDayHigh;
            }

            DateTime relativeHumidityDayHighTime;
            if (DateTime.TryParse(currentObservation.RelativeHumidityDayHighTime, out relativeHumidityDayHighTime))
            {
                stationDayStatistics.RelativeHumidyHighTime = relativeHumidityDayHighTime.TimeOfDay;
            }

            float relativeHumidityDayLow;
            if (float.TryParse(currentObservation.RelativeHumidityDayLow, out relativeHumidityDayLow))
            {
                stationDayStatistics.RelativeHumidityLow = relativeHumidityDayLow;
            }

            DateTime relativeHumidityDayLowTime;
            if (DateTime.TryParse(currentObservation.RelativeHumidityDayLowTime, out relativeHumidityDayLowTime))
            {
                stationDayStatistics.RelativeHumidyLowTime = relativeHumidityDayLowTime.TimeOfDay;
            }

            float tempDayHighF;
            if (float.TryParse(currentObservation.TempDayHighF, out tempDayHighF))
            {
                stationDayStatistics.TempHighC = tempDayHighF.ToCelsiusFromFahrenheit();
            }

            DateTime tempDayHighTime;
            if (DateTime.TryParse(currentObservation.TempDayHighTime, out tempDayHighTime))
            {
                stationDayStatistics.TempHighTime = tempDayHighTime.TimeOfDay;
            }

            float tempDayLowF;
            if (float.TryParse(currentObservation.TempDayLowF, out tempDayLowF))
            {
                stationDayStatistics.TempLowC = tempDayLowF.ToCelsiusFromFahrenheit();
            }

            DateTime tempDayLowTime;
            if (DateTime.TryParse(currentObservation.TempDayLowTime, out tempDayLowTime))
            {
                stationDayStatistics.TempLowTime = tempDayLowTime.TimeOfDay;
            }

            float windChillDayLowF;
            if (float.TryParse(currentObservation.WindChillDayLowF, out windChillDayLowF))
            {
                stationDayStatistics.WindChillLowC = windChillDayLowF.ToCelsiusFromFahrenheit();
            }

            DateTime windChillDayLowTime;
            if (DateTime.TryParse(currentObservation.WindChillDayLowTime, out windChillDayLowTime))
            {
                stationDayStatistics.WindChillLowTime = windChillDayLowTime.TimeOfDay;
            }

            float windDayHigh;
            if (float.TryParse(currentObservation.WindDayHighMph, out windDayHigh))
            {
                stationDayStatistics.WindHighMph = windDayHigh;
            }

            DateTime windDayHighTime;
            if (DateTime.TryParse(currentObservation.WindDayHighTime, out windDayHighTime))
            {
                stationDayStatistics.WindHighTime = windDayHighTime.TimeOfDay;
            }

            return stationDayStatistics;
        }
    }
}
