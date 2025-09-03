import { api, publicApi } from "@/utils/api"; // pakai publicApi untuk login

const state = () => ({
  user: null,
  token: null,
  loading: false,
});

const getters = {
  isAuthenticated: (state) => {
    return !!state.token || !!localStorage.getItem("access_token");
  },

  userRole: (state) => {
    return state.user?.role_id || Number(localStorage.getItem("role_id"));
  },

  currentUser: (state) => {
    return state.user || JSON.parse(localStorage.getItem("user"));
  },
  loading: (state) => state.loading,
};

const actions = {
  async login({ commit }, { identifier, password }) {
    commit("SET_LOADING", true);

    try {
      const response = await publicApi.post("/login", {
        identifier,
        password,
      });

      const { accessToken, id, role_id, ...userData } = response.data.data;

      // Simpan ke Vuex
      commit("SET_USER", userData);
      commit("SET_TOKEN", accessToken);

      // Simpan ke localStorage
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("userId", id);
      localStorage.setItem("role_id", role_id);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userData, id, role_id })
      );

      return userData;
    } catch (error) {
      throw error.response?.data?.message || "Login gagal";
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async logout({ commit }) {
    commit("SET_LOADING", true);
    try {
      await api.post("/logout");
      commit("LOGOUT");
      localStorage.clear();
    } catch (error) {
      console.error("Error Logout", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async forgotPassword({ commit }, email) {
    commit("SET_LOADING", true);
    try {
      const body = { email };
      await publicApi.post("/forgot-password", body);
    } catch (error) {
      console.error("Error send email:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async resetPassword({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        email: payload.email,
        newPassword: payload.newPassword,
        otp: payload.otp,
      };
      await publicApi.post("/reset-password", body);
    } catch (error) {
      console.error("Error reset pass:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_TOKEN(state, payload) {
    state.token = payload;
  },
  LOGOUT(state) {
    // Reset state ke default
    state.user = null;
    state.token = null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
