import * as z from 'zod';

const SignupDto = z.object({
    nickname: z.string().min(3).max(50).trim().optional(),
    email: z.email().nonempty().trim(),
    password: z.string().nonempty().min(6).max(50).trim(),
})

export default SignupDto
