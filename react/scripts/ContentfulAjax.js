// import $ from 'jquery';

// export default {
//     getContent: function(){
//         return new Promise(function(resolve, reject){

//             let authToken = localStorage.getItem('ianarber-auth0-access-token');
            
//             if(authToken){
//                 $.ajax({
//                     type : 'GET',
//                     url : 'https://webtask.it.auth0.com/api/run/wt-26212ff75758b7d16d19104dea3bca60-0/subscribers/clientarea',
//                     headers : {
//                         Authorization : 'Bearer ' + authToken
//                     }
//                 }).done(function(data){
//                     resolve(data);
//                 }).fail(function(jqxhr, textStatus, error){
//                     let err = textStatus + ', ' + error;
//                     resolve({
//                         error: `Request failed with error: ${err}`
//                     });
//                 });
//             } else {
//                 reject(null);
//             }

//         });

//     }
// }

import axios from "axios";

let url = 'https://webtask.it.auth0.com/api/run/wt-26212ff75758b7d16d19104dea3bca60-0/subscribers/clientarea'
let authToken = localStorage.getItem('ianarber-auth0-access-token');
let headers = {
    headers: {
        Authorization : 'Bearer ' + authToken
    }
}

export default {
    getContent: function(){
        return axios.get(url, headers).then(response => {
            return response.data;
        });
   }
}