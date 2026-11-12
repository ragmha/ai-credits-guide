import { defineConfig } from 'astro/config';
import { legacyRoutes } from './src/course.ts';

const base = '/ai-credits-guide';

function projectLinks() {
  return (tree) => {
    function visit(node) {
      for (const key of ['href', 'src']) {
        const value = node.properties?.[key];
        if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
          const local = value.startsWith(`${base}/`) ? value.slice(base.length) : value;
          const boundary = local.search(/[?#]/);
          const path = boundary < 0 ? local : local.slice(0, boundary);
          const suffix = boundary < 0 ? '' : local.slice(boundary);
          node.properties[key] = `${base}${legacyRoutes[path.replace(/\/$/, '')] || path}${suffix}`;
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://ragmha.github.io',
  base,
  redirects: Object.fromEntries(Object.entries(legacyRoutes).map(([from, to]) => [from, `${base}${to}`])),
  markdown: { rehypePlugins: [projectLinks] },
});
