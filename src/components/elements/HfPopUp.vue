<template>
  <b-modal v-model="show" hide-footer ref="modal-1" :title="Header" centered>
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
  },
  created() {
    this.openModal();
    this.closeModal();
  },
  methods: {
    openModal() {
      this.$root.$on("modal-show", () => {
        this.show = true;
      });
    },
    closeModal() {
      this.$root.$on("modal-close", () => {
        this.show = false;
      });
    },
  },
};
</script>

<style></style>
