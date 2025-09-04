<template>
  <div class="flex items-center justify-between w-full mb-4">
    <!-- Title -->
    <div class="text-lg font-bold">{{ title }}</div>

    <!-- Actions -->
    <div class="flex gap-2">
      <!-- Export Button -->
      <a-tooltip placement="top">
        <template #title>
          <span>Import File</span>
        </template>
        <a-button v-if="isExport" type="default" @click="isExport">
          <div class="flex items-center justify-center">
            <FileExcelOutlined />
          </div>
        </a-button>
      </a-tooltip>

      <!-- Download Button -->
      <a-tooltip placement="top">
        <template #title>
          <span>Download Template</span>
        </template>
        <a-button v-if="isDownload" type="default" @click="isDownload">
          <div class="flex items-center justify-center">
            <DownloadOutlined />
          </div>
        </a-button>
      </a-tooltip>
      <!-- Search -->
      <a-input-search
        v-if="isSearch"
        placeholder="Cari data..."
        allowClear
        style="width: 200px"
        @search="isSearch"
      >
        <template #enterButton>
          <div class="flex items-center justify-center">
            <SearchOutlined />
          </div>
        </template>
      </a-input-search>

      <!-- Add Button -->
      <a-tooltip placement="top">
        <template #title>
          <span>Tambah Data</span>
        </template>
        <a-button v-if="isAdd" type="primary" @click="isAdd">
          <div class="flex items-center justify-center">
            <PlusOutlined />
          </div>
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import {
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({
  title: { type: String, default: "" },
  isAdd: { type: Function, default: null },
  isExport: { type: Function, default: null },
  isDownload: { type: Function, default: null },
  isSearch: { type: Function, default: null }, // opsional search button
});

const emit = defineEmits(["search"]);
</script>
