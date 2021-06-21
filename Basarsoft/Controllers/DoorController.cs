using Basarsoft.Business.Abstract;
using Basarsoft.DataContext;
using Basarsoft.Dtos;
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
        private INeighborhoodManager _neighManager;

        public DoorController(IDoorManager doorManager, INeighborhoodManager neighManager)
        {
            _doorManager = doorManager;
            _neighManager = neighManager;
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

        [HttpGet]

        public JsonResult Filter(int neighborhoodCode,int doorNumber )
        {
            var _coords = _doorManager.GetAll(p => p.Id == doorNumber && p.NeighborhoodNumber == neighborhoodCode).SingleOrDefault();

            return Json(_coords);
        }

        [HttpPost]
        public JsonResult SavePoint(Door door, double x, double y, string no,int neighborhoodNumber)
        {
            if (ModelState.IsValid)
            {
                door.x = x;
                door.y = y;
                door.DoorNumber = no;
                door.NeighborhoodNumber = neighborhoodNumber;
                _doorManager.Add(door);
                
            }
            return Json("");
        }

        [HttpPost]

        public JsonResult GetInfo(int id,string type)
        {

            if (type == "Door")
            {
                
                var result = _doorManager.GetDoorById(id);
                if (result == null)
                {
                    return Json(new { error = "Door not found" });
                }
                else
                {
                    return Json(new { info = result });
                }

               }


            return Json(new { info = "" });
             
        }


    }
}
