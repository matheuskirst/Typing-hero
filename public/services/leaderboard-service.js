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
    
    const response = await fetch(request)
    if (!response.ok) {
      console.error("Erro na conexão com o servidor");
      return;
    }

    const scores = await response.json();
    return scores;
  }
  catch (e){
    console.error("Erro na conexão com o servidor:", e);
  }
}

export async function saveScoreAsync(data) {
  try{
    const response = await fetch(data, {
      method: "POST",
      body: data
    });
  }
  catch (e){
    console.error("Erro na conexão com o servidor:", e);
  }
}
