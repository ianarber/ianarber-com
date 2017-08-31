$(function(){

    var $showreelIframe = $('#showreel-sc-iframe');
    var src = $showreelIframe.attr('data-src');

    $(window).on('scroll', function(){
        var height = $(window).scrollTop();

        if(height > 1150){
            //populate src att with data stored in data-src
            $(window).off('scroll');
            $showreelIframe.attr('src', src)
        }
    });

});
