<template>
  <div>
    <!-- Breadcrumb -->
    <div class="mb-4">
      <BaseBreadcrumb :items="breadcrumbItems" />
    </div>

    <!-- Form -->
    <BaseForm
      v-model="formData"
      :title="'Edit User'"
      :fields="fields"
      :rules="rules"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <template #actions>
        <div class="flex justify-end">
          <a-space>
            <!-- Tombol Cancel -->
            <a-button type="default" @click="handleCancel">Batal</a-button>

            <!-- Tombol Submit -->
            <a-button type="primary" html-type="submit">Simpan</a-button>
          </a-space>
        </div>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();

const userId = route.query.id;
const roles = computed(() => store.getters["user/roles"]);
const editUserId = computed(() => store.state.user.editUserId);

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/user" },
  { icon: "user-outlined", label: "Pengguna", link: "/user" },
  { label: "Edit Pengguna" },
];

const formData = ref({});

const fields = ref([
  { type: "input", name: "name", label: "Nama", placeholder: "Masukkan nama" },
  {
    type: "input",
    name: "username",
    label: "Username",
    placeholder: "Masukkan Username",
  },
  {
    type: "input",
    name: "email",
    label: "Email",
    placeholder: "Masukkan email",
  },
  // {
  //   type: "password",
  //   name: "password",
  //   label: "Password",
  //   placeholder: "Masukkan Password",
  // },
  // {
  //   type: "password",
  //   name: "confirm_password",
  //   label: "Konfirmasi Password",
  //   placeholder: "Masukkan Konfirmasi Password",
  // },
]);

// Rules validasi
const rules = {
  name: [{ required: true, message: "Nama wajib diisi" }],
  username: [{ required: true, message: "Username wajib diisi" }],
  email: [
    { required: true, message: "Email wajib diisi" },
    { type: "email", message: "Format email tidak valid" },
  ],
  // password: [
  //   { required: true, message: "Password wajib diisi" },
  //   { min: 8, message: "Password minimal 8 karakter" },
  // ],
  // confirm_password: [
  //   { required: true, message: "Konfirmasi Password wajib diisi" },
  //   {
  //     validator(_, value) {
  //       if (!value || value === formData.value.password) {
  //         return Promise.resolve();
  //       }
  //       return Promise.reject(
  //         new Error("Password dan Konfirmasi Password tidak sama")
  //       );
  //     },
  //   },
  // ],
};

// Fetch role untuk select
const fetchUser = async () => {
  await store.dispatch("user/fetchUserById", editUserId.value);
  const user = store.state.user.userDetail;
  if (user) {
    formData.value = {
      name: user.name,
      username: user.username,
      email: user.email,
    };
  }
};

const handleSubmit = async (values) => {
  const payload = {
    id: editUserId.value,
    name: values.name,
    username: values.username,
    email: values.email,
  };
  try {
    await store.dispatch("user/fetchUpdateUser", payload);
    message.success("User berhasil diupdate");
  } catch {
    message.error("Gagal update user");
  } finally {
    router.push("/user");
  }
};

const handleCancel = () => {
  router.push("/user");
};

onMounted(() => {
  fetchUser();
});
</script>
