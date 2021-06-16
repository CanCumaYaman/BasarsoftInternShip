using Basarsoft.Business.Abstract;
using Basarsoft.DataContext;
using Basarsoft.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basarsoft.Controllers
{
    public class DoorController : Controller
    {
        private IDoorManager _doorManager;

        public DoorController(IDoorManager doorManager)
        {
            _doorManager = doorManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]

        public JsonResult List()
        {
            var _coords = _doorManager.GetAll();
            return Json(_coords);
        }

        [HttpPost]
        public JsonResult SavePoint(Door door, double x, double y, string no)
        {
            if (ModelState.IsValid)
            {
                door.x = x;
                door.y = y;
                door.DoorNumber = no;
                door.NeighborhoodNumber = 13;
                _doorManager.Add(door);
                
            }
            return Json("");
        }


    }
}
