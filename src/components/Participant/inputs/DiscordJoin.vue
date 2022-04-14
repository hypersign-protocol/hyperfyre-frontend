<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="px-0 font-12 line-h-15 white--text">
      <div class="d-flex align-center">
        <v-icon size="22" color="#313540" class="mr-2" v-if="!done">
          mdi-circle</v-icon
        >

        <v-icon size="22" color="green" class="mr-2" v-if="done">
          mdi-check-circle</v-icon
        >
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
        <v-icon color="#fff"> mdi-chevron-down </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="font-14 line-h-32 color-grey-100">
      <div class="d-flex flex-row align-center justify-space-around">
        <v-btn
          :disabled="done"
          @click="handleDiscordLogin(discord.sourceScreenName)"
          :ripple="false"
          class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
          depressed
          rounded
          x-large
        >
          Join our Discord
        </v-btn>

        <v-btn
          v-if="!done"
          @click="update"
          :ripple="false"
          class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
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
import webAuth from "@/mixins/twitterLogin";
import eventBus from "@/eventBus.js";
import notificationMixins from "@/mixins/notificationMixins";
import Messages from "@/utils/messages/participants/en";
export default {
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
        channelName: "",
      },
      isLoading: false,
      fullPage: true,
    };
  },
  async mounted() {
    try {
      if (localStorage.getItem("discordId")) {
        localStorage.removeItem("discordId");
      }
      if (localStorage.getItem("discordUserName")) {
        localStorage.removeItem("discordUserName");
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
      const discordScreenName = localStorage.getItem("discordUserName");
      if (
        (!tgIdInStore || tgIdInStore == "undefined" || tgIdInStore == null) &&
        (!discordScreenName ||
          discordScreenName == "undefined" ||
          discordScreenName == null)
      ) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.DISCORD_JOIN.DISCORD_AUTH,
        });
      } else {
        this.discord.targetScreenName = discordScreenName;
        this.$emit(
          "input",
          JSON.stringify({
            ...this.discord,
          })
        );
        localStorage.removeItem("discordUserName");
        localStorage.removeItem("discordId");
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
                      this.$store.dispatch("snackbar/SHOW", {
                        type: "error",
                        message: Messages.EVENT_ACTIONS.WENT_WRONG,
                      });
                    }
                    const discordId = user.sub.split("|")[2];
                    const discordUserName = user.name;
                    localStorage.setItem("discordId", discordId);
                    localStorage.setItem("discordUserName", discordUserName);
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
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: e.message ? e.message : JSON.stringify(e),
        });
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
