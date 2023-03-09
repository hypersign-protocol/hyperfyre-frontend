<template>
  <b-modal :id="id" hide-footer :title="Header" centered>
    <slot />
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    Header: {
      type: String,
      require: true,
    },
    id:{
      type:String,      
    }
  },
};
</script>

<style></style>