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
          placeholder="Cari kategori buku"
          enter-button
          @search="onSearch"
          allowClear
        />
      </div>
    </div>
  </div>

  <div class="flex w-full justify-center my-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <div class="flex w-full justify-center items-center overflow-hidden">
    <div
      class="flex flex-col w-full justify-center items-center p-8 overflow-hidden"
    >
      <div class="flex flex-col w-full justify-center items-center pb-8">
        <div class="font-bold text-2xl">Kategori Buku</div>
        <div class="text-large">Mari wujudkan karya besar bersama!</div>
        <div class="text-large">
          Ayo menulis buku kolaborasi dan tinggalkan jejak inspirasi lewat
          tulisanmu!
        </div>
      </div>
      <!-- <a-card style="width: 100%"> -->
      <div
        v-if="categories && categories.length"
        class="flex flex-wrap gap-4 justify-center items-center"
      >
        <BaseCard
          v-for="item in categories"
          :key="item.id"
          :img="item.img"
          :title="item.name"
          :actionText="'Lihat Detail'"
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

const breadcrumbItems = [{ icon: "read-outlined", label: "Kategori Buku" }];

const store = useStore();
const router = useRouter();
const search = ref("");
const page = ref(0);
const perPage = ref(10);
const categories = computed(() => store.getters["category/allCategories"]);
// const data = [
//   {
//     img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//     title: categories.name,
//   },
// ];

const handleClick = (item) => {
  // Simpan category_id ke localStorage
  localStorage.setItem("category_id", item.id);


  // Pindah ke halaman buku
  router.push("/book-page");
};

const value = ref("");
const onSearch = (searchValue) => {
  fetchData();
};

const fetchData = () => {
  store.dispatch("category/fetchCategories", {
    cari: value.value,
    page: page.value,
    per_page: perPage.value,
    sort_by: "id",
    sort_type: "ASC",
  });
};

onMounted(() => {
  fetchData();
});
</script>
