import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
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
/**
 * path.resolve：解析一系列的路径成绝对路径
 * 示例：从 右向左 依次拼接。直到遇到第一个绝对路径形式的 path 才停止. 比如 path.resolve('/foo', '/bar', 'baz').
 * 从右向左一次解析，第一次遇到的绝对路径为 '/bar' ，所以不再继续向左拼接，及最终结果为 '/bar' + '/' + 'baz' = '/bar/baz'
 * @param dir
 * @returns
 * 问题：process.cwd() vs __dirname
 * process.cwd() 返回调用node命令的目录。__dirname 返回当前运行文件所在的目录。
 * 参考文档：https://stackoverflow.com/questions/9874382/whats-the-difference-between-process-cwd-vs-dirname
 */
const resolve = (dir: string) => path.resolve(process.cwd(), dir)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	return {
		define: {
			'process.env': { ...process.env, ...env },
		},
		plugins: [
			vue(),
			vueJsx(),
			AutoImport({
				imports: ['vue'], // 自动导入vue3 API
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				// 生成components.d.ts 文件
				dts: true, // 生成组件类型文件
				resolvers: mode !== 'development' ? ElementPlusResolver() : undefined,
			}),
			// 开发环境完整引入element-plus
			{
				name: 'dev-auto-import',
				transform(code, id) {
					if (mode === 'development' && /src\/main.ts$/.test(id)) {
						return {
							code: `${code};import ElementPlus from 'element-plus';import 'element-plus/dist/index.css';app.use(ElementPlus);import './mocks'`,
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
				// '@': resolve('./src'),
			},
		},
		server: {
			host: true, // 是否开启host
			port: 5173,
			proxy: {
				'/api': {
					target: env.VITE_PROXY_URL,
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ''),
				},
			},
		},
	}
})
