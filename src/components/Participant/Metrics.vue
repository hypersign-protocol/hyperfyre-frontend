<template>
  <div class="border-r-4">
    <div
      class="d-flex refer__wrap align-center justify-space-between border-r-4 rounded-br-0 rounded-bl-0"
    >
      <div
        class="info--box pa-4 d-flex align-center justify-center flex-column"
      >
        <p class="mb-2 font-24 line-h-29 font-weight-bold white--text">
          <span v-if="userEventData && userEventData.numberOfReferals">{{
            userEventData.numberOfReferals
          }}</span>
          <span v-else>0</span>
        </p>
        <p class="font-16 line-h-19 font-weight--semibold white--text mb-0">
          Your Score
        </p>
      </div>
      <v-divider vertical color="white"></v-divider>
      <div
        class="info--box pa-4 d-flex align-center justify-center flex-column"
      >
        <p class="mb-2 font-24 line-h-29 font-weight-bold white--text">
          <span v-if="userEventData && userEventData.count">{{
            userEventData.count
          }}</span>
          <span v-else>0</span>
        </p>
        <p class="font-16 line-h-19 font-weight--semibold white--text mb-0">
          Total Users
        </p>
      </div>
      <v-divider vertical color="white"></v-divider>
      <div
        class="info--box pa-4 d-flex align-center justify-center flex-column"
      >
        <p class="mb-2 font-24 line-h-29 font-weight-bold white--text">
          <count-down :startTime="startDate" :endTime="endDate"></count-down>
        </p>
        <p class="font-16 line-h-19 font-weight--semibold white--text mb-0">
          Time Left
        </p>
      </div>
      <v-divider vertical color="white"></v-divider>
      <div
        class="info--box pa-4 d-flex align-center justify-center flex-column"
      >
        <p class="mb-2 font-24 line-h-29 font-weight-bold white--text">0</p>
        <p class="font-16 line-h-19 font-weight--semibold white--text mb-0">
          Leader Board
        </p>
      </div>
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
