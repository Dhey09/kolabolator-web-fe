<template>
  <div>
    <!-- Breadcrumb -->
    <div class="mb-4">
      <BaseBreadcrumb :items="breadcrumbItems" />
    </div>

    <!-- Form -->
    <BaseForm
      v-model="formData"
      :title="'Tambah User'"
      :fields="fields"
      :rules="rules"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <template #actions>
        <div class="flex justify-end">
          <a-space></a-space>
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
import { computed, ref, onMounted, watch } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const roles = computed(() => store.getters["user/roles"]); // array roles dari store

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/user" },
  { icon: "user-outlined", label: "Pengguna", link: "/user" },
  { label: "Tambah Pengguna" },
];

const formData = ref({});

// field awal tanpa options
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
  {
    type: "select",
    name: "role",
    label: "Role",
    placeholder: "Pilih Role",
    options: [],
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Masukkan Password",
  },
  {
    type: "password",
    name: "confirm_password",
    label: "Konfirmasi Password",
    placeholder: "Masukkan Konfirmasi Password",
  },
]);

const rules = {
  name: [{ required: true, message: "Nama wajib diisi" }],
  username: [{ required: true, message: "Username wajib diisi" }],
  email: [
    { required: true, message: "Email wajib diisi" },
    { type: "email", message: "Format email tidak valid" }, // validasi format email
  ],
  role: [{ required: true, message: "Role wajib dipilih" }],
  password: [
    { required: true, message: "Password wajib diisi" },
    {
      min: 8,
      message: "Password minimal 8 karakter",
    },
  ],
  confirm_password: [
    { required: true, message: "Konfirmasi Password wajib diisi" },
    {
      validator(_, value) {
        if (!value || value === formData.value.password) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("Password dan Konfirmasi Password tidak sama")
        );
      },
    },
  ],
};

const handleSubmit = async (values) => {
  try {
    // Mapping role field ke role_id
    const payload = {
      ...values,
      role_id: values.role, // role di form dipetakan ke role_id
    };

    // Dispatch action Vuex
    await store.dispatch("user/fetchAddUser", payload);

    // Optional: reset form setelah submit
    formData.value = {};
    message.success("User berhasil ditambahkan");
  } catch (err) {
    console.error("Submit error:", err);
    message.error("Gagal menambahkan user");
  } finally {
    router.push("/user")
  }
};
const handleCancel = () => {
  router.push("/user");
};

const fetchData = () => {
  store.dispatch("user/fetchRoles", {
    cari: "",
    page: 0,
    per_page: 10,
    sort_by: "id",
    sort_type: "ASC",
  });
};

onMounted(() => {
  fetchData();
});

// update options role setelah fetchRoles selesai
watch(
  roles,
  (newRoles) => {
    const roleField = fields.value.find((f) => f.name === "role");
    if (roleField) {
      roleField.options = newRoles.map((r) => ({
        value: r.id,
        label: r.role_name,
      }));
    }
  },
  { immediate: true }
);
</script>
