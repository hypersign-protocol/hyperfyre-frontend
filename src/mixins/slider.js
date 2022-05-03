export default {
  data: () => ({
    editedItem: {},
  }),
  methods: {
    async openDrawer(type, width, path, data) {
      switch (type) {
        case "add":
          await this.$store.dispatch("rightSlider/CREATE", {
            componentName: `${path}`,
            data: data,
            title: `Add`,
            width: width,
          });
          break;
        case "edit":
          await this.$store.dispatch("rightSlider/UPDATE", {
            componentName: `${path}`,
            data: data,
            title: `Edit`,
            width: width,
          });
          break;
        default:
          return false;
      }
    },
  },
};
