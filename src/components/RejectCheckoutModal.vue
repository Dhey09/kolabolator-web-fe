<template>
  <a-modal
    :open="open"
    title="Alasan Penolakan"
    okText="Submit"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :confirmLoading="loading"
  >
    <a-form layout="vertical">
      <a-form-item label="Note">
        <a-textarea
          v-model:value="notes"
          placeholder="Masukan Alasan Penolakan"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  open: Boolean,
  checkout: Object, // object checkout dari state
});

const emit = defineEmits(["update:open", "rejected"]);

const store = useStore();
const loading = ref(false);
const notes = ref(""); // string kosong

// reset notes saat modal ditutup
watch(
  () => props.open,
  (val) => {
    if (!val) notes.value = "";
  }
);

const handleCancel = () => {
  emit("update:open", false);
};

const handleSubmit = async () => {
  if (!notes.value) {
    message.error("Harap isi alasan penolakan!");
    return;
  }

  loading.value = true;
  const checker_id = parseInt(localStorage.getItem("userId"));

  try {
    await store.dispatch("chapter/fetchApprovalChapter", {
      id: props.checkout.id,
      checker_id: checker_id,
      notes: notes.value,
    });

    message.success("Permintaan berhasil ditolak");
    emit("rejected");
    emit("update:open", false);
  } catch (error) {
    console.error(error);
    message.error("Gagal melakukan penolakan");
  } finally {
    loading.value = false;
  }
};
</script>
