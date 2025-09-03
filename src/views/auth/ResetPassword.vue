<template>
  <div class="flex w-full px-96">
    <div class="flex w-full justify-center items-center bg-white">
      <a-card class="w-full shadow-lg">
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold">RESET PASSWORD</h1>
        </div>

        <a-form :model="form" layout="vertical" @finish="handleResetPassword">
          <a-form-item
            label="PASSWORD BARU"
            name="newPassword"
            :rules="[{ required: true, message: 'Password baru wajib diisi!' }]"
          >
            <a-input-password
              v-model:value="form.newPassword"
              placeholder="Masukkan password baru"
            />
          </a-form-item>

          <a-form-item
            label="KONFIRMASI PASSWORD"
            name="confirmPassword"
            :rules="[
              { required: true, message: 'Konfirmasi password wajib diisi!' },
            ]"
          >
            <a-input-password
              v-model:value="form.confirmPassword"
              placeholder="Ulangi password baru"
            />
          </a-form-item>

          <a-form-item
            label="KODE OTP"
            name="otp"
            :rules="[
              {
                required: true,
                message: 'Kode OTP',
              },
            ]"
          >
            <a-input v-model:value="form.otp" placeholder="Kode OTP" />
            <div class="flex justify-end mt-2">
              <a-space>
                {{ countdown }}
                <a-button
                  type="primary"
                  :disabled="isButtonDisabled"
                  size="small"
                  @click="sendOtp"
                >
                  Kirim Ulang
                </a-button>
              </a-space>
            </div>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" block>
              RESET PASSWORD
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  reactive,
  onBeforeMount,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const userEmail = computed(() => store.getters["user/userEmail"]);
const email = localStorage.getItem("email");

const form = reactive({
  newPassword: "",
  confirmPassword: "",
  otp: "",
});

const countdown = ref("");
const isButtonDisabled = ref(true);
let timerInterval;

const startCountdown = () => {
  if (!userEmail.value || !userEmail.value.otp_expired) return;

  const target = new Date(userEmail.value.otp_expired).getTime();

  timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance <= 0) {
      countdown.value = "00:00";
      isButtonDisabled.value = false;
      clearInterval(timerInterval);
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");

    countdown.value = `${m}:${s} `;
  }, 1000);
};

const sendOtp = async () => {
  isButtonDisabled.value = true;
  await store.dispatch("auth/forgotPassword", email);
  message.success("Kode OTP Berhasil Dikirim ke Email");
  startCountdown();
};
const handleResetPassword = async () => {
  if (form.newPassword !== form.confirmPassword) {
    message.error("Password tidak sama!");
    return;
  }

  const payload = {
    email: email,
    otp: form.otp,
    newPassword: form.newPassword,
  };
  try {
    await store.dispatch("auth/resetPassword", payload);
    message.success("Berhasil Reset Password");
  } catch (error) {
    message.error("Gagal Reset Password");
  } finally {
    console.log("data", payload);
    localStorage.removeItem("email");
    router.push("/login");
  }
};

const fetchData = async () => {
  await store.dispatch("user/fetchUserByEmail", email);
};

onMounted(async () => {
  await fetchData();
  startCountdown();
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>
