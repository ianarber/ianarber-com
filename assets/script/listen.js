$(function () {
    
    //jquery variables
    var $genres = $('#genres');
    var $listenGallery = $('#listen-gallery');
    
    var $categories = $('#categories');
    
    var $genreMenu = $('.genre-menu');
    
    $('#genres li').on('click', function(){
        //highlight genre button the user has clicked on
        $genres.find('.added').removeClass('added');
        $(this).addClass('added');
        
        var genre = $(this).attr('rel');
        
        //store all LI elements apart from the one user has seledted genre for
        var $liToShow = $('#listen-gallery').find('.sc-audio').not('.' + genre);
        
        //reset disabled classes
        $listenGallery.find('.disabled').removeClass('disabled');
        $listenGallery.find('.temp-disable-image').removeClass('temp-disable-image');

        //add disabled classes to LI elements not of the genre user has clicked on
        $liToShow.find('img').addClass('temp-disable-image');
        $liToShow.find('iframe').addClass('disabled');
        $liToShow.find('.bg-iframe-info').addClass('disabled');
        $liToShow.find('.fg-cover').addClass('disabled');
    });
    
    
    $('#categories li').on('click', function(){
        //highlight category button the user has clicked on
        $categories.find('.added').removeClass('added');
        $(this).addClass('added');
        
        //store rel att data
        var category = $(this).attr('rel');
        
        //animate scroll to class with name of rel data
        $('html, body').animate({
            scrollTop: $('.' + category).offset().top -70
        }, 2000);
    })
    
    
    $('img').on('click', function(){

        //set full opacity to click to load image (via css)
        $(this).addClass('disable-image');
        //search for nearest iframe
        var $iframe = $(this).siblings('iframe');
        //populate src att with data stored in data-src
        var src = $iframe.attr('data-src');
        $iframe.attr('src', src); 
        //sc widget iframe will now load
        
    });
    
    
//    $('#arrow').toggle(function(){
//         $genreMenu.css('transform', 'translateX(100px)');
//    }, function(){
//         $genreMenu.css('transform', 'translateX(-410px)');
//    });
    
    
    $('#arrow').on('click', function(){
         $genreMenu.css('transform', 'translateX(100px)');
    });
    
    
    
    
    
    
    
    
    
    
    
  
    
});