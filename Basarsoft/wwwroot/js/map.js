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
           
            var _type = feature.get('name');
            var _id = feature.getId();
            var type = feature.get('type');

            
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
                            content = 'Door Number: <input id="yeni_no" type="text"  value=" ' + resp.info.doorNumber + ' "/><br></br>Neighborhood Name: <input id="info_neigh" type="text"  value=" ' + resp.info.neighborhoodName + ' "/>';

                        }
                       
                        jsPanel.create({
                            id: "show_info",
                            theme: 'success',
                            headerTitle: 'Door Information',
                            position: 'center-top 0 58',
                            contentSize: '300 250',
                            content: content,
                            callback: function () {

                                _type = "";
                                _id = 0;
                                this.content.style.padding = '20px';
                            },
                        });

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
                        contentSize: '300 250',
                        content: 'Neighborhood Name : <input id="neigh_name" type="text"  value=" ' + _type + '"/>',
                        callback: function () {
                            this.content.style.padding = '20px';
                        },
                  });
                    
                }
           
          
            

        });
    });
})






