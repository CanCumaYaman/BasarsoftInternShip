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

        public JsonResult GetInfo(int? id,string type)
        {
            if (id == null)
            {
                return Json(new { hata = "ID Bilgisi Gönderilmedi" });
            }

            if (type == "Door")
            {
                Door door = _doorManager.GetAll(p => p.Id == id).SingleOrDefault();
                var neighborhood = _neighManager.GetAll(p => p.NeighborhoodCode == door.NeighborhoodNumber).SingleOrDefault();
                DoorDto doorDto = new DoorDto();
                doorDto.DoorNumber = door.DoorNumber;
                doorDto.NeighborhoodName = neighborhood.NeighborhoodName;
                doorDto.x = door.x;
                doorDto.y = door.y;
                if (door == null)
                {
                    return Json(new { hata = "Bilgi Bulunamadı" });
                }
                else
                {
                    return Json(new { info = doorDto });
                }

            }


            return Json(new { info = "" });
        }


    }
}
