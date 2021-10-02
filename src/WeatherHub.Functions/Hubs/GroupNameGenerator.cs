// <copyright file="GroupNameGenerator.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Functions.Hubs
{
    using System;

    public class GroupNameGenerator
    {
        public string GetNewReadingGroupName(Guid stationId)
        {
            return $"R_{stationId:N}";
        }

        public string GetNewStatisticsGroupName(Guid stationId)
        {
            return $"S_{stationId:N}";
        }
    }
}
