import { z } from 'zod';

export const createChainSchema = z.object({
    userId: z.string().min(30, { message: 'User ID is required' }),
    spaceId: z.string().min(30, { message: 'Space ID is required' }),
    chainName: z.string().min(1, { message: 'Chain name is required' }),
    position: z.number({ message: 'Position is required and must be a number' }),
    width: z.number({ message: 'Width is required and must be a number' }),
    height: z.number({ message: 'Height is required and must be a number' }),
    linkStyle: z.enum(['classic', 'modern', 'minimal'], {
        message: 'Link style must be classic, modern, or minimal',
    }),
    linkDirection: z.enum(['horizontal', 'vertical'], {
        message: 'Link direction must be horizontal or vertical',
    }),
    linkSize: z.enum(['small', 'medium', 'large'], {
        message: 'Link size must be small, medium, or large',
    }),
    note: z.string(),
});
