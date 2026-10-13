// One-shot: turn the hand-copied blog cards / homepage "latest post" markup into ONE data file + components.
// Reads the already-converted src/pages/{blog,index}.astro; run once (idempotent guard below).
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '..', 'src');
const rd = (f) => fs.readFileSync(path.join(src, f), 'utf8');
const wr = (f, t) => fs.writeFileSync(path.join(src, f), t);
const ent = { '&mdash;': '—', '&middot;': '·', '&amp;': '&', '&rarr;': '→', '&#39;': "'", '&quot;': '"' };
const dec = (t) => t.replace(/&(mdash|middot|amp|rarr|#39|quot);/g, (m) => ent[m]).replace(/\s+/g, ' ').trim();

let blog = rd('pages/blog.astro'), index = rd('pages/index.astro');
if (blog.includes("from '../data/posts'")) { console.log('already dataized'); process.exit(0); }

const sm = JSON.parse(rd('data/sitemap.json'));
const lastmodOf = (file) => sm.find((u) => u.loc.endsWith('/' + file));

// ---- posts ----
const cardRe = /<div class="card">\s*<p class="post-date">([^<]*)<\/p>\s*<a class="big" href="([^"]+)">([\s\S]*?)<\/a>\s*<p>([\s\S]*?)<\/p>\s*<\/div>/g;
const gridAt = blog.indexOf('class="grid"');   // skip the commented-out template card above the grid
const cards = [...blog.slice(gridAt).matchAll(cardRe)];
if (cards.length < 4) throw new Error('expected blog cards, found ' + cards.length);
const posts = cards.map((m) => {
  const sitemap = lastmodOf(m[2]);
  return { file: m[2], date: dec(m[1]), title: dec(m[3]), summary: dec(m[4]), lastmod: sitemap?.lastmod, changefreq: sitemap?.changefreq, priority: sitemap?.priority };
});
// ---- homepage feature ----
const pill = index.match(/<a class="news-pill" href="([^"]+)"><span class="tag">([^<]*)<\/span><span>([\s\S]*?)<\/span><span class="arrow"/);
const feat = index.match(/<a class="feature-post" href="([^"]+)">\s*<img src="([^"]+)" width="(\d+)" height="(\d+)" loading="lazy" alt="([^"]*)">\s*<div class="feature-body">\s*<p class="eyebrow">([\s\S]*?)<\/p>\s*<h2>([\s\S]*?)<\/h2>\s*<p>([\s\S]*?)<\/p>\s*<span class="read-more">([\s\S]*?) <span aria-hidden="true">/);
if (!pill || !feat) throw new Error('could not parse homepage feature');
if (pill[1] !== feat[1] || pill[1] !== posts[0].file) throw new Error('pill/feature/newest post disagree: ' + [pill[1], feat[1], posts[0].file]);
const feature = { pillTag: dec(pill[2]), pillText: dec(pill[3]), image: feat[2], imageWidth: +feat[3], imageHeight: +feat[4], imageAlt: dec(feat[5]), eyebrow: dec(feat[6]), headline: dec(feat[7]), summary: dec(feat[8]), cta: dec(feat[9]) };

const q = (v) => JSON.stringify(v);
wr('data/posts.ts', `// THE blog. Newest first. Adding a post = add ONE entry here (+ its page file).
// Everything below updates automatically: /blog.html cards, the homepage "New" pill and feature card,
// and sitemap.xml. (Today that is hand-editing blog.html, index.html twice, sitemap.xml and CLAUDE.md.)
export interface Post {
  file: string;       // existing .html URL (never changes once published)
  date: string;       // shown on the blog index card
  title: string;
  summary: string;
  lastmod: string;    // sitemap <lastmod>
  changefreq: string;
  priority: string;
}

export const posts: Post[] = [
${posts.map((p) => `  { file: ${q(p.file)}, date: ${q(p.date)}, title: ${q(p.title)}, summary: ${q(p.summary)}, lastmod: ${q(p.lastmod)}, changefreq: ${q(p.changefreq)}, priority: ${q(p.priority)} },`).join('\n')}
];

// The homepage promotes the newest post (posts[0]) with its own punchier copy and photo.
export const feature = {
  file: posts[0].file,
${Object.entries(feature).map(([k, v]) => `  ${k}: ${q(v)},`).join('\n')}
};
`);

wr('components/PostCard.astro', `---
import type { Post } from '../data/posts';
const { post } = Astro.props as { post: Post };
---
<div class="card">
  <p class="post-date">{post.date}</p>
  <a class="big" href={post.file}>{post.title}</a>
  <p>{post.summary}</p>
</div>
`);
wr('components/NewsPill.astro', `---
import { feature } from '../data/posts';
---
<a class="news-pill" href={feature.file}><span class="tag">{feature.pillTag}</span><span>{feature.pillText}</span><span class="arrow" aria-hidden="true">&rarr;</span></a>
`);
wr('components/FeaturePost.astro', `---
import { feature } from '../data/posts';
---
<a class="feature-post" href={feature.file}>
  <img src={feature.image} width={feature.imageWidth} height={feature.imageHeight} loading="lazy" alt={feature.imageAlt}>
  <div class="feature-body">
    <p class="eyebrow">{feature.eyebrow}</p>
    <h2>{feature.headline}</h2>
    <p>{feature.summary}</p>
    <span class="read-more">{feature.cta} <span aria-hidden="true">&rarr;</span></span>
  </div>
</a>
`);

// ---- rewire pages ----
const firstCard = blog.indexOf('<div class="card">', blog.indexOf('class="grid"'));
const lastCardEnd = blog.lastIndexOf('</div>', blog.indexOf('</div>\n  </div>\n</section>', firstCard)) ;
const cardsBlock = blog.slice(firstCard, blog.indexOf('    </div>\n  </div>\n</section>', firstCard));
blog = blog.replace(cardsBlock, '      {posts.map((post) => <PostCard post={post} />)}\n');
blog = blog.replace("import Base from '../layouts/Base.astro';", "import Base from '../layouts/Base.astro';\nimport PostCard from '../components/PostCard.astro';\nimport { posts } from '../data/posts';");
wr('pages/blog.astro', blog);

index = index.replace(/<a class="news-pill"[\s\S]*?<\/a>/, '<NewsPill />');
index = index.replace(/<a class="feature-post"[\s\S]*?<\/a>\n/, '<FeaturePost />\n');
index = index.replace(/\s*<!-- ============ LATEST FROM THE BLOG ============[\s\S]*?-->/, '\n<!-- ============ LATEST FROM THE BLOG ============  (data: src/data/posts.ts -> feature) -->');
index = index.replace("import Base from '../layouts/Base.astro';", "import Base from '../layouts/Base.astro';\nimport NewsPill from '../components/NewsPill.astro';\nimport FeaturePost from '../components/FeaturePost.astro';");
wr('pages/index.astro', index);

// ---- sitemap: posts come from the posts data, everything else from the static page list ----
const postFiles = new Set(posts.map((p) => p.file));
wr('data/sitemap.json', JSON.stringify(sm.filter((u) => ![...postFiles].some((f) => u.loc.endsWith('/' + f))), null, 2) + '\n');
wr('pages/sitemap.xml.ts', `import pages from '../data/sitemap.json';
import { posts } from '../data/posts';

// Built from: (a) the static page list, (b) every entry in src/data/posts.ts. A new post can no longer be
// forgotten in the sitemap, because publishing it IS adding it to posts.ts.
const BASE = 'https://spokanestumpgrinder.com/';
export function GET() {
  const urls = [
    ...pages,
    ...posts.map((p) => ({ loc: BASE + p.file, lastmod: p.lastmod, changefreq: p.changefreq, priority: p.priority })),
  ];
  const body =
    \`<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n\` +
    urls.map((u) => \`  <url>\\n    <loc>\${u.loc}</loc>\\n    <lastmod>\${u.lastmod}</lastmod>\\n    <changefreq>\${u.changefreq}</changefreq>\\n    <priority>\${u.priority}</priority>\\n  </url>\\n\`).join('') +
    \`</urlset>\\n\`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
`);
console.log(`dataized: ${posts.length} posts; newest = ${posts[0].file}; feature pill = "${feature.pillText}"`);
