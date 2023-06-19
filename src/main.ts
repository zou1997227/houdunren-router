import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import router, { setupRouter } from "./router";
import "element-plus/dist/index.css";
import "./assets/style.css";
// 导入pinia
import { createPinia } from "pinia";
// 导入pinia持久性依赖插件
import piniaPluginPersist from "pinia-plugin-persist";
// 导入发布订阅者依赖
import mitt from "mitt";

const app = createApp(App);

const Mit = mitt();
// 下面代码会有配型推断和属性提示
declare module "vue" {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit;
  }
}
app.config.globalProperties.$Bus = Mit;
// 挂载pinia和pinia持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.use(pinia);
// vite获取环境变量
const key = import.meta.env.ENV_KEY;
console.log(key, "env.key-----");
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component);
// }
// App.use(router)
setupRouter(app);
app.mount("#app");
