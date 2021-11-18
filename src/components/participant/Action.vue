<template>
  <div class="accordion mt-3 mx-auto overflow-hidden" role="tablist" style="max-width: 600px;">
   <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <Profile :user="userProfile"/>
    <template v-for="(actionItem,index) in ActionSchema">
      <component :is="CapitaliseString(actionItem.type)" :key="index" :idValue="index" :data="actionItem" @input="updateUserInfo(actionItem, $event)"></component>
    </template>
  </div>
</template>
<script>
 import Loading from "vue-loading-overlay";
 import "vue-loading-overlay/dist/vue-loading.css";
import Profile from "./ActionInputs/Profile.vue";
import InfoText from "./ActionInputs/InfoText.vue"
import HyperlinkUrl from "./ActionInputs/HyperlinkUrl.vue"
import TwitterFollow from "./ActionInputs/TwitterFollow.vue";
import TwitterRetweet from "./ActionInputs/TwitterRetweet.vue";
import DiscordJoin from "./ActionInputs/DiscordJoin.vue";
import TelegramJoin from "./ActionInputs/TelegramJoin.vue";
import InputText from "./ActionInputs/InputText.vue";
import BlockchainEth from "./ActionInputs/BlockchainEth.vue";
import BlockchainTez from "./ActionInputs/BlockchainTez.vue";
import EthereumErc20 from "./ActionInputs/EthereumErc20.vue";
import EthereumErc721 from "./ActionInputs/EthereumErc721.vue"
import MaticErc20 from "./ActionInputs/MaticErc20.vue"
import BinanceErc20 from "./ActionInputs/BinanceErc20.vue"
import InputDate from "./ActionInputs/InputDate.vue";
import InputNumber from "./ActionInputs/InputNumber.vue";
import InputHyperlink from "./ActionInputs/InputHyperlink.vue";
import eventBus from "../../eventBus.js"
import apiClient from "../../mixins/apiClientMixin";
import notificationMixins from "../../mixins/notificationMixins";
import config from "../../config";
import Messsages from "../../utils/messages/participants/en"
export default {
  name: "Action",
  props: {
    ActionSchema: {
      required: true,
      type: Array
    },
    userProfile:{
      required: true,
      type: Object
    }
  },
  components: {
    Profile,
    TwitterFollow,
    TwitterRetweet,
    TelegramJoin,
    InputText,
    BlockchainEth,
    BlockchainTez,
    EthereumErc20,
    EthereumErc721,
    MaticErc20,
    InputDate,
    InputNumber,
    BinanceErc20,
    Loading,
    DiscordJoin,
    HyperlinkUrl,
    InputHyperlink,
    InfoText,
    RecaptchaToken: ""
  },
  mounted(){
    this.RecaptchaToken = localStorage.getItem("recaptchaToken");
    eventBus.$emit('loadUserProfileData');
    eventBus.$on('UpdateUserInfoFromEvent',   (data) => {
      const { actionItem,  value} =  data;
      this.updateUserInfo(actionItem,  value)
    })
  },
  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      user: JSON.parse(localStorage.getItem('user')),
      userData: {
        projectId: "613b8476442d2d56fb0988fa",  
      },
      actions: [],
      eventActionType: {
        ...config.eventActionType
      },
       isLoading:false,
       fullPage: true
    };
  },
  methods: {

    CapitaliseString(string) {
      let res = string.split('_');
      let first = res[0][0].toUpperCase() + res[0].substring(1).toLowerCase()
      let next = res[1][0].toUpperCase() + res[1].substring(1).toLowerCase()
      return first + next
    },
    async updateUserInfo(actionItem, value) {
      try {
        this.isLoading = true
        this.actions = [];
        
        this.actions.push({
          'actionId': actionItem._id,
          'value': value,
        });

        this.userData.projectId = actionItem.eventId;
        const body = {
          ...this.userData,
          actions: this.actions,
        };

        let url = `${this.$config.studioServer.BASE_URL}api/v1/investor?rcToken=${this.RecaptchaToken}`;
        if (this.$route.query.referrer && this.$route.query.referrer != "") {
          url += `&referrer=${this.$route.query.referrer}`;
        }
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        const resp = await apiClient.makeCall({
          method: "POST",
          url: url,
          body,
          header: headers,
        });
        this.isLoading=false;
        const { data } = resp;
        this.actions = [];

        if (data) {
          const { actions } = data;
          if (actions && actions.length > 0) {
            const action = actions.find((x) => x._id == actionItem._id);
            if (action != null || action != "undefined") {
              actionItem.isDone = true;
              eventBus.$emit(`disableInput${actionItem._id}`, actionItem.isDone);
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

}
</script>