# Build from repo root: docker build -f apps/studio/Dockerfile .

FROM node:20-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/studio/package.json apps/studio/
COPY packages/contracts/package.json packages/contracts/
COPY packages/page-engine/package.json packages/page-engine/
RUN --mount=type=cache,target=/root/.npm \
    npm install --legacy-peer-deps --ignore-scripts --include=dev \
    --workspace=@med-site/studio \
    --workspace=@med-site/contracts \
    --workspace=@med-site/page-engine
RUN npm install --legacy-peer-deps --ignore-scripts esbuild

FROM node:20-alpine AS build
ENV NODE_ENV=production
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY apps/studio ./apps/studio
COPY packages/contracts ./packages/contracts
COPY packages/page-engine ./packages/page-engine
COPY src ./src
RUN npm run build -w @med-site/contracts && \
    npm run build -w @med-site/page-engine && \
    npm run build -w @med-site/studio

FROM node:20-alpine AS runner
RUN apk add --no-cache wget curl
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/studio ./apps/studio
COPY --from=build /app/packages/contracts ./packages/contracts
COPY --from=build /app/packages/page-engine ./packages/page-engine
COPY --from=build /app/src ./src
COPY package.json package-lock.json ./
WORKDIR /app/apps/studio
ENV NODE_ENV=production
ENV PORT=3003
ENV HOSTNAME=0.0.0.0
EXPOSE 3003
CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "3003"]
