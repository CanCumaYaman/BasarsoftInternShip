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

        public List<Neighborhood> GetAll(Expression<Func<Neighborhood, bool>> filter = null)
        {
            return  _neighborhoodDal.GetAll(filter);
        }
        
        public void Add(Neighborhood entity)
        {
           _neighborhoodDal.Add(entity);
        }
        

        public void Delete(Neighborhood entity)
        {
             _neighborhoodDal.Delete(entity);
        }

       

        public void Update(Neighborhood entity)
        {
           _neighborhoodDal.Update(entity);
        }
    }
}
