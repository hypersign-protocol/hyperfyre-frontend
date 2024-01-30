import webAuth from '../utils/auth0Connection';

export default{
    methods: {
        loginWithGoogle(){
            webAuth.authorize(
                {
                  connection: "google-oauth2",
                  redirectUri: window.location.origin + "/#/auth/google?",
                  

                });
        }
    },


}