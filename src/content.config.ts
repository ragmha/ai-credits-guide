import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guide = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    section: z.string(),
    order: z.number(),
    description: z.string(),
    verified: z.string(),
    sources: z.array(z.string().url()).min(1),
    diagram: z.enum(['credit-lifecycle', 'layered-guardrails', 'operating-loop', 'attribution-pipeline']).optional(),
  }),
});

export const collections = { guide };
