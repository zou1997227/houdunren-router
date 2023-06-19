import { App } from "vue";
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./module/routes";
const router = createRouter({
  // hash模式
  history: createWebHashHistory(),
  // history模式   使用live serve插件运行打包文件时，会报错，找不到文件路径
  // history: createWebHistory(),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;
