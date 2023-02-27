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
  // created() {
  //   this.openModal();
  //   this.closeModal();
  // },
  // methods: {
  //   openModal() {
  //     this.$root.$on("modal-show", () => {
  //       this.show = true;
  //     });
  //   },
  //   closeModal() {
  //     this.$root.$on("modal-close", () => {
  //       this.show = false;
  //     });
  //   },
  // },
};
</script>

<style></style>
