import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/app/Home.vue";
import Login from "../view/auth/Login.vue";
import UserView from "../view/user/UserView.vue";
import UserDetail from "../view/user/UserDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user",
    name: "UserView",
    component: UserView,
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    component: UserDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;