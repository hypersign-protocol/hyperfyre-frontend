import auth0 from "auth0-js";


const webAuth = new auth0.WebAuth({
    domain: "novocloud.auth0.com",
    clientID: "pJ6FUVcEt7Jhd4wFwZi5u3ILkymak1bA",
    responseType: "token id_token",
    scope: "profile",
    redirectUri: "http://172.20.10.8:9002/studio/connectwithtwitter"
})


export default webAuth;
