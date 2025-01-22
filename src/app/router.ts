import { createRouter, createWebHistory } from "vue-router";

import Layout from "@/app/layouts/LayoutDefault.vue";
import Home from "@/app/views/ViewHome.vue";
import StarredMovies from "@/app/views/ViewStarredMovies.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { layout: Layout },
  },
  {
    path: "/user/saved",
    name: "user-saved",
    component: StarredMovies,
    /* component: () => import("@/app/pages/PageStarredMovies.vue"), */
    meta: { layout: Layout },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
