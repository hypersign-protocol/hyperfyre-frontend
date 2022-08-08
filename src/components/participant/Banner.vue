<template>
  <b-row>
    <b-col md="12">
      <b-card no-body class="banner rounded-0">
        <img :src="logoUrl" @error="onBannerError($event)" v-if="!brokenUrl">
        <div class="no-banner" v-if="brokenUrl">
          <!-- {{eventName}} -->
         {{ truncate1(eventName,30) }}
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import {truncate} from '../../mixins/fieldValidationMixin'
export default {
  props: {
    eventName: String,
    themeColor: String,
    fontColor: String,
    fromDate: String,
    toDate: String,
    logoUrl: String
  },
  data() {
    return {
      brokenUrl: false,
    }
  },
  methods: {
      truncate1(str, number) {
      return truncate(str, number);
    },
    onBannerError(e) {
      console.error(e);
      this.brokenUrl = true
    }
  }
};
</script>
<style scoped>
  .no-banner{
    height: 200px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 600;
  }
</style>