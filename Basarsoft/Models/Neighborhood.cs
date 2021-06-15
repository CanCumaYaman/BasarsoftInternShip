using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Basarsoft.Models
{
    public class Neighborhood
    {

        public int Id { get; set; }
        public string NeighborhoodName { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NeighborhoodCode { get; set; }
        public NetTopologySuite.Geometries.Point Coordinates { get; set; }
    }
}
