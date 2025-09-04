<template>
  <a-card hoverable :style="{ width: width + 'px' }">
    <template #cover>
      <a-image
        :src="displayImage"
        alt="preview"
        style="
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 6px;
        "
      />
    </template>

    <div class="flex w-full">
      <div class="flex flex-col w-full justify-center items-center">
        <div class="font-bold text-xl">{{ chapter }}</div>
        <div class="text-large font-bold">{{ title }}</div>
        <div class="">{{ formatRupiah(price) }}</div>
        <div class="italic">Deadline: {{ deadline }}</div>
        <div v-if="checkout_by_name" class="mt-2 text-sm text-gray-600">
          <strong>Kolaborator:</strong> {{ checkout_by_name }}
        </div>
      </div>
    </div>

    <template #actions>
      <a-button
        v-if="onClick"
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
    </template>
  </a-card>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { RightOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  img: { type: String, required: true },
  chapter: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  deadline: { type: String, required: true },
  actionText: { type: String, default: "Lihat Detail" },
  width: { type: Number, default: 300 },
  onClick: { type: Function, default: () => {} },
  checkout_by_name: { type: String, default: null },
  disabled: { type: Boolean, default: false },
});

const formatRupiah = (value) => {
  if (!value) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};
const isDisabled = computed(() => props.disabled);

const defaultBook = new URL("@/assets/img/default_img.jpeg", import.meta.url)
  .href;
const displayImage = computed(() => props.img || defaultBook);
</script>
