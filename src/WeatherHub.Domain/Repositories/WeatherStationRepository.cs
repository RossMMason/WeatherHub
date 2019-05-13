// <copyright file="WeatherStationRepository.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using WeatherHub.Domain.Entities;

    public class WeatherStationRepository
        : Repository<WeatherStation>, IWeatherStationRepository
    {
        private readonly WeatherHubDbContext _dbContext;

        public WeatherStationRepository(WeatherHubDbContext dbContext)
            : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<WeatherStation>> GetAllAsync()
        {
            return await _dbContext
                .WeatherStations
                .ToListAsync();
        }

        public async Task<WeatherStation> GetByIdAsync(Guid id)
        {
            return await _dbContext
                .WeatherStations
                .SingleOrDefaultAsync(x => x.Id == id);
        }
    }
}