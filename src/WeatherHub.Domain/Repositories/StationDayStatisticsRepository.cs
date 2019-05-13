// <copyright file="StationDayStatisticsRepository.cs" company="Ross Mason">
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

    public class StationDayStatisticsRepository
        : Repository<StationDayStatistics>, IStationDayStatisticsRepository
    {
        private readonly WeatherHubDbContext _dbContext;

        public StationDayStatisticsRepository(WeatherHubDbContext dbContext)
            : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<StationDayStatistics> FetchForDateAsync(DateTime date)
        {
            return await _dbContext
                .StationDayStatistics
                .SingleOrDefaultAsync(x => x.Date == date);
        }

        public async Task<IEnumerable<StationDayStatistics>> FetchLatestStatistics(DateTime startDate)
        {
            return await _dbContext
                .StationDayStatistics
                .Where(x => x.Date >= startDate)
                .OrderBy(x => x.Date)
                .ToListAsync();
        }
    }
}