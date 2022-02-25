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
		iconSize:     [30, 50],
		iconAnchor:   [5, 50],
	});
	var activityIcon = L.icon({
		iconUrl: './img/activité.png',
		iconSize:     [30, 40],
		iconAnchor:   [5, 45],
	});

	map.on('click', onMapClick);
	var popup = L.popup();
	var markerTab = [];

	function onMapClick(e) {
		var nom = document.getElementById("valeur").value;
			if (nom == "startIcon"){
				var mp = new L.Marker([e.latlng.lat, e.latlng.lng], {icon: startIcon}).addTo(map);
				var getLat = e.latlng.lat;
				markerTab.push(getLat); //va sauvegardé latlng dans un tableau
			}
			else if (nom == 'endIcon') {
				var mp = new L.Marker([e.latlng.lat, e.latlng.lng], {icon: endIcon}).addTo(map);
			}
			else if (nom == 'activityIcon'){
				var mp = new L.Marker([e.latlng.lat, e.latlng.lng], {icon: activityIcon}).addTo(map);
			}
			else{
				alert("You clicked the map at " + e.latlng);

			}

		jQuery.each(markerTab, function(index, value) {
			alert(index+": "+ value);
		}); //pour afficher le tableau
	}



};



