<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-spin :spinning="loading">
    <BaseForm
      v-model="formData"
      :title="'Tambah Template'"
      :fields="fields"
      :rules="rules"
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
  { icon: "setting-outlined", label: "Manajemen", link: "/template" },
  { icon: "profile-outlined", label: "Template", link: "/template" },
  { label: "Tambah Template" },
];

const router = useRouter();
const store = useStore();
const formData = ref({});
const loading = computed(() => store.state.template.loading);

// field awal tanpa options
const fields = ref([
  {
    type: "file",
    name: "script_url",
    label: "Upload Template Naskah",
  },
  {
    type: "file",
    name: "haki_url",
    label: "Upload Template HAKI",
  },
]);

const rules = {
  script_url: [{ required: true, message: "Harus Upload Naskah" }],
  haki_url: [{ required: true, message: "Harus Upload HAKI" }],
};

const handleSubmit = async (values) => {
  try {
    const payload = {
      ...values,
    };
    await store.dispatch("template/createTemplate", payload);
    formData.value = {};
    message.success("Template berhasil ditambahkan");
  } catch (err) {
    console.error("Submit error:", err);
    message.error("Gagal menambahkan Template");
  } finally {
    router.push("/template");
  }
};
const handleCancel = () => {
  router.push("/template");
};
</script>
