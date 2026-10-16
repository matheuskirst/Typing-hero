import { API_URL } from "../config.js";

export async function fetchScoresAsync(songName, orderBy = 'score') {
  try{
    let request = `${API_URL}/leaderboard?`;
    if (songName) {
      request = request + `songKey=${songName}` + '&';
    }
    if (orderBy) {
      request = request + `orderBy=${orderBy}` + '&';
    }
    
    const result = await fetch(request)
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

export async function saveScoreAsync() {
  try{

  }
  catch (e){
    console.error("Erro na conexão com o servidor:", e);
  }
}
