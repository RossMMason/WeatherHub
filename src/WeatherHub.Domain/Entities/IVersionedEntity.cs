// <copyright file="IVersionedEntity.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Entities
{
    public interface IVersionedEntity
    {
        byte[] Version { get; set; }
    }
}
