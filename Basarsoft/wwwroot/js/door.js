var door;
function addDoorInteraction() {
    door = new ol.interaction.Draw({
       
        source: source,
        type: 'Point'
    });

    map.addInteraction(door);
    door.setActive(false);

}

function ActiveDoor() {
    door.setActive(true);
}

addDoorInteraction();

door.on('drawend', function (e) {

    var currentFeature = e.feature;
    console.log(currentFeature.get('name'));
    
    var coords = currentFeature.getGeometry().getCoordinates();
    door.setActive(false);
 
    jsPanel.create({
        id: "door_add_panel",
        theme: 'success',
        headerTitle: 'Add door',
        position: 'center-top 0 58',
        contentSize: '320 300',
        content: '<h5>X: <span id="xcord"></span></h5> </br> <h5>Y: <span id="ycord"></span></h5> </br> No: <input id="door_no" type="text"/><br><br><br><button style="height:40px;width:60px" id="door_add" class="btn btn-success">Add</button>',
        callback: function () {
            this.content.style.padding = '20px';
        }
    });

    document.getElementById("xcord").innerHTML = coords[0].toString().replace('.', ',');
    document.getElementById("ycord").innerHTML = coords[1].toString().replace('.', ',');

    document.getElementById('door_add').onclick = function () {

        var no = $('#door_no').val();

        if (no.length < 1) {

            alert("Please enter door no");

            return;
        }

        var _data = {
            x: coords[0].toString().replace('.', ','),
            y: coords[1].toString().replace('.', ','),
            no: no
        };
      
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
    }
});

function ListAllPoints() {

    $.ajax({
        type: "GET",
        url: "/Door/List",
        dataType: 'json',
        success: function (response) {

            var features = [];

            for (var i = 0; i < response.length; i++) {
                var point = response[i];
                var id = point.id;
                var geo = new ol.geom.Point([point.x, point.y]);

                var feature = new ol.Feature({ 
                    name: "Door",
                    geometry: geo,

                });
                feature.add

                feature.setId(id);

                var style = new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: 'rgba(255,0,0,0.2)',
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'red',
                            width: 1
                        }),
                        radius: 10
                    }),
                });

                feature.setStyle(style);

                features.push(feature);
            }
          

            var pointSource = door_layer.getSource();

            pointSource.addFeatures(features);
        },

        error: function () {
            alert("Something went wrong");
        },

    });
};

