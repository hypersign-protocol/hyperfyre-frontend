import auth0 from "auth0-js";

const webAuth = new auth0.WebAuth({
    domain: "novocloud.auth0.com",
    clientID: "V82xNRM7HLw9e69WtAEJrXIjKOe0VW1G",
    redirectUri: "http://localhost:9002/studio/connectwithtwitter",
    responseType: "token id_token",
    scope: "openid, profile, email",

})

const login  = () => {
    webAuth.popup.authorize({
        connection: "twitter",
        redirectUri: "http://localhost:9002/studio/connectwithtwitter",
        // autoClose: true,
        // owp: true,
    }, function(err, authRes){
        console.log("ERR", err,  "AUTH RES", authRes)
    });

    // webAuth.popup.callback({

    // });
}


export {login}