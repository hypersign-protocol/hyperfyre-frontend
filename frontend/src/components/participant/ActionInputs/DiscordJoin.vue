<template>
  <b-card no-body class="action-wrap">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <b-card-header
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="`collapse-${idValue}`"
      @click="visible = !visible"
    >
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="../../../assets/discord.png" height="25px" />
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
        <b-row>
          <b-col cols="12" sm="12" md="12">
            <div class="follow">
              <button
                :disabled="done"
                @click="
                  handleDiscordLogin(discord.sourceScreenName)
                "
                class="btn btn-outline-discord text-black"
              >
                <!-- <img src="../../../assets/discord.png" height="20px"/> -->
                <i class="fab fa-discord"></i>
                Join our Discord
              </button>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import apiClient from "../../../mixins/apiClientMixin";
import webAuth from "../../../mixins/twitterLogin";
import eventBus from "../../../eventBus.js";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
export default {
  components: { Loading },
  name: "TwitterRetweet",
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
      actions: [],
      discord: {
        sourceScreenName: "",
        targetScreenName: "",
        channelName: ""
      },
      isLoading: false,
      fullPage: true,
    };
  },
  async mounted() {
    try {
        if(localStorage.getItem("discordId") || localStorage.getItem("discordUserName")){
          localStorage.removeItem("discordId")
          localStorage.getItem("discordUserName")
          }
      if (this.data.value) {
        const discord = JSON.parse(this.data.value);
        this.discord = { ...discord };
      }
    } catch (e) {
      this.discord.sourceScreenName = this.data.value;
    }

    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    async update() {
      const tgIdInStore = localStorage.getItem("discordId"); 
      const discordScreenName=localStorage.getItem("discordUserName")
      if ((!tgIdInStore || tgIdInStore == "undefined" || tgIdInStore == null) && (!discordScreenName || discordScreenName == "undefined" || discordScreenName == null)) {
        return this.notifyErr(
          Messages.EVENT_ACTIONS.DISCORD_JOIN.DISCORD_AUTH
        );
      } else {
        this.discord.targetScreenName = discordScreenName;
        this.$emit(
          "input",
          JSON.stringify({
            ...this.discord,
          })
        );
      }
    },
    disableInput(data) {
      this.done = data;
    },
    handleDiscordLogin(urlToRedirect) {
      try {
        if (!localStorage.getItem("discordId")) {
          webAuth.popup.authorize(
            {
              connection: "discord",
              owp: true,
            },
            (err, authRes) => {
  
              if (!err) {
                webAuth.client.userInfo(
                  authRes.accessToken,
                  async (err, user) => {
                    if (err) {
                      return this.notifyErr(Messages.EVENT_ACTIONS.WENT_WRONG);
                    }
                    console.log(user);
                    const discordId = user.sub.split("|")[2];
                    const discordUserName=user.name;
                    console.log(discordUserName);
                    localStorage.setItem("discordId", discordId);
                    localStorage.setItem("discordUserName",discordUserName)
                    window.open(urlToRedirect, "_blank");
                  }
                );
              }
            }
          );
        } else {
          window.open(urlToRedirect, "_blank");
          // this.twitter.targetScreenName = localStorage.getItem("twitterHandle")
        }
      } catch (e) {
        return this.notifyErr(e.message ? e.message : JSON.stringify(e));
      }
    }
  },
  mixins: [notificationMixins],
};
</script>
