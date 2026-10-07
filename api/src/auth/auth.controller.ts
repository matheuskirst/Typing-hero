import { injectable, inject } from "tsyringe";
import AuthService from "./auth.service.ts";
import { type Response } from "express"
import { type LoginDto, type SignupDto } from "./auth.schemas.ts";
import { StatusCodes } from "http-status-codes";

@injectable()
class AuthController {
    constructor(@inject("AuthService") private readonly authService: AuthService) {}

    login = async (req: LoginDto, res: Response) => {
        // const result = await this.authService.login(req.body);

        res.status(StatusCodes.OK).send(req)
    }

    signup = async (req: SignupDto, res: Response) => {
        // const result = await this.authService.signup(req.body);

        res.status(StatusCodes.OK).send(req)
    }
}

export default AuthController;
