<template>
  <div class="h-screen">
    <!-- Header -->
    <Header class="fixed top-0 left-0 right-0 z-50" />

    <!-- Sidebar -->
    <Sidebar class="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40" />

    <!-- Main content -->
    <main class="ml-64 pt-20 h-screen overflow-y-auto bg-gray-100 p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
</script>
