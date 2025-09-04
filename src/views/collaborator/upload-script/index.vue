<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-spin :spinning="loading">
    <BaseForm
      v-model="formData"
      :title="'Upload Naskah'"
      :fields="fields"
      :rules="rules"
      downloadTemplate
      @submit="handleSubmit(formData)"
      @cancel="handleCancel"
    />
  </a-spin>
</template>

<script setup>
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseForm from "@/components/BaseForm.vue";
import { message } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/collaborator" },
  { icon: "user-outlined", label: "Kolaborator", link: "/collaborator" },
  { label: "Upload Naskah" },
];

const router = useRouter();
const store = useStore();
const formData = ref({});
const loading = computed(() => store.state.collaborator.loading);
const editCollaboratorId = computed(
  () => store.state.collaborator.editCollaboratorId
);

// field awal tanpa options
const fields = ref([
  {
    type: "upload",
    name: "identity",
    label: "Upload KTP",
  },
  {
    type: "file",
    name: "script",
    label: "Upload Naskah",
  },
  {
    type: "file",
    name: "haki",
    label: "Upload HAKI",
  },
  {
    type: "textarea",
    name: "address",
    label: "Alamat Pengiriman",
    placeholder: "Masukan alamat pengiriman",
  },
]);

const rules = {
  script: [{ required: true, message: "Harus upload Naskah" }],
  haki: [{ required: true, message: "Harus upload HAKI" }],
  identity: [{ required: true, message: "Harus upload KTP" }],
  address: [{ required: true, message: "Alamat harus diisi!" }],
};

const handleSubmit = async (values) => {
  try {
    const payload = {
      id: editCollaboratorId.value,
      script: values?.script,
      haki: values?.haki,
      identity: values?.identity,
      address: values?.address,
    };
    await store.dispatch("collaborator/fetchUpdateCollaborator", payload);
    formData.value = {};
    message.success("Dokumen berhasil dikirim");
  } catch (err) {
    console.error("Submit error:", err);
    message.error("Gagal mengirimkan Dokumen");
  } finally {
    router.push("/collaborator");
  }
};
const handleCancel = () => {
  router.push("/collaborator");
};
</script>
