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




    
    L.geoJson(balade, {  
        style: function(feature) {
            return {
              "color": "red",
              "weight": 7,
              "opacity": 0.9     
            }
          },
          // Put onEachFeature within the options object, not as 3rd argument.
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
          // Put onEachFeature within the options object, not as 3rd argument.
          onEachFeature: function(feature, layer) {
            layer.bindPopup("détail de l'impact : " + feature.properties.impact_circulation_detail + " Date début :  " + feature.properties.date_debut+ " " + "Date fin : " +feature.properties.date_fin);
            
          }
         
        }
       
   ).addTo(map);
        
 

        
   var velo = L.geoJson(velib, {
    


      
      style: function(feature) {
          return {
            "color": "blue",
            "weight": 7,
            "opacity": 0.9
            
          }
        },
        // Put onEachFeature within the options object, not as 3rd argument.
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
        L.geoJson(balade, {
    
            style: function(feature) {
                return {
                  "color": "red",
                  "weight": 7,
                  "opacity": 0.9
                  
                }
              },
              // Put onEachFeature within the options object, not as 3rd argument.
              onEachFeature: function(feature, layer) {
                layer.bindPopup("TITRE DE LA BALADE : " + feature.properties.titre_balade + "." + "  " +feature.properties.texte_intro);
                
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
                }); //on définiti l'icone

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

    
    
    var trainIcon = L.icon({
      iconUrl: 'http://mollietaylor.com/skills/js/leaflet/train.png',
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      popupAnchor: [0, -37]
    });
    
    $( "#sortable" ).sortable({
      revert: true
    });

  $( "#draggable" ).draggable({
      connectToSortable: "#sortable",
      helper: "clone",
      revert: "invalid"
  });

  $( "ul, li" ).disableSelection();
    



  

      
  
 
 

 
   
} );