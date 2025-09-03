<template>
  <div class="mb-4">
    <BaseBreadcrumb :items="breadcrumbItems" />
  </div>
  <a-card>
    <BaseButton
      :title="'Daftar User'"
      :isAdd="handleAdd"
      :isSearch="handleSearch"
    />
    <BaseTable
      :columns="columns"
      :data-source="users"
      :onEdit="editUser"
      :onDelete="deleteUser"
    />
  </a-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BaseTable from "@/components/BaseTable.vue";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const page = ref(0);
const perPage = ref(10);
const users = computed(() => store.getters["user/allUsers"]);

const handleExport = () => {
};

const handleDownload = () => {
};

const handleSearch = (val) => {
  store.dispatch("user/fetchUsers", {
    cari: val,
  });
};

const handleAdd = () => {
  router.push("/user-add");
};

const breadcrumbItems = [
  { icon: "setting-outlined", label: "Manajemen", link: "/user" },
  { icon: "user-outlined", label: "Pengguna" },
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role_name", key: "role_name" },
];

// Aksi
const editUser = (record) => {
  store.dispatch("user/setEditUserId", record.id);
  router.push("/user-edit");
};

const deleteUser = (record) => {
  try {
    store.dispatch("user/fetchDeleteUser", record.id);
  } catch (error) {
  } finally {
    fetchData();
  }
};

const fetchData = () => {
  store.dispatch("user/fetchUsers", {
    // cari: value.value,
    page: page.value,
    per_page: perPage.value,
    sort_by: "id",
    sort_type: "ASC",
  });
};

onMounted(() => {
  fetchData();
});
</script>
