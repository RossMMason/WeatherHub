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

    [Route("weather/{weatherStationId}/day-statistics")]
    [ApiController]
    public class DayStatisticsController : Controller
    {
        private IStationDayStatisticsRepository _stationDayStatisticsRepository;
        private IWeatherStationRepository _weatherStationRepository;

        public DayStatisticsController(
            IStationDayStatisticsRepository stationDayStatisticsRepository,
            IWeatherStationRepository weatherStationRepository)
        {
            _stationDayStatisticsRepository = stationDayStatisticsRepository;
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

            return Ok(stationDayStatistics.ToStationDayStatisticsDto());
        }
    }
}