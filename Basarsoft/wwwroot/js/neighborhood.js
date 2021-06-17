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
    jsPanel.create({
        id: "mahalle_ekle_panel",
        theme: 'success',
        headerTitle: 'Mahalle Eklendi',
        position: 'center-top 0 58',
        contentSize: '200 200',
        content: 'Mahalle Çizim İşlemi Başarılı',
        callback: function () {
            this.content.style.padding = '20px';
        }
    });

    add_neigh.setActive(false);

});