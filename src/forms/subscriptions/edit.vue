<template>
  <v-card flat color="bg-blue-100" class="border-r-0 pa-10">
    <v-card-title
      class="pa-0 white--text text-left d-flex align-center justify-space-between"
    >
      <h2
        class="font-24 line-h-31 color-yellow-100 text-left font-weight--medium font"
      >
        <span v-html="data.emoji"></span>
        {{ data.planName }} [${{ data.price }}]
      </h2>
      <v-icon
        color="white"
        size="25"
        @click="$store.commit('rightSlider/RESET_SLIDER')"
        >mdi-close</v-icon
      >
    </v-card-title>
    <v-card-text class="white--text px-0">
      <v-divider class="bg-white-200 my-20"></v-divider>
      <p>
        You have chosen the {{ data.planName }} plan
        <b class="color-yellow-100">${{ data.price }}</b
        >, upto {{ data.noOfWinners }} winners can be selected in this plan.
      </p>
      <p class="pb-0">
        Review all details carefully before making the payment.
      </p>
      <v-divider class="bg-white-200 my-20"></v-divider>
      <div>
        <label
          class="font-14 line-h-17 color-yellow-100 font-weight--medium mb-2"
          >Choose your preferred currency</label
        >
        <v-radio-group v-model="selectedCurrency">
          <template v-for="(item, index) in options.currency">
            <v-radio
              color="white"
              dark
              :value="item.value"
              :disabled="item.disabled"
              :key="index"
              @change="setDiscount(item)"
            >
              <template slot="label">
                <span
                  class="white--text font-12 line-h-17 font-weight-regular mr-1"
                  v-html="item.text"
                ></span>
                <v-btn
                  icon
                  :ripple="false"
                  v-if="item.value === 'HID'"
                  target="_blank"
                  :href="HIDURL"
                >
                  <v-icon color="white" size="18">mdil-information</v-icon>
                </v-btn>
              </template>
            </v-radio>
          </template>
        </v-radio-group>
      </div>
      <v-divider class="bg-white-200 my-2"></v-divider>
      <div>
        <label
          class="font-14 line-h-17 color-yellow-100 font-weight--medium mb-2"
          >Choose your preferred network</label
        >
        <v-radio-group v-model="selectedNetwork">
          <template v-for="(item, index) in options.network">
            <v-radio
              color="white"
              dark
              :value="item.value"
              :disabled="item.disabled"
              :key="index"
            >
              <template slot="label">
                <span
                  class="white--text font-12 line-h-17 font-weight-regular"
                  v-html="item.text"
                ></span>
              </template>
            </v-radio>
          </template>
        </v-radio-group>
      </div>
      <v-divider class="bg-white-200 my-2"></v-divider>
      <div class="d-flex align-center justify-space-between">
        <p class="color-yellow-100 font-16 line-h-19 font-weight--medium">
          Subtotal
        </p>
        <p class="color-yellow-100 font-16 line-h-19 font-weight--medium">
          $ {{ data.price }}
        </p>
      </div>
      <div class="d-flex align-center justify-space-between">
        <p class="color-yellow-100 font-16 line-h-19 font-weight--medium">
          Discount
        </p>
        <p class="color-yellow-100 font-16 line-h-19 font-weight--medium">
          $ {{ discount }}
        </p>
      </div>
      <div class="d-flex align-center justify-space-between">
        <p class="color-yellow-100 font-16 line-h-19 font-weight--medium">
          Grand Total
        </p>
        <p class="color-yellow-100 font-16 line-h-19 font-weight--medium">
          $ {{ grandTotal }}
        </p>
      </div>
      <v-divider class="bg-white-200 my-4"></v-divider>
      <div
        class="bg-blue-200 pa-4 border-r-8"
        v-if="selectedCurrency == 'HID' && selectedNetwork == 'ETH'"
      >
        <p class="font-14 line-h-17 white--text font-weight--regular">
          You would need {{ (grandTotal / getHidPrice()).toFixed(3) }} HID to
          make this payment
        </p>
        Buy {{ selectedCurrency }} on
        <b>
          <a
            class="font-14 line-h-17 color-yellow-100 font-weight--semibold"
            href="https://app.uniswap.org/#/swap?inputCurrency=0xb14ebf566511b9e6002bb286016ab2497b9b9c9d&outputCurrency=ETH"
            target="_blank"
          >
            🦄 UNISWAP
          </a>
        </b>
        OR
        <b>
          <a
            class="font-14 line-h-17 color-yellow-100 font-weight--semibold"
            href="https://www.gate.io/trade/HID_USDT"
            target="_blank"
          >
            🧧 Gate
          </a>
        </b>
      </div>
      <v-divider
        class="bg-white-200 my-4"
        v-if="selectedCurrency == 'HID' && selectedNetwork == 'ETH'"
      ></v-divider>
      <div
        class="bg-blue-200 pa-4 border-r-8"
        v-if="selectedCurrency == 'HID' && selectedNetwork == 'MATIC'"
      >
        <p class="font-14 line-h-17 white--text font-weight--regular">
          You would need {{ (grandTotal / getHidPrice()).toFixed(3) }} HID to
          make this payment
        </p>
        Buy {{ selectedCurrency }} on
        <b>
          <a
            class="font-14 line-h-17 color-yellow-100 font-weight--semibold"
            href="https://quickswap.exchange/#/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x87847703d4bb4fcd42db887ffdcb94496e77e3ab"
            target="_blank"
          >
            🐧 QUICKSWAP
          </a> </b
        >.
      </div>
      <v-divider
        class="bg-white-200 my-4"
        v-if="selectedCurrency == 'HID' && selectedNetwork == 'MATIC'"
      ></v-divider>
      <div class="text-center">
        <v-btn
          @click="payment"
          outlined
          depressed
          :elavation="0"
          class="btn-primary-outline bg-primary-100 text-center letter-s-0 mt-19 height-54 border-r-8 px-86 white--text text-capitalize font-16 line-h-19 font-weight--bold"
          >Pay ${{ grandTotal }}</v-btn
        >
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import Messages from "@/utils/messages/admin/en";
export default {
  name: "edit",
  data() {
    return {
      HIDURL:
        "https://coinmarketcap.com/currencies/hypersign-identity/markets/",
      authToken: localStorage.getItem("authToken"),
      marketPairs: [],
      subTotal: 0,
      discount: 0,
      selectedCurrency: null,
      selectedNetwork: null,
      options: {
        currency: [
          {
            text: "$HID ( flat 30% discount on sub total)",
            value: "HID",
            disabled: false,
          },
          { text: "$MATIC", value: "MATIC", disabled: false },
          { text: "$ETH", value: "ETH", disabled: false },
          { text: "$BNB", value: "BNB", disabled: false },
          { text: "$USDT", value: "USDT", disabled: false },
          { text: "$USDC", value: "USDC", disabled: false },
          { text: "$DAI", value: "DAI", disabled: true },
        ],
        network: [
          { text: "Ethereum", value: "ETH", disabled: false },
          { text: "Polygon", value: "MATIC", disabled: false },
          { text: "Binance Smart Chain", value: "BSC", disabled: false },
          { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
        ],
      },
    };
  },
  props: {
    data: {
      required: true,
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    grandTotal() {
      return this.calculateGrandtotal();
    },
  },
  created() {
    this.fetchTokenPriceCMC();
  },
  methods: {
    calculateGrandtotal() {
      this.data.grandTotal = this.data.price - this.discount;
      return this.data.grandTotal;
    },
    setDiscount(item) {
      if (item.value) {
        if (item.value === "HID") {
          this.selectedNetwork = "";
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: false },
            { text: "Polygon", value: "MATIC", disabled: false },
            { text: "Binance Smart Chain", value: "BSC", disabled: true },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];

          console.log((this.data.price * 30) / 100);
          this.discount = (this.data.price * 30) / 100;
        } else {
          this.discount = 0;
        }
        if (item.value === "MATIC") {
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: true },
            { text: "Polygon", value: "MATIC", disabled: false },
            { text: "Binance Smart Chain", value: "BSC", disabled: true },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];
          this.selectedNetwork = "MATIC";
        }
        if (item.value === "ETH") {
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: false },
            { text: "Polygon", value: "MATIC", disabled: true },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
            { text: "Binance Smart Chain", value: "BSC", disabled: true },
          ];
          this.selectedNetwork = "ETH";
        }
        if (item.value === "BNB") {
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: true },
            { text: "Polygon", value: "MATIC", disabled: true },
            { text: "Binance Smart Chain ", value: "BSC", disabled: false },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];
          this.selectedNetwork = "BSC";
        }
        if (item.value === "USDT") {
          this.selectedNetwork = "";
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: false },
            { text: "Polygon", value: "MATIC", disabled: false },
            { text: "Binance Smart Chain ", value: "BSC", disabled: false },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];
          //this.selectedNetwork = "ETH";
        }
        if (item.value === "USDC") {
          this.selectedNetwork = "";
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: false },
            { text: "Polygon", value: "MATIC", disabled: false },
            { text: "Binance Smart Chain ", value: "BSC", disabled: false },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];
          // this.selectedNetwork = "ETH";
        }
      }
    },
    async fetchTokenPriceCMC() {
      try {
        this.isLoading = true;
        const url =
          "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?slug=hypersign-identity&start=1&limit=100&category";
        const headers = {
          // Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: resp.statusText,
          });
        }
        const json = await resp.json();
        this.marketPairs = json["data"]["marketPairs"];
      } catch (e) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: e.message,
        });
      } finally {
        this.isLoading = false;
      }
    },
    getHidPrice() {
      let arr = this.marketPairs;
      const { length } = this.marketPairs;

      return arr.reduce((acc, val) => {
        return acc + val.price / length;
      }, 0);
    },

    async payment() {
      if (!(this.selectedCurrency == "" || this.selectedNetwork == "")) {
        var planbody = {};
        this.data.selectedCurrency = this.selectedCurrency;
        this.data.selectedNetwork = this.selectedNetwork;
        this.data.coupon_code = "Dummy30";
        planbody = Object.assign(planbody, this.data);

        var planId = this.data._id;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            planId,
            planbody,
          }),
          headers,
        });
        const json = await resp.json();
        if (json) {
          if (!resp.ok) {
            this.$store.dispatch("snackbar/SHOW", {
              type: "error",
              message: json,
            });
          } else {
            window.location.replace(json.payment.quick_Pay);
          }
        } else {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: "Error while subscritption",
          });
        }
      } else {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.SUBSCRIPTIONS.SELECT_CURRENCY_AND_NETWORK,
        });
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
