$(function () {
    
    //jquery variables
    var $iFrameWrapper = $('#iframe-wrapper');
       
    $iFrameWrapper.find('i').on('click', function(){

        //set full opacity to click to load image (via css)
        $(this).addClass('disable-play-icon');
        
        $(this).siblings('img').addClass('disable-play-icon');
        //search for nearest iframe
        var $iframe = $(this).siblings('iframe');
           
        //populate src att with data stored in data-src
        var src = $iframe.attr('data-src');
        $iframe.attr('src', src); 
        
    });
    
    
});