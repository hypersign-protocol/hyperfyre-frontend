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
          <img src="../../../assets/ethereum.svg" height="25px" />
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
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="follow">
              <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="data.value"
                :disabled="true"
                :required="data.isManadatory"
              ></b-form-input>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="!done">
					<b-col class="btn-group" cols="12" sm="12" md="12" >
            <button class="btn btn-link"  @click="invokeWallet">Connect Wallet</button>
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
import {
  isValidURL,
  isValidText,
  isEmpty,
} from "../../../mixins/fieldValidationMixin";
import {web3modal} from "../../../mixins/myWallet"
import {watchAccount, disconnect } from "@wagmi/core";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
const checkWalletAddress = require('multicoin-address-validator');
export default {
  name: "BlockchainEth",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
    done: {
      required: true,
    },
    themeData: {
      required: true,
    },
    authToken: {
      required: true
    },
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
      unwatchAccount:null,
      unsubscribe:null,
      web3modal:web3modal,
    };
  },
  mounted() {    
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);    
  },
  methods: {
   async invokeWallet() {    
    await this.web3modal.openModal();                 
        if(this.data.value === '' && localStorage.getItem('wagmi.store')){          
          const getDataFromLocalStorage = localStorage.getItem('wagmi.store')         
          const parsed = JSON.parse(getDataFromLocalStorage).state.data.account         
          console.log(parsed)
          this.data.value = parsed
        }
        this.unsubscribe = this.web3modal.subscribeModal((newState)=>{
          if(newState.open === false){
            this.unwatchAccount()
          }
        })     
        this.unwatchAccount = watchAccount(account=>{    
          if(account.isConnected){
           this.data.value = account.address 
          }        
        })                
   },
    update() {
      if (!this.isFieldValid()) {
        this.data.value = "";
        return this.notifyErr(Messages.EVENT_ACTIONS.WALLETCONNECT.CONNECT_WALLET);
      } else {
        this.$emit("input", this.data.value);
      }
    },
    isFieldValid() {
      if (isEmpty(this.data.value)) {
        return false;
      }
      if (isValidURL(this.data.value)) {
        return false;
      }
      if (!isValidText(this.data.value)) {
        return false;
      }
      if(!checkWalletAddress.validate(this.data.value,'Ethereum','eth')){
        return false;
      }
      return true;
    },
  async disableInput(data) {
      this.done = data;
      if(data === true) {
        this.unwatchAccount()
        this.unsubscribe()
        await disconnect()
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
