<style scoped>
.card-img-top {
      padding-right: 5px !important;
        padding-left: 5px !important;
}
.addmargin {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vue-logo-back {
  background-color: black;
}

.logo {
  width: 144px;
}

.fullbody {
  width: 100%;
}
.floatLeft {
  float: left;
}

.floatRight {
  float: right;
}

.noBullet {
  list-style-type: none;
}

.title {
  color: grey;
  font-size: 18px;
}
.slight-left-margin {
  margin-left: 15px;
}
.far {
  cursor: pointer;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <market-place-slide :projects="projects" @closeMPSlider="clearselected" :openMPSlider="openMPSidebar"/>
    <div class="row">
      <div class="col-md-12">
              <h3>Fyre Marketplace</h3>
      </div>
    </div>
    <div class="row" style="margin-top: 2%">
      <div class="col-md-12" style="text-align: left">
        <div class="card">
          <div class="card-body">
            <h5>
              Disclaimer: Please! note these are 3rd party softwares, 
              any problem related with these apps needs to be resolved in their community.
              Fyre team will support in resolving the issue but will not take reponsibility of loss of assets.
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <b-card
          title="Finance.vote"
          img-src="https://finance.vote/static/media/financevote.58d8bed770991818567e0dc0c3ce8ca3.svg"
          tag="article"
          img-top
          bg-variant="dark"
          img-height="150"
          img-width="150"
          style="max-width: 20rem; margin-top: 20px"
          class="mb-2 eventCard"
          text-variant="white"
        >
          <b-card-text>
            MerkleHash based token airdrop tool for EVM compatible chains.
          </b-card-text>
          <footer>
            <small>
              <b-badge  pill variant="secondary" style="margin-left: 2px">Polygon</b-badge>
              <b-badge  pill variant="secondary" style="margin-left: 2px">Ethereum</b-badge>
              <b-badge  pill variant="secondary" style="margin-left: 2px">BSC</b-badge>
            </small>
            <small style="float: right"> 
              <hf-buttons name="Create" @executeAction="openMPSidebar()" iconClass="text-black" title="Create Event">
              </hf-buttons>
            </small>
          </footer>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// import HfNotes from "../../components/elements/HfNotes.vue";
import notificationMixins from "../../mixins/notificationMixins";
// import ToolTips from "../../components/basic/toolTips";
import config from "../../config";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { shortenName } from "../../mixins/fieldValidationMixin";
import HfButtons from "../../components/elements/HfButtons.vue";
import MarketPlaceSlide from "../../components/admin/marketPlaceSlider/marketPlaceSlide.vue";

export default {
  name: "MarketPlace",
  components: { Loading, HfButtons, MarketPlaceSlide },
  computed: {
    buttonThemeCss() {
      return {
        "background-color": config.app.buttonBgColor,
        "color": config.app.buttonTextColor,
      };
    },
    apps() {
      return this.$store.state.apps;
    },
  },
  data() {
    return {      
      projects:[],
      isLoading: false,
      fullPage: true,
      errors: [],
      authToken: null,
      accessToken: null,
    };
  },
  mounted() {
    if (localStorage.getItem("authToken")) {
      this.authToken = localStorage.getItem("authToken");
    }
    if (localStorage.getItem("accessToken")) {
      this.accessToken = localStorage.getItem("accessToken");
    }
    const userProjectStr = localStorage.getItem("userProjects");
    const userProjectsData = JSON.parse(userProjectStr).projects;
    console.log(userProjectsData);
    this.projects = [...userProjectsData];
    console.log(this.projects);
    this.projects.unshift({
      _id: null,
      projectName: "Select an event",
    });
  },
  methods: {
    
    openSidebar() {      
      this.selectedEvent = null
      this.depositTokenAddress="";
      this.flash = null    
      this.files = null
      this.$root.$emit("bv::toggle::collapse", "sidebar-right");
    }, 
    openMPSidebar() {
      this.$root.$emit("openMPSlider");
    },      
    clearselected() {
      this.projects=[]
    },
    shortenName1(first,last) {
      return shortenName(first,last)
    }   
  },
  mixins: [notificationMixins],
};
</script>
