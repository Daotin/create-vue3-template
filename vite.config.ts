import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// Element Plus按需引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log("⭐mode==>", mode);
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // 生产环境按需导入
        resolvers: mode !== "development" ? ElementPlusResolver() : undefined,
      }),
      // 开发环境完整引入element-plus
      {
        name: "dev-auto-import",
        transform(code, id) {
          if (mode === "development" && /src\/main.ts$/.test(id)) {
            return {
              code: code.replace(
                `app.mount("#app")`,
                `import ElementPlus from 'element-plus';import 'element-plus/dist/index.css';app.use(ElementPlus);app.mount("#app")`
              ),
              map: null,
            };
          }
        },
      },
      // 解决ElementPlus非标签元素丢失样式的问题
      ElementPlus(),
    ],
    resolve: {
      alias: {
        // fileURLToPath:函数确保百分比编码字符的正确解码，并确保跨平台的有效绝对路径字符串。
        // URL:如果url参数是相对 URL，则构造函数将使用url参数和可选的base参数作为基础
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
