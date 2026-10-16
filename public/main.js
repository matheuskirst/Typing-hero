import { fetchScoresAsync, saveScoreAsync } from './services/leaderboard-service.js'

async function loadHome() {
    const scores = await fetchScoresAsync();
}

await loadHome();
