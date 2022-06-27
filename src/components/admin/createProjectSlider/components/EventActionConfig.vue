<template>
  <div>
    <div
      v-if="eventActionList.length"
      style="overflow-y: auto"
      class="selected-media-wrapper d-flex p-2 mb-4"
    >
      <div
        @click="handleEventActionClick(idx)"
        v-for="(eventAction, idx) in eventActionList"
        v-bind:Key="idx"
      >
        <div
          v-if="!eventActionList[idx].isDeleted"
          :class="
            flash == idx
              ? 'flash card rounded m-1 p-1 d-flex flex-row align-items-center'
              : 'card rounded m-1 p-1 d-flex flex-row align-items-center pointer'
          "
          style="min-width: 120px"
        >
          <span>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('TWITTER')"
              class="fab fa-twitter"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('TELEGRAM')"
              class="fab fa-telegram-plane"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('INPUT_TEXT')"
              class="fas fa-file-alt"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('NUMBER')"
              class="fas fa-list-ol"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('DATE')"
              class="fas fa-calendar-minus"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('DISCORD')"
              class="fab fa-discord"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('INPUT_HYPERLINK')"
              class="fa fa-link"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('INFO_TEXT')"
              class="fa fa-info-circle"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('PRIZE_')"
              class="fas fa-gift"
            ></i>
            <i
              style="color: gray"
              v-if="eventAction.type.includes('SUMSUB_KYC')"
              class="fas fa-id-card"
            ></i>
            <img
              style="padding-right: 5px"
              src="../../../../assets/external-link.svg"
              v-if="eventAction.type.includes('HYPERLINK_URL')"
              height="22px"
            />
            <img
              style="padding-right: 5px"
              src="/img/ethereum.2b470564.svg"
              v-if="eventAction.type.includes('BLOCKCHAIN_ETH')"
              height="22px"
            />
            <img
              style="padding-right: 5px"
              src="/img/ethereum.2b470564.svg"
              v-if="eventAction.type.includes('ETHEREUM_')"
              height="22px"
            />

            <img
              style="padding-right: 5px"
              src="../../../../assets/matic-logo.svg"
              v-if="eventAction.type.includes('MATIC_')"
              height="20px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/binance-logo.svg"
              v-if="eventAction.type.includes('BINANCE_')"
              height="20px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/Reef.svg"
              v-if="eventAction.type.includes('REEF_')"
              height="20px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/moonbase-alpha.svg"
              v-if="eventAction.type.includes('MOON_')"
              height="22px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/moon-river.png"
              v-if="eventAction.type.includes('MOONRIVER_')"
              height="20px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/moonbeam.png"
              v-if="eventAction.type.includes('MOONBEAM_')"
              height="20px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/tezos.png"
              v-if="eventAction.type.includes('BLOCKCHAIN_TEZ')"
              height="22px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/cardano_128.png"
              v-if="eventAction.type.includes('BLOCKCHAIN_CARDANO')"
              height="22px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/binance-logo.svg"
              v-if="eventAction.type.includes('BLOCKCHAIN_BSC')"
              height="22px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/matic-logo.svg"
              v-if="eventAction.type.includes('BLOCKCHAIN_MATIC')"
              height="20px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/harmony.png"
              v-if="eventAction.type.includes('BLOCKCHAIN_ONE')"
              height="20px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/avalanche.png"
              v-if="eventAction.type.includes('BLOCKCHAIN_AVAX')"
              height="20px"
            />
            <img
              style="padding-right: 5px"
              src="../../../../assets/Reef.svg"
              v-if="eventAction.type.includes('BLOCKCHAIN_REEF')"
              height="20px"
            />
          </span>
          <span>{{ truncate1(eventAction.title, 6) }}</span>
          <span style="color: gray; padding-left: 5px"
            ><i style="" class="fas fa-minus-circle"></i
          ></span>
        </div>
      </div>
    </div>

    <div>
      <div class="row g-3 align-items-center w-100 mt-4" v-if="!prize">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="type" class="col-form-label"
            >Type<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <b-form-select
            v-model="selected.type"
            :options="options"
          ></b-form-select>
        </div>
      </div>

      <!--Prize Configuration -->
      <div class="row g-3 align-items-center w-100 mt-4" v-if="prize">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="type" class="col-form-label"
            >Type<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <b-form-select
            v-model="prizeDetails.type"
            :options="options"
          ></b-form-select>
        </div>
      </div>
      <div class="row g-3 align-items-center w-100 mt-4" v-if="prize">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="prize" class="col-form-label"
            >Prize name<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.title"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Please enter prize name"
          />
        </div>
      </div>
      <div class="row g-3 align-items-center w-100 mt-4" v-if="prize">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="winners" class="col-form-label"
            >Number of Winners<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="prizeDetails.winners"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Please enter number of winners "
          />
        </div>
      </div>
      <div class="row g-3 align-items-center w-100 mt-4" v-if="prize">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="prixeValue" class="col-form-label"
            >Prize Per Winner<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="prizeDetails.prizeValue"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Please enter prize per winner"
          />
        </div>
      </div>

      <!--kyc Config -->
      <!-- <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType === 'KYC'">
         <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Kyc slug<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
        <input
            v-model="selected.slug"
            type="text"
            id="slug"
            class="form-control w-100"

          />
        </div>
      </div> -->
      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType === 'KYC'"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="prixeValue" class="col-form-label"
            >Kyc Slug<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.slug"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Enter KYC slug"
          />
        </div>
      </div>
      <!-- end kyc-->
      <!-- contract address -->
      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType === 'SMARTCONTRACT'"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Contract Address<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="contract.contractAddress"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Please enter ERC20 or compatible contract address"
          />
        </div>
      </div>
      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType === 'SMARTCONTRACT' && selected.type === null"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Threshold Balance<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="contract.thresholdBalance"
            type="number"
            id="title"
            class="form-control w-100"
            placeholder="Enter minimum balance a user should have"
          />
        </div>
      </div>
      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-else-if="
          eventActionType === 'SMARTCONTRACT' && selected.type.includes('ERC20')
        "
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Threshold Balance<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="contract.thresholdBalance"
            type="number"
            id="title"
            class="form-control w-100"
            placeholder="Enter minimum balance a user should have"
          />
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-else-if="
          eventActionType === 'SMARTCONTRACT' &&
          selected.type.includes('ERC721')
        "
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Threshold NFT Count<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="contract.thresholdBalance"
            type="number"
            id="title"
            class="form-control w-100"
            placeholder="Enter minimum balance a user should have"
          />
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType === 'CUSTOMCONTRACT'"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Contract Address<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="contract.contractAddress"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Please enter compatible contract address"
          />
        </div>
      </div>
      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType === 'CUSTOMCONTRACT'"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Contract ABI<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <codemirror
            ref="json-cm"
            v-model="contract.contractABI"
            :options="cmOptions"
            @input="onCmCodeChange"
          ></codemirror>
        </div>
      </div>
      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType === 'CUSTOMCONTRACT'"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="type" class="col-form-label"
            >Contract ABI Method<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <b-form-select
            v-model="contract.methods"
            :options="allMethods"
            @change="changeReturnType"
          ></b-form-select>
        </div>
      </div>
      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType === 'CUSTOMCONTRACT'"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="type" class="col-form-label"
            >Condition<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-2 col-md-2 px-0">
          <input
            v-model="contract.returnType"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="return type"
            disabled="true"
          />
        </div>
        <div class="col-lg-2 col-md-2 px-0">
          <b-form-select
            v-model="contract.operator"
            :options="allCondition"
          ></b-form-select>
        </div>
        <div class="col-lg-5 col-md- px-0">
          <input
            v-model="contract.operand"
            type="text"
            id="title"
            class="form-control w-100"
            placeholder="Enter Condition Value"
          />
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="eventActionType != 'PRIZE' && eventActionType !== 'TAGS'"
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Title<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.title"
            type="text"
            id="title"
            class="form-control w-100"
          />
        </div>
      </div>

      <div class="row g-3 align-items-center w-100 mt-4" v-if="info">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Info<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <markdown-editor
            toolbar=" numlist bullist code quote bold italic heading link preview fullscreen "
            theme="success"
            v-model="selected.value"
          ></markdown-editor>
        </div>
      </div>
      <!-- HyperlinkUrl -->
      <div class="row g-3 align-items-center w-100 mt-4" v-if="url">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >URL<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.value"
            type="text"
            id="title"
            class="form-control w-100"
          />
        </div>
      </div>

      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="
          placeH &&
          eventActionType !== 'KYC' &&
          eventActionType !== 'CUSTOMCONTRACT'
        "
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="placeHolder" class="col-form-label">Place Holder: </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.placeHolder"
            type="text"
            id="placeHolder"
            class="form-control w-100"
          />
        </div>
      </div>
      <div
        class="row g-3 align-items-center w-100 mt-4"
        v-if="
          noSocialhandle &&
          eventActionType !== 'KYC' &&
          eventActionType !== 'CUSTOMCONTRACT'
        "
      >
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="value" class="col-form-label"
            >Social Handle<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.value"
            type="text"
            :placeholder="
              selected.type === null
                ? ''
                : 'Please Enter Your ' +
                  [[CapitaliseString(selected.type)]] +
                  ' ' +
                  'username without @'
            "
            id="value"
            class="form-control w-100"
          />
          <span class="inputInfo" v-if="selected.type === 'TELEGRAM_JOIN'"
            >Make sure to add
            <a
              target="_blank"
              :href="`https://telegram.me/hyperfyre_stage_bot?startgroup=any`"
              >Fyre Telegram Bot</a
            >
            in your public group, for this functionality to work properly.</span
          >
        </div>
      </div>
      <div class="row g-3 align-items-center w-100 mt-4" v-if="showRetweet">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="value" class="col-form-label"
            >Retweet URL<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.value"
            type="text"
            :placeholder="
              selected.type === null ? '' : 'Please Enter Your Retweet URL'
            "
            id="value"
            class="form-control w-100"
          />
        </div>
      </div>
      <div class="row g-3 align-items-center w-100 mt-4" v-if="showInvitelink">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="value" class="col-form-label"
            >Invite Link<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.value"
            type="text"
            :placeholder="
              selected.type === null
                ? ''
                : 'Please Enter Your Discord server invite link'
            "
            id="value"
            class="form-control w-100"
          />
        </div>
      </div>
      <div class="row g-3 align-items-center w-100 mt-4" v-if="!noScore">
        <div class="text-left col-lg-3 col-md-3 text-left">
          <label for="title" class="col-form-label"
            >Score<span style="color: red">*</span>:
          </label>
        </div>
        <div class="col-lg-9 col-md-9 px-0">
          <input
            v-model="selected.score"
            type="number"
            id="title"
            class="form-control w-100"
          />
        </div>
      </div>
      <div
        class="row g-3 justify-content-md-end w-100 mt-4"
        v-if="isCreate == true"
      >
        <div class="col-lg-6 col-md-9 px-0">
          <button
            @click="handleEventActionAdd()"
            class="btn button-theme"
            type="button"
          >
            {{ eventActionList.includes(selected) ? "Update" : "Add" }}
          </button>
        </div>
      </div>
      <div class="row g-3 justify-content-md-end w-100 mt-4" v-else>
        <div class="col-lg-6 col-md-9 px-0">
          <button
            @click="handleEventActionUpdate()"
            class="btn button-theme slight-left-margin"
            type="button"
          >
            Update
          </button>
          <button
            @click="handleEventActionDelete()"
            class="btn btn-danger slight-left-margin"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.inputInfo {
  color: #808080b5;
  font-size: smaller;
}

.pointer {
  cursor: pointer;
}
.selected-media-wrapper {
  border: 1px dashed;
  max-height: 100px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.card i {
  cursor: pointer;
}
.card {
  transition: all 0.5s;
}
.card i {
  margin-right: 4px;
}
.flash {
  cursor: pointer;
  background-color: #1faa596b;
  border: 0;
  box-shadow: 2px 0 10px rgb(0 0 0 / 10%);
  animation: flash 0.4s cubic-bezier(1, 0, 0, 1);
}

.fa-minus-circle {
  font-size: 14px;
}
@keyframes flash {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.button-theme {
  background-color: #f1b319;
  border-collapse: #f1b319;
  color: black;
  border: 0;
}
.slight-left-margin {
  margin-left: 2px;
}
</style>
<script>
import notificationMixins from "../../../../mixins/notificationMixins";
import {
  isEmpty,
  isValidURL,
  truncate,
  isdiscordLink,
  isContractValid,
  isretweetUrl,
  isNum,
  isValidTwitterUsername,
  isValidTelegramName,
} from "../../../../mixins/fieldValidationMixin";
import "v-markdown-editor/dist/v-markdown-editor.css";
import Messages from "../../../../utils/messages/admin/en";
import Vue from "vue";
import Editor from "v-markdown-editor";

import { codemirror } from "vue-codemirror";

// require styles
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";
import "codemirror/keymap/sublime";
import jsonlint from "jsonlint";
import { JSHINT } from "jshint";

import Web3 from "web3";
Vue.use(Editor);

window.JSHINT = JSHINT;
window.jsonlint = jsonlint;
export default {
  name: "EventActionCongif",
  components: { codemirror },
  filters: {
    pretty: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    },
  },
  props: {
    eventActionType: {
      type: String,
    },
    eventActionList: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
    },
    // allMethods:{
    //   type:Array,
    // }
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
    noSocialhandle() {
      if (
        this.eventActionType != "CUSTOM" &&
        this.eventActionType != "BLOCKCHAIN" &&
        this.eventActionType != "SMARTCONTRACT" &&
        this.selected.type != "TWITTER_RETWEET" &&
        this.selected.type != "DISCORD_JOIN" &&
        this.eventActionType != "PRIZE"
      ) {
        return true;
      } else {
        return false;
      }
    },
    url() {
      if (
        this.eventActionType === "CUSTOM" &&
        this.selected.type === "HYPERLINK_URL"
      ) {
        return true;
      } else {
        return false;
      }
    },

    placeH() {
      if (
        this.eventActionType != "SOCIAL" &&
        this.selected.type != "HYPERLINK_URL" &&
        this.selected.type != "INFO_TEXT" &&
        this.eventActionType != "PRIZE" &&
        this.selected.type != "REEF_ERC20" &&
        this.selected.type != "REEF_ERC721"
      ) {
        return true;
      } else {
        return false;
      }
    },
    info() {
      if (
        this.eventActionType === "CUSTOM" &&
        this.selected.type === "INFO_TEXT"
      ) {
        return true;
      } else {
        return false;
      }
    },
    noScore() {
      if (
        (this.eventActionType === "CUSTOM" &&
          this.selected.type === "INFO_TEXT") ||
        this.eventActionType === "PRIZE"
      ) {
        return true;
      } else {
        return false;
      }
    },
    showRetweet() {
      if (
        this.eventActionType === "SOCIAL" &&
        this.selected.type === "TWITTER_RETWEET"
      ) {
        return true;
      } else {
        return false;
      }
    },
    showInvitelink() {
      if (
        this.eventActionType === "SOCIAL" &&
        this.selected.type === "DISCORD_JOIN"
      ) {
        return true;
      } else {
        return false;
      }
    },
    prize() {
      if (this.eventActionType === "PRIZE") {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      allCondition: [
        { text: "None", value: null },
        { text: "=", value: "===" },
        { text: ">", value: ">" },
        { text: "<", value: "<" },
        { text: ">=", value: ">==" },
        { text: "<=", value: "<==" },
      ],
      cmOptions: {
        // codemirror options

        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "application/json",
        gutters: ["CodeMirror-lint-markers"],
        lineWrapping: true,
        theme: "default",
        lint: true,
        collapseIdentical: true,

        keyMap: "sublime",
        // more codemirror options,
      },
      // selectedEventActionType: this.eventActionType,
      allMethods: [{ text: "None", value: null }],
      flash: null,
      isCreate: true,
      currentSelectedId: 0,
      contract: {
        contractAddress: "",
        thresholdBalance: 0,
        contractABI: "",
        methods: null,
        operand: null,
        operator: "",
        returnType: "",
      },
      prizeDetails: {
        winners: "",
        prizeValue: "",
        type: null
      },
      selected: {
        type: null,
        title: "",
        placeHolder: "",
        isManadatory: true,
        value: "",
        score: 10,
        id: "",
        slug: "",
      },

      hfTgBotId: this.$config.verifierBot.TELEGRAM,
    };
  },
  async mounted() {
    this.$root.$on("callClearFromProject", () => {
      this.clearSelected();
    });
  },
  methods: {
    async changeReturnType(method) {
      console.log(this.contract.returnType);
      for (let i = 0; i < this.code.length; i++) {
        if (this.code[i].name === method.split("(")[0]) {
          this.contract.returnType = this.code[i].outputs[0].type;
          break;
        }
      }
    },
    onCmCodeChange(newCode) {
      try {
        this.code = JSON.parse(newCode);
        const web3 = new Web3();              
        this.code=this.code.filter(e=>(e.stateMutability==="view" && e.type==="function" && e.outputs.length==1))      
        const newContract = new web3.eth.Contract(
          this.code,
          this.contract.contractAddress
        );
        this.allMethods = Object.keys(newContract.methods).filter(
          (e) => e.includes("(") && e.includes(")")
        );
      } catch (e) {
        console.log("Error Occured as the ABI is not getting parsed", e);
      }
    },
    CapitaliseString(string) {
      let res = string.split("_");
      let first = res[0][0].toUpperCase() + res[0].substring(1).toLowerCase();
      return first + " ";
    },
    removeSocialMedia(index) {
      this.currentSelectedId = index;
      this.handleEventActionDelete();
    },
    clearSelected() {
      this.flash = null;
      this.isCreate = true;
      let clearData = {
        type: null,
        title: "",
        placeHolder: "",
        isManadatory: true,
        value: "",
        score: 10,
        slug: "",
      };
      this.prizeDetails = {
        winners: "",
        prizeValue: "",
        type: null
      };
      this.contract = {
        contractAddress: "",
        thresholdBalance: 0,
        contractABI: "",
        methods: null,
        operand: null,
        operator: "",
        returnType: "",
      };

      this.selected = clearData;
      this.currentSelectedId = null;
    },
    handleEventActionValidation() {
      let isvalid = true;

      //////
      //// WARNINGS: This is worst way of handeling validation
      //// You should return or break the moment first error occured
      //// But here you are checking all validation every time - waste of time!
      ////////////
      switch (this.eventActionType) {
        case "SOCIAL":
          if (this.selected.type === null) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SOCIAL.SOCIAL_TYPE);
          } else if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.EMPTY_TITLE);
          } else if (isValidURL(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.TITLE_URL);
          } else if (
            (this.selected.type === "TWITTER_FOLLOW" ||
              this.selected.type === "TELEGRAM_JOIN") &&
            isEmpty(this.selected.value)
          ) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SOCIAL.SOCIAL_HANDLE_EMPTY);
          } else if (
            this.selected.type === "TWITTER_FOLLOW" &&
            isValidTwitterUsername(this.selected.value)
          ) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SOCIAL.INVALID_TWITTER_USERNAME
            );
          } else if (
            this.selected.type === "TWITTER_RETWEET" &&
            isEmpty(this.selected.value)
          ) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SOCIAL.RETWEET_NOT_EMPTY);
          } else if (
            this.selected.type === "TELEGRAM_JOIN" &&
            isValidTelegramName(this.selected.value)
          ) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SOCIAL.INVALID_TELEGRAM_USERNAME
            );
          } else if (
            this.selected.type === "DISCORD_JOIN" &&
            isEmpty(this.selected.value)
          ) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SOCIAL.INVITE_NOT_EMPTY);
          } else if (
            this.selected.type != "DISCORD_JOIN" &&
            this.selected.type != "TWITTER_RETWEET" &&
            isValidURL(this.selected.value)
          ) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SOCIAL.URL_IN_SOCIAL_HANDLE);
          } else if (
            this.selected.type === "TWITTER_RETWEET" &&
            isretweetUrl(this.selected.value)
          ) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SOCIAL.RETWEET_VALID_URL);
          } else if (
            this.selected.type === "DISCORD_JOIN" &&
            isdiscordLink(this.selected.value)
          ) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SOCIAL.INVALID_INVITE_LINK);
          } else if (isNaN(parseInt(this.selected.score))) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_NUM);
          } else if (parseInt(this.selected.score) < 0) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_POSITIVE_NUM);
          }
          break;
        case "CUSTOM":
          if (this.selected.type === null) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOM.CUSTOM_TYPE);
          } else if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.EMPTY_TITLE);
          } else if (isValidURL(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.TITLE_URL);
          } else if (this.selected.type === "INFO_TEXT") {
            if (isEmpty(this.selected.value)) {
              isvalid = false;
              this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOM.EMPTY_INFO);
            }
          } else if (this.selected.type === "HYPERLINK_URL") {
            if (isEmpty(this.selected.value)) {
              isvalid = false;
              this.notifyErr(Messages.EVENTS.ACTIONS.CUSTOM.URL_NOT_EMPTY);
            } else if (
              !(
                this.selected.type === "HYPERLINK_URL" &&
                isValidURL(this.selected.value)
              )
            ) {
              isvalid = false;
              this.notifyErr(Messages.EVENTS.ACTIONS.VALID_URL);
            } else if (isNaN(parseInt(this.selected.score))) {
              isvalid = false;
              this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_NUM);
            } else if (parseInt(this.selected.score) < 0) {
              isvalid = false;
              this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_POSITIVE_NUM);
            }
          } else if (isNaN(parseInt(this.selected.score))) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_NUM);
          } else if (parseInt(this.selected.score) < 0) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_POSITIVE_NUM);
          }
          break;
        case "BLOCKCHAIN":
          if (this.selected.type === null) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.BLOCKCHAIN.CHOOSE_TYPE);
          } else if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.EMPTY_TITLE);
          } else if (isValidURL(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.TITLE_URL);
          } else if (isNaN(parseInt(this.selected.score))) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_NUM);
          } else if (parseInt(this.selected.score) < 0) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_POSITIVE_NUM);
          }
          break;
        case "SMARTCONTRACT":
          if (this.selected.type === null) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SMARTCONTRACT.CHOOSE_CONTRACT_TYPE
            );
          } else if (isEmpty(this.contract.contractAddress)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SMARTCONTRACT.ADDRESS_NOT_EMPTY
            );
          } else if (
            isNaN(parseFloat(this.contract.thresholdBalance)) ||
            parseFloat(this.contract.thresholdBalance) < 0
          ) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SMARTCONTRACT.THBALANCE_NOT_NEGATIVE
            );
          } else if (!isContractValid(this.contract.contractAddress)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SMARTCONTRACT.VALID_CONTRACT_ADDRESS
            );
          } else if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.EMPTY_TITLE);
          } else if (isValidURL(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.TITLE_URL);
          } else if (isNaN(parseInt(this.selected.score))) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_NUM);
          } else if (parseInt(this.selected.score) < 0) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_POSITIVE_NUM);
          }
          break;
        case "PRIZE":
          this.selected.type = "PRIZE_CARD"
          if (this.selected.type === null) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.PRIZECARD.PRIZE_TYPE);
          } else if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.PRIZECARD.PRIZE_NAME_NOT_EMPTY
            );
          } else if (isValidURL(this.selected.title)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.PRIZECARD.PRIZE_NAME_NOT_URL
            );
          } else if (isEmpty(this.prizeDetails.winners)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.PRIZECARD.EMPTY_NO_OF_WINNERS
            );
          } else if (
            isValidURL(this.prizeDetails.winners) ||
            !isNum(this.prizeDetails.winners)
          ) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.PRIZECARD.PRIZE_NUMBER_OF_WINNER
            );
          } else if (isEmpty(this.prizeDetails.prizeValue)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.PRIZECARD.EMPTY_PRIZE_PER_WINNER
            );
          } else if (isValidURL(this.prizeDetails.prizeValue)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.PRIZECARD.PRIZE_PER_WINNER_NOT_URL
            );
          }
          break;
        case "KYC": {
          if (this.selected.type === null) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.KYC_TYPE);
          } else if (isEmpty(this.selected.slug)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.KYC_SLUG);
          } else if (isValidURL(this.selected.slug)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.SLUG_NOT_URL);
          } else if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.KYC_TITLE);
          } else if (isValidURL(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.TITLE_URL);
          } else if (isNaN(parseInt(this.selected.score))) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_NUM);
          } else if (parseInt(this.selected.score) < 0) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.SCORE_IS_POSITIVE_NUM);
          } else if (this.eventActionList.length > 1) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.KYCACCORDIN.DUPLICATE_KYC);
          }
          break;
        }
        case "CUSTOMCONTRACT": {          
          // console.log(JSON.parse(this.selected.value));
         // const validateJSON=JSON.parse(this.selected.value)       

          if (this.selected.type === null) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SMARTCONTRACT.CHOOSE_CONTRACT_TYPE
            );
          }else if (this.contract.methods===null || isEmpty(this.contract.methods)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SMARTCONTRACT.METHODS_EMPTY
            );
          } else if (isEmpty(this.contract.contractAddress)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SMARTCONTRACT.ADDRESS_NOT_EMPTY
            );
          } else if (isEmpty(this.contract.contractABI)) {
            isvalid = false;
            this.notifyErr(
              Messages.EVENTS.ACTIONS.SMARTCONTRACT.ABI_NOT_EMPTY
            )
          }else if (isValidURL(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.TITLE_URL);
          }else if (isEmpty(this.selected.title)) {
            isvalid = false;
            this.notifyErr(Messages.EVENTS.ACTIONS.EMPTY_TITLE);
          }
          break;
        }
        default:
          this.notifyErr(Messages.EVENTS.ACTIONS.INVALID_EVENT_TYPE);
      }

      return isvalid;
    },

    handleEventActionAdd() {
      // Code to Add an Action
      let isvalid = this.handleEventActionValidation();
      if (isvalid) {
        if (this.eventActionType === "CUSTOMCONTRACT") {
          this.selected.value = JSON.stringify(this.contract);
        }
        if (this.eventActionType === "SMARTCONTRACT") {
          this.selected.value = JSON.stringify(this.contract);
        }
        if (this.eventActionType === "PRIZE") {
          this.selected.value = JSON.stringify(this.prizeDetails);
        }
        this.selected["id"] =
          this.eventActionType + "_" + this.eventActionList.length;
        this.eventActionList.push(this.selected);
        this.$emit("updateEventActions", {
          type: "ADD",
          data: this.selected,
        });
        this.clearSelected();
      }
    },
    handleEventActionDelete() {
      // Code to delete an Action
      const actionToDelete = this.eventActionList[this.currentSelectedId];
      this.eventActionList.splice(this.currentSelectedId, 1);
      this.$emit("updateEventActions", {
        type: "DELETE",
        data: actionToDelete,
      });
      this.clearSelected();
      this.isCreate = true;
    },
    handleEventActionUpdate() {
      // Code to update an Action
      let isvalid = this.handleEventActionValidation();
      if (isvalid) {
        if (this.eventActionType === "SMARTCONTRACT") {
          this.selected.value = JSON.stringify(this.contract);
        }
        if (this.eventActionType === "PRIZE") {
          this.selected.value = JSON.stringify(this.prizeDetails);
        }
        if (this.eventActionType === "CUSTOMCONTRACT") {
          this.selected.value = JSON.stringify(this.contract);
        }
        this.eventActionList[this.currentSelectedId] = this.selected;
        this.$emit("updateEventActions", {
          type: "UPDATE",
          data: this.selected,
        });
        this.clearSelected();
        this.isCreate = true;
      }
    },

    handleEventActionClick(idx) {
      // Code to update an Action
      this.flash = idx;
      let updateData = this.eventActionList[idx];
      this.currentSelectedId = idx;

      this.selected = updateData;
      if (this.eventActionType === "SMARTCONTRACT") {
        this.contract = { ...JSON.parse(this.selected.value) };
      }
      if (this.eventActionType === "CUSTOMCONTRACT") {
        this.contract = { ...JSON.parse(this.selected.value) };
      }
      if (this.eventActionType === "PRIZE") {
        this.prizeDetails = { ...JSON.parse(this.selected.value) };
      }
      this.isCreate = false;
    },

    truncate1(str, number) {
      return truncate(str, number);
    },
  },

  mixins: [notificationMixins],
};
</script>
