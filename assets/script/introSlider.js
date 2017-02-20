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



//jQuery dom caching
var $page = $('#page-container');
var $pageWrapper = $page.find('#page-wrapper');
var $spinner = $page.find('#intro-spinner');
var $intro = $page.find('.intro');

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

//variables for slides with a video
var playState;

/*********************/
//function definitions
/*********************/
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
        if ( window.innerWidth <= 780 ) {
            var newNavHeight = navHeight + 10;
            $navBtns.css('top', newNavHeight + 'px');
        } else {
            $navBtns.css('top', navHeight + 'px');
        }
    }
    
}

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

/****************************/
//jQuery function definitions
/****************************/

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

//play video if play button is present
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

/*******************************/
//player/slider control functions
/*******************************/

function controlVideo(playerStatus) {
    if (playerStatus == 0) {
        // ended
        playState = playerStatus;
        startInterval();
        //$profilePic.css('background-color', 'transparent');
        //$profilePic.find('#welcome-intro').fadeToggle('slow');

        //if ( window.innerWidth > 612 ) {
        //    $profilePic.find('#welcome-text').fadeToggle('slow');
        //}
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
        //$profilePic.find('#welcome-intro').fadeToggle('slow');

        //if ( window.innerWidth > 612 ) {
        //    $profilePic.find('#welcome-text').fadeToggle('slow');
        //}
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
        //$profilePic.find('#welcome-intro').fadeToggle('slow');

        //if ( window.innerWidth > 612 ) {
        //    $profilePic.find('#welcome-text').fadeToggle('slow');
        //}
        if ( window.innerWidth > 480 ) {
            $profilePic.find('#quote, #cite').fadeToggle('slow');
        }

        $profilePic.find('.img-slide > p > a').animate({
            'bottom': '140px'
        });
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

/****************************/
//timeout control functions
/****************************/

function onPlayerStateChange(event) {
    controlVideo(event.data);
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

/***********************************************************/




//initially run finctions
recalculateHeight();
calculateVideoSize();
clearQuoteStyle();

$(window).on('resize', function(){
    recalculateHeight();
    calculateVideoSize();
    clearQuoteStyle();
});


//fade in whole page once all elements have loaded
var loop;
var spinner = setTimeout(function(){
    $spinner.fadeIn();
}, 300);

$(window).on('load', function(){
    //fade in first slide
    $intro.find('#img-slide-' + current).fadeIn(1000);
    $pageWrapper.fadeIn(1000);
    //fade out loading spinner
    clearTimeout(spinner);
    $spinner.fadeOut(0);
    //start slider loop
    loop = setInterval(imageSlider, 7000);
});


