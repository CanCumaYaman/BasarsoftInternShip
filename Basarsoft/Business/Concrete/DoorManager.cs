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
    public class DoorManager : IDoorManager
    {
        private readonly IDoorDal _doorDal;

        public DoorManager(IDoorDal doorDal)
        {
            _doorDal = doorDal ?? throw new ArgumentNullException(nameof(doorDal));
        }

        public async Task<List<Door>> GetAllAsync(Expression<Func<Door, bool>> filter = null)
        {
            return await _doorDal.GetAllAsync(filter);
        }


        public async Task AddAsync(Door entity)
        {
           await _doorDal.AddAsync(entity);
        }

        public async Task DeleteAsync(Door entity)
        {
            await _doorDal.DeleteAsync(entity);
        }

        public async Task UpdateAsync(Door entity)
        {
            await _doorDal.UpdateAsync(entity);
        }
    }
}
