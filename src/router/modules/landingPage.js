import LandingLayout from "@/layouts/LandingLayout.vue";
import LandingPage from "@/views/landingpage/index.vue";
import BookPage from "@/views/landingpage/BookPage.vue";
import ChapterPage from "@/views/landingpage/ChapterPage.vue";
import CheckoutPage from "@/views/landingpage/CheckoutPage.vue";
import Checkout from "@/views/checkout/index.vue";

export default {
  path: "/",
  component: LandingLayout,
  children: [
    { path: "", name: "LandingPage", component: LandingPage },
    { path: "book-page", name: "BookPage", component: BookPage },
    { path: "chapter-page", name: "ChapterPage", component: ChapterPage },
    { path: "checkout-page", name: "CheckoutPage", component: CheckoutPage },
    { path: "checkout-payment-proof", name: "Checkout", component: Checkout },
  ],
};
