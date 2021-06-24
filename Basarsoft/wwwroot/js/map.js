$(window).on('load', function () {
    ListAllPoints();
    ListAllPolygons();
});
var raster = new ol.layer.Tile({
    preload: Infinity,
    source: new ol.source.BingMaps({
        key: 'Av_kDzzEbj4a86y7tlCRPp3H5OtG1JiZXLANyJXnGzJGI5A57GYgBcHm7lCPtvmZ',
        imagerySet: 'AerialWithLabelsOnDemand',
        projection: 'EPSG:3857'

    })
});

var source = new ol.source.Vector({ wrapX: false });

var vector = new ol.layer.Vector({
    source: source
});

var door_layer = new ol.layer.Vector({
    source: new ol.source.Vector()
});
var neigh_layer = new ol.layer.Vector({
    source: new ol.source.Vector()
});

var map = new ol.Map({
    layers: [raster, vector, door_layer, neigh_layer],
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([34.9744, 39.0128]),
        zoom: 6,
        projection: "EPSG:3857"

    })

});


var info;

function addInfoInteraction() {

    info = new ol.interaction.Draw({
        source: source,
        type: 'Point'
    });

    map.addInteraction(info);

    info.setActive(false);

}
function ActiveInfo() {
    info.setActive(true);
}


addInfoInteraction();

info.on('drawend', function (e) {
   
    map.on("click", function (event) {
        console.log(e);
        info.setActive(false);

        map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            var code = feature.get('code');
            var _type = feature.get('name');
            var _id = feature.getId();
            var type = feature.get('type');
            var center = feature.get("center");
            
            
            if (_type == 'Door') {
                
                $.ajax({
                    url: '/Door/GetInfo',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        type: _type,
                        id: _id,
                    },
                    success: function (resp) {
                       
                        var content;
                       
                        if (_type == 'Door') {

                            content = 'Door Number: <input id="yeni_no" type="text"  value=" ' + resp.info.doorNumber + ' "/></br>Neighborhood Name: <input id="info_neigh" type="text"  value=" ' + resp.info.neighborhoodName + ' "/><br></br>Neighborhood Code: <span id="neigh_num"></span><br><br>X: <span id="door_x"></span><br>Y: <span id="door_y"></span></br><button class="btn btn-info" style="margin-right:5px;margin-top:10px;">Save Changes</button><button class="btn btn-danger" style="margin-top:10px;">Delete</button>';
                            
                        }
                        
                        jsPanel.create({
                            id: "show_info",
                            theme: 'success',
                            headerTitle: 'Door Information',
                            position: 'center-top 0 58', 
                            contentSize: '300 330',
                            content: content,
                            callback: function () {

                                _type = "";
                                _id = 0;
                                this.content.style.padding = '20px';
                            },
                        });
                        $("#neigh_num").text(resp.info.neighborhoodNumber);
                        $("#door_x").text(resp.info.x);
                        $("#door_y").text(resp.info.y);
                    }
                })
                
            }
           
           else 
                if (type == 'Neighborhood') {
                  var panel2=jsPanel.create({
                        id: "show_n_info",
                        theme: 'success',
                        headerTitle: 'Neighborhood information',
                        position: 'center-top 0 58',
                        contentSize: '300 230',
                      content: 'Neighborhood Name : <input id="neigh_name" class="mb-2" type="text"  value=" ' + _type + '"/></br>Neighborhood Code : <span id="neigh_code"></span></br>Center X: <span id="neigh_center_x"></span><br>Center Y: <span id="neigh_center_y"></span><br><button class="btn btn-info" style="margin-right:5px;margin-top:10px;">Save Changes</button><button class="btn btn-danger" style="margin-top:10px;">Delete</button>',
                        callback: function () {
                            this.content.style.padding = '20px';
                        },
                  });
                    $("#neigh_code").text(code);
                    $("#neigh_center_x").text(center[0]);
                    $("#neigh_center_y").text(center[1]);
                }
           
          
            

        });
    });
})






