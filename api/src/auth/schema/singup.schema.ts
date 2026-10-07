import type { Sign } from 'node:crypto';
import * as z from 'zod';

export const SignupSchema = z.object({
    nickname: z.string().min(3).max(50).trim().optional(),
    email: z.email().nonempty().trim(),
    password: z.string().nonempty().min(6).max(50).trim(),
})

export type SignupDto = z.infer<typeof SignupSchema>;
