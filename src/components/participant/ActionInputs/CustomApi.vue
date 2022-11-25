<template>
  <b-card no-body class="action-wrap">
    <b-card-header :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="`collapse-${idValue}`" @click="visible = !visible">
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="../../../assets/filled-rest-api-50.png" height="25px" />
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
          <img class="check-mark" src="../../../assets/check-circle-fill.svg" height="25px" v-if="done" />
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse :id="`collapse-${idValue}`" v-model="visible">
      <b-card-body class="user-details">
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="row g-3 align-items-center" v-for="(param, index) in values" v-bind:key="index">
              <div class="col-lg-12 col-md-12">
                <span class="spanClass">{{param.fieldPlaceHolder}}</span>
                <div class="mt-3" v-if="param.fieldType !=='BOOLEAN'">                  
                       
              <div v-if="onlyWallet(param)">         
                <b-input-group class="mt-3" v-if="param.fieldType === 'BLOCKCHAIN_COSMOS'">
                  <b-form-input                            
                  id="title"
                  v-model="param.fieldValue"
                  :required="data.isManadatory"                  
                  :disabled="true"                  
                  ></b-form-input>
                  <b-input-group-append v-if="!done">                    
                    <b-button class="connectBtn" variant="btn btn-outline-twitter"                    
                    @click="invokeKeplr(param)"
                    >
                    <img src="../../../assets/cosmos-2.svg" class="mr-1" height="20px" />Connect</b-button>                          
                  </b-input-group-append>                  
                </b-input-group>
                <b-input-group class="mt-3" v-else>
                  <b-form-input                            
                  id="title"
                  v-model="param.fieldValue"
                  :required="data.isManadatory"                  
                  :disabled="true"                  
                  ></b-form-input>
                  <b-input-group-append v-if="!done">                    
                    <b-button class="connectBtn" variant="btn btn-outline-twitter"                  
                    @click="invokeMetamask(param)"
                    >
                    <img src="/img/ethereum.2b470564.svg" class="mr-1" height="20px" />Connect</b-button>                          
                  </b-input-group-append>
                  
                </b-input-group>
              </div>
              <div v-else>
                <b-form-input 
                  id="title"
                  v-model="param.fieldValue"
                  :required="data.isManadatory"
                  class="form-control w-100 mt-1"
                  :disabled="done"                  
                  ></b-form-input>
                  </div>
                </div>
                <div class="mt-3" v-if="param.fieldType ==='BOOLEAN'">
                  <hf-select-drop-down
                  v-if="!done"               
                  :options="booleanOptions"
                  @selected=" e =>param.fieldValue = e"                  
                  ></hf-select-drop-down>
                   <b-form-input
                  v-else                  
                  v-model="param.fieldValue"
                  :disabled="true"                 
                  ></b-form-input>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>  
        <b-row v-if="!done">
          <b-col cols="12" sm="12" md="12">
            <button class="btn btn-link center" @click="update()">Continue</button>
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
.spanClass{  
  color:rgb(26 26 26 / 90%);
}
.connectBtn{
  border: #ced4da 1px solid;
}
</style>

<script>

import eventBus from "../../../eventBus.js";
import notificationMixins from "../../../mixins/notificationMixins";
import { SigningCosmosClient } from "@cosmjs/launchpad";
import Web3 from "web3";
import Messages from "../../../utils/messages/participants/en";
import {isFloat} from "../../../mixins/fieldValidationMixin"
import ErrorMessage from "../ErrorMessage.vue";
import HfSelectDropDown from "../../elements/HfSelectDropDown.vue"
import Vue from "vue"
export default {
  name: "CustomApi",
  props: {
    idValue: {
      required: true,
    },
    data: {
      required: true,
    },
    authToken: {
      required: true
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
    HfSelectDropDown
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
      
      signature:"",
      message_sign:"",
      booleanOptions:[
      { text: "Select True OR False", value: null },
      { text: "True", value: true },
      { text: "False", value: false },
      ],
      visible: false,
      values:[],
      value:{
      fieldName: "",
      fieldPlaceHolder: "",
      fieldType: "",      
    }
  }
},
   watch: {
        data:{
          deep:true,
          handler: function(newValue,oldValue) {
            this.values = newValue.value
          }
        }
    },
  mounted() {  
    if(this.data.value){
      this.values = this.data.value     
      if(!this.done){
        this.addValueField()
      }
    }
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    onlyWallet(param) {
      if(param.fieldType ==="BLOCKCHAIN_COSMOS" || param.fieldType === "BLOCKCHAIN_ETH") {
        return true
      } else {
        return false
      }
     },
   async invokeKeplr(param) {      
       try {
        if (!window.keplr) {
        this.notifyErr("Please install keplr browser extension");
        } else {
        const chainId = param.chainId;
        await window.keplr.enable(chainId);
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        const cosmJS = new SigningCosmosClient(
        "https://lcd-cosmoshub.keplr.app/rest",
        accounts[0].address,
        offlineSigner,
        );
        param.fieldValue = cosmJS.anyValidAddress        
        let index = this.values.findIndex((x)=>{
          return (x.fieldName === param.fieldName && x.parameter === param.parameter)
        })        
        Vue.set(this.values, index, param)    //  Due to vues reactivity we need to set updated object in the values array Ref:[https://v2.vuejs.org/v2/guide/reactivity.html#For-Arrays]
      }
    } catch (error) {
      return this.notifyErr(error.message);
  }
},
    async signMessage() {
      const message =
        "You are Signing this message to ensure your participation in this event";
      this.message_sign = message;
      return await this.web3.eth.personal.sign(
        message,
        ethereum.selectedAddress
      );
    },
   async checkWeb3Injection() {
      try {
        if (ethereum && ethereum.isMetaMask) {
          this.web3 = new Web3(window.ethereum);
        }
      } catch (error) {        
        throw new Error('Install Metamask')        
      }
    },
    async invokeMetamask(param) {      
      try {
       await this.checkWeb3Injection()
        if (ethereum.isMetaMask) {
          const wallet = await ethereum.request({
            method: "eth_requestAccounts",
          });
          this.signature  = await this.signMessage();
          
          const generatedWalletAddr = await this.web3.eth.personal.ecRecover(this.message_sign, this.signature)
          
          let isSigVerified =  false;
          if(generatedWalletAddr === wallet[0]){
              isSigVerified = true;
          } 
      
          if (isSigVerified) {
            param.fieldValue = wallet[0];            
            let index = this.values.findIndex((x)=>{
          return (x.fieldName === param.fieldName && x.parameter === param.parameter)
        })        
        Vue.set(this.values, index, param) //  Due to vues reactivity we need to set updated object in the values array Ref:[https://v2.vuejs.org/v2/guide/reactivity.html#For-Arrays]
          } else{
            return this.notifyErr('Invalid Signature')
          }
        } 
      } catch (error) {
        return this.notifyErr(error.message)
      }
    },
    addValueField(){      
    for(let index = 0; index<this.values.length; index++) {
      if(this.values.length !==0){
        this.values[index]['fieldValue']= null
        if(this.values[index].fieldType ==='BOOLEAN'){
          this.booleanOptions=[
          { text: `${this.values[index].fieldPlaceHolder}`, value: null },
          { text: "True", value: true },
          { text: "False", value: false },
          ]
        }
      }      
    }
    },
    async update() { 
      if (this.values.length !==0) {
    try{  
      this.values.forEach(attribute => {
        switch (attribute.fieldType) {
          case "STRING":            
            if(attribute.fieldValue === null || attribute.fieldValue === "") {                                         
              throw new Error(`Please fill ${attribute.fieldPlaceHolder} field`)              
            }
            break;
          case "NUMBER":
            if(attribute.fieldValue === null || attribute.fieldValue === "") {
              throw new Error(`Please fill ${attribute.fieldPlaceHolder} field`)
            } else if(!Number.isInteger(parseFloat((attribute.fieldValue)))) {                  
              throw new Error('Enter Integer value')
            }
            break;
          case "FLOAT":
            if(attribute.fieldValue === null || attribute.fieldValue === "") {
              throw new Error(`Please fill ${attribute.fieldPlaceHolder} field`)
            } else if(!isFloat(attribute.fieldValue)) {                  
              throw new Error('Enter Float value')
            }
            break;
          case "BOOLEAN":            
            if(attribute.fieldValue === null) {
              throw new Error(`Please fill ${attribute.fieldPlaceHolder} field`)
            }
            break;
          case "BLOCKCHAIN_COSMOS":
            if(attribute.fieldValue === null || attribute.fieldValue === "") {
              throw new Error('Please Connect Keplr wallet')
            }
            break;
          case "BLOCKCHAIN_ETH":
            if(attribute.fieldValue === null || attribute.fieldValue === "") {
              throw new Error('Please Connect metamask  wallet')
            }
            break;
          default:
            break;
        }        
      }      
      );
      this.$emit("input",JSON.stringify(this.values));
      } catch(error) {       
        return this.notifyErr(error)
      }
      }        
    },
    disableInput(data) {
     this.data.isDone = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
