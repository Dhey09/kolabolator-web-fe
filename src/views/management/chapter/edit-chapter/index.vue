<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>

  <a-spin :spinning="loading">
    <BaseForm
      :title="'Edit Judul Bagian'"
      v-model="formData"
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

const loading = computed(() => store.state.chapter.loading);
const editChapterId = computed(() => store.state.chapter.editChapterId);
const books = computed(() => store.state.book.books);

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/chapter" },
  { icon: "list-outlined", label: "Judul Buku", link: "/chapter" },
  { label: "Edit Judul Bagian" },
];

const formData = ref({});

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
    options: books.value.map((chapter) => ({
      label: chapter.title,
      value: chapter.id,
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

const fetchData = async () => {
  await store.dispatch("chapter/fetchChapterById", editChapterId.value);
  const chapter = store.state.chapter.chapterDetail;
  if (chapter) {
    formData.value = {
      img: chapter.img,
      book_id: chapter.book_id,
      chapter: chapter.chapter,
      title: chapter.title,
      price: chapter.price,
      deadline: chapter.deadline,
    };
  }
};

const markUnsaved = () => {
  store.commit("form/SET_UNSAVED", true);
};

const showModal = ref(false);
const isShowModal = () => {
  showModal.value = true;
};
const handleCancel = () => {
  router.push("/chapter");
  store.commit("form/SET_UNSAVED", false);
};

const handleSubmit = async (values) => {
  const payload = {
    id: editChapterId.value,
    ...values,
  };

  try {
    await store.dispatch("chapter/fetchUpdateChapter", payload);
    message.success("Judul Bagian berhasil diupdate");
    store.commit("form/SET_UNSAVED", false);
    router.push("/chapter");
  } catch {
    message.error("Gagal update chapter");
  }
};

onMounted(async () => {
  await fetchData();
  await store.dispatch("book/fetchBooks", {
    page: 0,
    per_page: 100,
  });
});
</script>
