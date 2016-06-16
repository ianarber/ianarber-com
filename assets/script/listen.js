$(function () {
    
    $('#genres li').on('click', function(){
        $('#genres').find('.added').removeClass('added');
        $(this).addClass('added');
        
        var genre = $(this).attr('rel');
        
        var $liToShow = $('#listen-gallery').find('.sc-audio').not('.' + genre);
        
        $('#listen-gallery').find('.disabled').removeClass('disabled');

        $liToShow.find('iframe').addClass('disabled');
        $liToShow.find('.bg-iframe-info').addClass('disabled');
        $liToShow.find('.fg-cover').addClass('disabled');
    });
    
//    var playlistPos = $('.sc-play').scrollTop.offset().top -70;
//    var ffilmsPos = $('.sc-ffilms').scrollTop.offset().top -70;
//    var sfilmsPos = $('.sc-sfilms').scrollTop.offset().top -70;
//    var tvPos = $('.sc-tv').scrollTop.offset().top -70;
    
    $('#categories li').on('click', function(){
        $('#categories').find('.added').removeClass('added');
        $(this).addClass('added');
        
        var category = $(this).attr('rel');
        
        $('html, body').animate({
            scrollTop: $('.' + category).offset().top -70
        }, 2000);
    })
    
//    $(window).scroll(function(){
//        var scroll = $(window).scrollTop();
//        
//        if( scroll >= playlistPos && scroll)
//    });
  
    
});