$(function () {
    
//     $('#bitch img:gt(0)').hide();
//    
//     setInterval(function () {
//         $('#bitch :first-child').fadeOut('slow')
//             .next('img').fadeIn('slow')
//             .end().appendTo('#bitch');
//     },
//     6000); 
    
    
    
//    $('#nav-scroll-btns li').on('click', function(){
//        
//        var slideToShow = $(this).attr('rel');
//        
//        var $imageToFadeIn = $('#bitch').find('#' + slideToShow);
//        var $imageToFadeOut = $('#bitch').not('#' + slideToShow);
//        
//        $imageToFadeIn.fadeIn('slow');
//        $imageToFadeOut.fadeOut('slow');
//    })

    var count = $('.img-slide > img').length;
    var $navBtns = $('#nav-scroll-btns li');
    var current = 1;
    var sliderNextNum = 2;
    var nextSlide;
    var relToMatch;

    $("img[id^='img-slide-']").fadeOut(0);
    $('#img-slide-' + current).fadeIn(1000);
    var loop = setInterval(function () {
        $('#img-slide-' + current).fadeOut(1000);
        
        nextSlide = '#img-slide-' + sliderNextNum;
        
        $(nextSlide).fadeIn(1000);
        
        relToMatch = $(nextSlide).attr('id');
        
        highlightNavBtns(relToMatch);
        
        (sliderNextNum >= count) ? sliderNextNum = 1: sliderNextNum++;
        (current >= count) ? current = 1: current++;
    }, 7000)
    
    
    function highlightNavBtns(imageRel){
        $navBtns.each(function(){
            if($(this).attr('rel') === imageRel){
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }
    
    
    $('#nav-scroll-btns li').bind('click', function () {

        var index = $(this).index() + 1;

        $('.img-slider-active').fadeOut(1000);

        $('#img-slide-' + index).fadeIn(1000);
        $('.img-slide').removeClass('img-slider-active');
        $('#img-slide-' + index).addClass('img-slider-active');
        
        current = index;
        sliderNextNum = index++;
        
    });


});







