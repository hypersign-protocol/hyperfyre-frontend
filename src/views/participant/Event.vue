<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <b-card no-body class="mx-auto overflow-hidden mt-3 border-0 mainContentWdth">
      <Metrics :authToken="authToken" @getLeaderBoard="fetchLeaderBoard" :leaderBoardData="leaderBoardData"
        :userScore="userEventData && userEventData.numberOfReferals? userEventData.numberOfReferals : 0"
        :totalEntries="eventData && eventData.count ? eventData.count : 0" :timeLeft="timeLeft" />
      <Banner :eventName="eventData.projectName" :themeColor="eventData.themeColor" :fontColor="eventData.fontColor"
        :fromDate="new Date(eventData.fromDate).toLocaleString()" :toDate="new Date(eventData.toDate).toLocaleString()"
        :logoUrl="eventData.logoUrl" />
    </b-card>

    <template v-if="authToken == '' || authToken == null">
      <Login class="mx-auto overflow-hidden mt-3 border-0 mainContentWdth" :themeData="eventData.orgData"
        @AuthTokenUpdateEvent="updateAuthentication" />

      <!-- <Action v-if="eventData.projectStatus" :userProfile="null" :ActionSchema="eventActionsToShow"
        :prizeData="prizeData" @UserUpdateEvent="updateUserData" /> -->
    </template>

    <template>
      <Action v-if="eventData.projectStatus"
        :userProfile="Object.keys(userProfileData).length > 0 ? userProfileData : null"
        :ActionSchema="eventActionsToShow" :authToken="authToken" :prizeData="prizeData"
        @UserUpdateEvent="updateUserData" :themeData="eventData.orgData" />
    </template>

    <template v-if="authToken != '' && authToken != null">
      <ErrorMessage v-if="!eventData.projectStatus" errorMessage="Event is over" />

      <div class="footer mx-auto overflow-hidden mainContentWdth" style="align-items:center;padding-top:20px">
        <b>Disclaimer:</b>
        Anyone can create campaigns on {{appName}}, rewards are distributed by the campaign creator and {{appName}} is
        not
        responsible for reward distribution.
      </div>
    </template>

  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Banner from "../../components/participant/Banner.vue";
import Login from "../../components/participant/Login.vue";
import ErrorMessage from "../../components/participant/ErrorMessage.vue";
import Action from "../../components/participant/Action.vue";
import Metrics from "../../components/participant/Metrics.vue";
import notificationMixins from "../../mixins/notificationMixins";
import apiClient from "../../mixins/apiClientMixin";
import profileIconMixins from "../../mixins/profileIconMixins";
import eventBus from "../../eventBus.js"
import Messages from "../../utils/messages/admin/en"
import config from "../../config"

export default {
  name: "Event",
  components: {
    Banner,
    Login,
    Action,
    Metrics,
    ErrorMessage,
    Loading
  },

  data() {
    return {
      appName: config.appName,
      eventData: {},
      actions: [],
      authToken: "",
      externalUserId:"",
      userEventData: null,
      userAuthData: null,
      eventActionsToShow: [],
      eventSlug: "",
      userProfileData: {},
      isLoading: false,
      fullPage: true,
      prizeData:[],
      leaderBoardData:[]
    }
  },
  /***
  * Need to fix this
  *
  metaInfo () {
    return {
            title: "Test Event",
            titleTemplate: 'Hyperfyre | Event | %s',
            meta: [
                {  property: "og:site_name" , content: "HyperFyre"},
                {  property: "og:type" , content: "website"},
                {  name: "title" , content: `Hyperfyre | Event |  Test Event`},
                {  name: "description" , content: `Participate in  Test Event event to win...`},
                {  property: "og:title" , content: `Hyperfyre | Event |  Test Event`},
                {  property: "og:description" , content: `Participate in  Test Event event to win`},
                {  property: "twitter:description" , content: `Participate in  Test Event event to win...`},
                {  property: "og:url" , content: "https://hswhitelist.netlify.app/form/demo-event-001" },
                {  property: "al:web:url" , content: "https://hswhitelist.netlify.app/form/demo-event-001" },
                {  property: "og:image" , content: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fgiveaway-banner-for-social-media-contests-and-special-offer-vector-vector-id1183256238&f=1&nofb=1"},
                {  name: "twitter:title" , content: "Hyperfyre | Event |  Test Event"},
                {  name: "twitter:description" , content: "Hyperfyre | Event |  Test Event"},
                {  name: "twitter:image" , content: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fgiveaway-banner-for-social-media-contests-and-special-offer-vector-vector-id1183256238&f=1&nofb=1"},
                {  name: "twitter:card" , content: "summary_large_image"},
                {  name: "author" , content: "HyperFyre"},
                {  name: "robots" , content: "index,follow,max-image-preview:large"},
                {  name: "referrer" , content: "unsafe-url"},
        ]
    }
  },*/

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
      if((this.$route.params["slug"])&&(this.$route.query["userRedirectionToken"])){
        this.eventSlug = this.$route.params["slug"];
        this.userRedirectionToken=this.$route.query["userRedirectionToken"];
        document.title = `${config.appName} - `+ this.eventSlug.replace(/-/g," ").toUpperCase();
        await this.verifyAppAuth();
        await this.fetchEventData();
        await this.fetchUserInfoOnLogin();

      }
      else if(this.$route.params["slug"]) {
        this.eventSlug = this.$route.params["slug"];
        document.title = `${config.appName} - `+ this.eventSlug.replace(/-/g," ").toUpperCase();
        await this.fetchEventData();
        await this.fetchUserInfoOnLogin();
      }
    }catch(e){
      if(e && e.indexOf("No event found for id or slug =") >= 0){
        this.$router.push("/404")
      }
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
        await this.fetchUserInfoOnLogin();
      }catch(e){
        this.notifyErr(Messages.EVENT.ERROR_OCCURED + e.message);
      }
    },
    async fetchUserDetails() {
      let headers;
      this.isLoading= true;
      if (this.authToken) {
        if(this.externalUserId){
          headers = {
            Authorization: `Bearer ${this.authToken}`,
            externalusermappingid:`${this.externalUserId}`
          }
        }else{
          headers = {
          Authorization: `Bearer ${this.authToken}`,
        }
        }
        const url = `${this.$config.studioServer.BASE_URL}hs/api/v2/auth/protected`;
        const body= {isParticipant:true}
        const res = await apiClient.makeCall({
          url,
          body,
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
        
        // If it is old event then just recreating this variable using default values from config
        if (!this.eventData['orgData']){
          this.eventData['orgData'] = {}
          if (!this.eventData['orgData'].buttonBGColor){
            this.eventData['orgData'].buttonBGColor = config.app.buttonBgColor
          }

          if (!this.eventData['orgData'].buttonTextColor) {
            this.eventData['orgData'].buttonTextColor = config.app.buttonTextColor
          }

          if (!this.eventData['orgData'].themeColor) {
            this.eventData['orgData'].themeColor = config.app.themeBgColor
          }
        } 

        eventBus.$emit('UpdateThemeEvent', { 
          logoPath: this.eventData['orgData'].logoPath,
          themeColor: this.eventData['orgData'].themeColor,
          buttonTextColor: this.eventData['orgData'].buttonTextColor
        })

        ///  deleting data wich is not required.
        delete this.eventData['orgData'].logoPath
        delete this.eventData['orgData'].themeColor
        delete this.eventData['orgData'].adminId
        delete this.eventData['orgData'].subDomain
        delete this.eventData['orgData']._id
      } else {
        this.notifyErr(Messages.EVENT.INVALID_PROJECT_SLUG)
      }
      this.isLoading=false;
    },
    async verifyAppAuth() {
      try {
        this.isLoading = true
        if (this.userRedirectionToken && this.userRedirectionToken != "") {
          let url = `${this.$config.studioServer.BASE_URL}api/v1/app/grants`;
          let headers = {
            "Content-Type": "application/json",
            "externaluseraccesstoken": `Bearer ${this.userRedirectionToken}`
          };

          const resp = await apiClient.makeCall({ method: "POST", url: url, body: {}, header: headers })

          if (resp && resp.err) {
            throw new Error(resp.err.message)
          }

          this.externalUserId = resp.data.data.externalUserMappingId
          this.authToken = resp.data.data.authToken
          localStorage.setItem("externalUserMappingId", JSON.stringify(this.externalUserId));
          if (this.authToken !== undefined) {
            localStorage.setItem('authToken', this.authToken)
            this.fetchUserDetails()
          }
        }
      }  
      catch (e) {
        if (e.status === 403) {
          localStorage.clear();
          this.notifyErr("Unauthorized. Please go back to your app and try to re-participate from")
          this.authToken = ""
          this.$router.push(`/form/${this.eventSlug}?userRedirectionToken=${this.userRedirectionToken}`)
        } else {
          this.notifyErr(e.message)
        }
      }
      finally {
        this.isLoading = false
      }
    },
    async fetchUserInfoOnLogin() {
      try{
      this.isLoading= true
      if (this.authToken != "" && this.authToken && this.userAuthData.email) {
        
        this.userProfileData = this.userAuthData
        const url = `${this.$config.studioServer.BASE_URL}api/v1/investor?projectId=${this.eventData._id}`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        }
        const res = await apiClient.makeCall({
          url,
          header: headers,
          method: "GET",
        })

        if (res.data == "undefined" || !res.data || res.data.length === 0){
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

        this.prizeData=this.eventData.actions.filter((x) => {
        return x.type ==='PRIZE_CARD'
        })
        const actionWithoutPrize=this.eventData.actions.filter((x) => {
        return x.type !=='PRIZE_CARD'
        })
        const eventActions = actionWithoutPrize;
        if (this.userEventData.actions && this.userEventData.actions.length > 0) {
          this.eventActionsToShow = eventActions.map(ea => {
            const doneAction = this.userEventData.actions.find(ua => ua._id == ea._id)
            if (doneAction) {
              ea["isDone"] = true
              ea.value = doneAction.value
            } else {
              ea["isDone"] = false
            }
            if((ea.type === "ETHEREUM_NETWORK") ||
              (ea.type === "BINANCE_NETWORK") ||
              (ea.type === "MATIC_NETWORK") ||
              (ea.type === "ETHEREUM_ERC20") ||
              (ea.type === "ETHEREUM_ERC721") ||
              (ea.type === "MATIC_ERC20") ||
              (ea.type === "MATIC_ERC721") ||
              (ea.type === "BINANCE_ERC20") ||
              (ea.type === "BINANCE_ERC721") ||
              (ea.type === "REEF_ERC20") ||
              (ea.type === "REEF_ERC721") ||
              (ea.type === "MOONBEAM_ERC20") ||
              (ea.type === "MOONBEAM_ERC721") ||
              (ea.type === "MOONRIVER_ERC20") ||
              (ea.type === "MOONRIVER_ERC721") ||
              (ea.type === "MOON_ERC20") ||
              (ea.type === "MOON_ERC721") ||
              (ea.type === "CUSTOM_API_GET") ||
              (ea.type === "CUSTOM_API_POST")
            ){  
                console.log(ea.value)
                const parsedVal = JSON.parse(ea.value)
                ea.value = parsedVal;
            }
            return ea
          })

        } else {
            this.eventActionsToShow = eventActions;
        }
      } else { 
        this.eventActionsToShow = this.eventData.actions; 
        this.prizeData = this.eventData.actions.filter((x) => {
          return x.type === 'PRIZE_CARD'
        })
      }
      }catch(e){
        eventBus.$emit('logout')
      }finally{
        this.isLoading=false;
      }
    },
    async fetchLeaderBoard() {
      this.isLoading=true
      if (this.eventSlug && this.eventSlug != "" && this.authToken) {
        let url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.eventData._id}/participants/score?limit=100`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await apiClient.makeCall({ method: "GET", url: url, header: headers })

        this.leaderBoardData = resp.data
        this.showLeaderBoardAlert(resp.data)

      } else {
        this.notifyErr(Messages.EVENT.INVALID_AUTH_TOKEN)
      }
      this.isLoading=false;
    },

    updateUserData(userEventData) {
      if (userEventData) {
        this.userEventData = {
          ...userEventData
        }
        this.fetchEventData();
      }
    },
    showLeaderBoardAlert(data){

        var swal_html = `<div class="list-group list-group-flush" style="max-height:500px;overflow-y: scroll;">`;
        data.forEach((element, index) => {
          let img1 = this.getProfileIcon(element.name+index)
          swal_html=swal_html+`<div class="list-group-item d-flex align-items-center">
          <span class="b-avatar mr-3 badge-info rounded-circle">
            <span class="b-avatar-img">
              <img src="`+img1+`" alt="avatar">
            </span><!---->
          </span>
          <span class="mr-auto">`+element.name+`</span>
          <span class="badge badge-primary ">`+element.numberOfReferals+`</span>
        </div> `
        })
        swal_html =swal_html+ `</div>`;
        this.$swal.fire({
          position:'center',
          focusConfirm: true,
          html:swal_html,
          toast:false,
          title:'<h5>Leaderboard</h5>',
          showCloseButton: true,
          showConfirmButton:false,
          width:'50rem',
          background:"white"

        })
    },

  },
  mixins:[notificationMixins,profileIconMixins],
};
</script>
<style scoped>

.mainContentWdth{
  max-width: 600px;
}
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
