import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const diagram = z.enum([
  'credit-lifecycle', 'layered-guardrails', 'cost-center-controls',
  'cap-or-continuity', 'agent-meters', 'rollout-roadmap',
  'operating-loop', 'attribution-pipeline',
  'visualisation-map', 'grafana-dashboard',
]);

const guide = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    section: z.string(),
    order: z.number(),
    description: z.string(),
    verified: z.string(),
    sources: z.array(z.string().url()).min(1),
    diagram: diagram.optional(),
    scenarioDiagram: diagram.optional(),
    checks: z.array(z.object({ question: z.string(), answer: z.string() })).min(2).max(3).optional(),
  }),
});

export const collections = { guide };
