
//use JS to set action attribute to prevent spam
var tooltipForm = document.getElementById('submit-form');
tooltipForm.setAttribute('action', '//formspree.io/' + 'contact' + '@' + 'ianarber' + '.' + 'com');

var contactEmail1 = document.getElementById('email-ollie');
contactEmail1.setAttribute('href', 'mailto:' + 'ollie' + '@' + 'coolmusicltd' + '.' + 'com');
contactEmail1.innerHTML = 'ollie' + '@' + 'coolmusicltd' + '.' + 'com';

var contactEmail2 = document.getElementById('email-john');
contactEmail2.setAttribute('href', 'mailto:' + 'johnt' + '@' + 'soundtrk' + '.' + 'com');
contactEmail2.innerHTML = 'johnt' + '@' + 'soundtrk' + '.' + 'com';

var contactEmail3 = document.getElementById('email-ian');
contactEmail3.innerHTML = 'contact' + '@' + 'ianarber' + '.' + 'com';


$(function () {

    //show tooltip when envelope icon is clicked
    $('.fa-envelope, #tooltip-form').click(function(event) {
        //allow user to click off the tooltip form to close it. use with caution!
        event.stopPropagation();
        $('#tooltip-form').addClass('active');    
    });
    
    $(document).click(function () {
        $('#tooltip-form').removeClass('active');
    })
    
    //jQuery cache DOM
    var $form = $('#submit-form');
    
    $form.submit(function(event){
        if( validateForm() ){
            return;
        } else {
            event.preventDefault();
        }
    });
    
    function validateForm(){
        var name = $form.find('input:first').val();
        var email = $form.find('input:eq(1)').val();
        var msg = $form.find('textarea').val();
        
        if( name == '' ){
            $form.find('input:first').addClass('tooltip-notvalid');
            return false;
        } else {
            $form.find('input:first').removeClass('tooltip-notvalid');
        }
        
        if( email == ''){
            $form.find('input:eq(1)').addClass('tooltip-notvalid');
            return false;
        } else {
            var atPos = email.indexOf('@');
            var dotPos = email.indexOf('.');

            if( atPos < 1 || ( dotPos - atPos < 2 )){
                $form.find('input:eq(1)').addClass('tooltip-notvalid');
                return false;
            } else {
                $form.find('input:eq(1)').removeClass('tooltip-notvalid');
            }
        }
        
        if( msg == '' ){
            $form.find('textarea').addClass('tooltip-notvalid');
            return false;
        } else {
            $form.find('textarea').removeClass('tooltip-notvalid');
        }
        
        return true;
    }
       
});