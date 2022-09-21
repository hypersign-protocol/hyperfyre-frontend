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
          <b-badge class="btn-score" :style="buttonThemeCss" @click="authToken && update()" v-if="!done">
             <i class="fa fa-plus" aria-hidden="true"></i>
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
                    'https://twitter.com/' +
                      twitter.sourceScreenName +
                      '?ref_src=twsrc%5Etfw'
                  )
                "
                class="btn btn-outline-twitter text-black"
              >
                <img src="../../../assets/twitter.svg" />
                Follow @{{ twitter.sourceScreenName }}
              </button>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import webAuth from "../../../mixins/twitterLogin";
import eventBus from "../../../eventBus.js";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
export default {
  components: { Loading },
  name: "TwitterFollow",
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
      actions: [],
      twitter: {
        sourceScreenName: "",
        targetScreenName: "",
      },
      social:{
      socialAccessToken:''
      },
      isLoading: false,
      fullPage: true,
    };
  },
  updated() {
    try {
      if (this.data.value ) {
        if (this.twitter.sourceScreenName == "" || this.twitter.targetScreenName == ""){
          const twitter = JSON.parse(this.data.value);
          this.twitter = { ...twitter };
        }
      }
    } catch (e) {
      this.twitter.sourceScreenName = this.data.value;
    }
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
      if (!localStorage.getItem("twitterAccessToken")){
        return this.notifyErr(Messages.EVENT_ACTIONS.TWITTER_FOLLOW.TWITTER_AUTH);
      } else {
        this.social.socialAccessToken = localStorage.getItem("twitterAccessToken")
        this.$emit(
        "input",
         JSON.stringify({
          ...this.social,
        })
      );
    }
  },
    disableInput(data) {
      this.done = data;
    },
    handleTwitterLogin(urlToRedirect) {
      try {
        if (!localStorage.getItem("twitterAccessToken")) {
          webAuth.popup.authorize(
            {
              connection: "twitter",
              owp: true,
            },
            (err, authRes) => {
              if (!err && authRes.accessToken) {
                this.social.socialAccessToken = authRes.accessToken;
                localStorage.setItem("twitterAccessToken",this.social.socialAccessToken);
                window.open(urlToRedirect, "_blank");
                
              }
            }
          );
        } else {
          this.social.socialAccessToken = localStorage.getItem("twitterAccessToken")
          window.open(urlToRedirect, "_blank");
        }
      } catch (e) {
        return this.notifyErr(e.message ? e.message : JSON.stringify(e));
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
