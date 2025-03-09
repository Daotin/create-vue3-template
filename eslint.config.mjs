/*
 * ESLint 新版 Flat Config 配置文件
 * 采用 ESM 模块化方案，文件后缀为 .mjs
 */

// 导入全局变量定义，包含预定义的浏览器、Node.js等环境的全局变量
import globals from 'globals'
// 导入 ESLint 官方的 JavaScript 规则插件
import pluginJs from '@eslint/js'
// 导入 TypeScript ESLint 插件，用于 TypeScript 代码的检查
import tseslint from 'typescript-eslint'
// 导入 Vue.js 的 ESLint 插件，用于 Vue 单文件组件的检查
import pluginVue from 'eslint-plugin-vue'
/*
 * 导入 Prettier ESLint 插件，用于代码格式化的集成
 * 将Prettier作为ESLint规则运行，并将差异报告为单独的 ESLint 问题。
 */
import pluginPrettier from 'eslint-plugin-prettier'

import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
	// 匹配所有的 JS、TS 和 Vue 文件
	{ files: ['**/*.{js,mjs,cjs,ts,vue}'] },
	// 配置语言选项
	{
		languageOptions: {
			// 合并多个环境的全局变量
			globals: {
				...globals.browser, // 浏览器环境的全局变量
				...globals.node, // Node.js 环境的全局变量
				...globals.es2021, // ES2021 特性的全局变量
			},
		},
	},
	// 使用 ESLint 官方推荐的规则配置
	pluginJs.configs.recommended,
	// 使用 TypeScript ESLint 推荐的规则配置
	...tseslint.configs.recommended,
	/*
	 * 使用 Vue 官方推荐的规则配置
	 * essential 包含了最基本和重要的规则集,主要用于捕获常见错误
	 * recommended 在 essential 的基础上增加了更多代码风格相关的规则
	 */
	...pluginVue.configs['flat/essential'],

	// 配置 Prettier 插件
	{
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			/*
			 * 启用prettier的规则
			 * TODO: 其实可以不需要，因为在保存的时候会使用 .prettierrc.js 的配置进行格式化，跟这里的配置相同，所以不会出现冲突
			 */
			'prettier/prettier': [
				'warn',
				{
					printWidth: 120, // 每行代码最大长度
					semi: false, // 不使用分号
					singleQuote: true, // 使用单引号
					// tabWidth: 4, // 缩进使用4个空格
					useTabs: true, // 使用tab而不是空格
					trailingComma: 'es5', // 在 ES5 中有效的结尾逗号（对象，数组等）
					jsxBracketSameLine: false, // JSX 标签的 > 放在最后一行的末尾
					arrowParens: 'avoid', // 当箭头函数仅有一个参数时，省略参数括号
					endOfLine: 'auto', // 自动检测并保持与项目一致的换行符
				},
			],

			// 警告未使用的变量（TypeScript）
			'@typescript-eslint/no-unused-vars': 'warn',

			// 关闭未定义变量的检查
			'no-undef': 'off',

			// 关闭空块的检查
			'no-empty': 'off',

			// 禁止使用嵌套的三目运算符，提高代码可读性
			'no-nested-ternary': 'warn',

			/*
			 * 注释规则配置
			 * 要求注释符号 // 后必须跟随至少一个空格
			 */
			'spaced-comment': ['warn', 'always', { markers: ['/'] }],
			// 要求注释必须独立成行，放在代码上方
			'line-comment-position': ['warn', { position: 'above' }],
			// 多行注释必须使用 /** ... */ 风格
			'multiline-comment-style': ['warn', 'starred-block'],

			// TypeScript 命名规范配置
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					// 接口名必须以 I 开头，使用大驼峰命名
					selector: 'interface',
					format: ['PascalCase'],
					custom: {
						regex: '^I[A-Z]',
						match: true,
					},
				},
				{
					// 类型别名必须以 T 开头，使用大驼峰命名
					selector: 'typeAlias',
					format: ['PascalCase'],
					custom: {
						regex: '^T[A-Z]',
						match: true,
					},
				},
				{
					// 类名必须使用大驼峰命名
					selector: 'class',
					format: ['PascalCase'],
				},
				{
					// 全局常量使用大驼峰或全大写命名
					selector: 'variable',
					modifiers: ['global', 'const'],
					format: ['PascalCase', 'UPPER_CASE'],
				},
				{
					// 普通变量使用小驼峰命名，特殊情况允许大写
					selector: 'variable',
					format: ['camelCase'],
				},
				{
					// 枚举类型必须以 Enum 开头，使用大驼峰命名
					selector: 'enum',
					format: ['PascalCase'],
					custom: {
						regex: '^Enum[A-Z]',
						match: true,
					},
				},
			],

			// 允许使用 any 类型
			'@typescript-eslint/no-explicit-any': 'warn',

			// 关闭分号检查
			semi: 'off',

			// 允许使用 this 的别名
			'@typescript-eslint/no-this-alias': 'off',

			// 关闭 debugger 语句的限制
			'no-debugger': 'error',

			// 关闭 Vue 模板中未使用变量的警告
			'vue/no-unused-vars': 'off',

			// 允许在模板中使用已声明的变量
			'vue/no-template-shadow': 'off',

			// 关闭 v-for 指令必须使用 key 的限制
			'vue/require-v-for-key': 'off',

			// 允许在 textarea 中使用模板语法
			'vue/no-textarea-mustache': 'off',

			// 允许使用 v-html 指令
			'vue/no-v-html': 'off',

			// 禁用组件名必须多个单词的规则
			'vue/multi-word-component-names': 'off',
		},
	},

	/*
	 * 配置 Vue 文件的解析器选项
	 * TIPS: 顺序很重要，vue的配置会覆盖上面rules的配置
	 */
	{
		files: ['**/*.vue'],
		languageOptions: {
			// 使用 Vue ESLint 解析器作为主解析器
			parser: pluginVue.parser,
			parserOptions: {
				// 使用 TypeScript 解析器解析 <script> 块
				parser: tseslint.parser,
				// 使用最新的 ECMAScript 版本
				ecmaVersion: 'latest',
				// 使用 ESM 模块化方案
				sourceType: 'module',
			},
		},
		rules: {
			// 在 Vue 文件中放宽命名规则限制
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					// 变量和函数名使用小驼峰命名
					selector: ['variable', 'function'],
					format: ['camelCase'],
				},
			],
		},
	},
	// 关闭所有不必要的或可能与Prettier冲突的规则。
	eslintConfigPrettier,

	// 配置要忽略的文件和目录
	{
		ignores: [
			// 构建产物和依赖
			'dist/**',
			'dist-ssr/**',
			'build/**',
			'node_modules/**',
			'coverage/**',

			// 日志文件
			'logs/**',
			'*.log',
			'npm-debug.log*',
			'yarn-debug.log*',
			'yarn-error.log*',
			'pnpm-debug.log*',
			'lerna-debug.log*',

			// 自动生成的文件
			'auto-imports.d.ts',
			'components.d.ts',
			'*.local',
			'*.d.ts',
			'!src/**/*.d.ts',

			// 编辑器和IDE
			'.vscode/*',
			'!.vscode/extensions.json',
			'.idea/**',
			'*.suo',
			'*.ntvs*',
			'*.njsproj',
			'*.sln',
			'*.sw?',

			// 测试相关
			'/cypress/videos/',
			'/cypress/screenshots/',

			// 配置文件
			'*.config.js',
			'vite.config.ts',
			'vitest.config.ts',
			// 不要忽略本文件，否则配置无效
			'!eslint.config.mjs',

			// 文档和资源
			'*.md',
			'/public/**',
			'/docs/**',
			'.husky/**',
			'/bin/**',
			'Dockerfile',

			// 其他系统文件
			'.DS_Store',
			'.local',

			// 压缩和临时文件
			'*.min.js',
			'*.temp',
		],
	},
]
