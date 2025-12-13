import { z } from 'zod';

export const signInSchema = z.object({
    email: z.email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password is required' }),
});
