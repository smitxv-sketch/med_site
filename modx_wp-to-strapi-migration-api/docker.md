Coolify Lockfile + Docker System Playbook

Переносимый playbook для проектов на Node.js/Next.js, где деплой идёт через Docker в Coolify.

Цель: убрать класс проблем npm ci/package-lock.json/platform optional deps и сделать сборку предсказуемой.



1) Проблема класса (почему ломается)

Локально на Windows/macOS часто используют один npm, а в Docker (обычно Linux, node:*-alpine) — другой.
Из-за этого:





package-lock.json выглядит валидным локально;



но в Docker npm ci падает (EUSAGE, Missing from lock file, часто @emnapi/* и wasm/native optional deps).

Дополнительно ломает:





скрытый postinstall (например prisma generate) внутри npm ci;



попытка “лечить” это через --omit=optional (может сломать runtime/build зависимости типа lightningcss).



2) Базовый контракт (обязательный)

2.1 Контракт зависимостей





Любое изменение package.json => обязательно пересчёт lock в Linux-окружении.



После пересчёта lock — обязательный docker build smoke.



Без этого PR не merge.

2.2 Контракт Docker install





В Docker использовать npm ci --ignore-scripts.



Lifecycle-скрипты (например Prisma generate) запускать отдельным явным шагом с retry.

2.3 Контракт npm версий





Зафиксировать major npm для команды (например npm 10.x).



Проверки lock делать в том же npm-режиме, что и в Docker.



3) Рекомендуемая структура scripts в package.json

{
  "scripts": {
    "lock:linux": "node scripts/sync-lockfile-linux.mjs",
    "verify:lock": "npm ci --dry-run",
    "test:docker": "tsx scripts/test-docker.ts",
    "predeploy": "tsx scripts/predeploy-check.ts"
  }
}

lock:linux — пересчёт lock внутри Linux-контейнера.
verify:lock — быстрый сигнал, что lock валиден для npm ci.
test:docker — smoke реального Docker build.



4) Dockerfile-паттерн (рекомендуемый)

FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --ignore-scripts

# Явный шаг, не скрытый postinstall:
RUN i=1; until [ "$i" -gt 5 ]; do \
      npx prisma generate && break; \
      [ "$i" -eq 5 ] && exit 1; \
      i=$((i+1)); sleep 5; \
    done

Ключевая идея: npm ci не должен тянуть сетевые/инфра-зависимые операции “втихую”.



5) Процесс PR (операционный ритуал)

Если менялся package.json или build-chain:





npm run lock:linux



проверить diff package-lock.json



npm run test:docker



приложить в PR: краткий output команд и статус

Минимум для merge в main:





type-check green



tests green



docker build smoke green



6) Анти-паттерны (запрещено)





npm install в Docker вместо npm ci (теряется воспроизводимость).



npm ci --omit=optional как “универсальный фикс”.



рассчитывать на “локально работает” без test:docker.



прятать генерацию клиентов/бинарников в postinstall без явного шага в Docker.



7) Диагностика и быстрый triage

Симптом A: Missing ... from lock file в Docker

Действия:





Запустить npm run lock:linux.



Проверить, что lock реально изменился.



Повторить npm run test:docker.

Симптом B: EPERM rename query_engine... на Windows

Действия:





Закрыть процессы, держащие Prisma engine (node, IDE indexing, antivirus lock).



Повторить команду.



Если нестабильно — проверять verify:lock в CI/Linux runner как источник истины.

Симптом C: в Docker падает prisma generate по сети

Действия:





Убедиться, что prisma generate вынесен в отдельный шаг.



Добавить retry (3-5 попыток).



Проверить DNS/egress контейнера до binaries.prisma.sh.



8) Минимум для Coolify

Перед деплоем:





локально/в CI прошли lock:linux и test:docker;



Dockerfile использует npm ci --ignore-scripts;



инфра-зависимые шаги (Prisma generate/migrate) явные и наблюдаемые;



есть короткий rollback план (последний стабильный образ/tag).



9) Чеклист для переноса в новый проект

Скопировать:





этот playbook;



scripts/sync-lockfile-linux.mjs;



scripts/test-docker.ts;



нужные npm scripts в package.json;



Dockerfile-паттерн npm ci --ignore-scripts + explicit generate step.

Добавить в CONTRIBUTING/PR template правило:



“Изменил зависимости — приложи lock:linux + test:docker.”



10) Ожидаемый результат

Если playbook соблюдается, команда перестаёт “лечить симптомы”, и проблемы lockfile становятся:





воспроизводимыми;



ранними (до релиза);



редкими (из-за фиксированного ритуала).

