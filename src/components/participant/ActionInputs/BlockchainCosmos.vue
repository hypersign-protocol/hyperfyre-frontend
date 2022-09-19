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
          <img src="../../../assets/cosmos-2.svg" height="25px" />
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
                v-model="userWalletAddress"
                :disabled="true"
                :required="data.isManadatory"
              ></b-form-input>
            </div>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col cols="12" sm="12" md="12">
               <ErrorMessage errorMessage="Install Keplr browser extension" v-if="!done"/>
            <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="userWalletAddress"
                :disabled="true"
                :required="data.isManadatory"
              v-else></b-form-input>
          </b-col>
        </b-row>
        <b-row v-if="!done && !showerror">
         <b-col class= "btn-group" cols="12" sm="12" md="12">
            <button class="btn btn-link" @click="invokeKeplr()">Connect Keplr</button>
            <button class="btn btn-link" @click="update()">Continue</button>   
          </b-col>  
        </b-row>
      </b-card-body>
    </b-collapse>
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
import eventBus from "../../../eventBus.js";
import {
  isValidURL,
  isValidText,
  isEmpty,
} from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import { SigningCosmosClient } from "@cosmjs/launchpad";
import Messages from "../../../utils/messages/participants/en";
import ErrorMessage from "../ErrorMessage.vue";
export default {
  name: "BlockchainCosmos",
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
      userWalletAddress: "",
    };
  },
  updated(){
    if(this.data.isDone && this.data.value){
      if (this.userWalletAddress === "") {
      this.userWalletAddress = this.data.value
    } else {
      this.userWalletAddress = this.userWalletAddress;
    }
    }
  },
  mounted() {
   if(this.data.isDone && this.data.value){
      if (this.userWalletAddress === "") {
      this.userWalletAddress = this.data.value
    } else {
      this.userWalletAddress = this.userWalletAddress;
    }
    }
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
    this.checkWalletInjection();
  },
  methods: {
    checkWalletInjection() {
      if (!window.keplr) {
        this.showerror = true
      }
    },
    async invokeKeplr() {
      try {
        if (!window.keplr) {
        this.notifyErr("Please install keplr browser extension");
        } else {
        const chainId = this.data.value;
        await window.keplr.enable(chainId);
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        const cosmJS = new SigningCosmosClient(
        "https://lcd-cosmoshub.keplr.app/rest",
        accounts[0].address,
        offlineSigner,
        );
        this.userWalletAddress = cosmJS.anyValidAddress
      }
    } catch (error) {
      return this.notifyErr(error.message);
  }
},
    async update() {
      if (!this.isFieldValid() || this.userWalletAddress === "") {
        return this.notifyErr(Messages.EVENT_ACTIONS.COSMOS.CONNECT_KEPLR_WALLET);
      } else {
        this.$emit("input",this.userWalletAddress)
      }
    },
    isFieldValid() {
      if (isEmpty(this.userWalletAddress)) {
        return false;
      }
      if (isValidURL(this.userWalletAddress)) {
        return false;
      }
      if (!isValidText(this.userWalletAddress)) {
        return false;
      }
      return true;
    },
    disableInput(data) {
      this.data.isDone = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
