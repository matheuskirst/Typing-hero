import { injectable, inject } from "tsyringe";
import LeaderboardService from "./leaderboard.service.ts";
import { type Request, type Response } from "express"
import { StatusCodes } from "http-status-codes";
import { leadeboardQuerySchema } from "./leaderboard.schemas.ts";

@injectable()
class LeaderboardController {
    constructor(@inject("LeaderboardService") private readonly leaderboardService: LeaderboardService) {}

    getAll = async (req: Request, res: Response) => {
        const query = leadeboardQuerySchema.safeParse(req.query);
        const songKey = query.data?.songKey;
        const orderBy = query.data?.orderBy;
        const ascending = query.data?.ascending;

        const result = await this.leaderboardService.getAll(songKey, orderBy, ascending);

        if (!result.success) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
        }

        return res.send(result.data);
    };

    currentUserRecord = async (req: Request, res: Response) => {
        const result = await this.leaderboardService.getOne("", "");
        if (!result.success) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
        }

        return res.send(result.data);
    };

    saveRecord = (req: Request, res: Response) => {
        return res.send("Saving record...");
    };
}

export default LeaderboardController;
