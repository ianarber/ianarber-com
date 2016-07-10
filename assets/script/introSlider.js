$(function () {

    var $navBtns = $('#nav-scroll-btns li');
    var current = 1;
    var sliderNextNum = 2;
    
    
    
    var topHeight = 165;
    var height = $(window.top).height() - 15;
    var final = height - topHeight;
    var $profilePic = $('.profile-pic');
    var $navButtons = $('#nav-scroll-btns');
    var navHeight = final + 100;

    $profilePic.css('height', final + 'px');
    $navButtons.css('top', navHeight + 'px');
    
    $(window).on('resize', function(){
        height = $(window.top).height() - 15;
        final = height - topHeight;
        $profilePic.css('height', final + 'px');
    });
    
    
    
    
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
    

    $navBtns.on('click', function () {
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
            $navBtns.removeClass('active');
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
        $navBtns.each(function(){
            if($(this).attr('rel') === imageRel){
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }
    
    
});















