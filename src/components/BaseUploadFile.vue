<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    :show-upload-list="false"
    :action="cloudinaryUrl"
    :before-upload="beforeUpload"
    :data="getUploadData"
    @change="handleChange"
  >
    <div v-if="fileUrl" class="flex flex-col items-center">
      <a-button type="link" danger @click.stop="removeFile">
        Ganti File
      </a-button>
    </div>

    <a-button type="primary" v-else>
      <LoadingOutlined v-if="loading" />
      <div v-else>
        <a-space>
            <UploadOutlined />
            <div class=""> PDF/DOC</div>
        </a-space>
      </div>
    </a-button>
  </a-upload>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

const props = defineProps({
  cloudName: { type: String, required: true },
  uploadPreset: { type: String, required: true },
  modelValue: { type: String, default: "" }, // url file dari parent
});

const emit = defineEmits(["update:modelValue"]);

const fileList = ref([]);
const loading = ref(false);
const fileUrl = ref(props.modelValue);
const fileName = ref("file.pdf");

watch(
  () => props.modelValue,
  (val) => {
    fileUrl.value = val;
    if (val) fileName.value = val.split("/").pop();
  }
);

// Cloudinary URL
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${props.cloudName}/raw/upload`;

// Data tambahan untuk Cloudinary
const getUploadData = () => ({
  upload_preset: props.uploadPreset,
  folder: "uploads",
  resource_type: "raw",
});

// Handle change upload
const handleChange = (info) => {
  fileList.value = info.fileList;
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    const uploadedUrl = info.file.response?.secure_url;
    if (uploadedUrl) {
      fileUrl.value = uploadedUrl;
      fileName.value = uploadedUrl.split("/").pop();
      emit("update:modelValue", uploadedUrl);
      message.success(`${info.file.name} uploaded successfully`);
    }
    loading.value = false;
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("Upload error");
  }
};

// Validasi sebelum upload
const beforeUpload = (file) => {
  const isPdfOrDoc =
    file.type === "application/pdf" ||
    file.type === "application/msword" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (!isPdfOrDoc) message.error("You can only upload PDF/DOC file!");
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) message.error("File must be smaller than 5MB!");
  return isPdfOrDoc && isLt5M;
};

// Hapus file
const removeFile = () => {
  fileUrl.value = "";
  emit("update:modelValue", "");
};

// Download file langsung
const downloadFile = async (url, name) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to download file");
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    link.click();
  } catch (err) {
    console.error(err);
    message.error("Failed to download file");
  }
};
</script>

<style scoped>
.ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
