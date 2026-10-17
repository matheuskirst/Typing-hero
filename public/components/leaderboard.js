import { fetchScoresAsync } from "../services/leaderboard-service.js";

export default async function createLeaderboard() {
    let leaderboardContainer = document.createElement('div');
    leaderboardContainer.id = 'leaderboard-container';

    let leaderboardTitle = document.createElement('h2');
    leaderboardTitle.innerText = 'Placar Global';
    leaderboardContainer.append(leaderboardTitle);

    let leaderBoardControls = document.createElement('div');
    leaderBoardControls.id = 'leaderboard-controls';

    let sortByScore = document.createElement('button');
    sortByScore.innerText = 'Score';
    let sortByWpm = document.createElement('button');
    sortByWpm.innerText = 'WMP';
    leaderBoardControls.append(sortByScore, sortByWpm)
    leaderboardContainer.append(leaderBoardControls);

    const scores = await fetchScoresAsync();

    if (!scores) {
        let noScoresFound = document.createElement('p');
        noScoresFound.innerText = 'Nenhum recorde encontrado!';
        return leaderboardContainer;
    }

    let leaderboardTable = document.createElement('table');
    leaderboardTable.id = 'leaderboard-table';

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
            <td>${scores.indexOf(score) + 1}</td>
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
    return leaderboardContainer;
}
