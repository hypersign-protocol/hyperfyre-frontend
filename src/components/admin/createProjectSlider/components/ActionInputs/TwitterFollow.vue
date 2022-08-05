<template>
  <b-card no-body class="action-wrap">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <b-card-header
      :class="visible ? null : 'collapsed'"
      :aria-expanded="visible ? 'true' : 'false'"
      :aria-controls="`collapse-${idValue}`"
      @click="visible = !visible"
    >
      <b-row>
        <b-col cols="1" sm="1" md="1">
          <img src="../../../assets/twitter-4.svg" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>
        <b-col cols="2" sm="2" md="2">
          <b-badge class="btn-score" @click="update()" v-if="!done">
            <img src="../../../assets/plus.svg" />
            {{ data.score }}
          </b-badge>
          <img class="check-mark" src="../../../assets/check-circle-fill.svg" height="25px" v-if="done" />
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
                @click="handleTwitterLogin('https://twitter.com/' + twitter.sourceScreenName + '?ref_src=twsrc%5Etfw')"
                class="btn btn-outline-twitter text-black"
              >
                <img src="../../../assets/twitter.svg" />
                Follow @{{ twitter.sourceScreenName }}
              </button>
            </div>
          </b-col>
        </b-row>

        <b-row v-if="!done">
          <b-col cols="12" sm="12" md="12">
            <button class="btn btn-link center" @click="update()">Continue</button>
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
        return this.notifyErr(Messages.EVENT_ACTIONS.TWITTER_FOLLOW.TWITTER_AUTH);
      }
      if (!(await this.hasFollowedTwitter())) {
        return this.notifyErr(Messages.EVENT_ACTIONS.TWITTER_FOLLOW.FOLLOW_FIRST);
      }
      this.$emit(
        "input",
        JSON.stringify({
          ...this.twitter,
        })
      );
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
                webAuth.client.userInfo(authRes.accessToken, async (err, user) => {
                  if (err) {
                    return this.notifyErr(Messages.EVENT_ACTIONS.WENT_WRONG);
                  }

                  const twitterId = user.sub.split("|")[1];
                  localStorage.setItem("twitterId", twitterId);

                  window.open(urlToRedirect, "_blank");
                });
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
    },
    async hasFollowedTwitter() {
      try {
        this.isLoading = true;
        const twitterId = localStorage.getItem("twitterId");

        this.twitter.targetScreenName = await this.getTwitterScreenName(twitterId);

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
          this.notifyErr(Messages.EVENT_ACTIONS.TWITTER_FOLLOW.TWITTER_SCREENS_BLANK);
          return false;
        }
      } catch (e) {
        this.notifyErr(e);
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
