import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import compression from 'vite-plugin-compression'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// Element Plus按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// 引入 unplugin-icons
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// 生产svg精灵图
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import path from 'path'
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
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // 控制生产环境是否显示更详细的 SSR Hydration 不匹配信息。
		},
		build: {
			target: 'es2015',
			minify: 'esbuild',
			esbuild: {
				drop: ['console', 'debugger'],
			},
			assetsInlineLimit: 4096, // 小于4kb的图片会被转为base64
			cssCodeSplit: true, // 启用CSS代码拆分
			cssMinify: true, // 压缩CSS
			sourcemap: false, // 不生成sourcemap
			reportCompressedSize: false, // 禁用压缩大小报告
			chunkSizeWarningLimit: 500, // 提高警告门槛到500kb
			rollupOptions: {
				output: {
					// 分类输出
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					// 将小于 30kb 的包合并
					minifyInternalExports: true,
					// 确保小包被合并
					experimentalMinChunkSize: 30000, // 30kb
					// 代码分割
					manualChunks(id, { getModuleInfo }) {
						// 获取模块信息
						const moduleInfo = getModuleInfo(id)
						if (!moduleInfo) return

						// 将 node_modules 中的代码单独打包
						if (id.includes('node_modules')) {
							// element-plus 相关打包
							if (id.includes('element-plus')) {
								return 'element-plus'
							}
							if (id.includes('@element-plus')) {
								return 'element-plus-icons'
							}
							// echarts 相关打包
							if (id.includes('echarts') || id.includes('zrender')) {
								return 'echarts'
							}
							// lodash 单独打包
							if (id.includes('lodash-es')) {
								return 'lodash'
							}
							// vue 相关打包
							if (id.includes('vue') || id.includes('@vue')) {
								return 'vue-vendor'
							}
							// 状态管理相关打包
							if (id.includes('pinia') || id.includes('vuex')) {
								return 'store-vendor'
							}
							// 工具库打包
							if (id.includes('@vueuse') || id.includes('axios')) {
								return 'utils-vendor'
							}
							// 剩余 node_modules 打包
							return 'vendor'
						}

						// 将小模块合并到它们的引用者中
						const importers = moduleInfo.importers
						if (importers && importers.length === 1) {
							const importer = importers[0]
							const importerInfo = getModuleInfo(importer)
							if (importerInfo && !importerInfo.isEntry) {
								return null // 返回 null 使其合并到引用者的chunk中
							}
						}

						// 将所有 Components 组件库集中打包
						if (id.includes('src/components')) {
							return 'components'
						}
						// 将所有 Utils 工具库集中打包
						if (id.includes('src/utils')) {
							return 'utils'
						}
					}
				}
			}
		},
		plugins: [
			vue(),
			vueJsx(),
			// 图片压缩
			ViteImageOptimizer({
				test: /\.(jpe?g|png|gif|webp|svg)$/i,
				include: undefined,
				exclude: undefined,
				includePublic: true,
				logStats: true,
				ansiColors: true,
				svg: {
					multipass: true,
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									cleanupNumericValues: false,
									removeViewBox: false, // 不删除 viewBox 属性
								},
								cleanupIDs: false,
							},
						},
						'sortAttrs',
						{
							name: 'addAttributesToSVGElement',
							params: {
								attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
							},
						},
					],
				},
				png: {
					// 无损压缩
					quality: 100,
				},
				jpeg: {
					quality: 90,
				},
				jpg: {
					quality: 90,
				},
				webp: {
					lossless: true,
					quality: 100,
				},
				cache: false, // 禁用缓存
			}),
			// Brotli 压缩
			compression({
				algorithm: 'brotliCompress',
				ext: '.br',
				threshold: 10240, // 10kb以上的文件进行压缩
				deleteOriginFile: false,
			}),
			AutoImport({
				// 定义自动导入的模块
				imports: ['vue', 'vue-router', 'pinia'],
				// // 处理eslint
				// eslintrc: {
				// 	enabled: true,
				// 	filepath: '.eslintrc-auto-import.json',
				// 	globalsPropValue: true,
				// },
				resolvers: [
					ElementPlusResolver(),
					// 自动导入图标组件
					IconsResolver({
						prefix: 'Icon',
					}),
				],
				// 生成auto-imports.d.ts 文件，位置在 src/types/auto-imports.d.ts
				dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url)),
			}),
			Components({
				// 生成components.d.ts 文件，位置在 src/types/components.d.ts
				dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url)),
				resolvers: [
					// 自动注册图标组件
					IconsResolver({
						/**
             * ep: Element Plus 图标
                mdi: Material Design 图标
                carbon: Carbon 图标
                ant-design: Ant Design 图标
                fa: Font Awesome 图标
             */
						enabledCollections: ['ep'], // 启用element-plus图标集
						prefix: 'icon',
					}),
					...(mode !== 'development' ? [ElementPlusResolver()] : []),
				],
			}),
			// 添加 Icons 插件
			Icons({
				autoInstall: true,
				// compiler: 'vue3',
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
		test: {
			// 启用类似 jest 的全局测试 API
			globals: true,
			// 使用 jsdom 环境
			environment: 'jsdom',
			// 支持tsx组件
			transformMode: {
				web: [/.[tj]sx$/],
			},
			// 配置测试覆盖率
			coverage: {
				provider: 'v8',
				reporter: ['text', 'json', 'html'],
				exclude: [
					'node_modules/',
					'dist/',
					'**/*.d.ts',
					'**/*.test.{js,ts}',
					'**/*.spec.{js,ts}',
					'**/*.config.{js,ts}',
				],
			},
			// 修改测试文件匹配模式
			include: ['__tests__/**/*.test.ts'],
			exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
			// 设置测试环境的根目录
			root: '.',
			// 添加路径别名配置
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
	}
})
