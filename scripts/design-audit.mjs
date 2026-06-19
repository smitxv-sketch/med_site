import fs from 'fs';
import path from 'path';

const exts = new Set(['.tsx', '.ts', '.css']);
const skip = /node_modules|dist/;

const zones = {
  widgets: /^src[\\/]widgets[\\/]/,
  pages: /^src[\\/]pages[\\/]/,
  shared: /^src[\\/]shared[\\/]/,
  components: /^src[\\/]components[\\/]/,
  app: /^src[\\/]app[\\/]/,
  admin: /^src[\\/]admin[\\/]/,
  'widget-booking': /^src[\\/]widget[\\/]/,
  root: /^src[\\/][^\\/]+$/,
};

function zone(p) {
  for (const [k, re] of Object.entries(zones)) {
    if (re.test(p)) return k;
  }
  return 'other';
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (skip.test(p)) continue;
    if (e.isDirectory()) walk(p, files);
    else if (exts.has(path.extname(e.name))) files.push(p.replace(/\\/g, '/'));
  }
  return files;
}

const files = walk('src');
const results = { hex: [], arb: [], dim: [], brandClasses: [], cssVars: [] };

const hexRe = /#([0-9a-fA-F]{3,8})\b/g;
const arbRe = /\b(?:text|bg|border|from|to|via|ring|shadow|fill|stroke)-\[([^\]]+)\]/g;
const dimRe =
  /\b(?:text|min-h|max-h|min-w|max-w|h|w|gap|p|px|py|pt|pb|pl|pr|m|mt|mb|ml|mr|rounded|leading|tracking|top|bottom|left|right)-\[([^\]]+)\]/g;
const brandRe =
  /\b(?:text|bg|border|from|to|via|ring|shadow)-(?:brand(?:-[a-z]+)?|green|violet|orange|blue|turquoise|teal|emerald|amber|red|purple|pink|slate|gray)-[^\s"'`]+/g;
const cssVarRe = /--[a-z0-9-]+/g;

for (const f of files) {
  const rel = f.replace(/\\/g, '/');
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    const ln = i + 1;
    let m;
    hexRe.lastIndex = 0;
    while ((m = hexRe.exec(line))) {
      results.hex.push({
        zone: zone(rel),
        file: rel,
        line: ln,
        value: '#' + m[1],
        context: line.trim().slice(0, 140),
      });
    }
    arbRe.lastIndex = 0;
    while ((m = arbRe.exec(line))) {
      results.arb.push({
        zone: zone(rel),
        file: rel,
        line: ln,
        value: m[0],
        raw: m[1],
        context: line.trim().slice(0, 140),
      });
    }
    dimRe.lastIndex = 0;
    while ((m = dimRe.exec(line))) {
      if (!m[0].includes('#') && !m[0].includes('var(')) {
        results.dim.push({
          zone: zone(rel),
          file: rel,
          line: ln,
          value: m[0],
          raw: m[1],
          context: line.trim().slice(0, 120),
        });
      }
    }
    brandRe.lastIndex = 0;
    while ((m = brandRe.exec(line))) {
      results.brandClasses.push({
        zone: zone(rel),
        file: rel,
        line: ln,
        value: m[0],
        context: line.trim().slice(0, 120),
      });
    }
  });
}

// Parse index.css and tailwind for SSOT tokens
const indexCss = fs.readFileSync('src/index.css', 'utf8');
const tailwind = fs.readFileSync('tailwind.config.js', 'utf8');

const summary = {};
function ensureZone(z) {
  if (!summary[z]) summary[z] = { hex: 0, arb: 0, dim: 0, brand: 0, files: [] };
  return summary[z];
}
for (const k of Object.keys(zones)) ensureZone(k);
ensureZone('other');

for (const [type, arr] of Object.entries({
  hex: results.hex,
  arb: results.arb,
  dim: results.dim,
  brand: results.brandClasses,
})) {
  const fileSets = {};
  for (const r of arr) {
    ensureZone(r.zone)[type]++;
    fileSets[r.zone] = fileSets[r.zone] || new Set();
    fileSets[r.zone].add(r.file);
  }
  for (const [z, s] of Object.entries(fileSets)) {
    ensureZone(z).files = [...new Set([...(ensureZone(z).files || []), ...s])];
  }
}

const uniqHex = [...new Set(results.hex.map((r) => r.value.toLowerCase()))].sort();

const out = {
  generatedAt: new Date().toISOString(),
  summary,
  uniqueHexCount: uniqHex.length,
  uniqueHex: uniqHex,
  results,
};

fs.mkdirSync('docs/legacy/audits', { recursive: true });
fs.writeFileSync('docs/legacy/audits/design_audit_raw.json', JSON.stringify(out, null, 2));

console.log('SUMMARY:', JSON.stringify(summary, null, 2));
console.log('UNIQUE HEX:', uniqHex.length);
