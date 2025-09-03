<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-spin :spinning="loading">
    <BaseForm
      :title="'Edit Kategori Buku'"
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

const loading = computed(() => store.state.category.loading);
const editCategoryId = computed(() => store.state.category.editCategoryId);

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/category" },
  { icon: "read-outlined", label: "Kategori", link: "/category" },
  { label: "Edit Kategori" },
];

const formData = ref({});

const fields = [
  { type: "upload", name: "img", label: "Gambar Kategori" },
  {
    type: "input",
    name: "name",
    label: "Nama",
    placeholder: "Masukkan judul kategori",
  },
];

const rules = {
  name: [{ required: true, message: "Judul kategori wajib diisi" }],
};

const fetchData = async () => {
  await store.dispatch("category/fetchCategoryById", editCategoryId.value);
  const category = store.state.category.categoryDetail;
  if (category) {
    formData.value = {
      img: category.img,
      name: category.name,
    };
  }
};

const handleSubmit = async (values) => {
  const payload = {
    id: editCategoryId.value,
    ...values,
  };

  try {
    await store.dispatch("category/fetchUpdateCategory", payload);
    message.success("Kategori berhasil diupdate");
    router.push("/category");
  } catch {
    message.error("Gagal update category");
  }
};

const handleCancel = () => {
  router.push("/category");
};

onMounted(fetchData);
</script>
