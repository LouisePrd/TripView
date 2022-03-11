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
        center: [48.76509, 1.98921],
        zoom: 6
    });

    function runDirection(start, end) {
        
        // recrée la map par "défaut" après la suppression du chemin
        map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [48.76509, 1.98921],
            zoom: 6
        });
        
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