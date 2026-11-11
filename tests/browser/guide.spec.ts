import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('navigation, themes, diagrams, mobile containment and screenshots', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const shots = process.env.SCREENSHOT_DIR || 'test-results/screenshots';
  await mkdir(shots, { recursive: true });
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

  for (const [name, path] of [['home', './'], ['content', 'implementation/'], ['diagram', 'controls/']]) {
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    for (const theme of ['light', 'dark']) {
      await page.getByLabel('Color theme').selectOption(theme);
      await page.evaluate(() => document.fonts.ready);
      if (await page.locator('iframe').count()) {
        await page.locator('iframe').scrollIntoViewIfNeeded();
        await expect(page.frameLocator('iframe').locator('body')).toHaveCSS('background-color', theme === 'dark' ? 'rgb(24, 24, 27)' : 'rgb(250, 250, 250)');
        await page.evaluate(() => scrollTo(0, 0));
      }
      await page.screenshot({ path: `${shots}/${name}-${theme}.png`, fullPage: true });
    }
    const links = await page.locator('article a[href^="/"]').evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')!));
    for (const link of links) {
      const response = await page.request.get(link.split('#')[0]);
      expect(response.status(), link).toBe(200);
      expect(link).toMatch(/^\/ai-credits-guide\//);
    }
  }

  for (const slug of ['credit-lifecycle', 'layered-guardrails', 'operating-loop', 'attribution-pipeline']) {
    for (const theme of ['light', 'dark']) {
      await page.emulateMedia({ colorScheme: theme === 'dark' ? 'light' : 'dark' });
      await page.goto(`diagrams/${slug}.html#${theme}`);
      const colors = await page.locator('body').evaluate((body) => ({
        background: getComputedStyle(body).backgroundColor,
        color: getComputedStyle(body).color,
      }));
      expect(colors.background).not.toBe(colors.color);
      expect(colors.background).toBe(theme === 'dark' ? 'rgb(24, 24, 27)' : 'rgb(250, 250, 250)');
      const svg = page.locator('svg[role="img"]');
      await expect(svg).toHaveCount(1);
      expect(await svg.locator('title').textContent()).toBeTruthy();
      expect(await svg.locator('desc').textContent()).toBeTruthy();
      if (slug === 'layered-guardrails') {
        await page.screenshot({ path: `${shots}/standalone-diagram-${theme}.png`, fullPage: true });
      }
    }
  }
  await page.goto('controls/');
  await page.getByLabel('Color theme').selectOption('dark');
  const frame = page.locator('iframe');
  await expect(frame).toHaveAttribute('src', /#dark$/);
  await frame.scrollIntoViewIfNeeded();
  await expect(page.frameLocator('iframe').locator('svg[role="img"]')).toBeVisible();
  await expect(page.frameLocator('iframe').locator('body')).toHaveCSS('background-color', 'rgb(24, 24, 27)');
  await page.screenshot({ path: `${shots}/diagram-detail-dark.png` });
  await page.getByLabel('Color theme').selectOption('light');
  await expect(frame).toHaveAttribute('src', /#light$/);
  await expect(page.frameLocator('iframe').locator('svg[role="img"]')).toBeVisible();
  await expect(page.frameLocator('iframe').locator('body')).toHaveCSS('background-color', 'rgb(250, 250, 250)');
  await page.screenshot({ path: `${shots}/diagram-detail-light.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('controls/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('.chapter-nav')).not.toHaveAttribute('open');
  await page.locator('.chapter-nav > summary').click();
  await expect(page.getByRole('navigation', { name: 'Guide chapters' })).toBeVisible();
  await page.locator('iframe').scrollIntoViewIfNeeded();
  await expect(page.frameLocator('iframe').locator('svg[role="img"]')).toBeVisible();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `${shots}/mobile.png`, fullPage: true });
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.locator('.chapter-nav')).toHaveAttribute('open');
  await expect(page.getByRole('navigation', { name: 'Guide chapters' })).toBeVisible();
  expect(errors).toEqual([]);
});
