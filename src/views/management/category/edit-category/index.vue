<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-spin :spinning="loading">
    <BaseForm
      v-model="formData"
      :title="'Edit Kategori Buku'"
      :fields="fields"
      :rules="rules"
      @submit="handleSubmit"
      @cancel="isShowModal"
      @change="markUnsaved"
    />

    <BaseModal
      v-model:open="showModal"
      title="Konfirmasi Batal"
      :confirmLoading="loading"
      :content="`Data belum disimpan, yakin batalkan?`"
      ok-text="Ya, Kembali"
      cancel-text="Batal"
      @ok="handleCancel"
      @cancel="showModal = false"
    />
  </a-spin>
</template>

<script setup>
import BaseModal from "@/components/BaseModal.vue";
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

const markUnsaved = () => {
  store.commit("form/SET_UNSAVED", true);
};

const handleSubmit = async (values) => {
  const payload = {
    id: editCategoryId.value,
    ...values,
  };

  try {
    await store.dispatch("category/fetchUpdateCategory", payload);
    message.success("Kategori berhasil diupdate");
    store.commit("form/SET_UNSAVED", false);
    router.push("/category");
  } catch {
    message.error("Gagal update category");
  }
};

const showModal = ref(false);
const isShowModal = () => {
  showModal.value = true;
};
const handleCancel = () => {
  router.push("/category");
  store.commit("form/SET_UNSAVED", false);
};

onMounted(fetchData);
</script>
