import { expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { chapters } from '../src/course';

test('guide pages have source provenance and preview mentions carry caution', async () => {
  const files = await readdir('src/content/guide');
  const registry = await readFile('src/content/guide/sources.md', 'utf8');
  const previewFeatures = registry.split('\n')
    .filter((line) => line.startsWith('|') && line.includes('public preview - use with caution'))
    .map((line) => line.split('|')[1].trim().toLowerCase());
  expect(files.filter((file) => file.endsWith('.md')).sort()).toEqual(
    ['start.md', 'sources.md', ...chapters.map(chapter => `${chapter.id}.md`)].sort(),
  );
  for (const file of files) {
    const text = await readFile(`src/content/guide/${file}`, 'utf8');
    expect(text).toMatch(/verified: "\d{4}-\d{2}-\d{2}"/);
    expect(text).toMatch(/sources:\n  - https:\/\//);
    if (file !== 'start.md' && !file.endsWith('-summary.md')) {
      expect(text).toContain('## What you will learn');
    }
    if (chapters.some(chapter => chapter.id === file.replace('.md', '') && chapter.kind === 'lesson')) {
      expect(text).toContain('checks:\n');
      expect(text.match(/  - question:/g)?.length).toBeGreaterThanOrEqual(2);
      expect(text.match(/  - question:/g)?.length).toBeLessThanOrEqual(3);
    }
    for (const feature of previewFeatures) {
      for (const line of text.split('\n').filter((line) => line.toLowerCase().includes(feature))) {
        expect(line.toLowerCase()).toContain('public preview - use with caution');
      }
    }
  }
});

test('visualisation pages retain their review date and register every source', async () => {
  const registry = await readFile('src/content/guide/sources.md', 'utf8');
  for (const chapter of chapters.filter(chapter => chapter.part === 4)) {
    const text = await readFile(`src/content/guide/${chapter.id}.md`, 'utf8');
    expect(text).toContain('verified: "2026-11-12"');
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)![1];
    const sources = [...frontmatter.matchAll(/^  - (https:\/\/.+)$/gm)].map(match => match[1]);
    expect(sources.length).toBeGreaterThan(0);
    for (const source of sources) expect(registry).toContain(`](${source})`);
  }
});
