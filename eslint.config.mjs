// ESLint 新版 Flat Config 配置文件
// 采用 ESM 模块化方案，文件后缀为 .mjs

// 导入全局变量定义，包含预定义的浏览器、Node.js等环境的全局变量
import globals from 'globals'
// 导入 ESLint 官方的 JavaScript 规则插件
import pluginJs from '@eslint/js'
// 导入 TypeScript ESLint 插件，用于 TypeScript 代码的检查
import tseslint from 'typescript-eslint'
// 导入 Vue.js 的 ESLint 插件，用于 Vue 单文件组件的检查
import pluginVue from 'eslint-plugin-vue'
// 导入 Prettier ESLint 插件，用于代码格式化的集成
import pluginPrettier from 'eslint-plugin-prettier'

// 声明配置的类型，使用 ESLint 的类型定义
/** @type {import('eslint').Linter.Config[]} */
export default [
	// 基础文件匹配配置
	{
		// 匹配所有的 JS、TS 和 Vue 文件
		files: ['**/*.{js,mjs,cjs,ts,vue}'],
		languageOptions: {
			// 合并多个环境的全局变量
			globals: {
				...globals.browser, // 浏览器环境的全局变量
				...globals.node, // Node.js 环境的全局变量
				...globals.es2021, // ES2021 特性的全局变量
			},
		},
	},

	// 启用 JavaScript 推荐规则配置
	pluginJs.configs.recommended,

	// 启用 TypeScript 推荐规则配置
	...tseslint.configs.recommended,

	// 启用 Vue3 推荐规则配置（使用新的 flat 格式）
	...pluginVue.configs['flat/recommended'],

	// Vue 文件的专门解析配置
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
	},

	/**
	 * 启用 Prettier 推荐配置，用于代码格式化。
	 *
	 * recommended 配置实际上会启用 'prettier/prettier' 规则,但不会指定具体的 Prettier 选项
	 * 当我们在 rules 中配置 'prettier/prettier' 时,实际上是在覆盖/补充 recommended 中的默认配置
	 *
	 * 所以顺序是：
	 * 1、先加载 pluginPrettier.configs.recommended 启用基础的 Prettier 支持
	 * 2、然后通过自定义规则配置来设置具体的 Prettier 格式化选项
	 */
	pluginPrettier.configs.recommended,

	// 自定义规则配置
	{
		rules: {
			// 配置缩进规则：4个空格，switch语句缩进1级
			// ESLint 的 indent 规则负责检查代码缩进
			// Prettier 也会通过 tabWidth 和 useTabs 来控制缩进格式
			// 删除 indent 规则，让 Prettier 完全控制缩进
			// indent: ['error', 4, { SwitchCase: 1 }],

			// Prettier 格式化配置
			'prettier/prettier': [
				'error',
				{
					printWidth: 120, // 每行代码最大长度
					semi: false, // 不使用分号
					singleQuote: true, // 使用单引号
					tabWidth: 2, // 缩进使用 2 个空格
					useTabs: true, // 使用 tab 进行缩进
					trailingComma: 'es5', // 在 ES5 中有效的结尾逗号（对象，数组等）
					jsxBracketSameLine: false, // JSX 标签的 > 放在最后一行的末尾
					arrowParens: 'avoid', // 当箭头函数仅有一个参数时，省略参数括号
					endOfLine: 'auto', // 自动检测并保持与项目一致的换行符
				},
			],

			// 警告未使用的变量（TypeScript）
			'@typescript-eslint/no-unused-vars': 'warn',

			// 禁止使用嵌套的三目运算符，提高代码可读性
			'no-nested-ternary': 'error',

			// 注释规则配置
			// 要求注释符号 // 后必须跟随至少一个空格
			'spaced-comment': ['error', 'always', { markers: ['/'] }],
			// 要求注释必须独立成行，放在代码上方
			'line-comment-position': ['error', { position: 'above' }],
			// 多行注释必须使用 /** ... */ 风格
			'multiline-comment-style': ['error', 'starred-block'],

			// TypeScript 命名规范配置
			'@typescript-eslint/naming-convention': [
				'error',
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
					// 变量使用小驼峰命名
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
			'@typescript-eslint/no-explicit-any': 'off',

			// 关闭分号检查
			semi: 'off',

			// 允许使用 this 的别名
			'@typescript-eslint/no-this-alias': 'off',

			// 关闭 debugger 语句的限制
			'eslintno-debugger': 'off',

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

	// Vue 文件的特殊规则配置
	{
		files: ['*.vue'],
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
]
