<template>
  <!-- Breadcrumb -->
  <div class="flex py-3 bg-gray-50 items-center px-8 border-b border-gray-200">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>

  <!-- Content -->
  <div class="h-full flex p-6 sm:p-8 bg-gray-50 min-h-screen">
    <div class="w-full max-w-5xl mx-auto">
      <a-card class="shadow-lg rounded-xl overflow-hidden">
        <!-- Title & Countdown -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
        >
          <h2 class="font-bold text-2xl text-gray-800">Detail Pemesanan</h2>
          <div
            v-if="chapterData.status === 'pending'"
            class="mt-2 sm:mt-0 text-red-600 font-semibold text-lg"
          >
            ⏳ Batas Waktu: {{ countdown }}
          </div>
          <div
            v-else-if="chapterData.status === 'waiting'"
            class="mt-2 sm:mt-0 text-yellow-600 font-semibold text-lg"
          >
            Pembayaran Dalam Proses Pengecekan
          </div>
          <div
            v-else-if="chapterData.status === 'close'"
            class="mt-2 sm:mt-0 text-green-600 font-semibold text-lg"
          >
            Pembayaran sudah dikonfirmasi oleh admin ({{
              chapterData.checked_by_name
            }})
          </div>
          <div
            v-else
            class="mt-2 sm:mt-0 text-yellow-600 font-semibold text-lg"
          >
            -
          </div>
        </div>

        <hr class="border-gray-200 mb-6" />

        <!-- Book Info -->
        <div class="flex flex-col sm:flex-row gap-6">
          <!-- Image -->
          <div class="sm:w-1/3">
            <a-image
              :src="chapterData.book_img || defaultBook"
              alt="Book Image"
              class="rounded-lg shadow-md"
              style="width: 100%; height: 220px; object-fit: cover"
            />
          </div>

          <!-- Details -->
          <div class="sm:w-2/3 flex flex-col space-y-2 text-gray-700 ml-4">
            <table class="table-auto">
              <tr>
                <td class="pr-4 font-semibold">Kategori Buku</td>
                <td>:</td>
                <td>{{ chapterData.category_name }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Judul Buku</td>
                <td>:</td>
                <td>{{ chapterData.book_title }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Bagian</td>
                <td>:</td>
                <td>{{ chapterData.chapter }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Judul Bagian</td>
                <td>:</td>
                <td>{{ chapterData.title }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Harga</td>
                <td>:</td>
                <td>Rp {{ formatPrice(chapterData.price) }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Deadline</td>
                <td>:</td>
                <td>{{ chapterData.deadline }}</td>
              </tr>
            </table>
          </div>
        </div>

        <!-- Footer Section -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8"
        >
          <p class="sm:w-2/3 text-gray-600 text-sm leading-relaxed">
            **) Pembayaran sedang di check, jika pembayaran belum dikonfirmasi
            dalam 1 jam, harap hubungi admin dengan nomor
            <span>
              <a
                href="https://wa.me/qr/R2OTT6OXKBDIJ1"
                target="_blank"
                rel="noopener noreferrer"
                class="text-green-600 font-medium hover:underline"
              >
                0823-1043-3735
              </a>
            </span>
          </p>
          <div>
            <!-- Tombol Konfirmasi -->
            <a-button
              type="primary"
              size="large"
              class="mt-4 sm:mt-0 px-8 py-5 rounded-xl shadow-md font-semibold"
              @click="handleClick"
            >
              Kembali
            </a-button>
          </div>
        </div>
      </a-card>
    </div>
  </div>

  <!-- Loading -->
  <a-spin :spinning="loading" fullscreen tip="Memuat data..." />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import BaseForm from "@/components/BaseForm.vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";

const defaultBook = new URL("@/assets/img/default_img.jpeg", import.meta.url)
  .href;

const store = useStore();
const chapters = computed(
  () => store.getters["chapter/personalCheckoutChapter"]
);
const chapterData = computed(() => chapters.value?.[0] || {});

const loading = computed(() => store.getters["chapter/loading"]);

const breadcrumbItems = [
  { label: "Riwayat Pembelian", link: "/payment-history" },
  { label: "Detail Pemesanan" },
];

const router = useRouter();

const formatPrice = (val) => {
  return new Intl.NumberFormat("id-ID").format(val);
};

const countdown = ref("");
let timerInterval;
const startCountdown = () => {
  if (!chapterData.value || !chapterData.value.expired_at) return;
  const target = new Date(chapterData.value.expired_at).getTime();

  timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = target - now;

    if (distance <= 0) {
      countdown.value = "Waktu habis!";
      clearInterval(timerInterval);
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.value = `${hours} jam ${minutes} mnt ${seconds} dtk`;
  }, 1000);
};

const handleClick = () => {
  router.push("/payment-history");
  localStorage.removeItem("chapter_detail");
};

const fetchData = async () => {
  const member_id = parseInt(localStorage.getItem("userId"));
  const title = localStorage.getItem("chapter_detail");
  await store.dispatch("chapter/fetchPersonalCheckoutChapter", {
    checkout_by: member_id,
    cari: title,
  });
};

onMounted(async () => {
  await fetchData();
  startCountdown();
  console.log("data", chapterData.value);
});
</script>
