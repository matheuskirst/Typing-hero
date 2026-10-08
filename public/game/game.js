// ==========================================
// CONFIGURAÇÕES, SEGURANÇA E BIBLIOTECA
// ==========================================

const MUSIC_LIBRARY = {
  "9_circles_of_hell": {
    sectionName: "Infernal Descent",
    tracks: {
      "limbo": {
        title: "Limbo Echoes",
        url: "musicas/Limbo Echoes.mp3",
        multiplier: 1.0,
        phrases: [
          "A névoa esconde o abismo, mas a batida ecoa nas profundezas.",
          "O Primeiro Círculo sussurra a promessa da dor eterna.",
          "Sem esperança, mas com o ritmo gravado na alma dos esquecidos.",
          "A pulsação do inferno ressoa na penumbra dos filósofos.",
          "Sinta o pulso sombrio antes de despencar no abismo de fogo.",
          "Um lugar sem salvação, onde o tempo é ditado pela frequência do caos.",
          "A luz da razão se apaga na batida do inferno.",
          "Suspiros sem lamento ecoam pelos prados da eternidade.",
          "Passos lentos sobre a penumbra de uma paz ilusória."
        ]
      },
      "lust": {
        title: "Winds of Francesca WIP",
        url: "musicas/Winds of Francesca.mp3",
        multiplier: 1.15,
        phrases: [
          "a"
        ]
      }
    }
  },
  "cyber_overdrive": {
    sectionName: "Cybernetic Protocol",
    tracks: {
      "hellfire": {
        title: "Hellfire Overdrive",
        url: "musicas/Hellfire Overdrive.mp3",
        multiplier: 1.5,
        phrases: [
          "Metal queimando no asfalto, neon sangrando no horizonte.",
          "Acelere até o motor virar fumaça e a alma virar código.",
          "Sem freios, sem limites, sem salvação: bem-vindo ao Hellfire Overdrive.",
          "Onde o cromo derrete e a velocidade domina o caos.",
          "Sinta o peso do aço, o calor do fogo e a força da distorção.",
          "Modo Overdrive Ativado: Sobrecarga nos sistemas",
          "Sangue de óleo, coração de nitroglicerina.",
          "Ultrapasse a velocidade da morte.",
          "Conexão neural queimada a 10.000 RPM.",
          "Injetando caos diretamente no barramento de dados.",
          "As ruas de cromo não perdoam quem tem medo de pisar no fundo.",
          "Guitarras distorcidas ecoando nas ruínas de uma metrópole esquecida.",
          "Se o futuro é sombrio, nós o iluminaremos com o fogo dos nossos motores.",
          "Na fronteira entre o circuito e a carne, apenas o ritmo do metal permanece.",
          "Nossa liberdade não é programada, é conquistada na rotação máxima."
        ]
      },
      "code_master": {
        title: "Bitrush_Overdrive",
        url: "musicas/Bitrush Overdrive.mp3",
        multiplier: 1.25,
        phrases: [
          "let pontos = 0;",
          "const nome = 'Jogador 1';",
          "console.log('Iniciando o jogo...');",
          "let vidas = 3;",
          "vidas -= 1;",
          "const ativo = true;",
          "if (combo >= 10) { multiplicador = 2; }",
          "function somarPontos(atual, bonus) { return atual + bonus; }",
          "for (let i = 0; i < 5; i++) { criarInimigo(); }",
          "const lista = ['fácil', 'médio', 'difícil'];",
          "const doubleScore = (score) => score * 2;",
          "const player = { name: 'Hero', hp: 100, isAlive: true };",
          "const speed = wpm > 80 ? 'Ultra Fast' : 'Normal';",
          "const arr = [1, 2, 3].map((num) => num * 10);",
          "setTimeout(() => { alert('Tempo esgotado!'); }, 3000);",
          "const { combo, multiplier } = gameState;"
        ]
      }
    }
  }
};

const RANKS = [
  { name: "D", min: 0, color: "#888888" },
  { name: "C", min: 10, color: "#00ccff" },
  { name: "B", min: 25, color: "#00ff88" },
  { name: "A", min: 45, color: "#ffcc00" },
  { name: "S", min: 70, color: "#ff9900" },
  { name: "SS", min: 100, color: "#ff0066" },
  { name: "SSS", min: 135, color: "#ff00cc" },
  { name: "HERO", min: 180, color: "#ffffff" }
];

// ==========================================
// ELEMENTOS DO DOM & ESTADO GLOBAL
// ==========================================

const songSelect = document.getElementById("songSelect");
const screenFlash = document.getElementById("screenFlash");
const game = document.getElementById("game");
const scoreValue = document.getElementById("scoreValue");
const hypeValue = document.getElementById("hypeValue");
const comboValue = document.getElementById("comboValue");
const wpmValue = document.getElementById("wpmValue");
const hypeBar = document.getElementById("hypeBar");
const input = document.getElementById("playerInput");
const playBtn = document.getElementById("playBtn");
const timerFill = document.getElementById("timerFill");
const overlay = document.getElementById("gameOverOverlay");
const restartBtn = document.getElementById("restartBtn");
const menuBtn = document.getElementById("menuBtn");
const quitBtn = document.getElementById("quitBtn");

const rankUpOverlay = document.getElementById("rankUpOverlay");
const rankUpBadge = document.getElementById("rankUpBadge");
const rankBadgeContainer = document.getElementById("rankBadgeContainer");
const rankUpShockwave = document.getElementById("rankUpShockwave");

const passwordOverlay = document.getElementById("passwordOverlay");
const submitPasswordBtn = document.getElementById("submitPasswordBtn");
const closePasswordModalBtn = document.getElementById("closePasswordModalBtn");

// Variáveis do Estado do Jogo
let cachedCharSpans = [];
let currentSongKey = songSelect ? songSelect.value : "";
let score = 0;
let hypePoints = 0;
let combo = 0;
const MAX_COMBO = 8;
let text = "";
let gameActive = false;
let startTime = null;
let charCount = 0;
let maxWpm = 0;
let timerInterval = null;
let timeLeft = 60;
let maxTime = 60;
let correctCharsCount = 0;
let isSRankActive = false;
let highestRankIndex = 0;
let currentRankIndex = 0;
let previousRankIndex = 0;

// Atualiza o mini card do usuário logado/local para a música selecionada
async function updateUserPBDisplay(songKey) {
  const scoreEl = document.getElementById("pbScore");
  const wpmEl = document.getElementById("pbWpm");
  const rankEl = document.getElementById("pbRank");

  if (!scoreEl || !wpmEl || !rankEl) return;

  let pbScore = 0;
  let pbWpm = 0;
  let pbRank = "--";

  // Busca recorde do usuário no Supabase
  if (typeof currentUser !== "undefined" && currentUser && typeof _supabase !== "undefined" && _supabase) {
    try {
      const { data } = await _supabase
        .from("leaderboard")
        .select("score, wpm, rank")
        .eq("user_id", currentUser.id)
        .eq("song_key", songKey)
        .maybeSingle();

      if (data) {
        pbScore = data.score || 0;
        pbWpm = data.wpm || 0;
        pbRank = data.rank || "--";
      }
    } catch (e) {
      console.warn("Aviso ao buscar PB no Supabase:", e);
    }
  } else {
    // Fallback LocalStorage
    const allScores = JSON.parse(localStorage.getItem("typing_game_leaderboards")) || {};
    const localScores = allScores[songKey] || [];
    const playerName = typeof currentUser !== "undefined" && currentUser 
      ? currentUser.user_metadata?.display_name 
      : null;

    if (playerName) {
      const userRecord = localScores.find(item => item.player === playerName);
      if (userRecord) {
        pbScore = userRecord.score || 0;
        pbWpm = userRecord.wpm || 0;
        pbRank = userRecord.rank || "--";
      }
    }
  }

  // Atualiza o card na interface
  scoreEl.textContent = Number(pbScore).toLocaleString("pt-BR");
  wpmEl.textContent = pbWpm;
  rankEl.textContent = pbRank;
}

// --- ELEMENTOS DO MODAL DE CONFIGURAÇÕES ---
const settingsModal = document.getElementById('settingsOverlay');
const settingsBtn = document.getElementById('settingsModalBtn');
const closeSettingsBtn = document.getElementById('closeSettingsModalBtn');

// Inputs de Acessibilidade e Visual
const cfgCleanFont = document.getElementById('cfgCleanFont');
const cfgDisableBlink = document.getElementById('cfgDisableBlink');
const cfgDisableGlow = document.getElementById('cfgDisableGlow');
const cfgScreenShake = document.getElementById('cfgScreenShake');
const cfgHighContrast = document.getElementById('cfgHighContrast');

// --- ABERTURA E FECHAMENTO DO MODAL ---
settingsBtn?.addEventListener('click', () => settingsModal?.classList.add('active'));
closeSettingsBtn?.addEventListener('click', () => settingsModal?.classList.remove('active'));

// Fechar modal ao clicar fora da caixa do card
settingsModal?.addEventListener('click', (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.remove('active');
  }
});

// --- GERENCIAMENTO DE PREFERÊNCIAS VISUAIS ---
function applyPreferences() {
  const cleanFont = localStorage.getItem('cfgCleanFont') === 'true';
  const disableBlink = localStorage.getItem('cfgDisableBlink') === 'true';
  const disableGlow = localStorage.getItem('cfgDisableGlow') === 'true';
  const screenShake = localStorage.getItem('cfgScreenShake') !== 'false'; // Padrão: true
  const highContrast = localStorage.getItem('cfgHighContrast') === 'true';

  // Aplica/Remove classes no body para estilização global CSS
  document.body.classList.toggle('clean-font', cleanFont);
  document.body.classList.toggle('disable-blink', disableBlink);
  document.body.classList.toggle('disable-glow', disableGlow);
  document.body.classList.toggle('no-shake', !screenShake);
  document.body.classList.toggle('high-contrast', highContrast);

  // Atualiza os checkboxes do HTML para bater com os valores salvas
  if (cfgCleanFont) cfgCleanFont.checked = cleanFont;
  if (cfgDisableBlink) cfgDisableBlink.checked = disableBlink;
  if (cfgDisableGlow) cfgDisableGlow.checked = disableGlow;
  if (cfgScreenShake) cfgScreenShake.checked = screenShake;
  if (cfgHighContrast) cfgHighContrast.checked = highContrast;
}

// Event Listeners dos Toggles de Configurações
cfgCleanFont?.addEventListener('change', (e) => {
  localStorage.setItem('cfgCleanFont', e.target.checked);
  applyPreferences();
});

cfgDisableBlink?.addEventListener('change', (e) => {
  localStorage.setItem('cfgDisableBlink', e.target.checked);
  applyPreferences();
});

cfgDisableGlow?.addEventListener('change', (e) => {
  localStorage.setItem('cfgDisableGlow', e.target.checked);
  applyPreferences();
});

cfgScreenShake?.addEventListener('change', (e) => {
  localStorage.setItem('cfgScreenShake', e.target.checked);
  applyPreferences();
});

cfgHighContrast?.addEventListener('change', (e) => {
  localStorage.setItem('cfgHighContrast', e.target.checked);
  applyPreferences();
});

// --- ACESSIBILIDADE: CONTROLE DO TAMANHO DA FONTE ---

let currentFontSize = parseFloat(localStorage.getItem('typingFontSize')) || 1.25;

const baseFontSize = 1.25; // 1.25rem representa o tamanho padrão de 100%

function updateFontSize(size) {
  
  // Limita o tamanho do texto entre 1.0rem (~80%) e 2.2rem (~176%)
  currentFontSize = Math.min(Math.max(size, 1.0), 2.2);


  // Aplica a variável no CSS global
  document.documentElement.style.setProperty('--typing-font-size', `${currentFontSize}rem`);
  localStorage.setItem('typingFontSize', currentFontSize);


  // Atualiza o texto visual dentro do próprio botão de reset
  const resetBtn = document.getElementById('btnResetFont');
  if (resetBtn) {
    const percentage = Math.round((currentFontSize / baseFontSize) * 100);
    resetBtn.textContent = `${percentage}%`;
  }
}

// Event Listeners dos Botões
document.getElementById('btnIncreaseFont')?.addEventListener('click', () => updateFontSize(currentFontSize + 0.2));
document.getElementById('btnDecreaseFont')?.addEventListener('click', () => updateFontSize(currentFontSize - 0.2));
document.getElementById('btnResetFont')?.addEventListener('click', () => updateFontSize(baseFontSize));

// --- INICIALIZAÇÃO ÚNICA NO DOMCONTENTLOADED ---
document.addEventListener("DOMContentLoaded", () => {
  // 1. Aplica preferências salvas do usuário
  applyPreferences();
  updateFontSize(currentFontSize);

  // 2. Inicializa o seletor de músicas e leaderboard
  const songSelect = document.getElementById("songSelect");
  if (songSelect) {
    if (songSelect.value) {
      renderLeaderboard(songSelect.value, currentLeaderboardMetric);
      updateUserPBDisplay(songSelect.value);
    }

    songSelect.addEventListener("change", (e) => {
      renderLeaderboard(e.target.value, currentLeaderboardMetric);
      updateUserPBDisplay(e.target.value);
    });
  }
});

// ==========================================
// SISTEMA DE NOTIFICAÇÃO (TOAST CYBERPUNK)
// ==========================================

function showNotification(message, isError = true) {
  let toast = document.getElementById("cyberToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cyberToast";
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%) translateY(100px)";
    toast.style.backgroundColor = "rgba(10, 10, 18, 0.95)";
    toast.style.border = "1px solid #ff0066";
    toast.style.boxShadow = "0 0 15px rgba(255, 0, 102, 0.4)";
    toast.style.color = "#ffffff";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.fontFamily = "monospace, sans-serif";
    toast.style.fontSize = "0.95rem";
    toast.style.fontWeight = "bold";
    toast.style.zIndex = "99999";
    toast.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    toast.style.pointerEvents = "none";
    document.body.appendChild(toast);
  }

  toast.style.borderColor = isError ? "#ff0066" : "#00ffcc";
  toast.style.boxShadow = isError ? "0 0 15px rgba(255, 0, 102, 0.4)" : "0 0 15px rgba(0, 255, 204, 0.4)";
  toast.innerHTML = `<span style="font-size: 1.2rem;">${isError ? '⚠️' : '✓'}</span> ${message}`;

  setTimeout(() => { toast.style.transform = "translateX(-50%) translateY(0)"; }, 10);
  setTimeout(() => { toast.style.transform = "translateX(-50%) translateY(100px)"; }, 3500);
}

// ==========================================
// FUNÇÕES UTILITÁRIAS & AUTENTICAÇÃO USUÁRIO
// ==========================================

async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getLoggedUser() {
  const storedUser = localStorage.getItem("currentUser") || 
                     localStorage.getItem("user") || 
                     localStorage.getItem("usuario") ||
                     localStorage.getItem("logged_in_user");

  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      if (typeof parsed === "object" && parsed !== null) return parsed;
      return { username: String(parsed) };
    } catch (e) {
      return { username: storedUser };
    }
  }

  const navUserEl = document.querySelector(".user-name, #userName, .profile-name, .user-info, header span");
  if (navUserEl && navUserEl.textContent.trim() !== "") {
    return { username: navUserEl.textContent.trim() };
  }

  const hasLogoutBtn = Array.from(document.querySelectorAll("button, a")).some(el => {
    const txt = el.textContent.trim().toUpperCase();
    return txt === "SAIR" || txt === "LOGOUT";
  });

  if (hasLogoutBtn) return { username: "INFAMOS" };
  return null;
}

// ==========================================
// LÓGICA CORE DO JOGO DE DIGITAÇÃO
// ==========================================

function getSongData(songKey) {
  for (const sectionKey in MUSIC_LIBRARY) {
    const section = MUSIC_LIBRARY[sectionKey];
    if (section.tracks[songKey]) return section.tracks[songKey];
  }
  return null;
}

if (songSelect) {
  songSelect.innerHTML = "";
  Object.keys(MUSIC_LIBRARY).forEach(sectionKey => {
    const section = MUSIC_LIBRARY[sectionKey];
    const group = document.createElement("optgroup");
    group.label = section.sectionName;

    Object.keys(section.tracks).forEach(trackKey => {
      const track = section.tracks[trackKey];
      const opt = document.createElement("option");
      opt.value = trackKey;
      opt.textContent = `${track.title} (x${track.multiplier})`;
      group.appendChild(opt);
    });

    songSelect.appendChild(group);
  });
}

function applySelectedSong(key) {
  currentSongKey = key;
  const songData = getSongData(key);
  if (!songData) return;

  if (typeof menuMusic !== "undefined" && menuMusic) menuMusic.src = songData.url;
  if (typeof gameMusic !== "undefined" && gameMusic) gameMusic.src = songData.url;
  if (typeof renderLeaderboard === "function") renderLeaderboard(key);
}

if (currentSongKey) applySelectedSong(currentSongKey);

if (songSelect) {
  songSelect.addEventListener("change", (e) => {
    applySelectedSong(e.target.value);
    if (!gameActive && typeof playMenuMusic === "function") playMenuMusic();
  });
}

function getCurrentRank() {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (hypePoints >= RANKS[i].min) {
      highestRankIndex = Math.max(highestRankIndex, i);
      currentRankIndex = i;
      return { ...RANKS[i], index: i };
    }
  }
  currentRankIndex = 0;
  return { ...RANKS[0], index: 0 };
}

function triggerRankUpAnimation(rank) {
  if (!rankUpBadge || !rankUpOverlay) return;

  rankUpBadge.textContent = rank.name;
  rankUpBadge.style.color = rank.color;
  rankUpOverlay.style.setProperty('--rank-color', rank.color);

  if (rank.index >= 4) {
    rankBadgeContainer.classList.add('is-rank-s');
    document.body.classList.add('mega-shake');
    setTimeout(() => document.body.classList.remove('mega-shake'), 600);
  } else {
    rankBadgeContainer.classList.remove('is-rank-s');
    document.body.classList.add('screen-shake');
    setTimeout(() => document.body.classList.remove('screen-shake'), 400);
  }

  if (rank.index >= 4 && screenFlash) {
    screenFlash.classList.add('active');
    setTimeout(() => screenFlash.classList.remove('active'), 200);
  }

  const rect = rankBadgeContainer.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const particleCount = 16 + (rank.index * 8);

  for (let i = 0; i < particleCount; i++) {
    spawnParticle(centerX, centerY, rank.color, 50 + rank.index * 20, Math.random() * 8 + 4);
  }

  rankUpOverlay.classList.remove('active');
  if (rankUpShockwave) {
    rankUpShockwave.style.animation = 'none';
    void rankUpShockwave.offsetWidth; 
    rankUpShockwave.style.animation = 'shockwave-expand 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
  }
  rankUpOverlay.classList.add('active');

  if (typeof playRankUpSound === "function") playRankUpSound(rank.index);
  setTimeout(() => rankUpOverlay.classList.remove('active'), 1500);
}

function renderText() {
  if (!game) return;
  game.innerHTML = "";
  cachedCharSpans = [];

  let currentWordSpan = document.createElement("span");
  currentWordSpan.style.display = "inline-block";
  currentWordSpan.style.whiteSpace = "nowrap";

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "char pending";
    span.textContent = text[i] === " " ? "\u00A0" : text[i];
    
    currentWordSpan.appendChild(span);
    cachedCharSpans.push(span);

    if (text[i] === " " || i === text.length - 1) {
      game.appendChild(currentWordSpan);
      currentWordSpan = document.createElement("span");
      currentWordSpan.style.display = "inline-block";
      currentWordSpan.style.whiteSpace = "nowrap";
    }
  }
}

function triggerSRankEffects(isActivating) {
  if (typeof gameMusic === "undefined" || !gameMusic) return;

  if (isActivating && !isSRankActive) {
    isSRankActive = true;
    if (typeof fadeAudioVolume === "function") fadeAudioVolume(gameMusic, MAX_VOLUME, 500);
    if (game) game.classList.add('s-rank-active');
    if (input) input.classList.add('s-rank-active');
  } else if (!isActivating && isSRankActive) {
    isSRankActive = false;
    if (typeof fadeAudioVolume === "function") fadeAudioVolume(gameMusic, BASE_VOLUME, 500);
    if (game) game.classList.remove('s-rank-active');
    if (input) input.classList.remove('s-rank-active');
  }
}

function updateStats() {
  if (scoreValue) scoreValue.textContent = score.toLocaleString();
  if (comboValue) comboValue.textContent = combo + "x";

  const currentRank = getCurrentRank();

  if (currentRank.index > previousRankIndex && gameActive) {
    triggerRankUpAnimation(currentRank);
  }
  previousRankIndex = currentRank.index;

  triggerSRankEffects(currentRank.index >= 4);

  if (hypeValue) {
    if (hypeValue.textContent !== currentRank.name) {
      hypeValue.textContent = currentRank.name;
      hypeValue.style.transform = "scale(1.5)";
      setTimeout(() => hypeValue.style.transform = "scale(1)", 150);
    }
    hypeValue.style.color = currentRank.color;
  }

  const nextRank = RANKS[currentRank.index + 1] || currentRank;
  const currentMin = currentRank.min;
  const currentMax = nextRank.min === currentMin ? currentMin + 30 : nextRank.min;
  const pct = Math.min(100, Math.max(0, ((hypePoints - currentMin) / (currentMax - currentMin)) * 100));
  if (hypeBar) hypeBar.style.width = pct + "%";

  if (currentRank.name === "HERO") {
    document.body.classList.add("frenzy");
  } else {
    document.body.classList.remove("frenzy");
  }

  if (startTime && charCount > 0) {
    const minutes = (Date.now() - startTime) / 60000;
    const wpm = Math.round((charCount / 5) / Math.max(minutes, 0.01));
    if (wpmValue) wpmValue.textContent = wpm;
    maxWpm = Math.max(maxWpm, wpm);
  }
}

function spawnParticle(x, y, color = "#00ff88", distance = 40, size = 6) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.width = size + "px";
  p.style.height = size + "px";
  p.style.background = color;
  p.style.boxShadow = `0 0 10px ${color}`;
  p.style.left = x + "px";
  p.style.top = y + "px";

  const angle = Math.random() * Math.PI * 2;
  const dist = distance * (0.6 + Math.random() * 0.8);
  p.style.setProperty("--tx", Math.cos(angle) * dist + "px");
  p.style.setProperty("--ty", Math.sin(angle) * dist + "px");

  document.body.appendChild(p);
  setTimeout(() => p.remove(), 750);
}

function spawnParticles(x, y, color = "#00ff88", count = 6) {
  for (let i = 0; i < count; i++) {
    spawnParticle(x, y, color, 35, Math.random() * 5 + 3);
  }
}

function showScorePopup(x, y, pointsGained) {
  const p = document.createElement("div");
  p.className = "time-pop positive";
  p.textContent = `+${pointsGained}`;
  p.style.color = "#00ffcc";
  p.style.fontSize = "1.1rem";
  p.style.fontWeight = "bold";
  p.style.left = (x + 20) + "px";
  p.style.top = (y - 35) + "px";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 700);
}

function showTimePopup(x, y, amount, isPositive) {
  const p = document.createElement("div");
  p.className = `time-pop ${isPositive ? "positive" : "negative"}`;
  p.textContent = `${isPositive ? "+" : ""}${amount}s`;
  p.style.left = x + "px";
  p.style.top = (y - 15) + "px";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 700);
}

function showComboPopup(textStr) {
  const popup = document.createElement("div");
  popup.className = "combo-popup";
  popup.textContent = textStr;
  popup.style.left = "50%";
  popup.style.top = "38%";
  popup.style.transform = "translateX(-50%) scale(1.2)";
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 800);
}

function nextText() {
  const songData = getSongData(currentSongKey);
  if (!songData) return;

  const currentPhrases = songData.phrases;
  text = currentPhrases[Math.floor(Math.random() * currentPhrases.length)];
  correctCharsCount = 0;

  if (input) {
    input.value = "";
    input.disabled = false;
    input.classList.remove("error");
  }

  renderText();
  if (input) setTimeout(() => input.focus(), 50);
  timeLeft = Math.min(maxTime, timeLeft + 4);
}

if (game) {
  game.addEventListener("click", () => {
    if (gameActive && input && !input.disabled) input.focus();
  });
}

function askGuestConfirmation() {
  return new Promise((resolve) => {
    const modal = document.getElementById("guestModal");
    const confirmBtn = document.getElementById("modalConfirmBtn");
    const cancelBtn = document.getElementById("modalCancelBtn");

    if (!modal) {
      resolve(true);
      return;
    }

    modal.classList.add("active");

    const handleConfirm = () => {
      cleanup();
      resolve(true);
    };

    const handleCancel = () => {
      cleanup();
      resolve(false);
    };

    const cleanup = () => {
      modal.classList.remove("active");
      if (confirmBtn) confirmBtn.removeEventListener("click", handleConfirm);
      if (cancelBtn) cancelBtn.removeEventListener("click", handleCancel);
    };

    if (confirmBtn) confirmBtn.addEventListener("click", handleConfirm);
    if (cancelBtn) cancelBtn.addEventListener("click", handleCancel);
  });
}

async function startGame() {
  if (typeof currentUser === "undefined" || !currentUser) {
    const aceitouContinuar = await askGuestConfirmation();
    if (!aceitouContinuar) return;
  }

  if (typeof initAudio === "function") initAudio();
  if (typeof playGameMusic === "function") playGameMusic();

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  score = 0;
  hypePoints = 0;
  combo = 0;
  highestRankIndex = 0;
  currentRankIndex = 0;
  previousRankIndex = 0;
  charCount = 0;
  maxWpm = 0;
  timeLeft = maxTime;
  correctCharsCount = 0;
  gameActive = true;
  isSRankActive = false;
  startTime = Date.now();

  if (overlay) overlay.classList.remove("active");
  if (songSelect) songSelect.disabled = true;
  if (quitBtn) quitBtn.style.display = "block";
  if (playBtn) playBtn.style.display = "none";

  triggerSRankEffects(false);
  nextText();

  timerInterval = setInterval(() => {
    if (!gameActive) {
      clearInterval(timerInterval);
      return;
    }

    timeLeft -= 0.1;
    const pct = Math.max(0, (timeLeft / maxTime) * 100);
    if (timerFill) {
      timerFill.style.width = pct + "%";
      timerFill.classList.toggle("danger", pct < 25);
    }

    if (hypePoints > 0) {
      hypePoints = Math.max(0, hypePoints - 0.08);
      updateStats();
    }

    if (timeLeft <= 0) endGame();
  }, 100);
}

function animateFinalScore(targetScore) {
  const el = document.getElementById("finalScore");
  if (!el) return;
  let current = 0;
  const duration = 1200;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = targetScore / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= targetScore) {
      current = targetScore;
      clearInterval(timer);
    }
    el.textContent = Math.round(current).toLocaleString();
  }, stepTime);
}

function endGame() {
  gameActive = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (input) {
    input.disabled = true;
    input.blur();
  }
  if (songSelect) songSelect.disabled = false;
  if (quitBtn) quitBtn.style.display = "none";
  document.body.classList.remove("frenzy");
  triggerSRankEffects(false);

  if (typeof playMenuMusic === "function") playMenuMusic();

  const finalRankName = RANKS[highestRankIndex].name;
  animateFinalScore(score);

  const finalRankEl = document.getElementById("finalRank");
  if (finalRankEl) {
    finalRankEl.textContent = finalRankName;
    finalRankEl.style.color = RANKS[highestRankIndex].color;
  }
  const finalWpmEl = document.getElementById("finalWpm");
  if (finalWpmEl) finalWpmEl.textContent = maxWpm;

  if (overlay) overlay.classList.add("active");

  setTimeout(() => {
    if (typeof saveScoreForSong === "function") {
      saveScoreForSong(currentSongKey, score, finalRankName, maxWpm);
    }
  }, 500);
}

function returnToMenu() {
  gameActive = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  if (overlay) overlay.classList.remove("active");
  if (playBtn) playBtn.style.display = "inline-block";
  if (quitBtn) quitBtn.style.display = "none";

  if (input) {
    input.disabled = true;
    input.blur();
    input.value = "";
    input.placeholder = "Clique em PLAY para começar...";
  }

  if (game) game.innerHTML = "";
  if (songSelect) songSelect.disabled = false;

  score = 0;
  hypePoints = 0;
  combo = 0;
  previousRankIndex = 0;
  currentRankIndex = 0;
  charCount = 0;
  cachedCharSpans = [];

  if (wpmValue) wpmValue.textContent = "0";
  if (timerFill) timerFill.style.width = "100%";

  document.body.classList.remove("frenzy");
  triggerSRankEffects(false);
  updateStats();
  if (typeof playMenuMusic === "function") playMenuMusic();
}

if (playBtn) playBtn.addEventListener("click", startGame);
if (restartBtn) restartBtn.addEventListener("click", startGame);
if (menuBtn) menuBtn.addEventListener("click", returnToMenu);

window.addEventListener("keydown", (e) => {
  if (!gameActive && overlay && overlay.classList.contains("active") && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    startGame();
  }
});

if (input) {
  input.addEventListener("keydown", (e) => {
    if (!gameActive) return;
    if (e.key === "Backspace" && input.value.length <= correctCharsCount) {
      e.preventDefault();
    }
  });

  input.addEventListener("input", () => {
    if (!gameActive) return;

    const typed = input.value;
    if (typed.length < correctCharsCount) {
      input.value = text.substring(0, correctCharsCount);
      return;
    }

    while (correctCharsCount < typed.length) {
      const index = correctCharsCount;
      const typedChar = typed[index];
      const expectedChar = text[index];
      const charSpan = cachedCharSpans[index];

      if (typedChar === expectedChar) {
        correctCharsCount++;
        combo = Math.min(MAX_COMBO, combo + 1);
        hypePoints += 1.2;
        charCount++;

        const songData = getSongData(currentSongKey);
        const songMultiplier = songData ? songData.multiplier : 1.0;
        const basePoints = 15;
        const comboMult = 1 + (combo * 0.15); 
        const currentRank = getCurrentRank();
        const rankMult = 1 + (currentRank.index * 0.25);

        const pointsGained = Math.round(basePoints * comboMult * rankMult * songMultiplier);
        score += pointsGained;
        timeLeft = Math.min(maxTime, timeLeft + 0.3);

        if (typeof playSuccessSound === "function") playSuccessSound(combo);

        if (charSpan) {
          const rect = charSpan.getBoundingClientRect();
          spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, currentRank.color, 5 + combo);
          showTimePopup(rect.left + rect.width / 2, rect.top, "0.3", true);
          showScorePopup(rect.left + rect.width / 2, rect.top, pointsGained);
        }

        if (combo === MAX_COMBO && correctCharsCount % 5 === 0) {
          showComboPopup("MAX COMBO 8x!");
        }

      } else {
        combo = 0; 
        const currentRank = getCurrentRank();
        if (currentRank.index > 0) {
          const previousRank = RANKS[currentRank.index - 1];
          hypePoints = previousRank.min;
        } else {
          hypePoints = 0;
        }

        timeLeft = Math.max(0, timeLeft - 2.0);
        if (typeof playErrorSound === "function") playErrorSound();

        if (charSpan) {
          charSpan.classList.remove("pending", "current");
          charSpan.classList.add("wrong");
          const rect = charSpan.getBoundingClientRect();
          spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, "#ff3333", 8);
          showTimePopup(rect.left + rect.width / 2, rect.top, "-2", false);

          setTimeout(() => {
            if (charSpan.classList.contains("wrong")) {
              charSpan.classList.remove("wrong");
              charSpan.classList.add("current");
            }
          }, 300);
        }

        input.value = text.substring(0, correctCharsCount);
        input.classList.add("error");
        setTimeout(() => input.classList.remove("error"), 250);
        break;
      }
    }

    for (let i = 0; i < text.length; i++) {
      const charSpan = cachedCharSpans[i];
      if (!charSpan) continue;

      const expected = text[i];
      const actual = input.value[i];

      if (charSpan.classList.contains("wrong")) continue;

      charSpan.classList.remove("pending", "correct", "current");

      if (i < input.value.length) {
        if (actual === expected) charSpan.classList.add("correct");
      } else if (i === input.value.length) {
        charSpan.classList.add("current");
      } else {
        charSpan.classList.add("pending");
      }
    }

    if (input.value === text) nextText();
    updateStats();
  });

  input.addEventListener("paste", (e) => e.preventDefault());
}
