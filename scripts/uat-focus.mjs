#!/usr/bin/env node
/**
 * Печатает, что сейчас копить в UAT (без правки markdown вручную).
 * Запуск: npm run uat:focus
 */
const sections = [
  {
    wave: '1B',
    status: 'СЕЙЧАС — копите вручную',
    doc: 'UAT_MASTER_PLAN.md → Часть 1',
    p0: [
      '1B-D14–D15: Опубликовать → сайт без redeploy',
      '1B-C2: на проде нет Command Center',
      '1B-D8: F5 — черновик на месте',
      '1B-F1: /booking открывается',
    ],
    auto: 'npm run smoke:prod',
  },
  {
    wave: '2',
    status: 'после git push + Coolify',
    doc: 'Часть 3',
    p0: [
      '2-1-2: ?utm_campaign=kids → пресет педиатрии',
      '2-2-1–3: Лаборатория + lab-* 404 на проде',
      '2-3-1–2: Analytics + data-goal',
      '2-4-1: AI layout в preview',
    ],
    auto: 'npm run smoke:prod -- --wave2',
  },
  {
    wave: '3',
    status: 'после деплоя Wave 2',
    doc: 'Часть 4',
    p0: [
      '3-1-2: демо-эксперимент',
      '3-2-1: Запустить → running',
      '3-4-1–4: apply → draft only, ручной publish',
    ],
    auto: 'npm run smoke:prod',
  },
  {
    wave: '4',
    status: 'после деплоя Wave 2/3',
    doc: 'Часть 5',
    p0: [
      '5-1-1–2: клик по блоку → редактор',
      '5-2-1: перестановка блоков в preview',
      '5-3-1–2: сохранить пресет → F5 → пресет в списке',
    ],
    auto: 'npm run smoke:prod',
  },
];

console.log('\n=== UAT Focus (med_site) ===\n');
console.log('Полный план: docs/UAT_MASTER_PLAN.md\n');

for (const s of sections) {
  console.log(`--- Wave ${s.wave} [${s.status}] ---`);
  console.log(`Док: ${s.doc}`);
  console.log('P0 сейчас:');
  for (const item of s.p0) console.log(`  • ${item}`);
  console.log(`Авто: ${s.auto}\n`);
}

console.log('Регрессия booking (1B-F) — после КАЖДОГО релиза Wave 2–4.\n');
