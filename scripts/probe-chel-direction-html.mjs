#!/usr/bin/env node
const html = await fetch('https://ci74.ru/katalog/vzroslaya_klinika/anesteziologiya_4/').then((r) => r.text());

const needle = 'Задача анестезиологии';
const idx = html.indexOf(needle);
console.log('quote idx', idx);
if (idx >= 0) {
  console.log(html.slice(Math.max(0, idx - 2000), idx + 500));
}

const h1 = html.indexOf('<h1');
console.log('\n=== AFTER H1 ===');
console.log(html.slice(h1, h1 + 3500));
