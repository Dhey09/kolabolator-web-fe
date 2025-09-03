<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'History Pembelian'"
      :isAdd="handleAdd"
      :isSearch="handleSearch"
    />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="personalCheckout"
        :onView="viewCheckout"
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
const personalCheckout = computed(
  () => store.getters["chapter/personalCheckoutChapter"]
);
const loading = computed(() => store.getters["chapter/loading"]);

const handleSearch = (val) => {
  store.dispatch("chapter/fetchPersonalCheckoutChapter", {
    cari: val,
  });
};

const handleAdd = () => {
  router.push("/");
};

const breadcrumbItems = [
  { icon: "profile-outlined", label: "History Pembelian" },
];
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
    title: "Tanggal",
    dataIndex: "createdAt",
    key: "createdAt",
    customRender: ({ text }) => formatDate(text),
  },
  { title: "Kategori Buku", dataIndex: "category_name", key: "category_name" },
  { title: "Judul Buku", dataIndex: "book_title", key: "book_title" },
  { title: "Bab", dataIndex: "chapter", key: "chapter" },
  { title: "Judul Bab", dataIndex: "title", key: "title" },
  {
    title: "Total Bayar",
    dataIndex: "price",
    key: "price",
    customRender: ({ text }) => formatRupiah(text),
  },
  {
    title: "Status Pembayaran",
    dataIndex: "status",
    key: "status",
    fixed: "right",
    align: "center",
  },
];

// Aksi
const viewCheckout = async (record) => {
  await store.dispatch("chapter/setEditChapterId", record.id);
  router.push("/payment-detail");
};

const deleteChapter = async (record) => {
  try {
    loading.value = true;
    await store.dispatch("chapter/fetchDeleteChapter", record.id);
    message.success("Bab berhasil dihapus!");
    await fetchData();
  } catch (err) {
    message.error("Gagal hapus bab!");
    console.error("Gagal hapus bab:", err);
  } finally {
    loading.value = false;
  }
};

const fetchData = async () => {
  const member_id = parseInt(localStorage.getItem("userId"));
  await store.dispatch("chapter/fetchPersonalCheckoutChapter", {
    checkout_by: member_id,
  });
};

onMounted(() => {
  fetchData();
});
</script>
