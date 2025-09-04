<template>
  <a-modal
    :open="open"
    :title="title"
    :confirm-loading="loading"
    ok-text="Import"
    cancel-text="Batal"
    @ok="handleImport"
    @cancel="closeModal"
  >
    <!-- Upload Excel -->
    <a-upload :before-upload="beforeUpload" :show-upload-list="false">
      <a-button type="primary">Pilih File Excel</a-button>
    </a-upload>

    <div v-if="helpText" class="mt-2 text-gray-500 text-sm">
      {{ helpText }}
    </div>
  </a-modal>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: "Import Data" },
  loading: { type: Boolean, default: false },
  helpText: { type: String, default: "" }, // opsional buat info kolom excel
});

const emit = defineEmits(["update:open", "import"]);

const file = ref(null);

// Simpan file tanpa auto-upload
const beforeUpload = (f) => {
  file.value = f;
  return false;
};

// Emit file ke parent untuk di-dispatch ke Vuex
const handleImport = () => {
  if (!file.value) {
    message.error("Silakan pilih file excel terlebih dahulu!");
    return;
  }
  emit("import", file.value);
};

// Tutup modal
const closeModal = () => {
  emit("update:open", false);
  file.value = null;
};
</script>
