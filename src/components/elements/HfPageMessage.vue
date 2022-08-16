<template>
  <h3 v-html="message">{{ message }}</h3>
</template>

<script>
export default {
  props: {
    message: String,
  },
};
</script>

<style>

</style>
