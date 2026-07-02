#!/usr/bin/env node
/**
 * Инвентаризация section.val из QMS getPr (ЧЛБ + СПб).
 *
 * Источники (по приоритету):
 *   1. Bridge GET /api/qms/pricelist?city=… (с IP сервера Coolify)
 *   2. Прямой getPr (если IP в whitelist)
 *   3. Публичный json.html с сайта (СПб: cispb.com/price_update/json.html)
 *   4. Локальный дамп qms_price/.../json.html
 *
 *   node scripts/qms-fetch-pricelist.mjs --write-docs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadEnvFile(relPath) {
  const envPath = path.join(ROOT, relPath);
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile('infra/env/qms-price.env');
loadEnvFile('infra/env/legacy-bridge-istochnik.env');

const OUT_JSON = path.join(ROOT, 'docs', 'mappings', 'qms-sections-raw.json');
const OUT_MD = path.join(ROOT, 'docs', 'mappings', 'qms-sections-inventory.md');

const SITE_TABS = [
  { id: 'consultation', label: 'Приём врачей' },
  { id: 'diagnostics', label: 'Диагностика' },
  { id: 'programs', label: 'Комплексные программы' },
  { id: 'treatment', label: 'Лечение' },
];

const PUBLIC_DUMPS = {
  spb: 'https://cispb.com/price_update/json.html',
};

const LOCAL_DUMPS = {
  spb: path.join(ROOT, 'qms_price', 'spb', 'json.html'),
  chel: null,
};

async function fetchGetPr(url, apikey, qqc244) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apikey, unauthorized: 1, qqc244 }),
    signal: AbortSignal.timeout(60_000),
  });
  if (!res.ok) throw new Error(`${url} HTTP ${res.status} org=${qqc244}`);
  const data = await res.json();
  if (!data?.data?.sections) {
    throw new Error(`Нет data.sections org=${qqc244}`);
  }
  return data.data.sections;
}

/** ci74 proxy-spb.php / proxy.php?endpoint=getPr */
async function fetchViaSiteProxy(proxyBase, apikey, qqc244) {
  let url = proxyBase.replace(/\/$/, '');
  if (!url.includes('endpoint=')) {
    url += `${url.includes('?') ? '&' : '?'}endpoint=getPr`;
  }
  return fetchGetPr(url, apikey, qqc244);
}

function parseJsonDump(raw) {
  const stripped = raw.replace(/^[\s\S]*?<pre[^>]*>/i, '').replace(/<\/pre>[\s\S]*$/i, '').trim();
  const data = JSON.parse(stripped);
  if (!data?.data?.sections) throw new Error('Дамп: нет data.sections');
  return data.data.sections;
}

async function loadDumpFromFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return parseJsonDump(raw);
}

async function loadDumpFromUrl(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`URL ${url} HTTP ${res.status}`);
  return parseJsonDump(await res.text());
}

async function fetchViaBridge(city) {
  const base = (process.env.BRIDGE_URL || 'https://bridge.istochnik.smitx.ru').replace(/\/$/, '');
  const token = process.env.BRIDGE_API_TOKEN;
  if (!token) throw new Error('BRIDGE_API_TOKEN не задан');

  const res = await fetch(`${base}/api/qms/pricelist?city=${city}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(`Bridge HTTP ${res.status}: ${t.slice(0, 200)}`);
  }
  const text = await res.text();
  if (text.trimStart().startsWith('<')) {
    throw new Error('Bridge вернул HTML (эндпоинт /api/qms/pricelist ещё не задеплоен?)');
  }
  const body = JSON.parse(text);
  return body.data?.orgs ?? [];
}

function normalizeSections(sections, sourceLabel) {
  return sections.map((sec, index) => {
    const rows = sec.rows ?? [];
    return {
      source: sourceLabel,
      index,
      val: String(sec.val ?? '').trim(),
      rowCount: rows.length,
      sampleArticles: rows.slice(0, 3).map((r) => String(r.Duv ?? '')),
      sampleTitles: rows.slice(0, 2).map((r) => String(r.u ?? '').slice(0, 80)),
    };
  });
}

function suggestTab(sectionVal) {
  const v = sectionVal.toLowerCase();
  if (/программ|check-up|диспансер|комплекс|ведение беремен/i.test(v)) return 'programs';
  if (/диагност|узи|рентген|анализ|исследован|лабор|эндоскоп|кт|мрт|функциональн|гематолог|биохим|иммунохим/i.test(v)) return 'diagnostics';
  if (/лечен|процедур|вакцин|операц|манипуляц|физиотерап|массаж|инъекц|хирург/i.test(v)) return 'treatment';
  if (/приём|прием|консультац|врач|осмотр|первичн|консультативн/i.test(v)) return 'consultation';
  return 'review';
}

function tabLabel(id) {
  if (id === 'review') return '⚠️ уточнить вручную';
  return SITE_TABS.find((t) => t.id === id)?.label ?? id;
}

function cityConfig(city) {
  if (city === 'chel') {
    return {
      city: 'chel',
      label: 'Челябинск',
      orgs: [
        { id: process.env.QMS_CHEL_ORG_MAIN, label: 'Основная поликлиника', key: 'main', source: 'chel-main' },
        { id: process.env.QMS_CHEL_ORG_EKO, label: 'ЭкоКлиника', key: 'eko', source: 'chel-eko' },
      ],
      url: process.env.QMS_CHEL_API_URL,
      apikey: process.env.QMS_CHEL_API_KEY,
    };
  }
  return {
    city: 'spb',
    label: 'Санкт-Петербург',
    orgs: [{ id: process.env.QMS_SPB_ORG, label: 'Клиника Источник СПб', key: 'main', source: 'spb' }],
    url: process.env.QMS_SPB_API_URL,
    apikey: process.env.QMS_SPB_API_KEY,
  };
}

async function loadCity(city) {
  const cfg = cityConfig(city);
  const sources = [];
  const orgResults = [];

  // 1) Bridge
  try {
    const bridgeOrgs = await fetchViaBridge(city);
    for (const o of bridgeOrgs) {
      orgResults.push({
        id: o.org,
        label: o.label,
        sections: normalizeSections(o.sections, o.sourceKey),
      });
    }
    sources.push('bridge');
  } catch (e) {
    console.warn(`[${city}] bridge:`, e.message);
  }

  // 2) Прокси на хостинге (СПб: ci74.ru/booking/php/proxy-spb.php)
  const siteProxy =
    city === 'spb'
      ? process.env.QMS_SPB_SITE_PROXY_URL
      : process.env.QMS_CHEL_SITE_PROXY_URL;
  if (!orgResults.length && siteProxy && cfg.apikey) {
    for (const org of cfg.orgs) {
      if (!org.id || orgResults.some((r) => r.id === org.id)) continue;
      try {
        const sections = await fetchViaSiteProxy(siteProxy, cfg.apikey, org.id);
        orgResults.push({ id: org.id, label: org.label, sections: normalizeSections(sections, org.source) });
        sources.push(`site-proxy:${org.key}`);
      } catch (e) {
        console.warn(`[${city}] site-proxy ${org.key}:`, e.message);
      }
    }
  }

  // 3) Прямой API (если bridge и proxy не дали все org)
  if (orgResults.length < cfg.orgs.filter((o) => o.id).length) {
    for (const org of cfg.orgs) {
      if (!org.id || orgResults.some((r) => r.id === org.id)) continue;
      try {
        const sections = await fetchGetPr(cfg.url, cfg.apikey, org.id);
        orgResults.push({ id: org.id, label: org.label, sections: normalizeSections(sections, org.source) });
        sources.push(`api:${org.key}`);
      } catch (e) {
        console.warn(`[${city}] api ${org.key}:`, e.message);
      }
    }
  }

  // 4) Публичный / локальный дамп (для СПб — один org)
  if (!orgResults.length) {
    const tryDump = async (sections, source, label, id) => {
      orgResults.push({ id, label, sections: normalizeSections(sections, source) });
      sources.push(source);
    };

    if (PUBLIC_DUMPS[city]) {
      try {
        const sections = await loadDumpFromUrl(PUBLIC_DUMPS[city]);
        const org = cfg.orgs[0];
        await tryDump(sections, 'public-dump', org.label, org.id);
      } catch (e) {
        console.warn(`[${city}] public dump:`, e.message);
      }
    }

    if (!orgResults.length && LOCAL_DUMPS[city] && fs.existsSync(LOCAL_DUMPS[city])) {
      try {
        const sections = await loadDumpFromFile(LOCAL_DUMPS[city]);
        const org = cfg.orgs[0];
        await tryDump(sections, 'local-dump', org.label, org.id);
      } catch (e) {
        console.warn(`[${city}] local dump:`, e.message);
      }
    }

    // СПб: локальный qms_price/spb/json.html как fallback
    if (!orgResults.length && city === 'spb') {
      const local = path.join(ROOT, 'qms_price', 'spb', 'json.html');
      if (fs.existsSync(local)) {
        const sections = await loadDumpFromFile(local);
        const org = cfg.orgs[0];
        await tryDump(sections, 'local-dump-spb', org.label, org.id);
      }
    }
  }

  if (!orgResults.length) {
    throw new Error(`${cfg.label}: не удалось загрузить прайс (bridge/api/dump)`);
  }

  const allSections = orgResults.flatMap((o) => o.sections);
  return {
    city: cfg.city,
    label: cfg.label,
    sources,
    orgs: orgResults,
    allSections,
  };
}

function aggregateByVal(allSections) {
  const map = new Map();
  for (const s of allSections) {
    const key = s.val || '(пусто)';
    const prev = map.get(key) ?? { val: key, rowCount: 0, sources: new Set() };
    prev.rowCount += s.rowCount;
    prev.sources.add(s.source);
    map.set(key, prev);
  }
  return [...map.values()]
    .map((x) => ({ ...x, sources: [...x.sources] }))
    .sort((a, b) => b.rowCount - a.rowCount);
}

function buildMarkdown(chel, spb) {
  const lines = [];
  const now = new Date().toISOString().slice(0, 10);

  lines.push('# Инвентаризация разделов прайса QMS (getPr)');
  lines.push('');
  lines.push(`Обновлено: **${now}** · \`node scripts/qms-fetch-pricelist.mjs --write-docs\``);
  lines.push('');
  lines.push('SSOT категории услуг: **`section.val`** в ответе `getPr`. Ключ услуги: **`row.Duv`** (артикул).');
  lines.push('');
  lines.push('> Прямой `back.*.ru/qms-api/getPr` с ПК → **403**. ЧЛБ: `GET /api/qms/pricelist?city=chel` на bridge (IP Coolify).');
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const city of [chel, spb].filter(Boolean)) {
    const totalRows = city.allSections.reduce((n, s) => n + s.rowCount, 0);
    lines.push(`## ${city.label}`);
    lines.push('');
    lines.push('| Метрика | Значение |');
    lines.push('|---------|----------|');
    lines.push(`| Источник данных | ${city.sources.join(', ')} |`);
    lines.push(`| Организаций (qqc244) | ${city.orgs.length} |`);
    lines.push(`| Уникальных section.val | ${aggregateByVal(city.allSections).length} |`);
    lines.push(`| Всего позиций (rows) | ${totalRows} |`);
    lines.push('');

    for (const org of city.orgs) {
      if (!org.sections.length) continue;
      lines.push(`### ${org.label} (\`${org.id}\`)`);
      lines.push('');
      lines.push('| # | section.val | Позиций | → чип сайта | Примеры артикулов |');
      lines.push('|---|-------------|---------|-------------|-------------------|');
      org.sections.forEach((s, i) => {
        const tab = suggestTab(s.val);
        const arts = s.sampleArticles.filter(Boolean).join(', ') || '—';
        lines.push(`| ${i + 1} | ${s.val.replace(/\|/g, '\\|')} | ${s.rowCount} | ${tabLabel(tab)} (\`${tab}\`) | ${arts} |`);
      });
      lines.push('');
    }

    lines.push(`### Сводка (${city.label})`);
    lines.push('');
    lines.push('| section.val | Позиций | Источники | → чип сайта |');
    lines.push('|-------------|---------|-----------|-------------|');
    for (const agg of aggregateByVal(city.allSections)) {
      lines.push(`| ${agg.val.replace(/\|/g, '\\|')} | ${agg.rowCount} | ${agg.sources.join(', ')} | ${tabLabel(suggestTab(agg.val))} |`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  lines.push('## Чипы UI (`PRICING_TABS`)');
  lines.push('');
  lines.push('| id | Подпись |');
  lines.push('|----|---------|');
  for (const t of SITE_TABS) {
    lines.push(`| \`${t.id}\` | ${t.label} |`);
  }
  lines.push('');
  lines.push('Колонка «→ чип» — эвристика; финальный маппинг: `docs/mappings/service-category.yaml` (след. шаг).');
  lines.push('');
  lines.push('## Env');
  lines.push('');
  lines.push('- `infra/env/qms-price.env` — локальные скрипты');
  lines.push('- `infra/env/legacy-bridge-istochnik.env` — bridge на Coolify (`GET /api/qms/pricelist`)');

  return lines.join('\n');
}

async function main() {
  const writeDocs = process.argv.includes('--write-docs');
  const results = {};

  for (const cityKey of ['chel', 'spb']) {
    console.log(cityKey === 'chel' ? 'Челябинск…' : 'Санкт-Петербург…');
    try {
      results[cityKey] = await loadCity(cityKey);
      console.log('  источник:', results[cityKey].sources.join(', '));
    } catch (e) {
      console.error(`  ОШИБКА: ${e.message}`);
      results[cityKey] = null;
    }
  }

  if (!results.chel && !results.spb) {
    throw new Error('Не удалось загрузить прайс ни для одного города');
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    chel: results.chel ? { ...results.chel, aggregated: aggregateByVal(results.chel.allSections) } : null,
    spb: results.spb ? { ...results.spb, aggregated: aggregateByVal(results.spb.allSections) } : null,
  };

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2), 'utf8');
  console.log('JSON →', OUT_JSON);

  if (writeDocs && (results.chel || results.spb)) {
    const md = buildMarkdown(results.chel, results.spb);
    fs.writeFileSync(OUT_MD, md, 'utf8');
    console.log('MD →', OUT_MD);
    if (!results.chel) {
      console.warn('ЧЛБ в MD отсутствует — после деплоя bridge перезапустите скрипт');
    }
  }

  console.log('\nИтого позиций:', {
    chel: results.chel?.allSections.reduce((n, s) => n + s.rowCount, 0) ?? 0,
    spb: results.spb?.allSections.reduce((n, s) => n + s.rowCount, 0) ?? 0,
  });
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
