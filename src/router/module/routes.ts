import { RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../../views/home.vue"),
    // children: [{ path: 'admin', component: () => import('@/views/home.vue') }]
  },
  {
    path: "/member",
    name: "member",
    component: () => import("../../views/member/mail.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../../views/admin/user.vue"),
  },
  {
    path: "/three",
    name: "three",
    component: () => import("../../views/three/three.vue"),
  },
  {
    path: "/tanke",
    name: "tanke",
    component: () => import("../../views/three/tanke.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("../../views/error/index.vue"),
  },
] as RouteRecordRaw[];

export default routes;
