# 使用 Node.js 12 作为基础镜像
FROM node:16.18.1 AS builder

# 将工作目录设置为 /app
WORKDIR /app

# 将整个应用程序复制到镜像中
COPY . .

# 安装依赖
RUN npm install

# 构建应用程序
RUN npm run build-only

# 使用 Nginx 作为基础镜像
FROM nginx:latest

# 将 Nginx 配置文件复制到镜像中
COPY nginx.conf /etc/nginx/nginx.conf

# 将构建好的应用程序复制到 Nginx 的默认站点目录中
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
