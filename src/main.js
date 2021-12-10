import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Notifications from "vue-notification";
import config from "./config";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
import "@mdi/font/css/materialdesignicons.css";
import "@mdi/light-font/css/materialdesignicons-light.css";
import './assets/css/style.css';
import (`../src/assets/css/theme/${process.env.VUE_APP_BRANDING_SLUG}.css`);
import {
  VeTable,
  VePagination,
  VeIcon,
  VeLoading,
  VeLocale,
} from "vue-easytable"; // import VUE EASY TABLE

import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import VueMeta from 'vue-meta';


// Tell Vue to install the plugin.
// Vue.use(VuejsDialog.main.default);

// Vue.use(vDialog);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Notifications);

//// VUE EASY TABEL ////
Vue.use(VeTable);
Vue.use(VePagination);
Vue.use(VeIcon);
Vue.use(VeLoading);

Vue.prototype.$veLoading = VeLoading;
Vue.prototype.$veLocale = VeLocale;

//// VUE EASY TABLE ////

//// CHARTS ON DASHBAORD
Vue.use(Donut);

Vue.prototype.$config = config;

Vue.use(VueSidebarMenu);

Vue.use(VueMeta)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
