// <copyright file="Startup.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using Autofac;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.FileProviders;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using WeatherHub.Domain;
    using WeatherHub.Domain.Migrations;
    using WeatherHub.Domain.Repositories;
    using WeatherHub.FrontEnd.Authorization;
    using WeatherHub.FrontEnd.Hubs;

    public class Startup
    {
        private const string WeatherHubCorsPolicyName = "WeatherHubCorsPolicy";

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        public IConfiguration Configuration { get; }

        public IWebHostEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationInsightsTelemetry(Configuration["ApplicationInsights:InstrumentationKey"]);

            services.AddCors(options =>
            {
                options.AddPolicy(
                    WeatherHubCorsPolicyName,
                    builder =>
                    {
                        builder
                            .SetIsOriginAllowed((domain) => true)
                            .AllowCredentials()
                            .AllowAnyMethod().
                            AllowAnyHeader();
                    });
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("SharedKeyAuthenticationRequirement", policy =>
                {
                    policy.Requirements.Add(new SharedKeyAuthenticationRequirement());
                });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            if (Environment.IsDevelopment())
            {
                services.AddSignalR();
            }
            else
            {
                string signalRConnectionString = Configuration["SignalR:ConnectionString"];
                services.AddSignalR().AddAzureSignalR(signalRConnectionString);
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            var contentRoot = Environment.ContentRootPath;

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

            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(contentRoot, "widgets")),
                RequestPath = "/widgets",
                EnableDirectoryBrowsing = false,
            });

            app.UseFileServer(new FileServerOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(contentRoot, "sample")),
                RequestPath = "/sample",
                EnableDirectoryBrowsing = false,
            });

            if (Environment.IsDevelopment())
            {
                app.UseFileServer(new FileServerOptions
                {
                    FileProvider = new PhysicalFileProvider(Path.Combine(contentRoot, "ts")),
                    RequestPath = "/ts",
                    EnableDirectoryBrowsing = false,
                });

                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCors(WeatherHubCorsPolicyName);
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                endpoints.MapHub<StationUpdateHub>("/hubs/station-update-hub");
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            DbContextOptionsBuilder dbContextOptionsBuilder = new DbContextOptionsBuilder();
            dbContextOptionsBuilder.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("WeatherHub.Domain.Migrations"));

            builder.RegisterType<WeatherHubDbContext>()
                .AsImplementedInterfaces()
                .AsSelf()
                .WithParameter("options", dbContextOptionsBuilder.Options)
                .InstancePerLifetimeScope();

            builder.RegisterType<MigrationDbContext>()
               .AsSelf()
               .WithParameter("options", dbContextOptionsBuilder.Options)
               .InstancePerLifetimeScope();

            builder.RegisterType<GroupNameGenerator>()
                .AsSelf();

            builder.RegisterAssemblyTypes(new[] { typeof(WeatherHub.Domain.WeatherHubDbContext).Assembly })
                .Where(x => ((TypeInfo)x).ImplementedInterfaces.Where(y => y.IsGenericType).Any(z => z.GetGenericTypeDefinition() == typeof(IRepository<>)))
                .AsSelf()
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterInstance(new SharedKeys { SignalRSharedKey = Configuration["SignalRSharedKey"] }).AsSelf();

            builder.RegisterType<SharedKeyAuthenticationRequirementAuthorizationHandler>()
                .As<IAuthorizationHandler>()
                .InstancePerLifetimeScope();
        }
    }
}
