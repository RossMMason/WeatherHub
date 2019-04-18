// <copyright file="Startup.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd
{
    using System;
    using System.Linq;
    using System.Reflection;
    using Autofac;
    using Autofac.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using WeatherHub.Domain;
    using WeatherHub.Domain.Entities;
    using WeatherHub.Domain.Migrations;
    using WeatherHub.Domain.Repositories;
    using WeatherHub.FrontEnd.Services;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddApplicationInsightsTelemetry(Configuration["ApplicationInsightsKey"]);

            services.AddHostedService<WeatherCollector>();

            var container = RegisterAutofacServices(services, Configuration);
            return container.Resolve<IServiceProvider>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, WeatherHubDbContext weatherHubDbContext)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                try
                {
                    scope.ServiceProvider.GetRequiredService<MigrationDbContext>().Database.Migrate();
                }
                catch (Exception ex)
                {
                    var migrationLogger = loggerFactory.CreateLogger("DB Migration");
                    migrationLogger.LogError(ex, "DB Migration Failed");
                }
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();

            loggerFactory.AddApplicationInsights(app.ApplicationServices, LogLevel.Warning);
        }

        private IContainer RegisterAutofacServices(IServiceCollection services, IConfiguration configuration)
        {
            var builder = new ContainerBuilder();
            builder.Populate(services);

            DbContextOptionsBuilder dbContextOptionsBuilder = new DbContextOptionsBuilder();
            dbContextOptionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("WeatherHub.Domain.Migrations"));

            builder.RegisterType<WeatherHubDbContext>()
                .AsImplementedInterfaces()
                .AsSelf()
                .WithParameter("options", dbContextOptionsBuilder.Options)
                .InstancePerLifetimeScope();

            builder.RegisterType<MigrationDbContext>()
               .AsSelf()
               .WithParameter("options", dbContextOptionsBuilder.Options)
               .InstancePerLifetimeScope();

            builder.Register<Func<WeatherStation, IWeatherDataFetcher>>(c =>
            {
                var context = c.Resolve<IComponentContext>();

                return (ws) =>
                {
                    switch (ws.FetcherType)
                    {
                        case "DavisWeatherlinkFetcher":
                            return new DavisWeatherlinkFetcher(
                                context.Resolve<ILogger<DavisWeatherlinkFetcher>>(),
                                ws,
                                context.Resolve<IDbContext>(),
                                context.Resolve<IStationReadingRepository>(),
                                context.Resolve<IStationDayStatisticsRepository>());
                        default:
                            throw new Exception($"Unsupported fetcher type: {ws.FetcherType}");
                    }
                };
            });

            builder.RegisterAssemblyTypes(new[] { typeof(WeatherHub.Domain.WeatherHubDbContext).Assembly })
                .Where(x => ((TypeInfo)x).ImplementedInterfaces.Where(y => y.IsGenericType).Any(z => z.GetGenericTypeDefinition() == typeof(IRepository<>)))
                .AsSelf()
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            return builder.Build();
        }
    }
}
