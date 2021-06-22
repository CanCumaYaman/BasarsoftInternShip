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

        public JsonResult List()
        {
            var _coords = _neighborhoodManager.GetAll();
            return Json(_coords);
        }

        [HttpPost]
        public JsonResult SaveNeighborhood(Neighborhood neighborhood, string result, string no)
        {
            if (ModelState.IsValid)
            {
                neighborhood.Coordinates =result;
                neighborhood.NeighborhoodName = no;
                _neighborhoodManager.Add(neighborhood);

            }
            return Json("");
        }

        [HttpPost]

        public JsonResult Update( string result, int id)
        {
            var updateNeigh = _neighborhoodManager.GetAll(p => p.NeighborhoodCode == id).SingleOrDefault();
            updateNeigh.Coordinates = result;
            _neighborhoodManager.Update(updateNeigh);
            return Json("");
            
        }


    }
}
