import { type Request, type Response } from "express"
import supabase from "../supabase/supabase.ts";
import LoginDto from "./dto/login.dto.ts";
import SignupDto from "./dto/singup.dto.ts";

class AuthController {
    constructor() {}

    async login(req: Request, res: Response) {
        const loginDto = LoginDto.safeParse(req.body);
        if (!loginDto.success) {
            res.send(loginDto.error)
            return
        }

        // const { data, error } = await supabase.auth.signInWithPassword({
        //     email: loginDto.data.email,
        //     password: loginDto.data.password,
        // });

        // if (error) {
        //     res.send(error)
        //     return
        // }

        res.send("Logging in...")
    }

    async signup(req: Request, res: Response) {
        const signupDto = SignupDto.safeParse(req.body)
        if (!signupDto.success) {
            res.send(signupDto.error)
            return
        }

        // const { data, error } = await supabase.auth.signUp({
        //     email: signupDto.data.email,
        //     password: signupDto.data.password,
        //     options: {
        //         data: {
        //             display_name: signupDto.data.nickname,
        //         },
        //     },
        // });

        // if (error) {
        //     res.send(error)
        //     return
        // }

        res.send("Signing up...")
    }
}

export default AuthController;
