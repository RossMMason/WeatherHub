// <copyright file="TimerInfo.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Functions
{
    public class TimerInfo
    {
        public ScheduleStatus ScheduleStatus { get; set; }

        public bool IsPastDue { get; set; }
    }
}
