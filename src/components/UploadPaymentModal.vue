<template>
  <a-modal
    :open="open"
    title="Upload Bukti Pembayaran"
    okText="Submit"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :confirmLoading="loading"
  >
    <a-form layout="vertical">
      <a-form-item label="Pilih File Bukti Pembayaran">
        <a-upload
          :beforeUpload="beforeUpload"
          :fileList="fileList"
          :maxCount="1"
          :accept="'image/*'"
          listType="picture"
        >
          <a-button icon="UploadOutlined">Upload Foto</a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const props = defineProps({
  open: Boolean,
  checkout: Object, // object checkout dari state
});

const emit = defineEmits(["update:open", "uploaded"]);

const store = useStore();
const loading = ref(false);
const fileList = ref([]);
const router = useRouter();

// reset fileList saat modal ditutup
watch(
  () => props.open,
  (val) => {
    if (!val) fileList.value = [];
  }
);

const beforeUpload = (file) => {
  fileList.value = [file]; // selalu 1 file
  return false; // jangan auto upload
};

const handleCancel = () => {
  emit("update:open", false);
};

const handleSubmit = async () => {
  if (!fileList.value.length) {
    message.error("Harap pilih file terlebih dahulu!");
    return;
  }

  loading.value = true;
  try {
    await store.dispatch("checkout/fetchUpdateCheckout", {
      id: props.checkout.id,
      member_id: props.checkout.member_id,
      chapter_id: props.checkout.chapter_id,
      payment_proof: fileList.value[0], // file dari <a-upload>
    });

    message.success("Bukti pembayaran berhasil diupload");
    emit("uploaded"); // emit supaya parent bisa refresh tabel
    emit("update:open", false);
  } catch (error) {
    console.error(error);
    message.error("Gagal upload bukti pembayaran");
  } finally {
    router.push("/order-history");
    loading.value = false;
  }
};
</script>
