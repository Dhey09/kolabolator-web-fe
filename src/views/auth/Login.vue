<template>
  <div class="layout">
    <div class="flex">
      <!-- Left Image -->
      <a-card class="flex justify-center items-center shadow-lg">
        <div class="flex">
          <img src="@/assets/svg/login.svg" alt="Books" class="object-cover" />

          <!-- Right Form -->
          <div class="flex items-center justify-center pl-4">
            <div class="items-center justify-center">
              <div class="flex justify-center items-center">
                <router-link to="/">
                  <img
                    src="@/assets/svg/logo.svg"
                    alt="Logo"
                    class="w-24 h-24"
                  />
                </router-link>
              </div>
              <div class="mb-6 text-center">
                <h1 class="text-2xl font-bold">
                  SELAMAT DATANG DI PENERBIT WIDINA
                </h1>
                <p class="text-left mt-2 text-gray-600">MASUK</p>
              </div>
              <a-form :model="form" layout="vertical" @finish="handleLogin">
                <a-form-item
                  label="EMAIL / USERNAME"
                  name="identifier"
                  :rules="[
                    {
                      required: true,
                      message: 'Email atau username wajib diisi!',
                    },
                  ]"
                >
                  <a-input
                    v-model:value="form.identifier"
                    placeholder="Masukkan Email atau Username"
                  />
                </a-form-item>

                <a-form-item
                  label="PASSWORD"
                  name="password"
                  :rules="[
                    { required: true, message: 'Password wajib diisi!' },
                  ]"
                >
                  <a-input-password
                    v-model:value="form.password"
                    placeholder="Masukkan password"
                  />
                </a-form-item>

                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    block
                    :loading="loading"
                  >
                    MASUK
                  </a-button>
                  <div class="flex justify-between pt-2">
                    <p class="">
                      Belum punya akun?
                      <span>
                        <router-link
                          to="/register"
                          class="text-primary-dark hover:bg-gray-700 rounded"
                          >Daftar</router-link
                        >
                      </span>
                    </p>
                    <a-button type="link" @click="handleForgot">
                      Lupa Kata Sandi?
                    </a-button>
                  </div>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const store = useStore();
const router = useRouter();
const loading = computed(() => store.getters["auth/loading"]);

const form = reactive({
  identifier: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await store.dispatch("auth/login", form);
    message.success("Login berhasil!");
    router.push("/dashboard"); // redirect ke dashboard
  } catch (err) {
    message.error(err.message);
  }
};

const handleForgot = async () => {
  router.push("/forgot-password");
};
</script>

<style scoped>
/* Bisa tambahin styling tambahan kalau mau */
</style>
