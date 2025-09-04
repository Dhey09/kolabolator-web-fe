<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-spin :spinning="loading">
    <BaseForm
      v-model="formData"
      :chapter="'Tambah Judul Bagian'"
      :fields="fields"
      :rules="rules"
      @submit="handleSubmit(formData)"
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
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseForm from "@/components/BaseForm.vue";
import { message } from "ant-design-vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/chapter" },
  { icon: "list-outlined", label: "Judul Bagian", link: "/chapter" },
  { label: "Tambah Judul Bagian" },
];

const router = useRouter();
const store = useStore();
const formData = ref({});
const loading = computed(() => store.state.chapter.loading);
const books = computed(() => store.state.book.books);

// field awal tanpa options
const fields = ref([
  {
    type: "upload",
    name: "img",
    label: "Gambar Judul Bagian",
  },
  {
    type: "select",
    name: "book_id",
    label: "Judul Buku",
    placeholder: "Pilih judul buku",
    options: books.value.map((book) => ({
      label: book.title,
      value: book.id,
    })),
  },
  {
    type: "input",
    name: "chapter",
    label: "Bagian (Bab)",
    placeholder: "Masukan Bab (Bab 1, Bab 2, ..dst)",
  },
  {
    type: "input",
    name: "title",
    label: "Judul Bagian",
    placeholder: "Masukan judul bagian",
  },
  {
    type: "number",
    name: "price",
    label: "Harga",
    placeholder: "Masukan harga (angka)",
  },
  {
    type: "input",
    name: "deadline",
    label: "Deadline",
    placeholder: "Masukan deadline",
  },
]);

const rules = {
  book_id: [{ required: true, message: "Judul buku wajib dipilih" }],
  chapter: [{ required: true, message: "Bab wajib diisi" }],
  title: [{ required: true, message: "Judul Bagian (Bab) wajib diisi" }],
  price: [{ required: true, message: "Harga wajib diisi" }],
  deadlie: [{ required: true, message: "Deadline wajib diisi" }],
};

const markUnsaved = () => {
  store.commit("form/SET_UNSAVED", true);
};

const handleSubmit = async (values) => {
  try {
    const payload = {
      ...values,
    };
    await store.dispatch("chapter/createChapter", payload);
    store.commit("form/SET_UNSAVED", false);
    formData.value = {};
    message.success("Judul bagian berhasil ditambahkan");
  } catch (err) {
    console.error("Submit error:", err);
    message.error("Gagal menambahkan judul bagian");
  } finally {
    router.push("/chapter");
  }
};
const showModal = ref(false);
const isShowModal = () => {
  showModal.value = true;
};
const handleCancel = () => {
  router.push("/chapter");
  store.commit("form/SET_UNSAVED", false);
};

onMounted(async () => {
  await store.dispatch("book/fetchBooks", {
    page: 0,
    per_page: 100,
  });
});
</script>
