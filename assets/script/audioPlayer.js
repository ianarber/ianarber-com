
$(function () {
    
    //get array of all audio elements
    var audioList = document.getElementsByTagName('AUDIO');   
    
    $('.fa-play-circle').on('click', function(){
        
        //make sure all other buttons have play active
        resetPlayButtons();
        
        $(this).removeClass('active');
        
        //get id value of clicked play button
        var currentIden = $(this).attr('id');
        
        $('#'+currentIden+'-stop').addClass('active');
        
        //loop through audio array
        for (var i = 0; i < audioList.length; i++) {

            //pause and reset all audio
            audioList[i].pause();
            audioList[i].currentTime = 0;

            //only play audio if iden values match
            if (currentIden === audioList[i].getAttribute("class")) {
                audioList[i].play();
                
                audioList[i].addEventListener('ended', function(){
                    resetPlayButtons();
                });
            }
            
        }

    });
    
    
    $('.fa-stop-circle').on('click', function(){
        
        $(this).removeClass('active');
        
        //get id value of fa-play-circle above the clicked element
        var currentIden = $(this).prev().attr('id');
        
        //make play circle visable
        $('#'+currentIden).addClass('active');
        
        //stop and reset audio of clicked element
        //native DOM methods used hence [0]
        $(this).closest('div').prev('audio')[0].pause();
        $(this).closest('div').prev('audio')[0].currentTime = 0;       
    
    }); 
    
    
    function resetPlayButtons(){
        
        $('.fa-stop-circle').removeClass('active');
        $('.fa-play-circle').addClass('active');
           
    }
    
});