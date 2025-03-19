# 前端框架模板 Vite+Vue3

> 配套说明文档：https://daotin.github.io/fe-series-notes

## 功能 TODO

<details>
<summary>脚手架</summary>

- [x] 开发工具推荐
- [x] 创建项目
- [x] 目录结构
- [x] vite 工程化配置
  - [ ] gzip
- [x] 代码规范
  - [ ] VSCode 常用扩展
  - [x] 代码格式化 Prettier
  - [ ] 语法校验 ESlint
  - [ ] css 代码检测--stylelint
- [x] git 提交规范
- [x] 引入 ElementPlus 组件库
- [x] 引入 TailWindCSS
- [x] 配置 vue-router
  - [x] 基础配置
  - [x] meta 定义
  - [ ] keepalive 支持
  - [ ] 面包屑
  - [x] token 鉴权
  - [x] SSO 支持
- [x] 配置 Pinia
- [x] 封装 axios
  - [x] 基础配置
  - [x] token 附加头部
  - [x] 响应错误处理
  - ~~[ ] 取消请求~~
  - [ ] 加密加签
- [x] 配置 mock
- [ ] 配置数据类型 model
  - [ ] 通用 model
    - [ ] IQuerys, IQuerysBody, IRowData，IRowInfo
    - [ ] 查询条件 IQuery
    - [ ] 业务枚举 IEnumModel
- [x] 静态资源管理
  - [ ] 样式
    - [x] reset/variable/less 基础样式
    - [x] tailwindCSS/WindiCSS
    - [x] Element Plus UI 组件库
    - [ ] TailwindCSS 配置兼容 UI 组件库
    - [ ] polyfill 垫片—兼容旧版本浏览器
  - [x] svg
    - [x] svg-icon
  - [ ] 图片
- [x] 界面布局 layouts
- [x] 配置环境变量
- [x] 权限控制
- [ ] 国际化 i18n
- [ ] 工具库
  - [ ] 常用正则表达式（手机号，邮箱，身份证）
  - [ ] 函数库
    - [ ] 文件上传
    - [ ] 文件下载
  - [ ] 枚举定义 `enum.ts`
  - [x] message 封装
  - [x] storage 封装
  - [ ] 自定义指令
    - [x] `v-auth`
  - [ ] 常量
    - [ ] Token
    - [ ] BaseUrl
    - [ ] imageUrl
    - [ ] WssUrl

</details>

<details>
<summary>组件</summary>

- [x] 基础 UI 组件 base
  - [ ] 空状态：BaseEmpty
  - [ ] 标题 title
  - [ ] 返回按钮
  - [ ] 带 toolTip 的按钮：BaseTipButton
  - [ ] 基础弹框：BaseDialog
  - [ ] 基础侧边栏：BaseDrawer
  - [ ] 基础 icon：BaseIcon
  - [ ] 基础 Switch：BaseSwitch
  - [ ] 基础 Tag：BaseTag
  - [ ] 超出换行：BaseOverflow
  - [ ] ...
- [ ] 业务容器组件 bussiness
  - [ ] 搜索表单 searchForm
  - [ ] 数据表格 dataTable
  - [ ] 机构树
  - [ ] 图片上传
  - [ ] ...

</details>

<details>
<summary>业务模块</summary>

> 参考其他组件库：https://vben.vvbin.cn/#/dashboard/analysis

- [x] 登录注册
- [ ] 首页
  - [ ] 个人信息
  - [ ] changelog
  - [ ] 卡片
  - [ ] 柱状图
  - [ ] 饼图
  - [ ] 折线图
- [ ] 打印
- [ ] 下载 PDF
- [ ] 导入/导出 Excel
- [ ] 富文本编辑器
- [ ] markdown 编辑器
- [x] 项目用到的 svg 预览界面：`iconPreview.vue`

</details>

<details>
<summary>其他</summary>

- [ ] WIKI 文档
  - [x] 基础实现过程
    - [ ] 组件封装
    - [ ] use 函数库
  - [ ] UI 设计规范
  - [ ] Git 版本控制

</details>

## 使用

#### 安装依赖

```
pnpm install
```

#### 运行

```
pnpm run dev
```

关于执行指令的说明：

```json
"scripts": {
		"dev": "vite",
    /**
    1、run-p 是 npm-run-all 包提供的一个命令，用于并行执行多个 npm 脚本，如果type-check失败，不会阻止vite build
    2、type-check是一个用于在 Vue.js 项目中执行 TypeScript 类型检查的命令，它不会生成任何实际的编译输出文件，只进行类型检查。比如类型不匹配，属性不存在等
    3、vue-tsc --noEmit 默认会使用项目根目录下的 tsconfig.json 文件进行类型检查。
    4、如果想要在类型检查失败，构建命令不执行，可以改成run-s（串联），或者 npm run type-check && vite build
    */
		"build": "run-p type-check build-only",
		"build-only": "vite build",
		"prepare": "husky install",
		"type-check": "vue-tsc --noEmit",
		"changelog": "conventional-changelog -p custom-config -i CHANGELOG.md -s -r 0  -n ./changelog.config.js",

    /**
      运行后，对暂存区内容进行eslint和stylelint校验。校验配置如下：
        "lint-staged": {
            "*.{vue,ts,tsx,js,jsx,json}": [
              "eslint --cache --quiet"
            ],
            "*.{css,less,vue}": [
              "stylelint --cache --quiet"
            ]
          }
    */
		"lint-staged": "lint-staged",


    /**
      对整个项目进行eslint校验，但是不自动修复
    */
		"lint": "eslint --cache --cache-location node_modules/.cache/.eslintcache --ext .vue,.ts,.tsx,.js,.jsx,.json --quiet src/",
    /**
      对整个项目进行eslint校验，自动修复可以修复的。
    */
		"lint:fix": "eslint --cache --cache-location node_modules/.cache/.eslintcache --ext .vue,.ts,.tsx,.js,.jsx,.json --quiet src/ --fix",

    /**
      对整个项目进行stylelint校验，但是不自动修复
    */
		"stylelint": "stylelint \"src/**/*.{css,less,vue}\" --cache --cache-location node_modules/.cache/.stylelintcache",

    /**
      对整个项目进行stylelint校验，但是不自动修复
    */
    "stylelint:fix": "stylelint \"src/**/*.{css,less,vue}\" --cache --cache-location node_modules/.cache/.stylelintcache --fix"
	},
```

#### 构建

```
pnpm run build
```
