$(document).ready(function () {
	// handle the mouseenter functionality
	$(".poster-figure").mouseenter(function () {
			$(this).addClass("hover");
		})
		// handle the mouseleave functionality
		.mouseleave(function () {
			$(this).removeClass("hover");
		});
});