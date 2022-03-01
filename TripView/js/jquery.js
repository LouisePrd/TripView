$( function() {
    $( "#dialog-message" ).dialog({
      modal: true,
      buttons: {
        Commencer: function() {
          $(this).dialog( "close" );
        }
      }
    });
  } );