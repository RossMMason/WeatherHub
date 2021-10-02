// <copyright file="StationUpdateHub.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Functions.Hubs
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;

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
    }
}
