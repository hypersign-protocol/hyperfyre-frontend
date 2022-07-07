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
      <button  type="button" class="btn btn-outline-dark btn-plan free" :title="(subscriptions.find((el) => el.planId === plan._id)) ? 'You are already subscribed' : ''" v-if="plan.price === 0" :key="plan._id" :disabled="subscriptions.find((el) => el.planId === plan._id)" @click="subscribe(plan._id)">Free Basic Plan</button>
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
              <button v-if="!accessuser.adminName && !accessToken" type="button" class="btn btn-outline-dark btn-plan" :class="(plan.planName === 'Lambo') ? 'popular' : ''" @click="openSelectPlanSidebar(plan)">Select Plan</button>
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
        <table v-if="activeSubscriptions.length" class="table table-bordered" style="background:#FFFF">
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
            <tr v-for="row in subscriptions" :key="row._id">
              <th>
                {{ row._id }}
              </th>
              <td>{{ new Date(row.subscriptionDate).toLocaleString() }}</td>
              <td>{{ getPlanName(row.planId) }}</td>
              <td>{{ row.leftOverNoRequests }}</td>             
              <td>
                {{  row.paymentData ? 
                       (row.paymentData.status==='validated' || row.paymentData.activated === `by ${appName} Activation Team`?
                         "Active": 
                         (row.paymentData.status==='paid'?
                           "Pending":
                            ( row.paymentData.status === 'failed'? "Cancelled" :"Inactive" )
                         )
                       ): 
                      row.isActive? "Active":"Inactive" 
                }}
              </td>
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
import { truncate } from '../../mixins/fieldValidationMixin';
import config from "../../config"
export default {
  name: "Subscription",
  components: { Loading, SelectPlanSlide},

  data() {
    return {
      appName:config.appName,
      authToken: localStorage.getItem("authToken"),
      accessToken: localStorage.getItem("accessToken"),
      showAllFeatures: false,
      isLoading: false,
      fullPage: true,
      plans: [],
      subscriptions: [],
      activeSubscriptions:[],
      user: {},
      accessuser:{},
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
  // a computed 
  },

  async created() {
    const usrStr = localStorage.getItem("user");
    document.title = `${config.appName} - Subscriptions`;

    if (usrStr) {
      this.user = {
        ...JSON.parse(usrStr),
      };
    }
     const accessUser = localStorage.getItem("accessuser");
    if (accessUser) {
      this.accessuser = {
        ...JSON.parse(accessUser),
      };
    }
    
    

    this.fetchPlan();
    // const plansInStorage = localStorage.getItem("plans");
    // if (plansInStorage) {
    // this.plans = JSON.parse(plansInStorage);
    // }

   await this.fetchSubscription();
   if(this.$route.query.hash!==undefined && this.$route.query.code!==undefined &&this.$route.query.extra!==undefined){
    let {extra}={...this.$route.query}
    extra=JSON.parse(decodeURIComponent(extra))
  
    let subsID=extra._id;
    
    this.showAlert(this.$route.query,subsID)



   }
    // const subscriptionsInStorage = localStorage.getItem("subscriptions");
    // if(subscriptionsInStorage){
    //   const parsedSub = JSON.parse(subscriptionsInStorage)
    //   this.subscriptions = parsedSub ? parsedSub["subscriptions"] : [];
    // }else{

    // }
  },

  methods: {
   showAlert(data,subsID){
    
      const subsInfo= this.paidSubscriptions.find(elm=>{
        return elm._id===subsID
      })

      let paymentData;
      let truncatedHash;
      let tr;

      paymentData=subsInfo.paymentData;
      tr=paymentData.transaction;
      truncatedHash=truncate(tr,35)
        
      let color= (paymentData.status==='paid')?'teal':(paymentData.status==='validated'?'green':paymentData.status==='failed'?'red':'teal')
      // console.log(JSON.stringify(data));
      // console.log(JSON.parse(decodeURIComponent(data.extra)));
      this.$swal.fire({
        position:'center',
        focusConfirm: true,
        html:`                        
        <div class="receipt-content">
        <div class="container bootstrap snippets bootdey">
        <div class="row">
          <div class="col-md-12">
            <div class="invoice-wrapper">
              <div class="intro">
                Hi <strong>${this.user.name}</strong>, 
                <br>
                This is the receipt for a payment of <strong>${paymentData.amount.toPrecision(6)}</strong> (${paymentData.token.token}) for your Plan <strong>${this.getPlanName(subsInfo.planId)}</strong>
              </div>
        <br>
        <div class="payment-info">
                <div class="row">
                  <div class="col-sm-12 text-left">
                    <span>Transaction Hash</span><br>
                      <strong id='txn-hash1'>${truncatedHash}</strong> 
                      <strong id='txn-hash' style="display:none">${tr}</strong> 
                      <i onclick="(function(){
                      
                          let str=document.getElementById('txn-hash').innerHTML 
                        
                          return navigator.clipboard.writeText(str)
                          }
                          )();" class="fa fa-clone" style="cursor:pointer" aria-hidden="true"></i>
                  </div>

                  
                
                </div>
              </div>
        <br>
              <div class="payment-info">
                <div class="row">
                  <div class="col-sm-6 text-left">
                    <span>Subscription Id</span>
                    <strong id='sub-id'>${subsID}</strong>
                    <i onclick="(function(){
                      
                          let str=document.getElementById('sub-id').innerHTML 
                        
                          return navigator.clipboard.writeText(str)
                          }
                          )();" class="fa fa-clone" style="cursor:pointer" aria-hidden="true"></i>
                  </div>
                  <div class="col-sm-6 text-right">
                    <span>Payment Date</span>
                    <strong>${new Date(paymentData.paidAt).toLocaleDateString()}</strong>
                  </div>
                </div>
              </div>

              <div class="payment-details">
                <div class="row">
                  <div class="col-sm-6 text-left">
                    <span>Client Name</span>
                    </br>
                    <strong>
                      ${this.user.name}
                    </strong>
                    </div>
                      <div class="col-sm-6 text-right">
                  <span>Email Id.</span>
                  </br>
                      <strong>
                        ${this.user.email}
                      </strong>
                    
                  </div>
                  
                </div>
              </div>

            
            </div>
              <br>
              <div class="intro"    style="color:${color}">
              Payment Status : <strong>${paymentData.status==='validated'?'Confirmed':(paymentData.status==='paid'?'Pending':'Failed')}</strong>
              
            </div>
              <div class="intro"    style="color:${color}">
              Subscription Status : <strong>${subsInfo.isActive===true?'Activated':(paymentData.status==='failed'?'Cancelled':'Pending')}</strong>
              
            </div>
            <div class="intro" style="color:red">
                <strong>Please Contact ${config.appName} Team if your subscription is not activated within 10 mins of payment</strong>
            </div>
          <div class="footer" style="color:black">
              Copyright © ${new Date().toLocaleDateString().split('/').at(2)}. <strong> <a style="text-decoration:node;color:black" href="http://fyre.hypersign.id/">${config.appName}</a> </strong>
            </div>
          </div>
        </div>
        </div>
        </div>   
            
            `,
        toast:false,
        title:'<h5>Payment Information</h5>',
        icon:paymentData.status==='validated'?'success':paymentData.status==='paid'?'info':paymentData.status==='failed'?'error':'warning',
        showCloseButton: true,
        showConfirmButton:false,
        width:'50rem',
        background:"white"

      })
    },
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
          AccessToken:`Bearer ${this.accessToken}`
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
        // Sorting based on price
        json.sort((a, b) => (a.price > b.price) ? 1 : -1)
        
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
          AccessToken:`Bearer ${this.accessToken}`
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
        this.activeSubscriptions=this.subscriptions.filter((x) => (x.paymentData?true:x.isActive===true))
        this.paidSubscriptions=this.subscriptions.filter((x) => {
        
          return  x.paymentData?true:(x.isPaid===true)})
         
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
          AccessToken:`Bearer ${this.accessToken}`
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
    
      this.$root.$emit('resetPlanSlide');    
    },


 },

  mixins: [notificationMixins],
};
</script>
