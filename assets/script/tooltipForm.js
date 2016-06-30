$(function () {

    $('.fa-envelope, #tooltip-form').click(function(event) {
        event.stopPropagation();
        $('#tooltip-form').addClass('active');    
    });
    
    $(document).click(function () {
        $('#tooltip-form').removeClass('active');
    })
       
});