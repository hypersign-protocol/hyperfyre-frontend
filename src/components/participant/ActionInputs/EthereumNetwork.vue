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
            <!-- <div class="metamask">
              <b-form-input
                type="text"
                :placeholder="data.placeHolder"
                v-model="value.userWalletAddress"
                :disabled="true"
                :required="data.isManadatory"
              ></b-form-input>
              <button
                class="btn text-black"
                @click="invokeMetamask()"
                v-if="!done"
              >
                <img
                  src="../../../assets/metamask.svg"
                  height="25px"
                  width="25px"
                />
              </button>
            </div> -->
            <div class="row g-3 align-items-center w-100 mt-4">
              <div class="text-left col-lg-3 col-md-3 text-left">
                <label for="title" class="col-form-label font-weight-bold"
                  >Method Name<span style="color: red">*</span>:
                </label>
              </div>

              <div class="col-lg-8 col-md-8 px-0">
                <input
                  v-model="value.methods"
                  type=""
                  id="title"
                  :required="true"
                  class="form-control w-100 font-weight-bold"
                  :disabled="true"
                />
              </div>
            </div>

            <div
              class="row g-3 align-items-center w-100 mt-4"
              v-for="(param, index) in value.paramsList"
              v-bind:key="index"
            >
              <div class="text-left col-lg-3 col-md-3 text-left">
                <label for="title" class="col-form-label"
                  >{{ param.name }}<span style="color: red">*</span>:
                </label>
              </div>

              <div
                class="col-lg-9 col-md-9 px-0 metamask"
                v-if="param.name === 'address'"
              >
                <input
                  v-model="param.value"
                  type=""
                  id="title"
                  :required="true"
                  class="form-control w-100"
                  :disabled="true"
                />
                <button
                  class="btn text-black"
                  @click="invokeMetamask(index)"
                  v-if="!done"
                >
                  <img
                    src="../../../assets/metamask.svg"
                    height="25px"
                    width="25px"
                  />
                </button>
              </div>
              <div class="col-lg-8 col-md-8 px-0" v-else>
                <input
                  v-model="param.value"
                  type=""
                  id="title"
                  :required="true"
                  class="form-control w-100"
                  :disabled="done"
                />
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row v-else>
          <b-col cols="12" sm="12" md="12">
            <ErrorMessage errorMessage="Install Metamask browser extension" />
          </b-col>
        </b-row>
        <b-row v-if="!done">
          <b-col cols="12" sm="12" md="12">
            <button class="btn btn-link center" @click="update()">
              <!-- <button class="btn btn-link center" @click="getData()"> -->
              Continue / Execute
            </button>
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
  },
  components: {
    ErrorMessage,
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
  mounted() {
    this.checkWeb3Injection();
    if (this.data.value) {
      Object.assign(this.value, { ...JSON.parse(this.data.value) });
    }
    let s = this.value.methods;
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
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
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
    async invokeMetamask(e) {
      console.log(e);
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
                  this.notifySuccess("Success");
                  this.value.condition = "Condition True";
                  this.$emit(
                    "input",
                    JSON.stringify({
                      ...this.value,
                    })
                  );
                } else {
                  throw new Error("Condition Mismatch");
                }
                break;
              }
              case "string":
              case "address": {
                if (this.value.operand === result) {
                  this.notifySuccess("Success");
                  this.value.condition = "Condition True";
                  this.$emit(
                    "input",
                    JSON.stringify({
                      ...this.value,
                    })
                  );
                } else {
                  this.notifyErr("Condition Mismatch");
                }
                break;
              }
              case "bool": {
                if (!!this.value.operand === !!result) {
                  this.value.condition = "Condition True";
                  this.$emit(
                    "input",
                    JSON.stringify({
                      ...this.value,
                    })
                  );
                  this.notifySuccess("Success");
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
                  this.notifySuccess("Success");
                  this.value.condition = "Condition True";
                  this.$emit(
                    "input",
                    JSON.stringify({
                      ...this.value,
                    })
                  );
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
                  this.notifySuccess("Success");
                  this.value.condition = "Condition True";
                  this.$emit(
                    "input",
                    JSON.stringify({
                      ...this.value,
                    })
                  );
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
                  this.notifySuccess("Success");
                  this.value.condition = "Condition True";
                  this.$emit(
                    "input",
                    JSON.stringify({
                      ...this.value,
                    })
                  );
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
                  this.notifySuccess("Success");
                  this.value.condition = "Condition True";
                  this.$emit(
                    "input",
                    JSON.stringify({
                      ...this.value,
                    })
                  );
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
        console.log(result);
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
      this.done = data;
    },
  },
  mixins: [notificationMixins],
};
</script>
