import { z } from 'zod';

export const leadeboardQuerySchema = z.object({
    songKey: z.string().trim().optional(),
    orderBy: z.string().trim().optional(),

    ascending: z.string().trim().toLowerCase()
    .transform((val) => {
        if (val === 'true' || val === '1') return true;
        if (val === 'false' || val === '0') return false;
        return val;
    })
    .pipe(z.boolean())
    .optional()
    .default(false)
});
