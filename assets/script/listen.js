$(function () {
//	$('#nav-toggle').click(function () {
//		$('#container').toggleClass('active');
//		$('.mobile-nav').toggleClass('active');
//	});
//    
//    /* TODO: move into different JS file */
//    $('.fa-envelope, .tooltip-form').click(function(event) {
//        event.stopPropagation();
//        $('.tooltip-form').addClass('active');    
//    });
//    
//    $(document).click(function () {
//        $('.tooltip-form').removeClass('active');
//    })
    
    $('#genres-all').on('click', function(){
        $('#genres li').removeClass('added');
        $('#genres-all').addClass('added');
        
        $('.sc-audio').css('opacity', '1');
        
    })
    
    $('#genres-drama').on('click', function(){
        $('#genres li').removeClass('added');
        $('#genres-drama').addClass('added');
        
        $('.sc-audio').css('opacity', '1');
        $('.sc-audio').not('.sc-drama').css('opacity', '0.1');
    })
    
    $('#genres-actadv').on('click', function(){
        $('#genres li').removeClass('added');
        $('#genres-actadv').addClass('added');
        
        $('.sc-audio').css('opacity', '1');
        $('.sc-audio').not('.sc-actadv').css('opacity', '0.1');
    })
    
    $('#genres-epic').on('click', function(){
        $('#genres li').removeClass('added');
        $('#genres-epic').addClass('added');
        
        $('.sc-audio').css('opacity', '1');
        $('.sc-audio').not('.sc-epic').css('opacity', '0.1');
    })
    
    
    
    
    
    
});