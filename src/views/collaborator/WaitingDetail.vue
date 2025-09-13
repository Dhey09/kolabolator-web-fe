<template>
  <a-card>
    <a-result
      title="Dokumen Dalam Proses Pengecekan"
      sub-title="Dokumen dalam proses pengecekan oleh admin, jika dokumen belum di cek dalam 1 hari, harap hubungi admin ya"
    >
      <template #icon>
        <smile-twoTone />
      </template>
      <template #extra>
        <a-button type="primary" @click="handleBack"
          >Kembali Ke Kolaborator</a-button
        >
        <a-button @click="handleBuy">Beli Lagi</a-button>
      </template>
    </a-result>
  </a-card>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleBack = () => {
  router.push("/collaborator");
};

const handleBuy = () => {
  router.push("/");
};
</script>
