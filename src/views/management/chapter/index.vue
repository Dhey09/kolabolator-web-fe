<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'Daftar Judul Bagian'"
      :isAdd="handleAdd"
      :isExport="handleExport"
      :isDownload="handleDownload"
      :isSearch="handleSearch"
    />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="chapters"
        :scroll="{ x: 'max-conten', y: 380 }"
        :onEdit="editData"
        :onDelete="deleteData"
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
const chapters = computed(() => store.getters["chapter/allChapters"]);
const loading = computed(() => store.getters["chapter/loading"]);

const handleExport = () => {
};

const handleDownload = () => {
};

const handleSearch = (val) => {
  store.dispatch("chapter/fetchChapters", {
    cari: val,
  });
};

const handleAdd = () => {
  router.push("/chapter-add");
};

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/chapter" },
  { icon: "file-outlined", label: "Judul Bagian" },
];

const columns = [
  { title: "Image", dataIndex: "img", key: "img" },
  { title: "Judul Kategori", dataIndex: "category_name", key: "category_name" },
  { title: "Judul Buku", dataIndex: "book_title", key: "book_title" },
  { title: "Bab", dataIndex: "chapter", key: "chapter" },
  { title: "Judul Bab", dataIndex: "title", key: "title" },
  { title: "Harga", dataIndex: "price", key: "price" },
  { title: "Deadline", dataIndex: "deadline", key: "deadline" },
];

// Aksi
const editData = (record) => {
  store.dispatch("chapter/setEditChapterId", record.id);
  router.push("/chapter-edit");
};

const deleteData = async (record) => {
  try {
    loading.value = true;
    await store.dispatch("chapter/fetchDeleteChapter", record.id);
    message.success("Judul Bagian berhasil dihapus!");
    await fetchData();
  } catch (err) {
    message.error("Gagal hapus judul bagian!");
    console.error("Gagal hapus judul bagian:", err);
  } finally {
    loading.value = false; // ⬅️ selesai, loading off
  }
};

const fetchData = async () => {
  await store.dispatch("chapter/fetchChapters", {
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
