export default {
  namespaced: true,
  state: () => ({
    list: [],
    item: null,
  }),
  getters: {},
  mutations: {
    RESET_SNACKBAR(state) {
      state.item = null;
    },
    SET_SNACKBAR(state, data) {
      state.item = data;
    },
  },
  actions: {
    SHOW({ commit }, payload) {
      commit("RESET_SNACKBAR");
      commit("SET_SNACKBAR", payload);
      return payload;
    },
  },
};
