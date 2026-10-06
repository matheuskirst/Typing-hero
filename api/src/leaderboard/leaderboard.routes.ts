import express, { type Express } from "express";
import LeaderboardController from "./leaderboard.controller.ts";

const leaderboardRoutes = express.Router();
const leaderboardController = new LeaderboardController

leaderboardRoutes.get('/', leaderboardController.getAll);
leaderboardRoutes.get('/me', leaderboardController.currentUserRecord);
leaderboardRoutes.post('/save', leaderboardController.saveRecord);

export default leaderboardRoutes
