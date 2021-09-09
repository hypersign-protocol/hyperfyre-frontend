<template>
  <div class="logincontent">
    <h4>Login Component</h4>
    <p>
      Login With Hypersign
      <div v-if="QRRefresh" class="QRRefresh">
        <i @click="reloadQR" class="fas fa-redo" style="font-size: xx-large; color: gray;"></i>
        <p>
          <label style="font-size:small; color:grey; margin-top:1%">
            Session expired. Click to reload.
          </label>
        </p>
      </div>

      <a
        v-else-if="value && value != ''"
        class="btn btn-hypersign text-white "
        href="#"
        :style="
          `background-color: ${themeColor}; color: ${fontColor} !important; border-color:${fontColor}`
        "
        @click.prevent="openWallet()"
      >
        <div style="font-size: smaller;">USE WEB WALLET</div>
      </a>      
    </p>
  </div>
</template>

<script>
export default {
  props: {
    fontColor: String,
    themeColor: String,
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
    _this.socketMessage = "Connecting to auth server...";
    this.connection = new WebSocket(this.$config.websocketUrl);
    this.connection.onopen = function() {
      _this.socketMessage = "Connected to auth server...";
    };

    this.connection.onmessage = ({ data }) => {
      let messageData = JSON.parse(data);
      if (messageData.op == "init") {
        _this.isLoading = false;
        _this.value = JSON.stringify(messageData.data);
        _this.socketMessage = null;
      } else if (messageData.op == "end") {
        _this.connection.close();
        const authorizationToken = messageData.data.token;

        localStorage.setItem("authToken", authorizationToken);

        this.$emit("AuthDataReceieved", authorizationToken);
      } else if (messageData.op == "reload") {
        _this.QRRefresh = true;
        _this.connection.close(4001, messageData.data.clientId);
      }
    };

    this.connection.onerror = function(error) {
      _this.error = true;
      _this.socketMessage = "Error while fetching the QR data :(";
    };
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
      } else {
        // console.log("this value is not")
      }
    },
  },
};
</script>

<style scoped>
.logincontent {
  margin-top: 20px;
  padding: 2px;
  min-width: 500px;
  height: 500px;
  background: rgb(241, 212, 212);
  border-radius: 20px;
}
</style>
