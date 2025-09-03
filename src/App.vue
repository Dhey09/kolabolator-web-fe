<template>
  <!-- Router-view akan me-render layout sesuai route -->
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#1e40af',
      },
    }"
  >
    <router-view class="text-black" />
  </a-config-provider>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

onMounted(async () => {
});
</script>
