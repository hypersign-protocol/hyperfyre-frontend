<template>
  <b-card no-body class="action-wrap">
    <b-card-header :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="`collapse-${idValue}`" @click="visible = !visible">
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="../../../assets/moonbeam.png" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>

        <b-col cols="2" sm="2" md="2">
          <b-badge class="btn-score" @click="update()" v-if="!done">
            <img src="../../../assets/plus.svg" />
            {{ data.score }}
          </b-badge>
          <img class="check-mark" src="../../../assets/check-circle-fill.svg" height="25px" v-if="done" />
        </b-col>
      </b-row>
    </b-card-header>
    <b-collapse :id="`collapse-${idValue}`" v-model="visible">
      <b-card-body class="user-details">
        <b-row v-if="!showerror">
          <b-col cols="12" sm="12" md="12">
            <div class="metamask">
              <b-form-input type="text" :placeholder="data.placeHolder" v-model="value.userWalletAddress"
                :disabled="true" :required="data.isManadatory"></b-form-input>
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
          <b-col class="btn-group" cols="12" sm="12" md="12">
            <button class="btn btn-link" @click="invokeMetamask()">Connect Metamask</button>
            <button class="btn btn-link" @click="update()">Continue</button>
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
import Web3 from "web3";
export default {
  name: "MoonbeamErc20",
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
    }
  },
  components: {
    ErrorMessage,
  },
  data() {
    return {
      visible: false,      
      showerror: false,
      signature: "",
      message_sign: "",
      value: {
        contractAddress: "",
        userWalletAddress: "",
        thresholdBalance: 0
      }
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
    this.checkWeb3Injection();
  },
  methods: {
    checkWeb3Injection() {
      try {
       if (window.ethereum && window.ethereum.isMetaMask) {
          this.web3 = new Web3(window.ethereum);
        }
        
      } catch (error) {
        console.log(error);
        this.showerror = true;
        console.log(this.showerror);
      }
    },
    async signMessage() {
      const message =
        "You are Signing this message to ensure your participation in this event";
      this.message_sign = message;
      return await this.web3.eth.personal.sign(
        message,
        window.ethereum.selectedAddress
      );
    },
    async invokeMetamask() {
      try {
        if (window.ethereum.isMetaMask) {
          const wallet = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          this.signature  = await this.signMessage();
          
          const generatedWalletAddr = await this.web3.eth.personal.ecRecover(this.message_sign, this.signature)
          
          if(generatedWalletAddr === wallet[0]){
            this.value.userWalletAddress = wallet[0];
          } else{
            return this.notifyErr(Messages.EVENT_ACTIONS.ETH.INVALID_SIG)
          }
        } 
      } catch (error) {
        return this.notifyErr(error.message)
      }
    },
    async update() {
      if (!this.isFieldValid() || this.value.userWalletAddress === "") {
        return this.notifyErr(Messages.EVENT_ACTIONS.ETH.CONNECT_METAMASK);
      } else {
        try {
          let balance = await this.fetchBalance();
          if (balance !== undefined) {
            if (balance.Users_Nft >= Number.parseFloat(this.value.thresholdBalance)) {
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
      let url = `${this.$config.studioServer.BASE_URL}api/v1/action/contract/nft`;

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
    disableInput(data) {
this.data.isDone = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
