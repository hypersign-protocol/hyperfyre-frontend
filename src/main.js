import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import config from "./config";
Vue.config.productionTip = false;
Vue.prototype.$config = config;

Vue.use(require("vue-moment"));

import Vue2Filters from "vue2-filters";

Vue.use(Vue2Filters);

import DatetimePicker from "vuetify-datetime-picker";
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(DatetimePicker);

import moment from "moment";

Vue.filter("moment", function (value, format) {
  if (value === null || value === undefined || format === undefined) {
    return "";
  }
  if (format === "from") {
    return moment(value).fromNow();
  }
  return moment(value).format(format);
});

import { TiptapVuetifyPlugin } from "tiptap-vuetify";

Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: "mdi",
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
