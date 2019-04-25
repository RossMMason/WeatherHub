// <copyright file="IDbContext.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain
{
    using System.Threading;
    using System.Threading.Tasks;
    using WeatherHub.Domain.Entities;

    public interface IDbContext
    {
        int SaveChanges();

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);

        void SetOriginalVersion(IVersionedEntity entity, byte[] originalValue);
    }
}
