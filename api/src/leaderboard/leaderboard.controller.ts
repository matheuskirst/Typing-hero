import { type Request, type Response } from "express"
import supabase from "../supabase/supabase.ts";
import LeaderboardService from "./leaderboard.service.ts";

class LeaderboardController {
    constructor(
        private readonly leaderboardService: LeaderboardService,
    ) {}

    async getAll(req: Request, res: Response) {
        
        const result = await this.leaderboardService.getAll();

        res.send("Leaderboard players:")
    }

    async currentUserRecord(req: Request, res: Response) {
        
        const result = await this.leaderboardService.getOne("");

        res.send("Current user record:")
    }

    async saveRecord(req: Request, res: Response) {
        res.send("Saving record...")
    }
}

export default LeaderboardController;
