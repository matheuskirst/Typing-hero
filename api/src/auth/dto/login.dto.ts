import * as z from 'zod';

const LoginDto = z.object({
    email: z.email().trim().nonempty(),
    password: z.string().trim().nonempty(),
})

export default LoginDto
