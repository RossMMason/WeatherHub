// <copyright file="IStationReadingRepository.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using WeatherHub.Domain.Entities;

    public interface IStationReadingRepository
        : IRepository<StationReading>
    {
        Task<IEnumerable<StationReading>> FetchLatestReadingsAsync(DateTime startDateTime);

        Task<StationReading> FetchLatestReadingAsync();
    }
}