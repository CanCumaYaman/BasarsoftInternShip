using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basarsoft.Controllers
{
    public class NeighborhoodController : Controller
    {
       private readonly IGenericRepository
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]

        public IActionResult GetAll()
        {

        }
    }
}
