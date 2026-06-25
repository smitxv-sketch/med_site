# Build from repo root: docker build -f apps/cms/Dockerfile .
# Версии react-router v6 и date-fns v2 задаются через overrides в корневом package.json

FROM node:20-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/cms/package.json apps/cms/
COPY packages/contracts/package.json packages/contracts/
# --ignore-scripts: корневой postinstall (dedupe-react) не нужен для CMS-сборки
RUN --mount=type=cache,target=/root/.npm \
    npm install --legacy-peer-deps --ignore-scripts --include=dev \
    --workspace=@med-site/cms \
    --workspace=@med-site/contracts
RUN npm install --legacy-peer-deps --ignore-scripts esbuild

FROM node:20-alpine AS build
# ВАЖНО: админка Strapi должна собираться в production-режиме.
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY apps/cms ./apps/cms
COPY packages/contracts ./packages/contracts
RUN npm run build -w @med-site/contracts && npm run build -w @med-site/cms

FROM node:20-alpine AS runner
# Coolify healthcheck использует wget/curl внутри контейнера
RUN apk add --no-cache wget curl
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/cms ./apps/cms
COPY --from=build /app/packages/contracts ./packages/contracts
COPY package.json package-lock.json ./
WORKDIR /app/apps/cms
EXPOSE 1337
CMD ["npm", "run", "start"]
