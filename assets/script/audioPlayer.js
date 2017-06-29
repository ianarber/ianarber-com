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
