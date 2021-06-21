using Basarsoft.DataAccess.Abstract;
using Basarsoft.DataAccess.Concrete.Base;
using Basarsoft.DataContext;
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

      
    }
}
