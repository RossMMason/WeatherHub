// <copyright file="WeatherHubDbContext.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain
{
    using System;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using WeatherHub.Domain.Entities;

    public class WeatherHubDbContext : DbContext, IDbContext
    {
        public WeatherHubDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<StationDayStatistics> StationDayStatistics { get; set; }

        public DbSet<StationReading> StationReading { get; set; }

        public DbSet<WeatherStation> WeatherStations { get; set; }

        public DbSet<FetcherSetting> FetcherSetting { get; set; }

        public void SetOriginalVersion(IVersionedEntity entity, byte[] originalValue)
        {
            Entry(entity).Property("Version").OriginalValue = originalValue;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            ConfigureFetcherSetting(modelBuilder);
            ConfigureOptimisticConcurrency(modelBuilder);
            ConfigureStationDayStatistics(modelBuilder);
            ConfigureStationReading(modelBuilder);
            ConfigureWeatherStation(modelBuilder);
        }

        private void ConfigureOptimisticConcurrency(ModelBuilder modelBuilder)
        {
            Type[] versionedEntityTypes =
            modelBuilder.Model.GetEntityTypes()
                .Select(x => x.ClrType)
                .Where(t => typeof(IVersionedEntity).IsAssignableFrom(t))
                .ToArray();

            foreach (Type entityType in versionedEntityTypes)
            {
                modelBuilder
                   .Entity(entityType)
                   .Property("Version")
                   .IsRowVersion();
            }
        }

        private void ConfigureFetcherSetting(ModelBuilder modelBuilder)
        {
            modelBuilder
               .Entity<FetcherSetting>()
               .HasKey(x => x.Id)
               .IsClustered(false);

            modelBuilder
                .Entity<FetcherSetting>()
                .HasIndex("StationId", "Key")
                .IsUnique()
                .IsClustered();

            modelBuilder
                .Entity<FetcherSetting>()
                .Property(x => x.Key)
                .HasMaxLength(50);

            modelBuilder
                .Entity<FetcherSetting>()
                .Property(x => x.Value)
                .HasMaxLength(500);
        }

        private void ConfigureWeatherStation(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<WeatherStation>()
                .Property(x => x.Name)
                .HasMaxLength(50);

            modelBuilder
                .Entity<WeatherStation>()
                .HasIndex(x => x.Name);

            modelBuilder
                .Entity<WeatherStation>()
                .Property(x => x.LocationDescriptionHtml)
                .HasMaxLength(999999);

            modelBuilder
                .Entity<WeatherStation>()
                .Property(x => x.StationContact)
                .HasMaxLength(50);

            modelBuilder
                .Entity<WeatherStation>()
                .Property(x => x.FetcherType)
                .HasMaxLength(100);
        }

        private void ConfigureStationReading(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<StationReading>()
                .HasKey(x => x.Id)
                .IsClustered(false);

            modelBuilder
                .Entity<StationReading>()
                .HasIndex("StationId", "When")
                .IsUnique()
                .IsClustered();
        }

        private void ConfigureStationDayStatistics(ModelBuilder modelBuilder)
        {
            modelBuilder
               .Entity<StationDayStatistics>()
               .HasKey(x => x.Id)
               .IsClustered(false);

            modelBuilder
                .Entity<StationDayStatistics>()
                .HasIndex("StationId", "Date")
                .IsUnique()
                .IsClustered();

            modelBuilder
                .Entity<StationDayStatistics>()
                .Property(x => x.Date)
                .HasColumnType("date");
        }
    }
}
