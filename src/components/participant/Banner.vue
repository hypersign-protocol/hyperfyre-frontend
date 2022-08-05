<template>
  <b-row>
    <b-col md="12">
      <b-card no-body class="banner rounded-0">
        <img :src="logoUrl" @error="onBannerError($event)" v-if="!brokenUrl" />
        <div class="no-banner" v-if="brokenUrl">
          {{ eventName }}
        </div>
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
    logoUrl: String,
  },
  data() {
    return {
      brokenUrl: false,
    };
  },
  methods: {
    onBannerError(e) {
      console.error(e);
      this.brokenUrl = true;
    },
  },
};
</script>
<style scoped>
.no-banner {
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 600;
}
</style>
