import { z } from 'zod';

export const createLinkSchema = z.object({
    chainId: z.string().min(1, { message: 'Chain ID is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
    url: z.url({ message: 'Invalid URL format' }),
    note: z.string(),
});
