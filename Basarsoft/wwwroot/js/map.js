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
                    jsPanel.create({
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

function ActiveEdit() {


var select = new ol.interaction.Select({
    wrapX: false
});
var modify = new ol.interaction.Modify({
    features: select.getFeatures()
});
map.addInteraction(select);
map.addInteraction(modify);
//select.setActivate(false);
//modify.setActivate(false);

modify.on('modifyend',function (e) {
    //alert('Düzenleme Bitti');
    console.log("Düzenleme bitti");
   // var currentFeature = e.feature;
    console.log(e.features);
    console.log(e.features.getArray()[0].values_.geometry.flatCoordinates);
    var newCoordinates = e.features.getArray()[0].values_.geometry.flatCoordinates
    var leng = e.features.getArray()[0].values_.geometry.flatCoordinates.length;
    var neighId = e.features.getArray()[0].getId();
    var result = "";

    for (j = 0; j < leng; j++) {
        if (j == leng - 1) {
            result = result + newCoordinates[j];

        } else if (j % 2 == 0) {
            result = result + newCoordinates[j] + ",";

        } else {
            result = result + newCoordinates[j] + "*";
        }

    }

    var _data = {
        result: result,
        id: neighId
    }


    jsPanel.create({
        id: "neigh_edit_panel",
        theme: 'success',
        headerTitle: 'Neighborhood Edit',
        position: 'center-top 0 58',
        contentSize: '370 150',
        content: '<div class="text-center"><h5>Do you want to save changes?</h5><button style="height:40px;width:60px;" id="neigh_edit" class="btn btn-success">Yes</button><button style="height:40px;width:60px;margin-left:10px;" id="neigh_edit_cancel" class="btn btn-danger">No</button></div>',
        callback: function () {
           this.content.style.padding = '20px';
        }
    });
    
    setTimeout(function () {

        
    }, 3000); 

    document.getElementById("neigh_edit").onclick = function () {
        
        $.ajax({
            type: "POST",
            url: "/Neighborhood/Update",
            dataType: 'json',
            data:_data,
            success: function (response) {
                alert("Succesfully updated");
                
            },
            error: function () {
                alert("Something went wrong while updating");
            }
        });
    }


        /*
       $.ajax({
            type: "POST",
            url: "/Door/SavePoint",
            dataType: 'json',
            data: _data,
            success: function (message) {
                alert("Successfully added");

                door.setActive(false);
            },

            error: function () {
                alert("Something went wrong");
            },
            onbeforeclose: function () {
                return onbeforeclose();
            },
        });
     */

    console.log("feature id is",e.features.getArray()[0].getId());
});
modify.on('change:active', function (e) {
   // alert('change:active');
    console.log("Change:active");
    console.log(e);
    //console.log("feature id is",e.features.getArray()[0].getId());
});
modify.on('propertychange', function (e) {
   // alert('Propery Change');
    console.log("Propery Change");
    console.log(e);
    //console.log("feature id is",e.features.getArray()[0].getId());
});

select.setActive(true);
}




