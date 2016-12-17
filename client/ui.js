/**
 * Created by charleen on 12/17/16.
 */
$( function() {
    $( "#draggable" ).draggable().css({'top': 35, 'left' : 20});
    $( "#jukebox" ).droppable({
        drop: function() {
            console.log( "dropped" );
        }
    })
} );