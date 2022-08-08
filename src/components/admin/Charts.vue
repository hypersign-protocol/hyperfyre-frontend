<template>
  <div class="row">
    <div class="col-md-12 card chart-container" 
    style="height: 98%; position: absolute;font-size:smaller">
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
      sections: [
        { label: "REQUESTS CONSUMED", value: this.totalUsed, color: "#ed5c5c" },
        { label: "REQUESTS LEFT", value: this.unused, color: "#60c860" },
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
    this.totalAvailable = this.user.usage["totalAvailable"];
    this.totalUsed = this.user.usage["totalUsed"];
    this.unused = this.totalAvailable - this.totalUsed;
    this.sections[0].value = this.totalUsed;
    this.sections[1].value = this.unused;
  },
  methods: {
    handleSectionClick() {},
  },
};
</script>
