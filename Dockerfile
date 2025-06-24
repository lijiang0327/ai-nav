# 第一阶段：仅安装生产依赖
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev  # 只安装生产依赖

# 第二阶段：构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 第三阶段：运行
FROM node:20-alpine AS runner
COPY --from=builder /app/.next ./.next
CMD ["npm", "start"]
EXPOSE 3000
