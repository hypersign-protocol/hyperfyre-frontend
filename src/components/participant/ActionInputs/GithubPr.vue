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
          <img src="../../../assets/github.svg" height="25px" />
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
                  handleGithubLogin()
                "
                class="btn btn-outline-twitter text-black mb-2"
              >
                <img src="../../../assets/github.svg" height="25px"/>
                Verify
              </button>
              <b-form-input
                type="text"
                placeholder="Please provide Pull Request url here."
                v-model="social.url"
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import webAuth from "../../../mixins/twitterLogin";
import eventBus from "../../../eventBus.js";
import notificationMixins from "../../../mixins/notificationMixins";
import Messages from "../../../utils/messages/participants/en";
import { isEmpty } from '../../../mixins/fieldValidationMixin';
export default {
  components: { Loading },
  name: "GithubPr",
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
      isToken:false,
      social:{
      url:'',
      socialAccessToken:'',
      },
      visible: false,
      isLoading: false,
      fullPage: true,
    };
  },
  updated(){
    if(this.data.isDone && this.data.value){
      this.social.url = this.data.value;
    }
  },
  mounted() {
    if(this.data.isDone && this.data.value){
      this.social.url = this.data.value;
    }
    eventBus.$on(`disableInput${this.data._id}`, this.disableInput);
  },
  methods: {
    update() {
        if (!this.isToken) {
            this.notifyErr(
            Messages.EVENT_ACTIONS.GITHUB_PR.GITHUB_AUTH
          );
        } else if(!this.social.url || isEmpty(this.social.url)){
          this.notifyErr(Messages.EVENT_ACTIONS.GITHUB_PR.GITHUB_PR_EMPTY)
        } else if(!this.social.url.includes(this.data.value)){
          this.social.url = "";
          this.notifyErr(Messages.EVENT_ACTIONS.GITHUB_PR.INVALID_GITHUB_PR_URL)
        }
        else {
          this.$emit("input", JSON.stringify({
            ...this.social
          }));
        }
    },
    disableInput(data) {
      this.done = data;
    },
    handleGithubLogin() {
      try {
          webAuth.popup.authorize(
            {
              connection: "github",
              owp: true,
            },
            (err, authRes) => {
              console.log(authRes)
              if(!err && authRes.accessToken){
                this.social.socialAccessToken = authRes.accessToken;
                localStorage.setItem("socialAccessToken",this.socialAccessToken)
                this.isToken = true;
              }
              else{
                this.isToken = false;
              }
            }
          );
      } catch (e) {
        this.notifyErr(e);
      }
    },
  },
  mixins: [notificationMixins],
};
</script>
