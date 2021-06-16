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

        public List<T> GetAll(Expression<Func<T, bool>> filter = null)
        {
            return   filter == null ?  _dbSet.ToList() :  _dbSet.Where(filter).ToList();
        }
        
        public void Add(T entity)
        {
            _dbSet.Add(entity);
             _context.SaveChanges();
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
             _context.SaveChanges();
        }
        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

       
    }
}
