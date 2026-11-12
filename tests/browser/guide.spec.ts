import { test, expect } from '@playwright/test';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { chapters, coursePath, legacyRoutes, parts } from '../../src/course';

const lessons = ['understand', 'controls', 'planning', 'implementation', 'operate', 'reporting'];
const shots = process.env.SCREENSHOT_DIR || 'test-results/screenshots';

test('visual-first lessons, editable downloads, base paths and themed rendering', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await mkdir(shots, { recursive: true });

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['./', ...lessons.map((lesson) => `${lesson}/`), 'identify-needs/', 'sources/', ...chapters.filter(chapter => chapter.part === 4).map(chapter => `${chapter.path}/`)]) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page).toHaveTitle(/AI Credits Learning Guide/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      if (await page.locator('.diagram-section').count()) {
        expect(await page.evaluate(() => {
          const visual = document.querySelector('.diagram-section')!;
          return Boolean(visual.compareDocumentPosition(document.querySelector('.prose')!) & Node.DOCUMENT_POSITION_FOLLOWING);
        })).toBe(true);
        await expect(page.locator('iframe')).toHaveCount(0);
        for (const theme of ['light', 'dark']) {
          await page.emulateMedia({ colorScheme: theme === 'dark' ? 'light' : 'dark' });
          await page.getByLabel('Color theme').selectOption(theme);
          const visibleImages = page.locator(`.diagram-${theme}`);
          for (const image of await visibleImages.all()) {
            await expect(image).toBeVisible();
            await expect(image).toHaveAttribute('src', new RegExp(`\\.${theme}\\.svg$`));
            await expect.poll(() => image.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
          }
          await expect(page.locator(`.diagram-${theme === 'dark' ? 'light' : 'dark'}`).first()).toBeHidden();
          for (const link of await page.locator('[data-diagram-link]').all()) {
            await expect(link).toHaveAttribute('href', new RegExp(`#${theme}$`));
          }
          if (width === 390) {
            const region = page.locator('.diagram-scroll').first();
            const image = region.locator('img:visible');
            expect((await image.boundingBox())!.width).toBeLessThanOrEqual(await region.evaluate((el) => el.clientWidth));
            const zoom = page.locator('[data-diagram-size]').first();
            await zoom.click();
            await expect(zoom).toHaveAttribute('aria-pressed', 'true');
            await expect.poll(() => region.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
            await region.scrollIntoViewIfNeeded();
            await region.focus();
            await page.keyboard.press('ArrowRight');
            await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
            await zoom.click();
            await expect(zoom).toHaveAttribute('aria-pressed', 'false');
            await expect.poll(() => region.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
          }
          await page.evaluate(() => document.fonts.ready);
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({ path: `${shots}/${path.replaceAll('/', '-').replace(/-$/, '')}-${width}-${theme}.png`, fullPage: true });
        }
      }

      const links = await page.locator('article a[href^="/"]').evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')!));
      for (const link of links) {
        expect(link).toMatch(/^\/ai-credits-guide\//);
        const response = await page.request.get(link.split('#')[0]);
        expect(response.status(), link).toBe(200);
        if (link.endsWith('.excalidraw')) {
          expect((await response.json()).type).toBe('excalidraw');
        }
        if (link.includes('#') && !link.includes('.html#')) {
          const id = link.split('#')[1];
          expect(await response.text(), link).toContain(`id="${id}"`);
        }
      }
    }
  }
  expect(errors).toEqual([]);
});

test('course index links to the neutral needs assessment and preserves legacy URLs', async ({ page }) => {
  await mkdir(shots, { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['light', 'dark']) {
      await page.goto('./');
      await page.getByLabel('Color theme').selectOption(theme);
      await expect(page.getByRole('navigation', { name: 'Guide chapters', includeHidden: true })).not.toContainText('For sellers');
      const path = page.locator('.course-outline a').filter({ hasText: 'Identify what you need' });
      await expect(path).toHaveAttribute('href', `/ai-credits-guide/${coursePath('identify-needs')}/`);
      await page.screenshot({ path: `${shots}/start-${width}-${theme}.png`, fullPage: true });
      await path.click();
      await expect(page).toHaveURL(new RegExp(`/ai-credits-guide/${coursePath('identify-needs')}/?$`));
      await expect(page.locator('h1')).toHaveText('2.2 Identify what you need');
      await expect(page.locator('article')).toContainText('whether you administer an enterprise or help one plan');
      await expect(page.getByRole('columnheader', { name: 'Question to resolve' })).toBeVisible();
      await expect(page.locator('article')).not.toContainText('Ask the customer');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `${shots}/identify-needs-${width}-${theme}.png`, fullPage: true });
    }
  }
  for (const [from, to] of Object.entries(legacyRoutes)) {
    await page.goto(`${from.slice(1)}/`);
    await expect(page).toHaveURL(new RegExp(`/ai-credits-guide${to}$`));
  }
});

test('full course outline and previous/next chain span all parts without the appendix', async ({ page }) => {
  await page.goto('./');
  const outline = page.getByRole('navigation', { name: 'Guide chapters' });
  await expect(outline.locator('.course-part')).toHaveCount(parts.length);
  await expect(outline.locator('.chapter-pages a')).toHaveCount(chapters.length);
  await expect(page.locator('.reader-path')).toHaveCount(0);
  await expect(page.locator('.course-outline a')).toHaveCount(chapters.length);
  let previousPath = '/ai-credits-guide/';
  for (const chapter of chapters) {
    const next = page.locator('.pagination a[rel="next"]');
    await expect(next).toHaveAttribute('href', `/ai-credits-guide/${chapter.path}/`);
    await next.click();
    await expect(page).toHaveURL(new RegExp(`/ai-credits-guide/${chapter.path}/$`));
    await expect(page.locator('h1')).toContainText(`${chapter.number} `);
    await expect(page.locator('.pagination a[rel="prev"]')).toHaveAttribute('href', previousPath);
    await expect(outline.locator('[aria-current="page"]')).toHaveCount(1);
    await expect(outline.locator('[aria-current="page"]')).toHaveAttribute('href', `/ai-credits-guide/${chapter.path}/`);
    await expect(outline.locator('.chapter-pages a')).toHaveCount(chapters.length);
    if (chapter.kind === 'lesson') {
      const checks = page.locator('.self-check details');
      expect(await checks.count()).toBeGreaterThanOrEqual(2);
      expect(await checks.count()).toBeLessThanOrEqual(3);
      for (const check of await checks.all()) {
        await expect(check.locator('p')).toBeHidden();
        await check.locator('summary').click();
        await expect(check.locator('p')).toBeVisible();
      }
    } else if (chapter.kind === 'overview') {
      await expect(page.locator('.course-outline a')).toHaveCount(parts[chapter.part - 1].pages.length - 1);
    } else {
      await expect(page.getByRole('heading', { name: 'Key Takeaways' })).toBeVisible();
    }
    previousPath = `/ai-credits-guide/${chapter.path}/`;
  }
  await expect(page.locator('.pagination a[rel="next"]')).toHaveCount(0);
  await expect(page.locator('.pagination .next')).toHaveAttribute('href', '/ai-credits-guide/');
  await page.goto('sources/');
  await expect(page.locator('.pagination a[rel]')).toHaveCount(0);
  await expect(page.locator('.pagination .next')).toHaveAttribute('href', '/ai-credits-guide/');
  await page.setViewportSize({ width: 390, height: 900 });
  await page.locator('.chapter-nav > summary').click();
  await expect(outline.locator('.chapter-pages a')).toHaveCount(chapters.length);
  await expect(outline.getByRole('link', { name: 'Sources & release status' })).toHaveAttribute('aria-current', 'page');
  await outline.getByRole('link', { name: '1.2 Follow the credits', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('1.2 Follow the credits');
});

test('course index, overview, chapter self-check and summary render in both themes and widths', async ({ page }) => {
  await mkdir(shots, { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['light', 'dark']) {
      for (const [name, id] of [
        ['course-index', 'start'], ['course-overview', 'part-1-overview'],
        ['course-chapter', 'understand'], ['course-summary', 'part-1-summary'],
      ]) {
        await page.goto(id === 'start' ? './' : `${coursePath(id)}/`);
        await page.getByLabel('Color theme').selectOption(theme);
        if (id === 'understand') {
          await page.locator('.self-check summary').first().click();
          await expect(page.locator('.self-check details[open] p')).toBeVisible();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.evaluate(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          return document.fonts.ready;
        });
        await page.screenshot({ path: `${shots}/${name}-${width}-${theme}.png`, fullPage: true });
        if (id === 'understand') {
          await page.locator('.self-check').screenshot({ path: `${shots}/course-self-check-${width}-${theme}.png`, style: '.topbar{visibility:hidden}' });
        }
      }
    }
  }
});

test('later chapters keep the active desktop sidebar link visible without scrolling the page', async ({ page }) => {
  await mkdir(shots, { recursive: true });
  for (const [width, height] of [[1280, 720], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    for (const [name, id] of [
      ['visualise-overview', 'part-4-overview'], ['visualise-summary', 'part-4-summary'],
    ]) {
      for (const theme of ['light', 'dark']) {
        await page.goto(`${coursePath(id)}/`);
        await page.getByLabel('Color theme').selectOption(theme);
        await page.evaluate(() => document.fonts.ready);
        const sidebar = (await page.locator('.sidebar').boundingBox())!;
        const active = (await page.locator('.chapter-nav [aria-current="page"]').boundingBox())!;
        expect(active.y).toBeGreaterThanOrEqual(sidebar.y);
        expect(active.y + active.height).toBeLessThanOrEqual(sidebar.y + sidebar.height);
        expect(await page.evaluate(() => window.scrollY)).toBe(0);
        if (width === 1440) {
          await page.screenshot({ path: `${shots}/${name}-viewport-${width}-${theme}.png`, fullPage: false });
        }
      }
    }
  }
});

test('visualisation overview, GitHub chapter and summary render in both themes and widths', async ({ page }) => {
  await mkdir(shots, { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ['light', 'dark']) {
      for (const [name, id] of [
        ['visualise-overview', 'part-4-overview'], ['visualise-chapter', 'github-insights'],
        ['visualise-summary', 'part-4-summary'],
      ]) {
        await page.goto(`${coursePath(id)}/`);
        await page.getByLabel('Color theme').selectOption(theme);
        if (id === 'github-insights') {
          await page.locator('.self-check summary').first().click();
          await expect(page.locator('.self-check details[open] p')).toBeVisible();
        }
        if (id === 'part-4-overview') {
          await expect(page.locator(`img[data-diagram="visualisation-map"].diagram-${theme}`)).toBeVisible();
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.evaluate(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          return document.fonts.ready;
        });
        await page.screenshot({ path: `${shots}/${name}-${width}-${theme}.png`, fullPage: true });
      }
    }
  }
});

test('credit-jar connects shared cookies, personal limits and buying extras', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('controls/');
  const jar = page.locator('.credit-jar');
  const situation = (id: string) => jar.locator(`input[value="${id}"]`);
  const result = jar.locator('[data-jar-result]');
  await expect(result).toHaveText('Blocked by the user-level budget');
  await expect(jar.locator('.pool-cookies')).toHaveCSS('opacity', '1');
  await expect(jar.locator('[data-jar-eaten]')).toHaveText('2');
  await expect(jar.locator('.second-snack')).toHaveCSS('opacity', '1');
  await expect(jar.locator('.next-cookie')).toHaveCSS('opacity', '0');
  await expect(jar.locator('.next-cookie')).toHaveCSS('transition-duration', '0s');
  await situation('ulb').focus();
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('Tab');
  await expect(result).toHaveText('Served from the shared pool');
  await expect(jar.locator('.next-cookie')).toHaveCSS('opacity', '1');
  await expect(jar.locator('[data-jar-eaten]')).toHaveText('1');
  await expect(jar.locator('.second-snack')).toHaveCSS('opacity', '0');
  await expect(jar.locator('[data-jar-org]')).toHaveText('Hard stop reached');
  await expect(jar.locator('[data-jar-shopping]')).toContainText('Not needed');
  for (const [id, text, reason] of [
    ['metered', 'Served as metered usage', ''],
    ['policy', 'Blocked by the paid-usage policy', 'policy'],
    ['org', 'Blocked by the organization budget', 'org'],
    ['enterprise', 'Blocked by the enterprise cap', 'enterprise'],
  ]) {
    await situation(id).check();
    await expect(result).toHaveText(text);
    await expect(jar.locator('.pool-cookies')).toHaveCSS('opacity', '0');
    await expect(jar.locator('[data-jar-supply]')).toHaveText('The jar is empty');
    await expect(jar.locator('.next-cookie')).toHaveCSS('opacity', id === 'metered' ? '1' : '0');
    await expect(jar.locator('[data-jar-eaten]')).toHaveText('1');
    if (reason) await expect(jar.locator(`[data-jar-${reason}]`)).toHaveText(reason === 'policy' ? 'Disabled' : 'Hard stop reached');
  }
  await mkdir(shots, { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      await page.getByLabel('Color theme').selectOption(theme);
      await expect(jar.locator('.jar-glass')).toHaveCSS('fill',
        await jar.evaluate(el => getComputedStyle(el).backgroundColor));
      for (const id of ['ulb', 'metered', 'enterprise']) {
        await situation(id).check();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await jar.screenshot({ path: `${shots}/credit-jar-${id}-${width}-${theme}.png`, style: '.topbar{visibility:hidden}' });
      }
    }
  }
  const label = jar.locator('.shared-jar>strong');
  expect(await label.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(14);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(jar.locator('.next-cookie')).toHaveCSS('transition-duration', '0.3s');
});

test('credit-jar keeps its explanation without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/ai-credits-guide/controls/');
  const jar = page.locator('.credit-jar');
  await expect(jar.getByRole('group', { name: 'Try a situation' })).toBeHidden();
  await expect(jar.getByRole('img', { name: /One cookie jar/ })).toBeVisible();
  await expect(jar.locator('[data-jar-result]')).toHaveText('Blocked by the user-level budget');
  await expect(jar.locator('noscript dt').nth(3)).toHaveText('Jar empty; buying extras is switched off');
  await expect(jar.locator('noscript dt').nth(5)).toHaveText('Jar empty; enterprise cap reached');
  const check = page.locator('.self-check details').first();
  await expect(check.locator('p')).toBeHidden();
  await check.locator('summary').click();
  await expect(check.locator('p')).toBeVisible();
  await context.close();
});

test('theme persistence, system updates and narrow-to-wide navigation', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByLabel('Color theme').selectOption('light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByLabel('Color theme').selectOption('system');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.chapter-nav')).not.toHaveAttribute('open');
  await page.locator('.chapter-nav > summary').click();
  await expect(page.getByRole('navigation', { name: 'Guide chapters' })).toBeVisible();
  await page.locator('.chapter-nav > summary').click();
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.locator('.chapter-nav')).toHaveAttribute('open');
  await expect(page.getByRole('navigation', { name: 'Guide chapters' })).toBeVisible();
});

test('every full-size diagram overrides the opposite OS theme', async ({ page }) => {
  const sources = (await readdir('public/diagrams')).filter((name) => name.endsWith('.excalidraw'));
  expect(sources.length).toBeGreaterThan(0);
  for (const source of sources) {
    const slug = source.replace('.excalidraw', '');
    for (const theme of ['light', 'dark']) {
      await page.emulateMedia({ colorScheme: theme === 'dark' ? 'light' : 'dark' });
      await page.goto(`diagrams/${slug}.html#${theme}`);
      await expect(page.locator('body')).toHaveCSS('background-color', theme === 'dark' ? 'rgb(24, 24, 27)' : 'rgb(250, 250, 250)');
      const svg = page.locator('svg[role="img"]:visible');
      await expect(svg).toHaveCount(1);
      expect(await svg.locator('title').textContent()).toBeTruthy();
      expect(await svg.locator('desc').textContent()).toBeTruthy();
    }
  }
});

test('branded home keeps readable light/dark colors without web-font downloads', async ({ page }) => {
  const fontRequests: string[] = [];
  page.on('request', request => {
    if (request.resourceType() === 'font') fontRequests.push(request.url());
  });
  await mkdir(shots, { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./');
    await expect(page.getByRole('heading', { name: 'Learn to budget GitHub AI credits', exact: true })).toBeVisible();
    for (const theme of ['light', 'dark']) {
      await page.emulateMedia({ colorScheme: theme === 'dark' ? 'light' : 'dark' });
      await page.getByLabel('Color theme').selectOption(theme);
      const colors = await page.evaluate(() => {
        const bg = getComputedStyle(document.body).backgroundColor;
        return {
          bg,
          text: getComputedStyle(document.querySelector('.lede')!).color,
          accent: getComputedStyle(document.querySelector('.title-emphasis')!).color,
          link: getComputedStyle(document.querySelector('.prose p a')!).color,
        };
      });
      for (const foreground of [colors.text, colors.accent, colors.link]) {
        expect(contrast(foreground, colors.bg)).toBeGreaterThanOrEqual(4.5);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `${shots}/home-${width}-${theme}.png`, fullPage: true });
    }
  }
  expect(fontRequests).toEqual([]);
});

function contrast(a: string, b: string) {
  const luminance = (color: string) => {
    const [r, g, blue] = color.match(/\d+/g)!.slice(0, 3).map(Number).map(value => {
      const channel = value / 255;
      return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
    });
    return .2126 * r + .7152 * g + .0722 * blue;
  };
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}

test('monospace labels resolve to available platform fonts rather than Courier', async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => document.fonts.ready);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument');
  const results: Record<string, { familyName: string; glyphCount: number }[]> = {};
  for (const selector of ['.eyebrow', '.page-meta', '.edition', '.toc > div']) {
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
    const { fonts }: { fonts: { familyName: string; glyphCount: number }[] } =
      await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
    expect(fonts.length, selector).toBeGreaterThan(0);
    for (const font of fonts) expect(font.familyName, selector).not.toMatch(/^Courier/i);
    results[selector] = fonts;
  }
  await mkdir(shots, { recursive: true });
  await writeFile(`${shots}/platform-fonts.json`, JSON.stringify(results, null, 2));
  await cdp.detach();
});
