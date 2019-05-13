// <copyright file="IRepository.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Repositories
{
    public interface IRepository<T>
        where T : class
    {
        void Create(T entity);

        void Delete(T entity);

        void Update(T entity);
    }
}