<template>
  <header class="h-16 bg-primary-dark shadow flex items-center px-4">
    <div class="flex items-center justify-center">
      <div
        class="text-lg font-bold text-white flex items-center justify-center"
      >
        <template v-if="isAuthenticated">
          <router-link to="/" class="flex items-center justify-center">
            <img
              src="@/assets/svg/logo.svg"
              alt="Logo"
              class="w-8 h-8 mr-2 flex items-center justify-center"
            />
          </router-link>
          <a-space>
            <div class="flex">
              <PhoneFilled />
              <span class="ml-2">0815-7000-699</span>
            </div>
            <div class="flex">|</div>
            <div class="flex">
              <FacebookOutlined />
            </div>
            <div class="flex">|</div>
            <div class="flex">
              <InstagramOutlined />
            </div>
            <div class="flex">|</div>
            <div class="flex">
              <MailOutlined />
            </div>
            <div class="flex">|</div>
            <div class="flex">
              <WhatsAppOutlined />
            </div>
          </a-space>
          <!-- jika login -->
          <!-- {{ currentUser.username.toUpperCase() }} ({{ currentUser.role_name }}) -->
        </template>

        <!-- jika belum login -->
        <template v-else>
          <a-space>
            <div class="flex">
              <PhoneFilled />
              <span class="ml-2">0815-7000-699</span>
            </div>
            <div class="flex">|</div>
            <div class="flex">
              <FacebookOutlined />
            </div>
            <div class="flex">|</div>
            <div class="flex">
              <InstagramOutlined />
            </div>
            <div class="flex">|</div>
            <div class="flex">
              <MailOutlined />
            </div>
            <div class="flex">|</div>
            <div class="flex">
              <WhatsAppOutlined />
            </div>
          </a-space>
        </template>
      </div>
    </div>
    <div class="ml-auto flex items-center gap-4">
      <!-- Jika belum login -->
      <a-button
        v-if="!isAuthenticated"
        @click="goLogin"
        type="primary"
        ghost
        class="custom-login-btn"
      >
        Login
      </a-button>

      <!-- Jika sudah login -->
      <div v-else class="flex justify-center items-center">
        <a-space>
          <a-button
            @click="goLanding"
            type="text"
            class="custom-icon-btn"
            shape="circle"
            size="large"
          >
            <template #icon>
              <div
                class="flex items-center justify-center text-2xl hover:text-blue-300"
              >
                <HomeOutlined style="color: white" />
              </div>
            </template>
          </a-button>
          <a-button
            @click="goProfile"
            type="text"
            class="custom-icon-btn"
            shape="circle"
            size="large"
          >
            <template #icon>
              <div
                class="flex items-center justify-center text-2xl hover:text-blue-300"
              >
                <UserOutlined style="color: white" />
              </div>
            </template>
          </a-button>
        </a-space>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
const currentUser = computed(() => store.getters["auth/currentUser"]);

const goLanding = () => {
  router.push("/");
};
const goLogin = () => {
  router.push("/login");
};

const goProfile = () => {
  router.push("/profile");
};
</script>

<style scoped>
.custom-logout-btn {
  color: white !important;
}
.custom-logout-btn:hover {
  color: red !important;
}
.custom-icon-btn {
  color: white !important;
}
.custom-icon-btn:hover {
  color: rgb(0, 195, 255) !important;
}
.custom-login-btn {
  color: white !important;
  border-color: white !important;
}
.custom-login-btn:hover {
  border-color: blue !important;
  color: blue !important;
}
</style>
