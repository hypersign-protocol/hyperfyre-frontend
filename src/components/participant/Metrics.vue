<template>
  <b-row class="metrics-info border-bottom-0">
    <b-col cols="4" sm="4" class="border-right" md="4">
      <div class="py-4">
        <div class="number">{{ userScore }}</div>
        <div class="text">Your Score</div>
      </div>
    </b-col>
    <b-col cols="4" sm="4" class="border-right" md="4">
      <div class="py-4">
        <div class="number">{{ totalEntries }}</div>
        <div class="text">Total Users</div>
      </div>
    </b-col>
    <b-col cols="4" sm="4" md="4">
      <div class="py-4">
        <div class="number">{{ timeLeft}}</div>
        <div class="text">Days Left</div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    userScore: Number,
    totalEntries: Number,
    timeLeft: Number
  },

  data() {
    return {
      timeUnit: "Days"
    }
  }
}
</script>
<style scoped>
.card {
  padding: 10px;
  width: 200px;
  height: 100px;
  background-color: whitesmoke;
  border-color: grey;
  border-radius: 5px;
  font: bolder;
  float: left;
  margin-right: 10px;
  font-size: larger;
  font-weight: bold;
}
</style>