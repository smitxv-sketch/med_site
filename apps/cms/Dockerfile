# Build from repo root: docker build -f apps/cms/Dockerfile .

FROM node:20-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/cms/package.json apps/cms/
COPY packages/contracts/package.json packages/contracts/
RUN npm install --legacy-peer-deps --include=dev \
    --workspace=@med-site/cms \
    --workspace=@med-site/contracts
RUN npm install --legacy-peer-deps esbuild
# Корневой date-fns@4 (зависимость основного сайта) ломает Vite-сборку Strapi admin
RUN rm -rf node_modules/date-fns \
    && npm install date-fns@2.30.0 --legacy-peer-deps --no-save
# Корневой react-router-dom@7 ломает Redux store в Strapi admin (нужен v6)
RUN rm -rf node_modules/react-router node_modules/react-router-dom \
    && npm install react-router-dom@6.30.4 --legacy-peer-deps --no-save

# Переиспользуем deps-слой (apk уже установлен) — меньше RAM при сборке на Coolify
FROM deps AS build
# Coolify может прокинуть NODE_ENV=production на buildtime — явно включаем dev для tsc/strapi build
ENV NODE_ENV=development
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
