using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Basarsoft.DataAccess.Abstract
{
   public interface IGenericRepository<T> where T: new()
    {
        Task<List<T>> GetAllAsync(Expression<Func<T, bool>> filter = null);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);

    }
}
