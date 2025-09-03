<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>

  <a-spin :spinning="loading">
    <BaseForm
      :title="'Edit Template'"
      v-model="formData"
      :fields="fields"
      :rules="rules"
      @submit="handleSubmit"
    >
      <template #actions>
        <div class="flex justify-end">
          <a-space>
            <a-button type="default" @click="handleCancel">Batal</a-button>
            <a-button type="primary" html-type="submit">Simpan</a-button>
          </a-space>
        </div>
      </template>
    </BaseForm>
  </a-spin>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseForm from "@/components/BaseForm.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import { message } from "ant-design-vue";

const router = useRouter();
const store = useStore();

const loading = computed(() => store.state.template.loading);
const editTemplateId = computed(() => store.state.template.editTemplateId);
const templates = computed(() => store.state.template.templates);

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/template" },
  { icon: "profile-outlined", label: "Template", link: "/template" },
  { label: "Edit Template" },
];

const formData = ref({});

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

const fetchData = async () => {
  await store.dispatch("template/fetchTemplateById", editTemplateId.value);
  const template = store.state.template.templateDetail;
  if (template) {
    formData.value = {
      script_url: template.script,
      haki_url: template.haki,
    };
  }
};

const handleSubmit = async (values) => {
  const payload = {
    id: editTemplateId.value,
    ...values,
  };

  try {
    await store.dispatch("template/fetchUpdateTemplate", payload);
    message.success("Template berhasil diupdate");
    router.push("/template");
  } catch {
    message.error("Gagal update template");
  }
};

const handleCancel = () => {
  router.push("/template");
};

onMounted(async () => {
  await fetchData();
});
</script>
