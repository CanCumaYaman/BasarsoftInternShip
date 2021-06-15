using Basarsoft.Business.Abstract;
using Basarsoft.DataAccess.Abstract;
using Basarsoft.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Basarsoft.Business.Concrete
{
    public class NeighborhoodManager : INeighborhoodManager
    {
        private readonly INeighborhoodDal _neighborhoodDal;

        public NeighborhoodManager(INeighborhoodDal neighborhoodDal)
        {
            _neighborhoodDal = neighborhoodDal ?? throw new ArgumentNullException(nameof(neighborhoodDal));
        }

        public async Task<List<Neighborhood>> GetAllAsync(Expression<Func<Neighborhood, bool>> filter = null)
        {
            return await _neighborhoodDal.GetAllAsync(filter);
        }
        public async Task AddAsync(Neighborhood entity)
        {
          await _neighborhoodDal.AddAsync(entity);
        }

        public async Task DeleteAsync(Neighborhood entity)
        {
            await _neighborhoodDal.DeleteAsync(entity);
        }

       

        public async Task UpdateAsync(Neighborhood entity)
        {
           await _neighborhoodDal.UpdateAsync(entity);
        }
    }
}
