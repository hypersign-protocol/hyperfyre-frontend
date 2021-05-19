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
  background-color: rgb(58, 58, 58);
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
  background-color: rgb(61, 66, 60);
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
/* .with-hypersign-btn  */
</style>
<template>
  <div class="row vh-100 loginPage">
    <div class="cmp-logo">
      <div>
        <img
          src="https://thumb.tildacdn.com/tild3065-3765-4865-b331-393637653931/-/resize/150x/-/format/webp/hypersign_Yellow.png"
          style="max-width: 150px;"
        />
      </div>
    </div>

    <div
      class="col col-lg-8 d-flex justify-content-center align-items-center border border-1 bg-dark shadow text-left text-white"
    >
      <div>
        <h3>Welcome to HYPERSIGN's Whitelist</h3>
        <p>Instructiosn</p>
        <ol class="px-3">
          <li>Install the hypersign app on your phone</li>
          <li>Follow the steps in the app to register [only needed once]</li>
          <li>After registration scan the QR code on this screen</li>
          <li>Follow on-screen steps to complete Whitelisting</li>
        </ol>

        <p class="mt-5 text-center ">
          Get The Hypersign App
        </p>
        <div class=" d-flex w-75 mx-auto app-links justify-content-around">
          <div>
            <a
              href="https://play.google.com/store/apps/details?id=com.hypersign.cordova"
              target="_blank"
            >
              <img
                :src="require(`../assets/play_store.png`)"
                alt="play-store"
              />
            </a>
          </div>
          <div title="Coming soon">
            <img
              class="w-90"
              :src="require(`../assets/app_store.png`)"
              alt="app-store"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="col col-lg-4 border border-1 bg-white border">
      <div class="d-flex flex-column justify-content-between vh-100 px-3">
        <a
          class="text-right mt-3  text-dark text-reset fw-bold"
          style="font-weight:600"
          target="_blank"
          href="https://t.me/hypersignchain"
          >HELP ?</a
        >
        <div>
          <p class="loginInNow-text">LOG IN NOW</p>
          <div>
            <qrcode-vue :value="value" :size="300" level="H"></qrcode-vue>
          </div>
          <p class="mt-3">Scan QR code with the Hypersign Mobile App</p>
          <h6>OR</h6>
          <p class="text-center">
            <button
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
              <div class="btn-text">Login with Web Wallet</div>
            </button>
          </p>
          <!-- <p class="mt-3">Scanner not working ?</p> -->
        </div>
        <a
          style="font-weight:600"
          class="mb-3 text-dark fw-bolder text-reset"
          href="https://hypersign.id/"
          target="_blank"
          >https://hypersign.id/</a
        >
      </div>
    </div>

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
</template>

<script>
import QrcodeVue from "qrcode.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import url from "url";

export default {
  name: "Login",
  components: {
    QrcodeVue,
    Loading,
  },
  data() {
    return {
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
      console.log(websocketUrl);
    } catch (e) {
      websocketUrl = "ws://localhost:3003";
    }

    this.connection = new WebSocket(websocketUrl);
    this.connection.onopen = function() {
      console.log("Websocket connection is open");
    };

    this.isLoading = true;
    var _this = this;

    this.connection.onmessage = function({ data }) {
      console.log("Websocket connection messag receieved ", data);
      let messageData = JSON.parse(data);
      console.log(messageData);
      if (messageData.op == "init") {
        _this.isLoading = false;
        console.log(messageData.data);
        _this.value = JSON.stringify(messageData.data);
      } else if (messageData.op == "end") {
        _this.connection.close();
        const authorizationToken = messageData.data.token;
        console.log(authorizationToken);
        localStorage.setItem("authToken", authorizationToken);

        if (localStorage.getItem("authToken") != null) {
          if (_this.$route.params.nextUrl != null) {
            _this.$router.push(_this.$route.params.nextUrl);
          } else {
            console.log(_this.$router);
            let path = "";
            const projectId = localStorage.getItem("projectId");
            if (projectId) {
              path = "form?projectId=" + projectId;
            } else {
              path = "form";
            }
            _this.$router.push(path);
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
          `https://hswallet.netlify.app/deeplink?url=${this.value}`,
          "_blank"
        );
      }
    },
    push(path) {
      this.$router.push(path);
    },
    clean() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("credentials");
      localStorage.removeItem("userData");
    },
    notifySuccess(msg) {
      this.$notify({
        group: "foo",
        title: "Information",
        type: "success",
        text: msg,
      });
    },
    notifyErr(msg) {
      this.$notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: msg,
      });
    },
    gotosubpage: (id) => {
      this.$router.push(`${id}`);
    },
  },
};
</script>
