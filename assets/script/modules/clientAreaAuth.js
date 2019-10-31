$(function(){

    function insertExpiresDate(json){
        var date = new Date();
        date.setDate(date.getDate() + 1); //24 hour expires time
        var jsonDate = date.toJSON();
    
        var dateObj = {'date': jsonDate};
        json['expires'] = dateObj;
        return json;
    }

    /*
      We first check if there is an item called 'ianarber-auth0-profile' in local storage.
      If there then check if the expires key date is still within 24 hours.
      If so the profile is still valid so the user does not have to log in again.
      They are taken to the client area page.

      NOTE: Only stage 1 of authentication and not really secure as you can just add an
      item into local storage yourself. The real authentication comes from the ajax call
      to the webtask to get the data to display on the client area page. If the ajax
      authentication fails then the user will be asked to login
    */
    function openAuth0Lock(event){
        event.preventDefault();
        var user = JSON.parse(localStorage.getItem('ianarber-auth0-profile'));

        if(user && user.expires){
            var expiresDate = Date.parse(user.expires.date);
            var date = new Date();
            date.setDate(date.getDate());
            var currentDate = Date.parse(date.toJSON());
            if(expiresDate >= currentDate){ //and then if it's still valid
                window.location = '/reel';
            }  else {
                auth0lock.show();
            }
        } else {
             auth0lock.show();
        }
    }
    
    // theme, style and auth options for auth0 lock widget
    // https://auth0.com/docs/libraries/lock/v10/customization
    var auth0LockOptions = {
        rememberLastLogin: false,
        allowForgotPassword: false,
        prefill: {
            email: 'guest@ianarber.com'
        },
        theme: {
            primaryColor: '#0d2f52',
            labeledSubmitButton: false
        },
        languageDictionary: {
            emailInputPlaceholder: "guest@ianarber.com",
            title: "Reel"
        },
        auth: {
            redirectUrl: 'https://www.ianarber.com/reel', //TODO: update
            responseType: 'token id_token'
        }
    };

    //create new auth0 lock widget with options
    var auth0lock = new Auth0Lock('TdKEaCjzuCd5uiQfnq8CpJuJoZSoGSg0', 'ianarber.auth0.com', auth0LockOptions);
    auth0lock.on('authenticated', function(authResult) {
        //once authenticated...
        auth0lock.getUserInfo(authResult.accessToken, function(error, profile) {
          if (error) {
            return alert(error.message); //TODO: handle error better
          }

          profile = insertExpiresDate(profile); //valid for 24 hours
          localStorage.setItem('ianarber-auth0-access-token', authResult.idToken);
          localStorage.setItem('ianarber-auth0-profile', JSON.stringify(profile));
          //token is now stored to send to webtask
        });
    });

    var $clientAreaBtns = $('.client-area-btn'); //run for all client area links
    //var $clearAuthItems = $('#clear-auth-items'); //TODO: Needs to be removed

    $clientAreaBtns.on('click', function(e){
        openAuth0Lock(e);
    });

    /*
     react component on client page will be added after page is ready so traverse dom for
     new button component. Note: not ideal!
    */
    $(document).on('click', '#btn-on-client-area',  function(e){
        openAuth0Lock(e);
    });

    //TODO: Needs to be removed
    // $clearAuthItems.on('click', function(e){
    //     localStorage.removeItem('ianarber-auth0-profile');
    //     localStorage.removeItem('ianarber-auth0-access-token');
    //     console.log('Auth items cleared');
    // });

});