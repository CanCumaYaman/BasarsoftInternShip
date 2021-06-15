using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Basarsoft.Models
{
    public class Door
    {
        public int Id { get; set; }
        public int NeighborhoodNumber { get; set; }
        public int DoorNumber { get; set; }
        public NetTopologySuite.Geometries.Point Coordinates { get; set; }
  
    }
}
