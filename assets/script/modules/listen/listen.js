$(function () {

    //jquery variables
    var $genres = $('#genres');
    var $listenGallery = $('#listen-gallery');

    var $categories = $('#categories');

    var $menuInfo = $('#menu-info');
    var $genreMenu = $('.genre-menu');
    var $arrow = $('#arrow');


    //fade out elements after page load
    //$menuInfo.delay(3000).fadeOut('slow');
    $genreMenu.delay(3000).slideUp('slow');

    //$arrow.hover(function(){
    //    $menuInfo.fadeToggle('slow');
    //});


    $('#genres li').on('click', function(){
        //highlight genre button the user has clicked on
        $genres.find('.added').removeClass('added');
        $(this).addClass('added');

        var genre = $(this).attr('rel');

        //store all LI elements apart from the one user has seledted genre for
        var $liToShow = $('#listen-gallery').find('.sc-audio').not('.' + genre);

        //reset disabled classes
        $listenGallery.find('.disabled').removeClass('disabled');
        $listenGallery.find('.temp-disable-icon').removeClass('temp-disable-icon');

        //add disabled classes to LI elements not of the genre user has clicked on
        $liToShow.find('i').not('.disable-play-icon').addClass('temp-disable-icon');
        $liToShow.find('iframe').addClass('disabled');
        //$liToShow.find('.bg-iframe-info').addClass('disabled');
        $liToShow.find('.fg-cover').addClass('disabled');

        $liToShow.children('div.bg-iframe').removeClass('spinner');

        if($(this).text() != 'All'){
            filterActive();
        } else {
            filterNotActive();
        }

        setTimeout(slideGenreMenu, 500);
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

        setTimeout(slideGenreMenu, 500);
    })


    $listenGallery.find('i').not('#see-more').on('click', function(){

        //set full opacity to click to load image (via css)
        $(this).addClass('disable-play-icon');

        $(this).closest('.bg-iframe').addClass('spinner');

        $(this).siblings('img').addClass('disable-play-icon');
        //search for nearest iframe
        var $iframe = $(this).siblings('iframe');

        //populate src att with data stored in data-src
        var src = $iframe.attr('data-src');
        $iframe.attr('src', src);

    });


    $('#arrow').on('click', function(){
        slideGenreMenu();
    });


    //toggle genre menu slide action
    function slideGenreMenu(){
        $genreMenu.slideToggle();
        $arrow.toggleClass('arrow-rotate');
    }


    //listen for scroll event to footer then fade out genre menu and related elements
    $(window).scroll(function(){

        if ($(window).scrollTop() + $(window).height() > $('.footer').offset().top){
            $genreMenu.fadeOut('slow');
            $arrow.fadeOut('slow');
            $menuInfo.fadeOut('slow');
        } else {
            $arrow.fadeIn('slow');
            $menuInfo.fadeIn('slow');
        }

    });

    function filterActive(){
        $arrow.addClass('arrow-filter-active');
        $menuInfo.addClass('info-filter-active');
        $menuInfo.text($menuInfo.data('swap'));
    }

    function filterNotActive(){
        $arrow.removeClass('arrow-filter-active');
        $menuInfo.removeClass('info-filter-active');
        $menuInfo.text($menuInfo.data('original'));
    }


    $('#see-more').on('click', function(){
        $('#listen-more-expand').slideToggle('slow');
        $(this).toggleClass('rotated');
    });

});
