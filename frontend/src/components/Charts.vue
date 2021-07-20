<template>
  <div class="row">
    <div class="col-md-12">
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
        <h1>{{ totalUsed }}</h1>
      </vc-donut>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalAvailable: 0,
      totalUsed: 0,
      user: {},
      sections: [{ label: "Used Requests", value: 0, color: "#ed5c5c" }],
      sectionsApps: [{ label: "Apps Created", value: 0, color: "#ed5c5c" }],
    };
  },
  created() {
    const subscriptionsInStorage = localStorage.getItem("subscriptions");
    if(subscriptionsInStorage){
      const parsedSub = JSON.parse(subscriptionsInStorage)
      this.totalAvailable = parsedSub && parsedSub.usage ? parsedSub.usage["totalAvailable"]: 0;
      this.totalUsed = parsedSub && parsedSub.usage ? parsedSub.usage["totalUsed"]: 0;
    }    
  },
  methods: {
    handleSectionClick(section, event) {
    },
  },
};
</script>