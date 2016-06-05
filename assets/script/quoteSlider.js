$(function(){

    // just querying the DOM...like a boss!
    var links = document.querySelectorAll(".itemLinks");
    var wrapper = document.querySelector("#testimonial-wrapper");

    // the activeLink provides a pointer to the currently displayed item
    var activeLink = 0;

    // setup the event listeners
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        link.addEventListener('click', setClickedItem, false);

        // identify the item for the activeLink
        link.itemID = i;
    }

    // set first item as active
    links[activeLink].classList.add("active");

    function setClickedItem(e) {
        removeActiveLinks();

        var clickedLink = e.target;
        activeLink = clickedLink.itemID;

        changePosition(clickedLink);
    }

    function removeActiveLinks() {
        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove("active");
        }
    }

    // Handle changing the slider position as well as ensure
    // the correct link is highlighted as being active
    function changePosition(link) {
        var position = link.getAttribute("data-pos");
        var quoteId = 0;
        var positionMultiplier = 255;

        if ( window.innerWidth > 1120 ){
            
            createTranslateCss(position); 
            
            link.classList.add("active");
            
        } else if ( window.innerWidth <= 1120 && window.innerWidth > 895) {
            
            quoteId = parseInt(link.itemID);        
            position = alterPosition(position, quoteId, positionMultiplier);  
            
            createTranslateCss(position);
            
            link.classList.add("active");    
            
        } else if ( $(window).width() <= 895 && $(window).width() > 680) {
            
            quoteId = parseInt(link.itemID);        
            position = alterPosition(position, quoteId, (positionMultiplier + 200));  
            
            createTranslateCss(position);
            
            link.classList.add("active");    
            
        } else if ( $(window).width() <= 680 && $(window).width() > 459) {
            
            quoteId = parseInt(link.itemID);        
            position = alterPosition(position, quoteId, (positionMultiplier + 400));  
            
            createTranslateCss(position);
            
            link.classList.add("active");    
            
        } else if ( $(window).width() <= 459 ) {
            
            quoteId = parseInt(link.itemID);        
            position = alterPosition(position, quoteId, (positionMultiplier + 500));  
            
            createTranslateCss(position);
            
            link.classList.add("active");    
            
        }
        
        
    }
    
    
    
    function createTranslateCss(positionValue){
        
        positionValue = positionValue + 'px';
        
        var translateValue = "translate3d(" + positionValue + ", 0px, 0)";
        wrapper.style[transformProperty] = translateValue;       
    }
    
    
    function alterPosition(positionValue, positionId, multiplier){
        
        positionValue = parseInt(positionValue);  
        var newPosition = (positionValue + (multiplier * positionId));

        newPosition = newPosition.toString();       
        return newPosition;
    }
    
    
    

    //
    // Dealing with Transforms
    //
    var transforms = ["transform",
            "msTransform",
            "webkitTransform",
            "mozTransform",
            "oTransform"];

    var transformProperty = getSupportedPropertyName(transforms);

    // vendor prefix management
    function getSupportedPropertyName(properties) {
        for (var i = 0; i < properties.length; i++) {
            if (typeof document.body.style[properties[i]] != "undefined") {
                return properties[i];
            }
        }
        return null;
    }
    
    
    
    var timeoutID;
 
    function startTimer() {
        // wait 2 seconds before calling goInactive
        timeoutID = window.setInterval(goToNextItem, 8000);
    }
    startTimer();

    function resetTimer() {
        window.clearInterval(timeoutID);
        startTimer();
    }

    function goToNextItem() {
        removeActiveLinks();

        if (activeLink < links.length - 1) {
            activeLink++;
        } else {
            activeLink = 0;
        }

        var newLink = links[activeLink];
        changePosition(newLink);
    }

});






//The code for sliding the content automatically













