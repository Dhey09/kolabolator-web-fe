<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'History Pembelian'"
      :isSearch="handleSearch"
    />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="transactionList"
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
const transactionList = computed(
  () => store.getters["chapter/transactionList"]
);
const loading = computed(() => store.getters["chapter/loading"]);

const handleSearch = (val) => {
  store.dispatch("chapter/fetchTransactionLists", {
    cari: val,
  });
};

const handleAdd = () => {
  router.push("/");
};

const breadcrumbItems = [
  { icon: "shop-outlined", label: "Daftar Transaksi" },
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

const fetchData = async () => {
  const member_id = parseInt(localStorage.getItem("userId"));
  await store.dispatch("chapter/fetchTransactionLists");
};

onMounted(() => {
  fetchData();
});
</script>
