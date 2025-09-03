// store/modules/payment.js
import { api } from "@/utils/api";

const state = () => ({
  payments: [],
  paymentDetail: [],
  editPaymentId: null,
  total: 0,
  page: 0,
  perPage: 10,
  loading: false,
});

const getters = {
  allPayments: (state) => state.payments,
  totalPayments: (state) => state.total,
  page: (state) => state.page,
  perPage: (state) => state.perPage,
  loading: (state) => state.loading,
  paymentDetail: (state) => state.paymentDetail,
};

const actions = {
  async fetchPayments({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        cari: payload?.cari || "",
        page: payload?.page || 0,
        per_page: payload?.per_page || 10,
        sort_by: payload?.sort_by || "id",
        sort_type: payload?.sort_type || "ASC",
      };

      const response = await api.post("/payments/get-all-payments", body);
      const { data } = response.data;

      commit("SET_PAYMENTS", data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createPayment({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        name: payload.name,
        bank: payload.bank,
        bank_rek: payload.bank_rek,
      };
      await api.post("/payments/create-payment", body);
    } catch (error) {
      console.error("Error add payments:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  setEditPaymentId({ commit }, id) {
    commit("SET_EDIT_PAYMENT_ID", id);
  },

  async fetchPaymentById({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      const response = await api.post("/payments/get-payment-by-id", body);
      commit("SET_PAYMENT_DETAIL", response.data.data);
    } catch (error) {
      console.error("Error fetching payment by id:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchUpdatePayment({ commit }, payload) {
    commit("SET_LOADING", true);
    try {
      const body = {
        id: payload.id,
        name: payload.name,
        bank: payload.bank,
        bank_rek: payload.bank_rek,
      };
      await api.post("/payments/update-payment", body);
    } catch (error) {
      console.error("Error edit payments:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async fetchDeletePayment({ commit }, id) {
    commit("SET_LOADING", true);
    try {
      const body = { id };
      await api.post("/payments/delete-payment", body);
    } catch (error) {
      console.error("Error delete payment:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_PAYMENTS(state, payments) {
    state.payments = payments;
  },
  SET_PAYMENT_DETAIL(state, payment) {
    state.paymentDetail = payment;
  },
  SET_EDIT_PAYMENT_ID(state, id) {
    state.editPaymentId = id;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
