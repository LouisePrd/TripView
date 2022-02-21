window.onload = function () {
	
	//Chargement initial de la MAP
	var map = L.map('map').setView([14,-14.8883335],4);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'PING'}).addTo(map);
	

	//chargement des icones
	var startIcon = L.icon({
    iconUrl: './img/début.png',
    iconSize:     [30, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor	
});
	var endIcon = L.icon({
    iconUrl: './img/fin.png',
    iconSize:     [30, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


//problème à régler : quand on choisit dans la liste déroulante, pas de changement d'icone
//car on prend la valeur qu'on a dans le lancement de la page en windows.onload
//mais si on met map.on("click", function(e) hors du windows.onload = map pas reconnue
$("#valeur").on('change', function()  {
	alert(document.getElementById("valeur").value);
	map.on("click", function(e){
		if (document.getElementById("valeur").value = "startIcon"){
			var mp = new L.Marker([e.latlng.lat, e.latlng.lng], {icon: startIcon}).addTo(map);
		}
		else{
			var mp = new L.Marker([e.latlng.lat, e.latlng.lng], {icon: endIcon}).addTo(map);
		}
		alert(mp.getLatLng());
	});
 });


};
