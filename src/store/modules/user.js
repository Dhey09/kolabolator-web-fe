// store/modules/category.js
import { api, publicApi } from "@/utils/api";

const state = () => ({
  users: [],
  roles: [],
  userDetail: null,
  editUserId: null,
  userEmail: null,
  total: 0,
  page: 0,
  perPage: 100,
  loading: false,
});

const getters = {
  allUsers: (state) => state.users,
  roles: (state) => state.roles,
  totalCategories: (state) => state.total,
  page: (state) => state.page,
  perPage: (state) => state.perPage,
  loading: (state) => state.loading,
  userEmail: (state) => state.userEmail,
};

const actions = {
  async fetchRoles({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        cari: payload.cari || "",
        page: payload.page || 0,
        per_page: payload.per_page || 10,
        sort_by: payload.sort_by || "id",
        sort_type: payload.sort_type || "ASC",
      };

      const response = await api.post("/roles/get-all-roles", body);

      // mapping sesuai response
      const { data } = response.data;

      commit("SET_ROLES", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUsers({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        cari: payload.cari || "",
        page: payload.page || 0,
        per_page: payload.per_page || 10,
        sort_by: payload.sort_by || "id",
        sort_type: payload.sort_type || "ASC",
      };

      const response = await api.post("/users/get-all-users", body);

      // mapping sesuai response
      const { data } = response.data;

      commit("SET_USERS", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async fetchAddUser({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        phone: payload.phone || "-",
        password: payload.password,
        confirm_password: payload.confirm_password,
        role_id: payload.role_id,
      };
      await publicApi.post("/users/create-user", body);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  setEditUserId({ commit }, id) {
    commit("SET_EDIT_USER_ID", id);
  },

  async fetchUserById({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      const response = await api.post("/users/get-user-by-id", body);
      commit("SET_USER_DETAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching user by id:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUserByEmail({ commit }, email) {
    commit("SET_LOADING", true);
    try {
      const body = { email };
      const response = await publicApi.post("/users/get-user-by-email", body);
      commit("SET_USER_EMAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching user email:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUpdateUser({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        img: payload.img,
        name: payload.name,
        username: payload.username,
        email: payload.email,
        phone: payload.phone || "-",
        gelar: payload.gelar,
        pendidikan_akhir: payload.pendidikan_akhir,
        tmpt_lahir: payload.tmpt_lahir,
        tgl_lahir: payload.tgl_lahir,
        jenis_kelamin: payload.jenis_kelamin,
        agama: payload.agama,
        pekerjaan: payload.pekerjaan,
        alamat: payload.alamat,
      };
      await api.post("/users/update-user", body);
    } catch (error) {
      console.error("Error update users:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchDeleteUser({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      await api.post("/users/delete-user", body);
    } catch (error) {
      console.error("Error fetching user by id:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_USER_DETAIL(state, user) {
    state.userDetail = user;
  },
  SET_EDIT_USER_ID(state, id) {
    state.editUserId = id;
  },
  SET_USER_EMAIL(state, email) {
    state.userEmail = email;
  },
  SET_ROLES(state, role) {
    state.roles = role;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
