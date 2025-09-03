<template>
  <div
    class="flex pt-8 pb-4 bg-white items-center justify-between px-8 shadow-lg"
  >
    <div class="flex items-center justify-center">
      <router-link to="/" class="flex items-center justify-center">
        <img
          src="@/assets/svg/logo.svg"
          alt="Logo"
          class="w-16 h-16 mr-2 flex items-center justify-center"
        />
      </router-link>
      <div class="font-blippo text-3xl flex items-center justify-center">
        Penerbit Widina
      </div>
    </div>
    <div>
      <a-input-search
        size="medium"
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
    </div>
  </div>
  <div
    class="flex py-4 bg-white items-center justify-between px-8 inset-shadow-sm"
  >
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <div class="flex p-8">
    <div class="w-full">
      <a-card>
        <div
          v-for="item in chapters"
          :key="item.id"
          class="flex pb-4 text-2xl font-bold"
        >
          {{ item.book_title }}
        </div>
        <hr class="border-1 border-gray-100" />
        <div class="flex justify-between pt-4">
          <div>
            <a-image
              v-for="item in chapters"
              :key="item.id"
              :src="item.book_img"
              alt="Book Image"
              style="
                width: 80%;
                height: 200px;
                object-fit: cover;
                border-radius: 6px;
              "
            />
          </div>
          <div class="flex-1">
            <div class="flex flex-col">
              <div>Deskripsi Buku:</div>
              <div class="w-full max-h-[260px]">
                <a-card v-for="item in chapters" :key="item.id">
                  {{ item.book_description }}
                </a-card>
              </div>
              <div class="flex justify-end text-2xl mt-2">
                <ShareAltOutlined />
              </div>
            </div>
          </div>
        </div>
        <hr class="border-1 border-gray-100" />
        <BaseTimeline />

        <hr class="border-1 border-gray-100" />
        <div class="flex w-full justify-center items-center overflow-hidden">
          <div
            class="flex flex-col w-full justify-center items-center p-8 overflow-hidden"
          >
            <div class="flex flex-col w-full justify-center pb-8">
              <div class="font-bold text-xl">
                Silahkan pilih bab yang akan ditulis:
              </div>
            </div>
            <!-- <a-card style="width: 100%"> -->
            <div
              v-if="chapters && chapters.length"
              class="flex flex-wrap gap-4 justify-center items-center"
            >
              <BaseChapterCard
                v-for="item in chapters"
                :key="item.id"
                :img="item.img"
                :chapter="item.chapter"
                :title="item.title"
                :price="item.price"
                :deadline="item.deadline"
                :disabled="item.status === 'close'"
                :checkout_by_name="item.checkout_by_name"
                :actionText="'Pilih'"
                :onClick="() => handleClick(item)"
              />
            </div>
            <div
              v-else
              class="flex text-gray-300 font-bold justify-center items-center w-full py-10"
            >
              <a-empty description="Belum ada bab nih. Pantau terus ya!">
                <a-button type="primary" @click="goCategory"
                  >Kembali ke halaman kategori</a-button
                >
              </a-empty>
            </div>
            <!-- </a-card> -->
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BaseChapterCard from "@/components/BaseChapterCard.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseTimeline from "@/components/BaseTimeline.vue";
import { useStore } from "vuex";

const breadcrumbItems = [
  { label: "Kategori Buku", link: "/" },
  { label: "Judul Buku", link: "/book-page" },
  { label: "Judul Bab" },
];

const store = useStore();
const chapters = computed(() => store.getters["chapter/chapterByBook"]);
const router = useRouter();
const book_id = parseInt(localStorage.getItem("book_id"));

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
  store.dispatch("chapter/fetchChapterByBook", {
    book_id: book_id,
    cari: value.value,
  });
};

const fetchData = () => {
  store.dispatch("chapter/fetchChapterByBook", {
    book_id: book_id,
    cari: "",
  });
};

onMounted(() => {
  fetchData();
});
</script>
