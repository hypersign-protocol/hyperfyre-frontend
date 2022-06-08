<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <div class="container mx-auto overflow-hidden mt-3 border-0">
      <div>
        <h1 class="mainTitle kdJiCp">
          Discover, participate, and win extraordinary Giveaways
        </h1>
      </div>
      <div>
        <h2 class="llcnwK kdJiCp">
          Trending events on <span class="TrendingCollections">#HyperFyre</span>
        </h2>
      </div>

      <div class="row flex-row flex-nowrap" style="overflow-x: scroll">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="event in eventList" :key="event._id"
          @click="gotoUrl(event.slug)">
          <b-card :img-src="event.logoUrl" img-alt="Image" img-height="150" img-width="300" img-top tag="article"
            class="text-center" bg-variant="dark" text-variant="white">
            <b-card-title style="font-size: larger">
              {{ truncate1(event.projectName, 20) }}
            </b-card-title>
            <b-card-sub-title> </b-card-sub-title>
            <div class="col">
              <div class="card-profile-stats d-flex justify-content-center">
                 <div>
                    <ul style="list-style: none; width:109px">
                      <li class="description">Total Users</li>
                      <li><i class="fa fa-users"></i></li>
                      <li class="heading">{{ event.investorsCount }}</li>
                    </ul>
                    </div>
                 <div>
                    <ul style="list-style: none; width:100px">
                      <li class="description">Days Left</li>
                      <li><i class="fa fa-clock"></i></li>
                      <li class="heading"> {{ timeLeft(event) }}</li>
                    </ul>
                  </div>
              </div>
            </div>
          </b-card>
        </div>
      </div>
      <div class="flex-row flex-nowrap kdJiCp">
        <button class="btn btn-warning" @click="prevT" style="margin-right: 2px">Previous</button>
        <Button class="btn btn-warning" @click="nextT" style="margin-right: 2px">Next</Button>
      </div>
      <!--- List view ends -->
      <div>
        <h2 class="llcnwK kdJiCp">Your events</h2>
      </div>

      <template v-if="authToken == '' || authToken == null">
        <Login @AuthTokenUpdateEvent="updateAuthentication" />
      </template>

      <template v-else>

       <div>
          <div v-if="Object.values(userEventList).length > 0">
            <div class="row flex-row flex-nowrap" style="overflow-x: scroll">
              <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="event in userEventList" :key="event._id"
                @click="gotoUrl(event.slug)">
                <b-card :img-src="event.logoUrl" img-alt="Image" img-height="150" img-width="300" img-top tag="article"
                  class="text-center rounded" bg-variant="dark" text-variant="white">
                  <b-card-title style="font-size: larger">
                    {{ truncate1(event.projectName, 20) }}
                  </b-card-title>
                  <b-card-sub-title> </b-card-sub-title>
                  <div class="col">
                    <div class="card-profile-stats d-flex justify-content-center">
                      <div>
                        <ul style="list-style: none; width:100px">
                          <li class="description">Days Left</li>
                          <li><i class="fa fa-clock"></i></li>
                          <li class="heading">{{ timeLeft(event) }}</li>
                        </ul>
                      </div>
                      <div>
                        <ul style="list-style: none;  width:100px">
                          <li class="description">Score</li>
                          <li><i class="fa fa-trophy"></i></li>
                          <li class="heading">{{ event.numberOfReferals }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </b-card>

              </div>
            </div>
            <div class="flex-row flex-nowrap kdJiCp">
              <button class="btn btn-warning" @click="prev" style="margin-right: 2px">Previous</button>
              <Button class="btn btn-warning" @click="next" style="margin-right: 2px">Next</Button>
            </div>
          </div>
          <div v-else class="row flex-row flex-nowrap kdJiCp alert alert-warning">
            No events found
          </div>

        </div>
        <div class="flex-row flex-nowrap kdJiCp">
          <button class="btn btn-warning" @click="prev" style="margin-right: 2px">Previous</button>
          <Button class="btn btn-warning" @click="next" style="margin-right: 2px">Next</Button>

        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import notificationMixins from "../../mixins/notificationMixins";
import apiClient from "../../mixins/apiClientMixin";
import profileIconMixins from "../../mixins/profileIconMixins";
import eventBus from "../../eventBus.js";
import Messages from "../../utils/messages/admin/en";
import Login from "../../components/participant/Login.vue";

import { truncate } from "../../mixins/fieldValidationMixin.js";
export default {
  name: "Home",
  components: {
    Loading,
    Login,
  },

  data() {
    return {
      pageT: this.pageT < 1 ? 1 : 1,
      page: this.page < 1 ? 1 : 1,
      slide: 0,
      sliding: null,
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        width: 150,
        height: 75,
        class: "my-5",
      },
      eventList: [],
      userEventList: [],
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
      prizeData: [],
      leaderBoardData: [],
    };
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

  computed: {},
  async created() {
    try {
      this.authToken = localStorage.getItem("authToken");
      const userDetail = localStorage.getItem("user");
      if (userDetail) {
        this.userAuthData = JSON.parse(userDetail);
        this.fetchUserEventData();
      } else {
        await this.fetchUserDetails();
      }

      //   if (this.$route.params["slug"]) {
      document.title = "Hyperfyre - User Home";
      await this.fetchEventData();
      // await this.fetchUserInfoOnLogin();
      //   }
    } catch (e) {
      this.notifyErr(Messages.EVENT.ERROR_OCCURED + e.message);
    }
  },
  async updated() {},
  methods: {
  async prevT() {
      this.pageT = this.pageT <= 1 ? 1 : this.pageT - 1;
      await this.fetchEventData();
    },
    async nextT() {
      ++this.pageT;
      await this.fetchEventData();

      if (this.pageT > 1 && Object.values(this.eventList).length === 0) {
        --this.pageT;

        await this.fetchEventData();
      }
    },

    async prev() {
      this.page = this.page <= 1 ? 1 : this.page - 1;
      await this.fetchUserEventData();
    },
    async next() {
      ++this.page;
      await this.fetchUserEventData();

      if (this.page > 1 && Object.values(this.userEventList).length === 0) {
        --this.page;

        await this.fetchUserEventData();
      }
    },
    gotoUrl(path) {
     const url= `${window.location.origin}/form/${path}` 
        window.open(url)
    },
    formateDate(d) {
      if (d) {
        let date = new Date(d);
        return (
          date.toDateString() +
          " " +
          date.toLocaleString("en-US", { hour: "numeric", hour12: true })
        );
      } else {
        return new Date();
      }

      // return new Date(d).toLocaleString();
    },
    truncate1(str, number) {
      return truncate(str, number);
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    routeUrl(slug) {
      let url = "#";
      if (slug) {
        url = "/form/" + slug;
      }
      return url;
    },
    timeLeft(eventData) {
      if (eventData.fromDate && eventData.projectStatus) {
        const toDateParse = new Date(eventData.toDate);
        const fromDateParse = new Date(new Date().toISOString()); // now

        return Math.ceil((toDateParse - fromDateParse) / (1000 * 60 * 60 * 24));
      } else {
        return 0;
      }
    },
    async updateAuthentication(authToken) {
      try {
        this.authToken = authToken;
        eventBus.$emit("getAuthToken", authToken);
        await this.fetchUserDetails();
        this.fetchUserEventData();
      } catch (e) {
        this.notifyErr(Messages.EVENT.ERROR_OCCURED + e.message);
      }
    },
    async fetchUserDetails() {
      this.isLoading = true;
      if (this.authToken) {
        const url = `${this.$config.studioServer.BASE_URL}hs/api/v2/auth/protected`;
        let headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        const res = await apiClient.makeCall({
          url,
          body: {},
          header: headers,
          method: "POST",
        });

        if (res && res.data) {
          this.userAuthData = {
            ...res.data.message,
          };
          localStorage.setItem("user", JSON.stringify(this.userAuthData));
          this.userProfileData = JSON.parse(localStorage.getItem("user"));
        } else {
          this.notifyErr(Messages.EVENT.INVALID_RESPONSE);
        }
      } else {
        //this.notifyErr("Authentication token missing")
      }
      this.isLoading = false;
    },
    async fetchEventData() {
      this.isLoading = true;
      if (this.eventSlug && this.eventSlug != "") {
        let url = `${this.$config.studioServer.BASE_URL}api/v1/project/promoted/events?limit=20&page=1`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await apiClient.makeCall({
          method: "GET",
          url: url,
          header: headers,
        });
        // console.log(resp.data.liveEvents,"eventList")
        this.eventList = {
          ...resp.data.eventList,
        };
      } else {
        this.notifyErr(Messages.EVENT.INVALID_PROJECT_SLUG);
      }
      this.isLoading = false;
    },
    async fetchUserEventData() {
      this.isLoading = true;
      if (this.eventSlug && this.eventSlug != "") {
        let url = `${this.$config.studioServer.BASE_URL}api/v1/investor/events/info?limit=20&page=${this.page}`;
        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        };
        const resp = await apiClient.makeCall({
          method: "GET",
          url: url,
          header: headers,
        });
        this.userEventList = {
          ...resp.data,
        };
      } else {
        this.notifyErr(Messages.EVENT.INVALID_PROJECT_SLUG);
      }
      this.isLoading = false;
    },
  },
  mixins: [notificationMixins, profileIconMixins],
};
</script>
<style scoped>
.card:hover {
  box-shadow: 1px 8px 20px grey;
  -webkit-transition: box-shadow 0.6s ease-in;
}
.mainTitle {
  font-size: 32px;
}
.llcnwK {
  font-weight: 600;
  font-size: 24px;
}
.TrendingCollections {
  display: inline-flex;
  color: rgb(32, 129, 226);
}
.kdJiCp {
  margin: 56px 8px;
  text-align: center;
}
.card-profile-stats {
  padding: 1rem 0;
}
.card-profile-stats > div {
  text-align: center;
  margin-right: 1rem;
}
.card-profile-stats > div .heading {
  font-size: 1.1rem;
  font-weight: 700;
  display: block;
  text-transform: uppercase;
}
.card-profile-stats > div .description {
  font-size: 0.875rem;
  color: #adb5bd;
}
.bg-color {
  background-color: rgb(48, 51, 57);
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
.list-group-item.active {
  background-color: #363740c4 !important;
  border-color: #363740c4 !important;
}
</style>
