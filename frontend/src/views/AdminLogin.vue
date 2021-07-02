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

.btn-hypersign{
  background-color: #494949;
  border-color: #494949;
  padding: 7px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
  min-width: 300px;
}


.loginContent{
  height: 100%;
width: 22%;
padding-right: 10px;
padding-left: 10px;
padding-top: 20px;
padding-bottom: 10px;
margin: 0 auto;
border-top: 2px solid rgb(120, 120, 243);
}
</style>
<template>
  <!-- <div class="row" style="margin-left: 35%;"> -->
  <div class="" style="justify-content: center; padding-top:3%">
      <b-card no-body class="loginContent">
          <loading
            :active.sync="isLoading"
            :can-cancel="true"
            :is-full-page="fullPage"
          ></loading>
          <h4>ADMIN LOGIN</h4>
          <div class="row" style="margin-top:3%">
            <form class="col-md-12">
              <div class="form-group">
                <vue-qr
                  v-if="value != ''"
                  margin="1"
                  :text="value"
                  :size="200"
                  :logoSrc="src2"
                  logoBackgroundColor="white"
                  logoCornerRadius="2"
                ></vue-qr>
                <label style="font-size:small; margin-top:1%"
                  >Scan QR code using Hypersign Modile App</label
                >
                <div>
                  <p style="font-size:small;"> Don’t have the app yet? <a href="#">Get it now</a></p>
                  <div>
                    <span class="download">
                      <a
                        href="https://testflight.apple.com/join/3o5r4dQQ"
                        target="_blank"
                        ><img
                          src="data:image/svg+xml;base64,PHN2ZyBpZD0iR3JvdXBfMTM3NiIgZGF0YS1uYW1lPSJHcm91cCAxMzc2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjAuNSIgeDI9IjAuNSIgeTI9IjEiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTdjOWZiIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFhNzRlOCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgaWQ9ImJ1dHRvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSI+CiAgICA8ZyBpZD0iaW9zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDApIj4KICAgICAgPHBhdGggaWQ9IlBhdGhfMTIwMSIgZGF0YS1uYW1lPSJQYXRoIDEyMDEiIGQ9Ik04Ljc2LDBIMzEuMjRBOC43Niw4Ljc2LDAsMCwxLDQwLDguNzZWMzEuMjRBOC43Niw4Ljc2LDAsMCwxLDMxLjI0LDQwSDguNzZBOC43Niw4Ljc2LDAsMCwxLDAsMzEuMjRWOC43NkE4Ljc2LDguNzYsMCwwLDEsOC43NiwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIgZmlsbD0idXJsKCNsaW5lYXItZ3JhZGllbnQpIi8+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzEyMDIiIGRhdGEtbmFtZT0iUGF0aCAxMjAyIiBkPSJNNDMuNjM0LDY4LjQzaDBMNDIuMjcxLDcwLjhhMS44MDgsMS44MDgsMCwxLDEtMy4xMzEtMS44MDhsMS4wMDctMS43NDUuMS0uMTY4YTEuNDkyLDEuNDkyLDAsMCwxLDEuNDUxLS42czIuMDA2LjIxOCwyLjE1MSwxLjI2YTEuMjIsMS4yMiwwLDAsMS0uMjExLjY4NlptMTkuNC02LjA1SDU4Ljc2N2EuNjI5LjYyOSwwLDAsMS0uNDY3LS4xOFY2Mi4ybC00LjU2NS03LjkwN2gtLjAwNmwtLjI3NC0uMzkzYy0uNDQ5LS42ODYtMS4xNjEsMS4wNjktMS4xNjEsMS4wNjktLjg1MSwxLjk1Ni4xMjEsNC4xNzkuNDU5LDQuODUxTDU5LjA5MSw3MC44YTEuODA4LDEuODA4LDAsMSwwLDMuMTMxLTEuODA4bC0xLjU4NS0yLjc0NmMtLjAzMS0uMDY3LS4wODQtLjI0Ny4yNDEtLjI0OGgyLjE1NGExLjgwOCwxLjgwOCwwLDAsMCwwLTMuNjE2Wm0tOC4yODMsMi40NThTNTQuOTc2LDY2LDU0LjEsNjZIMzguMzNhMS44MDgsMS44MDgsMCwxLDEsMC0zLjYxNmg0LjA1M2MuNjU0LS4wMzguODEtLjQxNi44MS0uNDE2aDBMNDguNDg3LDUyLjhoMGEuNC40LDAsMCwwLDAtLjM3MUw0Ni43NCw0OS40YTEuODA4LDEuODA4LDAsMCwxLDMuMTMxLTEuOGwuODEsMS40LjgwOS0xLjRhMS44MDgsMS44MDgsMCwxLDEsMy4xMzEsMS44MDhMNDcuMjU5LDYyLjE1OWMtLjAzMi4wNzgtLjA0Mi4yLjIuMjIxaDQuNHYuMDQzYTIuOTU2LDIuOTU2LDAsMCwxLDIuODg5LDIuNDE0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMwLjgxNSAtMzkuMzk3KSIgZmlsbD0iI2ZmZiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg=="
                      /></a>
                    </span>
                    <span class="download">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.superhero.cordova"
                        target="_blank"
                        ><img
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzYuNTAxIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMzYuNTAxIDQwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4MT0iMC45MTUiIHkxPSIwLjA1IiB4Mj0iLTAuMzgzIiB5Mj0iMC43MTkiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBhMGZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC4wMDciIHN0b3AtY29sb3I9IiMwMGExZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjI2IiBzdG9wLWNvbG9yPSIjMDBiZWZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC41MTIiIHN0b3AtY29sb3I9IiMwMGQyZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjc2IiBzdG9wLWNvbG9yPSIjMDBkZmZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwZTNmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50LTIiIHgxPSIxLjA3NiIgeTE9IjAuNSIgeDI9Ii0xLjMwNSIgeTI9IjAuNSIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmUwMDAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjQwOSIgc3RvcC1jb2xvcj0iI2ZmYmQwMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuNzc1IiBzdG9wLWNvbG9yPSJvcmFuZ2UiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5YzAwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQtMyIgeDE9IjAuODYyIiB5MT0iMC4xNzgiIHgyPSItMC41MDEiIHkyPSIxLjk0OCIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjNhNDQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYzMxMTYyIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQtNCIgeDE9Ii0wLjE4OCIgeTE9Ii0wLjU0MiIgeDI9IjAuNDIxIiB5Mj0iMC4yNDkiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzJhMDcxIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC4wNjgiIHN0b3AtY29sb3I9IiMyZGE3NzEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIwLjQ3NiIgc3RvcC1jb2xvcj0iIzE1Y2Y3NCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuODAxIiBzdG9wLWNvbG9yPSIjMDZlNzc1Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwZjA3NiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgaWQ9InBsYXktc3RvcmUtaWNvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDYgLTAuMzIzKSI+CiAgICA8cGF0aCBpZD0iUGF0aF8xMjAzIiBkYXRhLW5hbWU9IlBhdGggMTIwMyIgZD0iTS43MzIsMS4xNTZBMy4wODUsMy4wODUsMCwwLDAsMCwzLjM0VjM3LjcyN2EzLjA3NiwzLjA3NiwwLDAsMCwuNzMyLDIuMTg0bC4xMTguMTEyTDIwLjQzMSwyMC43NjJ2LS40NTRMLjg0OSwxLjA0M2wtLjExOC4xMTNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0wLjIxNSkiIGZpbGw9InVybCgjbGluZWFyLWdyYWRpZW50KSIvPgogICAgPHBhdGggaWQ9IlBhdGhfMTIwNCIgZGF0YS1uYW1lPSJQYXRoIDEyMDQiIGQ9Ik0zNS42MzUsMzIuNjQzLDI5LjExLDI2LjIxOXYtLjQ1NGw2LjUyNy02LjQyMi4xNDkuMDgxLDcuNzMzLDQuMzIyYzIuMjA5LDEuMjM0LDIuMjA5LDMuMjUzLDAsNC40OWwtNy43MzMsNC4zMjFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOC42OCAtNS42NzEpIiBmaWxsPSJ1cmwoI2xpbmVhci1ncmFkaWVudC0yKSIvPgogICAgPHBhdGggaWQ9IlBhdGhfMTIwNSIgZGF0YS1uYW1lPSJQYXRoIDEyMDUiIGQ9Ik0yNy40MTYsMzUuMzg0LDIwLjc0LDI4LjgxNywxLjA0Myw0OC4yYy43MjguNzU5LDEuOTMyLjg1MiwzLjI4NC4xTDI3LjQxNiwzNS4zODQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjMxMSAtOC40OTcpIiBmaWxsPSJ1cmwoI2xpbmVhci1ncmFkaWVudC0zKSIvPgogICAgPHBhdGggaWQ9IlBhdGhfMTIwNiIgZGF0YS1uYW1lPSJQYXRoIDEyMDYiIGQ9Ik0yNy40MTYsMTMuNzU0LDQuMzI3Ljg0NUMyLjk3NS4wODksMS43NzEuMTgzLDEuMDQzLjk0MUwyMC43NCwyMC4zMmw2LjY3Ni02LjU2OFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjMxMSAwKSIgZmlsbD0idXJsKCNsaW5lYXItZ3JhZGllbnQtNCkiLz4KICAgIDxnIGlkPSJHcm91cF85NzEiIGRhdGEtbmFtZT0iR3JvdXAgOTcxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wMDUgMjYuNzQ0KSI+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzEyMDciIGRhdGEtbmFtZT0iUGF0aCAxMjA3IiBkPSJNMjcuMjY4LDM3Ljk3LDQuMzI4LDUwLjc5MmMtMS4yODUuNzE5LTIuNDMuNjcxLTMuMTY2LjAxN2wtLjExOC4xMTYuMTE4LjExMWEyLjY2NywyLjY2NywwLDAsMCwzLjE2Ni0uMDE1TDI3LjQxNywzOC4xMTNsLS4xNDgtLjE0M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjMwNiAtMzcuOTcpIiBvcGFjaXR5PSIwLjIiLz4KICAgICAgPHBhdGggaWQ9IlBhdGhfMTIwOCIgZGF0YS1uYW1lPSJQYXRoIDEyMDgiIGQ9Ik0uNzMyLDU1LjE3N0EzLjA4NSwzLjA4NSwwLDAsMSwwLDUyLjk5M3YuMjI3QTMuMDc2LDMuMDc2LDAsMCwwLC43MzIsNTUuNGwuMTE4LS4xMTYtLjExOC0uMTEyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDUgLTQyLjQ1KSIgb3BhY2l0eT0iMC4xMiIvPgogICAgPC9nPgogICAgPHBhdGggaWQ9IlBhdGhfMTIwOSIgZGF0YS1uYW1lPSJQYXRoIDEyMDkiIGQ9Ik00Ni4yOTIsMzAuODM2LDM4LjQxLDM1LjI0MmwuMTQ5LjE0NSw3LjczMy00LjMyMWEyLjczMiwyLjczMiwwLDAsMCwxLjY1Ny0yLjI0NiwyLjkwNiwyLjkwNiwwLDAsMS0xLjY1NywyLjAxN1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMS40NTMgLTguNDk3KSIgb3BhY2l0eT0iMC4xMiIvPgogICAgPHBhdGggaWQ9IlBhdGhfMTIxMCIgZGF0YS1uYW1lPSJQYXRoIDEyMTAiIGQ9Ik00LjAxNiwxLjA3MywzNC44MzcsMTguM2EyLjksMi45LDAsMCwxLDEuNjU3LDIuMDE4LDIuNzMyLDIuNzMyLDAsMCwwLTEuNjU3LTIuMjQ2TDQuMDE2Ljg0N0MxLjgwOS0uMzg4LDAsLjYzOCwwLDMuMTI2di4yMjdDMCwuODY0LDEuODA3LS4xNjEsNC4wMTYsMS4wNzNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDApIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjI1Ii8+CiAgPC9nPgo8L3N2Zz4K"
                      /></a>
                    </span>
                  </div>
                </div>
              </div>
              

              
                <h5><span>Or</span></h5>
              

              <!-- <p class="text-center">
                <button
                  type="button"
                  class="btn with-hypersign-btn d-flex mx-auto align-items-center btn-sm  text-white rounded rounded-pill"
                  @click="openWallet()"
                >
                  <div>
                    <img
                      style="height:50px"
                      :src="require('../assets/hypersignSmallLogo.png')"
                      class="ml-0 rounded rounded-circle border border-white border-1 p-1"
                    />
                  </div>
                  <div class="btn-text">USE Web Wallet</div>
                </button>
              </p> -->


            <div class="mb-2 ">
              <a v-if="this.value != ''" class="btn btn-hypersign text-white " href="#"                
                @click.prevent="openWallet()" >
                <img style="height:40px; float: left;" 
                :src="require('../assets/hypersignSmallLogo.png')"
                class="ml-0 rounded rounded-circle  left"/>
                <div style="font-size: smaller; margin-top: 10px;">USE WEB WALLET</div>
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
import notificationMixins from '../mixins/notificationMixins';
import localStorageMixin from '../mixins/localStorageMixin';

export default {
  name: "Login",
  components: {
    VueQr,
    Loading,
  },
  data() {
    return {
      src2: require("../assets/icon.png"),
      active: 0,
      username: "",
      password: "",
      host: location.hostname,
      challenge: "dddd",
      domain: location.host,
      credentials: {},
      userData: {},
      value: "",
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
    // console.log("Beofer creating websoceket connection");
    let baseUrl = this.$config.studioServer.BASE_URL;
    let websocketUrl = "ws://localhost:3003";

    let parsedUrl = {};
    try {
      parsedUrl = url.parse(baseUrl);
      // console.log(parsedUrl);
      websocketUrl =
        parsedUrl.protocol === "https:"
          ? `wss://${parsedUrl.host}`
          : `ws://${parsedUrl.host}`;
      // console.log(websocketUrl);
    } catch (e) {
      websocketUrl = "ws://localhost:3003";
    }
    if (websocketUrl[websocketUrl.length - 1] == "/") {
      websocketUrl = websocketUrl.substring(0, websocketUrl.length - 1);
    }
    // console.log(websocketUrl);

    // take it in the env
    this.connection = new WebSocket(this.$config.websocketUrl);
    this.connection.onopen = function() {
      console.log("Websocket connection is open");
    };

    this.isLoading = true;
    var _this = this;

    this.connection.onmessage = function({ data }) {
      // console.log("Websocket connection messag receieved ", data);
      let messageData = JSON.parse(data);
      // console.log(messageData);
      if (messageData.op == "init") {
        _this.isLoading = false;
        // console.log(messageData.data);
        _this.value = JSON.stringify(messageData.data);
      } else if (messageData.op == "end") {
        _this.connection.close();
        const authorizationToken = messageData.data.token;
        // console.log(authorizationToken);
        localStorage.setItem("authToken", authorizationToken);

        if (localStorage.getItem("authToken") != null) {
          if (_this.$route.params.nextUrl != null) {
            _this.$router.push(_this.$route.params.nextUrl);
          } else {
            // console.log(_this.$router);
            window.location.href =
              window.location.origin + "/admin/dashboard";
            // _this.$router.push("dashboard");
          }
        }
      }
    };
    this.connection.onerror = function(error) {
      console.log("Websocket connection error ", error);
    };
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
      }
    },
    push(path) {
      this.$router.push(path);
    },
  
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
  },
  mixins: [notificationMixins, localStorageMixin]
};
</script>
