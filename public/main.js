import { fetchScoresAsync, saveScoreAsync } from './services/leaderboard-service.js'

async function loadHome() {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const scores = await fetchScoresAsync();
    if (!scores) {
        let content = document.createElement('p');
        content.textContent = "Nenhum recorde encontrado!";
        leaderboardContainer.append(content);
        return;
    }

    let content = '';
    const leaderboardTable = document.createElement('table');
    leaderboardTable.className = 'leaderboard-table';
    let rows = `
    <tr>
        <th>#</th>
        <th>Jogador</th>
        <th>Rank</th>
        <th>WPM</th>
        <th>Pontos</th>
    </tr>
    `
    
    scores.forEach(score => {
        let row = `
        <tr>
            <td>${score.id}</td>
            <td>${score.player}</td>
            <td>${score.rank}</td>
            <td>${score.wpm}</td>
            <td>${score.score}</td>
        </tr>
        `
        rows += row;
    });
    
    leaderboardTable.innerHTML = rows;
    leaderboardContainer.append(leaderboardTable);
    return;
}

await loadHome();
