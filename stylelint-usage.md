# Stylelint 在 Vue3 项目中的配置与使用

本文档详细介绍了如何在 Vue3 项目中配置和使用 Stylelint 来检查 Less 样式代码，特别是针对 `.vue` 文件中的样式部分。

## 目录

- [简介](#简介)
- [安装步骤](#安装步骤)
- [配置文件详解](#配置文件详解)
- [VS Code 集成](#vs-code-集成)
- [使用方法](#使用方法)
- [常见问题排查](#常见问题排查)

## 简介

Stylelint 是一个强大的 CSS 代码检查工具，可以帮助你避免错误并强制执行代码规范。在本项目中，我们使用 Stylelint 来检查：

- `.less` 文件中的样式代码
- `.vue` 文件中的 `<style>` 部分（支持 Less 语法）

通过 Stylelint，我们可以：

- 捕获样式中的错误和风格问题
- 确保团队样式代码的一致性
- 自动修复部分样式问题
- 与编辑器集成，实现实时提示

## 安装步骤

### 1. 安装必要的依赖

```bash
pnpm add -D stylelint stylelint-less stylelint-order postcss-html postcss-less
```

这些依赖的作用：

- `stylelint`: 核心检查工具
- `stylelint-less`: Less 语法支持
- `stylelint-order`: CSS 属性排序插件
- `postcss-html`: 解析 Vue 文件中的样式
- `postcss-less`: 解析 Less 语法

### 2. 安装 VS Code 插件（可选但推荐）

为了在编辑器中获得实时反馈，建议安装 VS Code 的 Stylelint 插件：

1. 打开 VS Code
2. 转到扩展视图 (Ctrl+Shift+X)
3. 搜索 "Stylelint"
4. 安装由 Stylelint 提供的插件

### 3. 创建配置文件

在项目根目录创建 `.stylelintrc.js` 文件：

```js
module.exports = {
	plugins: ['stylelint-less', 'stylelint-order'],
	overrides: [
		{
			files: ['**/*.vue'],
			customSyntax: 'postcss-html',
		},
		{
			files: ['**/*.less'],
			customSyntax: 'postcss-less',
		},
	],
	rules: {
		// 基础规则
		'color-no-invalid-hex': true,

		// 其他规则配置...
	},
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', 'dist/**/*', 'node_modules/**/*'],
}
```

### 4. 在 package.json 中添加脚本

```json
"scripts": {
  "stylelint": "stylelint \"src/**/*.{css,less,vue}\" --cache",
  "stylelint:fix": "stylelint \"src/**/*.{css,less,vue}\" --cache --fix"
}
```

### 5. 配置 VS Code 设置（可选）

在项目根目录创建或修改 `.vscode/settings.json` 文件：

```json
{
	"stylelint.validate": ["css", "less", "vue"],
	"editor.codeActionsOnSave": {
		"source.fixAll.stylelint": true
	},
	"css.validate": false,
	"less.validate": false
}
```

### 6. 添加 .stylelintcache 到 .gitignore

```
# Stylelint cache
.stylelintcache
```

## 配置文件详解

`.stylelintrc.js` 文件是 Stylelint 的核心配置，下面详细解释各部分：

```js
module.exports = {
	// 插件配置
	plugins: [
		'stylelint-less', // 支持 Less 语法
		'stylelint-order', // 支持 CSS 属性排序
	],

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
		// 基础规则
		'color-no-invalid-hex': true, // 禁止使用无效的十六进制颜色

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

		// Less/SCSS 支持
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
					'function',
					'if',
					'each',
					'include',
					'mixin',
					'import',
				],
			},
		],

		// 其他规则...
	},

	// 忽略文件
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', 'dist/**/*', 'node_modules/**/*'],
}
```

## VS Code 集成

通过 VS Code 的 Stylelint 插件和项目配置，你可以获得以下功能：

1. **实时提示**：编辑样式代码时，错误和警告会直接在编辑器中显示
2. **保存时自动修复**：配置了 `editor.codeActionsOnSave` 后，保存文件时会自动修复可修复的问题
3. **禁用内置检查**：设置 `css.validate` 和 `less.validate` 为 `false` 可以避免 VS Code 内置检查与 Stylelint 的冲突

## 使用方法

### 命令行检查

要检查项目中的样式文件，运行：

```bash
pnpm stylelint
```

### 自动修复

要自动修复可修复的问题，运行：

```bash
pnpm stylelint:fix
```

### 编辑器中使用

安装并配置好 VS Code Stylelint 插件后：

1. 错误和警告会在编辑器中以波浪线标记
2. 鼠标悬停在标记上可以查看详细信息
3. 保存文件时会自动修复可修复的问题（如已配置）
4. 可以使用快速修复功能（Ctrl+.）来修复单个问题

## 常见问题排查

### 1. Vue 文件中的样式无法识别

确保：

- 安装了 `postcss-html` 依赖
- 配置了正确的 `overrides` 设置
- 检查 Vue 文件中的 `<style>` 标签是否正确

### 2. Less 语法无法识别

确保：

- 安装了 `postcss-less` 和 `stylelint-less` 依赖
- 配置了正确的 `overrides` 设置
- 检查 Less 文件是否有语法错误

### 3. 某些规则过于严格

可以通过修改 `.stylelintrc.js` 文件中的 `rules` 部分来禁用或自定义特定规则：

```js
rules: {
  // 禁用规则
  'rule-name': null,

  // 自定义规则
  'another-rule': [true, { /* 选项 */ }]
}
```

### 4. 自动修复未生效

检查：

- 运行的是否是 `stylelint:fix` 命令
- VS Code 设置中 `editor.codeActionsOnSave` 是否正确配置
- 问题是否属于可自动修复的类型（并非所有问题都可自动修复）

---

如有更多问题，请参考 [Stylelint 官方文档](https://stylelint.io/)。
