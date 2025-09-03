<template>
  <div class="flex">
    <div class="flex justify-center items-center bg-white">
      <a-card class="shadow-lg">
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold">VERIFIKASI OTP</h1>
          <p class="mt-2 text-gray-600">
            Masukkan kode OTP yang dikirim ke email Anda
          </p>
        </div>

        <a-form :model="form" layout="vertical" @finish="handleVerifyOTP">
          <a-form-item
            label="KODE OTP"
            name="otp"
            :rules="[{ required: true, message: 'Kode OTP wajib diisi!' }]"
          >
            <a-input v-model:value="form.otp" placeholder="Masukkan kode OTP" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" block>
              VERIFIKASI
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = reactive({ otp: "" });

const handleVerifyOTP = () => {
  router.push("/reset-password");
};
</script>
