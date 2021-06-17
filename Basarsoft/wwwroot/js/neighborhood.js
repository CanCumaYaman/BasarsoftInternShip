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
        content: 'No: <input id="neigh_no" type="text"/><br><br><br><button style="height:40px;width:60px" id="neigh_add" class="btn btn-success">Add</button>',
        callback: function () {
            this.content.style.padding = '20px';
        }
    });
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
                for (var i = 0; i < splittedCoords.length; i++) {

                    var neighborhood = splittedCoords[i];
                    var sp = neighborhood.split(',');
                    coords.push([sp[0], sp[1]]);
                }

                coordList.push(coords);
               
                idList.push(code);
            }
          
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
                    name: "Neighborhood",
                    geometry: new ol.geom.Polygon([coordList[i]])
                });
               
                var featureID = idList[i]
                feature.setId(featureID);
                feature.set("adi", "123");
               

                feature.setStyle(polygon);
                features.push(feature);
            }
            var neighSource = neigh_layer.getSource();

            neighSource.addFeatures(features);

        },

        error: function () {
            alert("upsss");
        },

    });
}