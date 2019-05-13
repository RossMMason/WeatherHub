// <copyright file="Repository.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.Domain.Repositories
{
    public class Repository<T> : IRepository<T>
        where T : class
    {
        private readonly WeatherHubDbContext _dbContext;

        public Repository(WeatherHubDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Create(T entity)
        {
            _dbContext.Add(entity);
        }

        public void Delete(T entity)
        {
            _dbContext.Remove(entity);
        }

        public void Update(T entity)
        {
            _dbContext.Update(entity);
        }
    }
}