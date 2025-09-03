import { createRouter, createWebHistory } from "vue-router";

// Import routes modular
import landingRoutes from "./modules/landingPage";
import authRoutes from "./modules/auth";
import boRoutes from "./modules/backOffice";

const routes = [landingRoutes, authRoutes, boRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ===== Navigation Guard =====
router.beforeEach((to, from, next) => {
  // halaman yang tidak memerlukan auth
  const publicPages = [
    "/",
    "/chapter-page",
    "/book-page",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  const authRequired = !publicPages.includes(to.path);

  const token = localStorage.getItem("access_token");
  if (authRequired && !token) {
    // redirect ke login jika tidak ada token
    return next("/login");
  }

  next();
});

export default router;
