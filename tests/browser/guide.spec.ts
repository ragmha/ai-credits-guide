import { test, expect } from '@playwright/test';
import { mkdir, readdir } from 'node:fs/promises';

const lessons = ['understand', 'controls', 'planning', 'implementation', 'operate', 'reporting'];
const shots = process.env.SCREENSHOT_DIR || 'test-results/screenshots';

test('visual-first lessons, editable downloads, base paths and themed rendering', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await mkdir(shots, { recursive: true });

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['./', ...lessons.map((lesson) => `${lesson}/`), 'sellers/', 'sources/']) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page).toHaveTitle(/AI Credits Learning Guide/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      if (lessons.some((lesson) => path === `${lesson}/`)) {
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
          await page.screenshot({ path: `${shots}/${path.replace('/', '')}-${width}-${theme}.png`, fullPage: true });
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
