<style scoped>
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}

.logo {
  width: 144px;
}

.fullbody {
  width: 100%;
}
.floatLeft{
  float: left;
}

.floatRight{
  float: right;
}

.noBullet{
  list-style-type:none;
}

.title {
  color: grey;
  font-size: 18px;
}

</style>
<template>
   <div class="home  marginLeft marginRight">
     <h1>CONNECT WITH TWITTER BUTTON</h1>
    <button @click="loginClick()" class="btn">connect with twitter</button>
  </div>
</template>


<script>


import webAuth from "../mixins/twitterLogin";

export default {
  name: "PanelPage",
  mounted() {
  },
  data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null
      };
    },

    mounted(){
      //  webAuth.parseHash((err, authResult) => {
      //   console.log(err, authResult)
      //   });
      //   webAuth.popup.callback()  
    },
   
     
    
    methods: {
    
    loginClick(){
      webAuth.popup.authorize(
      {
        connection: "twitter", 
        owp: true,    
      },
      function (err, authRes) {
        console.log(authRes, err)
        webAuth.client.userInfo(authRes.accessToken, function(err, user) {
    console.log(err, user)
  });
      }
    );


         
    },

    

    //   /** Authenticates the user using a popup window */
    //   async loginWithPopup(options, config) {
    //     this.popupOpen = true;

    //     try {
    //       await this.auth0Client.loginWithPopup(options, config);
    //       this.user = await this.auth0Client.getUser();
    //       this.isAuthenticated = await this.auth0Client.isAuthenticated();
    //       this.error = null;
    //     } catch (e) {
    //       this.error = e;
    //       // eslint-disable-next-line
    //       console.error(e);
    //     } finally {
    //       this.popupOpen = false;
    //     }

    //     this.user = await this.auth0Client.getUser();
    //     this.isAuthenticated = true;
    //   },
    //   /** Handles the callback when logging in using a redirect */
    //   async handleRedirectCallback() {
    //     this.loading = true;
    //     try {
    //       await this.auth0Client.handleRedirectCallback();
    //       this.user = await this.auth0Client.getUser();
    //       this.isAuthenticated = true;
    //       this.error = null;
    //     } catch (e) {
    //       this.error = e;
    //     } finally {
    //       this.loading = false;
    //     }
    //   },
    //   /** Authenticates the user using the redirect method */
    //   loginWithRedirect(o) {
    //     return this.auth0Client.loginWithRedirect(o);
    //   },
    //   /** Returns all the claims present in the ID token */
    //   getIdTokenClaims(o) {
    //     return this.auth0Client.getIdTokenClaims(o);
    //   },
    //   /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
    //   getTokenSilently(o) {
    //     return this.auth0Client.getTokenSilently(o);
    //   },
    //   /** Gets the access token using a popup window */

    //   getTokenWithPopup(o) {
    //     return this.auth0Client.getTokenWithPopup(o);
    //   },
    //   /** Logs the user out and removes their session on the authorization server */
    //   logout(o) {
    //     return this.auth0Client.logout(o);
    //   }
    },

    /** Use this lifecycle method to instantiate the SDK client */
    // async created() {
    //   // Create a new instance of the SDK client using members of the given options object
    //   this.auth0Client = await createAuth0Client({
    //     ...options,
    //     client_id: options.clientId,
    //     redirect_uri: redirectUri
    //   });

    //   try {
    //     // If the user is returning to the app after authentication..
    //     if (
    //       window.location.search.includes("code=") &&
    //       window.location.search.includes("state=")
    //     ) {
    //       // handle the redirect and retrieve tokens
    //       const { appState } = await this.auth0Client.handleRedirectCallback();

    //       this.error = null;

    //       // Notify subscribers that the redirect callback has happened, passing the appState
    //       // (useful for retrieving any pre-authentication state)
    //       onRedirectCallback(appState);
    //     }
    //   } catch (e) {
    //     this.error = e;
    //   } finally {
    //     // Initialize our internal authentication state
    //     this.isAuthenticated = await this.auth0Client.isAuthenticated();
    //     this.user = await this.auth0Client.getUser();
    //     this.loading = false;
    //   }
    // }
  
 
};
</script>
