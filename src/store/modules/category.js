// store/modules/category.js
import { api, publicApi } from "@/utils/api";

const state = () => ({
  categories: [],
  categoryDetail: [],
  editCategoryId: null,
  total: 0,
  page: 0,
  perPage: 10,
  loading: false,
});

const getters = {
  allCategories: (state) => state.categories,
  totalCategories: (state) => state.total,
  page: (state) => state.page,
  perPage: (state) => state.perPage,
  loading: (state) => state.loading,
  categoryDetail: (state) => state.categoryDetail,
};

const actions = {
  async fetchCategories({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        cari: payload?.cari || "",
        page: payload?.page || 0,
        per_page: payload?.per_page || 10,
        sort_by: payload?.sort_by || "id",
        sort_type: payload?.sort_type || "ASC",
      };

      const response = await publicApi.post(
        "/categories/get-all-categories",
        body
      );
      const { data } = response.data;

      commit("SET_CATEGORIES", data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createCategory({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        img: payload?.img || "",
        name: payload?.name || "",
      };

      await publicApi.post("/categories/create-category", body);
    } catch (error) {
      console.error("Create Category Error:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  setEditCategoryId({ commit }, id) {
    commit("SET_EDIT_CATEGORY_ID", id);
  },

  async fetchCategoryById({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      const response = await api.post("/categories/get-category-by-id", body);
      commit("SET_CATEGORY_DETAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching category by id:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUpdateCategory({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        img: payload?.img || "",
        name: payload?.name || "",
      };

      await api.post("/categories/update-category", body);
    } catch (error) {
      console.error("Error update category:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchDeleteCategory({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      await api.post("/categories/delete-category", body);
    } catch (error) {
      console.error("Error delete category:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_CATEGORY_DETAIL(state, category) {
    state.categoryDetail = category;
  },
  SET_EDIT_CATEGORY_ID(state, id) {
    state.editCategoryId = id;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
