// <copyright file="MigrationDbContext.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Migrations
{
    using Microsoft.EntityFrameworkCore;

    public class MigrationDbContext : WeatherHubDbContext
    {
        private readonly DbContextOptions _options;

        public MigrationDbContext(DbContextOptions options)
            : base(options)
        {
            _options = options;
        }
    }
}
