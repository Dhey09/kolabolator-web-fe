<template>
  <aside class="h-full pb-20 bg-primary-dark text-white flex flex-col z-50">
    <!-- Header -->
    <div
      class="p-4 border-y border-blue-800 flex items-center gap-2 justify-center"
    >
      <UserOutlined class="text-4xl font-bold pr-2" />
      <a-space> </a-space>
      <span class="font-bold text-xl">
        {{ userInfo.name }}
        <br />
        <span class="text-sm"> ({{ userInfo.role_name }})</span>
      </span>
    </div>

    <!-- Scrollable Menu -->
    <div class="flex-1 pb-8 overflow-y-auto">
      <a-menu
        mode="inline"
        :selectedKeys="[route.path]"
        theme="#1e40af"
        class="bg-primary-dark custom-menu"
      >
        <template v-for="menu in menus" :key="menu.key">
          <!-- Sub Menu -->
          <a-sub-menu v-if="menu.children" :key="menu.key">
            <template #title>
              <span class="flex items-center gap-2 text-white">
                <component v-if="menu.icon" :is="getIcon(menu.icon)" />
                {{ menu.label }}
              </span>
            </template>
            <a-menu-item
              v-for="child in menu.children"
              :key="child.path"
              @click="handleClick(child)"
              :class="[
                'flex items-center gap-2',
                isActive(child.path) ? 'bg-blue-600' : 'hover:bg-blue-700',
              ]"
            >
              <span class="flex items-center gap-2 text-white">
                <component v-if="child.icon" :is="getIcon(child.icon)" />
                {{ child.label }}
              </span>
            </a-menu-item>
          </a-sub-menu>

          <!-- Menu Item -->
          <a-menu-item
            v-else
            :key="menu.path"
            @click="handleClick(menu)"
            :class="[
              'flex items-center gap-2',
              isActive(menu.path) ? 'bg-blue-600' : 'hover:bg-blue-700',
            ]"
          >
            <span class="flex items-center gap-2 text-white">
              <component v-if="menu.icon" :is="getIcon(menu.icon)" />
              {{ menu.label }}
            </span>
          </a-menu-item>
        </template>
      </a-menu>
    </div>

    <!-- Footer -->
    <div
      class="p-4 border-t border-blue-800 hover:bg-blue-700 cursor-pointer flex items-center gap-2"
      @click="showModal = true"
    >
      <LogoutOutlined />
      <span>Logout</span>
    </div>
    <BaseModal
      v-model:open="showModal"
      title="Konfirmasi Logout"
      :confirmLoading="loading"
      :content="`Hai ${userInfo.username}, apakah Anda yakin ingin keluar?`"
      ok-text="Ya, Logout"
      cancel-text="Batal"
      @ok="logout"
      @cancel="showModal = false"
    />
  </aside>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref, resolveComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LogoutOutlined } from "@ant-design/icons-vue";
import BaseModal from "@/components/BaseModal.vue";

import { Modal } from "ant-design-vue";

const hasUnsaved = computed(() => store.state.form.hasUnsavedChanges);

const handleClick = (menu) => {
  if (!menu.path) return;

  if (hasUnsaved.value) {
    Modal.confirm({
      title: "Data belum disimpan",
      content: "Perubahan Anda belum disimpan. Yakin mau pindah halaman?",
      okText: "Ya, pindah",
      cancelText: "Batal",
      onOk: () => {
        store.commit("form/SET_UNSAVED", false);
        router.push(menu.path);
      },
    });
  } else {
    router.push(menu.path);
  }
};

// const handleClick = (menu) => {
//   if (menu.path) {
//     router.push(menu.path);
//   }
// };

const store = useStore();
const router = useRouter();
const route = useRoute();
const userDetail = computed(() => store.state.user.userDetail);
const userId = parseInt(localStorage.getItem("userId"));
const userString = localStorage.getItem("user");
const userInfo = userString ? JSON.parse(userString) : null;

const menus = computed(() =>
  store.getters["menu/availableMenus"](store.state.category.categories)
);
const showModal = ref(false);
const loading = computed(() => store.getters["auth/loading"]);

// helper untuk ambil icon
const getIcon = (iconName) => {
  if (!iconName) return null;
  const pascal = iconName
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  return resolveComponent(pascal + "Outlined");
};

// aktif jika path saat ini diawali dengan path menu
const isActive = (path) => route.path.startsWith(path);

const logout = () => {
  store.dispatch("auth/logout");
  localStorage.clear();
  showModal.value = false;
  window.location.href = "/";
};

onMounted(async () => {
  const userId = parseInt(localStorage.getItem("userId"));
  await store.dispatch("user/fetchUserById", userId);
  await store.dispatch("category/fetchCategories", { page: 0, per_page: 100 });
});
</script>

<style scoped>
/* default hover */
:deep(.custom-menu .ant-menu-item:hover) {
  background-color: #2563eb !important;
}

/* submenu title hover */
:deep(.custom-menu .ant-menu-submenu-title:hover) {
  background-color: #2563eb !important;
}

/* selected / aktif */
:deep(.custom-menu .ant-menu-item-selected) {
  background-color: #1d4ed8 !important;
  color: #fff !important;
}

/* icon di item aktif juga putih */
:deep(.custom-menu .ant-menu-item-selected .anticon) {
  color: #fff !important;
}
:deep(.ant-menu-submenu-arrow) {
  color: #fff !important;
}
:deep(
    .ant-menu-submenu-open > .ant-menu-submenu-title .ant-menu-submenu-arrow
  ) {
  color: #fff !important;
}
</style>
