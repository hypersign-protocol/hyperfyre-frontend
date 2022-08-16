<template>
  <p
    class="my-4 border rounded-lg p-2 modal-text"
    v-html="notes"
  >
    {{ notes }}
  </p>
</template>

<script>
export default {
  props: {
    notes: String,
  },
};
</script>

<style>
.modal-text {
  font-size: 12px;
  background: #f0f9ff;
}
</style>
