
//$(function () {
//    
//    //get array of all audio elements
//    var audioList = document.getElementsByTagName('AUDIO');   
//    
//    $('.fa-play-circle').on('click', function(){
//        
//        //make sure all other buttons have play active
//        resetPlayButtons();
//        
//        $(this).removeClass('active');
//        
//        //get id value of clicked play button
//        var currentIden = $(this).attr('id');
//        
//        $('#'+currentIden+'-stop').addClass('active');
//        
//        //loop through audio array
//        for (var i = 0; i < audioList.length; i++) {
//
//            //pause and reset all audio
//            audioList[i].pause();
//            audioList[i].currentTime = 0;
//
//            //only play audio if iden values match
//            if (currentIden === audioList[i].getAttribute("class")) {
//                audioList[i].play();
//                
//                audioList[i].addEventListener('ended', function(){
//                    resetPlayButtons();
//                });
//            }
//            
//        }
//
//    });
//    
//    
//    $('.fa-stop-circle').on('click', function(){
//        
//        $(this).removeClass('active');
//        
//        //get id value of fa-play-circle above the clicked element
//        var currentIden = $(this).prev().attr('id');
//        
//        //make play circle visable
//        $('#'+currentIden).addClass('active');
//        
//        //stop and reset audio of clicked element
//        //native DOM methods used hence [0]
//        $(this).closest('div').prev('audio')[0].pause();
//        $(this).closest('div').prev('audio')[0].currentTime = 0;       
//    
//    }); 
//    
//    
//    function resetPlayButtons(){
//        
//        $('.fa-stop-circle').removeClass('active');
//        $('.fa-play-circle').addClass('active');
//           
//    }
//    
//});

///*********************************************************************/////

var AudioWidget = {
    
    audio: document.getElementsByTagName('AUDIO'),
    
    init: function(){
        this.cacheDom();
        this.bindEvents();
    },
    
    cacheDom: function() {
        this.$playButton = $('.fa-play-circle');
        this.$stopButton = $('.fa-stop-circle');
    },
    
    bindEvents: function(){
        this.$playButton.on('click', this.playAudio.bind(this));
        this.$stopButton.on('click', this.stopAudio.bind(this));
    },
    
    playAudio: function(event){
        this.resetAudio();
       
        $(event.target).removeClass('active');
        
        var currentIden = event.target.id;
        
        $(event.target).next().addClass('active');
              
        //loop through audio array
        for (var i = 0; i < this.audio.length; i++) {

            //pause and reset all audio
            this.audio[i].pause();
            this.audio[i].currentTime = 0;

            //only play audio if iden values match
            if (currentIden === this.audio[i].getAttribute("class")) {
                this.audio[i].play();
                
                this.audio[i].addEventListener('ended', function(event){
                    this.resetAudio(event);
                }.bind(this));

            }
            
        }     
    },
    
    stopAudio: function(event){
        
        $(event.target).removeClass('active');
        
        $(event.target).prev().addClass('active');

        $(event.target).closest('div').prev('audio')[0].pause();
        $(event.target).closest('div').prev('audio')[0].currentTime = 0;       
     
    },
    
    resetAudio: function(){
        this.$stopButton.removeClass('active');
        this.$playButton.addClass('active');
    }
}


$(function () {
    AudioWidget.init();
});


















