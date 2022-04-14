<template>
  <div class="pt-42 pr-27">
    <div class="d-flex flex-column align-center">
      <p class="mb-2 font-24 line-h-29 font-weight-bold white--text">
        <span v-if="userEventData && userEventData.numberOfReferals">{{
          userEventData.numberOfReferals
        }}</span>
        <span v-else>0</span>
      </p>
      <p class="font-16 line-h-19 font-weight-bold color-grey-100">
        Total Points
      </p>
    </div>
    <count-down :startTime="startDate" :endTime="endDate"></count-down>
    <div class="my-24">
      <p
        class="width-128 text-center ma-auto font-12 line-h-15 font-weight-bold color-grey-100"
      >
        Finish on or before the countdown ends
      </p>
    </div>
    <div
      class="gradient-#3A0088 d-flex flex-column align-center justify-center refer__wrap border-r-4 width-207 ma-auto text-center px-18 py-25"
    >
      <v-icon color="#fff" class="mb-2">mdi-account-plus-outline</v-icon>
      <p class="font-12 line-h-15 font-weight-bold white--text mb-2">
        Refer and gain +15 points
      </p>
      <p class="font-12 line-h-15 font-weight-regular white--text mb-28">
        You can gain more points by referring your friends
      </p>
      <p class="font-12 line-h-15 font-weight-bold white--text mb-2">
        Your Referral Code
      </p>
      <div class="border-r-4 px-3 border-1">
        <span class="font-12 line-h-15 font-weight-bold white--text"
          >z420run34txu</span
        >
      </div>
      <v-btn
        block
        color="white"
        :ripple="false"
        elevation="0"
        class="letter-s-0 border-r-2 mt-17 text-capitalize px-5 py-2 color-primary-100"
      >
        Share Now
      </v-btn>
    </div>
  </div>
</template>

<script>
import CountDown from "./CountDown";
export default {
  name: "Metrics",
  components: {
    CountDown,
  },
  props: {
    startDate: {
      required: true,
    },
    endDate: {
      required: true,
    },
    userEventData: {
      required: true,
    },
  },
  mounted() {
    console.log(this.startDate, this.endDate);
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
