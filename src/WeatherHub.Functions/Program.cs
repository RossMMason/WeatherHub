using Microsoft.Azure.Functions.Worker.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using WeatherHub.Domain;
using WeatherHub.Domain.Repositories;

namespace WeatherHub.Functions
{
    public class Program
    {
        public static void Main()
        {
            var host = new HostBuilder()
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureServices((hostContext, services) => 
                {
                    DbContextOptionsBuilder dbContextOptionsBuilder = new();
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
                })
                .Build();

            host.Run();
        }
    }
}