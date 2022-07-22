<template>
  <div class="accordion mt-3 mx-auto overflow-hidden" role="tablist" style="max-width: 600px"
    @click="checkIfUserHasLoggedIn()">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <Profile v-if="userProfile" :user="userProfile" />

    <template v-for="(actionItem, index) in ActionSchema">
      <component v-if="actionItem.type==='INFO_TEXT'" :is="CapitaliseString(actionItem.type)" :key="index"
        :idValue="index" :data="actionItem" :done="actionItem.isDone" :authToken="authToken"
        @input="updateUserInfo(actionItem, $event)" :themeData="themeData">
      </component>
    </template>

    <prize-card v-if="isPrizedata" :prizeData="prizeData" />

    <template v-for="(actionItem, index) in ActionSchema">

      <component v-if="(actionItem.type !== 'INFO_TEXT') && (actionItem.type !=='PRIZE_CARD') "
        :is="CapitaliseString(actionItem.type)" :key="index" :idValue="index" :data="actionItem" :authToken="authToken"
        :done="actionItem.isDone" @input="updateUserInfo(actionItem, $event)" :themeData="themeData">
      </component>
    </template>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Profile from "./ActionInputs/Profile.vue";
import InfoText from "./ActionInputs/InfoText.vue";
import HyperlinkUrl from "./ActionInputs/HyperlinkUrl.vue";
import TwitterFollow from "./ActionInputs/TwitterFollow.vue";
import TwitterRetweet from "./ActionInputs/TwitterRetweet.vue";
import DiscordJoin from "./ActionInputs/DiscordJoin.vue";
import TelegramJoin from "./ActionInputs/TelegramJoin.vue";
import InputText from "./ActionInputs/InputText.vue";
import BlockchainEth from "./ActionInputs/BlockchainEth.vue";
import BlockchainTez from "./ActionInputs/BlockchainTez.vue";
import BlockchainCardano from "./ActionInputs/BlockchainCardano.vue";
import BlockchainAvax from "./ActionInputs/BlockchainAvax.vue";
import BlockchainBsc from "./ActionInputs/BlockchainBsc.vue";
import BlockchainMatic from "./ActionInputs/BlockchainMatic.vue";
import BlockchainOne from "./ActionInputs/BlockchainOne.vue";
import BlockchainReef from "./ActionInputs/BlockchainReef.vue";
import EthereumErc20 from "./ActionInputs/EthereumErc20.vue";
import EthereumErc721 from "./ActionInputs/EthereumErc721.vue";
import MaticErc20 from "./ActionInputs/MaticErc20.vue";
import MaticErc721 from "./ActionInputs/MaticErc721.vue";
import MoonErc20 from "./ActionInputs/MoonErc20.vue";
import MoonErc721 from "./ActionInputs/MoonErc721.vue";
import MoonbeamErc20 from "./ActionInputs/MoonbeamErc20.vue";
import MoonbeamErc721 from "./ActionInputs/MoonbeamErc721.vue";

import MoonriverErc20 from "./ActionInputs/MoonriverErc20.vue";
import MoonriverErc721 from "./ActionInputs/MoonriverErc721.vue";
import BinanceErc20 from "./ActionInputs/BinanceErc20.vue";
import BinanceErc721 from "./ActionInputs/BinanceErc721.vue";

import ReefErc20 from "./ActionInputs/ReefErc20.vue";
import ReefErc721 from "./ActionInputs/ReefErc721.vue";
 import SumsubKyc from "./ActionInputs/SumsubKyc.vue"

import InputDate from "./ActionInputs/InputDate.vue";
import InputNumber from "./ActionInputs/InputNumber.vue";
import InputHyperlink from "./ActionInputs/InputHyperlink.vue";
import PushNotification from "./ActionInputs/PushNotification.vue";
import PrizeCard from "./ActionInputs/PrizeCard.vue";
import eventBus from "../../eventBus.js";
import crypto from 'crypto'
import apiClient from "../../mixins/apiClientMixin";
import notificationMixins from "../../mixins/notificationMixins";
import config from "../../config";
import Messsages from "../../utils/messages/participants/en";
import EthereumNetwork from "./ActionInputs/EthereumNetwork.vue";
import MaticNetwork from './ActionInputs/MaticNetwork.vue';
import BinanceNetwork from './ActionInputs/BinanceNetwork.vue';

export default {
  name: "Action",
  props: {
    ActionSchema: {
      required: true,
      type: Array,
    },
    userProfile: {
      required: true,
      type: Object,
    },
    authToken: {
      required: true,
      type: String
    },
    prizeData: {
      required: true,
      type: Array,
    },
    themeData:{
      required: true,
      type: Object,
    }
  },
  components: {
    BinanceNetwork,
    MaticNetwork,
    Profile,
    TwitterFollow,
    TwitterRetweet,
    TelegramJoin,
    InputText,
    EthereumNetwork,
    BlockchainEth,
    BlockchainTez,
    BlockchainCardano,
    BlockchainAvax,
    BlockchainBsc,
    BlockchainMatic,
    BlockchainOne,
    BlockchainReef,
    EthereumErc20,
    EthereumErc721,
    MaticErc20,
    MaticErc721,
    ReefErc20,
    ReefErc721,
    InputDate,
    InputNumber,
    BinanceErc20,
    BinanceErc721,
    Loading,
    DiscordJoin,
    HyperlinkUrl,
    InputHyperlink,
    InfoText,
    MoonErc721,
    PrizeCard,
    MoonErc20,
    MoonbeamErc20,
    MoonbeamErc721,
    MoonriverErc20,
    MoonriverErc721,
    PushNotification,
    SumsubKyc,
    RecaptchaToken: "",
  },
  mounted() {
    this.RecaptchaToken = localStorage.getItem("recaptchaToken");
    eventBus.$emit("loadUserProfileData");
    eventBus.$on("UpdateUserInfoFromEvent", (data) => {
      const { actionItem, value } = data;
      this.updateUserInfo(actionItem, value);
    });
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      userData: {
        projectId: "613b8476442d2d56fb0988fa",
      },
      actions: [],
      eventActionType: {
        ...config.eventActionType,
      },
      isLoading: false,
      fullPage: true,
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    isPrizedata() {
      if (this.prizeData && this.prizeData.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    checkIfUserHasLoggedIn() {
      if (!this.userProfile) {
        // TODO:  bad way of coding.  We should only hide which is being clicked 
        document.querySelectorAll(".card-header").forEach(elm => {
          elm.classList.add('collapsed')
          elm.attributes['aria-expanded'].value =  false;
          document.getElementById(elm.attributes['aria-controls'].value).style.display = 'none';
        })
        return this.notifyErr(Messsages.EVENT_ACTIONS.UNAUTHENTICATED);
      } 
    },
    CapitaliseString(string) {
      let res = string.split("_");
      let first = res[0][0].toUpperCase() + res[0].substring(1).toLowerCase();
      let next = res[1][0].toUpperCase() + res[1].substring(1).toLowerCase();
      return first + next;
    },
    async updateUserInfo(actionItem, value) {
      try {

        if (!this.authToken){
          return;
        }
        
        this.isLoading = true;
        this.actions = [];

        this.actions.push({
          actionId: actionItem._id,
          value: value,
        });

        this.userData.projectId = actionItem.eventId;
        const body = {
          ...this.userData,
          actions: this.actions,
        };
        const ts=Math.floor(Date.now() / 1000);
        const endPoint='api/v1/investor'
        const signature= crypto.createHmac('sha256',config.investor_sign_key)
        signature.update(ts+endPoint+JSON.stringify(body))
        const sig= signature.digest('hex')
        let url = `${this.$config.studioServer.BASE_URL}api/v1/investor?rcToken=${this.RecaptchaToken}`;
        if (this.$route.query.referrer && this.$route.query.referrer != "") {
          url += `&referrer=${this.$route.query.referrer}`;
        }
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          "sig-ts":ts,
          "x-payload-hf-sign":sig

        };

        const resp = await apiClient.makeCall({
          method: "POST",
          url: url,
          body,
          header: headers,
        });
        this.isLoading = false;
        const { data } = resp;
        this.actions = [];

        if (data) {
          const { actions } = data;
          if (actions && actions.length > 0) {
            const action = actions.find((x) => x._id == actionItem._id);
            if (action != null || action != "undefined") {
              actionItem.isDone = true;
              eventBus.$emit(
                `disableInput${actionItem._id}`,
                actionItem.isDone
              );
              this.$emit("UserUpdateEvent", resp.data);
            } else {
              return this.notifyErr(Messsages.ACTIONS.UPDATE_FAILED);
            }
          } else {
            return this.notifyErr(Messsages.ACTIONS.NO_ACTION_FOUND);
          }
        } else {
          return this.notifyErr(Messsages.ACTIONS.SOME_ERROR);
        }
      } catch (e) {
        this.notifyErr(Messsages.EVENT_ACTIONS.ERROR + e.message);
        // console.log(e);
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
