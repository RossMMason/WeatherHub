﻿// <copyright file="HistoricReadingController.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WeatherHub.Domain.Entities;
    using WeatherHub.Domain.Repositories;
    using WeatherHub.Models;

    [Route("weather/{weatherStationId}/historic-readings")]
    [ApiController]
    public class HistoricReadingController : ControllerBase
    {
        private readonly ILogger<CurrentReadingController> _logger;
        private readonly IStationReadingRepository _stationReadingRepository;
        private readonly IWeatherStationRepository _weatherStationRepository;

        public HistoricReadingController(
            ILogger<CurrentReadingController> logger,
            IStationReadingRepository stationReadingRepository,
            IWeatherStationRepository weatherStationRepository)
        {
            _logger = logger;
            _stationReadingRepository = stationReadingRepository;
            _weatherStationRepository = weatherStationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<StationReadingDto>>> Get(Guid weatherStationId, DateTime rangeStart, DateTime? rangeEnd)
        {
            if (!rangeEnd.HasValue)
            {
                rangeEnd = DateTime.UtcNow;
            }

            if (rangeStart >= rangeEnd)
            {
                return BadRequest("Start range must be before end range.");
            }

            if ((rangeEnd.Value - rangeStart).TotalDays > 7)
            {
                return BadRequest("You may request a maximum of one weeks data per request.");
            }

            WeatherStation weatherStation = await _weatherStationRepository.GetByIdAsync(weatherStationId);

            if (weatherStation == null)
            {
                return BadRequest($"Unknown weather station with id {weatherStationId}");
            }

            var readings = await _stationReadingRepository
                .FetchReadingsAsync(weatherStationId, rangeStart, rangeEnd.Value)
                .ContinueWith(x => x.Result.Select(y => y.ToStationReadingDto(weatherStation.AltitudeM)));

            return Ok(readings);
        }
    }
}
