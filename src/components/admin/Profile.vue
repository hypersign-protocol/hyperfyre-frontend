<style scoped>
.avatar{
  position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%); 
}
.tile-profile{
  text-align: left;
}
.tile-number{
  color: rgb(46, 46, 46);
  font-size: xxx-large;
}
.fVal {
  font-size: xx-small;
  color: gray;
  word-wrap: break-word;
}
.accordion-header-theme{
  background-color: var(--header-bg-color);
  border: 0;
  border-radius: 0px 0px 20px 20px;
}
</style>

<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <div class="row">
      <div class="col-md-6">
        <div class="card tile event-card" >
          <div class="card-body tile-number">{{ projectCount }}</div>
          <div class="card-header accordion-header-theme" :style="headerThemeCss" style="font-size:13px; border-radius: 0px 0px 0px 5px;">TOTAL EVENTS</div>
        </div>
      </div>
      <div class="col-md-6" >
        <div class="card tile event-card">
          <div class="card-body tile-number">{{ schemaCount }}</div>
          <div class="card-header accordion-header-theme" :style="headerThemeCss"  style="font-size:13px; border-radius: 0px 0px 0px 5px;">TOTAL PARTICIPANTS</div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top: 5%">
      <div class="col-md-12 leftAlign ">
        <div class="card tile tile-profile event-card" >
          <div class="card-body">
            <div class="row">
              <div class="col-md-4">
                <b-avatar class="avatar" icon="person-fill" size="8rem"></b-avatar>
              </div>
              <div class="col-md-8" style="flex-wrap: wrap; padding: 20px">
                <p>DID</p>
                <p class="fVal">
                   <a v-if="accessuser.adminDid" target="_blank">{{ accessuser.adminDid }}</a>
                   <a v-else target="_blank">{{ user.id }}</a>
                </p>
                <p>EMAIL</p>
                <p v-if="accessuser.adminEmail" class="fVal">{{ accessuser.adminEmail }}</p>
                <p v-else class="fVal">{{ user.email }}</p>
                <p v-if="user.phoneNumber">
                  Phone Number: {{ user.phoneNumber }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../../config";
import profileIconMixins from "../../mixins/profileIconMixins";
import notificationMixins from "../../mixins/notificationMixins"
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "Profile",
  mounted() {},
  components: {Loading},
  mixins: [profileIconMixins,notificationMixins],
   computed:{
    headerThemeCss(){
    return{
      '--header-bg-color': config.app.headerBGColor,
      '--header-text-color':config.app.headerTextColor
      }
    }
  },
  data() {
    return {
      active: 0,
      userKeys: [],
      appList: [],
      schemaCount: 0,
      projectCount: 0,
      user: {},
      accessuser:{},
      authToken: localStorage.getItem("authToken"),
      accessToken:localStorage.getItem("accessToken"),
      projects: [],
      fullPage:true,
      isLoading:false
    };
  },
  async created() {
    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };
      const accessUser=localStorage.getItem('accessuser') 
     this.accessuser={
        ...JSON.parse(accessUser)
     }
    
    await this.fetchProjects();
   
  },
  methods: {
    async fetchProjects() {
      try {
        this.isLoading = true;

        if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/project`;

        const headers = {
          Authorization: `Bearer ${this.authToken}`,
          AccessToken:`Bearer ${this.accessToken}`
        };
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });

        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }

        const json = await resp.json();
        let investorCount = 0;
        // console.log("JSON", json)
        this.projects = json;
        this.projects.map((x) => {
          investorCount += x.investorsCount;
          x["whitelisting_link"] =
            window.location.origin + "/form?projectId=" + x._id;
          x["investors_link"] =
            window.location.origin + "/admin/participants?projectId=" + x._id;
        });

        this.projectCount = this.projects.length;
        this.schemaCount = investorCount;
        localStorage.setItem(
          "userProjects",
          JSON.stringify({
            projects: this.projects,
            count: this.projectCount,
          })
        );

        // this.notifySuccess("No. of projects fetched " + this.projects.length);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
