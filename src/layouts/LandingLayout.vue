<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <Header class="fixed top-0 left-0 right-0 z-50" />

    <!-- Main content -->
    <main class="pt-12 h-screen overflow-y-auto bg-[#F3F5F6] overflow-x-hidden">
      <router-view />
      <Footer />
    </main>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>
