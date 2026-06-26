# Build from repo root: docker build -f apps/platform/Dockerfile .
# site-ci: BFF + Next.js без Nixpacks (стабильная сборка на Coolify)

FROM node:22-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/
COPY apps/bff/package.json apps/bff/
COPY packages/contracts/package.json packages/contracts/
COPY packages/page-engine/package.json packages/page-engine/
RUN --mount=type=cache,target=/root/.npm \
    npm install --legacy-peer-deps --ignore-scripts --include=dev

FROM node:22-alpine AS build
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY apps/web ./apps/web
COPY apps/bff ./apps/bff
COPY apps/bff/config ./apps/bff/config
COPY packages/contracts ./packages/contracts
COPY packages/page-engine ./packages/page-engine
COPY src ./src
COPY scripts/dedupe-react.mjs scripts/dedupe-react.mjs
COPY scripts/start-platform.mjs scripts/start-platform.mjs
RUN node scripts/dedupe-react.mjs
RUN npm run build -w @med-site/contracts && \
    npm run build -w @med-site/page-engine && \
    npm run build -w @med-site/bff && \
    npm run build -w @med-site/web

FROM node:22-alpine AS runner
RUN apk add --no-cache wget curl
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV BFF_PORT=3001
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/apps/bff ./apps/bff
COPY --from=build /app/apps/bff/config ./apps/bff/config
COPY --from=build /app/apps/web ./apps/web
COPY --from=build /app/packages/contracts ./packages/contracts
COPY --from=build /app/packages/page-engine ./packages/page-engine
COPY --from=build /app/scripts/start-platform.mjs ./scripts/start-platform.mjs
EXPOSE 3000
CMD ["node", "scripts/start-platform.mjs"]
