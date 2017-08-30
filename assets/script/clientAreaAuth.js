$(function(){

    function insertExpiresDate(json){
        var date = new Date();
        date.setDate(date.getDate() + 1); //24 hour expires time
        var jsonDate = date.toJSON();
    
        var dateObj = {'date': jsonDate};
        json['expires'] = dateObj;
        return json;
    }
    
    // theme, style and auth options for auth0 lock widget https://auth0.com/docs/libraries/lock/v10/customization
    var auth0LockOptions = {
        rememberLastLogin: false,
        allowForgotPassword: false,
        theme: {
            logo: 'https://serverless-stories.netlify.com/phil.jpg', //TODO: update
            primaryColor: '#0d2f52',
            labeledSubmitButton: false
        },
        languageDictionary: {
            emailInputPlaceholder: "user@email.com",
            title: "Client Area"
        },
        auth: {
            redirectUrl: 'http://192.168.0.34:3000/clientarea', //TODO: update
            responseType: 'token id_token'
        }
    };

    //create new auth0 lock widget with options
    var auth0lock = new Auth0Lock('djk9b6nLgKKKCTdVs1kVyHoL1jko5xNl', 'adesmier.eu.auth0.com', auth0LockOptions);
    auth0lock.on('authenticated', function(authResult) {
        auth0lock.getUserInfo(authResult.accessToken, function(error, profile) {
          if (error) {
            return alert(error.message); //TODO: don't use alert here
          }

          profile = insertExpiresDate(profile); //valid for 24 hours
          localStorage.setItem('ianarber-auth0-access-token', authResult.idToken); //can be used to call secure webtask function
          localStorage.setItem('ianarber-auth0-profile', JSON.stringify(profile));
        });
    });

    var $clientAreaBtns = $('.client-area-btn'); //run for all client area links
    var $clearAuthItems = $('#clear-auth-items'); //TODO: Needs to be removed

    /*
      We first check if there is an item called 'ianarber-auth0-profile' in local storage. If there is it's email key needs to equal the value
      in allowedEmail. If it does then check if the expires key date is still within 24 hours. If so the profile is still valid so the user
      does not have to log in again. They are taken to the client area page.

      NOTE: Only stage 1 of authentication and not really secure as you can just add an item into local storage yourself. The real authentication
      comes from the ajax call to the webtask to get the data to display on the client area page. If the ajax authentication fails then the user
      will be asked to login
    */
    $clientAreaBtns.on('click', function(e){
        e.preventDefault();
        var user = JSON.parse(localStorage.getItem('ianarber-auth0-profile'));

        if(user && user.expires){ //first check if profile email stored is correct
            var expiresDate = Date.parse(user.expires.date);
            var date = new Date();
            date.setDate(date.getDate());
            var currentDate = Date.parse(date.toJSON());
            if(expiresDate >= currentDate){ //and then if it's still valid
                window.location = '/clientarea';
            }  else {
                auth0lock.show();
            }
        } else {
             auth0lock.show();
        }

    });

    //TODO: Needs to be removed
    $clearAuthItems.on('click', function(e){
        localStorage.removeItem('ianarber-auth0-profile');
        localStorage.removeItem('ianarber-auth0-access-token');
        console.log('Auth items cleared');
    });




});