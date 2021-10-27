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
          <img src="../../../assets/question-circle-fill.svg" height="25px" />
          <!-- <img src="../../../assets/metamask.svg" height="25px" /> -->
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>
       
        <b-col cols="2" sm="2" md="2">
          <b-badge class="btn-score" @click="update()" v-if="!done">
            <img src="../../../assets/plus.svg" />
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
              <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="data.value"
                :disabled="true"
                :required="data.isManadatory"
              ></b-form-input>
             <button
             class="btn btn-outline-twitter text-black" @click="invokeMetamask()"> <img src="../../../assets/metamask.svg" height="25px" width="25px" /></button>
          </div>
            
          </b-col>
        </b-row>
         <b-row v-else>
          <b-col cols="12" sm="12" md="12">
            Please Install metamask
            
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
    
  </b-card>
</template>
<script>

import eventBus from "../../../eventBus.js";
import apiClient from '../../../mixins/apiClientMixin.js';
import {
  isValidURL,
  isValidText,
  isEmpty,
} from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import Web3 from 'web3';
export default {
  name: "EthereumErc20",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      done: this.data.isDone,
      authToken: localStorage.getItem("authToken"),
      showerror:false,
      signature:"",
      message_sign:"",
      
    };
  },
  mounted() {    
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
    this.data.contractAddress=this.data.value
    this.data.value=""
    this.checkWeb3Injection()
  },
  methods: {
    checkWeb3Injection(){
      try {
        if(ethereum && ethereum.isMetaMask){
          this.web3=new Web3(window.ethereum)    
          console.log(this.web3);
        } 
        } catch (error) {
          console.log(error);
           this.showerror=true
        }
    },
    async signMessage(){
      const message="You are Signing this Message and Ensuring you participation in this project";
      this.message_sign=message
      return await this.web3.eth.personal.sign(message,ethereum.selectedAddress)
    },
  async invokeMetamask(){
      try {
        if (ethereum.isMetaMask) {
          let wallet = await ethereum.request({ method: "eth_requestAccounts" });
          this.signature=await this.signMessage()
          if(this.signature){
          this.data.value=wallet[0];
          
          }             
   }
   
 } catch (error) {
   
 }
},
   async update() {
      if (!this.isFieldValid()|| this.data.value ==="") {
        return this.notifyErr(Messages.EVENT_ACTIONS.INVALID_INPUT);
      } else {
          try {
            let balance = await this.hasBalance()            
            if(balance.result!==undefined){
              let wallet_balance= Number.parseInt(balance.result)
             if(wallet_balance > 0 ){
               this.$emit("input", this.data.value);
             }else{
               throw new Error("Insufficient balance")
             }
            }
          } catch (error) {
           return this.notifyErr(error);
          }
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
      return true;
    },
    async hasBalance(){
        const body ={
          "actionType": this.data.type,
          "data":  this.data.value,
          "contractAddress": this.data.contractAddress,
          "signature":this.signature,
          "message":this.message_sign,
        };
        let url = `${this.$config.studioServer.BASE_URL}api/v1/action/verify`;
      
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
          
          const result =res.data
         
          return result
      
        
    }
    ,disableInput(data) {
      this.done = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
