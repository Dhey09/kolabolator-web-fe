<template>
  <div
    class="flex bg-[url(@/assets/svg/landingPage.svg)] bg-cover w-screen h-[693px] items-center justify-center overflow-hidden"
  >
    <div class="flex flex-col items-center pt-78">
      <div class="font-sans font-bold text-3xl">Selamat Datang di</div>
      <div class="font-blippo text-8xl">Penerbit Widina</div>
      <div class="font-sans font-regular text-xl">
        Ayo bergabung dan ciptakan mahakarya bersama kami dalam buku kolaborasi
        ini!
      </div>
      <div class="pt-8">
        <a-input-search
          v-model:value="value"
          size="large"
          placeholder="Cari judul buku"
          enter-button
          allowClear
          @search="onSearch"
        />
      </div>
    </div>
  </div>

  <div class="flex w-full justify-center my-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>

  <div class="flex w-full justify-center items-center overflow-hidden">
    <div class="flex flex-col w-full justify-center items-center pb-8">
      <div
        class="flex flex-col w-full justify-center items-center p-8 overflow-hidden"
      >
        <div class="font-bold text-2xl">Judul Buku</div>
      </div>
      <!-- <a-card style="width: 100%"> -->
      <div
        v-if="books && books.length"
        class="flex flex-wrap gap-4 justify-center items-center"
      >
        <BaseCard
          v-for="item in books"
          :width="300"
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
      <!-- </a-card> -->
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BaseCard from "@/components/BaseCard.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const breadcrumbItems = [
  { icon: "read-outlined", label: "Kategori Buku", link: "/" },
  { icon: "book-outlined", label: "Judul Buku" },
];

const store = useStore();
const router = useRouter();
const books = computed(() => store.getters["book/bookByCategory"]);

const handleClick = (item) => {
  // Simpan category_id ke localStorage
  localStorage.setItem("book_id", item.id);

  // Pindah ke halaman buku
  router.push("/chapter-page");
};
const value = ref("");
const onSearch = (searchValue) => {
  const category_id = parseInt(localStorage.getItem("category_id"));
  store.dispatch("book/fetchBookByCategory", {
    category_id: category_id,
    cari: value.value,
  });
};

const fetchData = () => {
  const category_id = parseInt(localStorage.getItem("category_id"));
  store.dispatch("book/fetchBookByCategory", {
    category_id: category_id,
    cari: "",
  });
};

onMounted(() => {
  fetchData();
});
</script>
