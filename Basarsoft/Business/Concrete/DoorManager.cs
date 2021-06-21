using Basarsoft.Business.Abstract;
using Basarsoft.DataAccess.Abstract;
using Basarsoft.Dtos;
using Basarsoft.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Basarsoft.Business.Concrete
{
    public class DoorManager : IDoorManager
    {
        private readonly IDoorDal _doorDal;

        public DoorManager(IDoorDal doorDal)
        {
            _doorDal = doorDal ?? throw new ArgumentNullException(nameof(doorDal));
        }

        public List<Door> GetAll(Expression<Func<Door, bool>> filter = null)
        {
            return _doorDal.GetAll(filter);
        }

        public DoorDto GetDoorById(int id)
        {
            return _doorDal.GetDoorById(id);
        }

        public void Add(Door entity)
        {
            _doorDal.Add(entity);
        }

        public void Delete(Door entity)
        {
            _doorDal.Delete(entity);
        }

        public void Update(Door entity)
        {
             _doorDal.Update(entity);
        }

       
    }
}
