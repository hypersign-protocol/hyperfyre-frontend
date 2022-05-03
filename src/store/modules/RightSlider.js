export default {
  namespaced: true,
  state: () => ({
    item: false,
    title: "",
    list: [],
    width: null,
    component: null,
    componentName: null,
    itemData: {},
  }),
  getters: {
    RightSlider(state) {
      return state;
    },
  },
  mutations: {
    RESET_SLIDER(state) {
      state.item = false;
      state.componentName = null;
      state.width = null;
      state.itemData = {};
    },
    SET_SLIDER(state, payload) {
      state.componentName = payload.componentName;
      state.itemData = payload.data;
      state.title = payload.title;
      state.item = true;
      state.width = payload.width;
    },
  },
  actions: {
    UPDATE({ commit }, payload) {
      commit("RESET_SLIDER");
      commit("SET_SLIDER", payload);
      return payload;
    },
    CREATE({ commit }, payload) {
      commit("RESET_SLIDER");
      commit("SET_SLIDER", payload);
      return payload;
    },
  },
};
