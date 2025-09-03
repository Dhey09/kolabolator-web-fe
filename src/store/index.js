import { createStore } from "vuex";
import auth from "./modules/auth";
import menu from "./modules/menu";
import user from "./modules/user";
import category from "./modules/category";
import book from "./modules/book";
import chapter from "./modules/chapter";
import collaborator from "./modules/collaborator";
import template from "./modules/template";
import payment from "./modules/payment";

export default createStore({
  modules: {
    auth,
    menu,
    user,
    category,
    book,
    chapter,
    collaborator,
    template,
    payment,
  },
});
