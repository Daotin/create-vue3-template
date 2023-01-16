# 前端框架 Vite+Vue3

## 功能 TODO

<details open>
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

<details open>
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

<details open>
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
- [ ]

</details>

<details open>
<summary>其他</summary>

- [ ] WIKI 文档
  - [x] 基础实现过程
    - [ ] 组件封装
    - [ ] use 函数库
  - [ ] UI 设计规范
  - [ ] Git 版本控制
  - [ ]

</details>

## 使用

#### 安装依赖

```
npm install // yarn
```

#### 运行

```
npm run dev // yarn dev
```

#### 构建

```
npm run build // yarn build
```
