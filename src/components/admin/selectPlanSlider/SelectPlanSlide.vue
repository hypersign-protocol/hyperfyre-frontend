<style scoped>
.accordion > .card {
  overflow: inherit !important;
}
.b-sidebar > .b-sidebar-header {
  border: 1px solid #000 !important;
}

.button-theme {
  background-color: #f1b319;
  border-collapse: #f1b319;
  color: black;
  border: 0;
}

.accordion-header-theme {
  background-color: rgba(241, 179, 25, 0.24);
  border: 0;
}

</style>
<template>
  <div>
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
      <div class=" px-3 py-2">
        <div>
          <h4 class="pricing-heading">
            <span v-html="plan.emoji"></span>
            {{ plan.planName }}  [${{plan.price}}]
          </h4>
          <hr/>
          <p>You have chosen the {{plan.planName}} plan <b>${{plan.price}}</b>, upto {{plan.noOfWinners}} winners can be selected in this plan.</p>
          <p>Review all details carefully before making the payment.</p>
        </div>
        <!-- <hr/>
        <div>
         <input type="text" placeholder="HYPR456" /><button>Apply</button>
        </div> -->
                <hr/>
        <div>
            <div class="row" style="margin-top: 2%;">
              <div class="col-md-12">
                <b>Choose your preferred currency</b>
                <b-form-group  v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    id="radio-group-1"
                    v-model="selectedCurrency"
                    :options="options.currency"
                    :aria-describedby="ariaDescribedby"
                    name="radio-options-currency"
                    @change="setDiscount"
                    stacked
                  ></b-form-radio-group>
                </b-form-group>
              </div>
              
            </div>
        </div>
        <hr/>
        <div>
            <div class="row" style="margin-top: 2%;">
              <div class="col-md-12">
                <b>Choose your preferred network</b>
                <b-form-group  v-slot="{ ariaDescribedby1 }">
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
        <hr/>
        <div>
            <div class="row" style="margin-top: 2%;">
              <div class="col-md-6"><b>Subtotal</b></div>
              <div class="col-md-6">$ {{ plan.price }}</div>
            </div>
            <div class="row" style="margin-top: 2%;">
              <div class="col-md-6"><b>Discount</b></div>
              <div class="col-md-6"> - $ {{ discount }}</div>
            </div>
            <!-- <div class="row" style="margin-top: 2%;">
              <div class="col-md-6"><b>Subtotal</b></div>
              <div class="col-md-6"></div>
            </div> -->
        </div>
        
        <hr/>
        <div>
            <div class="row" style="margin-top: 2%;">
              <div class="col-md-6"><b>Grand Total</b></div>
              <div class="col-md-6">$ {{ grandTotal }}</div>
            </div>
        </div>
        <hr v-if="selectedNetwork" />
        <div>
            <b-alert show variant="info" v-if="selectedCurrency=='HID' && selectedNetwork=='ETH'">
              <p>You would need {{(grandTotal/getHidPrice()).toFixed(3)}} HID to make this payment </p>
              Buy {{selectedCurrency}} on 
              <b>
                <a 
                href="https://app.uniswap.org/#/swap?inputCurrency=0xb14ebf566511b9e6002bb286016ab2497b9b9c9d&outputCurrency=ETH"
                target="_blank">
                🦄 UNISWAP
                </a>
              </b> OR
              <b>
                <a 
                href="https://www.gate.io/trade/HID_USDT"
                target="_blank">
                🧧 Gate
                </a>
              </b>
            </b-alert>
            <b-alert show variant="info" v-if="selectedCurrency=='HID' && selectedNetwork=='MATIC'">
              <p>You would need {{(grandTotal/getHidPrice()).toFixed(3)}} HID to make this payment </p>
              Buy {{selectedCurrency}} on 
              <b>
                <a 
                href="https://quickswap.exchange/#/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x87847703d4bb4fcd42db887ffdcb94496e77e3ab"
                target="_blank">
                🐧 QUICKSWAP
                </a>
              </b>.
            </b-alert>
        </div>
        <hr/>
        <div>
            <div class="row" style="margin-top: 2%;">
              <div class="col-md-12">
                <b-button block variant="primary" class="btn-plan popular">Pay ${{grandTotal}}</b-button>
              </div>
            </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import InputDate from '../../participant/ActionInputs/InputDate.vue';
import EventActionConfig from "./components/EventActionConfig.vue";
import GeneralConfig from "./components/GeneralConfig.vue";
import ReferralConfig from "./components/ReferralConfig.vue";
export default {
  name: "CreateProjectSlide",
  components: {
    GeneralConfig,
    EventActionConfig,
    ReferralConfig,
    InputDate
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
   grandTotal () {
     return this.plan.price - this.discount
   }
   
  },
  
  data() {
    return {
      /// TODO: Need to do it in a neat way
      // Use api https://localhost:6006/api/v1/actions
      // it returns: 
      // {"actionTypes":["INPUT_TEXT","INPUT_NUMBER","TWITTER_FOLLOW","TWITTER_RETWEET","TELEGRAM_JOIN","DISCORD_JOIN","BLOCKCHAIN_ETH","BLOCKCHAIN_TEZ","HYPERSIGN_AUTH"],"length":9}
      subTotal:0,
      discount:0,
      selectedCurrency:'',
      selectedNetwork:'',
      "marketPairs": [],
      options: {
        currency: [
          { html: "$HID ( flat 30% discount on sub total) <a target='_blank' href='https://coinmarketcap.com/currencies/hypersign-identity/markets/'> <i class='fas fa-exclamation-circle'></i></a>", 
            value: 'HID', 
            disabled: false  
          },
          { text: "$USDT", value: 'USDT', disabled: false  },
          { text: "$USDC", value: 'USDC', disabled: false  },
          { text: "$DAI", value: 'DAI', disabled: false  },
        ],
        network: [
          { text: "Ethereum", value: 'ETH', disabled: false  },
          { text: "Polygon", value: 'MATIC', disabled: false  },
          { text: "Harmony (Coming Soon..)", value: 'ONE', disabled: true  },
          { text: "Binance Smart Chain (Coming Soon..)", value: 'BSC', disabled: true  },
        ],
      },
    };
  },
  created() {
    this.subTotal = this.plan.price
    this.fetchTokenPriceCMC();
    console.log("Created-Fired")
  },
  methods: {
    setDiscount (__arg) {
      if(__arg){
        if (__arg=='HID') {
          this.discount = (this.plan.price * 30 )/100
        } else {
          this.discount = 0
        }
      }
    },
    getHidPrice () {
      let arr = this.marketPairs
      const { length } = this.marketPairs;

      return arr.reduce((acc, val) => {
          return acc + (val.price/length);
      }, 0);
    },
    async fetchTokenPriceCMC() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

        const url = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?slug=hypersign-identity&start=1&limit=100&category";
        const headers = {
          // Authorization: `Bearer ${this.authToken}`,
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
  },
};
</script>
