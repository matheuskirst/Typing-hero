import { injectable, inject } from "tsyringe";
import LeaderboardService from "./leaderboard.service.ts";
import { type Request, type Response } from "express"

@injectable()
class LeaderboardController {
    constructor(@inject("LeaderboardService") private readonly leaderboardService: LeaderboardService) {}

    getAll = async (req: Request, res: Response) => {
        const result = await this.leaderboardService.getAll();

        return res.send(result)
    }

    currentUserRecord = async (req: Request, res: Response) => {
        // const result = await this.leaderboardService.getOne();

        return res.send("Current user record:")
    }

    saveRecord = (req: Request, res: Response) => {
        return res.send("Saving record...")
    }
}

export default LeaderboardController;
