<template>
  <a-card>
    <a-result
      status="success"
      title="Dokumen Sudah Lengkap"
      sub-title="Terimakasih sudah menjadi kolaborator, admin akan menghubungi jika buku sudah di cetak"
    >
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
