<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>

  <a-spin :spinning="loading">
    <BaseForm
      :title="'Update Status Timeline'"
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

const loading = computed(() => store.state.book.loading);
const editBookId = computed(() => store.state.book.editBookId);
const categories = computed(() => store.state.category.categories);

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/book" },
  { icon: "book-outlined", label: "Judul Buku", link: "/book" },
  { label: "Update Status" },
];

const formData = ref({});

const fields = computed(() => {
  const baseFields = [
    {
      type: "select",
      name: "status",
      label: "Status Buku",
      placeholder: "Pilih status buku",
      options: [
        { value: "draft", label: "Baru" },
        { value: "editing", label: "Edit Naskah" },
        { value: "isbn_submission", label: "Pengajuan ISBN" },
        { value: "published", label: "Publish Buku" },
        { value: "printed", label: "Cetak Buku" },
      ],
    },
  ];

  if (formData.value.status === "isbn_submission") {
    baseFields.push({
      type: "input",
      name: "isbn_submission",
      label: "ISBN Submission",
      placeholder: "Masukkan ISBN Submission",
    });
  }

  return baseFields;
});

const rules = {
  isbn_submission: [
    { required: true, message: "ISBN Submission wajib diisi!" },
  ],
  status: [{ required: true, message: "Status wajib dipilih!" }],
};

const fetchData = async () => {
  await store.dispatch("book/fetchBookById", editBookId.value);
  const book = store.state.book.bookDetail;
  if (book) {
    formData.value = {
      status: book.status,
    };
  }
};

const handleSubmit = async (values) => {
  const payload = {
    id: editBookId.value,
    ...values,
  };

  try {
    await store.dispatch("book/fetchUpdateBookStatus", payload);
    message.success("Status Buku berhasil diupdate");
    router.push("/book");
  } catch {
    message.error("Gagal update status book");
  }
};

const handleCancel = () => {
  router.push("/book");
};

onMounted(async () => {
  await fetchData();
});
</script>
