import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.email().trim().nonempty(),
    password: z.string().trim().nonempty(),
})

export type LoginDto = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
    nickname: z.string().min(3).max(50).trim().optional(),
    email: z.email().nonempty().trim(),
    password: z.string().min(6).max(50).trim(),
})

export type SignupDto = z.infer<typeof SignupSchema>;
