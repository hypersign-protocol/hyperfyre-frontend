<template>
  <b-card no-body class="action-wrap">
    <b-card-header
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="`collapse-${idValue}`"
      @click="visible = !visible"
    >
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="../../../assets/Reef.svg" height="25px" />
          <!-- <img src="../../../assets/metamask.svg" height="25px" /> -->
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>

        <b-col cols="2" sm="2" md="2">
          <b-badge class="btn-score" :style="buttonThemeCss" @click="authToken && update()" v-if="!done">
            <i class="fa fa-plus" aria-hidden="true"></i>
            {{ data.score }}
          </b-badge>
          <img
            class="check-mark"
            src="../../../assets/check-circle-fill.svg"
            height="25px"
            v-if="done"
          />
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse :id="`collapse-${idValue}`" v-model="visible">
      <b-card-body class="user-details">
        <b-row v-if="!showerror">
          <b-col cols="12" sm="12" md="12">
            <div class="metamask">
              <b-form-select
                type="text"
                :options="options"
                v-model="value.userWalletAddress"
                :disabled="done"
                :required="data.isManadatory"
                v-if="!done"
              ></b-form-select>
              <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="value.userWalletAddress.address"
                :disabled="true"
                :required="data.isManadatory"
              v-else></b-form-input>
            </div>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col cols="12" sm="12" md="12">
            <ErrorMessage errorMessage="Install Reef browser extension" v-if="!done"/>
              <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="value.userWalletAddress.address"
                :disabled="done"
                :required="data.isManadatory"
              v-else></b-form-input>
          </b-col>
        </b-row>
        <b-row v-if="!done && !showerror">
          <b-col class= "btn-group" cols="12" sm="12" md="12" >
            <button class="btn btn-link" @click="invokeReef()">Connect Reef Wallet</button>
            <button class="btn btn-link"  @click="update()">Continue</button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<style scoped>
.center{
  display: block; margin-left: auto;margin-right: auto
}
</style>

<script>

import eventBus from "../../../eventBus.js";
import apiClient from "../../../mixins/apiClientMixin.js";
import {
  isValidURL,
  isValidText,
  isEmpty,
} from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import ErrorMessage from "../ErrorMessage.vue";
import config from "../../../config.js";
export default {
  name: "ReefErc20",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
    authToken: {
      required: true,
    },
    done: {
      required: true,
    },
    themeData: {
      required: true,
    }
  },
  components: {
    ErrorMessage,
  },
computed:{
 buttonThemeCss() {
      return {
        '--button-bg-color': this.themeData.buttonBGColor,
        '--button-text-color': this.themeData.buttonTextColor
      }
     }
  },
  data() {
    return {
      visible: false,  
      showerror: false,
      signature: "",
      message_sign: "You are Signing this Message to confirm your Paricipation",
      
      options:[{value: '', text: 'Please select your Reef wallet'}],
      value: {
        contractAddress: "",
        userWalletAddress: '',
        thresholdBalance: 0
      },
      wallet:[],
      walletSignObj:"",
      web3: null
    };
  },
  updated(){
    if (this.data.value && typeof(this.data.value) === "object") {
      Object.assign(this.value, { ...(this.data.value) });
    }
  },
  async mounted() {
    if (this.data.value && typeof(this.data.value) === "object") {
      Object.assign(this.value, { ...(this.data.value) });
    }
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
    await this.checkWeb3Injection();
  },
  methods: {
   async checkWeb3Injection() {
      try {
        if (window.injectedWeb3) {
          this.web3 = await window.injectedWeb3
        }
        else{
           this.showerror = true;
        }
      } catch (error) {
        console.log(error);
      }




    },
    async fetchAccounts() {
      
      this.options = [{value: '', text: 'Please select your Reef wallet.'}];
      for (let i in this.wallet) {
       
             this.options.push({value:this.wallet[i],text: 'Address: '+ this.wallet[i].address.slice(0,12)+'...'+this.wallet[i].address.slice(38,48)+'  Name: '+this.wallet[i].name})
            }

            this.value.userWalletAddress = this.options[1]? this.options[1].value : this.options[0].value
    },
    async invokeReef() {
      try {
       
         if (this.web3 && this.web3.reef) {
           
           let sign;
         await window.injectedWeb3.reef.enable()
          .then(async walletObj=>{
            this.wallet =  await walletObj.accounts.get();
            this.walletSignObj=walletObj
            await this.fetchAccounts();
            
          })
        } 
      } catch (error) {
        return this.notifyErr(error.message)
      }
    },
    async update() {
      if (!this.isFieldValid() || this.value.userWalletAddress === "") {
        return this.notifyErr(Messages.EVENT_ACTIONS.REEF.CONNECT_REEF_WALLET);
      } else {
        try {
          let balance = await this.fetchBalance();
          if (balance !== undefined) {
            if (balance >= Number.parseFloat(this.value.thresholdBalance)) {
              this.value.contractAddress=this.value.contractAddress.address
              //console.log(JSON.stringify({...this.value}));
              this.value.userBalance=balance
              this.$emit("input",  JSON.stringify({
                ...this.value,
              }));
            } else {
              throw new Error(Messages.EVENT_ACTIONS.ETH.INSUFFICIENT_BALANCE);
            }
          }
        } catch (error) {
          this.data.value = ""
          return this.notifyErr(error);
        }
      }
    },
    isFieldValid() {
      if (isEmpty(this.value.userWalletAddress.address)) {
        return false;
      }
      if (isValidURL(this.value.userWalletAddress.address)) {
        return false;
      }
      if (!isValidText(this.value.userWalletAddress.address)) {
        return false;
      }
      return true;
    },
    async fetchBalance() {

        if(!this.value.contractAddress){
          throw new Error("Missing contract address")
        }

        if(!this.value.userWalletAddress.address){
          throw new Error("Missing userWallet address")
        }


      this.signature=await this.walletSignObj.signer.signRaw(this.value.userWalletAddress)
      const body = {
        actionType: this.data.type,
        data: this.value.userWalletAddress.address,
        contractAddress: this.value.contractAddress,
        signature: this.signature,
        message: this.message_sign,
      };
      let url = `${this.$config.studioServer.BASE_URL}api/v1/action/contract/reef`;

      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      };

      const res = await apiClient.makeCall({
        method: "POST",
        url: url,
        body: body,
        header: headers,
      });

      const result = res.data.balance.hex;
  
      return Number(result);
    },
    disableInput(data) {
      this.data.isDone = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
