// <copyright file="Program.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd
{
    using Autofac.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;

    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();

                    webBuilder.ConfigureAppConfiguration((hostingContext, configBuilder) =>
                    {
                        configBuilder.SetBasePath(hostingContext.HostingEnvironment.ContentRootPath);

                        configBuilder.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

                        if (hostingContext.HostingEnvironment.IsDevelopment())
                        {
                            configBuilder.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);
                        }

                        configBuilder.AddEnvironmentVariables();
                    });

                    webBuilder.ConfigureLogging((hostingContext, logging) =>
                    {
                        if (hostingContext.HostingEnvironment.EnvironmentName.Equals("Development", System.StringComparison.OrdinalIgnoreCase))
                        {
                            logging.AddConsole();
                            logging.AddDebug();
                        }
                    });
                });
    }
}
