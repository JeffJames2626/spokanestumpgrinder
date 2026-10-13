// One-shot PoC converter: legacy standalone .html pages -> Astro pages + shared layout/CSS.
// Run from astro/:  node tools/convert.mjs
// It is deliberately strict: every byte of every legacy page must be accounted for as
// (a) shared scaffold (becomes layout/components), (b) page metadata, (c) page CSS, or (d) page content.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const src = path.resolve(here, '..', 'src');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8').replace(/\r\n/g, '\n');
const write = (rel, text) => {
  const p = path.join(src, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, text);
};
const norm = (x) => x.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
const decodeAttr = (v) =>
  v.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const files = fs.readdirSync(root).filter((f) => f.endsWith('.html')).sort();

function cut(s) {
  const at = (needle, from = 0) => {
    const i = s.indexOf(needle, from);
    if (i < 0) throw new Error('missing ' + needle);
    return i;
  };
  const head0 = at('<head>') + 6, st = at('<style>'), st1 = at('</style>', st), head1 = at('</head>');
  const hd0 = at('<header>'), hd1 = at('</header>') + 9, f0 = at('<footer>'), f1 = at('</footer>') + 9;
  const bt = s.lastIndexOf('</body>');
  return {
    headpre: s.slice(head0, st), css: s.slice(st + 7, st1), headpost: s.slice(st1 + 8, head1),
    bodypre: s.slice(head1, hd0), header: s.slice(hd0, hd1), main: s.slice(hd1, f0),
    footer: s.slice(f0, f1), tail: s.slice(f1, bt),
  };
}

function splitCss(css) {
  const out = []; let i = 0, buf = '', depth = 0, pending = '';
  while (i < css.length) {
    if (css.startsWith('/*', i)) {
      const j = css.indexOf('*/', i) + 2;
      const c = css.slice(i, j);
      if (depth === 0 && !buf.trim()) pending += c + '\n'; else buf += c;
      i = j; continue;
    }
    const ch = css[i]; buf += ch;
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { out.push({ raw: pending + buf.trim(), key: norm(buf) }); buf = ''; pending = ''; } }
    i++;
  }
  if (buf.trim()) out.push({ raw: pending + buf.trim(), key: norm(buf) });
  // occurrence-numbered keys so repeated identical chunks stay distinct
  const seen = {};
  return out.map((c) => ({ ...c, id: c.key + '#' + (seen[c.key] = (seen[c.key] ?? -1) + 1) }));
}

function splitTop(head) {
  const out = []; let d = 0, cur = '';
  for (const ch of head) { if ('([' .includes(ch)) d++; if (')]'.includes(ch)) d--; if (ch === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += ch; }
  if (cur.trim()) out.push(cur.trim()); return out;
}
function parseLeaves(raw) {
  const out = []; const text = raw.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  const walk = (t) => {
    let i = 0;
    while (i < t.length) {
      const b = t.indexOf('{', i); if (b < 0) break;
      const head = t.slice(i, b).trim(); let d = 1, j = b + 1;
      while (j < t.length && d > 0) { if (t[j] === '{') d++; else if (t[j] === '}') d--; j++; }
      const body = t.slice(b + 1, j - 1);
      if (/^@(media|supports|layer)/.test(head)) walk(body);
      else if (!head.startsWith('@')) out.push({ sels: splitTop(head), props: [...new Set(body.split(';').map((x) => x.split(':')[0].trim()).filter((n) => /^-{0,2}[a-z][a-z-]*$/.test(n)))] });
      i = j;
    }
  };
  walk(text); return out;
}

const P = Object.fromEntries(files.map((f) => [f, cut(read(f))]));
const css = Object.fromEntries(files.map((f) => [f, splitCss(P[f].css)]));

// ---- shared scaffold sanity: these must be identical everywhere or the layout would be lossy ----
const same = (name) => new Set(files.map((f) => norm(P[f][name]))).size === 1;
for (const part of ['footer', 'tail', 'headpost', 'bodypre']) {
  if (!same(part)) throw new Error(`${part} differs between pages; layout would be lossy`);
}
const headerNorm = new Set(files.map((f) => norm(P[f].header.replace(' class="active"', ''))));
if (headerNorm.size !== 1) throw new Error('header differs beyond the active link');

// ---- shared CSS = chunks present (same text, same occurrence) in ALL pages, in index.html order ----
const sets = files.map((f) => new Set(css[f].map((c) => c.id)));
const sharedIds = new Set([...sets[0]].filter((id) => sets.every((s) => s.has(id))));
const identicalEverywhere = sharedIds.size;

// ---- cascade safety ----
// Hoisting a shared chunk to the top changes its order relative to page-specific chunks that
// originally came BEFORE it. If both declare the same property, the winner flips. So a shared
// chunk is "pinned" (left in page CSS at its original position) whenever any page has an earlier
// page-specific chunk that declares an overlapping property. Pinned chunks count as page-specific
// for the next round, so iterate to a fixed point. Conservative on purpose (ignores selectors).
const propsOf = (raw) => {
  const text = raw.replace(/\/\*[\s\S]*?\*\//g, '');
  const set = new Set();
  for (const m of text.matchAll(/\{([^{}]*)\}/g))
    for (const decl of m[1].split(';')) { const n = decl.split(':')[0].trim(); if (/^-{0,2}[a-z][a-z-]*$/.test(n)) set.add(n); }
  return set;
};
const chunkProps = new Map();
for (const f of files) for (const c of css[f]) if (!chunkProps.has(c.id)) chunkProps.set(c.id, propsOf(c.raw));
const pinned = new Set();
fs.writeFileSync(path.join(here, 'chunks.json'), JSON.stringify(Object.fromEntries(files.map((f) => [f, css[f].map((c) => ({ id: c.id, key: c.key, shared: sharedIds.has(c.id), leaves: parseLeaves(c.raw) }))]))));
// PIN=none -> trust explicit ordering and hoist everything identical (then pin only what parity tests prove breaks).
// PIN=heuristic (default) -> conservative property-overlap pinning.  tools/pinned.json = manual, test-proven pins (by key prefix).
const manual = fs.existsSync(path.join(here, 'pinned.json')) ? JSON.parse(fs.readFileSync(path.join(here, 'pinned.json'), 'utf8')) : [];
const manualSet = new Set(manual);
for (const f of files) for (const c of css[f]) if (manualSet.has(c.key)) pinned.add(c.id);
for (let changed = process.env.PIN === 'heuristic'; changed; ) {
  changed = false;
  for (const f of files) {
    const seen = new Set();
    for (const c of css[f]) {
      const isShared = sharedIds.has(c.id) && !pinned.has(c.id);
      const p = chunkProps.get(c.id);
      if (isShared) {
        if ([...p].some((x) => seen.has(x))) { pinned.add(c.id); changed = true; }
      } else for (const x of p) seen.add(x);
    }
  }
}
for (const id of pinned) sharedIds.delete(id);
const ref = css['index.html'].filter((c) => sharedIds.has(c.id));
write('styles/shared.css', ref.map((c) => c.raw).join('\n\n') + '\n');

const report = { pages: {}, sharedBytes: ref.reduce((a, c) => a + c.raw.length, 0), sharedChunks: ref.length, identicalEverywhere, pinnedForCascade: pinned.size };

for (const f of files) {
  const slug = f.replace(/\.html$/, '');
  const d = P[f];
  const specific = css[f].filter((c) => !sharedIds.has(c.id));
  write(`styles/pages/${slug}.css`, specific.map((c) => c.raw).join('\n\n') + '\n');

  // ---- head metadata ----
  let h = d.headpre;
  const grab = (re, all = false) => {
    if (all) { const r = [...h.matchAll(re)]; h = h.replace(re, ''); return r; }
    const m = h.match(re); if (m) h = h.replace(re, ''); return m;
  };
  const title = grab(/<title>([\s\S]*?)<\/title>/)[1];
  const description = decodeAttr(grab(/<meta name="description" content="([\s\S]*?)">/)[1]);
  const canonical = grab(/<link rel="canonical" href="([^"]*)">/)?.[1];
  const og = Object.fromEntries(grab(/<meta property="og:(\w+)" content="([^"]*)">/g, true).map((m) => [m[1], decodeAttr(m[2])]));
  const twitterCard = grab(/<meta name="twitter:card" content="([^"]*)">/)?.[1];
  const ld = grab(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g, true).map((m) => m[1]);
  // known scaffold that now lives in Base.astro
  for (const re of [/<meta charset="utf-8">/, /<meta name="viewport" content="[^"]*">/, /<link rel="icon" type="image\/png" href="favicon.png">/,
    /<link rel="preconnect" href="https:\/\/fonts.googleapis.com">/, /<link rel="preconnect" href="https:\/\/fonts.gstatic.com" crossorigin>/,
    /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Montserrat:wght@700&display=swap" rel="stylesheet">/,
    /<script>\s*\(function\(\)\{try\{var t=localStorage\.getItem\('ssg-theme'\)[\s\S]*?<\/script>/]) h = h.replace(re, '');
  if (h.trim()) throw new Error(`${f}: unaccounted head content:\n${h}`);

  ld.forEach((json, i) => write(`data/jsonld/${slug}-${i + 1}.json`, json + '\n'));
  const active = d.header.match(/<a class="active" href="([^"]+)"/)?.[1] ?? null;

  const needsFragment = /<script|<style/.test(d.main) || /[{}]/.test(d.main);
  // CSS order is made explicit: shared first, then page-specific. Astro does NOT guarantee layout-before-page CSS order.
  const imports = [`import '../styles/shared.css';`, `import '../styles/pages/${slug}.css';`, `import Base from '../layouts/Base.astro';`];
  ld.forEach((_, i) => imports.push(`import ld${i + 1} from '../data/jsonld/${slug}-${i + 1}.json?raw';`));
  if (needsFragment) imports.push(`import main from '../fragments/${slug}-main.html?raw';`);
  const meta = [
    `  title: ${JSON.stringify(title)},`, `  description: ${JSON.stringify(description)},`,
    canonical ? `  canonical: ${JSON.stringify(canonical)},` : null,
    Object.keys(og).length ? `  og: ${JSON.stringify(og)},` : null,
    twitterCard ? `  twitterCard: ${JSON.stringify(twitterCard)},` : null,
    ld.length ? `  jsonld: [${ld.map((_, i) => `ld${i + 1}`).join(', ')}],` : null,
    `  active: ${JSON.stringify(active)},`,
  ].filter(Boolean).join('\n');

  let body;
  if (needsFragment) {
    write(`fragments/${slug}-main.html`, d.main.trim() + '\n');
    body = '  <Fragment set:html={main} />';
  } else {
    body = d.main.replace(/^\n+|\n+$/g, '');
  }
  write(`pages/${slug}.astro`, `---\n${imports.join('\n')}\n\nconst meta = {\n${meta}\n};\n---\n<Base {...meta}>\n${body}\n</Base>\n`);
  report.pages[f] = { slug, active, cssSpecificBytes: specific.reduce((a, c) => a + c.raw.length, 0), fragment: needsFragment, jsonld: ld.length };
}

// ---- sitemap registry from the legacy sitemap (so the generated one can be diffed against it) ----
const sm = read('sitemap.xml');
const urls = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
  const g = (t) => m[1].match(new RegExp(`<${t}>([^<]*)</${t}>`))?.[1];
  return { loc: g('loc'), lastmod: g('lastmod'), changefreq: g('changefreq'), priority: g('priority') };
});
write('data/sitemap.json', JSON.stringify(urls, null, 2) + '\n');

fs.writeFileSync(path.join(here, 'convert-report.json'), JSON.stringify(report, null, 2));
console.log(`converted ${files.length} pages | identical-on-all-17 chunks: ${identicalEverywhere} | pinned for cascade safety: ${pinned.size} | shared CSS: ${report.sharedChunks} chunks, ${report.sharedBytes} bytes`);
console.log(Object.entries(report.pages).map(([f, r]) => `${f.padEnd(42)} active=${String(r.active).padEnd(22)} pageCSS=${String(r.cssSpecificBytes).padStart(5)}B ${r.fragment ? 'FRAGMENT' : ''}`).join('\n'));
