$(function () {
    
//     $('#bitch img:gt(0)').hide();
//    
//     setInterval(function () {
//         $('#bitch :first-child').fadeOut('slow')
//             .next('img').fadeIn('slow')
//             .end().appendTo('#bitch');
//     },
//     6000); 
    
    
    
    $('#nav-scroll-btns li').on('click', function(){
        
        var slideToShow = $(this).attr('rel');
        
        var $imageToFadeIn = $('#bitch').find('#' + slideToShow);
        var $imageToFadeOut = $('#bitch').not('#' + slideToShow);
        
        $imageToFadeIn.fadeIn('slow');
        $imageToFadeOut.fadeOut('slow');
    })


});