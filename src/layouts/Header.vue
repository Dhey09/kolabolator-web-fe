<template>
  <header class="h-16 bg-primary-dark shadow flex items-center px-4">
    <div class="flex items-center justify-center">
      <div
        class="text-lg font-bold text-white flex items-center justify-center"
      >
        <router-link to="/" class="flex items-center justify-center">
          <img
            src="@/assets/svg/logo.svg"
            alt="Logo"
            class="w-8 h-8 mr-2 flex items-center justify-center"
          />
        </router-link>
        <a-space>
          <div class="flex">
            <a-button
              type="link"
              @click="() => headerClick('https://wa.me/qr/R2OTT6OXKBDIJ1')"
            >
              <div class="text-white">
                <PhoneFilled />
                <span class="ml-2">0823-1043-3735</span>
              </div>
            </a-button>
          </div>
          <div class="flex">|</div>
          <div class="flex">
            <a-button
              type="link"
              @click="
                () => headerClick('https://www.facebook.com/penerbit.widina.9')
              "
            >
              <div class="text-white">
                <FacebookOutlined />
              </div>
            </a-button>
          </div>
          <div class="flex">|</div>
          <div class="flex">
            <a-button
              type="link"
              @click="
                () =>
                  headerClick(
                    'https://www.instagram.com/penerbitwidina?igsh=MXE1cG1iMTczamJsYQ=='
                  )
              "
            >
              <div class="text-white">
                <InstagramOutlined />
              </div>
            </a-button>
          </div>
          <div class="flex">|</div>
          <div class="flex">
            <a-button
              type="link"
              @click="() => headerClick('ema.hilma565@gmail.com')"
            >
              <div class="text-white">
                <MailOutlined />
              </div>
            </a-button>
          </div>
          <div class="flex">|</div>
          <div class="flex">
            <a-button
              type="link"
              @click="() => headerClick('https://wa.me/qr/R2OTT6OXKBDIJ1')"
            >
              <div class="text-white">
                <WhatsAppOutlined />
              </div>
            </a-button>
          </div>
        </a-space>
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

const headerClick = (url) => {
  window.open(url, "_blank");
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
