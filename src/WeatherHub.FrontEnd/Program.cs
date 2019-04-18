// <copyright file="Program.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd
{
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;

    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, configuration) =>
                    {
                        configuration.SetBasePath(hostingContext.HostingEnvironment.ContentRootPath);
                        configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

                        if (hostingContext.HostingEnvironment.IsProduction())
                        {
                            configuration.AddJsonFile("environmentSettings.Production.json", optional: true, reloadOnChange: true);
                        }
                    })
                .UseApplicationInsights()
                .UseStartup<Startup>();
    }
}
