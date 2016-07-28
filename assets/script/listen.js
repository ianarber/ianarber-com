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
        
//        $iframe.ready(function(){
//            console.log('here');
//            $iframe.closest('.bg-iframe').removeClass('spinner');
//        });
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

/////****************************************************************************//////

//var ListenGridWidget = {
//    
//    init: function(){
//        this.cacheDom();
//        this.bindEvents();
//        this.fadeOnLoad();
//    },
//    
//    cacheDom: function(){
//        this.$window = $(window);
//        this.$body = $('html, body');
//        this.$listenGrid = this.$body.find('.listen-grid');
//        this.$listenGallery = this.$listenGrid.find('#listen-gallery');
//        this.$genreMenu = this.$listenGrid.find('.genre-menu');
//        this.$genres = this.$genreMenu.find('#genres')
//        this.$categories = this.$genreMenu.find('#categories');
//        this.$menuInfo = this.$listenGrid.find('#menu-info');
//        this.$arrow = this.$listenGrid.find('#arrow');
//        this.$seeMoreArrow = this.$listenGrid.find('#see-more');
//    },
//    
//    bindEvents: function(){
//        this.$genres.find('li').on('click', this.toggleGenre.bind(this));
//        this.$categories.find('li').on('click', this.scrollToCategory.bind(this));
//        this.$listenGallery.find('i').not('#see-more').on('click', this.loadiFrame.bind(this));
//        this.$arrow.on('click', this.toggleGenreMenu.bind(this));
//        this.$arrow.hover(this.fadeMenuInfo.bind(this));
//        this.$seeMoreArrow.on('click', this.toggleExpandGrid.bind(this));
//        this.$window.scrollTop(this.fadeGenreMenu.bind(this));
//    },
//    
//    fadeOnLoad: function(){
//        
//        this.$menuInfo.delay(3000).fadeOut('slow');
//        this.$genreMenu.delay(3000).slideUp(1000);
//
//    },
//    
//    toggleGenre: function(event){
//        
//        //highlight genre button the user has clicked on
//        this.$genres.find('.added').removeClass('added');
//        $(event.target).addClass('added');
//        
//        var genre = $(event.target).attr('rel');
//        
//        //store all LI elements apart from the one user has seledted genre for
//        var $liToShow = this.$listenGallery.find('.sc-audio').not('.' + genre);
//        
//        //reset disabled classes
//        this.$listenGallery.find('.disabled').removeClass('disabled');
//        this.$listenGallery.find('.temp-disable-icon').removeClass('temp-disable-icon');
//
//        //add disabled classes to LI elements not of the genre user has clicked on
//        $liToShow.find('i').not('.disable-play-icon').addClass('temp-disable-icon');
//        $liToShow.find('iframe').addClass('disabled');
//        //$liToShow.find('.bg-iframe-info').addClass('disabled');
//        $liToShow.find('.fg-cover').addClass('disabled');
//        
//        //setTimeout(slideGenreMenu, 500);
//    },
//    
//    scrollToCategory: function(event){
//        
//        this.$categories.find('.added').removeClass('added');
//        $(event.target).addClass('added');
//        
//        var category = $(event.target).attr('rel');
//        
//        //BAD - binding an event here!!
//        this.$body.animate({
//            scrollTop: this.$listenGallery.find('.' + category).offset().top -70
//        }, 2000);
//     
////        setTimeout(slideGenreMenu, 500);
//    },
//    
//    loadiFrame: function(event){
//        
//        //set full opacity to click to load image (via css)
//        $(event.target).addClass('disable-play-icon');
//        
//        $(event.target).siblings('img').addClass('disable-play-icon');
//        //search for nearest iframe
//        var $iframe = $(event.target).siblings('iframe');
//           
//        //populate src att with data stored in data-src
//        var src = $iframe.attr('data-src');
//        $iframe.attr('src', src); 
//
//    },
//    
//    toggleGenreMenu: function(){
//        
//        this.$genreMenu.slideToggle();
//        this.$arrow.toggleClass('arrow-rotate');
//        
//    },
//    
//    fadeGenreMenu: function(event){
//        
//        console.log(this.$window.scrollTop() + this.$window.height());
//        console.log($('.footer').offset().top);
//
//        if (this.$window.scrollTop() + this.$window.height() > $('.footer').offset().top){
//            this.$genreMenu.fadeOut('slow');
//            this.$arrow.fadeOut('slow');
//            this.$menuInfo.fadeOut('slow');
//        } else {
//            this.$arrow.fadeIn('slow');
//        }
//         
//    },
//    
//    fadeMenuInfo: function(){
//        this.$menuInfo.fadeToggle(300);
//    },
//    
//    toggleExpandGrid: function(){
//        
//    }
//    
//}
//
//
//$(function () {
//    ListenGridWidget.init();
//});
















