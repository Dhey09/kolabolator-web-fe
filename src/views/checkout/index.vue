<template>
  <!-- Header -->
  <div
    class="flex pt-6 pb-4 bg-white items-center justify-between px-8 shadow-md"
  >
    <div class="flex items-center space-x-3">
      <router-link to="/" class="flex items-center">
        <img src="@/assets/svg/logo.svg" alt="Logo" class="w-14 h-14" />
      </router-link>
      <div class="font-blippo text-2xl sm:text-3xl font-bold text-gray-800">
        Penerbit Widina
      </div>
    </div>
  </div>

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
          <div class="mt-2 sm:mt-0 text-red-600 font-semibold text-lg">
            ⏳ Batas Waktu: {{ countdown }}
          </div>
        </div>

        <hr class="border-gray-200 mb-6" />

        <!-- Book Info -->
        <div class="flex flex-col sm:flex-row gap-6">
          <!-- Image -->
          <div class="sm:w-1/3">
            <a-image
              :src="chapters.book_img || defaultBook"
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
                <td>{{ chapters.category_name }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Judul Buku</td>
                <td>:</td>
                <td>{{  chapters.book_title  }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Bagian</td>
                <td>:</td>
                <td>{{ chapters.chapter }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Judul Bagian</td>
                <td>:</td>
                <td>{{ chapters.title }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Harga</td>
                <td>:</td>
                <td>Rp {{ formatPrice(chapters.price) }}</td>
              </tr>
              <tr>
                <td class="pr-4 font-semibold">Deadline</td>
                <td>:</td>
                <td>{{ chapters.deadline }}</td>
              </tr>
            </table>

            <div class="mt-4 text-gray-800 font-medium">
              💳 Pembayaran dapat dilakukan melalui:
            </div>
            <ul class="list-disc list-inside space-y-1">
              <li v-for="data in payments" :key="data.id" class="text-gray-700">
                {{ data.bank }} - {{ data.bank_rek }} a.n
                <span class="font-semibold">{{ data.name }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Footer Section -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8"
        >
          <p class="sm:w-2/3 text-gray-600 text-sm leading-relaxed">
            **) Jika tidak melakukan
            <span class="font-medium">konfirmasi pembayaran</span> (upload bukti
            pembayaran) sampai batas waktu habis, pesanan akan dibatalkan secara
            otomatis.
          </p>
          <div>
            <!-- Tombol Konfirmasi -->
            <a-button
              type="primary"
              size="large"
              class="mt-4 sm:mt-0 px-8 py-5 rounded-xl shadow-md font-semibold"
              @click="showModal = true"
            >
              Konfirmasi Pembayaran
            </a-button>

            <!-- Modal Konfirmasi Pembayaran -->
            <a-modal
              v-model:open="showModal"
              title="Konfirmasi Pembayaran"
              :ok-button-props="{ style: { display: 'none' } }"
              :cancel-button-props="{ style: { display: 'none' } }"
              width="500px"
              centered
            >
              <BaseForm
                :title="'Form Konfirmasi Pembayaran'"
                :fields="formFields"
                v-model="formModel"
                @submit="handleSubmit"
                @cancel="handleCancel"
              >
                <template #actions>
                  <div class="flex justify-end mt-4">
                    <a-space>
                      <a-button @click="handleCancel">Batal</a-button>
                      <a-button type="primary" html-type="submit"
                        >Kirim</a-button
                      >
                    </a-space>
                  </div>
                </template>
              </BaseForm>
            </a-modal>
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

const store = useStore();
const chapters = computed(() => store.state.chapter.chapterDetail);
const loading = computed(() => store.getters["chapter/loading"]);
const payments = computed(() => store.getters["payment/allPayments"]);

const defaultBook = new URL("@/assets/img/default_img.jpeg", import.meta.url)
  .href;

const breadcrumbItems = [
  { label: "Kategori", link: "/" },
  { label: "Judul Buku", link: "/book-page" },
  { label: "Judul Bab", link: "/chapter-page" },
  { label: "Pemesanan", link: "/checkout-page" },
  { label: "Detail Pemesanan", link: "/checkout-page" },
];

const router = useRouter();

const formatPrice = (val) => {
  return new Intl.NumberFormat("id-ID").format(val);
};

const fetchData = async () => {
  const chapter_id = parseInt(localStorage.getItem("chapter_id"));
  await store.dispatch("chapter/fetchChapterById", chapter_id);
};
const fetchPayment = async () => {
  await store.dispatch("payment/fetchPayments", {
    page: 0,
    per_page: 10,
  });
};

const showModal = ref(false);

const formModel = ref({
  payment_proof: "",
});

const formFields = [
  {
    label: "Bukti Pembayaran",
    name: "payment_proof",
    type: "upload",
    rules: [{ required: true, message: "Upload bukti pembayaran" }],
  },
];

const handleSubmit = async (data) => {
  const chapter_id = parseInt(localStorage.getItem("chapter_id"));

  const paymentProofUrl =
    typeof data.payment_proof === "string"
      ? data.payment_proof
      : data.payment_proof?.url || "";

  const payload = {
    id: chapter_id,
    payment_proof: paymentProofUrl,
  };

  try {
    await store.dispatch("chapter/fetchUploadPaymentProof", payload);
    message.success("Konfirmasi pembayaran berhasil dikirim!");
    router.push("payment-history");
    showModal.value = false;
  } catch (err) {
    message.error("Gagal mengirim konfirmasi pembayaran");
  }
};

const handleCancel = () => {
  showModal.value = false;
};

const countdown = ref("");
let timerInterval;
const startCountdown = () => {
  if (!chapters.value || !chapters.value.expired_at) return;
  const target = new Date(chapters.value.expired_at).getTime();

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

onMounted(async () => {
  await fetchData();
  await fetchPayment();
  startCountdown();
});
</script>
