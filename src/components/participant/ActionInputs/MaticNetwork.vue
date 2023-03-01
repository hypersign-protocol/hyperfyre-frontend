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
          <img src="../../../assets/matic-logo.svg" height="25px" />
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
            <div
              class="row g-3 align-items-center"
              v-for="(param, index) in value.paramsList"
              v-bind:key="index"
            >
              <div class="col-lg-12 col-md-12" v-if="param.name === 'address'">
                <div>
                  <input
                    v-model="param.value"
                    type=""
                    id="title"
                    :required="true"
                    class="form-control w-100"
                    :disabled="true"
                    :placeholder="param.name"
                  />
                  <div v-if="!done" class="btn-group w-100">
                    <button class="btn btn-link" @click="invokeWallet(index)">
                      Connect Wallet
                    </button>
                    <button class="btn btn-link" @click="update()">
                      Continue
                    </button>
                  </div>
                </div>              
              </div>
              <div class="col-lg-12 col-md-12" v-else>
                <input
                  v-model="param.value"
                  type=""
                  id="title"
                  :required="true"
                  class="form-control w-100"
                  :disabled="done"
                />
                <div
                  v-if="!done"
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <button class="btn btn-link center" @click="update()">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
    <hf-pop-up
     :id="data.title"      
  Header="Sign Message">   
 <hf-notes :notes="message_sign"></hf-notes>
      <div class="text-center">
      <hf-buttons
      name="Sign"
      @executeAction="getSignAndWalletAddress"
      />
      </div>  
  </hf-pop-up>
  </b-card>
</template>
<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
import {web3modal} from "../../../mixins/myWallet"
import {watchAccount,disconnect } from "@wagmi/core";
import signWallet from "../../../mixins/collectWallet"
import eventBus from "../../../eventBus.js";
import apiClient from "../../../mixins/apiClientMixin.js";
import {
  isValidURL,
  isValidText,
  isEmpty,
} from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import HfPopUp from "../../elements/HfPopUp.vue"
import HfNotes from "../../elements/HfNotes.vue"
import HfButtons from "../../elements/HfButtons.vue"
const checkWalletAddress = require('multicoin-address-validator');
export default {
  name: "MaticNetwork",
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
  HfPopUp,HfNotes,HfButtons
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
      unsubscribe:null,
      web3modal:web3modal,      
      unwatchAccount:null,
      walletAddress:'',
      index:0,
      visible: false,      
      signature: "",
      message_sign: "You are signing this message to ensure your participation in this event",
      value: {
        contractAddress: "",
        thresholdBalance: 0,
        contractABI: "",
        methods: null,
        paramsList: [],
        operand: null,
        operator: "",
        returnType: "",
      },
    };
  },
  updated(){
    if (this.data.value && typeof(this.data.value) === "object") {    
      Object.assign(this.value,  {...this.data.value} )
      this.updatedParamsList();
    }
  },
  mounted() {    
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);

    if (this.data.value && typeof(this.data.value) === "object") {
      Object.assign(this.value, { ...this.data.value });
      this.updatedParamsList();
    }
  },
  methods: {
    updatedParamsList(){
      let s = this.value.methods;
      if(!s){
        return
      } 
      s = s.substring(s.indexOf("(") + 1, s.indexOf(")"));
      if (s !== "") {
        s = s.split(",");

        for (let i = 0; i < s.length; i++) {
          if (this.value.paramsList.length !== 0) {
            break;
          } else {
            this.value.paramsList.push({ name: s[i], value: "" });
          }
        }
      }
    },
    cleanValue(){
      this.value = {
        contractAddress: "",
        thresholdBalance: 0,
        contractABI: "",
        methods: null,
        paramsList: [],
        operand: null,
        operator: "",
        returnType: "",
        condition: "",
      }
    },
    async getSignAndWalletAddress(){
      try{
      const {modalClose,address, signature } = await signWallet()         
      if(modalClose===true){        
        this.signature = signature;          
        this.value.paramsList[this.index].value = address;        
        this.walletAddress= address
        this.$root.$emit('bv::hide::modal',this.data.title);  
      }
      }catch(e){        
        this.notifyErr(e)
      }
    },
    async invokeWallet(e) {               
      try {         
        this.index = e;               
        if(!(this.data.value.hasOwnProperty('userWalletAddress')) && localStorage.getItem('wagmi.store')){          
          const getDataFromLocalStorage = localStorage.getItem('wagmi.store')          
          const parsed = JSON.parse(getDataFromLocalStorage)          
          if(parsed.state.data.hasOwnProperty('account')){            
            if(this.signature===""){                            
            this.$root.$emit('bv::show::modal',this.data.title);
            }else{             
              await this.web3modal.openModal();                            
            }           
          }else{                                      
            await this.web3modal.openModal()            
          }                 
        } 
        this.unsubscribe =  this.web3modal.subscribeModal((newState)=>{          
          if(newState.open === false){          
          this.unwatchAccount();          
          }           
        }) 
        this.unwatchAccount = watchAccount(async account=>{            
          if(account.isConnected === true && this.signature===""){                                 
            this.$root.$emit('bv::show::modal',this.data.title);                                         
          }if(account.isDisconnected === false){                                
            this.$root.$emit('bv::hide::modal',this.data.title);            
            this.signature = ""           
          }        
        })             
      } catch (error) {        
        return this.notifyErr(error.message);
      }
    },
    emitToUpdate() {      
      const { contractAddress, paramsList } = this.value;
      const valueToStore = {
        contractAddress, paramsList
      }
      this.value.condition = "Condition True";

      this.$emit(
        "input",
        JSON.stringify({
          ...valueToStore,
        })
      );
    },
    async update() {
    if(!this.isFieldValid()){
      return this.notifyErr(Messages.EVENT_ACTIONS.WALLETCONNECT.CONNECT_WALLET);
    }
      try {
        let result = await this.execute();
        switch (this.value.operator) {
          case "===": {
            switch (this.value.returnType) {
              case "uint8":
              case "uint256": {
                result = Number.parseFloat(result);
                this.value.operand = Number.parseFloat(this.value.operand);
                if (this.value.operand === result) {
                  this.emitToUpdate()

                } else {
                  throw new Error("Condition Mismatch");
                }
                break;
              }
              case "string":
              case "address": {
                if (this.value.operand === result) {
                  this.emitToUpdate()
                } else {
                  this.notifyErr("Condition Mismatch");
                }
                break;
              }
              case "bool": {
                this.value.operand  = (this.value.operand  === "true");
                if (this.value.operand === result) {
                  this.emitToUpdate()
                } else {
                  this.notifyErr("Condition Mismatch");
                }
                break;
              }
              default:
                break;
            }

            break;
          }
          case "<": {
            switch (this.value.returnType) {
              case "uint8":
              case "uint256": {
                result = Number.parseFloat(result);
                this.value.operand = Number.parseFloat(this.value.operand);
                if (result < this.value.operand) {
                  this.emitToUpdate()
                } else {
                  throw new Error("Condition Mismatch");
                }
              }
            }
            break;
          }
          case ">": {
            switch (this.value.returnType) {
              case "uint8":
              case "uint256": {
                result = Number.parseFloat(result);
                this.value.operand = Number.parseFloat(this.value.operand);
                if (result > this.value.operand) {
                  this.emitToUpdate()
                } else {
                  throw new Error("Condition Mismatch");
                }
              }
            }
            break;
          }

          case "<==": {
            switch (this.value.returnType) {
              case "uint8":
              case "uint256": {
                result = Number.parseFloat(result);
                this.value.operand = Number.parseFloat(this.value.operand);
                if (result <= this.value.operand) {
                  this.emitToUpdate()
                } else {
                  throw new Error("Condition Mismatch");
                }
              }
            }
            break;
          }
          case ">==": {
            switch (this.value.returnType) {
              case "uint8":
              case "uint256": {
                result = Number.parseFloat(result);
                this.value.operand = Number.parseFloat(this.value.operand);
                if (result >= this.value.operand) {
                  this.emitToUpdate()
                } else {
                  throw new Error("Condition Mismatch");
                }
              }
            }
            break;
          }
          default:
            break;
        }
      } catch (error) {
        this.data.value = "";
        return this.notifyErr(error);
      }
    },    
    isFieldValid() {
      if (isEmpty(this.walletAddress)) {
        return false;
      }
      if (isValidURL(this.walletAddress)) {
        return false;
      }
      if (!isValidText(this.walletAddress)) {
        return false;
      }
      if(!checkWalletAddress.validate(this.walletAddress,'Ethereum','eth')){
        return false;
      }
      return true;
    },
    async execute() {
      const body = {
        actionType: this.data.type,
        contractAddress: this.value.contractAddress,
        methods: this.value.methods,
        paramsList: this.value.paramsList,
        contractABI: this.value.contractABI,
      };
      let url = `${this.$config.studioServer.BASE_URL}api/v1/action/contract/execute`;

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

      const result = res.data;

      return result;
    },
  async disableInput(data) {
      this.data.isDone = data;
      if(data === true){      
      this.unwatchAccount();
      this.unsubscribe();              
      await disconnect();                
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
