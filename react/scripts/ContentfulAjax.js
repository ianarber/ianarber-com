import axios from "axios";

//webtask contentful api endpoint
let url = 'https://webtask.it.auth0.com/api/run/wt-26212ff75758b7d16d19104dea3bca60-0/subscribers/clientarea';

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