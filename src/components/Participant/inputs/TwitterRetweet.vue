<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="px-0 font-12 line-h-15 white--text">
      <div class="d-flex align-center">
        <v-icon size="22" color="white" class="mr-2"> mdi-twitter</v-icon>
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
      <div class="d-flex flex-row align-center justify-space-between">
        <v-form
          v-model="data.isManadatory"
          lazy-validation
          ref="form"
          class="text-center"
        >
          <v-text-field
            v-model="retweetUrl"
            :disabled="done"
            hide-details="auto"
            :rules="rules.input"
            dark
            flat
            solo
            outlined
            class="form-input mb-2"
            placeholder="https://twitter.com/<twitterHandle>/status/<tweetId>"
          ></v-text-field>
          <v-btn
            :disabled="done"
            @click="
              handleTwitterLogin(
                'https://twitter.com/intent/tweet?text=' + data.value
              )
            "
            :ripple="false"
            class="btn-gradient-outline height-35 letter-s-0 text-capitalize font-16 line-h-19 font-weight--medium white--text"
            depressed
            rounded
            x-large
          >
            Retweet
          </v-btn>
        </v-form>
      </div>
      <div class="d-flex align-center justify-center">
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
import apiClient from "@/mixins/apiClientMixin";
import webAuth from "@/mixins/twitterLogin";
import eventBus from "@/eventBus.js";
import notificationMixins from "@/mixins/notificationMixins";
import Messages from "@/utils/messages/participants/en";
import { isretweetUrl } from "@/mixins/fieldValidationMixin";
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
      authToken: localStorage.getItem("authToken"),
      visible: false,
      done: this.data.isDone,
      retweetUrl: "",
      isLoading: false,
      fullPage: true,
      rules: {
        input: [(v) => !!v || "Please fill in the field"],
      },
    };
  },
  mounted() {
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    async update() {
      try {
        if (!(await this.hasRetweeted())) {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: Messages.EVENT_ACTIONS.TWITTER_RETWEET.INVALID_RETWEET,
          });
        } else {
          this.$emit("input", this.retweetUrl);
        }
      } catch (e) {
        const { errors } = e;
        if (errors && errors.length > 0) {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: errors[0]["msg"],
          });
        } else {
          this.$store.dispatch("snackbar/SHOW", {
            type: "error",
            message: e.message,
          });
        }
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
        this.notifyErr(e);
      }
    },
    async hasRetweeted() {
      if (!this.retweetUrl) {
        throw new Error("Retweet url cannot be empty");
      }
      if (isretweetUrl(this.retweetUrl)) {
        this.retweetUrl = "";
        return false;
      }
      this.isLoading = true;
      const twitterId = localStorage.getItem("twitterId");
      if (twitterId) {
        let url = `${this.$config.studioServer.BASE_URL}api/v1/twitter/verify`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };

        const body = {
          tweetUrl: this.retweetUrl,
          userId: twitterId,
          tweetText: this.data.value,
          needUserDetails: false,
          checkIfFollowed: false,
          sourceScreenName: "",
        };

        const resp = await apiClient.makeCall({
          method: "POST",
          url: url,
          body,
          header: headers,
        });
        this.isLoading = false;
        if (resp.data.hasTweetUrlVerified) {
          return true;
        } else {
          this.notifyErr(resp.data.error);
          return false;
        }
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
