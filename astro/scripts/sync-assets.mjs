// PoC convenience: reuse the repo's existing /images, favicons and robots.txt without
// duplicating them in git. Copies them into astro/public/ (git-ignored) before dev/build.
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const pub = join(here, '..', 'public');
mkdirSync(pub, { recursive: true });
cpSync(join(root, 'images'), join(pub, 'images'), { recursive: true });
for (const f of ['favicon.png', 'favicon.svg', 'robots.txt']) {
  if (existsSync(join(root, f))) cpSync(join(root, f), join(pub, f));
}
console.log('synced assets -> astro/public');
