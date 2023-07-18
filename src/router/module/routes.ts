import { RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    // name: "home",
    // component: () => import("../../views/home.vue"),
    redirect:'/study',
    children: [
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
        component: () => import("../../views/threes/three.vue"),
      },
      {
        path: "/tanke",
        name: "tanke",
        component: () => import("../../views/threes/tanke.vue"),
      },
      {
        path: "/study",
        name: "study",
        component: () => import("../../views/study/index.vue"),
      },
      {
        path: "/:pathMatch(.*)",
        component: () => import("../../views/error/index.vue"),
      },
    ]
  },
 
  
] as RouteRecordRaw[];

export default routes;
