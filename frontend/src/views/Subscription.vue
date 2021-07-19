<template>
  <div class="home marginLeft marginRight">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>


    
  </div>
</template>

<script>
import fetch from "node-fetch";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import notificationMixins from '../mixins/notificationMixins';
import apiClientMixin from '../mixins/apiClientMixin';

export default {
  name: "Subscription",
  components: { Loading },

  data() {
    return {
      authToken: localStorage.getItem("authToken"),
      isLoading: false,
      fullPage: true,
    };
  },

  async mounted() {
 
  },

  methods: {
    async fetchProjectData(skip, limit) {
      try {
        this.isLoading = true;

        // if (!this.investor.projectId) throw new Error("No project found");

        // const url = `${this.$config.studioServer.BASE_URL}api/v1/project/${this.investor.projectId}?fetchInvestors=true&limit=${limit}&skip=${skip}&searchQuery=${this.tableSearch}`;
        // // console.log(url);
        // const headers = {
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${this.authToken}`,
        // };
        // const resp = await fetch(url, {
        //   headers,
        //   method: "GET",
        // });

        // if (!resp.ok) {
        //   return this.notifyErr(resp.statusText);
        // }
        // const json = await resp.json();

        // this.project = { ...json };
        // this.sourceData = { ...json };
        // this.project.fromDate = this.formateDate(this.project.fromDate);
        // this.project.toDate = this.formateDate(this.project.toDate);
        // this.projectFetched = true;


        // this.pageSelectDropdown = Array.from({length: Math.ceil(this.project.count / this.perPage)}, (_, i) => i + 1)

      
        // this.notifySuccess(
        //   "Project is fetched. ProjectName " + json.projectName
        // );


      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
    },

    async saveInvestor() {
      try {
        this.isLoading = true;

        // const url = `${this.$config.studioServer.BASE_URL}api/v1/investor`;
        // let headers = {
        //   "Content-Type": "application/json",
        //   "Authorization": `Bearer ${this.authToken}`,
        // };
        // const resp = await fetch(url, {
        //   method: "POST",
        //   body: JSON.stringify(this.investor),
        //   headers,
        // });

        // if (!resp.ok) {
        //   return this.notifyErr(resp.statusText);
        // }

        // const json = await resp.json();
        // this.isDataSaved = true;
        // this.notifySuccess("Your data is saved. Id = " + json._id);
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
        this.clear();
      }
    },
  },

  mixins: [notificationMixins]
};
</script>
