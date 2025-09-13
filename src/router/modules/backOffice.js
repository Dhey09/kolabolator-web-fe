import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Dashboard from "@/views/dashboard/index.vue";

import Profile from "@/views/profile/index.vue";
import UpdateProfile from "@/views/profile/update-profile/index.vue";

import Collaborator from "@/views/collaborator/index.vue";
import CompleteCollaborator from "@/views/collaborator/CompleteDetail.vue";
import PendingCollaborator from "@/views/collaborator/WaitingDetail.vue";
import ListCollaborator from "@/views/collaborator/list-collaborator/index.vue";
import UploadScript from "@/views/collaborator/upload-script/index.vue";
import CheckDocument from "@/views/check-document/index.vue";

import Users from "@/views/management/user/index.vue";
import AddUser from "@/views/management/user/add-user/index.vue";
import EditUser from "@/views/management/user/edit-user/index.vue";

import Categories from "@/views/management/category/index.vue";
import AddCategory from "@/views/management/category/add-category/index.vue";
import EditCategory from "@/views/management/category/edit-category/index.vue";

import Books from "@/views/management/book/index.vue";
import AddBook from "@/views/management/book/add-book/index.vue";
import EditBook from "@/views/management/book/edit-book/index.vue";
import UpdateTimeline from "@/views/management/book/update-timeline/index.vue";

import Chapters from "@/views/management/chapter/index.vue";
import AddChapter from "@/views/management/chapter/add-chapter/index.vue";
import EditChapter from "@/views/management/chapter/edit-chapter/index.vue";
import ListTransaction from "@/views/checkout/transaction-list/index.vue";

import Templates from "@/views/management/template/index.vue";
import AddTemplate from "@/views/management/template/add-template/index.vue";
import EditTemplate from "@/views/management/template/edit-template/index.vue";

import Payments from "@/views/management/payment/index.vue";
import AddPayment from "@/views/management/payment/add-payment/index.vue";
import EditPayment from "@/views/management/payment/edit-payment/index.vue";

import PaymentHistory from "@/views/checkout/payment-history/index.vue";
import PaymentDetail from "@/views/checkout/payment-history/PaymentDetail.vue";
import RequestLists from "@/views/checkout/request-list/index.vue";

import BookTitle from "@/views/BookTitle.vue";
import ChapterTitle from "@/views/ChapterTitle.vue";

export default {
  path: "/",
  component: DefaultLayout,
  children: [
    { path: "dashboard", name: "Dashboard", component: Dashboard },

    { path: "profile", name: "Profile", component: Profile },
    { path: "profile-update", name: "UpdateProfile", component: UpdateProfile },

    { path: "collaborator", name: "Collaborator", component: Collaborator },
     { path: "collaborator-detail-complete", name: "CompleteCollaborator", component: CompleteCollaborator },
      { path: "collaborator-detail-pending", name: "PendingCollaborator", component: PendingCollaborator },
    {
      path: "list-collaborator",
      name: "ListCollaborator",
      component: ListCollaborator,
    },
    {
      path: "collaborator-upload-script",
      name: "UploadScript",
      component: UploadScript,
    },
    {
      path: "check-document",
      name: "CheckDocument",
      component: CheckDocument,
    },

    { path: "user", name: "Users", component: Users },
    { path: "user-add", name: "AddUsers", component: AddUser },
    { path: "user-edit", name: "EditUser", component: EditUser },

    { path: "category", name: "Categories", component: Categories },
    { path: "category-add", name: "AddCategory", component: AddCategory },
    { path: "category-edit", name: "EditCategory", component: EditCategory },

    { path: "book", name: "Books", component: Books },
    { path: "book-add", name: "AddBook", component: AddBook },
    { path: "book-edit", name: "EditBook", component: EditBook },
    {
      path: "book-update-status",
      name: "UpdateTimeline",
      component: UpdateTimeline,
    },

    { path: "chapter", name: "Chapters", component: Chapters },
    { path: "chapter-add", name: "AddChapter", component: AddChapter },
    { path: "chapter-edit", name: "EditChapter", component: EditChapter },

    { path: "template", name: "Templates", component: Templates },
    { path: "template-add", name: "AddTemplate", component: AddTemplate },
    { path: "template-edit", name: "EditTemplate", component: EditTemplate },

    { path: "payment", name: "Payments", component: Payments },
    { path: "payment-add", name: "AddPayment", component: AddPayment },
    { path: "payment-edit", name: "EditPayment", component: EditPayment },

    {
      path: "payment-history",
      name: "PaymentHistory",
      component: PaymentHistory,
    },
    {
      path: "payment-detail",
      name: "PaymentDetail",
      component: PaymentDetail,
    },
    {
      path: "request-list",
      name: "RequestLists",
      component: RequestLists,
    },
    {
      path: "list-transaction",
      name: "TransactionList",
      component: ListTransaction,
    },

    //submenu Kategori
    {
      path: "/category/:id",
      name: "category-page",
      component: BookTitle,
    },
    {
      path: "/category/:id/chapter-title-page",
      name: "chapter-title-page",
      component: ChapterTitle,
    },
  ],
};
