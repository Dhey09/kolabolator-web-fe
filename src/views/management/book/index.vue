<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'Daftar Judul Buku'"
      :isAdd="handleAdd"
      :isExport="handleExport"
      :isDownload="handleDownload"
      :isSearch="handleSearch"
    />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="books"
        :scroll="{ x: 'max-conten', y: 380 }"
        :onEdit="editBook"
        :onDelete="deleteBook"
        :onUpdateStatus="updateStatus"
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
const books = computed(() => store.getters["book/allBooks"]);
const loading = computed(() => store.getters["book/loading"]);

const handleExport = () => {
};

const handleDownload = () => {
};

const handleSearch = (val) => {
  store.dispatch("book/fetchBooks", {
    cari: val,
  });
};

const handleAdd = () => {
  router.push("/book-add");
};

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/book" },
  { icon: "book-outlined", label: "Judul Buku" },
];

const columns = [
  { title: "Image", dataIndex: "img", key: "img" },
  { title: "Kategori Buku", dataIndex: "category_name", key: "category_name" },
  { title: "Judul Buku", dataIndex: "title", key: "title" },
  { title: "Deskripsi", dataIndex: "description", key: "description" },
  { title: "Status", dataIndex: "status", key: "status", fixed:"right", align:"center" },
];

// Aksi
const editBook = (record) => {
  store.dispatch("book/setEditBookId", record.id);
  router.push("/book-edit");
};

const deleteBook = async (record) => {
  try {
    loading.value = true;
    await store.dispatch("book/fetchDeleteBook", record.id);
    message.success("Judul Buku berhasil dihapus!");
    await fetchData();
  } catch (err) {
    message.error("Gagal hapus judul buku!");
    console.error("Gagal hapus judul buku:", err);
  } finally {
    loading.value = false; // ⬅️ selesai, loading off
  }
};
const updateStatus = (record) => {
  store.dispatch("book/setEditBookId", record.id);
  router.push("/book-update-status");
};

const fetchData = async () => {
  await store.dispatch("book/fetchBooks", {
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
