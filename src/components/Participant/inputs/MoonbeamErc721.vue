<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      class="px-0 font-14 line-h-17 white--text font-weight--medium"
    >
      <div class="d-flex align-center">
        <img src="@/assets/images/moonbeam.png" class="mr-2" height="22" />
        {{ data.title }}
      </div>
      <template v-slot:actions>
        <v-chip
          class="black--text font-weight-bold"
          color="green"
          small
          label
          @click="update()"
          v-if="!done"
        >
          +{{ data.score }}
        </v-chip>
        <img src="@/assets/images/check.svg" v-if="done" />
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-row align-center justify-space-between">
        <template v-if="!showerror">
          <v-text-field
            v-model="value.userWalletAddress"
            hide-details="auto"
            dark
            flat
            solo
            outlined
            class="form-input mb-2"
            :disabled="true"
            :placeholder="data.placeHolder"
          ></v-text-field>
        </template>
        <template v-else>
          <p class="font-14 line-h-17 white--text mb-2 font-weight--medium">
            Install Metamask browser extension
          </p>
        </template>
        <v-btn
          v-if="!done && !showerror"
          @click="invokeMetamask"
          :ripple="false"
          class="height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text mr-4"
          depressed
          icon
          rounded
          x-large
        >
          <img src="@/assets/images/metamask.svg" height="25px" width="25px" />
        </v-btn>
      </div>
      <div class="d-flex align-center justify-center">
        <v-btn
          v-if="!done"
          @click="update"
          :ripple="false"
          text
          class="height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text mr-4"
          depressed
          rounded
          x-large
        >
          Continue
        </v-btn>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import eventBus from "@/eventBus.js";
import apiClient from "@/mixins/apiClientMixin.js";
import {
  isValidURL,
  isValidText,
  isEmpty,
} from "@/mixins/fieldValidationMixin";
import notificationMixins from "@/mixins/notificationMixins";
import Messages from "@/utils/messages/participants/en";
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
  },
  data() {
    return {
      visible: false,
      done: this.data.isDone,
      authToken: localStorage.getItem("authToken"),
      showerror: false,
      signature: "",
      message_sign: "",
      value: {
        contractAddress: "",
        userWalletAddress: "",
        thresholdBalance: 0,
      },
    };
  },
  mounted() {
    if (this.data.value) {
      Object.assign(this.value, { ...JSON.parse(this.data.value) });
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
          this.signature = await this.signMessage();

          const generatedWalletAddr = await this.web3.eth.personal.ecRecover(
            this.message_sign,
            this.signature
          );

          let isSigVerified = false;
          if (generatedWalletAddr === wallet[0]) {
            isSigVerified = true;
          }

          if (isSigVerified) {
            this.value.userWalletAddress = wallet[0];
          } else {
            this.$store.dispatch("snackbar/SHOW", {
              type: "error",
              message: Messages.EVENT_ACTIONS.ETH.INVALID_SIG,
            });
          }
        }
      } catch (error) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: error.message,
        });
      }
    },
    async update() {
      if (!this.isFieldValid() || this.value.userWalletAddress === "") {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.ETH.CONNECT_METAMASK,
        });
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
              this.$store.dispatch("snackbar/SHOW", {
                type: "error",
                message: Messages.EVENT_ACTIONS.ETH.INSUFFICIENT_BALANCE,
              });
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
      this.done = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
