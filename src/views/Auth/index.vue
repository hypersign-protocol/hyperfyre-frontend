<template>
  <v-row no-gutters>
    <v-col cols="12" md="6" class="white--text text-center">
      <div class="position-relative login__wrap ma-auto text-center">
        <div class="d-flex align-center justify-center mb-70">
          <v-img
            max-width="180"
            lazy-src="@/assets/images/logo.png"
            src="@/assets/images/logo.png"
          ></v-img>
        </div>
        <p class="white--text font-weight--bold font-36 line-h-40">
          Welcome to our community
        </p>
      </div>
    </v-col>
    <v-col cols="12" md="6" class="white--text text-center">
      <div class="position-relative login__wrap ma-auto max-width-500">
        <v-card flat color="black" class="refer__wrap">
          <v-card-title
            class="white--text flex-column justify-center mt-8 border-b-1"
          >
            <h2 class="font-24 line-h-31">Login</h2>
          </v-card-title>
          <v-card-text class="px-10 py-8">
            <div v-if="QRRefresh" class="QRRefresh">
              <p class="mt-4 mb-2 black--text font-14 line-h-17">
                Session expired.
                <a
                  @click="reloadQR"
                  class="text-decoration-underline white--text font-14 line-h-17"
                  >Click to reload.</a
                >
              </p>
            </div>
            <template v-else>
              <v-form ref="form" lazy-validation>
                <vue-qr
                  v-if="value != ''"
                  margin="1"
                  :text="value"
                  :size="200"
                  :logoSrc="src2"
                  logoBackgroundColor="white"
                  logoCornerRadius="2"
                ></vue-qr>
                <p class="mt-4 mb-2 black--text font-14 line-h-17">
                  Scan QR code using Hypersign Mobile App
                </p>
                <p class="black--text font-14 line-h-17">
                  Get the app on
                  <a
                    class="white--text"
                    href="https://play.google.com/store/apps/details?id=com.hypersign.cordova"
                    target="__blank"
                    >Android</a
                  >
                  or
                  <a class="white--text" href="">Web</a>
                </p>
              </v-form>
              <v-divider></v-divider>
              <p class="mt-4 mb-2 black--text font-14 line-h-17">OR</p>
              <v-btn
                v-if="this.value != ''"
                :ripple="false"
                color="primary"
                class="background-theme gradient width-150 height-35 letter-s-0 ma-auto border-r-2 text-capitalize font-16 line-h-19 font-weight-bold white--text"
                depressed
                rounded
                x-large
                @click.prevent="openWallet()"
              >
                Click To Login
              </v-btn>
            </template>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import VueQr from "vue-qr";
import notificationMixins from "../../mixins/notificationMixins";
import localStorageMixin from "../../mixins/localStorageMixin";
import url from "url";
export default {
  name: "Login",
  components: {
    VueQr,
  },
  mixins: [notificationMixins, localStorageMixin],
  data() {
    return {
      walletWindow: null,
      QRRefresh: false,
      src2: require("../../assets/images/qr-icon.png"),
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
    localStorage.clear();
    // console.log("Beofer creating websoceket connection");
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
      // console.log(websocketUrl);
    } catch (e) {
      websocketUrl = "ws://localhost:3003";
    }
    if (websocketUrl[websocketUrl.length - 1] == "/") {
      websocketUrl = websocketUrl.substring(0, websocketUrl.length - 1);
    }
    console.log(websocketUrl);

    // take it in the env
    this.connection = new WebSocket(this.$config.websocketUrl);
    this.connection.onopen = function () {
      console.log("Socket connection is open");
    };

    this.isLoading = true;
    var _this = this;

    this.connection.onmessage = function ({ data }) {
      console.log(data);
      // console.log("Websocket connection messag receieved ", data);
      let messageData = JSON.parse(data);
      // console.log(messageData);
      if (messageData.op == "init") {
        _this.isLoading = false;
        /// Sending provider from here........
        messageData.data["provider"] = "google";
        _this.value = JSON.stringify(messageData.data);
        console.log(_this.value);
      } else if (messageData.op == "end") {
        _this.connection.close();
        const authorizationToken = messageData.data.token;
        // console.log(authorizationToken);
        localStorage.setItem("authToken", authorizationToken);

        if (localStorage.getItem("authToken") != null) {
          if (this.walletWindow) {
            this.walletWindow.close();
          }
          if (_this.$route.params.nextUrl != null) {
            _this.$router.push(_this.$route.params.nextUrl);
          } else {
            // console.log(_this.$router);
            window.location.href = window.location.origin + "/overview";
            // _this.$router.push("dashboard");
          }
        }
      } else if (messageData.op == "reload") {
        // console.log("Timeout for clientId: " + messageData.data.clientId)
        _this.QRRefresh = true;
        _this.connection.close(4001, messageData.data.clientId);
      }
    };
  },
  mounted() {
    this.clean();
  },
  methods: {
    reloadQR() {
      window.location.reload();
    },
    openWallet() {
      if (this.value != "") {
        this.walletWindow = window.open(
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
};
</script>
