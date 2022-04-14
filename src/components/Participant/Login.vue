<template>
  <v-card flat color="black" class="text-center">
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
</template>
<script>
import Messages from "../../utils/messages/participants/en";
import url from "url";
export default {
  name: "Login",

  data() {
    return {
      QRRefresh: false,
      value: "",
    };
  },

  mounted() {
    this.initiateWebScoketConnetion();
  },
  methods: {
    async initiateWebScoketConnetion() {
      let baseUrl = this.$config.studioServer.BASE_URL;
      let websocketUrl = "ws://localhost:3003";

      let parsedUrl = {};
      try {
        parsedUrl = url.parse(baseUrl);

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
      _this.socketMessage = Messages.EVENT.LOGIN.SOCKET_INIT;
      this.connection = new WebSocket(this.$config.websocketUrl);
      this.connection.onopen = function () {
        _this.socketMessage = Messages.EVENT.LOGIN.SOCKET_OPEN;
      };

      this.connection.onmessage = ({ data }) => {
        let messageData = JSON.parse(data);
        if (messageData.op == "init") {
          _this.isLoading = false;
          messageData.data["provider"] = "google";
          _this.value = JSON.stringify(messageData.data);
          _this.socketMessage = null;
        } else if (messageData.op == "end") {
          _this.connection.close();
          const authorizationToken = messageData.data.token;

          // console.log("Emitting authentoken event")

          localStorage.setItem("authToken", authorizationToken);
          _this.$root.$emit("AuthTokenUpdateEvent", authorizationToken);
        } else if (messageData.op == "reload") {
          _this.QRRefresh = true;
          _this.connection.close(4001, messageData.data.clientId);
        }
      };

      this.connection.onerror = function (error) {
        console.log(error);
        _this.error = true;
        _this.socketMessage = Messages.EVENT.LOGIN.SOCKET_ERROR;
      };
    },

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
      } else {
        // console.log("this value is not")
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
