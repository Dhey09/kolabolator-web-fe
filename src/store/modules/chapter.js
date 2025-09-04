// store/modules/chapter.js
import { api, publicApi } from "@/utils/api";

const state = () => ({
  chapters: [],
  chapterDetail: [],
  chapterByBook: [],
  chapterBychapter: [],
  personalCheckoutChapter: [],
  checkoutChapterList: [],
  editChapterId: null,
  total: 0,
  page: 0,
  perPage: 100,
  loading: false,
  totalChapterByBook: 0,
});

const getters = {
  allChapters: (state) => state.chapters,
  chapterByBook: (state) => state.chapterByBook,
  chapterBychapter: (state) => state.chapterBychapter,
  personalCheckoutChapter: (state) => state.personalCheckoutChapter,
  checkoutChapterList: (state) => state.checkoutChapterList,
  totalChapters: (state) => state.total,
  page: (state) => state.page,
  perPage: (state) => state.perPage,
  loading: (state) => state.loading,
  chapterDetail: (state) => state.chapterDetail,
  totalChapterByBook: (state) => state.totalChapterByBook,
};

const actions = {
  async fetchChapters({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        cari: payload?.cari || "",
        page: payload?.page || 0,
        per_page: payload?.per_page || 10,
        sort_by: payload?.sort_by || "id",
        sort_type: payload?.sort_type || "ASC",
      };

      const response = await api.post("/chapters/get-all-chapters", body);
      const { data } = response.data;

      commit("SET_CHAPTERS", data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createChapter({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        chapter: payload.chapter,
        book_id: payload.book_id,
        title: payload.title,
        price: payload.price,
        deadline: payload.deadline,
        img: payload.img,
      };

      await api.post("/chapters/create-chapter", body);
    } catch (error) {
      console.error("Create Chapter Error:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  setEditChapterId({ commit }, id) {
    commit("SET_EDIT_CHAPTER_ID", id);
  },

  async fetchChapterById({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      const response = await api.post("/chapters/get-chapter-by-id", body);
      commit("SET_CHAPTER_DETAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching chapter by id:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchChapterBychapter({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        chapter_id: payload.chapter_id,
        cari: payload.cari,
      };
      const response = await publicApi.post(
        "/chapters/get-chapter-by-chapter-id",
        body
      );
      commit("SET_CHAPTER_BY_chapter", response.data.data);
    } catch (error) {
      console.error("Error fetching chapter by book:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchChapterByBook({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        book_id: payload.book_id,
        cari: payload.cari,
      };
      const response = await publicApi.post(
        "/chapters/get-chapter-by-book-id",
        body
      );
      commit("SET_CHAPTER_BY_BOOK", response.data.data);
      commit("SET_TOTAL_chapter_BY_BOOK", response.data.total);
    } catch (error) {
      console.error("Error fetching chapter by book:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUpdateChapter({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        chapter: payload.chapter,
        book_id: payload.book_id,
        title: payload.title,
        price: payload.price,
        deadline: payload.deadline,
        img: payload.img,
      };

      await api.post("/chapters/update-chapter", body);
    } catch (error) {
      console.error("Error update chapter:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchDeleteChapter({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      await api.post("/chapters/delete-chapter", body);
    } catch (error) {
      console.error("Error delete chapter:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchCheckoutChapter({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        user_id: payload.user_id,
      };
      await api.post("/chapters/checkout-chapter", body);
    } catch (error) {
      console.error("Error Checkout Chapter:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchPersonalCheckoutChapter({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        checkout_by: payload.checkout_by,
        cari: payload.cari,
      };
      const response = await api.post("/chapters/personal-checkout", body);
      commit("SET_PERSONAL_CHECKOUT_CHAPTER", response.data.data);
    } catch (error) {
      console.error("Error fetching personal checkout chapter:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUploadPaymentProof({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        payment_proof: payload.payment_proof,
      };
      await api.post("/chapters/payment_proof", body);
    } catch (error) {
      console.error("Error Checkout Chapter:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchCheckoutChapterList({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await api.post("/chapters/waiting-chapter", {});
      commit("SET_CHECKOUT_CHAPTER_LIST", response.data.data);
    } catch (error) {
      console.error("Error fetching checkout list:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchApprovalChapter({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        checker_id: payload.checker_id,
        status: payload.status,
      };
      await api.post("/chapters/approval-chapter", body);
    } catch (error) {
      console.error("Error approving chapter:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async importChapter({ commit }, file) {
    commit("SET_LOADING", true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/chapters/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async chapterTemplate({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await api.get("/chapters/template", {
        responseType: "blob", // penting!
      });

      // buat file dari response
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "chapter_template.xlsx"; // nama file
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download gagal:", err);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_CHAPTERS(state, chapters) {
    state.chapters = chapters;
  },
  SET_CHAPTER_BY_chapter(state, chapters) {
    state.chapterBychapter = chapters;
  },
  SET_CHAPTER_BY_BOOK(state, chapters) {
    state.chapterByBook = chapters;
  },
  SET_CHAPTER_DETAIL(state, chapter) {
    state.chapterDetail = chapter;
  },
  SET_EDIT_CHAPTER_ID(state, id) {
    state.editChapterId = id;
  },
  SET_PERSONAL_CHECKOUT_CHAPTER(state, chapter) {
    state.personalCheckoutChapter = chapter;
  },
  SET_CHECKOUT_CHAPTER_LIST(state, chapter) {
    state.checkoutChapterList = chapter;
  },
  SET_TOTAL_chapter_BY_BOOK(state, total) {
    state.totalChapterByBook = total;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
