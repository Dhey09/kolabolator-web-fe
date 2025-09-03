<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-spin :spinning="loading">
    <BaseForm
      v-model="formData"
      :title="'Tambah Judul Buku'"
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
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/book" },
  { icon: "book-outlined", label: "Judul Buku", link: "/book" },
  { label: "Tambah Judul Buku" },
];

const router = useRouter();
const store = useStore();
const formData = ref({});
const loading = computed(() => store.state.book.loading);
const categories = computed(() => store.state.category.categories);

// field awal tanpa options
const fields = ref([
  {
    type: "upload",
    name: "img",
    label: "Gambar Judul Buku",
  },
  {
    type: "select",
    name: "category_id",
    label: "Kategori Buku",
    placeholder: "Pilih kategori buku",
    options: categories.value.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })),
  },
  {
    type: "input",
    name: "title",
    label: "Judul Buku",
    placeholder: "Masukan judul buku",
  },
  {
    type: "textarea",
    name: "description",
    label: "Deskripsi Buku",
    placeholder: "Tulis deskripsi buku",
  },
]);

const rules = {
  category_id: [{ required: true, message: "Kategori buku wajib dipilih" }],
  title: [{ required: true, message: "Judul buku wajib diisi" }],
};

const handleSubmit = async (values) => {
  try {
    const payload = {
      ...values,
    };
    await store.dispatch("book/createBook", payload);
    formData.value = {};
    message.success("Judul buku berhasil ditambahkan");
  } catch (err) {
    console.error("Submit error:", err);
    message.error("Gagal menambahkan judul buku");
  } finally {
    router.push("/book");
  }
};
const handleCancel = () => {
  router.push("/book");
};

onMounted(async () => {
  await store.dispatch("category/fetchCategories", {
    page: 0,
    per_page: 100,
  });
});
</script>
