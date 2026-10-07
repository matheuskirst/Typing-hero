import { container, Lifecycle } from "tsyringe";
import {supabaseClient} from "./supabase/supabase.ts";
import AuthService from "./auth/auth.service.ts";
import LeaderboardService from "./leaderboard/leaderboard.service.ts";

container.register(("SupabaseClient"), 
    { useValue: supabaseClient },
);

container.register(("AuthService"), 
    { useClass: AuthService },
    { lifecycle: Lifecycle.Singleton },
);

container.register(("LeaderboardService"), 
    { useClass: LeaderboardService },
    { lifecycle: Lifecycle.Singleton },
);
