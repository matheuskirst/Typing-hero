import { injectable, inject } from "tsyringe";
import { supabaseClient } from "../supabase/supabase.ts";

@injectable()
class LeaderboardService {
    constructor(@inject("SupabaseClient") private readonly supabase: typeof supabaseClient) {}

    async getAll() {
        const { data, error } = await this.supabase 
            .from('leaderboard')
            .select('id, score, wpm');

        if (error) {
            return error;
        }

        return data;
    }

    async getOne(userId: string, songKey: string) {
        const { data, error } = await this.supabase
            .from('leaderboard')
            .select('id, score, wpm')
            .eq("user_id", userId)
            .eq("song_key", songKey)
            .maybeSingle()

        if (error) {
            return error;
        }

        return data;
    }

    async update() {

    }
}

export default LeaderboardService;
