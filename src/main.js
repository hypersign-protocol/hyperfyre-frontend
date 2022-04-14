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

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
