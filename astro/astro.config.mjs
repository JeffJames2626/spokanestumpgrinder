import { defineConfig } from 'astro/config';

// Static output only. `format: 'file'` emits /services.html (not /services/index.html),
// so every existing .html URL is preserved exactly. All CSS is inlined per page, matching
// today's self-contained pages (no extra stylesheet request, no /_astro/ path dependence).
export default defineConfig({
  output: 'static',
  build: { format: 'file', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
