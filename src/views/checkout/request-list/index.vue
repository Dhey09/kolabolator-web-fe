<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'Daftar Permintaan Konfirmasi Pembayaran'"
      :isSearch="handleSearch"
    />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="checkoutLists"
        :onApprove="approveRequest"
        :onReject="rejectRequest"
      />
    </a-spin>
  </a-card>
  <RejectCheckoutModal
    :open="showRejectModal"
    :chapter="selectedCheckout"
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
import { message } from "ant-design-vue";
import RejectCheckoutModal from "@/components/RejectCheckoutModal.vue";


const router = useRouter();
const store = useStore();
const page = ref(0);
const perPage = ref(10);
const checkoutLists = computed(
  () => store.getters["chapter/checkoutChapterList"]
);
const loading = computed(() => store.getters["chapter/loading"]);
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
  store.dispatch("chapter/fetchcheckoutLists", {
    cari: val,
  });
};

const breadcrumbItems = [
  { icon: "profile-outlined", label: "Daftar Permintaan" },
];

const columns = [
  {
    title: "Bukti Bayar",
    dataIndex: "payment_proof",
    key: "payment_proof",
    fixed: "left",
    align: "center",
  },
  { title: "Nama", dataIndex: "checkout_by_name", key: "checkout_by_name" },
  { title: "Email", dataIndex: "checkout_by_email", key: "checkout_by_email" },
  {
    title: "Nomor Telephone",
    dataIndex: "checkout_by_phone",
    key: "checkout_by_phone",
  },
  { title: "Tanggal", dataIndex: "created_at", key: "created_at" },
  { title: "Kategori Buku", dataIndex: "category_name", key: "category_name" },
  { title: "Judul Buku", dataIndex: "book_title", key: "book_title" },
  { title: "Bagian", dataIndex: "chapter", key: "chapter" },
  { title: "Judul Bab", dataIndex: "title", key: "title" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    fixed: "right",
  },
];

// Aksi
const approveRequest = async (record) => {
  loading.value = true;
  const checker_id = parseInt(localStorage.getItem("userId"));
  try {
    await store.dispatch("chapter/fetchApprovalChapter", {
      id: record.id,
      checker_id: checker_id,
      status: "close",
    });
    message.success(" Berhasil disetujui");
    await fetchData();
  } catch (error) {
    message.error("Gagal menyetujui!");
  } finally {
    loading.value = false;
  }
};

const fetchData = async () => {
  await store.dispatch("chapter/fetchCheckoutChapterList");
};

onMounted(() => {
  fetchData();
});
</script>
