using Basarsoft.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Basarsoft.Business.Abstract
{
   public interface INeighborhoodManager
    {
        Task<List<Neighborhood>> GetAllAsync(Expression<Func<Neighborhood, bool>> filter = null);
        Task AddAsync(Neighborhood entity);
        Task UpdateAsync(Neighborhood entity);
        Task DeleteAsync(Neighborhood entity);
    }
}
