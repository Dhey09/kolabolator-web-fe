<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton :title="'Kolaborator'" :isSearch="handleSearch" />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="collaborators"
        :onComplete="completeData"
        :isAction="false"
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
const collaborators = computed(
  () => store.getters["collaborator/allCollaborators"]
);
const loading = computed(() => store.getters["collaborator/loading"]);

const handleSearch = (val) => {
  store.dispatch("collaborator/fetchCollaborators", {
    cari: val,
  });
};

const breadcrumbItems = [{ icon: "team-outlined", label: "Daftar Kolaborator" }];

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};
const formatRupiah = (value) => {
  if (!value) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const columns = [
  {
    title: "Bukti Bayar",
    dataIndex: "chapter_payment_proof",
    key: "chapter_payment_proof",
    fixed: "left",
    align: "center",
  },
  { title: "Nama", dataIndex: "collaborator_name", key: "collaborator_name" },
  {
    title: "Email",
    dataIndex: "collaborator_email",
    key: "collaborator_email",
  },
  {
    title: "Nomor Telephone",
    dataIndex: "collaborator_phone",
    key: "collaborator_phone",
  },
  {
    title: "Tanggal",
    dataIndex: "reviewed_at",
    key: "reviewed_at",
    customRender: ({ text }) => formatDate(text),
  },
  { title: "Kategori Buku", dataIndex: "category_name", key: "category_name" },
  { title: "Judul Buku", dataIndex: "book_title", key: "book_title" },
  { title: "Bagian", dataIndex: "chapter_section", key: "chapter_section" },
  { title: "Judul Bab", dataIndex: "chapter_title", key: "chapter_title" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    fixed: "right",
  },
];

// Aksi
const completeData = async (record) => {
  await store.dispatch("collaborator/setEditCollaboratorId", record.id);
  router.push("/collaborator-upload-script");
};

const fetchData = async () => {
  const user_id = parseInt(localStorage.getItem("userId"));
  await store.dispatch("collaborator/fetchCollaborators");
};

onMounted(() => {
  fetchData();
});
</script>
