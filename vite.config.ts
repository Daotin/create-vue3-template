import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// Element Plus按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// 生产svg精灵图
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const path = require('path')
const resolve = (dir: string) => path.resolve(process.cwd(), dir)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	console.log('⭐mode==>', mode)
	return {
		plugins: [
			vue(),
			vueJsx(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				// 生成components.d.ts 文件
				dts: true,
				resolvers: [
					// 生产环境按需导入
					ElementPlusResolver(),
				],
			}),
			// 开发环境完整引入element-plus
			{
				name: 'dev-auto-import',
				transform(code, id) {
					if (mode === 'development' && /src\/main.ts$/.test(id)) {
						return {
							code: code.replace(
								`app.mount("#app")`,
								`import ElementPlus from 'element-plus';
                 import 'element-plus/dist/index.css';
                 import './mocks';
                 app.use(ElementPlus);
                 app.mount("#app")`
							),
							map: null,
						}
					}
				},
			},
			// 解决ElementPlus非标签元素丢失样式的问题
			ElementPlus(),
			// 生产svg精灵图
			createSvgIconsPlugin({
				// 配置路劲在你的src里的svg存放文件
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				symbolId: 'icon-[dir]-[name]',
			}),
		],
		// 设置全局可以使用的less文件
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
					modifyVars: {},
					additionalData: `@import "src/assets/styles/variable.less";`,
				},
			},
		},
		resolve: {
			alias: {
				// fileURLToPath:函数确保百分比编码字符的正确解码，并确保跨平台的有效绝对路径字符串。
				// URL:如果url参数是相对 URL，则构造函数将使用url参数和可选的base参数作为基础
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	}
})
