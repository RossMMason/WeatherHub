// <copyright file="MigrationDbContextFactory.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Migrations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;

    public class MigrationDbContextFactory : IDesignTimeDbContextFactory<MigrationDbContext>
    {
        private IConfigurationRoot _config;

        public MigrationDbContextFactory(IConfigurationRoot config)
        {
            _config = config;
        }

        public MigrationDbContextFactory()
        {
            var configBuilder = new ConfigurationBuilder()
                .AddJsonFile($"appsettings.json", true, true);

            _config = configBuilder.Build();
        }

        public MigrationDbContext CreateDbContext(string[] args)
        {
            DbContextOptionsBuilder dbContextOptionsBuilder = new DbContextOptionsBuilder();
            dbContextOptionsBuilder.UseSqlServer(
                _config.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(GetType().Assembly.FullName));

            return new MigrationDbContext(dbContextOptionsBuilder.Options);
        }
    }
}
