/*(function () {
 	var bodyEl = $('body'),
 		navToggleBtn = bodyEl.find('.nav-toggle');

 	navToggleBtn.on('click', function (e) {
 		bodyEl.toggleClass('active-nav');
 		e.preventDefault();
 	});

})();*/


$(function () {
    
	$('#nav-toggle').click(function () {
		$('#page-container').toggleClass('active');
		$('.mobile-nav').toggleClass('active');
	});  
    
});


