<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'Daftar Metode Pembayaran'"
      :isAdd="handleAdd"
      :isSearch="handleSearch"
    />
    <a-spin :spinning="loading">
      <BaseTable
        :columns="columns"
        :data-source="payments"
        :onEdit="editPayment"
        :onDelete="deletePayment"
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
const payments = computed(() => store.getters["payment/allPayments"]);
const loading = computed(() => store.getters["payment/loading"]);

const handleExport = () => {
};

const handleDownload = () => {
};

const handleSearch = (val) => {
  store.dispatch("payment/fetchPayments", {
    cari: val,
  });
};

const handleAdd = () => {
  router.push("/payment-add");
};

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/payment" },
  { icon: "bank-outlined", label: "Metode Pembayaran" },
];

// const payments = ref([
//   { id: 1, name: "Super Admin", email: "john@example.com" },
//   { id: 2, name: "Admin", email: "jane@example.com" },
// ]);

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Nama Bank", dataIndex: "bank", key: "bank" },
  { title: "No. Rekenening", dataIndex: "bank_rek", key: "bank_rek" },
];

// Aksi
const editPayment = (record) => {
  localStorage.setItem("payment_id", record.id);
  store.dispatch("payment/setEditPaymentId", record.id);
  router.push("/payment-edit");
};

const deletePayment = async (record) => {
  try {
    loading.value = true;
    await store.dispatch("payment/fetchDeletePayment", record.id);
    message.success("Metode Pembayaran berhasil dihapus!");
    await fetchData();
  } catch (err) {
    message.error("Gagal hapus metode pembayaran!");
    console.error("Gagal hapus metode pembayaran:", err);
  } finally {
    loading.value = false; // ⬅️ selesai, loading off
  }
};

const fetchData = async () => {
  await store.dispatch("payment/fetchPayments", {
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
