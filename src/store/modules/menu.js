const state = {
  menus: [
    //Dashboard
    {
      key: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: "dashboard",
      role_id: [1, 2, 3],
    },

    // Kolaborator per user
    {
      key: "collaborator",
      label: "Kolaborator",
      path: "/collaborator",
      icon: "team",
      role_id: [3],
    },

    //Riwayat Transaksi
    {
      key: "payment_history",
      label: "Riwayat Pembelian",
      path: "/payment-history",
      icon: "shop",
      role_id: [3],
    },

    // List Menu Kategori
    {
      key: "category",
      label: "Kategori",
      icon: "read",
      role_id: [1, 2, 3],
      children: [],
    },

    // Daftar Kolaborator
    {
      key: "list-collaborator",
      label: "Daftar Kolaborator",
      path: "/list-collaborator",
      icon: "team",
      role_id: [1, 2],
    },

    // Daftar Transaksi
    {
      key: "transaction_list",
      label: "Daftar Transaksi",
      path: "/list-transaction",
      icon: "shop",
      role_id: [1, 2],
    },

    // Cek Pembayaran
    {
      key: "request_list",
      label: "Cek Pembayaran",
      path: "/request-list",
      icon: "tag",
      role_id: [1, 2],
    },

    //Cek Dokumen
    {
      key: "check-document",
      label: "Pengecekan Dokumen",
      path: "/check-document",
      icon: "fileDone",
      role_id: [1, 2],
    },

    // Manajemen
    {
      key: "management",
      label: "Manajemen",
      icon: "setting",
      role_id: [1, 2],
      children: [
        {
          key: "users",
          label: "Pengguna",
          icon: "user",
          path: "/user",
          role_id: [1, 2],
        },
        {
          key: "categories",
          label: "Kategori Buku",
          icon: "book",
          path: "/category",
          role_id: [1, 2],
        },
        {
          key: "books",
          label: "Judul Buku",
          icon: "book",
          path: "/book",
          role_id: [1, 2],
        },
        {
          key: "chapters",
          label: "Bab",
          icon: "book",
          path: "/chapter",
          role_id: [1, 2],
        },
        {
          key: "template",
          label: "Template",
          icon: "file-text",
          path: "/template",
          role_id: [1, 2],
        },

        {
          key: "payment",
          label: "Payment",
          icon: "bank",
          path: "/payment",
          role_id: [1, 2],
        },
      ],
    },

    // User Profile
    {
      key: "profile",
      label: "Profil",
      path: "/profile",
      icon: "user",
      role_id: [1, 2, 3],
    },
  ],
};

const getters = {
  availableMenus:
    (state) =>
    (categories = []) => {
      const roleId = Number(localStorage.getItem("role_id"));
      if (!roleId) return [];

      const filterByRole = (menus) =>
        menus
          .filter((m) => m.role_id.includes(roleId))
          .map((m) => {
            let menu = { ...m };

            // Jika menu memiliki children kategori
            if (menu.key === "category" && categories.length > 0) {
              menu.children = categories.map((c) => ({
                key: `category-${c.id}`,
                label: c.name,
                icon: "book",
                path: `/category/${c.id}`,
                role_id: [1, 2, 3], // sesuaikan akses
              }));
            } else if (menu.children) {
              menu.children = filterByRole(menu.children);
            }

            return menu;
          });

      return filterByRole(state.menus);
    },
};

export default {
  namespaced: true,
  state,
  getters,
};
