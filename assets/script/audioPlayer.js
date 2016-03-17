$('#elm').hover(
	function(){ $(this).addClass('hover') },
	function(){ $(this).removeClass('hover') }
)


/*Code for Audio player*/
function stopPlayer(soundobj) {
    var thissound = document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}