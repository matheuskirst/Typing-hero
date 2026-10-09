import 'reflect-metadata'
import env from 'dotenv';
import 'dotenv/config';
import './container.ts';
import cors from 'cors';
import express, { type Express } from "express";
import authRoutes from "./auth/auth.routes.ts";
import leaderboardRoutes from './leaderboard/leaderboard.routes.ts';

async function bootstrap() {
    env.config({ path: '../.env' });
    const app: Express = express();

    app.use(express.json());
    app.use(cors({
        origin: process.env.APP_URL,
    }));

    app.use('/api/auth', authRoutes);
    app.use('/api/leaderboard', leaderboardRoutes)

    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(
            new Date().toLocaleDateString() + 
            `: Server is running on port ${port}...`
        )
    });
}

await bootstrap();
