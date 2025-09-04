// store/modules/template.js
import { api, publicApi } from "@/utils/api";

const state = () => ({
  templates: [],
  templateDetail: [],
  editTemplateId: null,
  total: 0,
  page: 0,
  perPage: 100,
  loading: false,
});

const getters = {
  allTemplates: (state) => state.templates,
  totaltemplates: (state) => state.total,
  page: (state) => state.page,
  perPage: (state) => state.perPage,
  loading: (state) => state.loading,
  templateDetail: (state) => state.templateDetail,
};

const actions = {
  async fetchTemplates({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        cari: payload?.cari || "",
        page: payload?.page || 0,
        per_page: payload?.per_page || 10,
        sort_by: payload?.sort_by || "id",
        sort_type: payload?.sort_type || "ASC",
      };

      const response = await api.post("/templates/get-all-templates", body);
      const { data } = response.data;

      commit("SET_TEMPLATES", data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createTemplate({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        script_url: payload.script_url,
        haki_url: payload.haki_url,
      };

      await api.post("/templates/create-create-template", body);
    } catch (error) {
      console.error("Create Template Error:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  setEditTemplateId({ commit }, id) {
    commit("SET_EDIT_TEMPLATE_ID", id);
  },

  async fetchTemplateById({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      const response = await api.post("/templates/get-template-by-id", body);
      commit("SET_TEMPLATE_DETAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching template by id:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUpdateTemplate({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        script_url: payload.script_url,
        haki_url: payload.haki_url,
      };

      await api.post("/templates/update-template", body);
    } catch (error) {
      console.error("Error update template:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchDeleteTemplate({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      await api.post("/templates/delete-template", body);
    } catch (error) {
      console.error("Error delete template:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_TEMPLATES(state, templates) {
    state.templates = templates;
  },
  SET_TEMPLATE_DETAIL(state, template) {
    state.templateDetail = template;
  },
  SET_EDIT_TEMPLATE_ID(state, id) {
    state.editTemplateId = id;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
