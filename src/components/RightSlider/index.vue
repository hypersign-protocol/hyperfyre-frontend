<template>
  <div>
    <v-navigation-drawer
      v-model="currentContent.item"
      stateless
      app
      color="bg-blue-100"
      right
      fixed
      temporary
      :width="$vuetify.breakpoint.smAndDown ? '100%' : currentContent.width"
      class="full-height"
    >
      <component
        v-if="loader"
        :is="loader"
        :data="currentContent.itemData"
      ></component>
    </v-navigation-drawer>
  </div>
</template>
<script>
import slider from "@/mixins/slider";
export default {
  name: "RightSlider",
  data() {
    return {
      componentName: "rightSlider",
      loading: false,
      component: null,
      options: {},
      headers: [],
    };
  },
  computed: {
    loader() {
      if (!this.currentContent.componentName) {
        return null;
      }
      return require(`../../forms/${this.currentContent.componentName}`)
        .default;
    },
    currentContent() {
      return this.$store.state.rightSlider;
    },
  },
  mixins: [slider],
  methods: {
    closeSlider() {
      this.$store.commit("rightSlider/RESET_SLIDER");
    },
  },
};
</script>
<style scoped></style>
