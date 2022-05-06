<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <b-card no-body class="mx-auto overflow-hidden mt-3 border-0" style="max-width: 600px;">
      <Metrics :authToken="authToken" @getLeaderBoard="fetchLeaderBoard" :leaderBoardData="leaderBoardData" :userScore="userEventData && userEventData.numberOfReferals? userEventData.numberOfReferals : 0" :totalEntries="eventData && eventData.count ? eventData.count : 0" :timeLeft="timeLeft" />
      <Banner :eventName="eventData.projectName" :themeColor="eventData.themeColor" :fontColor="eventData.fontColor" :fromDate="new Date(eventData.fromDate).toLocaleString()" :toDate="new Date(eventData.toDate).toLocaleString()" :logoUrl="eventData.logoUrl" />
      <template v-if="authToken == '' || authToken == null">
        <Login :themeColor="eventData.themeColor" :fontColor="eventData.fontColor" @AuthTokenUpdateEvent="updateAuthentication" />
      </template>
    </b-card>
    <template v-if="authToken != '' && authToken != null">
      <ErrorMessage v-if="!eventData.projectStatus" errorMessage="Event is over" />
      <Action v-if="eventData.projectStatus" :userProfile="userProfileData" :ActionSchema="eventActionsToShow" :prizeData="prizeData" @UserUpdateEvent="updateUserData" />
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
      if((this.$route.params["slug"])&&(this.$route.query["redirectionToken"])){
        this.eventSlug = this.$route.params["slug"];
        this.redirectionToken=this.$route.query["redirectionToken"];
        document.title = "Hyperfyre - "+ this.eventSlug.replace(/-/g," ").toUpperCase();
        await this.verifyAppAuth();
        await this.fetchEventData();
        await this.fetchUserInfoOnLogin();

      }
      else if(this.$route.params["slug"]) {
        this.eventSlug = this.$route.params["slug"];
        document.title = "Hyperfyre - "+ this.eventSlug.replace(/-/g," ").toUpperCase();
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
    async verifyAppAuth(){
      try{
        this.isLoading=true
        if(this.redirectionToken && this.redirectionToken!=""){
          let url = `${this.$config.studioServer.BASE_URL}api/v1/app/grants`;
                let headers = {
                  "Content-Type": "application/json",
                  "externaluseraccesstoken":`Bearer ${this.redirectionToken}`
                };
                const resp = await apiClient.makeCall({ method: "POST", url: url, body: {},header: headers })
            this.externalUserId= resp.data.data.externalUserMappingId
            this.authToken=resp.data.data.authToken
            localStorage.setItem("externalUserMappingId", JSON.stringify(this.externalUserId));
            if(this.authToken!==undefined){
              localStorage.setItem('authToken',this.authToken)
              this.fetchUserDetails()
            }  
        }
      }
      catch(e){
          if(e.status===403){
          localStorage.clear();
          this.notifyErr(e.error)
          this.authToken=""
          this.$router.push(`/form/${this.eventSlug}`)
          }
      }
      finally{
        this.isLoading=false
      }
    },
    async fetchUserInfoOnLogin() {
      try{
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

        if(res.data.length === 0){
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
            return ea
          })

        } else {
          this.eventActionsToShow = eventActions
        }
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
