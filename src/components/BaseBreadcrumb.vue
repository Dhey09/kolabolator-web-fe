<template>
  <a-breadcrumb separator=">">
    <a-breadcrumb-item v-for="(item, index) in items" :key="index">
      <!-- Kalau ada link → router-link -->
      <router-link
        v-if="item.link"
        :to="item.link"
        class="flex items-center gap-1"
      >
        <a-space>
          <component :is="getIcon(item.icon)" v-if="item.icon" />
          <span>{{ item.label }}</span>
        </a-space>
      </router-link>

      <!-- Kalau tidak ada link → span biasa -->
      <span v-else class="flex items-center gap-1">
        <component :is="getIcon(item.icon)" v-if="item.icon" />
        <span>{{ item.label }}</span>
      </span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import * as Icons from "@ant-design/icons-vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

/**
 * Fungsi untuk mengambil icon dari string
 * contoh: "user-outlined" → Icons["UserOutlined"]
 */
const getIcon = (name) => {
  if (!name) return null;
  const key = name
    .split("-")
    .map((s, i) =>
      i === 0
        ? s.charAt(0).toUpperCase() + s.slice(1)
        : s.charAt(0).toUpperCase() + s.slice(1)
    )
    .join("");
  return Icons[key] || null;
};
</script>
