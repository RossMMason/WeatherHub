// <copyright file="Program.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Functions
{
    using System.Linq;
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using WeatherHub.Domain;
    using WeatherHub.Domain.Repositories;

    public class Program
    {
        public static void Main()
        {
            var host = new HostBuilder()
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureServices((hostContext, services) =>
                {
                    DbContextOptionsBuilder dbContextOptionsBuilder = new ();
                    dbContextOptionsBuilder.UseSqlServer(hostContext.Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("Fhah.Administration.Domain.Migrations"));

                    services.AddScoped(f => { return new WeatherHubDbContext(dbContextOptionsBuilder.Options); });
                    services.AddScoped<IDbContext>(f => { return f.GetRequiredService<WeatherHubDbContext>(); });

                    var repositoryTypes =
                        typeof(WeatherHubDbContext)
                        .Assembly
                        .GetTypes()
                        .Where(x => ((TypeInfo)x).ImplementedInterfaces.Where(y => y.IsGenericType).Any(z => z.GetGenericTypeDefinition() == typeof(IRepository<>)));

                    foreach (var repositoryType in repositoryTypes)
                    {
                        foreach (var interfaceType in repositoryType.GetInterfaces().Where(x => !x.IsGenericType))
                        {
                            services.AddScoped(interfaceType, repositoryType);
                        }
                    }

                    services.AddSingleton(f => new StorageQueueSettings
                    {
                        StorageConnectionString = hostContext.Configuration.GetValue<string>("AzureWebJobsStorage"),
                    });

                    services.AddSingleton(f =>
                    {
                        return new SignalRSettings
                        {
                            HubUri = hostContext.Configuration.GetValue<string>("SignalRHubUri"),
                            SharedKey = hostContext.Configuration.GetValue<string>("SignalRSharedKey"),
                        };
                    });
                })
                .Build();

            host.Run();
        }
    }
}