<template>
  <div class="w-full">
    <a-spin :spinning="loading">
      <div class="flex justify-start pl-8">
        <BaseBreadcrumb :items="breadcrumbItems" />
      </div>
      <div class="flex p-4">
        <a-card class="w-full">
          <div
            v-for="item in chapters"
            :key="item.id"
            class="flex pb-4 text-xl font-bold"
          >
            Timeline Publikasi Buku
          </div>
          <div class="py-4">
            <a-steps
              progress-dot
              :current="1"
              :items="[
                {
                  title: 'Finished',
                  description: 'Cek Pembayaran',
                },
                {
                  title: 'In Progress',
                  description: 'Review Tulisan.',
                },
                {
                  title: 'Waiting',
                  description: 'Publish.',
                },
              ]"
            ></a-steps>
          </div>
          <hr class="border-1 border-gray-100" />
          <div class="flex w-full justify-center items-center overflow-hidden">
            <div
              class="flex flex-col w-full justify-center items-center p-8 overflow-hidden"
            >
              <div class="flex flex-col w-full justify-center pb-8">
                <div class="font-bold text-xl">Daftar Bab:</div>
              </div>
              <div class="w-full">
                <BaseChapterTitle />
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </a-spin>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BaseChapterTitle from "@/components/BaseChapterTitle.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import { useStore } from "vuex";

const breadcrumbItems = [
  { label: "Kategori Buku", link: "/" },
  { label: "Judul Buku", link: "/book-page" },
  { label: "Judul Bab" },
];

const store = useStore();
const chapters = computed(() => store.getters["chapter/chapterByBook"]);
const loading = computed(() => store.getters["chapter/loading"]);
const router = useRouter();

const goCategory = () => {
  router.push("/");
};

const handleClick = (item) => {
  // Simpan chapter_id ke localStorage
  localStorage.setItem("chapter_id", item.id);


  // Pindah ke halaman buku
  router.push("/checkout-page");
};

const value = ref("");
const onSearch = (searchValue) => {
  const book_id = parseInt(localStorage.getItem("book_id"));
  store.dispatch("chapter/fetchChapterByBook", {
    book_id: book_id,
    cari: value.value,
  });
};

const fetchData = () => {
  const book_id = parseInt(localStorage.getItem("book_id"));
  store.dispatch("chapter/fetchChapterByBook", {
    book_id: book_id,
    cari: "",
  });
};

onMounted(() => {
  fetchData();
});
</script>
