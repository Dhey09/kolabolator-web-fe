import AuthLayout from "@/layouts/AuthLayout.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";

export default {
  path: "/",
  component: AuthLayout,
  children: [
    { path: "login", name: "Login", component: Login },
    { path: "register", name: "Register", component: Register },
    { path: "forgot-password", name: "ForgotPassword", component: ForgotPassword },
    { path: "reset-password", name: "ResetPassword", component: ResetPassword },
  ],
};
