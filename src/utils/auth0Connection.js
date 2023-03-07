import auth0 from "auth0-js";
import config from '../config'
const newWebAuth = new auth0.WebAuth({
    domain:  config.auth0Domain,
    clientID:  config.auth0LOGINCLIENTID,
    responseType: "token id_token",
    scope: "openid profile email",
})

export default newWebAuth