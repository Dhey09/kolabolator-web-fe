// store/modules/form.js
export default {
  namespaced: true,
  state: () => ({
    hasUnsavedChanges: false,
  }),
  mutations: {
    SET_UNSAVED(state, value) {
      state.hasUnsavedChanges = value;
    },
  },
};
