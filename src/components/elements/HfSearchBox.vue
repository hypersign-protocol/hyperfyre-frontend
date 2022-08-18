<template>

  <input @keyup="emitSearch" type="text" 
  style="width:auto"
  class="form-control"
  :placeholder="placeholder" />

</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      require: false,
    },
    // customStyle:{
    //     type:String,
    //     require:false
    // }
  },
  methods: {
    emitSearch(e) {
      this.$emit("executeSearch",e);
    },
  },
};
</script>

<style></style>
