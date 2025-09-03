// src/utils/api.js
import axios from "axios";
import store from "@/store";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ========== API dengan Token ==========
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getters["auth/getToken"];
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch("auth/logout");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ========== API tanpa Token ==========
const publicApi = axios.create({
  baseURL: BASE_URL,
});

export { api, publicApi };
