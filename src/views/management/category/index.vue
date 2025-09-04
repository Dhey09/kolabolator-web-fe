<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'Daftar Kategori'"
      :isAdd="handleAdd"
      :isSearch="handleSearch"
    />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="categories"
        :scroll="{ x: 'max-conten', y: 380 }"
        :onEdit="editCategory"
        :onDelete="deleteCategory"
      />
    </a-spin>
  </a-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BaseTable from "@/components/BaseTable.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

const router = useRouter();
const store = useStore();
const page = ref(0);
const perPage = ref(10);
const categories = computed(() => store.getters["category/allCategories"]);
const loading = computed(() => store.getters["category/loading"]);

const handleExport = () => {};

const handleDownload = () => {};

const handleSearch = (val) => {
  store.dispatch("category/fetchCategories", {
    cari: val,
  });
};

const handleAdd = () => {
  router.push("/category-add");
};

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/category" },
  { icon: "book-outlined", label: "Kategori" },
];

// const categories = ref([
//   { id: 1, name: "Super Admin", email: "john@example.com" },
//   { id: 2, name: "Admin", email: "jane@example.com" },
// ]);

const columns = [
  { title: "Image", dataIndex: "img", key: "img" },
  { title: "Name", dataIndex: "name", key: "name" },
];

// Aksi
const editCategory = (record) => {
  store.dispatch("category/setEditCategoryId", record.id);
  router.push("/category-edit");
};

const deleteCategory = async (record) => {
  try {
    loading.value = true;
    await store.dispatch("category/fetchDeleteCategory", record.id);
    message.success("Kategori berhasil dihapus!");
    await fetchData();
  } catch (err) {
    message.error("Gagal hapus kategori!");
    console.error("Gagal hapus kategori:", err);
  } finally {
    loading.value = false; // ⬅️ selesai, loading off
  }
};

const fetchData = async () => {
  await store.dispatch("category/fetchCategories", {
    // cari: value.value,
    page: page.value,
    per_page: perPage.value,
    sort_by: "id",
    sort_type: "ASC",
  });
};

onMounted(() => {
  fetchData();
});
</script>
