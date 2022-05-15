<template>
  <div
    class="border-r-4 rounded-br-0 rounded-bl-0 bg-gradient-variant-2 metrics--wrap"
  >
    <template v-if="$vuetify.breakpoint.xsOnly">
      <p
        class="d-flex align-center pa-2 justify-center flex-row font-16 line-h-19 font-weight-bold white--text mb-0"
      >
        <span class="mr-2">Time Remaining -</span>
        <count-down :startTime="startDate" :endTime="endDate"></count-down>
      </p>
      <v-divider color="white"></v-divider>
    </template>

    <div
      class="d-flex align-center justify-space-between border-r-4 rounded-br-0 rounded-bl-0"
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
      <v-divider
        vertical
        color="white"
        v-if="!$vuetify.breakpoint.xsOnly"
      ></v-divider>
      <div
        class="info--box pa-4 d-flex align-center justify-center flex-column"
        v-if="!$vuetify.breakpoint.xsOnly"
      >
        <p class="mb-2 font-14 line-h-29 font-weight-bold white--text">
          <count-down :startTime="startDate" :endTime="endDate"></count-down>
        </p>
        <p class="font-16 line-h-19 font-weight--semibold white--text mb-0">
          Time Left
        </p>
      </div>
      <v-divider vertical color="white"></v-divider>
      <div
        class="info--box pa-4 d-flex align-center justify-center flex-column cursor-pointer"
        @click="showLeaderBoard()"
      >
        <v-icon class="mb-2" color="white">mdil-view-dashboard</v-icon>
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
  methods: {
    showLeaderBoard() {
      this.$emit("getLeaderBoard");
    },
  },
};
</script>
<style lang="css" scoped></style>
