import { API_URL } from "../config.js";

async function fetchScoresAsync(songKey, metric = 'score') {
  try{
    const result = await fetch(`${API_URL}/leaderboard?songKey=${songKey}&orderBy=${metric}`)
    if (!result.ok) {
      console.error("Erro na conexão com o servidor");
      return;
    }

    const scores = await result.json();
    return scores;
  }
  catch (e){
    console.error("Erro na conexão com o servidor:", e);
  }
}

async function saveScore() {
  try{

  }
  catch (e){
    console.error("Erro na conexão com o servidor:", e);
  }
}
