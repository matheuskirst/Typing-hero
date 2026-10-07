import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.email().trim().nonempty(),
    password: z.string().trim().nonempty(),
})

export type LoginDto = z.infer<typeof LoginSchema>;
