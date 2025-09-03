<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-spin :spinning="loading">
    <BaseForm
      v-model="formData"
      :title="'Tambah Kategori Buku'"
      :fields="fields"
      :rules="rules"
      @submit="handleSubmit(formData)"
      @cancel="handleCancel"
    />
  </a-spin>
</template>

<script setup>
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseForm from "@/components/BaseForm.vue";
import { message } from "ant-design-vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/category" },
  { icon: "read-outlined", label: "Kategori", link: "/category" },
  { label: "Tambah Kategori" },
];

const router = useRouter();
const store = useStore();
const formData = ref({});
const loading = computed(() => store.state.category.loading);

// field awal tanpa options
const fields = ref([
  {
    type: "upload",
    name: "img",
    label: "Gambar Kategori",
  },
  {
    type: "input",
    name: "name",
    label: "Judul Kategori",
    placeholder: "Masukka judul kategori",
  },
]);

const rules = {
  name: [{ required: true, message: "Kategori wajib diisi" }],
};

const handleSubmit = async (values) => {
  try {
    const payload = {
      ...values,
    };
    await store.dispatch("category/createCategory", payload);
    formData.value = {};
    message.success("Kategori buku berhasil ditambahkan");
  } catch (err) {
    console.error("Submit error:", err);
    message.error("Gagal menambahkan kategori buku");
  } finally {
    router.push("/category");
  }
};
const handleCancel = () => {
  router.push("/category");
};
</script>
