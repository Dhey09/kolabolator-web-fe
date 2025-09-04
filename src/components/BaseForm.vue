<template>
  <div>
    <a-card>
      <!-- Title -->
      <div class="mb-2" v-if="title">
        <h3 class="text-lg font-bold">{{ title }}</h3>
      </div>
      <hr class="mb-2 border-1 border-gray-100 mb-6" />

      <a-form
        :model="localModel"
        :rules="rules"
        layout="vertical"
        @finish="handleSubmit"
      >
        <a-row :gutter="[16, 2]">
          <!-- gutter = jarak antar kolom -->
          <template v-for="(field, index) in fields" :key="index">
            <a-col :span="field.type === 'upload' ? 24 : 12">
              <a-form-item
                :label="field.label"
                :name="field.name"
                :rules="field.rules"
              >
                <!-- Input -->
                <a-input
                  v-if="['input', 'password', 'number'].includes(field.type)"
                  v-model:value="localModel[field.name]"
                  :maxlength="field.maxLength || null"
                  :placeholder="field.placeholder"
                  :type="field.type === 'password' ? 'password' : 'text'"
                  @keypress="
                    (e) => {
                      if (field.type === 'number') {
                        const char = String.fromCharCode(e.charCode);
                        if (!/[0-9]/.test(char)) e.preventDefault();
                      }
                    }
                  "
                  @input="
                    () => {
                      if (field.type === 'number') {
                        localModel[field.name] = localModel[field.name]
                          ? String(localModel[field.name]).replace(/\D/g, '')
                          : '';
                      }
                    }
                  "
                />

                <!-- Textarea -->
                <a-textarea
                  v-else-if="field.type === 'textarea'"
                  v-model:value="localModel[field.name]"
                  :rows="field.rows || 4"
                  :placeholder="field.placeholder"
                />

                <!-- Select -->
                <a-select
                  v-else-if="field.type === 'select'"
                  v-model:value="localModel[field.name]"
                  :placeholder="field.placeholder"
                >
                  <a-select-option
                    v-for="opt in field.options"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </a-select-option>
                </a-select>

                <!-- Date -->
                <a-date-picker
                  v-else-if="field.type === 'date'"
                  :value="
                    localModel[field.name]
                      ? dayjs(localModel[field.name])
                      : null
                  "
                  style="width: 100%"
                  format="DD MMMM YYYY"
                  @change="
                    (_, dateString) => (localModel[field.name] = dateString)
                  "
                />

                <!-- Radio -->
                <a-radio-group
                  v-else-if="field.type === 'radio'"
                  v-model:value="localModel[field.name]"
                >
                  <a-radio
                    v-for="opt in field.options"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </a-radio>
                </a-radio-group>

                <!-- Upload -->
                <BaseUploadImg
                  v-else-if="field.type === 'upload'"
                  v-model="localModel[field.name]"
                  :cloudName="cloudName"
                  :uploadPreset="uploadPreset"
                />
                <BaseUploadFile
                  v-else-if="field.type === 'file'"
                  v-model="localModel[field.name]"
                  :cloudName="cloudName"
                  :uploadPreset="uploadPreset"
                />

                <!-- Download -->
                <a-button
                  v-else-if="field.type === 'download'"
                  type="link"
                  @click="() => window.open(localModel[field.name], '_blank')"
                >
                  Download
                </a-button>
              </a-form-item>
            </a-col>
          </template>

          <!-- Actions -->
          <a-col :span="24">
            <slot name="actions">
              <div class="flex justify-end">
                <a-space>
                  <a-button @click="handleCancel">Batal</a-button>
                  <a-button type="primary" html-type="submit">
                    Submit
                  </a-button>
                </a-space>
              </div>
            </slot>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { reactive, watch } from "vue";
import BaseUploadImg from "./BaseUploadImg.vue";
import BaseUploadFile from "./BaseUploadFile.vue";
import { message } from "ant-design-vue";

const props = defineProps({
  title: { type: String, default: "" },
  fields: { type: Array, required: true },
  modelValue: { type: Object, default: () => ({}) },
  rules: { type: Object, default: () => ({}) },
});

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const emits = defineEmits(["update:modelValue", "submit", "cancel", "change"]);

const localModel = reactive({ ...props.modelValue });

watch(
  () => props.modelValue,
  (val) => Object.assign(localModel, val),
  { deep: true }
);

watch(
  localModel,
  (val) => {
    emits("update:modelValue", val);
    emits("change", val);
  },
  { deep: true }
);

const handleSubmit = () => {
  emits("submit", { ...localModel });
};

const handleCancel = () => {
  Object.keys(localModel).forEach((key) => {
    localModel[key] = props.modelValue[key] ?? null;
  });
  emits("cancel");
};
</script>

<style scoped>
.a-upload-list-picture-card {
  width: 120px !important;
  height: 120px !important;
}
</style>
