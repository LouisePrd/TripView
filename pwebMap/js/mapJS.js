window.onload = function () {
	
	//Chargement initial de la MAP
	var map = L.map('map').setView([14,-14.8883335],4);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'PING'}).addTo(map);
	

	//chargement des icones (à factoriser)
	var startIcon = L.icon({
    iconUrl: './img/début.png',
    iconSize:     [30, 50], // size of the icon
    iconAnchor:   [4, 50], // point of the icon which will correspond to marker's location	
});
	var endIcon = L.icon({
    iconUrl: './img/fin.png',
    iconSize:     [30, 50], // size of the icon
    iconAnchor:   [5, 50], // point of the icon which will correspond to marker's location
});
var activityIcon = L.icon({
    iconUrl: './img/activité.png',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [5, 45], // point of the icon which will correspond to marker's location
});

map.on('click', onMapClick);

function onMapClick(e) {
	var nom = document.getElementById("valeur").value;
	alert(nom);
		if (nom == "startIcon"){
			var mp = new L.Marker([e.latlng.lat, e.latlng.lng], {icon: startIcon}).addTo(map);
		}
		else if (nom == 'endIcon') {
			var mp = new L.Marker([e.latlng.lat, e.latlng.lng], {icon: endIcon}).addTo(map);
		}
		else{
			var mp = new L.Marker([e.latlng.lat, e.latlng.lng], {icon: activityIcon}).addTo(map);
		}
		alert(mp.getLatLng());
}

};



