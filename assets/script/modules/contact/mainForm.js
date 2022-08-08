//use JS to set action attribute to prevent spam
var mainForm = document.getElementById('main-form');
mainForm.setAttribute('action', '//formspree.io/' + 'contact' + '@' + 'ianarber' + '.' + 'com');

var contactEmail1 = document.getElementById('email-carolynne');
contactEmail1.setAttribute('href', 'mailto:' + 'carolynne' + '@' + 'smatalent' + '.' + 'com');
contactEmail1.innerHTML = 'carolynne' + '@' + 'smatalent' + '.' + 'com';

var contactEmail2 = document.getElementById('email-john');
contactEmail2.setAttribute('href', 'mailto:' + 'johnt' + '@' + 'soundtrk' + '.' + 'com');
contactEmail2.innerHTML = 'johnt' + '@' + 'soundtrk' + '.' + 'com';

var contactEmail3 = document.getElementById('email-ian');
contactEmail3.innerHTML = 'contact' + '@' + 'ianarber' + '.' + 'com';

$(function(){
    
    //jQuery cache DOM
    var $form = $('#main-form');
    
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
            $form.find('label:first').addClass('notValid');
            return false;
        } else {
            $form.find('label:first').removeClass('notValid');
        }
        
        if( email == ''){
            $form.find('label:eq(1)').addClass('notValid');
            return false;
        } else {
            var atPos = email.indexOf('@');
            var dotPos = email.indexOf('.');

            if( atPos < 1 || ( dotPos - atPos < 2 )){
                $form.find('label:eq(1)').addClass('notValid');
                return false;
            } else {
                $form.find('label:eq(1)').removeClass('notValid');
            }
        }
        
        if( msg == '' ){
            $form.find('label:eq(2)').addClass('notValid');
            return false;
        } else {
            $form.find('label:eq(2)').removeClass('notValid');
        }
        
        return true;
    }
    
    

    
    
});