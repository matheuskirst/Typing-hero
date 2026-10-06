import env from 'dotenv';
import 'dotenv/config'
import express, { type Express } from "express";
import authRoutes from "./auth/auth.routes.ts";
import leaderboardRoutes from './leaderboard/leaderboard.routes.ts';

async function bootstrap() {
    env.config({ path: '../.env' });
    const app: Express = express();

    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/leaderboard', leaderboardRoutes)

    app.listen(process.env.PORT || 5000, () => {
        console.log(
            new Date().toLocaleDateString() + 
            `: Server is running on port ${process.env.PORT}...`
        )
    });
}

await bootstrap();
