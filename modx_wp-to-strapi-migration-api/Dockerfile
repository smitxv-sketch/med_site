# Legacy Content Bridge — деплой в Coolify (base_directory: modx_wp-to-strapi-migration-api)

FROM node:22-alpine AS builder

WORKDIR /app

ENV NODE_ENV=development

# better-sqlite3 — нативный модуль, нужны build tools
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3010
ENV HOST=0.0.0.0

RUN apk add --no-cache wget curl

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 bridge && \
    mkdir -p /data && chown bridge:nodejs /data

ENV SQLITE_DB_PATH=/data/sync_settings.db

COPY --from=builder --chown=bridge:nodejs /app/package.json ./package.json
COPY --from=builder --chown=bridge:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=bridge:nodejs /app/dist ./dist
COPY --from=builder --chown=bridge:nodejs /app/server ./server
COPY --from=builder --chown=bridge:nodejs /app/server.ts ./server.ts

USER bridge

EXPOSE 3010

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3010/api/health || exit 1

CMD ["npm", "start"]
