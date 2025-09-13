<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton :title="'Daftar Cek Dokumen'" :isSearch="handleSearch" />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="checkDocument"
        :scroll="{ x: 'max-conten', y: 380 }"
        :onApprove="approve"
        :onReject="rejectRequest"
        :isAction="true"
      />
    </a-spin>
  </a-card>
  <RejectDocument
    :open="showRejectModal"
    :collaborator="selectedCheckout"
    @update:open="showRejectModal = $event"
    @rejected="reject"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BaseTable from "@/components/BaseTable.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useStore } from "vuex";
import RejectDocument from "@/components/RejectDocument.vue";

import { message } from "ant-design-vue";

const router = useRouter();
const store = useStore();
const checkDocument = computed(
  () => store.getters["collaborator/collaboratorByPending"]
);
const loading = computed(() => store.getters["collaborator/loading"]);
const showRejectModal = ref(false);
const selectedCheckout = ref(null);
const rejectRequest = (record) => {
  selectedCheckout.value = record;
  showRejectModal.value = true;
};

const reject = async () => {
  showRejectModal.value = false;
  await fetchData();
};

const handleSearch = (val) => {
  store.dispatch("collaborator/fetchCategories", {
    cari: val,
  });
};

const approve = async (val) => {
  const reviewer_id = parseInt(localStorage.getItem("userId"));
  const payload = {
    id: val.id,
    reviewer_id: reviewer_id,
  };
  await store.dispatch("collaborator/fetchApproveCollaborator", payload);
  await fetchData();
};

const breadcrumbItems = [{ icon: "file-done-outlined", label: "Cek Dokumen" }];

const columns = [
  {
    title: "Bukti Bayar",
    dataIndex: "payment_proof",
    key: "payment_proof",
    fixed: "left",
    align: "center",
  },

  { title: "Kategori Buku", dataIndex: "category_name", key: "category_name" },
  { title: "Judul Buku", dataIndex: "book_title", key: "book_title" },
  { title: "Bagian", dataIndex: "chapter_section", key: "chapter_section" },
  { title: "Judul Bab", dataIndex: "chapter_title", key: "chapter_title" },
  { title: "Naskah", dataIndex: "script", key: "script" },
  { title: "HAKI", dataIndex: "haki", key: "haki" },
  { title: "KTP", dataIndex: "identity", key: "identity" },
  { title: "Alamat Pengiriman", dataIndex: "address", key: "address" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    fixed: "right",
  },
];

const fetchData = async () => {
  await store.dispatch("collaborator/fetchCollaboratorByPending");
};

onMounted(() => {
  fetchData();
});
</script>
