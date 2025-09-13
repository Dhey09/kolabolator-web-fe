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
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";

const router = useRouter();
const store = useStore();
const userId = localStorage.getItem("userId");

const breadcrumbItems = [
  { icon: "user-outlined", label: "Profile", link: "/profile" },
  { label: "Edit Pengguna" },
];

const formData = ref({});

const fields = ref([
  {type:"upload", name: "img", label: "Foto Profil"},
  { type: "input", name: "name", label: "Nama", placeholder: "Masukkan nama" },
  {
    type: "input",
    name: "username",
    label: "Username",
    placeholder: "Masukkan username",
  },
  {
    type: "input",
    name: "email",
    label: "Email",
    placeholder: "Masukkan email",
  },
  {
    type: "number",
    name: "phone",
    label: "Nomor Telephone",
    placeholder: "Masukkan nomor telephone",
  },
  {
    type: "input",
    name: "gelar",
    label: "Gelar",
    placeholder: "Masukkan gelar",
  },
  {
    type: "input",
    name: "pendidikan_akhir",
    label: "Pendidikan Akhir",
    placeholder: "Masukkan pendidikan",
  },
  {
    type: "input",
    name: "tmpt_lahir",
    label: "Tempat Lahir",
    placeholder: "Masukkan tempat lahir",
  },
  {
    type: "date",
    name: "tgl_lahir",
    label: "Tanggal Lahir",
    placeholder: "Pilih tanggal lahir",
  },
  {
    type: "select",
    name: "jenis_kelamin",
    label: "Jenis Kelamin",
    options: [
      { label: "Laki-laki", value: "Laki-laki" },
      { label: "Perempuan", value: "Perempuan" },
    ],
  },
  {
    type: "input",
    name: "agama",
    label: "Agama",
    placeholder: "Masukkan agama",
  },
  {
    type: "input",
    name: "pekerjaan",
    label: "Pekerjaan",
    placeholder: "Masukkan pekerjaan",
  },
  {
    type: "textarea",
    name: "alamat",
    label: "Alamat",
    placeholder: "Masukkan alamat",
  },
]);

// Rules validasi
const rules = {
  name: [{ required: true, message: "Nama wajib diisi" }],
  username: [{ required: true, message: "Username wajib diisi" }],
  phone: [{ required: true, message: "Nomor Telephone wajib diisi" }],
  email: [
    { required: true, message: "Email wajib diisi" },
    { type: "email", message: "Format email tidak valid" },
  ],
};

const fetchUser = async () => {
  await store.dispatch("user/fetchUserById", userId);
  const user = store.state.user.userDetail;
  if (user) {
    formData.value = {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      gelar: user.gelar,
      pendidikan_akhir: user.pendidikan_akhir,
      tmpt_lahir: user.tmpt_lahir,
      tgl_lahir: user.tgl_lahir,
      jenis_kelamin: user.jenis_kelamin,
      agama: user.agama,
      pekerjaan: user.pekerjaan,
      alamat: user.alamat,
      img: user.img
    };
  }
};

const handleSubmit = async (values) => {
  const payload = { id: userId, ...values };
  try {
    await store.dispatch("user/fetchUpdateUser", payload);
    message.success("User berhasil diupdate");
    router.push("/profile");
  } catch {
    message.error("Gagal update user");
  }
};

const handleCancel = () => {
  router.push("/profile");
};

onMounted(() => {
  fetchUser();
});
</script>
