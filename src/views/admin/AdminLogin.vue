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
.floatLeft {
  float: left;
}
.floatRight {
  text-align: end;
}
.title {
  color: grey;
}

h5 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #80808045;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

.download {
  padding: 5px;
}
h5 span {
  background: #fff;
  padding: 0 10px;
}

.cmp-logo {
  position: absolute;
  z-index: 10;
  background-color: #fff;
  width: 20%;
  text-align: center;
  padding: 15px;
  border-bottom-right-radius: 20px;
}
.hypersign-logo-footer {
  position: absolute;
  z-index: 10;
  left: 30px;
  bottom: 20px;
}
.hypersign-logo-footer p {
  font-weight: 600;
}
.with-hypersign-btn {
  background-color: rgb(61, 66, 60);
  padding: 0;
}
.with-hypersign-btn .btn-text {
  padding: 14px 25px 14px 14px;

  text-transform: uppercase;
}

.btn-hypersign {
  background-color: #494949;
  border-color: #494949;
  padding: 7px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  min-width: 300px;
}

.loginContent {
  min-height: 350px;
  height: 100%;
  width: 350px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
  margin: 0 auto;
  border-top: 2px solid rgb(120, 120, 243);
  text-align: center;
}

.QRRefresh{
  width:100%; 
  align-content:center; 
  height:100%; 
  cursor: pointer;
  margin-top: 14%;
}

.button-theme {
  background-color:  var(--button-bg-color);
  border-collapse:  var(--button-bg-color);
  color: var(--button-text-color);
  border: 0;

}

.event-card{
  border:0;
  border-radius: 10px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.align-center{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
<template>
  <!-- <div class="row" style="margin-left: 35%;"> -->
  <div style="justify-content: center; padding-top:10%">
    <b-card no-body class="loginContent event-card ">
      <img class="align-center" style="margin-bottom: 20px ; padding-top: 10px;" height="70px" src="../../assets/Fyre_Gold_Black.png" />

      <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
      <!-- <h4>Admin Login</h4> -->
      <div class="row" style="margin-top:3%">
        <div v-if="QRRefresh" class="QRRefresh">
          <i @click="reloadQR" class="fas fa-redo" style="font-size: xx-large; color: gray;"></i>
          <p><label style="font-size:small; color:grey; margin-top:1%">
              Session expired. Click to reload.
            </label></p>
        </div>
        <form class="col-md-12" v-else>
          <div class="form-group">
            <vue-qr v-if="qr_data != ''" margin="1" :text="qr_data" :size="200" :logoSrc="src2"
              logoBackgroundColor="white" logoCornerRadius="2"></vue-qr>
            <!-- <label style="font-size:small; color:grey; margin-top:1%">Scan QR code using Hypersign Mobile App</label> -->
            <div>
              <!-- <p style="font-size:small;"> Don’t have the app yet? <a href="#">Get it now</a></p> -->
              <!-- <span style="font-size: small; color:grey; padding: 10px">
                Get the app on
                <a href="https://play.google.com/store/apps/details?id=com.hypersign.cordova"
                  target="__blank">Android</a>
                or
                <a :href="$config.webWalletAddress" target="__blank">Web</a>
              </span> -->
            </div>
          </div>

          <!-- <h5><span>OR</span></h5> -->

          <div class="mb-2 ">
            <a class="btn btn-hypersign  button-theme" :style="buttonThemeCss"  href="#" @click.prevent="openWallet()">
              <div style="font-size: smaller; padding: 10px;">
                Click To Login
              </div>
            </a>
          </div>
        </form>

      </div>
    </b-card>
  </div>
</template>

<script>
import VueQr from "vue-qr";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import url from "url";
import notificationMixins from "../../mixins/notificationMixins";
import localStorageMixin from "../../mixins/localStorageMixin";
import config from "../../config"
import loginWithGoogle from '../../mixins/loginWithGoogle'
export default {
  name: "Login",
  components: {
    VueQr,
    Loading,
  },
  computed:{
     buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     }
  },
  data() {
    return {
      walletWindow: null,
      QRRefresh: false,
      src2: require("../../assets/icon.png"),
      active: 0,
      username: "",
      password: "",
      host: location.hostname,
      challenge: "dddd",
      domain: location.host,
      credentials: {},
      userData: {},
      value: "",
      qr_data:"",
      user: {},
      verifiablePresentation: "",
      fullPage: true,
      isLoading: false,
      connection: null,
      privateKey:
        "3isrtEJ4gt1ZHkdUYYph1WFAtzfqAL5WM6Hh1NC2hmWnDfBypXjt5oUFdAqQdiess2vqqQ3iF6x4fDVuvLw454sn",
      did: "did:hs:892325a4-75c9-465c-882b-91e3ca5143c3",
    };
  },
  created() {
    localStorage.clear();
    localStorage.setItem('path','/admin/dashboard')
     document.title = `${config.appName} - Login`;
    // console.log("Beofer creating websoceket connection");
    // let baseUrl = this.$config.studioServer.BASE_URL;
    // let websocketUrl = "ws://localhost:3003";

    // let parsedUrl = {};
    // try {
    //   parsedUrl = url.parse(baseUrl);
    //   // console.log(parsedUrl);
    //   websocketUrl =
    //     parsedUrl.protocol === "https:"
    //       ? `wss://${parsedUrl.host}`
    //       : `ws://${parsedUrl.host}`;
    //   // console.log(websocketUrl);
    // } catch (e) {
    //   websocketUrl = "ws://localhost:3003";
    // }
    // if (websocketUrl[websocketUrl.length - 1] == "/") {
    //   websocketUrl = websocketUrl.substring(0, websocketUrl.length - 1);
    // }
    // // console.log(websocketUrl);

    // // take it in the env
    // this.connection = new WebSocket(this.$config.websocketUrl);
    // this.connection.onopen = function() {
    //   console.log("Socket connection is open");
    // };

    // this.isLoading = true;
    // var _this = this;

    // this.connection.onmessage = function({ data }) {
    //   // console.log("Websocket connection messag receieved ", data);
    //   let messageData = JSON.parse(data);
    //   // console.log(messageData);
    //   if (messageData.op == "init") {
    //     _this.isLoading = false;
    //     /// Sending provider from here........
    //     messageData.data['provider'] = 'google';
    //     _this.value = JSON.stringify(messageData.data);
    //     _this.qr_data=`${_this.$config.webWalletAddress}/deeplink?url=${_this.value}`
    //   } else if (messageData.op == "end") {
    //     _this.connection.close();
    //     const authorizationToken = messageData.data.hypersign ? messageData.data.hypersign.data.accessToken : messageData.data.token;
    //     // console.log(authorizationToken);
    //     localStorage.setItem("authToken", authorizationToken);

    //     if (localStorage.getItem("authToken") != null) {
    //       if (this.walletWindow) {
    //         this.walletWindow.close();
    //       }
    //       if (_this.$route.params.nextUrl != null) {
    //         _this.$router.push(_this.$route.params.nextUrl);
    //       } else {
    //         // console.log(_this.$router);
    //         window.location.href =
    //           window.location.origin + "/admin/dashboard";
    //         // _this.$router.push("dashboard");
    //       }
    //     }
    //   } else if (messageData.op == "reload") {
    //     // console.log("Timeout for clientId: " + messageData.data.clientId)
    //     _this.QRRefresh = true;
    //     _this.connection.close(4001, messageData.data.clientId);
    //    }
    // };
    // this.connection.onerror = function(error) {
    //   console.log("Websocket connection error ", error);
    // };
  },
  mounted() {
    this.clean();
  },
  methods: {
    reloadQR(){
      window.location.reload()
    },
    openWallet() {
      this.loginWithGoogle()
      // if (this.value != "") {
      //   this.walletWindow = window.open(
      //     `${this.$config.webWalletAddress}/deeplink?url=${this.value}`,
      //     "popUpWindow",
      //     `height=800,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes`
      //   );
      // }
    },
    push(path) {
      this.$router.push(path);
    },

    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
  },
  mixins: [notificationMixins, localStorageMixin,loginWithGoogle],
};
</script>
