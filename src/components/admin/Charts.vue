<template>
  <div class="row">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <div class="col-md-12 card event-card" 
    style="height: 100%; position: absolute;font-size:smaller; padding: 35px; margin-left: 3%;">
      <vc-donut
        background="white"
        foreground="#60c860"
        :size="300"
        unit="px"
        :thickness="30"
        has-legend
        legend-placement="bottom"
        :sections="sections"
        :total="totalAvailable"
        :start-angle="0"
        :auto-adjust-text-size="true"
        @section-click="handleSectionClick"
      >
        <h1>{{ unused }}</h1>
      </vc-donut>
    </div>
  </div>
</template>


<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name:"Charts",
  components:{Loading},
  data() {
    return {
      totalAvailable: 0,
      totalUsed: 0,
      unused: 0,
      user: {}, 
      sections: [
        { label: "REQUESTS CONSUMED", value: this.totalUsed, color: "#ed5c5c" },
        { label: "REQUESTS LEFT", value: this.unused, color: "#60c860" },
      ],
      authToken:null,
      accessToken:null,
      isLoading:false,
      fullPage: true,
    };
  },
  async created() {
    if(localStorage.getItem("authToken")){
      this.authToken = localStorage.getItem("authToken");
    }
    if(localStorage.getItem("accessToken")){
      this.accessToken = localStorage.getItem("accessToken");
    }
    await this.fetchSubscription();
  },
  methods: {
    handleSectionClick() {},
    async fetchSubscription() {
      try {
        this.isLoading = true;
        let headers;
        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription?usage=true`;
         headers = {
          Authorization: `Bearer ${this.authToken}`,
        };
        if(this.authToken && this.accessToken){
          headers = {
          Authorization: `Bearer ${this.authToken}`,
          AccessToken:`Bearer ${this.accessToken}`
        };
        }
        const resp = await fetch(url, {
          headers,
          method: "GET",
        });
        if (!resp.ok) {
          return this.notifyErr(resp.statusText);
        }
        const json = await resp.json();
        this.usage = json["usage"];
        this.totalAvailable = this.usage.totalAvailable;
        this.unused = this.totalAvailable - this.totalUsed;
        this.totalUsed = this.usage.totalUsed;
        this.unused = this.totalAvailable - this.totalUsed;
        this.sections[0].value = this.totalUsed;
        this.sections[1].value = this.unused;
      } catch (e) {
        this.notifyErr(e.message);
      } finally {
        this.isLoading = false;
      }
  },
  },
};
</script>
