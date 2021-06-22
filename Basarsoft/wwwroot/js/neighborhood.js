var add_neigh;
function addDaireInteraction() {
    add_neigh = new ol.interaction.Draw({
        source: source,
        type: 'Polygon'
    });

    map.addInteraction(add_neigh);
    add_neigh.setActive(false);

}

function ActiveNeigh() {
    add_neigh.setActive(true);
}

addDaireInteraction();


add_neigh.on('drawend', function (e) {

    var currentFeature = e.feature;

    var _coords = currentFeature.getGeometry().getCoordinates();
    add_neigh.setActive(false);
   
    jsPanel.create({
        id: "neigh_add_panel",
        theme: 'success',
        headerTitle: 'Add Neighborhood',
        position: 'center-top 0 58',
        contentSize: '300 250',
        content: '<h5><span id="coord"></span></h5>Neighborhood Name: <input id="neigh_no" type="text"/><br><br><br><button style="height:40px;width:60px" id="neigh_add" class="btn btn-success">Add</button>',
        callback: function () {
            this.content.style.padding = '20px';
        }
    });
    document.getElementById("coord").innerHTML = _coords;
    document.getElementById('neigh_add').onclick = function () {
       
        var _no = $('#neigh_no').val();

        if (_no.length < 1) {

            alert("Please enter neighborhood name");

            return;
        }
        var i = 0;
        var result = "";
        while (i < 1) {
            for (j = 0; j < _coords[0].length; j++) {
                if (j == _coords[0].length - 1) {
                    result = result + _coords[i][j];
                    
                } else {
                    result = result + _coords[i][j] + "*";
                }
                
            }
            i = 1;
        }

        var _data = {
            result: result,
            no: _no
        };
        $.ajax({
            type: "POST",
            url: "/Neighborhood/SaveNeighborhood",
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
    }
});

function ListAllPolygons() {
    $.ajax({
        type: "GET",
        url: "/Neighborhood/List",
        dataType: 'json',
        success: function (response) {

            var features = [];
            var coordList = [];
            var idList = [];

            for (var j = 0; j < response.length; j++) {
                var coords = [];
                var data = response[j];
                var code = data.neighborhoodCode;
                var splittedCoords = data.coordinates.split('*');
                var neigh_name = data.neighborhoodName;

                var name = data.neighborhoodName;

                $('#neigh_list').append($('<option>',
                    {
                        value: data.neighborhoodCode,
                        text: name
                    }));
                for (var i = 0; i < splittedCoords.length; i++) {

                    var neighborhood = splittedCoords[i];
                    var sp = neighborhood.split(',');
                    coords.push([sp[0], sp[1]]);
                }

                coordList.push(coords);
               
                idList.push(code);
           
          
            var polygon = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'blue',
                    width: 1,
                    
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 255, 0.1)',
                }),

            });
           
           
            for (var i = 0; i < coordList.length; i++) {

                var feature = new ol.Feature({
                    name: neigh_name,
                    type:'Neighborhood',
                    geometry: new ol.geom.Polygon([coordList[i]])
                });
               
                var featureID = idList[i]
                feature.setId(featureID);
                feature.set("adi", "123");
               

               // feature.setStyle(polygon);
                features.push(feature);
            }
            }
            var neighSource = neigh_layer.getSource();

            neighSource.addFeatures(features);

        },

        error: function () {
            alert("Something went wrong");
        },

    });
}

function ActiveEdit() {

    var select = new ol.interaction.Select({
        wrapX: false
    });
    var modify = new ol.interaction.Modify({
        features: select.getFeatures()
    });
    map.addInteraction(select);
    map.addInteraction(modify);

    modify.on('modifyend', function (e) {
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

        var panel1=jsPanel.create({
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
        toastr.options = {
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000
        }
        document.getElementById("neigh_edit").onclick = function () {
            panel1.close();
            $.ajax({
                type: "POST",
                url: "/Neighborhood/Update",
                dataType: 'json',
                data: _data,
                success: function (response) {
                   
                    toastr.success('Successfully updated');
                    setTimeout(function () {
                        location.reload();
                    }, 2000);

                },
                error: function () {
                    toastr.success('Something went wrong while updating');
                }
            });
        }
            
    });
   
}