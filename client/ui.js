/**
 * Created by charleen on 12/17/16.
 */
$( function() {
    $( "#draggable" ).draggable().css({'top': 35, 'left' : 20});
    $( "#jukebox" ).droppable({
        drop: function() {
            $("#draggable").hide("drop", {direction: "down"}, "slow", function(){
                $(this).css({'top': 35, 'left' : 20}).fadeIn()
            });
        }
    })
} );