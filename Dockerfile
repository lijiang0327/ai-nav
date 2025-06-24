# 使用官方 Node.js 镜像（选择合适版本，如 18-alpine）
FROM node:20.19-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（或 yarn.lock）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建 Next.js 项目（生产环境）
RUN npm run build

# 运行 Next.js
CMD ["npm", "start"]

# 暴露端口（Next.js 默认 3000）
EXPOSE 3000
