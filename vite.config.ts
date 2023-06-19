import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
//npm i -D unplugin-icons 下载这个依赖，然后导入下面两个文件，记得还得下载icon的依赖包
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
export default defineConfig({
  server: {
    port: 5033,
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // 配置自动加载图标代码
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        // 配置自动加载图标代码
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver(),
      ],
    }),
    // 配置自动加载图标代码
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  envPrefix: "ENV_", //配置vite注入客户端的环境变量校验env的前缀
});
