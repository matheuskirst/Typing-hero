export async function renderLeaderboardAsync(songKey, metric, scores) {
  metric;
  const container = document.getElementById("leaderboardContainer");
  if (!container) return;

  const songTitle = typeof MUSIC_LIBRARY !== "undefined" && MUSIC_LIBRARY[songKey]
    ? MUSIC_LIBRARY[songKey].title
    : songKey;

  const headerHtml = `
    <div class="leaderboard-header">
      <div class="leaderboard-title">🏆 TOP PLACAR: ${songTitle}</div>
      <div class="leaderboard-toggle-buttons">
        <button 
          onclick="changeLeaderboardMetric('${songKey}', 'score')" 
          class="lb-btn ${metric === 'score' ? 'active' : ''}"
        >
          Pontos
        </button>
        <button 
          onclick="changeLeaderboardMetric('${songKey}', 'wpm')" 
          class="lb-btn ${metric === 'wpm' ? 'active' : ''}"
        >
          WPM
        </button>
      </div>
    </div>
  `;

  container.innerHTML = `${headerHtml}<div class="leaderboard-loading" style="padding: 10px; color: #888;">Carregando ranking...</div>`;

  if (!scores || scores.length === 0) {
    container.innerHTML = `
      ${headerHtml}
      <div class="empty-board" style="padding: 15px; text-align: center; color: #888;">
        Nenhuma pontuação registrada. Seja o primeiro!
      </div>
    `;
    return;
  }

  const rowsHtml = scores.map((item, index) => {
    const isTopThree = index < 3 ? `top-${index + 1}` : '';
    const safePlayer = escapeHtml(item.player || "Anônimo");
    const safeRank = escapeHtml(item.rank || "D");
    const safeScore = Number(item.score || 0).toLocaleString("pt-BR");
    const safeWpm = Number(item.wpm || 0);

    return `
      <tr class="${isTopThree}">
        <td>#${index + 1}</td>
        <td><strong>${safePlayer}</strong></td>
        <td><span class="rank-badge rank-${safeRank}">${safeRank}</span></td>
        <td style="${metric === 'wpm' ? 'color: #00ffcc; font-weight: bold;' : ''}">${safeWpm} WPM</td>
        <td style="${metric === 'score' ? 'color: #00ffcc; font-weight: bold;' : ''}">${safeScore} pts</td>
      </tr>
    `;
  }).join("");

  // max-height de 180px força a rolagem aparecer mesmo com poucas linhas
  container.innerHTML = `
    ${headerHtml}
    <div class="leaderboard-table-wrapper" style="max-height: 180px; overflow-y: scroll; overflow-x: hidden;">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>JOGADOR</th>
            <th>RANK</th>
            <th>WPM ${metric === 'wpm' ? '▼' : ''}</th>
            <th>PONTOS ${metric === 'score' ? '▼' : ''}</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}
