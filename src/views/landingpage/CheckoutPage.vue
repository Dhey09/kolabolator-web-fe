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
  </div>
  <div
    class="flex py-4 bg-white items-center justify-between px-8 inset-shadow-sm"
  >
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>

  <div class="h-full flex p-8">
    <div class="w-full">
      <a-card>
        <div class="flex pb-4 font-bold text-2xl">Pemesanan</div>
        <BaseTable
          :columns="columns"
          :data-source="chapters"
          :pagination="false"
        />

        <div class="flex justify-between items-center mt-4">
          <div>
            **) Setelah checkout harap lakukan pembayaran dalam waktu 1x24 jam,
            jika tidak dibayar maka pesanan akan dibatalkan
          </div>
          <div>
            <a-button type="primary" @click="handleClick"> CHECKOUT </a-button>
          </div>
        </div>
      </a-card>
    </div>
  </div>
  <a-spin :spinning="loading" />
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseTable from "@/components/BaseTable.vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

const store = useStore();
const chapters = computed(() => store.getters["chapter/chapterByBook"]);
const loading = computed(() => store.getters["chapter/loading"]);

const breadcrumbItems = [
  { label: "Kategori", link: "/" },
  { label: "Judul Buku", link: "/book-page" },
  { label: "Judul Bab", link: "/chapter-page" },
  { label: "Pemesanan" },
];

const columns = [
  { title: "KATEGORI", dataIndex: "category_name", key: "category_name" },
  { title: "JUDUL BUKU", dataIndex: "book_title", key: "book_title" },
  { title: "BAGIAN", dataIndex: "chapter", key: "chapter" },
  { title: "JUDUL BAGIAN", dataIndex: "title", key: "title" },
  { title: "DEADLINE", dataIndex: "deadline", key: "deadline" },
  { title: "HARGA", dataIndex: "price", key: "price" },
];

const router = useRouter();

const handleClick = async () => {
  loading.value = true;
  const chapter_id = parseInt(localStorage.getItem("chapter_id"));
  const member_id = parseInt(localStorage.getItem("userId"));
  try {
    await store.dispatch("chapter/fetchCheckoutChapter", {
      id: chapter_id,
      user_id: member_id,
    });
    message.success("Berhasil Checkout!");
  } catch (error) {
    message.error("Gagal Checkout", error);
  } finally {
    router.push("/checkout-payment-proof");
    loading.value = false;
  }
};
</script>
