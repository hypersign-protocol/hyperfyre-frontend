<style scoped>
.accordion > .card {
  overflow: inherit !important;
}
.b-sidebar > .b-sidebar-header {
  border: 1px solid #000 !important;
}

.button-theme {
  background-color: var(--button-bg-color);
  border-collapse:  var(--button-bg-color);
  color: var(--button-text-color);
  border: 0;
}

.accordion-header-theme {
  background-color: var(--header-bg-color);
  border: 0;
}
</style>
<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <b-sidebar
      backdrop
      width="50%"
      id="sidebar-right"
      :title="isProjectEditing ? 'Edit Plan' : 'Select Plan'"
      class="sidebarContainer background-transparent"
      right
      shadow
      no-close-on-backdrop
      backdrop-variant="dark"
    >
      <div class="px-3 py-2">
        <div>
          <h4 class="pricing-heading">
            <span v-html="plan.emoji"></span>
            {{ plan.planName }} [${{ plan.price }}]
          </h4>
          <hr />
          <p>
            You have chosen the {{ plan.planName }} plan <b>${{ plan.price }}</b
            >, upto {{ plan.noOfWinners }} winners can be selected in this plan.
          </p>
          <p>Review all details carefully before making the payment.</p>
        </div>
        <!-- <hr/>
        <div>
         <input type="text" placeholder="HYPR456" /><button>Apply</button>
        </div> -->
        <hr />
        <div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-12">
              <b>Choose your preferred currency</b>
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  id="radio-group-1"
                  v-model="selectedCurrency"
                  :options="options.currency"
                  :aria-describedby="ariaDescribedby"
                  name="radio-options-currency"
                  @change="setDiscount(selectedCurrency)"
                  stacked
                ></b-form-radio-group>
              </b-form-group>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-12">
              <b>Choose your preferred network</b>
              <b-form-group v-slot="{ ariaDescribedby1 }">
                <b-form-radio-group
                  id="radio-group-2"
                  v-model="selectedNetwork"
                  :options="options.network"
                  :aria-describedby="ariaDescribedby1"
                  name="radio-options-network"
                  stacked
                ></b-form-radio-group>
              </b-form-group>
            </div>
          </div>
        </div>
        <hr v-if="showCoupon===true"/>
      <div style="display:flex" v-if="showCoupon===true">
        <div class="col-lg-6 col-md-9 px-0">
            <input type="text" class="form-control w-100"
            placeholder="Enter Coupon Code"
            @keydown="handleInput($event)"
            v-model="coupon">
        </div>
          <div class="col-lg-4 col-md-3 " style="display:block">
            <!-- <button type="button" class="btn btn-outline-primary button-theme"
              :style="buttonThemeCss"
              @click="applyCoupon"
              >Apply</button> -->
              <hf-buttons
              name="Apply"
              customClass="btn btn-outline-primary button-theme"
              @executeAction="applyCoupon()"
              ></hf-buttons>
          </div>
          </div>
        <hr />
        <div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-6"><b>Subtotal</b></div>
            <div class="col-md-6">$ {{ plan.price }}</div>
          </div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-6"><b>Discount</b></div>
            <div class="col-md-6">$ {{ discount }}</div>
          </div>
          <div class="row" style="margin-top: 2%" v-if="showCoupon===true">
            <div class="col-md-6"><b>Coupon Discount</b></div>
            <div class="col-md-6">$ {{ couponDiscount }}</div>
          </div>
          <!-- <div class="row" style="margin-top: 2%;">
              <div class="col-md-6"><b>Subtotal</b></div>
              <div class="col-md-6"></div>
            </div> -->
        </div>

        <hr />
        <div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-6"><b>Grand Total</b></div>
            <div class="col-md-6">$ {{ grandTotal }}</div>
          </div>
        </div>
        <hr />
        <div>
          <b-alert
            show
            variant="info"
            v-if="selectedCurrency == 'HID' && selectedNetwork == 'ETH'"
          >
            <p>
              You would need {{ (grandTotal / getHidPrice()).toFixed(3) }} HID
              to make this payment
            </p>
            Buy {{ selectedCurrency }} on
            <b>
              <a
                href="https://app.uniswap.org/#/swap?inputCurrency=0xb14ebf566511b9e6002bb286016ab2497b9b9c9d&outputCurrency=ETH"
                target="_blank"
              >
                🦄 UNISWAP
              </a>
            </b>
            OR
            <b>
              <a href="https://www.gate.io/trade/HID_USDT" target="_blank">
                🧧 Gate
              </a>
            </b>
          </b-alert>
          <b-alert
            show
            variant="info"
            v-if="selectedCurrency == 'HID' && selectedNetwork == 'MATIC'"
          >
            <p>
              You would need {{ (grandTotal / getHidPrice()).toFixed(3) }} HID
              to make this payment
            </p>
            Buy {{ selectedCurrency }} on
            <b>
              <a
                href="https://quickswap.exchange/#/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x87847703d4bb4fcd42db887ffdcb94496e77e3ab"
                target="_blank"
              >
                🐧 QUICKSWAP
              </a> </b
            >.
          </b-alert>
        </div>
        <div>
          <div class="row" style="margin-top: 2%">
            <div class="col-md-12">
              <!-- <b-button
                block
                variant="primary"
                class="btn-plan popular"
                :style="buttonThemeCss"
                @click="payment"
                >Pay ${{ grandTotal }}</b-button
              > -->
              <hf-buttons
              :name="`Pay $`+ grandTotal"               
              customClass="btn btn-outline-dark btn-plan popular"
              @executeAction="payment()"
              ></hf-buttons>
            </div>
          </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import config from "../../../config";
import InputDate from "../../participant/ActionInputs/InputDate.vue";
import EventActionConfig from "./components/EventActionConfig.vue";
import GeneralConfig from "./components/GeneralConfig.vue";
import ReferralConfig from "./components/ReferralConfig.vue";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/admin/en";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import HfButtons from "../../../components/elements/HfButtons.vue";
export default {
  name: "CreateProjectSlide",
  components: {
    GeneralConfig,
    EventActionConfig,
    ReferralConfig,
    InputDate,
    Loading,
    HfButtons
  },

  props: {
    plan: {
      type: Object,
    },
    themeColor: {
      type: String,
    },
    fontColor: {
      type: String,
    },
    themeColorDefault: {
      type: String,
    },
    fontColorDefault: {
      type: String,
    },
    saveProject: {
      type: Function,
    },

    isProjectEditing: {
      type: Boolean,
    },
  },

  computed: {
    // a computed getter
      buttonThemeCss() {
      return {
        '--button-bg-color': config.app.buttonBgColor,
        '--button-text-color':config.app.buttonTextColor
      }
     },
      headerThemeCss(){
    return{
      '--header-bg-color': config.app.headerBGColor,
      '--header-text-color':config.app.headerTextColor
      }
  },
  couponDiscount(){
  return  this.couponDiscount = (this.plan.price * this.fetchedCouponDiscount)/100
    // this.discount = (this.plan.price * 30) / 100;
  },
    grandTotal() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      
      let total = this.plan.price - this.discount;
      if(this.selectedCurrency !=="" && this.selectedNetwork !==""){
        this.showCoupon = true;
        this.plan.grandTotal = total - this.couponDiscount;
       
      }
      else{

        this.plan.grandTotal = total;
        
      }
      return this.plan.grandTotal
    },
  },
  data() {
    return {
      /// TODO: Need to do it in a neat way
      // Use api https://localhost:6006/api/v1/actions
      // it returns:
      // {"actionTypes":["INPUT_TEXT","INPUT_NUMBER","TWITTER_FOLLOW","TWITTER_RETWEET","TELEGRAM_JOIN","DISCORD_JOIN","BLOCKCHAIN_ETH","BLOCKCHAIN_TEZ","HYPERSIGN_AUTH"],"length":9}
      authToken: localStorage.getItem("authToken"),
      showCoupon:false,
      subTotal: 0,
      discount: 0,
      couponDiscount: 0,
      fetchedCouponDiscount:0,
      selectedCurrency: "",
      selectedNetwork: "",
      marketPairs: [],
      coupon:"",
      coupons:[],
      applied:false,
      isLoading:false,
      fullPage: true,
      options: {
        currency: [
          {
            html: "$HID (flat 30% discount on sub total) <a target='_blank' href='https://coinmarketcap.com/currencies/hypersign-identity/markets/'> <i class='fas fa-exclamation-circle'></i></a>",
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
  created() {
    this.$root.$on("resetPlanSlide", () => {
      this.resetAllValues();
    });
    this.subTotal = this.plan.price;
    this.fetchTokenPriceCMC();
  },
  methods: {
    handleInput(e){
      if (e.key === "Backspace" || e.key === "Delete") {
        this.applied = false;
        this.couponDiscount=0;
        this.coupons = []
      }
      },
   async applyCoupon(){
  
     try{
       if(this.selectedCurrency !== "" && this.selectedNetwork !== "")
       {
         this.applied = true;
      if(!this.coupon){
          throw new Error('Enter Coupon and Apply')
        }   
       if(!this.coupons.includes(this.coupon)){
         this.grandTotal
     this.isLoading = true;
      const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription/coupon/verify`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        let body={
          coupon:this.coupon
        }
        const resp = await fetch(url, {
          method: "POST",
          body:JSON.stringify(body),
          headers
        });
        const json = await resp.json();
        this.fetchedCouponDiscount = json;
        if (this.fetchedCouponDiscount) {
          if (!resp.ok) {
            this.applied = false;
            return this.notifyErr(json);
          } else {
            this.coupons.push(this.coupon)
            this.couponDiscount = (this.plan.grandTotal * this.fetchedCouponDiscount) / 100;
            return this.notifySuccess("Coupon Applied");
          }
        } else {
          throw new Error("Error while applying coupon code");
        }
       }
       else{
         return this.notifyErr("coupon code already applied")
       }
       }
       else{
         return this.notifyErr(Messages.SUBSCRIPTIONS.SELECT_CURRENCY_AND_NETWORK)
       }
     }catch(e){
       return this.notifyErr(e.message)
     }
     finally{
       this.isLoading = false
     }
    },
    resetAllValues() {
      this.coupons = [];
      this.showCoupon = false;
      this.discount = 0;
      this.couponDiscount = 0;
      this.coupon = ""
      this.selectedCurrency = "";
      this.selectedNetwork = "";
      this.options.network = [
        { text: "Ethereum", value: "ETH", disabled: false },
        { text: "Polygon", value: "MATIC", disabled: false },
        {text: "Binance Smart Chain",value: "BSC",disabled: false},
        { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
      ];
    },
    resetAllPayment(){
      this.coupon = "";
      this.discount = 0;
      this.couponDiscount = 0;
      this.coupons = []
    },
    setDiscount(__arg) {
      if (__arg) {
        if (__arg == "HID") { 
          this.resetAllPayment();
          if(this.selectedNetwork==="BSC"){
          this.selectedNetwork = "";
          }
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: false },
            { text: "Polygon", value: "MATIC", disabled: false },
            {text: "Binance Smart Chain",value: "BSC",disabled: true},
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];
          this.plan.grandTotal = 0;
          this.discount = (this.plan.price * 30) / 100;
        } else {
          this.discount = 0;
        }
        if (__arg == "MATIC") {
          this.resetAllPayment();
          // this.couponDiscount = (this.plan.price * this.fetchedCouponDiscount) / 100;
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: true },
            { text: "Polygon", value: "MATIC", disabled: false },
            { text: "Binance Smart Chain",value: "BSC",disabled: true,},
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];
          this.selectedNetwork = "MATIC";
          
        }
        if (__arg == "ETH") {
          this.resetAllPayment();
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: false },
            { text: "Polygon", value: "MATIC", disabled: true },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
            { text: "Binance Smart Chain",value: "BSC",disabled: true,},
          ];
          this.selectedNetwork = "ETH";
        }
        if (__arg == "BNB") {
          this.resetAllPayment();
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: true },
            { text: "Polygon", value: "MATIC", disabled: true },
            { text: "Binance Smart Chain ", value: "BSC", disabled: false },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];
          this.selectedNetwork = "BSC";
        }
         if (__arg == "USDT") {
          this.resetAllPayment();
          this.options.network = [
            { text: "Ethereum", value: "ETH", disabled: false },
            { text: "Polygon", value: "MATIC", disabled: false },
            { text: "Binance Smart Chain ", value: "BSC", disabled: false },
            { text: "Harmony (Coming Soon..)", value: "ONE", disabled: true },
          ];
          //this.selectedNetwork = "ETH";
        }
         if (__arg == "USDC") {
          this.resetAllPayment();
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
    getHidPrice() {
      let arr = this.marketPairs;
      const { length } = this.marketPairs;

      return arr.reduce((acc, val) => {
        return acc + val.price / length;
      }, 0);
    },
    async fetchTokenPriceCMC() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription/price?provider=coinmarket`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();
        this.marketPairs = json["data"]["marketPairs"];
        // const usage = json["usage"]

        // localStorage.setItem("subscriptions", JSON.stringify(json));
        // this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async payment() {
      if (!(this.selectedCurrency == "" || this.selectedNetwork == "")) {
        var planbody = {};
        this.plan.selectedCurrency = this.selectedCurrency;
        this.plan.selectedNetwork = this.selectedNetwork;
        if(this.applied===true){
          this.plan.coupon_name =  this.coupon;
        }
        this.plan.coupon_code = "Dummy30";
        planbody = Object.assign(planbody, this.plan);

        //{
        //   "blockchainSupport":this.plan.blockchainSupport,
        //   "description":this.plan.description,
        //   "emoji":this.plan.emoji,
        //   "grandTotal":this.plan.grandTotal,
        //   "noOfRepeatitiveActions":this.plan.noOfRepeatitiveActions,
        //   "noOfWinners":this.plan.noOfWinners,
        //   "otherFeatures":this.plan.otherFeatures,
        //   "planName":this.plan.planName,
        //   "price":this.plan.price,
        //   "totalNoOfRequests":this.plan.totalNoOfRequests,
        //   "visible":this.plan.visible,
        //   "__v":this.plan.

        // }

        var planId = this.plan._id;
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
            return this.notifyErr(json);
          } else {
            const path=json.payment.orderId
            const paymentUrl=`${this.$config.moopay.payment_url}${path}`
            window.location.replace(paymentUrl)
          }
        } else {
          throw new Error("Error while subscritption");
        }

        //this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
      } else {
        this.notifyErr(Messages.SUBSCRIPTIONS.SELECT_CURRENCY_AND_NETWORK);
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
