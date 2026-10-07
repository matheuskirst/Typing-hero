import { type Request, type Response } from "express"
import supabase from "../supabase/supabase.ts";
import AuthService from "./auth.service.ts";
import { LoginSchema, type LoginDto } from "./schema/login.schema.ts";
import { SignupSchema, type SignupDto } from "./schema/singup.schema.ts";

class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    async login(req: Request, res: Response) {
        const loginSchema = LoginSchema.safeParse(req.body);
        if (!loginSchema.success) {
            res.send(loginSchema.error)
            return
        }

        const result = await this.authService.login(loginSchema.data);

        res.send("Logging in...")
    }

    async signup(req: Request, res: Response) {
        const signupSchema = SignupSchema.safeParse(req.body)
        if (!signupSchema.success) {
            res.send(signupSchema.error)
            return
        }

        const result = await this.authService.signup(signupSchema.data);

        res.send("Signing up...")
    }
}

export default AuthController;
