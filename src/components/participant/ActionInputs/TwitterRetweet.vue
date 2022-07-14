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
          <img src="../../../assets/twitter-4.svg" height="25px" />
        </b-col>
        <b-col cols="9" sm="9" class="text-left" md="9">
          <div class="text text-capitalize">{{ data.title }}</div>
        </b-col>
        <b-col cols="2" sm="2" md="2">
          <b-badge class="btn-score" :style="buttonThemeCss" @click="update()" v-if="!done">
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
                  handleTwitterLogin(
                    'https://twitter.com/intent/tweet?text=' + data.value
                  )
                "
                class="btn btn-outline-twitter text-black mb-2"
              >
                <img src="../../../assets/twitter.svg" />
                Retweet
              </button>
              <b-form-input
                type="text"
                placeholder="Please provide your retweet URL here."
                v-model="retweetUrl"
                :disabled="data.isDone"
                :required="data.isManadatory"
              ></b-form-input>
            </div>
          </b-col>
        </b-row>

        <b-row v-if="!done">
					<b-col cols="12" sm="12" md="12" >
						<button class="btn btn-link center"  @click="update()">Continue</button>
					</b-col>
				</b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<style scoped>
.center{
  display: block; margin-left: auto;margin-right: auto
}
</style>
<script>
import config from "../../../config";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import apiClient from "../../../mixins/apiClientMixin";
import webAuth from "../../../mixins/twitterLogin";
import eventBus from "../../../eventBus.js";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import { isretweetUrl } from '../../../mixins/fieldValidationMixin';
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
    authToken: {
      required: true,
    },
    done: {
      required: true,
    },
    themeData: {
      required: true,
    }
  },
computed:{
 buttonThemeCss() {
      return {
        '--button-bg-color': this.themeData.buttonBGColor,
        '--button-text-color': this.themeData.buttonTextColor
      }
     }
  },
  data() {
    return {
      visible: false,
      retweetUrl: "",
      isLoading: false,
      fullPage: true,
    };
  },
  updated(){
    if(this.data.isDone && this.data.value){
      this.retweetUrl = this.data.value;
    }
  },
  mounted() {
    if(this.data.isDone && this.data.value){
      this.retweetUrl = this.data.value;
    }
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    async update() {
      try {
        if (!(await this.hasRetweeted())) {
          throw new Error(
            Messages.EVENT_ACTIONS.TWITTER_RETWEET.INVALID_RETWEET
          );
        } else {
          this.$emit("input", this.retweetUrl);
        }
      } catch (e) {
        const { errors } = e;
        if (errors && errors.length > 0) {
          this.notifyErr(errors[0]["msg"]);
        } else {
          this.notifyErr(e.message);
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
                      return this.notifyErr(Messages.EVENT_ACTIONS.WENT_WRONG);
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
      if(isretweetUrl(this.retweetUrl)){
        this.retweetUrl='';
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
