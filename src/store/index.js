import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import snackbar from "./modules/Snackbar";
import rightSlider from "./modules/RightSlider";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    snackbar,
    rightSlider,
  },
});
