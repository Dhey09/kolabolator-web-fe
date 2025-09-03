<template>
  <div class="flex">
    <a-card class="w-[500px] shadow-lg">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold">LUPA PASSWORD</h1>
      </div>
      <a-form :model="form" layout="vertical" @finish="handleSendOTP">
        <a-form-item
          label="EMAIL"
          name="email"
          :rules="[{ required: true, message: 'Email wajib diisi!' }]"
        >
          <a-input v-model:value="form.email" placeholder="example@gmail.com" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            KIRIM OTP
          </a-button>
        </a-form-item>
      </a-form>
      <a-button type="text" @click="handleBack">
        <a-space> <LeftOutlined class="text-primary" /> Kembali </a-space>
      </a-button>
    </a-card>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({ email: "" });

const handleSendOTP = async () => {
  await store.dispatch("auth/forgotPassword", form.email)
  message.success("Kode OTP Berhasil Dikirim ke Email")
  localStorage.setItem("email", form.email);
  router.push("/reset-password");
};
const handleBack = () => {
  router.push("/login");
};
</script>
