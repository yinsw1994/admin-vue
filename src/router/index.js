import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    // component: Home,
    redirect: "Login",
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/account/Login"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
