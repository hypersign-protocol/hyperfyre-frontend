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
              <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="value.userWalletAddress"
                :disabled="true"
                :required="data.isManadatory"
              ></b-form-input>
            </div>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col cols="12" sm="12" md="12">
               <ErrorMessage errorMessage="Install Metamask browser extension" v-if="!done"/>
            <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="value.userWalletAddress"
                :disabled="true"
                :required="data.isManadatory"
              v-else></b-form-input>
          </b-col>
        </b-row>
        <b-row v-if="!done && !showerror">
         <b-col class= "btn-group" cols="12" sm="12" md="12">
            <button class="btn btn-link" @click="invokeMetamask()">Connect Wallet</button>
            <button class="btn btn-link" @click="update()">Continue</button>   
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
import eventBus from "../../../eventBus.js";
import signWallet from "../../../mixins/collectWallet"
import apiClient from "../../../mixins/apiClientMixin.js";
import {
  isValidURL,
  isValidText,
  isEmpty,
} from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import ErrorMessage from "../ErrorMessage.vue";
import HfPopUp from "../../elements/HfPopUp.vue"
import HfNotes from "../../elements/HfNotes.vue"
import HfButtons from "../../elements/HfButtons.vue"
export default {
  name: "EthereumErc20",
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
    ErrorMessage,HfPopUp,HfNotes,HfButtons
  },
computed:{
 buttonThemeCss() {
      return {
        '--button-bg-color': this.themeData.buttonBGColor,
        '--button-text-color': this.themeData.buttonTextColor
      }
     },     
  },
  data() {
    return {
      unsubscribe:null,
      web3modal:web3modal,      
      unwatchAccount:null,
      visible: false,
      showerror: false,
      signature: "",
      message_sign: "You are signing this message to ensure your participation in this event",
      value: {
        contractAddress: "",
        userWalletAddress: "",
        thresholdBalance: 0,
      },
    };
  },
  updated(){
    if (this.data.value && typeof(this.data.value) === "object") {
      Object.assign(this.value, { ...(this.data.value) });
    }
  },
  mounted() {
    if (this.data.value && typeof(this.data.value) === "object") {
      Object.assign(this.value, { ...(this.data.value) });
    }
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);     
  },
  methods: {
    async getSignAndWalletAddress(){
      try{
      const {modalClose,address, signature } = await signWallet()
      console.log(address)
      console.log(signature)      
      if(modalClose===true){        
        this.signature = signature;
        this.value.userWalletAddress = address        
        this.$root.$emit('bv::hide::modal',this.data.title);  
      }
      }catch(e){
        console.log(e)
        this.notifyErr(e)
      }
    },
    async invokeMetamask() {       
      console.log('in eth')
      try {                        
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
        console.log(error)
        return this.notifyErr(error.message);
      }
    },
    async update() {
      if (!this.isFieldValid() || this.value.userWalletAddress === "") {
        return this.notifyErr(Messages.EVENT_ACTIONS.ETH.CONNECT_METAMASK);
      } else {
        try {
          let balance = await this.fetchBalance();
          if (balance !== undefined) {
            if (balance >= Number.parseFloat(this.value.thresholdBalance)) {
              this.$emit(
                "input",
                JSON.stringify({
                  ...this.value,
                })
              );
            } else {
              throw new Error(Messages.EVENT_ACTIONS.ETH.INSUFFICIENT_BALANCE);
            }
          }
        } catch (error) {
          this.data.value = "";
          return this.notifyErr(error);
        }
      }
    },
    isFieldValid() {
      if (isEmpty(this.value.userWalletAddress)) {
        return false;
      }
      if (isValidURL(this.value.userWalletAddress)) {
        return false;
      }
      if (!isValidText(this.value.userWalletAddress)) {
        return false;
      }
      return true;
    },
    async fetchBalance() {
      const body = {
        actionType: this.data.type,
        data: this.value.userWalletAddress,
        contractAddress: this.value.contractAddress,
        signature: this.signature,
        message: this.message_sign,
      };
      let url = `${this.$config.studioServer.BASE_URL}api/v1/action/contract/call`;

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
