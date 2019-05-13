// <copyright file="IRepository.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using WeatherHub.Domain.Entities;

    public interface IWeatherStationRepository
        : IRepository<WeatherStation>
    {
        Task<IEnumerable<WeatherStation>> GetAllAsync();

        Task<WeatherStation> GetByIdAsync(Guid id);
    }
}