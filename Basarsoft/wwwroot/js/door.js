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

    var _coords = currentFeature.getGeometry().getCoordinates();
    door.setActive(false);

    jsPanel.create({
        id: "door_add_panel",
        theme: 'success',
        headerTitle: 'Add door',
        position: 'center-top 0 58',
        contentSize: '300 250',
        content: 'No: <input id="door_no" type="text"/><br><br><br><button style="height:40px;width:60px" id="door_add" class="btn btn-success">Add</button>',
        callback: function () {
            this.content.style.padding = '20px';
        }
    });
    document.getElementById('door_add').onclick = function () {

        var _no = $('#door_no').val();

        if (_no.length < 1) {

            alert("Please enter door no");

            return;
        }

        //kapının kordinatlarını x ve y değişkenlerine attım
        var _data = {
            x: _coords[0].toString().replace('.', ','),
            y: _coords[1].toString().replace('.', ','),
            no: _no
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

            var _features = [];

            for (var i = 0; i < response.length; i++) {

                //her bir pointin x,y koordinatlarını aldım.

                var _point = response[i];
                var _id = _point.Id
                var _geo = new ol.geom.Point([_point.x, _point.y]);

                var featurething = new ol.Feature({
                    name: "Door",
                    geometry: _geo,

                });

                featurething.setId(_id)

                //feature oluşutup buna noktaları atadım ve style verdim

                var _style = new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                            color: 'rgba(0,0,255,0.3)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#8000ff'
                        }),
                        radius: 10
                    }),
                });

                featurething.setStyle(_style);

                _features.push(featurething);
            }
            //oluşturduğum style ı feature a set ettım ve featuring nesnemi de  boş olan _features listesine attım.
            //layer ve source olayını daha önce vurgulamıstım yazdıgım ve elde ettıgım feature harita kaynağına (source) atılmazsa
            //dataları map üstünde göremeyiz

            var _pointSource = door_layer.getSource();

            _pointSource.addFeatures(_features);
        },

        error: function () {
            alert("upsss");
        },

    });
};
