<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <b-card no-body class="mx-auto overflow-hidden mt-3 border-0" style="max-width: 600px;">
      <Metrics :userScore="userEventData && userEventData.numberOfReferals? userEventData.numberOfReferals : 0" :totalEntries="eventData && eventData.count ? eventData.count : 0" :timeLeft="timeLeft" />
      <Banner :eventName="eventData.projectName" :themeColor="eventData.themeColor" :fontColor="eventData.fontColor" :fromDate="new Date(eventData.fromDate).toLocaleString()" :toDate="new Date(eventData.toDate).toLocaleString()" :logoUrl="eventData.logoUrl" />
      <template v-if="authToken == '' || authToken == null">
        <Login :themeColor="eventData.themeColor" :fontColor="eventData.fontColor" @AuthTokenUpdateEvent="updateAuthentication" />
      </template>
    </b-card>
    <template v-if="authToken != '' && authToken != null">
      <EventIsOver v-if="!eventData.projectStatus" />
      <Action v-if="eventData.projectStatus" :userProfile="userProfileData" :ActionSchema="eventActionsToShow" @UserUpdateEvent="updateUserData" />
    </template>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Banner from "../../components/participant/Banner.vue";
import Login from "../../components/participant/Login.vue";
import EventIsOver from "../../components/participant/EventIsOver.vue";
import Action from "../../components/participant/Action.vue";
import Metrics from "../../components/participant/Metrics.vue";
import notificationMixins from "../../mixins/notificationMixins";
import apiClient from "../../mixins/apiClientMixin";
import eventBus from "../../eventBus.js"
import Messages from "../../utils/messages/admin/en"
export default {
  name: "Event",
  components: {
    Banner,
    Login,
    Action,
    Metrics,
    EventIsOver,
    Loading
  },
  data() {
    return {
      eventData: {},
      actions: [],
      authToken: "",
      userEventData: null,
      userAuthData: null,
      eventActionsToShow: [],
      eventSlug: "",
      userProfileData: {},
      isLoading: false,
      fullPage: true
    }
  },
  metaInfo() {
        return { 
            title: this.eventData.projectName,
            meta: [
                { name: 'description', content:  `Participate in ${this.eventData.projectName} event to win`},
                { name: 'robots', content:  'Hyperfyre, Hypersign, Giveaway, Free, Tokens, Blockchain, How to win, Win, Participate'},,
                { name: 'twitter:card', content: 'summary_large_image'},
                { property: 'og:title', content: this.eventData.projectName},
                { property: 'og:description', content: `Participate in ${this.eventData.projectName} event to win`},
                { property: 'og:site_name', content: this.eventData.projectName },
                { property: 'og:type', content: 'website'},    
                { property: 'og:image', content: this.eventData.logoUrl},
                { property: 'twitter:title', content: this.eventData.projectName},
                { property: 'twitter:description', content: `Participate in ${this.eventData.projectName} event to win`},
                { property: 'og:image:width', content: "1024"},
                { property: 'og:image:height', content: "1024"},

            ]
        }
    },
  computed: {
    timeLeft: function() {
      if (this.eventData.fromDate && this.eventData.projectStatus) {

        const toDateParse = new Date(this.eventData.toDate)
        const fromDateParse = new Date(new Date().toISOString()) // now

        return Math.ceil((toDateParse - fromDateParse) / (1000 * 60 * 60 * 24))
      } else{
        return 0;
      }
    }
  },
  async created() {
    try{
      this.authToken = localStorage.getItem("authToken");
      const userDetail = localStorage.getItem("user")
      if (userDetail) {
        this.userAuthData = JSON.parse(userDetail)
      } else {
        await this.fetchUserDetails();
      }

      if (this.$route.params["slug"]) {
        this.eventSlug = this.$route.params["slug"];
        await this.fetchEventData();
        await this.fetchUserInfoOnLogin();
      }
    }catch(e){
      this.notifyErr(Messages.EVENT.ERROR_OCCURED+ e.message);
    }
  },
  async updated() {

  },
  methods: {
    async updateAuthentication(authToken) {
      try{
        this.authToken = authToken;
        eventBus.$emit('getAuthToken', authToken)
        await this.fetchUserDetails();
        this.fetchUserInfoOnLogin();
      }catch(e){
        this.notifyErr(Messages.EVENT.ERROR_OCCURED + e.message);
      }
    },
    async fetchUserDetails() {
      this.isLoading= true;
      if (this.authToken) {
        const url = `${this.$config.studioServer.BASE_URL}hs/api/v2/auth/protected`;
        let headers = {
          Authorization: `Bearer ${this.authToken}`,
        }
        const res = await apiClient.makeCall({
          url,
          body: {},
          header: headers,
          method: "POST",
        });


        if (res && res.data) {
          this.userAuthData = {
            ...res.data.message
          }
          localStorage.setItem("user", JSON.stringify(this.userAuthData));
          this.userProfileData = JSON.parse(localStorage.getItem('user'))
        } else {
          this.notifyErr(Messages.EVENT.INVALID_RESPONSE)
        }
      } else {
        //this.notifyErr("Authentication token missing")
      }
      this.isLoading=false;
      
    },
    async fetchEventData() {
      this.isLoading=true
      if (this.eventSlug && this.eventSlug != "") {
        let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.eventSlug}?isPublic=true`;
        let headers = {
          "Content-Type": "application/json",
        };
        const resp = await apiClient.makeCall({ method: "GET", url: url, header: headers })
        
        this.eventData = {
          ...resp.data
        }
      } else {
        this.notifyErr(Messages.EVENT.INVALID_PROJECT_SLUG)
      }
      this.isLoading=false;
    },
    async fetchUserInfoOnLogin() {
      this.isLoading= true
      if (this.authToken != "" && this.authToken && this.userAuthData.email) {
        
        this.userProfileData = this.userAuthData
        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor?email=${this.userAuthData.email}&projectId=${this.eventData._id}`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        }

        const res = await apiClient.makeCall({
          url,
          header: headers,
          method: "GET",
        })

        if(res.data.length == 0){
           // a user can participate in event 
           // Participate in event
          try{
            const hypersignAuthAction  = this.eventData.actions.find(x => x.type == "HYPERSIGN_AUTH")
            if(hypersignAuthAction){
              eventBus.$emit('UpdateUserInfoFromEvent', { actionItem: hypersignAuthAction, value: "Authorized"});
            }
          }catch(e){
            console.error(e);
          }
        }

        this.userEventData = {
          ...res.data[0]
        }


        const eventActions = this.eventData.actions;


        if (this.userEventData.actions && this.userEventData.actions.length > 0) {
          this.eventActionsToShow = eventActions.map(ea => {
            const doneAction = this.userEventData.actions.find(ua => ua._id == ea._id)
            if (doneAction) {
              ea["isDone"] = true
              ea.value = doneAction.value
            } else {
              ea["isDone"] = false
            }
            return ea
          })

        } else {
          this.eventActionsToShow = eventActions
        }
      }
      
      this.isLoading=false;
    },
    updateUserData(userEventData) {
      if (userEventData) {
        this.userEventData = {
          ...userEventData
        }
      }
    }
    
  },
  mixins:[notificationMixins],
};
</script>
<style scoped>
.content {
  margin-top: 20px;
  padding: 2px;
  min-width: 650px;
  height: 500px;
  margin-left: 35%;
  margin-right: 30%;
  max-height: 700px;
  overflow-y: auto;
  background: rgb(204, 203, 203);
  border-radius: 20px;
}

.QRRefresh {
  width: 100%;
  align-content: center;
  height: 100%;
  cursor: pointer;
  margin-top: 14%;
}

.metric {
  margin-left: 783px;

  margin-bottom: 120px;
}
</style>