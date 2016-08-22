$(function () {

    //jQuery dom caching
    var $intro = $('.intro');
    
    //variables for intro slider height calculation
    var $profilePic = $intro.find('.profile-pic');
    var topHeight = 165;
    var offset = 30;
    var windowHeight = 0;
    var finalHeight = 0;
    var navHeight = 0;
    
    //variables for image slider and nav buttons
    var isMobile = 0;
    var $navBtns = $intro.find('#nav-scroll-btns');
    var $navBtnsLi = $intro.find('li');
    var current = 1;
    var sliderNextNum = 2;
    var count = $intro.find('.img-slide > img').length;
    
    recalculateHeight();
    changeWelcomeText();
    
    $(window).on('resize', function(){
        recalculateHeight();
        changeWelcomeText();
    });
    
    
    function recalculateHeight(){
        
        if ( window.innerWidth > 1220 ) {
            offset = 30;
        } else if ( window.innerWidth <= 1220 && window.innerWidth > 1120 ) {
            offset = 25;
        } else if ( window.innerWidth <= 1120 && window.innerWidth > 1005 ) {
            offset = -5;
        } else if ( window.innerWidth <= 1005 ) {
            offset = -30;
        }
        
        
        windowHeight = $(window.top).height() - offset;
        finalHeight = windowHeight - topHeight;
        navHeight = finalHeight + 70;
        $profilePic.css('height', finalHeight + 'px');
        $intro.css('height', (finalHeight + 115) + 'px');

        if( navHeight >= 520 ){
            $navBtns.css('top', navHeight + 'px');
        }
        
    }
    
    
    function changeWelcomeText(){
        if ( window.innerWidth <= 480 ) {
            var html = '<h1>Welcome to the home of</h1><h1>film composer Ian Arber</h1>';
            $profilePic.find('#welcome-intro h1:first').html(html);
            
        } else if ( window.innerWidth > 480 ) {
            $profilePic.find('#welcome-intro h1:first').html(
                'Welcome to the home of film composer Ian Arber.'
            )
        }
    }
    
    
    
    
    
    //initally fade out all images
    $intro.find("div[id^='img-slide-']").fadeOut(0);
    //fade in first slide
    $intro.find('#img-slide-' + current).fadeIn(1000);  
    //start slider loop
    
    
    var loop = setInterval(imageSlider, 7000);
    
    
    
    
    
    //interval function
    function imageSlider(){
        
        //var count = $('.img-slide > img').length;
        var relToMatch;
        var nextSlide;
        //fade out current slide
        $intro.find('#img-slide-' + current).fadeOut(1000).removeClass('active');
        //set next slide variable
        nextSlide = '#img-slide-' + sliderNextNum;
        //fade the next slide in
        $(nextSlide).fadeIn(1000).addClass('active');
        //grad id value to match against nav button rel value
        relToMatch = $(nextSlide).attr('id');
        //call function to set nav buttons active
        highlightNavBtns(relToMatch);
        //increment or reset variables ready for next iteration
        (sliderNextNum >= count) ? sliderNextNum = 1: sliderNextNum++;
        (current >= count) ? current = 1: current++;
    }
    

    $navBtnsLi.on('click', function () {
        //cancel the interval
        stopInterval();
        //increment index value
        var index = $(this).index() + 1;
        
        //only execute if current slide is different from clicked nav button
        if( current != index ){
            //remove all active classes from img elements
            $intro.find("div[id^='img-slide-']").fadeOut(1000).removeClass('active');
            //fade in img based on index value
            $intro.find('#img-slide-' + index).fadeIn(1000).addClass('active');
            //add and remove class on nav buttons
            $navBtnsLi.removeClass('active');
            $(this).addClass('active');
        }
        
        //set variables based on index user clicked
        current = index;
        sliderNextNum = ++index;
        //check for end of element array
        if( sliderNextNum > count ){
            sliderNextNum = 1;
        }
        //restart interval
        startInterval();
    });
    
    
    
    //**START**YouTube API code load for intro video*****//
    
    var tag = document.createElement('script');
    tag.id = 'intro-video';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('existing-iframe-example', {
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
        });
    }
    
      function onPlayerReady(event) {
          document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
      }

      function changeBorderColor(playerStatus) {
          var color;
          if (playerStatus == -1) {
              color = "#37474F"; // unstarted = gray
          } else if (playerStatus == 0) {
              color = "#FFFF00"; // ended = yellow
          } else if (playerStatus == 1) {
              color = "#33691E"; // playing = green
          } else if (playerStatus == 2) {
              color = "#DD2C00"; // paused = red
          } else if (playerStatus == 3) {
              color = "#AA00FF"; // buffering = purple
          } else if (playerStatus == 5) {
              color = "#FF6DOO"; // video cued = orange
          }
          if (color) {
              document.getElementById('existing-iframe-example').style.borderColor = color;
          }
      }

      function onPlayerStateChange(event) {
          changeBorderColor(event.data);
      }
    
    
    
    
  
//    $profilePic.find('i').on('click', function(){
//        
//        stopInterval();
//        
////        $profilePic.css('background-color', 'black');
////        $profilePic.find('#welcome-intro, #quote, #cite').css('opacity', 0);
//        
//        //set full opacity to click to load image (via css)
//        $(this).addClass('disable-play-icon');
//        
//        $(this).siblings('img').addClass('disable-play-icon');
//        $(this).siblings('.video-wrapper').css('pointer-events', 'all');
//        //search for nearest iframe
//        var $iframe = $profilePic.find('iframe');
//           
//        //populate src att with data stored in data-src
//        var src = $iframe.attr('data-src');
//        $iframe.attr('src', src); 
//        
//    });
    
    //**END**YouTube API code load for intro video*****//
    
    

    
    function stopInterval(){
        if( loop != undefined ){
            clearInterval(loop);         
        }
    }

    
    function startInterval(){
        if( loop != undefined ){
            loop = setInterval(imageSlider, 7000);
        }
    }

    
    function highlightNavBtns(imageRel){
        $navBtnsLi.each(function(){
            if($(this).attr('rel') === imageRel){
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }
    
    
});















