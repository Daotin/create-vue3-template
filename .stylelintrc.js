/**
 * Stylelint 配置文件
 * 用于检查 CSS、Less 和 Vue 文件中的样式代码
 *
 * 主要功能：
 * - 检查 Less 语法
 * - 检查 Vue 文件中的样式部分
 * - 自动修复样式问题
 * - 与 VS Code 编辑器集成
 */
module.exports = {
	// 使用的插件
	plugins: ['stylelint-less', 'stylelint-order'],
	// 针对不同文件类型的特定配置
	overrides: [
		{
			// Vue 文件配置
			files: ['**/*.vue'],
			customSyntax: 'postcss-html', // 使用 postcss-html 解析 Vue 文件中的样式
		},
		{
			// Less 文件配置
			files: ['**/*.less'],
			customSyntax: 'postcss-less', // 使用 postcss-less 解析 Less 文件
		},
	],
	// 规则配置
	rules: {
		/**
		 * 基础规则
		 * ------------------------------
		 * 这些规则是必须遵守的基本样式规则
		 */
		'color-no-invalid-hex': true, // 禁止使用无效的十六进制颜色

		/**
		 * 禁用或自定义可能有问题的规则
		 * ------------------------------
		 * 这些规则在某些情况下可能会产生误报或与项目需求冲突
		 */
		// 选择器模式
		'selector-class-pattern': null, // 不限制类名格式，允许使用任何命名方式
		'no-descending-specificity': null, // 允许特异性降序，常见于嵌套选择器
		'font-family-no-missing-generic-family-keyword': null, // 允许字体族名称中缺少通用族关键字

		// Vue 特定规则
		'selector-pseudo-class-no-unknown': [
			true,
			{
				// Vue 中的特殊伪类
				ignorePseudoClasses: ['deep', 'global'],
			},
		],
		'selector-pseudo-element-no-unknown': [
			true,
			{
				// Vue 中的特殊伪元素
				ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
			},
		],

		// 预处理器规则
		'at-rule-no-unknown': [
			true,
			{
				// 忽略特定的 at 规则，支持 Less、SCSS 和 Tailwind
				ignoreAtRules: [
					// Tailwind 指令
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
					// Less/SCSS 指令
					'function',
					'if',
					'each',
					'include',
					'mixin',
					'import',
				],
			},
		],

		// 格式化相关规则
		'rule-empty-line-before': null, // 不强制要求规则前空行
		'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }], // 允许使用小程序单位 rpx
		'keyframes-name-pattern': null, // 不限制关键帧名称格式
		'comment-whitespace-inside': null, // 不强制注释内空格
		'color-function-notation': null, // 不强制颜色函数表示法
		'alpha-value-notation': null, // 不强制透明度值表示法
		'less/no-duplicate-variables': null, // 允许 Less 变量重复定义（适用于变量覆盖）
		'length-zero-no-unit': null, // 允许零长度带单位
		'value-keyword-case': null, // 不强制关键字大小写
		'declaration-empty-line-before': null, // 不强制声明前空行
		'media-feature-range-notation': null, // 不强制媒体查询范围表示法
		'block-no-empty': null, // 允许空块
		'declaration-property-value-no-unknown': null, // 不强制检查未知的属性值
		'no-empty-source': null, // 允许空源文件
		'import-notation': null, // 不强制 @import 表示法
		'no-invalid-position-at-import-rule': null, // 不强制 @import 规则位置
	},
	// 忽略的文件和目录
	ignoreFiles: [
		// 忽略脚本文件
		'**/*.js',
		'**/*.jsx',
		'**/*.tsx',
		'**/*.ts',
		// 忽略构建和依赖目录
		'dist/**/*',
		'node_modules/**/*',
	],
}
