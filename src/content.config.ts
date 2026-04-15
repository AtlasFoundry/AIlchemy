import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['guide', 'prompt', 'demo', 'pma']),
    summary: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
  }),
});

export const collections = { posts };
