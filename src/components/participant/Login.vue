<template>
  <div>
    <b-row class="login-wrap">
      <b-col md="12">
        <b-card-body>
          <b-card-text class="w-100 text-center">
            <template v-if="QRRefresh">
              <div class="alert alert-warning" role="alert">
                Session expired. <a href="#" class="ml-2 alert-link" @click="reloadQR">Click to reload.</a>
              </div>
            </template>
            <template >
              <b-button  class="btn-login button-theme" :style="buttonThemeCss" @click.prevent="openWalletAfterRecaptcha()">Click To Login
                <!--<vue-recaptcha
                  ref="recaptcha"
                  size="invisible"
                  :sitekey="$config.recaptchaSiteKey"
                  :loadRecaptchaScript="true"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                ></vue-recaptcha>-->
              </b-button>
            </template>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import config from "../../config";
import Messages from "../../utils/messages/participants/en";
import loginWithGoogle from '../../mixins/loginWithGoogle'
import url from "url";
export default {
  components: { },
  
  props: {
    fontColor: String,
    themeColor: String,
    themeData: Object
  },
  computed:{
        buttonThemeCss() {
      return {
        '--button-bg-color': this.themeData && this.themeData.buttonBGColor ? this.themeData.buttonBGColor : config.app.buttonBgColor,
        '--button-text-color': this.themeData && this.themeData.buttonTextColor ? this.themeData.buttonTextColor : config.app.buttonTextColor
      }
    }
  },
  data() {
    return {
      authToken: "xdfhsfsdfdsdfsdf",
      connection: null,
      host: location.hostname,
      domain: location.host,
      userData: {},
      walletWindow: null,
      value: "",
      QRRefresh: false,
    };
  },
  async created() {
    localStorage.setItem('path',this.$route.fullPath)
    // let baseUrl = this.$config.studioServer.BASE_URL;
    // let websocketUrl = "ws://localhost:3003";

    // let parsedUrl = {};
    // try {
    //   parsedUrl = url.parse(baseUrl);

    //   websocketUrl =
    //     parsedUrl.protocol === "https:" ?
    //     `wss://${parsedUrl.host}` :
    //     `ws://${parsedUrl.host}`;
    // } catch (e) {
    //   websocketUrl = "ws://localhost:3003";
    // }
    // if (websocketUrl[websocketUrl.length - 1] == "/") {
    //   websocketUrl = websocketUrl.substring(0, websocketUrl.length - 1);
    // }

    // this.isLoading = true;
    // var _this = this;

    // // take it in the env
    // _this.socketMessage = Messages.EVENT.LOGIN.SOCKET_INIT;
    // this.connection = new WebSocket(this.$config.websocketUrl);
    // this.connection.onopen = function() {
    //   _this.socketMessage = Messages.EVENT.LOGIN.SOCKET_OPEN;
    // };

    // this.connection.onmessage = ({ data }) => {
    //   let messageData = JSON.parse(data);
    //   if (messageData.op == "init") {
    //     _this.isLoading = false;
    //      messageData.data['provider'] = 'google';
    //     _this.value = JSON.stringify(messageData.data);
    //     _this.socketMessage = null;
    //   } else if (messageData.op == "end") {
    //     _this.connection.close();
    //     const authorizationToken = messageData.data.hypersign ? messageData.data.hypersign.data.accessToken : messageData.data.token;

    //     // console.log("Emitting authentoken event")

    //     localStorage.setItem("authToken", authorizationToken);
    //     this.$emit("AuthTokenUpdateEvent", authorizationToken);


    //   } else if (messageData.op == "reload") {
    //     _this.QRRefresh = true;
    //     _this.connection.close(4001, messageData.data.clientId);
    //   }
    // };

    // this.connection.onerror = function(error) {
    //   console.log(error);
    //   _this.error = true;
    //   _this.socketMessage = Messages.EVENT.LOGIN.SOCKET_ERROR;
    // };
  },
  mixins:[loginWithGoogle],
  methods: {
    reloadQR() {
      window.location.reload();
    },
    openWallet() {
      this.$refs.recaptcha.execute()
    },
    openWalletAfterRecaptcha(){
      this.loginWithGoogle()

      // if (this.value != "") {
      //   this.walletWindow = window.open(
      //     `${this.$config.webWalletAddress}/deeplink?url=${this.value}`,
      //     "popUpWindow",
      //     `height=800,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes`
      //   );
      // } else {
      //   // console.log("this value is not")
      // }
    },
    onCaptchaExpired: function() {
      // console.log("Captcha expired");
      this.$refs.recaptcha.reset();
    },
    onCaptchaVerified: function(recaptchaToken) {
      // console.log('Verify: ' + recaptchaToken)
      localStorage.setItem("recaptchaToken", recaptchaToken);
      const self = this;
      self.status = "submitting";
      self.$refs.recaptcha.reset();
      this.openWalletAfterRecaptcha();
      // this.saveInvestor(this.stepTwoData.formData, recaptchaToken);
    },
  },
};
</script>
<style scoped>
.button-theme {
  background-color:  var(--button-bg-color);
  border-collapse: var(--button-bg-color);
  color: var(--button-text-color);
  border: 0;
}
.logincontent {
  margin-top: 20px;
  padding: 2px;
  min-width: 500px;
  height: 500px;
  background: rgb(241, 212, 212);
  border-radius: 20px;
}
</style>