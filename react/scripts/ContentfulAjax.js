//promise polyfill for IE
require('es6-promise').polyfill();

import axios from "axios";

//webtask contentful api endpoint
let url = 'https://webtask.it.auth0.com/api/run/wt-ac3e583c9f00d93f6ffc5708cf3656eb-0/clientpage/clientarea';

export default {
    getContent: function(){
        let authToken = localStorage.getItem('ianarber-auth0-access-token');
        let headers = { headers: { Authorization : 'Bearer ' + authToken } };

        if(authToken){
            return axios.get(url, headers).then(response => {
                return {
                    status: response.status,
                    data: response.data //return the contentful data
                }
            }).catch(error => {
                return {
                    status: error.response.data.status,
                    data: error.response.data.message //or unauthorized error from webtask
                }
            });
        } else {
            return new Promise(function(resolve, reject){
                reject('Auth token does not exist');
            });
        } 
   }
}