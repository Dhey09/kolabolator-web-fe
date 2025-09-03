<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'Daftar Template'"
      :isAdd="handleAdd"
      :isSearch="handleSearch"
    />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="templates"
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
const templates = computed(() => store.getters["template/allTemplates"]);
const loading = computed(() => store.getters["template/loading"]);

const handleExport = () => {
};

const handleDownload = () => {
};

const handleSearch = (val) => {
  store.dispatch("template/fetchTemplates", {
    cari: val,
  });
};

const handleAdd = () => {
  router.push("/template-add");
};

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/template" },
  { icon: "profile-outlined", label: "Template" },
];

const columns = [
  { title: "Naskah", dataIndex: "script", key: "script_url" },
  { title: "HAKI", dataIndex: "haki", key: "haki_url" },
];

// Aksi
const editData = (record) => {
  store.dispatch("template/setEditTemplateId", record.id);
  router.push("/template-edit");
};

const deleteData = async (record) => {
  try {
    loading.value = true;
    await store.dispatch("template/fetchDeleteTemplate", record.id);
    message.success("Template berhasil dihapus!");
    await fetchData();
  } catch (err) {
    message.error("Gagal hapus Template!");
    console.error("Gagal hapus Template:", err);
  } finally {
    loading.value = false; // ⬅️ selesai, loading off
  }
};

const fetchData = async () => {
  await store.dispatch("template/fetchTemplates", {
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
