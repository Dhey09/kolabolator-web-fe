<template>
  <a-spin :spinning="loading">
    <div class="flex w-full justify-start my-4 ml-8">
      <BaseBreadcrumb :items="breadcrumbItems" />
    </div>

    <div class="flex flex-col w-full overflow-hidden">
      <a-card class="w-full">
        <div v-if="books && books.length" class="flex flex-wrap gap-4">
          <BaseCard
            v-for="item in books"
            :key="item.id"
            :img="item.img"
            :title="item.title"
            :actionText="'Ikut Kolaborasi'"
            :onClick="() => handleClick(item)"
          />
        </div>
        <div v-else class="flex justify-center items-center w-full py-10">
          <a-empty description="Belum ada judul buku di kategori ini" />
        </div>
      </a-card>
    </div>
  </a-spin>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import BaseCard from "@/components/BaseCard.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const breadcrumbItems = [
  { icon: "read-outlined", label: "Kategori Buku", link: "/" },
  { icon: "book-outlined", label: "Judul Buku" },
];

const store = useStore();
const router = useRouter();
const route = useRoute();
const books = computed(() => store.getters["book/bookByCategory"]);
const loading = computed(() => store.getters["book/loading"]);
const id = route.params.id;

const handleClick = (item) => {
  localStorage.removeItem("book_id");
  localStorage.setItem("book_id", item.id);
  router.push(`/chapter-page`);
};
const value = ref("");
const onSearch = (searchValue) => {
  store.dispatch("book/fetchBookByCategory", {
    category_id: category_id,
    cari: value.value,
  });
};

const fetchData = () => {
  store.dispatch("book/fetchBookByCategory", {
    category_id: id,
    cari: "",
  });
};

onMounted(() => {
  fetchData();
});

watch(
  () => route.params.id,
  (newId) => {
    store.dispatch("book/fetchBookByCategory", {
      category_id: newId,
      cari: value.value,
    });
  },
  { immediate: true } // langsung jalan saat mounted
);
</script>
