<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      class="px-0 font-14 line-h-17 white--text font-weight--medium"
    >
      <div class="d-flex align-center">
        <v-icon size="22" color="#1DA1F2" class="mr-2"> mdi-twitter</v-icon>
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
      <div class="d-flex flex-column align-center justify-space-around">
        <v-btn
          :disabled="done"
          color="#1DA1F2"
          outlined
          @click="
            handleTwitterLogin(
              'https://twitter.com/' +
                twitter.sourceScreenName +
                '?ref_src=twsrc%5Etfw'
            )
          "
          :ripple="false"
          class="height-35 letter-s-0 text-capitalize border-r-3 font-16 line-h-19 font-weight--medium"
          depressed
          x-large
        >
          <v-icon size="22" color="#1DA1F2" class="mr-2"> mdi-twitter</v-icon>
          Follow @{{ twitter.sourceScreenName }}
        </v-btn>

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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
import eventBus from "@/eventBus.js";
import notificationMixins from "@/mixins/notificationMixins";
import Messages from "@/utils/messages/participants/en";
import apiClient from "@/mixins/apiClientMixin.js";
import webAuth from "@/mixins/twitterLogin";
export default {
  name: "TwitterFollow",
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
      twitter: {
        sourceScreenName: "",
        targetScreenName: "",
      },
      isLoading: false,
      fullPage: true,
    };
  },
  mounted() {
    try {
      if (this.data.value) {
        const twitter = JSON.parse(this.data.value);
        this.twitter = { ...twitter };
      }
    } catch (e) {
      this.twitter.sourceScreenName = this.data.value;
    }

    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    async update() {
      if (!localStorage.getItem("twitterId")) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.TWITTER_FOLLOW.TWITTER_AUTH,
        });
      }
      if (!(await this.hasFollowedTwitter())) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: Messages.EVENT_ACTIONS.TWITTER_FOLLOW.FOLLOW_FIRST,
        });
      } else {
        this.$emit(
          "input",
          JSON.stringify({
            ...this.twitter,
          })
        );
      }
    },
    disableInput(data) {
      this.done = data;
    },
    handleTwitterLogin(urlToRedirect) {
      try {
        if (!localStorage.getItem("twitterId")) {
          webAuth.popup.authorize(
            {
              connection: "twitter",
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

                    const twitterId = user.sub.split("|")[1];
                    localStorage.setItem("twitterId", twitterId);

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
    async hasFollowedTwitter() {
      try {
        this.isLoading = true;
        const twitterId = localStorage.getItem("twitterId");

        this.twitter.targetScreenName = await this.getTwitterScreenName(
          twitterId
        );

        if (
          this.twitter.sourceScreenName &&
          this.twitter.targetScreenName &&
          this.twitter.sourceScreenName != "" &&
          this.twitter.targetScreenName != ""
        ) {
          let url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/follower`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          };

          const resp = await apiClient.makeCall({
            method: "POST",
            url: url,
            body: this.twitter,
            header: headers,
          });
          return resp.data;
        } else {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message:
              Messages.EVENT_ACTIONS.TWITTER_FOLLOW.TWITTER_SCREENS_BLANK,
          });
          return false;
        }
      } catch (e) {
        this.$store.dispatch("snackbar/SHOW", {
          type: "error",
          message: e,
        });
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    async getTwitterScreenName(twitterId) {
      try {
        this.isLoading = true;
        if (twitterId) {
          let url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/user/${twitterId}`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          };

          const resp = await apiClient.makeCall({
            method: "GET",
            url: url,
            body: {},
            header: headers,
          });

          const { screen_name } = resp.data;
          // localStorage.setItem("twitterHandle", screen_name);

          return screen_name;
        } else {
          return null;
        }
      } catch (e) {
        this.notifyErr(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
