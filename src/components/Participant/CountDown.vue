<template>
  <div class="d-flex align-center justify-center">
    <template v-for="(item, index) in times">
      <div :key="index">
        <span class="font-16 line-h-19 font-weight-bold white--text mb-1">
          {{ item.time }}{{ item.text }}
          <span class="mx-1" v-if="item.colon">:</span>
        </span>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "CountDown",
  props: {
    startTime: {
      required: true,
    },
    endTime: {
      required: true,
    },
  },
  data() {
    return {
      times: [
        { id: 0, text: "d", time: 1, colon: true },
        { id: 1, text: "h", time: 1, colon: true },
        { id: 2, text: "m", time: 1, colon: true },
        { id: 3, text: "s", time: 1, colon: false },
      ],

      progress: 100,
      timeinterval: undefined,
    };
  },

  mounted() {
    console.log(this.startTime, this.endTime);
  },

  methods: {
    updateTimer() {
      if (
        this.times[3].time > 0 ||
        this.times[2].time > 0 ||
        this.times[1].time > 0 ||
        this.times[0].time > 0
      ) {
        this.getTimeRemaining();
        this.updateProgressBar();
      } else {
        clearTimeout(this.timeinterval);
        this.progress = 0;
      }
    },
    getTimeRemaining() {
      let t = Date.parse(new Date(this.endTime)) - Date.parse(new Date());
      if (t >= 0) {
        this.times[3].time = Math.floor((t / 1000) % 60); //seconds
        this.times[2].time = Math.floor((t / 1000 / 60) % 60); //minutes
        // this.times[1].time = Math.floor((t / (1000 * 60 * 60)) % 24); //hours
        this.times[1].time = Math.floor((t % 86400000) / 3600000); //hours
        this.times[0].time = Math.floor(t / (1000 * 60 * 60 * 24)); //days
      } else {
        this.times[3].time =
          this.times[2].time =
          this.times[1].time =
          this.times[0].time =
            0;
        this.progress = 0;
      }
    },
    updateProgressBar() {
      let startTime = Date.parse(new Date(this.startTime));
      let currentTime = Date.parse(new Date());
      let endTime = Date.parse(new Date(this.endTime));
      let interval = parseFloat(
        ((currentTime - startTime) / (endTime - startTime)) * 100
      ).toFixed(2);
      this.progress = 100 - interval;
    },
  },
  created() {
    this.updateTimer();
    this.timeinterval = setInterval(this.updateTimer, 1000);
  },
};
</script>
<style lang="css" scoped></style>
