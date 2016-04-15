$('#welcome-intro').waypoint(function (direction) {
	if (direction == 'down') {
		$('.ianarber').css({'fontSize': '150%'});
		$('.ianarber').css({'top': '-10px'});
		$('#logo p:eq(0)').removeClass('composer').addClass('jscomposer');
		$('#logo p:eq(2)').removeClass('film').addClass('jsfilm');
		$('.menu-list-1').css({'marginTop': '0px'});
		$('.menu-list-2').css({'marginTop': '0px'});
		$('.menu-items-1').css({'fontSize': '65%'});
		$('.menu-items-2').css({'fontSize': '65%'});
		$('#header').animate({height: '60px'}, 300);
	} else {
		$('.ianarber').css({'fontSize': '250%'});
		$('.ianarber').css({'top': '0px'});
		$('#logo p:eq(0)').removeClass('jscomposer').addClass('composer');
		$('#logo p:eq(2)').removeClass('jsfilm').addClass('film');
		$('.menu-list-1').css({'marginTop': '30px'});
		$('.menu-list-2').css({'marginTop': '30px'});
		$('.menu-items-1').css({'fontSize': '75%'});
		$('.menu-items-2').css({'fontSize': '75%'});
		$('#header').animate({height: '120px'}, 300);
	}
},{
	offset: '100px'
});


