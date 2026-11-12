export const parts = [
  { title: 'Concepts', pages: ['part-1-overview', 'understand', 'controls', 'part-1-summary'] },
  { title: 'Plan and decide', pages: ['part-2-overview', 'identify-needs', 'planning', 'part-2-summary'] },
  { title: 'Implement and operate', pages: ['part-3-overview', 'implementation', 'operate', 'reporting', 'part-3-summary'] },
  { title: 'How to visualise', pages: ['part-4-overview', 'github-insights', 'visualise-exports', 'azure-cost-tools', 'grafana-local', 'part-4-summary'] },
];

export const chapters = parts.flatMap((part, partIndex) => part.pages.map((id, index) => {
  const kind = id.endsWith('-overview') ? 'overview' : id.endsWith('-summary') ? 'summary' : 'lesson';
  return {
    id, kind, part: partIndex + 1, partTitle: part.title,
    number: `${partIndex + 1}.${index + 1}`,
    path: `part-${partIndex + 1}/${index + 1}-${kind === 'lesson' ? id : kind}`,
  };
}));

export function coursePath(id: string) {
  if (id === 'start') return '';
  if (id === 'sources') return 'sources';
  const chapter = chapters.find(entry => entry.id === id);
  if (!chapter) throw new Error(`Unknown course page: ${id}`);
  return chapter.path;
}

export const legacyRoutes = Object.fromEntries([
  ...chapters.filter(chapter => chapter.kind === 'lesson').map(chapter => [`/${chapter.id}`, `/${chapter.path}/`]),
  ['/sellers', `/${coursePath('identify-needs')}/`],
]);
