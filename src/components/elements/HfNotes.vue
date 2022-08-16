<template>
  <p
    class="my-4 border rounded-lg p-2 modal-text"
    v-html="notes"
    :style="backroundThemeCss"
  >
    {{ notes }}
  </p>
</template>

<script>
import config from "../../config"
export default {
  props: {
    notes: String,
  },
  computed:{
    backroundThemeCss(){
    return{
      '--modal-bg-text': config.app.headerBGColor,
      }
  },
  }
};
</script>

<style>
.modal-text {
  font-size: 12px;
  background-color:var(--modal-bg-text);
}
</style>
