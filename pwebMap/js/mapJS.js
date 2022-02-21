window.onload = function () {
	
	//Chargement initial de la MAP
	var map = L.map('map').setView([14,-14.8883335],4);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'PING'}).addTo(map);
	

	//chargement des icones
	var startIcon = L.icon({
    iconUrl: './img/début.png',

    iconSize:     [35, 55], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	
});

L.marker([51.5, -0.09], {icon: startIcon}).addTo(map).bindPopup("Point de départ");;
}



