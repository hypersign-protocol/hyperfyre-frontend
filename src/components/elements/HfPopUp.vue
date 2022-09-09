<template>
  <b-modal v-model="show" hide-header-close id="modal" :size="size" :title="Header" header="test" 
  header-class="justify-content-center" hide-footer  close-on-backdrop centered>
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
    size:{
      type:String,
      require:false
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
