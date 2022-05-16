<template>
  <div class="mt-6 bg-blue-100 action--wrap" v-if="userProfile">
    <p class="color-grey-100 font-14 line-h-17 font-weight-bold">
      Your Profile & Referral
    </p>
    <v-row class="white--text text-left pb-6" no-gutters>
      <v-col cols="12" md="2">
        <p class="font-14 line-h-17" @click="copyContent(userProfile.name)">
           <v-icon  class="color-grey-100"
            >mdil-account</v-icon
          >
          {{ userProfile.name }}
        </p>
      </v-col>
      <v-col cols="12" md="5">
        
        <p class="font-14 line-h-17" @click="copyContent(userProfile.email)">
           <v-icon  class="color-grey-100"
            >mdil-email-open</v-icon
          >
          {{ userProfile.email }}
        </p>
      </v-col>
      <v-col cols="12" md="5">
        <p class="font-14 line-h-17" @click="copyContent(userProfile.referalLink)">
          <v-icon  class="color-grey-100"
            >mdi-link-variant</v-icon
          >

          {{ referralLink | truncate(25) }}
          <input
            :id="referralLink"
            :value="`${referralLink}`"
            type="text"
            hidden
          />
          <v-icon color="primary" @click="copyContent(userProfile.referalLink)"
            >mdi-content-copy</v-icon
          >
        </p>
      </v-col>
    </v-row>
    <div class="d-flex align-center justify-space-between">
      <p class="color-grey-100 font-14 line-h-17 font-weight-bold">To-Dos</p>
      <p class="color-grey-100 font-14 line-h-17 font-weight-bold">
         <v-chip
            dark
            outlined
            class="color-grey-100 height-25 letter-s-0  font-14 line-h-17 font-weight--bold px-3"
          >
          <v-progress-circular
            :value="calculateInPercentage(completed.length,campaignActions.length)"
            color="primary"
            size="14"
            width="3"
            :rotate="360"
          >
          </v-progress-circular> 
          {{ completed.length }} of {{ campaignActions.length }}
         </v-chip>
      </p>
    </div>
    <v-expansion-panels class="todo__wrap" flat multiple>
      <prize-card v-if="isPrizedata" :prizeData="prizeData"></prize-card>
      <template v-for="(item, index) in campaignActions">
        <component
          :is="loadComponent(item)"
          :key="index"
          :idValue="index"
          :data="item"
          @input="updateUserInfo(item, $event)"
        ></component>
      </template>
    </v-expansion-panels>
  </div>
</template>
<script>

import general from "@/mixins/general";
import PrizeCard from "@/components/Participant/inputs/PrizeCard";
import apiClient from "@/mixins/apiClientMixin";
import notificationMixins from "@/mixins/notificationMixins";
import Messsages from "@/utils/messages/participants/en";
import eventBus from "@/eventBus.js";
import config from "@/config";
import crypto from "crypto";
export default {
  name: "Actions",
  mixins: [general, notificationMixins],
  components: {
    PrizeCard,
  },
  props: {
    campaignActions: {
      required: true,
      type: Array,
    },
    userProfile: {
      required: true,
    },
    prizeData: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      recaptchaToken: null,
      user: JSON.parse(localStorage.getItem("user")),
      userData: {
        projectId: "613b8476442d2d56fb0988fa",
      },
      actions: [],
      eventActionType: {
        ...config.eventActionType,
      },
      loading: false,
    };
  },
  mounted() {
    eventBus.$on("UpdateUserInfoFromEvent", (data) => {
      const { actionItem, value } = data;
      this.updateUserInfo(actionItem, value);
    });
    eventBus.$on("getUserData", this.setUserData);
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    isPrizedata() {
      if (this.prizeData.length > 0) {
        return true;
      }
    },
    completed() {
      return this.campaignActions.filter(
        (campaign) => campaign.isDone === true
      );
    },
    referralLink() {
      if (this.user && this.user.email) {
        return `${
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname
        }?referrer=${btoa(this.user.email)}`;
      } else {
        return null;
      }
    },
  },
  methods: {
    async setUserData(data) {
      this.user = data;
    },
    loadComponent(item) {
      if (item.type !== "HYPERSIGN_AUTH") {
        const actionTypeName = this.titleCase(item.type);
        return require(`@/components/Participant/inputs/${actionTypeName.replace(
          /\s/g,
          ""
        )}.vue`).default;
      }
    },

    titleCase(string) {
      let res = string.split("_");
      let first = res[0][0].toUpperCase() + res[0].substring(1).toLowerCase();
      let next = res[1][0].toUpperCase() + res[1].substring(1).toLowerCase();
      return first + next;
    },

    async updateUserInfo(actionItem, value) {
      console.log("hereer");
      try {
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
        const ts = Math.floor(Date.now() / 1000);
        const endPoint = "api/v1/investor";

        const signature = crypto.createHmac("sha256", config.investor_sign_key);
        console.log(signature);
        signature.update(ts + endPoint + JSON.stringify(body));
        const sig = signature.digest("hex");
        let url = `${this.$config.studioServer.BASE_URL}api/v1/investor?rcToken=${this.recaptchaToken}`;
        if (this.$route.query.referrer && this.$route.query.referrer != "") {
          url += `&referrer=${this.$route.query.referrer}`;
        }
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
          "sig-ts": ts,
          "x-payload-hf-sign": sig,
        };

        const resp = await apiClient.makeCall({
          method: "POST",
          url: url,
          body,
          header: headers,
        });

        console.log(resp);
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
              this.$store.dispatch("snackbar/SHOW", {
                type: "error",
                message: Messsages.ACTIONS.UPDATE_FAILED,
              });
            }
          } else {
            this.$store.dispatch("snackbar/SHOW", {
              type: "error",
              message: Messsages.ACTIONS.NO_ACTION_FOUND,
            });
          }
        } else {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: Messsages.ACTIONS.SOME_ERROR,
          });
        }
      } catch (e) {
        console.log(e.message);
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messsages.EVENT_ACTIONS.ERROR + e.message,
        });
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
<style scoped>
.v-progress-circular {
  margin-right: 0.25rem;
}
</style>
