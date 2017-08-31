var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		//header = document.querySelector( '#header' ),
        $header = $('#header');
		didScroll = false,
		changeHeaderOn = 500;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 150 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			//classie.add( header, 'shunk-header' );
            $header.addClass('shrunk-header');
		}
		else {
			//classie.remove( header, 'shunk-header' );
            $header.removeClass('shrunk-header');
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();