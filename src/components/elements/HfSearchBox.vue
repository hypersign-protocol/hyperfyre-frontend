<template>
  <div class="input-group">
      <div class="input-group-prepend">
        <div class="input-group-text" style="background-color: #fcedc8;"><i class="fas fa-search"></i></div>
      </div>
      <input @keyup="emitSearch" type="text"  class="form-control" :placeholder="placeholder" />
    </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      require: false,
    },
  },
  methods: {
    emitSearch(e) {
      this.$emit("executeSearch",e);
    },
  },
};
</script>

<style></style>
