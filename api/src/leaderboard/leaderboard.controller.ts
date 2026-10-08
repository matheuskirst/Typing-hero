import { injectable, inject } from "tsyringe";
import LeaderboardService from "./leaderboard.service.ts";
import { type Request, type Response } from "express"
import { StatusCodes } from "http-status-codes";

@injectable()
class LeaderboardController {
    constructor(@inject("LeaderboardService") private readonly leaderboardService: LeaderboardService) {}

    getAll = async (req: Request, res: Response) => {
        const { songKey, orderBy, ascending } = req.query;

        const result = await this.leaderboardService.getAll(songKey, orderBy, ascending);

        if (!result.success) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
        }

        return res.send(result.data);
    };

    currentUserRecord = async (req: Request, res: Response) => {
        // const result = await this.leaderboardService.getOne();

        return res.send("Current user record:");
    };

    saveRecord = (req: Request, res: Response) => {
        return res.send("Saving record...");
    };
}

export default LeaderboardController;
