import { defineCollection, z } from 'astro:content';

const deliverableSchema = z.object({
  type: z.enum(['image', 'pdf', 'link', 'code']),
  url: z.string(),
  caption: z.string(),
});

const artifacts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    introduction: z.string(),
    description: z.string(),
    objective: z.string().optional(),
    process: z.string().optional(),
    tools: z.array(z.string()).optional().default([]),
    valueProposition: z
      .object({
        uniqueValue: z.string(),
        relevance: z.string(),
      })
      .optional(),
    references: z.array(z.string()).optional().default([]),
    deliverables: z.array(deliverableSchema).optional().default([]),
    thumbnail: z.string().optional(),
    featured: z.boolean().optional().default(false),
    interactive: z
      .enum([
        'algorithm-framework',
        'neural-network-slides',
        'ai-infrastructure-slides',
        'explainability-infographic',
        'model-selection-matrix',
      ])
      .optional(),
  }),
});

export const collections = { artifacts };
