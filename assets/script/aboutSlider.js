$(function () {

    //jQuery dom caching
    var $bio = $('.bio');
    
    var $navBtns = $bio.find('#nav-scroll-btns');
    var $navBtnsLi = $bio.find('li');
    var current = 1;
    var sliderNextNum = 2;
    


    
    
    
    //initally fade out all images
    $bio.find("img[id^='img-slide-']").fadeOut(0);
    //fade in first slide
    $bio.find('#img-slide-' + current).fadeIn(1000);  
    //start slider loop
    var loop = setInterval(imageSlider, 7000);
    
    
    
    
    
    //interval function
    function imageSlider(){
        
        var count = $bio.find('.img-slide > img').length;
        var relToMatch;
        var nextSlide;
        //fade out current slide
        $bio.find('#img-slide-' + current).fadeOut(1000).removeClass('active');
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
            $bio.find("img[id^='img-slide-']").fadeOut(1000).removeClass('active');
            //fade in img based on index value
            $bio.find('#img-slide-' + index).fadeIn(1000).addClass('active');
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





