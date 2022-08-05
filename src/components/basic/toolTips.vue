<template>
  <span class="info" @mouseover="renderInforMessage(true)" @mouseleave="renderInforMessage(false)"
    >&#9432;
    <span v-if="hover" class="infoMsg">{{ this.infoMessage }}</span>
  </span>
</template>

<style scoped>
.info:hover {
  color: #ffc107;
  cursor: pointer;
}

.infoMsg {
  max-width: 220px;
  /* background-color: #928f8f; */
  background-color: rgba(245, 244, 244, 0.976);
  color: rgb(71, 71, 71);
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px;
  position: absolute;
  border: 1px solid rgba(255, 193, 7, 0.579);
  z-index: 9999;
}
</style>

<script>
export default {
  props: {
    infoMessage: {
      type: String,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    renderInforMessage(isShow) {
      this.hover = isShow;
    },
  },
};
</script>
