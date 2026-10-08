import { container } from "tsyringe";
import LeaderboardController from "./leaderboard.controller.ts";
import express, { type Express } from "express";

const leaderboardController = container.resolve(LeaderboardController);
const leaderboardRoutes = express.Router();

leaderboardRoutes.get('/', leaderboardController.getAll);
leaderboardRoutes.get('/me', leaderboardController.currentUserRecord);
leaderboardRoutes.post('/save', leaderboardController.saveRecord);

export default leaderboardRoutes
