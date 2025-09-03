<template>
  <div class="py-4">
    <div>
      <a-steps progress-dot :current="currentStep" :items="stepItems" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const bookById = computed(() => store.getters["book/bookDetail"]);
const totalChapter = computed(() => store.getters["chapter/totalChapterByBook"]);
const book_id = parseInt(localStorage.getItem("book_id"));

// mapping status → step index
const currentStep = computed(() => {
  switch (bookById.value?.status) {
    case "draft":
      return 1; // step 2 (index 1) → artinya sudah melewati step 1 dan aktif di step 2
    case "editing":
      return 2; // step 3
    case "isbn_submission":
      return 3; // step 4
    case "published":
      return 4; // step 5
    case "printed":
      return 5; // step 6
    default:
      return 0; // step 1 (default)
  }
});

// items
const stepItems = computed(() => [
  {
    title: "Kollaborator",
    description: bookById.value?.total_collaborator + "/" + totalChapter.value,
  },
  {
    title: "Upload Naskah",
    description: bookById.value?.total_completed_collaborator + "/" + totalChapter.value,
  },
  {
    title: "Editing Naskah",
    description: "",
  },
  {
    title: "Pengajuan ISBN",
    description: "",
  },
  {
    title: "Publish Buku",
    description: "",
  },
  {
    title: "Cetak Buku",
    description: "",
  },
]);

onMounted(() => {
  store.dispatch("book/fetchBookById", book_id);
});
</script>
