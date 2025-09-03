// store/modules/collaborator.js
import { api, publicApi } from "@/utils/api";

const state = () => ({
  collaborators: [],
  collaboratorDetail: [],
  personalCollaborator: [],
  collaboratorByChapter: [],
  collaboratorByPending: [],
  editCollaboratorId: null,
  total: 0,
  page: 0,
  perPage: 10,
  loading: false,
});

const getters = {
  allBooks: (state) => state.collaborators,
  personalCollaborator: (state) => state.personalCollaborator,
  totalCollaborators: (state) => state.total,
  page: (state) => state.page,
  perPage: (state) => state.perPage,
  loading: (state) => state.loading,
  collaboratorDetail: (state) => state.collaboratorDetail,
  collaboratorByChapter: (state) => state.collaboratorByChapter,
  collaboratorByPending: (state) => state.collaboratorByPending,
};

const actions = {
  async fetchCollaborators({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        cari: payload?.cari || "",
        page: payload?.page || 0,
        per_page: payload?.per_page || 10,
        sort_by: payload?.sort_by || "id",
        sort_type: payload?.sort_type || "ASC",
      };

      const response = await api.post(
        "/collaborators/get-all-collaborators",
        body
      );
      const { data } = response.data;

      commit("SET_COLLABORATORS", data);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  setEditCollaboratorId({ commit }, id) {
    commit("SET_EDIT_COLLABORATOR_ID", id);
  },

  async fetchCollaboratorByChapter({ commit }, chapter_id) {
    commit("SET_LOADING", true);
    try {
      const body = { chapter_id };
      const response = await api.post(
        "/collaborators/get-collaborator-by-chapter",
        body
      );
      commit("SET_COLLABORATOR_BY_CHAPTER", response.data.data);
    } catch (error) {
      console.error("Error fetching collaborator by chapter:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchCollaboratorById({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      const response = await api.post(
        "/collaborators/get-collaborator-by-id",
        body
      );
      commit("SET_COLLABORATOR_DETAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching collaborator by id:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchPersonalCollaborator({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        collaborator_id: payload.collaborator_id,
      };
      const response = await publicApi.post(
        "/collaborators/get-personal-collaborator",
        body
      );
      commit("SET_PERSONAL_COLLABORATOR", response.data.data);
    } catch (error) {
      console.error("Error fetching personal collaborator:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUpdateCollaborator({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        script: payload.script,
        haki: payload.haki,
        identity: payload.identity,
        address: payload.address,
      };

      await api.post("/collaborators/update-collaborator", body);
    } catch (error) {
      console.error("Error update collaborator:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchApproveCollaborator({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = { id: payload.id, reviewer_id: payload.reviewer_id };
      await api.post("/collaborators/approve-collaborator", body);
    } catch (error) {
      console.error("Error approve collaborator:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchNeedUpdateCollaborator({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        reviewer_id: payload.reviewer_id,
        notes: payload.notes,
      };

      await api.post("/collaborators/need-update-collaborator", body);
    } catch (error) {
      console.error("Error update collaborator status:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchCollaboratorByPending({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await api.post(
        "/collaborators/get-collaborator-by-pending"
      );
      commit("SET_COLLABORATOR_BY_PENDING", response.data.data);
    } catch (error) {
      console.error("Error fetch data:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_COLLABORATORS(state, collaborators) {
    state.collaborators = collaborators;
  },
  SET_PERSONAL_COLLABORATOR(state, collaborator) {
    state.personalCollaborator = collaborator;
  },
  SET_COLLABORATOR_DETAIL(state, collaborator) {
    state.collaboratorDetail = collaborator;
  },
  SET_COLLABORATOR_BY_CHAPTER(state, collaborator) {
    state.collaboratorByChapter = collaborator;
  },
  SET_COLLABORATOR_BY_PENDING(state, collaborator) {
    state.collaboratorByPending = collaborator;
  },
  SET_EDIT_COLLABORATOR_ID(state, id) {
    state.editCollaboratorId = id;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
