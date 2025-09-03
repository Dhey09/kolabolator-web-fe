<template>
  <div>
    <!-- Breadcrumb -->
    <div class="mb-4">
      <BaseBreadcrumb :items="breadcrumbItems" />
    </div>

    <!-- Form -->
    <BaseForm
      v-model="formData"
      :title="'Edit Metode Pembayaran'"
      :fields="fields"
      :rules="rules"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <template #actions>
        <div class="flex justify-end">
          <a-space>
            <!-- Tombol Cancel -->
            <a-button type="default" @click="handleCancel">Batal</a-button>

            <!-- Tombol Submit -->
            <a-button type="primary" html-type="submit">Simpan</a-button>
          </a-space>
        </div>
      </template>
    </BaseForm>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();

const userId = route.query.id;
const roles = computed(() => store.getters["user/roles"]);
const editUserId = computed(() => store.state.payment.editUserId);

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/payment" },
  { icon: "bank-outlined", label: "Metode Pembayaran", link: "/payment" },
  { label: "Edit Metode Pembayaran" },
];

const formData = ref({});

const fields = ref([
  {
    type: "input",
    name: "bank",
    label: "Bank",
    placeholder: "Masukkan Bank",
  },
  {
    type: "number",
    name: "bank_rek",
    label: "Nomor Rekening",
    maxLength: 16,
    placeholder: "Masukkan Nomor Rekening (Max 16 angka)",
  },
  {
    type: "input",
    name: "name",
    label: "Atas Nama",
    placeholder: "Masukka nama",
  },
]);

const rules = {
  name: [{ required: true, message: "Nama wajib diisi" }],
  bank_rek: [{ required: true, message: "Nomor Rekening wajib diisi" }],
  bank: [{ required: true, message: "Bank wajib diisi" }],
};

const handleSubmit = async (values) => {
  const paymentId = parseInt(localStorage.getItem("payment_id"));
  const payload = {
    id: paymentId,
    name: values.name,
    bank: values.bank,
    bank_rek: values.bank_rek,
  };
  try {
    await store.dispatch("payment/fetchUpdatePayment", payload);
    message.success("Payment berhasil diupdate");
  } catch {
    message.error("Gagal update payment");
  } finally {
    router.push("/payment");
  }
};

const handleCancel = () => {
  router.push("/payment");
};

const fetchData = async () => {
  const paymentId = parseInt(localStorage.getItem("payment_id"));
  await store.dispatch("payment/fetchPaymentById", paymentId);
  const payment = store.state.payment.paymentDetail;
  if (payment) {
    formData.value = {
      name: payment.name,
      bank: payment.bank,
      bank_rek: payment.bank_rek,
    };
  }
};
onMounted(() => {
  fetchData();
});
</script>
