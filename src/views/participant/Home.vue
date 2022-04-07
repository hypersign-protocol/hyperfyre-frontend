<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>

    <b-card no-body class="mx-auto overflow-hidden mt-3 border-0" style="max-width: 600px;">
     <b-list-group>
        <b-list-group-item v-for="event in eventList" :key="event._id" :to="routeUrl(event.slug)"  class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{event.projectName}}</h5>
            <small>{{timeLeft(event)}} days left</small>
        </div>

        <p class="mb-1">
            <template >
                <b-img-lazy v-bind="mainProps" :src="event.logoUrl" alt="Image 1"></b-img-lazy>
            </template> 
        </p>

        <small>Donec id elit non mi porta.</small>
        </b-list-group-item>
    </b-list-group>
    </b-card>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import notificationMixins from "../../mixins/notificationMixins";
import apiClient from "../../mixins/apiClientMixin";
import profileIconMixins from "../../mixins/profileIconMixins";
import eventBus from "../../eventBus.js"
import Messages from "../../utils/messages/admin/en"
export default {
  name: "Home",
  components: {
    Loading
  },
  
  data() {
    return {
        mainProps: {
            center: true,
            fluidGrow: true,
            blank: true,
            blankColor: '#bbb',
            width: 300,
            height: 150,
            class: 'my-5'
        },
      eventList:[],
      eventData: {},
      actions: [],
      authToken: "",
      userEventData: null,
      userAuthData: null,
      eventActionsToShow: [],
      eventSlug: "hello test",
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

    //   if (this.$route.params["slug"]) {
        document.title = "Hyperfyre - User Home";
        await this.fetchEventData();
        // await this.fetchUserInfoOnLogin();
    //   }
    }catch(e){
      this.notifyErr(Messages.EVENT.ERROR_OCCURED+ e.message);
    }
  },
  async updated() {

  },
  methods: {

    routeUrl (slug) {
        let url ="#"
        if(slug) {
          url = "/form/"+ slug;
        }
        return url
    },
    timeLeft (eventData) {
      if (this.eventData.fromDate && this.eventData.projectStatus) {

        const toDateParse = new Date(this.eventData.toDate)
        const fromDateParse = new Date(new Date().toISOString()) // now

        return Math.ceil((toDateParse - fromDateParse) / (1000 * 60 * 60 * 24))
      } else{
        return 0;
      }
    },
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
        let url = `${this.$config.studioServer.BASE_URL}api/v1/home/events?limit=30&page=1`;
        let headers = {
          "Content-Type": "application/json",
        };
        const resp = await apiClient.makeCall({ method: "GET", url: url, header: headers })
        console.log(resp.data,"eventList")
        this.eventList = {
          ...resp.data.liveEvents
        }
      } else {
        this.notifyErr(Messages.EVENT.INVALID_PROJECT_SLUG)
      }
      this.isLoading=false;
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
.list-group-item.active {
    background-color: #363740c4 !important;
    border-color: #363740c4 !important;
}
</style>
