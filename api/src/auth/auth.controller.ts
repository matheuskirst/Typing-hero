import { injectable, inject } from "tsyringe";
import AuthService from "./auth.service.ts";
import { type Request, type Response } from "express"
import { StatusCodes } from "http-status-codes";

@injectable()
class AuthController {
    constructor(@inject("AuthService") private readonly authService: AuthService) {}

    login = async (req: Request, res: Response) => {
        const result = await this.authService.login(req.body);

        if (!result.success) {
            return res.status(StatusCodes.UNAUTHORIZED).send(result.error)
        }

        res.status(StatusCodes.OK).send(result.data)
    }

    signup = async (req: Request, res: Response) => {
        const result = await this.authService.signup(req.body);

        if (!result.success) {
            return res.status(StatusCodes.UNAUTHORIZED).send(result.error)
        }

        res.status(StatusCodes.OK).send(result.data)
    }
}

export default AuthController;
