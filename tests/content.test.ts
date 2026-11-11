import { expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';

test('guide pages have source provenance and preview mentions carry caution', async () => {
  const files = await readdir('src/content/guide');
  const registry = await readFile('src/content/guide/sources.md', 'utf8');
  const previewFeatures = registry.split('\n')
    .filter((line) => line.startsWith('|') && line.includes('public preview - use with caution'))
    .map((line) => line.split('|')[1].trim().toLowerCase());
  expect(files.filter((file) => file.endsWith('.md')).length).toBe(9);
  for (const file of files) {
    const text = await readFile(`src/content/guide/${file}`, 'utf8');
    expect(text).toMatch(/verified: "\d{4}-\d{2}-\d{2}"/);
    expect(text).toMatch(/sources:\n  - https:\/\//);
    expect(text).toContain('## What you will learn');
    for (const feature of previewFeatures) {
      for (const line of text.split('\n').filter((line) => line.toLowerCase().includes(feature))) {
        expect(line.toLowerCase()).toContain('public preview - use with caution');
      }
    }
  }
});
