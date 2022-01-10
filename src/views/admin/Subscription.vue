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
  float: right;
}

.card-header {
  background: aliceblue;
  padding: 0px;
}

.sm-tiles {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda71c;
  color: #888b8f;
}

.sm-tiles:hover {
  float: left;
  padding: 5px;
  border: 1px solid #8080807d;
  margin: 1%;
  border-radius: 5px;
  background: #f5dda7a3;
  font-style: bold;
  color: #888b8f;
}

label {
  font-weight: bold;
}

.card {
  border-radius: 10px;
}

i {
  color: grey;
  padding: 5px;
}

.button-theme {
  background-color: #F1B319;
  border-collapse: #F1B319;
  color: black;
  border: 0;

}


.tile {
  background: white;
  border: 0;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.theme {
  background-color: #363740;
  border-collapse: #363740;
  color: whitesmoke;
  border: 0;
  border-radius: 20px 20px 0px 0px;
}
</style>
<template>
  <div class="home subscription-section">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <h1 class="subscription-header">Choose Your Plan</h1>
    <div class="pricing-intro">
      <div class="intro-item">
        <span class="mdi mdi-18px mdi-gift"></span>
        Unlimited contests
      </div>
      <div class="intro-item">
        <span class="mdi mdi-24px mdi-trophy-award"></span>
        Unlimited entries
      </div>
      <div class="intro-item">
        <span class="mdi mdi-18px mdi-trophy"></span>
        Pick random winners
      </div>
      <div class="intro-item">
        <span class="mdi mdi-18px mdi-cloud-download"></span>
        Entrant Data Export
      </div>
    </div>
    <template v-for="plan in plans">
      <button type="button" class="btn btn-outline-dark btn-plan free" :title="(subscriptions.find((el) => el.planId === plan._id)) ? 'You are already subscribed' : ''" v-if="plan.price === 0" :key="plan._id" :disabled="subscriptions.find((el) => el.planId === plan._id)" @click="subscribe(plan._id)">Free Basic Plan</button>
    </template>
    <div class="divider">
      <small class="small-desc">
        or buckle up and take our pro features...
      </small>
    </div>
    <b-row class="subscription-wrap">
      <template v-for="plan in plans">
        <b-col cols="12" sm="6" md="3" :key="plan._id" v-if="plan.price !== 0" class="subscription-column">
          <b-card no-body class="pricing-card" :class="(plan.planName === 'Lambo') ? 'popular' : ''">
            <b-card-body>
              <h4 class="pricing-heading">
                <span v-html="getEmoji(plan.planName)"></span>
                {{ plan.planName }}
              </h4>
              <div class="price">
                <span>$</span>
                {{ plan.price }}
              </div>
              <button type="button" class="btn btn-outline-dark btn-plan" :class="(plan.planName === 'Lambo') ? 'popular' : ''" @click="openSelectPlanSidebar(plan)">Select Plan</button>
              <div class="pro-feature">
                <ul>
                  <li>
                    Unlimited Active Campaigns
                  </li>
                  <li>
                    <span class="number">{{plan.totalNoOfRequests}} </span>
                    Winners Selection
                  </li>
                  <li>
                    <span class="number">{{plan.noOfWinners}}</span>
                    Credits [Signup Capacity]
                  </li>
                  <li>
                    <span class="number">{{plan.noOfRepeatitiveActions}}</span>
                    Repeated Actions (Social/Inputs)
                  </li>
                </ul>
              </div>
              <div class="block-chain-support">
                <h4>Blockchain Support</h4>
                <div class="image">
                  <template v-for="(item,index) in plan.blockchainSupport">
                    <span :key="index">
                      <img src="../../assets/ethereum.svg" height="25px" v-if="item === 'ETH'" />
                      <img src="../../assets/binance-logo.svg" height="25px" v-if="item === 'BSC'" />
                      <img src="../../assets/tezos.png" height="25px" v-if="item === 'XTZ'" />
                      <img src="../../assets/harmony.png" height="25px" v-if="item === 'ONE'" />
                      <img src="../../assets/polygon.png" height="25px" v-if="item === 'MATIC'" />
                      <img src="../../assets/avalanche.png" height="25px" v-if="item === 'AVAX'" />
                      <img src="../../assets/moonbeam.png" height="25px" v-if="item === 'GLMR'" />
                      <img src="../../assets/moon-river.png" height="25px" v-if="item === 'MOVR'" />
                      <template v-if="item === 'Custom'">
                        {{item}}
                      </template>
                    </span>
                  </template>
                </div>
              </div>
              <div class="show-all" :class="plan.visible ? null : 'collapsed'" :aria-expanded="plan.visible ? 'true' : 'false'" :aria-controls="`collapse-${plan._id}`" @click="plan.visible = !plan.visible">
                See all features
                <span class="arrow mdil mdil-24px mdil-chevron-down" v-if="!plan.visible"></span>
                <span class="arrow mdil mdil-24px mdil-chevron-up" v-if="plan.visible"></span>
              </div>
              <b-collapse :id="`collapse-${plan._id}`" v-model="plan.visible" class="feature-wrap mt-2">
                <ul>
                  <template v-for="(item,index) in plan.otherFeatures">
                    <li :key="index">
                      <span class="mdi mdi-chevron-right"></span>
                      {{item}}
                    </li>
                  </template>
                </ul>
              </b-collapse>
            </b-card-body>
          </b-card>
        </b-col>
      </template>
    </b-row>
    <div class="row" style="margin-top: 2%;">
      <div class="col-md-12">
        <table v-if="subscriptions.length" class="table table-bordered" style="background:#FFFF">
          <thead class="thead-light">
            <tr>
              <th>Subscription Id</th>
              <th>Subscription Date</th>
              <th>Plan Name</th>
              <th>Limit</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in subscriptions" :key="row._d">
              <th>
                {{ row._id }}
              </th>
              <td>{{ new Date(row.subscriptionDate).toLocaleString() }}</td>
              <td>{{ getPlanName(row.planId) }}</td>
              <td>{{ row.leftOverNoRequests }}</td>
              <td>{{ row.isActive ? "Active" : "Inactive" }}</td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <select-plan-slide 
        :isProjectEditing="isProjectEditing"
        :themeColor="themeColor"
        :themeColorDefault="themeColorDefault"
        :fontColor="fontColor"
        :fontColorDefault="fontColorDefault"
        :plan="plan"
        />
    </div>
  </div>
</template>
<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import notificationMixins from "../../mixins/notificationMixins";
import SelectPlanSlide from '../../components/admin/selectPlanSlider/SelectPlanSlide.vue';
import Messages from "../../utils/messages/admin/en"
import eventBus from '../../eventBus';

export default {
  name: "Subscription",
  components: { Loading, SelectPlanSlide},

  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      showAllFeatures: false,
      isLoading: false,
      fullPage: true,
      plans: [],
      subscriptions: [],
      user: {},
      emojis: {
        Lambo: '&#128665;',
        Moon: '&#127773;',
        Degen: '&#128176;',
        Satoshi: '&#128373;'
      },
      support: {
        ETH: 'ethereum',
        BSC: 'binance-logo'
      },
      currentPage: 1,
      themeColor: "#494949",
      themeColorDefault: "#494949",
      fontColor: "#ffffff",
      fontColorDefault: "#ffffff",
      isProjectEditing: false,
      plan:{}
    };
  },

  computed: {
    // a computed getter
  },

  created() {
    const usrStr = localStorage.getItem("user");
    document.title = "Hyperfyre - Subscriptions";

    if (usrStr) {
      this.user = {
        ...JSON.parse(usrStr),
      };
    }

    this.fetchPlan();
    // const plansInStorage = localStorage.getItem("plans");
    // if (plansInStorage) {
    // this.plans = JSON.parse(plansInStorage);
    // }

    this.fetchSubscription();

    // const subscriptionsInStorage = localStorage.getItem("subscriptions");
    // if(subscriptionsInStorage){
    //   const parsedSub = JSON.parse(subscriptionsInStorage)
    //   this.subscriptions = parsedSub ? parsedSub["subscriptions"] : [];
    // }else{

    // }
  },

  methods: {
    showFeature(plan) {
      plan.visible = !plan.visible
    },
    getEmoji(item) {
      return this.emojis[item];
    },
    getPlanName(subPlanId) {
      const subPlan = this.plans.find((plan) => plan["_id"] === subPlanId);
      return subPlan ? subPlan["planName"] : "";
    },
    async fetchPlan() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/plan?authToken=${this.authToken}`;
        const headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        let json = await resp.json();
        json = json.map(
          function(el) {
            let item = Object.assign({}, el);
            item.visible = false
            return item;
          }
        );
        // console.log(json);
        this.plans = json;
        // localStorage.setItem("plans", JSON.stringify(json));
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchSubscription() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription?usage=true`;
        const headers = {
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
        this.subscriptions = json["subscriptions"];
        const usage = json["usage"]
      
        if(usage && (usage.totalUsed >= usage.totalAvailable)){
          eventBus.$emit('UpdateAdminNav', false);
          throw new Error(Messages.SUBSCRIPTIONS.SUBSCRIPTION_EXHAUSTED);
        }
        
        if (usage && usage.totalAvailable > 0) {
          eventBus.$emit('UpdateAdminNav', true);
        } else {
          eventBus.$emit('UpdateAdminNav', false);
        }
        // localStorage.setItem("subscriptions", JSON.stringify(json));
        // this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async subscribe(planId) {
      try {
        if (!planId) {
          return;
        }
        var planbody={}
        this.plan.selectedCurrency='HIDD'
        this.plan.selectedNetwork='MATICC'
        this.plan.coupon_code='Free120'
        this.plan.grandTotal='0'
        this.plan.price='0'

        planbody=Object.assign(planbody,this.plan)
        // console.log(planId);

        this.isLoading = true;

        // Payment Type
        // Crypto or Fiat ?
        // MOOPAY  ( SOLANA, ETHE, POLYGON )
        // PAYU    

        /**
         * {
         *  "planId":"2222",
         *  "curr" : "HID|USDT|USDC|INR|USD",
         *  "network": "ETH|SOL|MATIC|BSC|ONE",
         *  "currType": "FIAT|CRYPTO",
         *  "coupon": "HID302022"
         * }
         */

        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            planId,planbody
          }),
          headers,
        });

        const json = await resp.json();
        if(json){
          if (!resp.ok) {
            return this.notifyErr(json)
          }else{
            this.fetchSubscription();
            console.log(json);
            this.notifySuccess(Messages.SUBSCRIPTIONS.YOU_ARE_SUBSCRIBED + json["newSub"]["_id"]);
          }
        }else{
          throw new Error('Error while subscritption')
        }
        
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },

    openSelectPlanSidebar(data){
      this.isProjectEditing = false
      data.emoji = this.getEmoji(data.planName)
      this.plan = data
      this.$root.$emit('bv::toggle::collapse', 'sidebar-right')
      console.log(this.plan);
      this.resetAllValues();
      this.$root.$emit('callClearFromProject');    
    },

    resetAllValues() {
      console.log('Reset-Functaion')
    }
  },

  mixins: [notificationMixins],
};
</script>
