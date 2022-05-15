<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      class="px-0 font-14 line-h-17 white--text font-weight--medium"
    >
      <div class="d-flex align-center">
        <img src="@/assets/images/Reef.svg" class="mr-2" height="22" />
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
      <div class="d-flex flex-column align-center justify-center">
        <v-form
          v-model="data.isManadatory"
          lazy-validation
          ref="form"
          class="text-center w-100"
        >
          <template v-if="!showerror">
            <v-select
              :disabled="done"
              v-model="value.userWalletAddress"
              :rules="rules.input"
              :items="options"
              item-text="text"
              item-value="value"
              hide-details="auto"
              dark
              flat
              solo
              outlined
              class="form-input"
            ></v-select>
          </template>
          <template v-else>
            <p class="font-14 line-h-17 white--text mb-2 font-weight--medium">
              Install Reef browser extension
            </p>
          </template>

          <div class="d-flex flex-row align-center justify-space-between">
            <v-btn
              v-if="!done"
              @click="update"
              :ripple="false"
              text
              class="height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
              depressed
              rounded
              x-large
            >
              Continue
            </v-btn>
          </div>
        </v-form>
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

export default {
  name: "ReefErc721",
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
      rules: {
        input: [(v) => !!v || "Please fill in the field"],
      },
      visible: false,
      done: this.data.isDone,
      authToken: localStorage.getItem("authToken"),
      showerror: false,
      signature: "",
      message_sign: "You are Signing this Message to confirm your Paricipation",

      options: [{ value: "", text: "Please select your reef wallet" }],
      value: {
        contractAddress: "",
        userWalletAddress: "",
        thresholdBalance: 0,
      },
      wallet: [],
      walletSignObj: "",
    };
  },

  async mounted() {
    if (this.data.value) {
      Object.assign(this.value, { ...JSON.parse(this.data.value) });
    }
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
    await this.checkWeb3Injection();
    await this.invokeReef();
    await this.fetchAccounts();
  },
  methods: {
    async checkWeb3Injection() {
      try {
        if (window.injectedWeb3) {
          this.web3 = await window.injectedWeb3;
        } else {
          this.showerror = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAccounts() {
      for (let i in this.wallet) {
        this.options.push({
          value: this.wallet[i],
          text:
            "Address: " +
            this.wallet[i].address.slice(0, 12) +
            "..." +
            this.wallet[i].address.slice(38, 48) +
            "  Name: " +
            this.wallet[i].name,
        });
      }
    },
    async invokeReef() {
      try {
        if (this.web3.reef) {
          await window.injectedWeb3.reef.enable().then(async (walletObj) => {
            this.wallet = await walletObj.accounts.get();
            this.walletSignObj = walletObj;
          });

          // const walletAddr= await wallet.get
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
          message: Messages.EVENT_ACTIONS.REEF.CONNECT_REEF_WALLET,
        });
      } else {
        try {
          let balance = await this.fetchBalance();
          if (balance !== undefined) {
            if (balance >= Number.parseFloat(this.value.thresholdBalance)) {
              this.value.contractAddress = this.value.contractAddress.address;
              //console.log(JSON.stringify({...this.value}));
              this.value.userBalance = balance;
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
      this.signature = await this.walletSignObj.signer.signRaw(
        this.value.userWalletAddress
      );
      const body = {
        actionType: this.data.type,
        data: this.value.userWalletAddress.address,
        contractAddress: this.value.contractAddress,
        signature: this.signature,
        message: this.message_sign,
      };
      let url = `${this.$config.studioServer.BASE_URL}api/v1/action/contract/reefNft`;

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
      this.done = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
