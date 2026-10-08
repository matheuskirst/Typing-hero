import { injectable, inject } from "tsyringe";
import { supabaseClient } from "../supabase/supabase.ts";
import { success } from "zod";
import { fa } from "zod/locales";

@injectable()
class LeaderboardService {
    constructor(@inject("SupabaseClient") private readonly supabase: typeof supabaseClient) {}

    async getAll(
        songKey: any | undefined,
        orderBy: any | undefined,
        ascending: any | undefined
    ) {
        let query = this.supabase
            .from('leaderboard')
            .select('id, song_key, player, rank, wpm, score')

        if (songKey) {
            query = query.eq('song_key', songKey)
        }

        if (orderBy) {
            query = query.order(orderBy ?? 'score', { ascending: ascending ?? false })
        }

        const { data, error } = await query;

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data: data };
    }

    async getOne(userId: string, songKey: string) {
        const { data, error } = await this.supabase
            .from('leaderboard')
            .select('id, score, wpm')
            .eq("user_id", userId)
            .eq("song_key", songKey)
            .maybeSingle()

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data: data };
    }

    async update() {

    }
}

export default LeaderboardService;
