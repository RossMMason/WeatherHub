// <copyright file="ValuesController.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WeatherHub.Domain.Repositories;
    using WeatherHub.FrontEnd.Models;

    [Route("weather/{weatherStationId}/current-reading")]
    [ApiController]
    public class CurrentReadingController : ControllerBase
    {
        private readonly ILogger<CurrentReadingController> _logger;
        private readonly IStationReadingRepository _stationReadingRepository;

        public CurrentReadingController(
            ILogger<CurrentReadingController> logger,
            IStationReadingRepository stationReadingRepository)
        {
            _logger = logger;
            _stationReadingRepository = stationReadingRepository;
        }

        [HttpGet]
        public async Task<ActionResult<StationReadingDto>> Get(Guid weatherStationId)
        {
            var reading = await _stationReadingRepository.FetchLatestReadingAsync(weatherStationId);

            return Ok(reading.ToStationReadingDto());
        }

    }
}
