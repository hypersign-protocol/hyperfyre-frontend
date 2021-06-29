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
.bg-dark {
  background-color: #494949 !important;
}
.app-links img {
  height: 50px;
}
/* .loginPage {
  position: absolute;
  left: 0;
  top: 0;
  width: 102%;
  top: 0;
} */
.nav-style {
  display: none;
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
  background-color: #494949;
  padding: 0;
}
.with-hypersign-btn .btn-text {
  padding: 14px 25px 14px 14px;

  text-transform: uppercase;
}
.loginInNow-text {
  font-size: 25px;
  margin-bottom: 20px;
}

@media screen and (max-width: 990px) {
  .loginPage {
    flex-direction: column;
  }
}

.qrWrapper {
  padding: 10px;
  border: 1px solid rgba(128, 128, 128, 0.37);
  width: 55%;
  margin-left: 22%;
}
.qrWrapper img {
  width: 100%;
}

/* .openMobileAppWrapper a{
  width: 90%;
} */


.btn-hypersign{
  background-color: #494949;
  border-color: #494949;
  padding: 7px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
  min-width: 300px;
}

/* .btn-hypersign:hover{
  background-color: white;
  text-decoration: none;
} */

@media screen and (max-width: 990px) {
  .loginPage {
    flex-direction: column;
  }
}

.qrWrapper {
  padding: 10px;
  border: 1px solid rgba(128, 128, 128, 0.37);
  width: 55%;
  margin-left: 22%;
}
.qrWrapper img {
  width: 100%;
}
.openMobileAppWrapper{
  display: none;
}

.btn-img-dark{
  display: none;
}
@media screen and (max-width: 990px) {
  .loginPage {
    flex-direction: row;
  }
}

@media screen and (max-width: 768px) {
  .loginPage {
    flex-direction: row !important;
  }
  .cmp-logo {
    width: 40%;
  }
  .login-container {
    height: auto !important;
  }
  body {
    font-size: calc(0.75em + 1vmin);
    overflow-x: hidden !important;
  }
  .login-inst-container {
    padding: 100px 0px;
  }
}

@media screen and (max-width: 516px) {
  .login-inst-container {
    padding: 100px 50px;
    font-size: 14px;
  }
  .login-inst-container h3 {
    font-size: 20px;
    font-weight: bold;
  }
  .cmp-logo {
    width: 50%;
  }
  .hypersign-logo-footer {
    font-size: 14px;
    display: none;
  }
  .hypersign-logo-footer img {
    width: 90px;
    display: none;
  }
  .app-links img {
    height: 40px;
    margin: 0 10px;
  }
  .qrWrapper{
    display: none;
  }
  .openMobileAppWrapper{
    display: block;
  }
  .scan-qr-message{
    display: none;
  }
  /* .openWebWalletWrapper{
    width: 90%;
  } */
  .loginInNow-text{
    font-size: 18px;
  } 
  .with-hypersign-btn{
    width: 70% !important;
    
  }
  .with-hypersign-btn .btn-text{
    text-align: center;
    width: 100%;
    padding: 0;
  }
  .with-hypersign-btn {
    position: relative;
    padding: 10px;
  }
   .with-hypersign-btn  .btn-img{
     display: none;
    }
  

}
@media screen and (max-width: 375px){
  .with-hypersign-btn  img{
     display: none;
   }
   .with-hypersign-btn{
    width: 80% !important;
    
  }
}
/* .with-hypersign-btn  */
</style>
<template>
  <div class="row vh-100 loginPage">
    <div class="cmp-logo">
      <div>
        <img
         :src="projectDetails.logoUrl || 'https://thumb.tildacdn.com/tild3065-3765-4865-b331-393637653931/-/resize/150x/-/format/webp/hypersign_Yellow.png'"
         
          style="max-width: 150px;"
        />
      </div>
    </div>

    <div
      class="col col-lg-8 col-md-12 col-sm-12 d-flex justify-content-center align-items-center border border-1 bg-dark shadow text-left text-white login-inst-container"
    >
      <div>
          <!-- <h3>Whitelist for Hypersign Data Defenders Program</h3> -->
        <h3>Whitelist for {{projectDetails.projectName}}</h3>
        <p class="mt-4">Instructions</p>
        <ol class="px-3">          
          <li>Login with the Hypersign</li>
          <li>Follow the steps provided in the next screens</li>
          <li>Submit additional information as requested</li>
          <li>Wait for winners announcement.</li>
        </ol>



     <div class="hypersign-logo-footer">
      <div>
        <p class="text-white my-0 fw-bolder">Powered By</p>
        <img
          :src="require(`../assets/footerLogo.png`)"
          style="max-width: 150px;"
        />
      </div>
    </div>
      </div>
    </div>

    <div class="col col-lg-4 col-md-12 col-sm-12 border border-1 bg-white border">
      <div class="d-flex flex-column justify-content-between vh-100 px-3 login-container">
        <a
          class="text-right mt-3  text-dark text-reset fw-bold"
          style="font-weight:600"
          target="_blank"
          href="https://t.me/hypersignchain"
          >HELP ?</a
        >
        <div>
          <p class="loginInNow-text">LOGIN WITH HYPERSIGN</p>
          <div v-if="value && value != ''">
            <!-- <div> -->

            <div class="qrWrapper">
              <vue-qr
                v-if="value != ''"
                :logoSrc="src2"
                margin="1"
                :text="value"
                logoBackgroundColor="white"
                logoCornerRadius="2"
              ></vue-qr>
            </div>
  
            <p class="mt-1 scan-qr-message">
              <span style="font-size:small; color:grey"
                >Scan QR code with the Hypersign Mobile App</span
              >
            </p>

            <div class="mb-2 openMobileAppWrapper">
              <a v-if="this.value != ''"  class="btn btn-hypersign text-white " :href="`${this.$config.mobileWalletAddress}:deeplink?url=${this.value}`" >
                <img style="height:40px; float: left;" 
                :src="require('../assets/hypersignSmallLogo.png')"
                class="ml-0 rounded rounded-circle  left"/>
                <div style="font-size: smaller; margin-top: 10px; ">USE MOBILE WALLET</div>
              </a>  
            </div>

            <h6>OR</h6>

            <div class="mb-2 ">
              <a v-if="this.value != ''" class="btn btn-hypersign text-white " href="#"                
                @click.prevent="openWallet()" >
                <img style="height:40px; float: left;" 
                :src="require('../assets/hypersignSmallLogo.png')"
                class="ml-0 rounded rounded-circle  left"/>
                <div style="font-size: smaller; margin-top: 10px;">USE WEB WALLET</div>
              </a>  
            </div>
          </div>

          <span v-if="socketMessage" style="color:grey; font-size:small">{{socketMessage}}</span>
        </div>

        <span style="font-size: medium; color:grey; padding: 10px">
          Get the app on 
          <a href="https://play.google.com/store/apps/details?id=com.hypersign.cordova" target="__blank">Android</a>, 
          <a :href="$config.webWalletAddress" target="__blank">Web</a>
        </span>
      </div>
    </div>

 
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import url, { format } from "url";
import VueQr from "vue-qr";
import notificationMixins from '../mixins/notificationMixins';
import apiClinet from "../mixins/apiClientMixin";
import fetchProjectDataMixin from '../mixins/fetchProjectDataMixin';
import localStorageMixin from '../mixins/localStorageMixin';
import checkTelegramAnnouncemntMixin from '../mixins/checkTelegramAnnChannel';

export default {
  name: "Login",
  components: {
    Loading,
    VueQr,
  },
  data() {
    return {
      src2: require('../assets/icon.png'),
      error: "",
      socketMessage: "",
      active: 0,
      host: location.hostname,
      domain: location.host,
      credentials: {},
      userData: {},
      value: "",
      user: {},
      verifiablePresentation: "",
      fullPage: true,
      isLoading: false,
      connection: null,
        projectDetails: {},
      qrConfig: {
        value: "test",
        imagePath: "/apple-icon-57x57.png",
        filter: "color",
      },
      projectId: localStorage.getItem("projectId")
    };
  },
  created() {
    console.log("Beofer creating websoceket connection");
    let baseUrl = this.$config.studioServer.BASE_URL;
    let websocketUrl = "ws://localhost:3003";

    let parsedUrl = {};
    try {
      parsedUrl = url.parse(baseUrl);
      console.log(parsedUrl);
      websocketUrl =
        parsedUrl.protocol === "https:"
          ? `wss://${parsedUrl.host}`
          : `ws://${parsedUrl.host}`;
    } catch (e) {
      websocketUrl = "ws://localhost:3003";
    }
    if (websocketUrl[websocketUrl.length - 1] == "/") {
      websocketUrl = websocketUrl.substring(0, websocketUrl.length - 1);
    }


    this.isLoading = true;
    var _this = this;

    // take it in the env
    _this.socketMessage = "Connecting to auth server...";
    this.connection = new WebSocket(this.$config.websocketUrl);
    this.connection.onopen = function() {
      _this.socketMessage = "Connected to auth server..."
      console.log("Websocket connection is open");
    };


    this.connection.onmessage = ({ data }) =>  {      
      console.log("Websocket connection messag receieved ", data);
      let messageData = JSON.parse(data);
      console.log(messageData);
      if (messageData.op == "init") {
        _this.isLoading = false;
        console.log(messageData.data);
        _this.value = JSON.stringify(messageData.data);
        _this.socketMessage = null;
      } else if (messageData.op == "end") {
        _this.connection.close();
        const authorizationToken = messageData.data.token;
        console.log(authorizationToken);
        localStorage.setItem("authToken", authorizationToken);


        if (localStorage.getItem("authToken") != null) {
          if (_this.$route.params.nextUrl != null) {
            _this.$router.push(_this.$route.params.nextUrl);
          } else {
           
            let path = "";
            const projectId = localStorage.getItem("projectId");
            console.log(projectId)

            if (projectId) {
              path = "form?projectId=" + projectId;
            } else {
              path = "form";
            }
            
            
            _this.$router.push({
               path: path,
               name:"investor",
               query: {projectId: projectId},
              params: { projectDetails: this.projectDetails },
            });
          }
        }
      }
    };
    this.connection.onerror = function(error) {
      _this.error = true;
      _this.socketMessage = "Error while fetching the QR data :(";
      console.log("Websocket connection error ", error);
    };

    this.fetchProjectData({isAuthTokenAvailable: false});

  },
  mounted() {
    this.clean();
  },

  methods: {
    openWallet() {
      if (this.value != "") {
        window.open(
          `${this.$config.webWalletAddress}/deeplink?url=${this.value}`,
          "popUpWindow",
          `height=800,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes`
        );
      }else{
        console.log("this value is not")
      }
    },


    push(path) {
      this.$router.push(path);
    },
  
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },

    formateDate(d) {
      return new Date(d).toLocaleString();
    },
    
  },
  mixins: [notificationMixins, fetchProjectDataMixin, localStorageMixin, checkTelegramAnnouncemntMixin]
};
</script>
