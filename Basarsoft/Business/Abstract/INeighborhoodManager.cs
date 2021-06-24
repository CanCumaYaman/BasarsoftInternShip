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
        List<Neighborhood> GetAll(Expression<Func<Neighborhood, bool>> filter = null);
        void Add(Neighborhood entity);
        void Update(Neighborhood entity);
        void Delete(int id);
    }
}
