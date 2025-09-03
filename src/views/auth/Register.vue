<template>
  <div class="layout">
    <div class="flex">
      <!-- Left Image -->
      <a-card class="flex justify-center items-center shadow-lg">
        <div class="flex">
          <img
            src="@/assets/svg/register.svg"
            alt="Books"
            class="object-cover"
          />

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
                <p class="text-left mt-2 text-gray-600">DAFTAR</p>
              </div>

              <a-form
                :model="form"
                layout="vertical"
                @finish="handleRegister"
                class="w-full"
                :rules="rules"
              >
                <div class="flex justify-between w-full">
                  <a-form-item
                    label="NAMA LENGKAP"
                    name="name"
                    :rules="[
                      {
                        required: true,
                        message: 'Nama Lengkap wajib diisi!',
                      },
                    ]"
                  >
                    <a-input
                      v-model:value="form.name"
                      placeholder="Masukan nama lengkap"
                    /> </a-form-item
                  ><a-form-item
                    label="Email"
                    name="email"
                    :rules="[{ required: true, message: 'Email wajib diisi!' }]"
                  >
                    <a-input
                      v-model:value="form.email"
                      placeholder="Masukan email"
                    />
                  </a-form-item>
                </div>

                <div class="flex justify-between w-full">
                  <a-form-item
                    label="NO HP"
                    name="phone"
                    :rules="[
                      {
                        required: true,
                        message: 'Nomor telephone wajib diisi!',
                      },
                    ]"
                  >
                    <a-input
                      v-model:value="form.phone"
                      :maxlength="13"
                      placeholder="Masukan nomor telephone"
                      type="text"
                      inputmode="numeric"
                      pattern="[0-9]*"
                      @keypress="
                        (e) => {
                          // Cegah semua karakter selain angka
                          if (!/[0-9]/.test(e.key)) e.preventDefault();
                        }
                      "
                      @paste="
                        (e) => {
                          // Cegah paste non-angka
                          const paste = (
                            e.clipboardData || window.clipboardData
                          ).getData('text');
                          if (!/^\d+$/.test(paste)) e.preventDefault();
                        }
                      "
                      @input="
                        (e) => {
                          // Pastikan tetap hanya angka
                          form.phone = e.target.value.replace(/\D/g, '');
                        }
                      "
                    />
                  </a-form-item>

                  <a-form-item
                    label="USERNAME"
                    name="username"
                    :rules="[
                      { required: true, message: 'Username wajib diisi!' },
                    ]"
                  >
                    <a-input
                      v-model:value="form.username"
                      placeholder="Masukan username"
                    />
                  </a-form-item>
                </div>
                <a-form-item
                  label="KATA SANDI"
                  name="password"
                  :rules="[
                    { required: true, message: 'Kata sandi wajib diisi!' },
                  ]"
                >
                  <a-input-password
                    v-model:value="form.password"
                    placeholder="Masukan Kata sandi"
                  />
                </a-form-item>
                <a-form-item
                  label="KONFIRMASI KATA SANDI"
                  name="confirm_password"
                  :rules="[
                    {
                      required: true,
                      message: 'Konfirmasi Password wajib diisi!',
                    },
                  ]"
                >
                  <a-input-password
                    v-model:value="form.confirm_password"
                    placeholder="Konfirmasi password"
                  />
                </a-form-item>

                <a-form-item>
                  <a-button type="primary" html-type="submit" block>
                    DAFTAR
                  </a-button>
                  <p class="text-center pt-2">
                    Sudah punya akun?
                    <span>
                      <router-link to="/login" class="hover:bg-gray-700 rounded"
                        >Masuk</router-link
                      >
                    </span>
                  </p>
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
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const store = useStore();
const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  confirm_password: "",
});

const rules = {
  name: [{ required: true, message: "Nama wajib diisi!" }],
  phone: [
    { required: true, message: "Nomor telephone wajib diisi!" },
    { pattern: /^[0-9]+$/, message: "Nomor HP hanya boleh angka!" },
  ],
  username: [{ required: true, message: "Username wajib diisi!" }],
  password: [{ required: true, message: "Password wajib diisi!" }],
};

const handleRegister = async () => {
  const payload = { ...form, role_id: 3 };
  try {
    await store.dispatch("user/fetchAddUser", payload);
    message.success("Pendaftaran Berhasil");
    router.push("/login");
  } catch (error) {
    message.error("Pendaftaran gagal:", error);
  }
};
</script>
