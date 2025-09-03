<!-- BaseUploadImg.vue -->
<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :action="cloudinaryUrl"
    :before-upload="beforeUpload"
    :data="getUploadData"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <LoadingOutlined v-if="loading" />
      <PlusOutlined v-else />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

// Props
const props = defineProps({
  cloudName: { type: String, required: true },
  uploadPreset: { type: String, required: true },
  modelValue: { type: String, default: "" },
});

// Emit
const emit = defineEmits(["update:modelValue"]);

// State
const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref(props.modelValue);

// Sync ke parent jika props berubah
watch(
  () => props.modelValue,
  (val) => {
    imageUrl.value = val;
  }
);

// Cloudinary URL
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${props.cloudName}/raw/upload`;

// Convert file ke base64 (untuk preview sementara)
function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
}

// Data tambahan untuk Cloudinary
const getUploadData = (file) => ({
  upload_preset: props.uploadPreset,
  folder: "uploads",
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
      imageUrl.value = uploadedUrl;
      emit("update:modelValue", uploadedUrl); // kirim ke parent
    } else if (info.file.originFileObj) {
      getBase64(info.file.originFileObj, (base64Url) => {
        imageUrl.value = base64Url;
      });
    }
    loading.value = false;
    message.success(`${info.file.name} uploaded successfully`);
  }

  if (info.file.status === "error") {
    loading.value = false;
    message.error("Upload error");
  }
};

// Validasi sebelum upload
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
</script>

<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
