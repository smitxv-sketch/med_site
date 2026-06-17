# Журнал деплоя med_site → Coolify

## Изменения для песочницы (повторить перед экспортом)

### 1. `.npmrc` (новый файл)
```
legacy-peer-deps=true
```

### 2. `server/index.ts`
Заменить:
```ts
const PORT = 3000;
```
На:
```ts
const PORT = Number(process.env.PORT) || 3000;
```

### 3. `nixpacks.toml` (новый файл)
```toml
[phases.setup]
nixPkgs = ["nodejs_20"]

[phases.install]
cmds = ["npm install --legacy-peer-deps"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"

[variables]
NODE_ENV = "production"
```

### 4. Coolify UI
- Domains: `https://istochnik.smitx.ru`
- Env: `NODE_ENV=production`, `PORT=3000`
- Build: Install `npm install --legacy-peer-deps`, Build `npm run build`, Start `npm start`
- Publish Directory: пусто

---

## Лог деплоев

| # | Дата | Действие | Результат |
|---|------|----------|-----------|
| 1 | 2026-06-17 | Добавлены .npmrc, nixpacks.toml, dynamic PORT | pushed |
| 2 | 2026-06-17 | Запуск деплоя через Coolify MCP | TBD |
