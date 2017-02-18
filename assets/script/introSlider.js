//***************************************************//
//**START**YouTube API code load for intro video*****//
//***************************************************//

var tag = document.createElement('script');
tag.id = 'iframe-video';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('trailer-video', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

//***************************************************//
//**END**YouTube API code load for intro video*****//
//***************************************************//




//$(function () {

    //jQuery dom caching
    var $intro = $('.intro');

    //variables for intro slider height calculation
    var $profilePic = $intro.find('.profile-pic');
    var topHeight = 195;
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

    var playState;

    recalculateHeight();
    //changeWelcomeText();
    calculateVideoSize();
    clearQuoteStyle();

    $(window).on('resize', function(){
        recalculateHeight();
        //changeWelcomeText();
        calculateVideoSize();
        clearQuoteStyle();
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


    // function changeWelcomeText(){
    //     if ( window.innerWidth <= 480 ) {
    //         var html = '<h1>Welcome to the home of</h1><h1>film composer Ian Arber</h1>';
    //         $profilePic.find('#welcome-intro h1:first').html(html);
    //
    //     } else if ( window.innerWidth > 480 ) {
    //         $profilePic.find('#welcome-intro h1:first').html(
    //             'Welcome to the home of film composer Ian Arber.'
    //         )
    //     }
    // }

    function calculateVideoSize(){
        var width = $profilePic.width();
        var height = $profilePic.height();

        $profilePic.find('.video-wrapper > iframe').css({
            'width': width,
            'height': height});
    }

    function clearQuoteStyle(){

        if ( window.innerWidth <= 612 && playState != 1 ) {
            $profilePic.find('#welcome-text').fadeOut(1);
        } else if ( window.innerWidth > 612  && playState != 1 ) {
            $profilePic.find('#welcome-text').fadeIn(1);
        }

        if ( window.innerWidth <= 480 && playState != 1 ) {
            $profilePic.find('#quote, #cite').fadeOut(1);
        } else if ( window.innerWidth > 480  && playState != 1 ) {
            $profilePic.find('#quote, #cite').fadeIn(1);
        }

    }



    //initally fade out all images
    //$intro.find("div[id^='img-slide-']").fadeOut(0);
    //fade in first slide
    //$intro.find('#img-slide-' + current).fadeIn(1000);


    var loop
    $(window).on('load', function(){
        //fade in first slide
        $intro.find('#img-slide-' + current).fadeIn(1000);

        $('.poster-figure').find('img').fadeIn(1000);

        //fade out loading spinner
        $intro.find('#intro-spinner').fadeOut(0);
        //start slider loop
        loop = setInterval(imageSlider, 7000);
    });




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

        //var $heroImage = $('<img>');
        //setHeroImage($heroImage, newHeroSrc);

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






    $profilePic.find('i').on('click', function(){

        var $playVidBtn = $(this);

        stopInterval();

        $profilePic.css('background-color', 'black');

        $playVidBtn.addClass('disable-play-icon');

        player.playVideo();

        setTimeout(function(){
            $playVidBtn.siblings('.video-wrapper').css('pointer-events', 'all');
            $playVidBtn.siblings('img').addClass('disable-play-icon');
        }, 200);

    });

    function onPlayerStateChange(event) {
        controlVideo(event.data);
    }

    function controlVideo(playerStatus) {
        if (playerStatus == 0) {
            // ended
            playState = playerStatus;
            startInterval();
            //$profilePic.css('background-color', 'transparent');
            $profilePic.find('#welcome-intro').fadeToggle('slow');

            if ( window.innerWidth > 612 ) {
                $profilePic.find('#welcome-text').fadeToggle('slow');
            }
            if ( window.innerWidth > 480 ) {
                $profilePic.find('#quote, #cite').fadeToggle('slow');
            }

            $profilePic.find('.img-slide > p > a').animate({
                'bottom': '140px'
            });
        } else if (playerStatus == 1) {
            // playing
            playState = playerStatus;
            stopInterval();
            //$profilePic.css('background-color', 'black');
            $profilePic.find('#welcome-intro').fadeToggle('slow');

            if ( window.innerWidth > 612 ) {
                $profilePic.find('#welcome-text').fadeToggle('slow');
            }
            if ( window.innerWidth > 480 ) {
                $profilePic.find('#quote, #cite').fadeToggle('slow');
            }

            $profilePic.find('.img-slide > p > a').animate({
                'bottom': '20px'
            });

        } else if (playerStatus == 2) {
            // paused
            playState = playerStatus;
            startInterval();
            //$profilePic.css('background-color', 'transparent');
            $profilePic.find('#welcome-intro').fadeToggle('slow');

            if ( window.innerWidth > 612 ) {
                $profilePic.find('#welcome-text').fadeToggle('slow');
            }
            if ( window.innerWidth > 480 ) {
                $profilePic.find('#quote, #cite').fadeToggle('slow');
            }

            $profilePic.find('.img-slide > p > a').animate({
                'bottom': '140px'
            });
        }
    }

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


//});















