import { z } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(StatusCodes.BAD_REQUEST).send(result.error.issues);
        }

        req.body = result.data;
        next();
    }
}
