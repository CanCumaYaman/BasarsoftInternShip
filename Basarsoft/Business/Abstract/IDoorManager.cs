using Basarsoft.Dtos;
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
        List<Door> GetAll(Expression<Func<Door, bool>> filter = null);
        void Add(Door entity);
        void Update(Door entity);
        void Delete(Door entity);
        DoorDto GetDoorById(int id);
    }
}
