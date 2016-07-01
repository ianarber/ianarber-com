
//use JS to set action attribute to prevent spam
var tooltipForm = document.getElementById('submit-form');
tooltipForm.setAttribute('action', '//formspree.io/' + 'anthonydesmier' + '@' + 'hotmail' + '.' + 'com');


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
       
});