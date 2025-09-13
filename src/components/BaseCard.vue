<template>
  <a-card hoverable :style="{ width: width + 'px' }">
    <!-- Cover Image -->
    <template #cover>
      <a-image
        :src="displayImage"
        alt="preview"
        style="
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 6px;
        "
      />
    </template>

    <!-- Kolaborator (hanya muncul jika checkout_by_name ada) -->
    <div v-if="checkout_by_name" class="mt-2 text-sm text-gray-600">
      <strong>Kolaborator:</strong> {{ checkout_by_name }}
    </div>

    <!-- Actions -->
    <template #actions>
      <a-button
        v-if="onClick && role === 3"
        class="w-full"
        type="primary"
        :disabled="isDisabled"
        @click="onClick"
      >
        <div class="flex justify-center items-center">
          <a-space>
            {{ actionText }}
          </a-space>
        </div>
      </a-button>
       <a-button
        v-else-if="onClick && role !== 3 && route.name !== 'Dashboard'"
        class="w-full"
        type="primary"
        @click="onClick"
      >
        <div class="flex justify-center items-center">
          <a-space> Lihat Detail </a-space>
        </div>
      </a-button>
      <a-button
        v-else-if="onClick && role !== 3 && route.name === 'Dashboard'"
        class="w-full"
        type="primary"
        @click="goTo"
      >
        <div class="flex justify-center items-center">
          <a-space> Manage </a-space>
        </div>
      </a-button>
    </template>

    <!-- Card Title -->
    <a-card-meta class="text-wrap" :title="title" />
  </a-card>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const defaultBook = new URL("@/assets/img/default_img.jpeg", import.meta.url)
  .href;
const role = parseInt(localStorage.getItem("role_id"));
const router = useRouter();
const route = useRoute();

const props = defineProps({
  img: { type: String, default: "" },
  title: { type: String, required: true },
  actionText: { type: String, default: "Lihat Detail" },
  width: { type: Number, default: 250 },
  onClick: { type: Function, default: () => {} },
  disabled: { type: Boolean, default: false },
  checkout_by_name: { type: String, default: null }, // <--- Tambahkan prop ini
});

const goTo = () => {
  router.push("/category");
};

// Image fallback
const displayImage = computed(() => props.img || defaultBook);

// Tombol disable berdasarkan props
const isDisabled = computed(() => props.disabled);
</script>
