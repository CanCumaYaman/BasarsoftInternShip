﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basarsoft.Controllers
{
    public class NeighborhoodController : Controller
    {
       
        public IActionResult Index()
        {
            return View();
        }

      
    }
}
