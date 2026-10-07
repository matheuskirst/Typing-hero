import supabase from "../supabase/supabase.ts";
import { type LoginDto } from "./schema/login.schema.ts";
import { type SignupDto } from "./schema/singup.schema.ts";

class AuthService {
    constructor() {}

    async login(loginDto: LoginDto) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginDto.email,
                password: loginDto.password,
            });
    
            if (error) {
                return error
            }
    
            return data

        }
        catch {

        }
    }

    async signup(signupDto: SignupDto) {
        try {
            const { data, error } = await supabase.auth.signUp({
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
        catch {
            
        }
    }
}

export default AuthService
