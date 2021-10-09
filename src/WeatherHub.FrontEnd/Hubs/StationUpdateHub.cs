// <copyright file="StationUpdateHub.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Hubs
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    using WeatherHub.FrontEnd.Authorization;
    using WeatherHub.Models;

    public class StationUpdateHub : Hub<IStationUpdateHub>
    {
        private readonly GroupNameGenerator _groupNameGenerator;

        public StationUpdateHub(GroupNameGenerator groupNameGenerator)
        {
            _groupNameGenerator = groupNameGenerator;
        }

        public async Task SubscribeToStationReadingUpdates(Guid stationId)
        {
            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                _groupNameGenerator.GetNewReadingGroupName(stationId));
        }

        public async Task SubscribeToStationStatisticUpdates(Guid stationId)
        {
            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                _groupNameGenerator.GetNewStatisticsGroupName(stationId));
        }

        [AuthenticateToken]
        public async Task NewStationReading(Guid stationId, StationReadingDto stationReading)
        {
            await Clients.Group(_groupNameGenerator.GetNewReadingGroupName(stationId))
                .NewStationReading(stationId, stationReading);
        }

        [AuthenticateToken]
        public async Task UpdatedStationStatistics(Guid stationId, StationStatisticsDto stationStatistics)
        {
            await Clients
               .Group(_groupNameGenerator.GetNewStatisticsGroupName(stationId))
               .UpdatedStationStatistics(stationId, stationStatistics);
        }
    }
}
