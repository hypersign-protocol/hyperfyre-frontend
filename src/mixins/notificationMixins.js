export default {
  methods: {
    notifySuccess(msg) {
      this.isLoading = false;
      this.$notify({
        group: "foo",
        title: "Information",
        type: "success",
        text: msg,
      });
    },

    notifyErr(msg) {
      this.isLoading = false;
      this.$notify({
        group: "foo",
        title: "Error",
        type: "error",
        text: msg,
      });
    },
    notifyWarning(msg) {
      this.isLoading = false;
      this.$notify({
        group: "foo",
        title: "Warning",
        type: "warn",
        text: msg,
      });
    },
    notifyInfo(msg) {
      this.isLoading = false;
      this.$notify({
        group: "foo",
        title: "Information",
        type: "info",
        text: msg,
      });
    },
  },
};
