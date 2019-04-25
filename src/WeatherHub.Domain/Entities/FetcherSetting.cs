// <copyright file="FetcherSetting.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Entities
{
    using System;

    public class FetcherSetting
    {
        public Guid Id { get; set; }

        public WeatherStation Station { get; set; }

        public string Key { get; set; }

        public string Value { get; set; }
    }
}
