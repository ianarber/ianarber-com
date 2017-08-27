var webtaskAjaxInterval = null;
var intervalCounter = 0;

function getWebtaskData(){
    
    if(localStorage.getItem('ianarber-auth0-access-token')){
        clearInterval(webtaskAjaxInterval);

        $.ajax({
            type : 'GET',
            url : 'https://webtask.it.auth0.com/api/run/wt-26212ff75758b7d16d19104dea3bca60-0/subscribers/clientarea',
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('ianarber-auth0-access-token')
            }
        }).done(function(data) {
            //for(var i = 0; i < data.length; i++){
                $('#subscribers').append('<p>' + JSON.stringify(data) + '<p>');
            //}
        }).fail(function(jqxhr, textStatus, error){
            var err = textStatus + ', ' + error;
            console.log('Request failed with error: ' + err);
            $('#subscribers').append('<h2>Oops! You\'re not authenticated!</h2>');
        });

    } else {
        console.log('access token doesn\'t exist');
        if(++intervalCounter === 3){
            console.log(window.location.pathname);
            $('#subscribers').append('<h2>Oops! You\'re not allowed here!</h2>');
            clearInterval(webtaskAjaxInterval);
        }
    }

}



$(function(){

    webtaskAjaxInterval = setInterval(getWebtaskData, 500);

});