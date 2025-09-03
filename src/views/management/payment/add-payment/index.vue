<template>
  <div>
    <!-- Breadcrumb -->
    <div class="mb-4">
      <BaseBreadcrumb :items="breadcrumbItems" />
    </div>

    <!-- Form -->
    <BaseForm
      v-model="formData"
      :title="'Tambah Metode Pembayaran'"
      :fields="fields"
      :rules="rules"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <template #actions>
        <div class="flex justify-end">
          <a-space></a-space>
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
import { computed, ref, onMounted, watch } from "vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const roles = computed(() => store.getters["user/roles"]); // array roles dari store

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/payment" },
  { icon: "bank-outlined", label: "Metode Pembayaran", link: "/payment" },
  { label: "Tambah Metode Pembayaran" },
];

const formData = ref({});

// field awal tanpa options
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
  try {
    const payload = {
      ...values,
    };
    await store.dispatch("payment/createPayment", payload);
    formData.value = {};
    message.success("User berhasil ditambahkan");
  } catch (err) {
    console.error("Submit error:", err);
    message.error("Gagal menambahkan user");
  } finally {
    router.push("/payment");
  }
};
const handleCancel = () => {
  router.push("/payment");
};
</script>
