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

        public JsonResult GetAll()
        {
            var _coords = _doorManager.GetAll();
            return Json(_coords);
        }

        [HttpGet]

        public JsonResult Filter(int id)
        {
            var _coords = _doorManager.GetAll(p => p.Id ==id).SingleOrDefault();

            return Json(_coords);
        }

        [HttpPost]
        public JsonResult SavePoint(Door door)
        {
            _doorManager.Add(door);
            return Json("");
        }

        [HttpGet]

        public JsonResult GetAllDoorDto()
        {
            var result = _doorManager.GetDoorDto();
            return Json(new { info = result });
        }

        [HttpGet]

        public JsonResult GetInfo(int id)
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


        [HttpPut]

        public JsonResult Update(int id,string newNo)
        {
            var result = _doorManager.GetAll(p => p.Id == id).SingleOrDefault();
            result.DoorNumber = newNo;
            _doorManager.Update(result);
            return Json("");
        }
        [HttpPut]

        public JsonResult UpdateCoord(double x,double y, int id)
        {
            var updateDoor = _doorManager.GetAll(p => p.Id == id).SingleOrDefault();
            updateDoor.x = x;
            updateDoor.y = y;
            _doorManager.Update(updateDoor);
            return Json("");

        }

        [HttpDelete]

        public JsonResult Delete(int id)
        {
            _doorManager.Delete(id);
            
            return Json(new { info = "" });
        }



    }
}
