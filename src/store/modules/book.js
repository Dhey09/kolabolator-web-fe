// store/modules/book.js
import { api, publicApi } from "@/utils/api";

const state = () => ({
  books: [],
  bookDetail: [],
  bookByCategory: [],
  editBookId: null,
  total: 0,
  page: 0,
  perPage: 100,
  loading: false,
});

const getters = {
  allBooks: (state) => state.books,
  newestBooks: (state) => {
    const now = new Date();
    return state.books
      .filter((book) => {
        const created = new Date(book.createdAt);
        const diffDays = (now - created) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  bookByCategory: (state) => state.bookByCategory,
  totalBooks: (state) => state.total,
  page: (state) => state.page,
  perPage: (state) => state.perPage,
  loading: (state) => state.loading,
  bookDetail: (state) => state.bookDetail,
};

const actions = {
  async fetchBooks({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        cari: payload?.cari || "",
        page: payload?.page || 0,
        per_page: payload?.per_page || 10,
        sort_by: payload?.sort_by || "id",
        sort_type: payload?.sort_type || "ASC",
      };

      const response = await api.post("/books/get-all-books", body);
      const { data } = response.data;

      commit("SET_BOOKS", data);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createBook({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        title: payload.title,
        category_id: payload.category_id,
        author: payload.author,
        description: payload.description,
        img: payload.img,
      };

      await api.post("/books/create-book", body);
    } catch (error) {
      console.error("Create book Error:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  setEditBookId({ commit }, id) {
    commit("SET_EDIT_BOOK_ID", id);
  },

  async fetchBookById({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      const response = await api.post("/books/get-book-by-id", body);
      commit("SET_BOOK_DETAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching book by id:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchBookByCategory({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        category_id: payload.category_id,
        cari: payload.cari,
      };
      const response = await publicApi.post(
        "/books/get-book-by-category",
        body
      );
      commit("SET_BOOK_BY_book", response.data.data);
    } catch (error) {
      console.error("Error fetching book by category:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUpdateBook({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        title: payload.title,
        book_id: payload.book_id,
        author: payload.author,
        description: payload.description,
        img: payload.img,
      };

      await api.post("/books/update-book", body);
    } catch (error) {
      console.error("Error update book:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchDeleteBook({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      await api.post("/books/delete-book", body);
    } catch (error) {
      console.error("Error delete book:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUpdateBookStatus({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        status: payload.status,
        isbn_confirmation: payload.isbn_confirmation,
      };

      await api.post("/books/update-book-status", body);
    } catch (error) {
      console.error("Error update book status:", error);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async importBook({ commit }, file) {
    commit("SET_LOADING", true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/books/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async bookTemplate({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await api.get("/books/template", {
        responseType: "blob", // penting!
      });

      // buat file dari response
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "book_template.xlsx"; // nama file
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
  SET_BOOKS(state, books) {
    state.books = books;
  },
  SET_BOOK_BY_book(state, book) {
    state.bookByCategory = book;
  },
  SET_BOOK_DETAIL(state, book) {
    state.bookDetail = book;
  },
  SET_EDIT_BOOK_ID(state, id) {
    state.editBookId = id;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
