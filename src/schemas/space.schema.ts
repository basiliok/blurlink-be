import { z } from 'zod';

export const createSpaceSchema = z.object({
    userId: z.string().min(30, { message: 'User ID is required' }),
    name: z.string().min(1, { message: 'Space name is required' }),
    slug: z
        .string()
        .min(1, { message: 'Slug is required' })
        .regex(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase alphanumeric with hyphens only' }),
    note: z.string(),
});
