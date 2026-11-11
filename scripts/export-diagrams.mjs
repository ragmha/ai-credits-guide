// bun run diagrams:export [--check]
import { chromium } from '@playwright/test';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const check = process.argv.includes('--check');
const root = new URL('../', import.meta.url);
const assets = new URL('public/diagrams/', root);
const sources = (await readdir(assets)).filter(name => name.endsWith('.excalidraw')).sort();
if (!sources.length) throw new Error('No editable diagram sources found');
const result = await Bun.build({
  entrypoints: [fileURLToPath(new URL('./diagram-browser.mjs', import.meta.url))],
  target: 'browser', minify: true,
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
});
if (!result.success) throw new AggregateError(result.logs, 'Excalidraw exporter bundle failed');
const bundle = await result.outputs.find(output => output.path.endsWith('.js')).text();
const server = Bun.serve({
  hostname: '127.0.0.1', port: 0,
  fetch(request) {
    const path = new URL(request.url).pathname;
    if (path === '/exporter.js') return new Response(bundle, { headers: { 'Content-Type': 'text/javascript' } });
    if (path === '/') return new Response('<!doctype html><html><body><script type="module" src="/exporter.js"></script></body></html>', {
      headers: { 'Content-Type': 'text/html' },
    });
    if (/^\/diagrams\/[\w-]+\.(?:html|(?:light|dark)\.svg)$/.test(path)) {
      return new Response(Bun.file(new URL(`public${path}`, root)));
    }
    return new Response('Not found', { status: 404 });
  },
});
let browser;
try {
  browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' });
  const page = await browser.newPage({ viewport: { width: 900, height: 1000 } });
  page.on('pageerror', error => console.error(error));
  // No network access is needed for system-sans native exports.
  const externalRequests = [];
  await page.route('**/*', route => {
    if (new URL(route.request().url()).origin === server.url.origin) return route.continue();
    externalRequests.push(route.request().url());
    return route.abort('blockedbyclient');
  });
  await page.goto(server.url.href);
  await page.waitForFunction(() => window.diagramTools);
  for (const name of sources) {
    const slug = name.replace('.excalidraw', '');
    const sourcePath = new URL(name, assets);
    const source = JSON.parse(await readFile(sourcePath, 'utf8'));
    const canvas = source.elements.find(element => element.customData?.kind === 'canvas');
    const exports = {};
    for (const theme of ['light', 'dark']) {
      const svg = await page.evaluate(({ source, theme, slug }) =>
        window.diagramTools.export(source, theme, slug), { source, theme, slug });
      exports[theme] = svg;
      await persist(new URL(`${slug}.${theme}.svg`, assets), `${svg}\n`);
    }
    await persist(new URL(`${slug}.html`, assets), wrapper(slug, { ...canvas.customData, width: canvas.width }, exports));
    console.log(`${slug}: imported/restored/exported light + dark; viewBox 0 0 ${canvas.width} ${canvas.height}`);
  }
  for (const name of sources) {
    await verifyWrapper(page, name.replace('.excalidraw', ''));
  }
  if (externalRequests.length) throw new Error(`Unexpected external assets: ${externalRequests.join(', ')}`);
  console.log(`Verified ${sources.length} editable scenes and their themed SVG exports, native text/connector geometry, accessible labels, OS/override themes, and mobile keyboard scrolling; no remote assets.`);
} finally {
  await browser?.close();
  await server.stop(true);
}

async function persist(path, content) {
  if (check) {
    if (await readFile(path, 'utf8') !== content) throw new Error(`Stale diagram export: ${fileURLToPath(path)}`);
  } else {
    await writeFile(path, content);
  }
}

function escapeHtml(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

function wrapper(slug, { title, width }, exports) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>${escapeHtml(title)}</title>
  <style>
    :root{color-scheme:light;--paper:#fafafa;--ink:#18181b;--accent:#6d28d9}
    *{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.5 system-ui,sans-serif}
    main{max-width:${width + 32}px;margin:auto;padding:16px}
    .diagram-container{overflow-x:auto}.diagram-container:focus-visible{outline:2px solid var(--accent)}
    svg{display:block;width:${width}px;min-width:${width}px;height:auto;max-width:none}
    .dark{display:none}
    @media(prefers-color-scheme:dark){:root{color-scheme:dark;--paper:#18181b;--ink:#f4f4f5;--accent:#b9a0ff}.light{display:none}.dark{display:block}}
    :root:has(#light:target){color-scheme:light;--paper:#fafafa;--ink:#18181b;--accent:#6d28d9}
    :root:has(#light:target) .light{display:block}:root:has(#light:target) .dark{display:none}
    :root:has(#dark:target){color-scheme:dark;--paper:#18181b;--ink:#f4f4f5;--accent:#b9a0ff}
    :root:has(#dark:target) .light{display:none}:root:has(#dark:target) .dark{display:block}
    nav{margin-top:12px;display:flex;flex-wrap:wrap;gap:8px 20px}a{color:var(--accent);text-underline-offset:3px}
    @media print{main{padding:0}.diagram-container{overflow:visible}nav{display:none}}
  </style>
</head>
<body>
<span id="light" hidden></span><span id="dark" hidden></span>
<main>
  <div class="diagram-container" tabindex="0" role="region" aria-label="${escapeHtml(title)}; scroll horizontally on smaller screens">
    <div class="light">${exports.light}</div>
    <div class="dark">${exports.dark}</div>
  </div>
  <nav aria-label="Diagram files"><a href="${slug}.excalidraw" download>Editable Excalidraw</a><a href="${slug}.light.svg">Light SVG</a><a href="${slug}.dark.svg">Dark SVG</a></nav>
</main>
</body>
</html>
`;
}

async function verifyWrapper(page, slug) {
  await page.setViewportSize({ width: 900, height: 1000 });
  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme });
    for (const override of ['', 'light', 'dark']) {
      await page.goto(`${server.url}diagrams/${slug}.html${override ? `#${override}` : ''}`);
      const state = await page.evaluate(() => {
        const visible = [...document.querySelectorAll('.diagram-container svg')]
          .filter(svg => svg.getBoundingClientRect().width > 0);
        const svg = visible[0];
        const labelledby = svg?.getAttribute('aria-labelledby')?.split(' ') || [];
        return {
          count: visible.length, theme: svg?.parentElement.className,
          accessible: svg?.getAttribute('role') === 'img' &&
            labelledby.length === 2 && labelledby.every(id => document.getElementById(id)?.textContent),
          scripts: document.scripts.length,
        };
      });
      if (state.count !== 1 || state.theme !== (override || colorScheme) || !state.accessible || state.scripts) {
        throw new Error(`${slug}: theme/accessibility/static wrapper failed: ${JSON.stringify(state)}`);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const scrollRegion = page.locator('.diagram-container');
  const localScroll = await scrollRegion.evaluate(region =>
    region.scrollWidth === 640 && region.clientWidth < 640 &&
    document.documentElement.scrollWidth === window.innerWidth);
  if (!localScroll) throw new Error(`${slug}: horizontal overflow must stay local`);
  await scrollRegion.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('.diagram-container').scrollLeft > 0);
}
