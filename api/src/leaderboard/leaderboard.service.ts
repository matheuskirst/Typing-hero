import supabase from "../supabase/supabase.ts";

class LeaderboardService {
    constructor() {}

    async getAll() {
        try {
            const { data, error } = await supabase
                .from('leaderboard')
                .select('id, score, wpm')
                .eq("song_key", "")

            if (error) {
                return error
            }

            return data
        }
        catch {
            
        }
    }

    async getOne(id: string) {
        try {
            const { data, error } = await supabase
                .from('leaderboard')
                .select('id, score, wpm')
                .eq("user_id", "")
                .eq("song_key", "")
                .maybeSingle()
    
            if (error) {
                return error
            }
    
            return data
        }
        catch {

        }
    }

    async update() {
        try {

        }
        catch {

        }
    }
}

export default LeaderboardService
