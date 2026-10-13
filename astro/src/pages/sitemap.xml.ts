import pages from '../data/sitemap.json';
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
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`).join('') +
    `</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
