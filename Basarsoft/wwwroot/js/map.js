$(window).on('load', function () {
    ListAllPoints();
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