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

FROM node:20-alpine AS build
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY apps/cms ./apps/cms
COPY packages/contracts ./packages/contracts
RUN npm run build -w @med-site/contracts && npm run build -w @med-site/cms

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/cms ./apps/cms
COPY --from=build /app/packages/contracts ./packages/contracts
COPY package.json package-lock.json ./
WORKDIR /app/apps/cms
EXPOSE 1337
CMD ["npm", "run", "start"]