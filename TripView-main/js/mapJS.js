$( function() {
    
    //Boite dialogue pour présenter la carte
    $( "#dialog-message" ).dialog({
        modal: true,
        buttons: {
          Commencer: function() {
            $(this).dialog( "close" );
          }
        }
      });


	// Parametre de la carte, centrée sur la france, on utilise MapQuest avec MQ
    let map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [48.8509, 2.4],
        zoom: 11        
    });


    //chargement des icones
    var activityIcon = L.icon({
      iconUrl: './img/activité.png',
      iconSize:     [30, 40], // size of the icon
      iconAnchor:   [5, 45], // point of the icon which will correspond to marker's location
    });

    
    var popup = L.popup();
  

  

    // add marker on click
map.on("click", addMarker);

function addMarker(e) {
  // Add marker to map at click location
  const markerPlace = document.querySelector(".marker-position");
  

  const marker = new L.marker(e.latlng, {icon: activityIcon,
    draggable: true
  })
    .addTo(map)
    .bindPopup(buttonRemove);

  // event remove marker
  marker.on("popupopen", removeMarker);

  // event draged marker
  marker.on("dragend", dragedMaker);
}

const buttonRemove =
  '<button type="button" class="remove">Supprimer le marker</button>';

// remove marker
function removeMarker() {
  const marker = this;
  const btn = document.querySelector(".remove");
  btn.addEventListener("click", function () {
    const markerPlace = document.querySelector(".marker-position");
    
    map.removeLayer(marker);
  });
}

// draged
function dragedMaker() {
  const markerPlace = document.querySelector(".marker-position");
  
}

    L.geoJson(balade, {
        style: function(feature) {
            return {
              "color": "red",
              "weight": 7,
              "opacity": 0.9   
            }
          },
          onEachFeature: function(feature, layer) {
            layer.bindPopup("TITRE DE LA BALADE : " + feature.properties.titre_balade + "." + "  " +feature.properties.texte_intro);
          }
        }       
    ).addTo(map);


   var trav = L.geoJson(travaux, {
        style: function(feature) {
            return {
              "color": "yellow",
              "weight": 7,
              "opacity": 0.9
            }
        },
          onEachFeature: function(feature, layer) {
            layer.bindPopup("détail de l'impact : " + feature.properties.impact_circulation_detail + " Date début :  " + feature.properties.date_debut+ " " + "Date fin : " +feature.properties.date_fin);
          }
        })
        var overlayMapsTrav = {
          "Problèmes de circulation ": trav,
         };
        L.control.layers(null, overlayMapsTrav, {
          collapsed: false
        }).addTo(map);
        
 

   var velo = L.geoJson(velib, {
      style: function(feature) {
          return {
            "color": "blue",
            "weight": 7,
            "opacity": 0.9  
          }
        },
        onEachFeature: function(feature, layer) {
          layer.bindPopup(" Nom : " + feature.properties.name + " Code de la station :  " + feature.properties.stationcode);
        }
      })
      var overlayMaps = {
        "Vélib disponible à paris ": velo,
       };
      L.control.layers(null, overlayMaps, {
        collapsed: false
      }).addTo(map);

  
    function runDirection(start, end) {
        

      
        // recrée la map par "défaut" après la suppression du chemin
        map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [48.76509, 1.98921],
            zoom: 6
            
        });
 // add marker on click
 map.on("click", addMarker);

 function addMarker(e) {
   // Add marker to map at click location
   const markerPlace = document.querySelector(".marker-position");
   
 
   const marker = new L.marker(e.latlng, {icon: activityIcon,
     draggable: true
   })
     .addTo(map)
     .bindPopup(buttonRemove);
 
   // event remove marker
   marker.on("popupopen", removeMarker);
 
   // event draged marker
   marker.on("dragend", dragedMaker);
 }
 
 const buttonRemove =
   '<button type="button" class="remove">Supprimer le marker</button>';
 
 // remove marker
 function removeMarker() {
   const marker = this;
   const btn = document.querySelector(".remove");
   btn.addEventListener("click", function () {
     const markerPlace = document.querySelector(".marker-position");
     
     map.removeLayer(marker);
   });
 }
 
 // draged
 function dragedMaker() {
   const markerPlace = document.querySelector(".marker-position");
   
 }
        L.geoJson(balade, {
            style: function(feature) {
                return {
                  "color": "red",
                  "weight": 7,
                  "opacity": 0.9
                }
              },
              onEachFeature: function(feature, layer) {
                layer.bindPopup("TITRE DE LA BALADE : " + feature.properties.titre_balade + "." + "  " + feature.properties.texte_intro);
              }
            }           
        ).addTo(map);
        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                start,
                end
            ]
        });
    
        CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: (location) => {
                var varIcone;
                var marker;

                varIcone = L.icon({
                    iconUrl: 'img/début.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                }); //on définit l'icone

                marker = L.marker(location.latLng, {icon: varIcone}).addTo(map); //on ajoute l'icone de début
                return marker;
            },

            createEndMarker: (location) => {
                var varIcone;
                var marker;

                varIcone = L.icon({
                    iconUrl: 'img/fin.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: varIcone}).addTo(map); //on ajoute l'icone de fin
                return marker;
            }
        });
        
        map.addLayer(new CustomRouteLayer({
            directions: dir,
            fitBounds: true
        }));        
    }


    // fonction quand on envoie le formulaire
    function submitForm(event) {
        event.preventDefault();

        // supprimer la carte actuelle
        map.remove();

        // obtenir les données du formulaire
        start = document.getElementById("start").value;
        end = document.getElementById("destination").value;

        // re création du chemin
        runDirection(start, end);

        // rénitialiser le formulaire
        document.getElementById("form").reset();
    }

    // affecter le formulaire
    const form = document.getElementById('form');

    // appel de la fonction submitForm()  lors de la soumission du formulaire
    form.addEventListener('submit', submitForm);

    
    $( "#sortable" ).sortable({
      revert: true
    });

  $( "#draggable" ).draggable({
      connectToSortable: "#sortable",
      helper: "clone",
      revert: "invalid"
  });

  $( "ul, li" ).disableSelection();
 
   

//geolocalisation


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
    maxZoom: 15,
    id: 'superpikar.n28afi10',
    accessToken: 'pk.eyJ1Ijoic3VwZXJwaWthciIsImEiOiI0MGE3NGQ2OWNkMzkyMzFlMzE4OWU5Yjk0ZmYzMGMwOCJ9.3bGFHjoSXB8yVA3KeQoOIw'
}).addTo(map);

$('#locate-position').on('click', function(){
  map.locate({setView: true, maxZoom: 15});
});

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
        .on('click', function(){
          confirm("votre position" +" " + (e.latLng,e.latlng));
        });
        //.bindPopup("You are within " + radius + " meters from this point").openPopup();
    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}
map.on('erreur de géolocalisation', onLocationError);
} );