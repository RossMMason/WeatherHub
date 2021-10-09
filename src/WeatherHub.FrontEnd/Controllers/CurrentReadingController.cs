// <copyright file="CurrentReadingController.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WeatherHub.Domain.Entities;
    using WeatherHub.Domain.Repositories;
    using WeatherHub.Models;

    [Route("weather/{weatherStationId}/current-reading")]
    [ApiController]
    public class CurrentReadingController : ControllerBase
    {
        private readonly ILogger<CurrentReadingController> _logger;
        private readonly IStationReadingRepository _stationReadingRepository;
        private readonly IWeatherStationRepository _weatherStationRepository;

        public CurrentReadingController(
            ILogger<CurrentReadingController> logger,
            IStationReadingRepository stationReadingRepository,
            IWeatherStationRepository weatherStationRepository)
        {
            _logger = logger;
            _stationReadingRepository = stationReadingRepository;
            _weatherStationRepository = weatherStationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<StationReadingDto>> Get(Guid weatherStationId)
        {
            WeatherStation weatherStation = await _weatherStationRepository.GetByIdAsync(weatherStationId);

            if (weatherStation == null)
            {
                return BadRequest($"Unknown weather station with id {weatherStationId}");
            }

            var reading = await _stationReadingRepository.FetchLatestReadingAsync(weatherStationId);

            return Ok(reading.ToStationReadingDto(weatherStation.AltitudeM));
        }
    }
}
