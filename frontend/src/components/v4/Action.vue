<template>
  <div class="accordion mt-3 mx-auto overflow-hidden" role="tablist" style="max-width: 600px;">
    <b-card no-body class="action-wrap">
      <b-card-header role="tab">
        <b-row v-b-toggle.accordion-1>
          <b-col cols="1" sm="1" md="1">
            <img src="../../assets/person-fill.svg" height="25px">
          </b-col>
          <b-col cols="9" sm="9" class="text-left" md="9">
            <div class="text">Your Profile</div>
          </b-col>
        </b-row>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body class="user-details" v-if="user">
          <b-row>
            <b-col cols="12" sm="3" md="3">
              <div class="title text-left mb-1">Username</div>
              <div class="text text-left">{{user.name}}</div>
            </b-col>
            <b-col cols="12" sm="4" md="4">
              <div class="title text-left mb-1">Email</div>
              <div class="text text-left">{{user.email}}</div>
            </b-col>
            <b-col cols="12" sm="5" md="5">
              <div class="title text-left mb-1">DID</div>
              <div class="text text-left">{{user.id}}</div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
    <template v-for="(actionItem,index) in ActionSchema">
      <component :is="CapitaliseString(actionItem.type)" :key="index" :idValue="index" :data="actionItem" @input="updateUserInfo(actionItem, $event)"></component>
    </template>
  </div>
</template>
<script>
import TwitterFollow from "./ActionInputs/TwitterFollow.vue";
import TwitterRetweet from "./ActionInputs/TwitterRetweet.vue";
import TelegramJoin from "./ActionInputs/TelegramJoin.vue";
import InputText from "./ActionInputs/InputText.vue";
import BlockchainEth from "./ActionInputs/BlockchainEth.vue";
import InputDate from "./ActionInputs/InputDate.vue";
import eventBus from "../../eventBus.js"
import apiClient from "../../mixins/apiClientMixin";
import config from "../../config";
export default {
  name: "Action",
  props: {
    ActionSchema: {
      required: true,
      type: Array
    }
  },
  components: {
    TwitterFollow,
    TwitterRetweet,
    TelegramJoin,
    InputText,
    BlockchainEth,
    InputDate
  },
  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      user: JSON.parse(localStorage.getItem('user')),
      userData: {
        ethAddress: "0x12312312312",
        twitterHandle: "hermit123123",
        telegramHandle: "hermitTg123",
        projectId: "613b8476442d2d56fb0988fa",
        tweetUrl: "https://asdad.com",
      },
      actions: [],
      eventActionType: {
        ...config.eventActionType
      }
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
      //
      try {

        this.actions.push({
          'actionId': actionItem._id,
          'value': value,
        });

        this.userData.projectId = actionItem.eventId;
        const body = {
          ...this.userData,
          actions: this.actions,
        };

        let url = `${this.$config.studioServer.BASE_URL}api/v1/investor/add`;
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
        const { data } = resp;
        console.log(resp.data);
        this.actions = [];

        if (data) {
          const { actions } = data;
          if (actions && actions.length > 0) {
            const action = actions.find((x) => x._id == actionItem._id);
            if (action != null || action != "undefined") {
              actionItem.isDone = true;
              eventBus.$emit(`disableInput${actionItem._id}`, actionItem.isDone);
              console.log("Update User data event  emit");
              this.$emit("UserUpdateEvent", resp.data);
            } else {
              return alert("Error: could not update the action");
            }
          } else {
            return alert("Error: no actions found with user");
          }
        } else {
          return alert("Error: some error occurred");
        }
      } catch (e) {
        console.log(e);
      }
    },
  }
}
</script>