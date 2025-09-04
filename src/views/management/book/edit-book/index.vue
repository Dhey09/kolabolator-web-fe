<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>

  <a-spin :spinning="loading">
    <BaseForm
      v-model="formData"
      :title="'Edit Judul Buku'"
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

const loading = computed(() => store.state.book.loading);
const editBookId = computed(() => store.state.book.editBookId);
const categories = computed(() => store.state.category.categories);

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/book" },
  { icon: "book-outlined", label: "Judul Buku", link: "/book" },
  { label: "Edit Judul Buku" },
];

const formData = ref({});

const fields = [
  {
    type: "upload",
    name: "img",
    label: "Gambar Judul Buku",
  },
  {
    type: "select",
    name: "category_id",
    label: "Kategori Buku",
    placeholder: "Pilih kategori buku",
    options: categories.value.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })),
  },
  {
    type: "input",
    name: "title",
    label: "Judul Buku",
    placeholder: "Masukan judul buku",
  },
  {
    type: "textarea",
    name: "description",
    label: "Deskripsi Buku",
    placeholder: "Tulis deskripsi buku",
  },
];

const rules = {
  category_id: [{ required: true, message: "Kategori buku wajib dipilih" }],
  title: [{ required: true, message: "Judul buku wajib diisi" }],
};

const fetchData = async () => {
  await store.dispatch("book/fetchBookById", editBookId.value);
  const book = store.state.book.bookDetail;
  if (book) {
    formData.value = {
      img: book.img,
      category_id: book.category_id,
      title: book.title,
      description: book.description,
    };
  }
};

const markUnsaved = () => {
  store.commit("form/SET_UNSAVED", true);
};

const handleSubmit = async (values) => {
  const payload = {
    id: editBookId.value,
    ...values,
  };

  try {
    await store.dispatch("book/fetchUpdateBook", payload);
    message.success("Judul Buku berhasil diupdate");
    store.commit("form/SET_UNSAVED", false);
    router.push("/book");
  } catch {
    message.error("Gagal update book");
  }
};

const showModal = ref(false);
const isShowModal = () => {
  showModal.value = true;
};
const handleCancel = () => {
  router.push("/book");
  store.commit("form/SET_UNSAVED", false);
};

onMounted(async () => {
  await fetchData();
  await store.dispatch("category/fetchCategories", {
    page: 0,
    per_page: 100,
  });
});
</script>
