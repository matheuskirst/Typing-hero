import { inject, injectable } from "tsyringe";
import { supabaseClient } from "../supabase/supabase.ts";
import { type LoginDto, type SignupDto } from "./auth.schemas.ts";

@injectable()
class AuthService {
    constructor(@inject("SupabaseClient") private readonly supabase: typeof supabaseClient) {}

    async login(loginDto: LoginDto) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: loginDto.email,
            password: loginDto.password,
        });

        if (error) {
            return error
        }

        return data
    }

    async signup(signupDto: SignupDto) {
        const { data, error } = await this.supabase.auth.signUp({
            email: signupDto.email,
            password: signupDto.password,
            options: {
                data: {
                    display_name: signupDto.nickname,
                },
            },
        });

        if (error) {
            return error
        }

        return data
    }
}

export default AuthService
