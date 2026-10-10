import { renderLeaderboardAsync } from "./render-leaderboard.js";
import { API_URL } from "../config.js";

let currentLeaderboardMetric = 'score';

async function fetchScoresAsync(songKey, metric = 'score') {
  try{
    const result = await fetch(`${API_URL}/leaderboard?songKey=${songKey}&orderBy=${metric}`)
    if (!result.ok) {
      console.error("Erro na conexão com o servidor");
      return
    }

    const scores = await result.json();
    renderLeaderboardAsync(songKey, metric, scores)
  }
  catch (e){
    console.error("Erro na conexão com o servidor:", e);
  }
}

async function saveRecordAsync(songKey, newScore, rankName, wpm) {
  const parsedScore = Math.round(Number(newScore) || 0);
  const parsedWpm = Math.round(Number(wpm) || 0);

  if (parsedScore <= 0) return; // Ignora pontuações zeradas

  if (typeof currentUser === "undefined" || !currentUser) {
    console.warn("Pontuação não salva: Apenas usuários logados podem entrar na leaderboard.");
    return;
  }

  const userId = currentUser.id;
  const playerName = currentUser.user_metadata?.display_name || 
                     currentUser.email?.split("@")[0] || 
                     "Jogador";

  try {
    const { data: existingRecord, error: selectError } = await _supabase
      .from("leaderboard")
      .select("id, score, wpm")
      .eq("user_id", userId)
      .eq("song_key", songKey)
      .maybeSingle();

    if (selectError) {
      console.error("Erro ao consultar registro existente:", selectError.message);
    } else if (existingRecord) {
      // Atualiza se superou O PONTO OU O WPM anterior
      const isBetterScore = parsedScore > existingRecord.score;
      const isBetterWpm = parsedWpm > existingRecord.wpm;

      if (isBetterScore || isBetterWpm) {
        const updatePayload = {
          rank: rankName,
          player: playerName,
          // Mantém o maior valor de cada um caso melhore individualmente
          score: Math.max(parsedScore, existingRecord.score),
          wpm: Math.max(parsedWpm, existingRecord.wpm)
        };

        const { error: updateError } = await _supabase
          .from("leaderboard")
          .update(updatePayload)
          .eq("id", existingRecord.id);

        if (!updateError) {
          console.log("🔥 Recorde atualizado no Supabase!");
        } else {
          console.error("Erro ao atualizar recorde no Supabase:", updateError.message);
        }
      }
    } else {
      // Primeiro registro do usuário nesta música
      const { error: insertError } = await _supabase
        .from("leaderboard")
        .insert([
          {
            user_id: userId,
            player: playerName,
            score: parsedScore,
            rank: rankName,
            wpm: parsedWpm,
            song_key: songKey
          }
        ]);

      if (!insertError) {
        recordUpdated = true;
        console.log("🎯 Primeiros pontos registrados para esta música!");
      } else {
        console.error("Erro ao gravar novo ranking no Supabase:", insertError.message);
      }
    }
  } catch (err) {
    console.error("Erro inesperado ao salvar no Supabase:", err);
  }
  
  await renderLeaderboardAsync(songKey, currentLeaderboardMetric);
  await updateUserPBDisplay(songKey); 
}

document.addEventListener("DOMContentLoaded", () => {
  const songSelect = document.getElementById("songSelect");

  if (songSelect) {
    if (songSelect.value) {
      renderLeaderboardAsync(songSelect.value, currentLeaderboardMetric);
    }

    songSelect.addEventListener("change", (e) => {
      renderLeaderboardAsync(e.target.value, currentLeaderboardMetric);
    });
  }
});

window.changeLeaderboardMetric = function(songKey, metric) {
  renderLeaderboardAsync(songKey, metric);
};
