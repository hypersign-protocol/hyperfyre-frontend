<template>
  <div class="row">
    <div class="col-md-12 card chart-container" style="height: 98%; position: absolute;">
      <vc-donut
        background="white"
        foreground="#60c860"
        :size="300"
        unit="px"
        :thickness="30"
        has-legend
        legend-placement="top"
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

<style scoped>
.chart-container {
  border-radius: 5px;
  border: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 35px;
  margin-top: 10px;
  margin-left: 2%;
}
</style>

<script>
export default {
  data() {
    return {
      totalAvailable: 0,
      totalUsed: 0,
      unused: 0,
      user: {},
      usage: {},
      sections: [
        { label: "Requests consumed", value: this.totalUsed, color: "#ed5c5c" },
        { label: "Requests left", value: this.unused, color: "#60c860" },
      ],
      authToken: localStorage.getItem("authToken"),
      accessToken:localStorage.getItem("accessToken"),
    };
  },
  async created() {
    const usrStr = localStorage.getItem("user");
    this.user = {
      ...JSON.parse(usrStr),
    };
    await this.fetchSubscription();

    this.totalAvailable = this.usage["totalAvailable"];
    this.totalUsed = this.usage["totalUsed"];
    this.unused = this.totalAvailable - this.totalUsed;
    this.sections[0].value = this.totalUsed;
    this.sections[1].value = this.unused;

  },
  methods: {
    handleSectionClick() {},
    async fetchSubscription() {
      try {
        this.isLoading = true;

        // if (!this.user.id) throw new Error("No project owner found");

        const url = `${this.$config.studioServer.BASE_URL}api/v1/subscription?usage=true`;
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
        this.usage = json["usage"];
       
        // localStorage.setItem("subscriptions", JSON.stringify(json));
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
