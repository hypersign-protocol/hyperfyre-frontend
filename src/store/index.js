import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import snackbar from "./modules/Snackbar";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    snackbar,
  },
});
