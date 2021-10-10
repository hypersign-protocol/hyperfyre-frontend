<template>
  <b-row>
    <b-col md="12">
      <b-card no-body class="banner rounded-0">
        <img :src="logoUrl" @error="onBannerError($event)">
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    eventName: String,
    themeColor: String,
    fontColor: String,
    fromDate: String,
    toDate: String,
    logoUrl: String
  },
  methods: {
    onBannerError(e) {
      e.target.src = require("../../assets/default-banner.png");
    }
  }
};
</script>