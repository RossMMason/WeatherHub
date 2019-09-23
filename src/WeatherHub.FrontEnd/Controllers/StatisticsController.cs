// <copyright file="DayStatisticsController.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using WeatherHub.Domain.Entities;
    using WeatherHub.Domain.Repositories;
    using WeatherHub.FrontEnd.Models;

    [Route("weather/{weatherStationId}/statistics")]
    [ApiController]
    public class StatisticsController : Controller
    {
        private IStationDayStatisticsRepository _stationDayStatisticsRepository;
        private IStationReadingRepository _stationReadingRepository;
        private IWeatherStationRepository _weatherStationRepository;

        public StatisticsController(
            IStationDayStatisticsRepository stationDayStatisticsRepository,
            IStationReadingRepository stationReadingRepository,
            IWeatherStationRepository weatherStationRepository)
        {
            _stationDayStatisticsRepository = stationDayStatisticsRepository;
            _stationReadingRepository = stationReadingRepository;
            _weatherStationRepository = weatherStationRepository;
        }

        [Route("{forDate}")]
        [HttpGet]
        public async Task<ActionResult<StationDayStatisticsDto>> Get(Guid weatherStationId, DateTime forDate)
        {
            WeatherStation weatherStation = await _weatherStationRepository.GetByIdAsync(weatherStationId);

            if (weatherStation == null)
            {
                return BadRequest($"Unknown weather station with id {weatherStationId}");
            }

            var stationDayStatistics = await _stationDayStatisticsRepository.FetchForDateAsync(weatherStation.Id, forDate.Date);
            var lastRain = await _stationReadingRepository.FetchLastRainDateAsync(weatherStationId);

            StationStatisticsDto dto = new StationStatisticsDto
            {
                DayStatistics = stationDayStatistics.ToStationDayStatisticsDto(),
                LastRain = lastRain
            };

            return Ok(dto);
        }
    }
}