using Basarsoft.DataAccess.Abstract;
using Basarsoft.DataAccess.Concrete.Base;
using Basarsoft.DataContext;
using Basarsoft.Dtos;
using Basarsoft.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basarsoft.DataAccess.Concrete
{
    public class DoorDal:GenericRepositoryBase<Door>,IDoorDal
    {
        private readonly ApplicationDbContext _context;
        public DoorDal(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public DoorDto GetDoorById(int id)
        {
            var result = from door in _context.Doors
                         join neigh in _context.Neighborhoods
                         on door.NeighborhoodNumber equals neigh.NeighborhoodCode
                         where door.Id == id
                         select new DoorDto
                         {
                             DoorNumber = door.DoorNumber,
                             NeighborhoodName = neigh.NeighborhoodName,
                             x = door.x,
                             y = door.y,
                             NeighborhoodNumber=neigh.NeighborhoodCode
                         };
            return result.FirstOrDefault();

        }
    }
}
