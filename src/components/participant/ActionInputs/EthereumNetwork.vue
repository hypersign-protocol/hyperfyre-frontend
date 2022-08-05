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
          <img src="/img/ethereum.2b470564.svg" height="25px" />
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
            <div class="row g-3 align-items-center" v-for="(param, index) in value.paramsList" v-bind:key="index">
              <div class="col-lg-12 col-md-12" v-if="param.name === 'address'">
                <div v-if="!showerror">
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
                    <button class="btn btn-link" @click="invokeMetamask(index)">Connect Metamask</button>
                    <button class="btn btn-link" @click="update()">Continue</button>
                  </div>
                </div>

                <div v-else>
                  <ErrorMessage errorMessage="Install Metamask browser extension" v-if="!done" />
                  <input
                    v-model="param.value"
                    type=""
                    id="title"
                    :required="true"
                    class="form-control w-100"
                    :disabled="true"
                    v-else
                  />
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

                <div v-if="!done" cols="12" sm="12" md="12">
                  <button class="btn btn-link center" @click="update()">Continue</button>
                </div>
              </div>
            </div>
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
import config from "../../../config.js";
import eventBus from "../../../eventBus.js";
import apiClient from "../../../mixins/apiClientMixin.js";
// import {
//   isValidURL,
//   isValidText,
//   isEmpty,
// } from "../../../mixins/fieldValidationMixin";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import ErrorMessage from "../ErrorMessage.vue";
import Web3 from "web3";
export default {
  name: "EthereumNetwork",
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
    },
  },
  components: {
    ErrorMessage,
  },
  computed: {
    buttonThemeCss() {
      return {
        "--button-bg-color": this.themeData.buttonBGColor,
        "--button-text-color": this.themeData.buttonTextColor,
      };
    },
  },
  data() {
    return {
      visible: false,
      showerror: false,
      signature: "",
      message_sign: "",
      value: {
        contractAddress: "",
        thresholdBalance: 0,
        contractABI: "",
        methods: null,
        paramsList: [],
        operand: null,
        operator: "",
        returnType: "",
        condition: "",
      },
    };
  },
  updated() {
    if (this.data.value && typeof this.data.value === "object") {
      Object.assign(this.value, { ...this.data.value });
      this.updatedParamsList();
    }
  },
  mounted() {
    this.cleanValue();
    this.checkWeb3Injection();
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);

    if (this.data.value && typeof this.data.value === "object") {
      Object.assign(this.value, { ...this.data.value });
      this.updatedParamsList();
    }
  },
  methods: {
    updatedParamsList() {
      let s = this.value.methods;
      if (!s) {
        return;
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
    cleanValue() {
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
      };
    },

    checkWeb3Injection() {
      try {
        if (window.ethereum && window.ethereum.isMetaMask) {
          this.web3 = new Web3(window.ethereum);
        } else {
          this.showerror = true;
        }
      } catch (error) {
        console.log(error);
        this.showerror = true;
      }
    },
    async signMessage() {
      const message = "You are Signing this message to ensure your participation in this event";
      this.message_sign = message;
      return await this.web3.eth.personal.sign(message, window.ethereum.selectedAddress);
    },
    async invokeMetamask(e) {
      console.log(e);
      try {
        if (window.ethereum.isMetaMask) {
          const wallet = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          this.signature = await this.signMessage();

          const generatedWalletAddr = await this.web3.eth.personal.ecRecover(this.message_sign, this.signature);

          let isSigVerified = false;
          if (generatedWalletAddr === wallet[0]) {
            isSigVerified = true;
          }

          if (isSigVerified) {
            console.log(this.value.paramsList);
            this.value.paramsList[e].value = wallet[0];
          } else {
            return this.notifyErr(Messages.EVENT_ACTIONS.ETH.INVALID_SIG);
          }
        }
      } catch (error) {
        return this.notifyErr(error.message);
      }
    },

    emitToUpdate() {
      //this.notifySuccess("Success");
      const { contractAddress, paramsList } = this.value;
      const valueToStore = {
        contractAddress,
        paramsList,
      };
      this.value.condition = "Condition True";

      this.$emit(
        "input",
        JSON.stringify({
          ...valueToStore,
        })
      );
    },
    async update() {
      try {
        let result = await this.execute();
        // if (balance !== undefined) {
        //   if (balance >= Number.parseFloat(this.value.thresholdBalance)) {
        //     this.$emit(
        //       "input",
        //       JSON.stringify({
        //         ...this.value,
        //       })
        //     );
        //   } else {
        //     throw new Error(Messages.EVENT_ACTIONS.ETH.INSUFFICIENT_BALANCE);
        //   }
        // }

        switch (this.value.operator) {
          case "===": {
            switch (this.value.returnType) {
              case "uint8":
              case "uint256": {
                result = Number.parseFloat(result);
                this.value.operand = Number.parseFloat(this.value.operand);
                if (this.value.operand === result) {
                  this.emitToUpdate();
                } else {
                  throw new Error("Condition Mismatch");
                }
                break;
              }
              case "string":
              case "address": {
                if (this.value.operand === result) {
                  this.emitToUpdate();
                } else {
                  this.notifyErr("Condition Mismatch");
                }
                break;
              }
              case "bool": {
                this.value.operand = this.value.operand === "true";
                if (this.value.operand === result) {
                  this.emitToUpdate();
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
                  this.emitToUpdate();
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
                  this.emitToUpdate();
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
                  this.emitToUpdate();
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
                  this.emitToUpdate();
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
        this.value.condition = "Condition False";
        return this.notifyErr(error);
      }
    },
    // ,
    // isFieldValid() {
    //   if (isEmpty(this.value.userWalletAddress)) {
    //     return false;
    //   }
    //   if (isValidURL(this.value.userWalletAddress)) {
    //     return false;
    //   }
    //   if (!isValidText(this.value.userWalletAddress)) {
    //     return false;
    //   }
    //   return true;
    // }
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
    disableInput(data) {
      this.data.isDone = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
