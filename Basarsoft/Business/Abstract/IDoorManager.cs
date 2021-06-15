using Basarsoft.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Basarsoft.Business.Abstract
{
   public interface IDoorManager
    {
        Task<List<Door>> GetAllAsync(Expression<Func<Door, bool>> filter = null);
        Task AddAsync(Door entity);
        Task UpdateAsync(Door entity);
        Task DeleteAsync(Door entity);
    }
}
