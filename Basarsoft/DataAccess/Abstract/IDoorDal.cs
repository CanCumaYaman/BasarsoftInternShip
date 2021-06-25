using Basarsoft.Dtos;
using Basarsoft.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basarsoft.DataAccess.Abstract
{
   public  interface IDoorDal:IGenericRepository<Door>
    {
        DoorDto GetDoorById(int id);
       List<FilteredDoorDto>  GetDoorDto();
    }
}
