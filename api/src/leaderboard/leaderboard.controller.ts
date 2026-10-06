import { type Request, type Response } from "express"
import supabase from "../supabase/supabase.ts";

class LeaderboardController {
    constructor() {}

    async getAll(req: Request, res: Response) {
        // const { data, error } = await supabase
        //     .from('leaderboard')
        //     .select('id, score, wpm')
        //     .eq("song_key", "")

        res.send("Leaderboard players:")
    }

    async currentUserRecord(req: Request, res: Response) {
        // const { data, error } = await supabase
        //     .from('leaderboard')
        //     .select('id, score, wpm')
        //     .eq("user_id", "")
        //     .eq("song_key", "")
        //     .maybeSingle()

        res.send("Current user record:")
    }

    async saveRecord(req: Request, res: Response) {
        res.send("Saving record...")
    }
}

export default LeaderboardController;
