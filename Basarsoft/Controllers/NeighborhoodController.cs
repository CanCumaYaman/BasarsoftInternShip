using Basarsoft.Business.Abstract;
using Basarsoft.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basarsoft.Controllers
{
    public class NeighborhoodController : Controller
    {
        private readonly INeighborhoodManager _neighborhoodManager;

        public NeighborhoodController(INeighborhoodManager neighborhoodManager)
        {
            _neighborhoodManager = neighborhoodManager;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]

        public JsonResult GetAll()
        {
            var _coords = _neighborhoodManager.GetAll();
            return Json(_coords);
        }

        [HttpPost]
        public JsonResult SaveNeighborhood(Neighborhood neighborhood)
        {
            _neighborhoodManager.Add(neighborhood);
            return Json("");
        }

        [HttpPut]

        public JsonResult Update( string result, int id)
        {
            var updateNeigh = _neighborhoodManager.GetAll(p => p.NeighborhoodCode == id).SingleOrDefault();
            updateNeigh.Coordinates = result;
            _neighborhoodManager.Update(updateNeigh);
            return Json("");
            
        }

        [HttpPut]

        public JsonResult UpdateName(int code,string newName)
        {
            var result = _neighborhoodManager.GetAll(p => p.NeighborhoodCode == code).SingleOrDefault();
            result.NeighborhoodName = newName;
            _neighborhoodManager.Update(result);
            return Json("");

        }

        [HttpDelete]

        public JsonResult Delete(int code)
        {
            _neighborhoodManager.Delete(code);
            return Json("");
        }


    }
}
