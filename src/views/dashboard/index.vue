<template>
  <div class="mb-2">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>

  <div class="flex items-center justify-between">
    <a-card
      class="w-full shadow-lg rounded-2xl bg-gradient-to-br from-white to-gray-50"
    >
      <!-- Greeting -->
      <div class="text-lg font-semibold mb-2">
        <span v-if="user && user.name"
          >👋 Hy {{ user.name }}! Selamat Datang di
          <span class="text-indigo-600">Dashboard</span></span
        >
        <span v-else>Loading...</span>
      </div>

      <hr class="border border-gray-200 my-4" />

      <!-- Statistik -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <a-card
          v-if="role_id === 1 || role_id === 2"
          hoverable
          class="rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          <div class="flex flex-col justify-center items-center">
            <div class="font-bold text-gray-500 mb-2">TOTAL KOLABORATOR</div>
            <div class="font-extrabold text-5xl text-indigo-600 drop-shadow">
              {{ collaborators ? collaborators.length : 0 }}
            </div>
          </div>
        </a-card>

        <a-card
          v-if="role_id === 3"
          hoverable
          class="rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          <div class="flex flex-col justify-center items-center">
            <div class="font-bold text-gray-500 mb-2">TOTAL KOLABORASI</div>
            <div class="font-extrabold text-5xl text-indigo-600 drop-shadow">
              {{ userCollaborator ? userCollaborator.length : 0 }}
            </div>
          </div>
        </a-card>

        <a-card
          v-if="role_id === 3"
          hoverable
          class="rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          <div class="flex flex-col justify-center items-center">
            <div class="font-bold text-gray-500 mb-2">TOTAL PESANAN</div>
            <div class="font-extrabold text-5xl text-green-500 drop-shadow">
              {{ chapters ? chapters.length : 0 }}
            </div>
          </div>
        </a-card>

          <a-card
          v-if="role_id === 1 || role_id === 2"
          hoverable
          class="rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          <div class="flex flex-col justify-center items-center">
            <div class="font-bold text-gray-500 mb-2">TOTAL PESANAN</div>
            <div class="font-extrabold text-5xl text-green-500 drop-shadow">
              {{ transactionList ? transactionList.length : 0 }}
            </div>
          </div>
        </a-card>

        <a-card
          hoverable
          class="rounded-xl shadow-md transition-transform transform hover:scale-105"
        >
          <div class="flex flex-col justify-center items-center">
            <div class="font-bold text-gray-500 mb-2">TOTAL BUKU</div>
            <div class="font-extrabold text-5xl text-purple-500 drop-shadow">
              {{ books ? books.length : 0 }}
            </div>
          </div>
        </a-card>
      </div>

      <!-- Judul Terbaru -->
      <div class="flex mb-4 font-bold text-xl text-gray-700">
        📚 JUDUL TERBARU MINGGU INI
      </div>

      <hr class="border border-gray-200 my-4" />

      <div
        v-if="books && books.length"
        class="flex flex-wrap gap-6 justify-center"
      >
        <BaseCard
          v-for="item in books"
          :key="item.id"
          :img="item.img"
          :title="item.title"
          :actionText="'Ikut Kolaborasi'"
          :onClick="() => handleClick(item)"
          :width="280"
          class="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl"
        />
      </div>
      <div
        v-else
        class="flex justify-center items-center w-full py-10 text-gray-300"
      >
        <a-empty description="Belum ada judul buku terbaru minggu ini" />
      </div>
    </a-card>
  </div>
</template>

<script setup>
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseCard from "@/components/BaseCard.vue";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const user_id = parseInt(localStorage.getItem("userId"));
const role_id = parseInt(localStorage.getItem("role_id"));
const user = computed(() => store.state.user.userDetail);
const books = computed(() => store.getters["book/newestBooks"]);
const chapters = computed(
  () => store.getters["chapter/personalCheckoutChapter"]
);

const collaborators = computed(
  () => store.getters["collaborator/allCollaborators"]
);

const userCollaborator = computed(
  () => store.getters["collaborator/personalCollaborator"]
);
const transactionList = computed(
  () => store.getters["chapter/transactionList"]
);

const breadcrumbItems = [{ icon: "dashboard-outlined", label: "Dashboard" }];

const handleClick = (item) => {
  localStorage.removeItem("book_id");
  localStorage.setItem("book_id", item.id);
  router.push("/chapter-page");
};

onMounted(async () => {
  await store.dispatch("book/fetchBooks", {});
  await store.dispatch("user/fetchUserById", user_id);
  await store.dispatch("collaborator/fetchPersonalCollaborator", {
    collaborator_id: user_id,
  });
  await store.dispatch("collaborator/fetchCollaborators");
  await store.dispatch("chapter/fetchPersonalCheckoutChapter", {
    checkout_by: user_id,
  });
  await store.dispatch("chapter/fetchTransactionLists");
});
</script>
