import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";
import "@mdi/light-font/css/materialdesignicons-light.css";
import "@/assets/scss/app.scss";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#6966FB",
        green: "#2AD798",
      },
    },
  },
});
