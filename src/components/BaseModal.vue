<template>
  <a-modal
    :open="open"
    :title="title"
    :width="width"
    :okText="okText"
    :cancelText="cancelText"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
    destroyOnClose
    centered
  >
    <p>{{ content }}</p>
    <template #footer>
      <slot name="footer">
        <a-space>
          <a-button @click="handleCancel">{{ cancelText }}</a-button>
          <a-button type="primary" :loading="loading" @click="handleOk">
            {{ okText }}
          </a-button>
        </a-space>
      </slot>
    </template>
  </a-modal>
</template>

<script setup>
const props = defineProps({
  open: { type: Boolean, default: false }, // kontrol buka/tutup
  title: { type: String, default: "Modal" },
  content: { type: String },
  width: { type: [String, Number], default: 600 },
  okText: { type: String, default: "OK" },
  cancelText: { type: String, default: "Batal" },
  loading: { type: Boolean, default: false }, // untuk loading button
});

const emits = defineEmits(["update:open", "ok", "cancel"]);

const handleOk = () => {
  emits("ok"); // trigger ke parent
};

const handleCancel = () => {
  emits("update:open", false); // tutup modal
  emits("cancel"); // trigger ke parent
};
</script>
