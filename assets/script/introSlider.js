$(function () {

    //variables for image slider and nav buttons
    var $navBtns = $('#nav-scroll-btns');
    var $navBtnsLi = $navBtns.find('li');
    var current = 1;
    var sliderNextNum = 2;
    
    //variables for intro slider height calculation
    var topHeight = 165;
    var offset = 30;
    var windowHeight = 0;
    var finalHeight = 0;
    var navHeight = 0;
    var $profilePic = $('.profile-pic');
    var $intro = $('.intro');
    
    recalculateHeight();
    
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
        //console.log(finalHeight);   
        if( navHeight >= 520 ){
            $navBtns.css('top', navHeight + 'px');
        }
    }
    
    
    
    
    
    function changeWelcomeText(){
        if ( window.innerWidth <= 480 ) {
//            $profilePic.find('#welcome-intro p:first').html(
//                'Welcome<br/> to the home of<br/>'
//            )
            var html = '<p>Welcome to the home of</p><p>film composer Ian Arber</p>';
            $profilePic.find('#welcome-intro p:first').html(html);
            
        } else if ( window.innerWidth > 480 ) {
            $profilePic.find('#welcome-intro p:first').html(
                'Welcome to the home of film composer Ian Arber.'
            )
        }
    }
    
    
    
    
    
    
    
    //initally fade out all images
    $("img[id^='img-slide-']").fadeOut(0);
    //fade in first slide
    $('#img-slide-' + current).fadeIn(1000);  
    //start slider loop
    var loop = setInterval(imageSlider, 7000);
    
    //interval function
    function imageSlider(){
        
        var count = $('.img-slide > img').length;
        var relToMatch;
        var nextSlide;
        //fade out current slide
        $('#img-slide-' + current).fadeOut(1000).removeClass('active');
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
        stopInterval()
        //increment index value
        var index = $(this).index() + 1;
        
        //only execute if current slide is different from clicked nav button
        if( current != index ){
            //remove all active classes from img elements
            $("img[id^='img-slide-']").fadeOut(1000).removeClass('active');
            //fade in img based on index value
            $('#img-slide-' + index).fadeIn(1000).addClass('active');
            //add and remove class on nav buttons
            $navBtnsLi.removeClass('active');
            $(this).addClass('active');
        }
        
        //set variables based on index uder clicked
        current = index;
        sliderNextNum = ++index;
        //check for end of element array
        if( sliderNextNum > 4 ){
            sliderNextNum = 1;
        }
        //restart interval
        startInterval();
    });

    
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















