using Basarsoft.DataAccess.Abstract;
using Basarsoft.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Basarsoft.DataAccess.Concrete.Base
{
    public class GenericRepositoryBase<T> : IGenericRepository<T> where T : class,new()
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepositoryBase(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = _context.Set<T>();
        }

        public async  Task<List<T>> GetAllAsync(Expression<Func<T, bool>> filter = null)
        {
            return   filter == null ? await _dbSet.ToListAsync() : await _dbSet.Where(filter).ToListAsync();
        }
        
        public async Task AddAsync(T entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

       
    }
}
