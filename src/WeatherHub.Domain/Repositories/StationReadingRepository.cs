﻿// <copyright file="StationReadingRepository.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using WeatherHub.Domain.Entities;

    public class StationReadingRepository
        : Repository<StationReading>, IStationReadingRepository
    {
        private readonly WeatherHubDbContext _dbContext;

        public StationReadingRepository(WeatherHubDbContext dbContext)
            : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<StationReading> FetchLatestReadingAsync(Guid weatherStationId)
        {
            return await _dbContext
                .StationReading
                .Where(x => x.Station.Id == weatherStationId)
                .OrderByDescending(x => x.When)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<StationReading>> FetchLatestReadingsAsync(Guid weatherStationId, DateTime startDateTime)
        {
            return await _dbContext
                .StationReading
                .Where(x => x.Station.Id == weatherStationId && x.When >= startDateTime)
                .OrderBy(x => x.When)
                .ToListAsync();
        }
    }
}