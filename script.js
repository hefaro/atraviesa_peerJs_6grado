// Archivo: script.js

// --- VARIABLES GLOBALES DE JUEGO ---
const TOTAL_COLUMNAS = 8;
const FILAS_POR_COLUMNA = 3;

let boardData = []; // Matriz [columna][fila]
let currentColumn = 0;
let cartaSeleccionada = null;
let myName = "";

// --- SISTEMA DE SONIDOS GRACIOSOS (Web Audio API) ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// 1. Sonido Gracioso al Abrir Carta (Pop Alegre)
function playSoundAbrir() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    const now = audioCtx.currentTime;
    
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.12);
}

// 2. Sonido Gracioso al Fallar (Boing / Desinflado)
function playSoundFallo() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    const now = audioCtx.currentTime;
    
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);
    
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.35);
}

// 3. Sonido de Acierto / Avance
function playSoundAcierto() {
    initAudio();
    const notas = [523.25, 659.25, 783.99]; // C5, E5, G5
    notas.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const now = audioCtx.currentTime + (index * 0.08);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(now);
        osc.stop(now + 0.15);
    });
}

// 4. Sonido Gran Fanfarria al Finalizar / Ganar el Juego
function playSoundVictoria() {
    initAudio();
    const melodía = [
        { freq: 523.25, dur: 0.12, pause: 0.00 }, // C5
        { freq: 523.25, dur: 0.12, pause: 0.15 }, // C5
        { freq: 523.25, dur: 0.12, pause: 0.30 }, // C5
        { freq: 659.25, dur: 0.25, pause: 0.45 }, // E5
        { freq: 783.99, dur: 0.25, pause: 0.70 }, // G5
        { freq: 1046.50, dur: 0.60, pause: 0.95 } // C6 (Gran final)
    ];

    melodía.forEach(note => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const now = audioCtx.currentTime + note.pause;
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(note.freq, now);
        
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.dur);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(now);
        osc.stop(now + note.dur);
    });
}

// --- ELEMENTOS DOM ---
const startModal = document.getElementById('start-modal');
const playerNameInput = document.getElementById('player-name-input');
const hostGameBtn = document.getElementById('host-game-btn');
const joinGameBtn = document.getElementById('join-game-btn');
const joinPeerIdInput = document.getElementById('join-peer-id-input');
const hostIdContainer = document.getElementById('host-id-container');
const displayPeerId = document.getElementById('display-peer-id');
const statusBar = document.getElementById('connection-status-bar');
const statusText = document.getElementById('status-text');
const gameBoard = document.getElementById('game-board');
const questionModal = document.getElementById('question-modal');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const feedbackText = document.getElementById('feedback-text');
const certModal = document.getElementById('certificate-modal');

const openInstructionsBtn = document.getElementById('open-instructions-btn');
const closeInstructionsBtn = document.getElementById('close-instructions-btn');
const instructionsModal = document.getElementById('instructions-modal');

// --- INICIALIZACIÓN P2P ---
const red = new Com_peerJS();

red.onSalaCreada = (id) => {
    if (displayPeerId) displayPeerId.textContent = id;
    if (hostIdContainer) hostIdContainer.classList.remove('hidden');
    if (statusText) statusText.textContent = `Código de Sala: ${id} - Esperando oponente...`;
};

red.onConexionLista = () => {
    iniciarJuegoInmediato();
    red.enviar({ tipo: 'JUEGO_INICIADO' });
};

red.onDatosRecibidos = (datos) => {
    if (datos.tipo === 'GANADOR') {
        if (gameBoard) gameBoard.style.pointerEvents = "none";
        if (statusText) {
            statusText.textContent = `El jugador ${datos.nombre} ha completado el tablero.`;
            statusText.style.color = "#ef4444";
        }
    }
};

red.onError = (err) => {
    console.error("Error en PeerJS:", err);
    alert("Error de conexión. Verifica el código de la sala.");
};

// --- EVENTOS DE BOTONES ---
if (hostGameBtn) {
    hostGameBtn.addEventListener('click', () => {
        initAudio();
        const nombre = playerNameInput ? playerNameInput.value.trim() : "";
        if (!nombre) {
            alert("Por favor ingresa tu nombre completo.");
            return;
        }
        myName = nombre;
        
        const idTresCifras = Math.floor(100 + Math.random() * 900).toString();
        red.crearSala(idTresCifras);
        if (statusBar) statusBar.classList.remove('hidden');
    });
}

if (joinGameBtn) {
    joinGameBtn.addEventListener('click', () => {
        initAudio();
        const nombre = playerNameInput ? playerNameInput.value.trim() : "";
        const codigo = joinPeerIdInput ? joinPeerIdInput.value.trim() : "";

        if (!nombre) {
            alert("Por favor ingresa tu nombre completo.");
            return;
        }
        if (!codigo || codigo.length !== 3) {
            alert("Ingresa un código de sala válido de 3 dígitos.");
            return;
        }

        myName = nombre;
        red.unirseASala(codigo);
        if (statusBar) statusBar.classList.remove('hidden');
    });
}

if (openInstructionsBtn && instructionsModal) {
    openInstructionsBtn.addEventListener('click', () => instructionsModal.classList.remove('modal-hidden'));
}
if (closeInstructionsBtn && instructionsModal) {
    closeInstructionsBtn.addEventListener('click', () => instructionsModal.classList.add('modal-hidden'));
}

// --- LÓGICA DEL TABLERO ---
function iniciarJuegoInmediato() {
    if (startModal) startModal.classList.add('modal-hidden');
    generarTableroLocal();
    currentColumn = 0;
    renderizarTablero();
    if (statusText) {
        statusText.textContent = `¡Partida en curso! Jugador: ${myName}`;
        statusText.style.color = "#3b82f6";
    }
}

function generarTableroLocal() {
    boardData = [];

    const banco = (typeof questionBank !== 'undefined' && questionBank.length > 0) ? [...questionBank] : [];
    banco.sort(() => Math.random() - 0.5);
    const seleccion24 = banco.slice(0, 24);

    let idx = 0;
    for (let c = 0; c < TOTAL_COLUMNAS; c++) {
        const col = [];
        for (let f = 0; f < FILAS_POR_COLUMNA; f++) {
            const p = seleccion24[idx++];
            col.push({
                question: p ? p.question : "Pregunta no disponible",
                options: p ? p.options : ["Opción A", "Opción B"],
                answer: p ? p.answer : "Opción A",
                fallada: false
            });
        }
        boardData.push(col);
    }
}

function renderizarTablero() {
    if (!gameBoard) return;
    gameBoard.innerHTML = "";

    for (let f = 0; f < FILAS_POR_COLUMNA; f++) {
        for (let c = 0; c < TOTAL_COLUMNAS; c++) {
            const card = document.createElement('div');
            card.className = 'card';
            const cartaInfo = boardData[c][f];

            if (c === currentColumn) {
                card.classList.add('active-column');
            } else if (c < currentColumn) {
                card.classList.add('passed-column');
            } else {
                card.classList.add('locked-column');
            }

            if (cartaInfo.fallada) {
                card.classList.add('failed-card');
                card.innerHTML = `<span class="failed-icon">❌</span>`;
            } else {
                card.innerHTML = `<div class="card-bee-image"></div>`;
            }

            card.onclick = () => {
                if (c === currentColumn && !cartaInfo.fallada) {
                    abrirModalPregunta(c, f);
                }
            };

            gameBoard.appendChild(card);
        }
    }
}

function abrirModalPregunta(col, fila) {
    playSoundAbrir(); // Reproduce sonido gracioso al abrir carta
    cartaSeleccionada = { col, fila };
    const carta = boardData[col][fila];

    if (feedbackText) feedbackText.textContent = "";
    if (questionText) questionText.innerHTML = carta.question;

    if (answerOptions) {
        answerOptions.innerHTML = "";
        carta.options.forEach(opc => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = opc;
            btn.onclick = () => verificarRespuesta(opc, carta.answer);
            answerOptions.appendChild(btn);
        });
    }

    if (window.MathJax) {
        MathJax.typesetPromise();
    }

    if (questionModal) questionModal.classList.remove('modal-hidden');
}

function verificarRespuesta(seleccion, correcta) {
    const { col, fila } = cartaSeleccionada;

    if (seleccion === correcta) {
        playSoundAcierto(); // Sonido de respuesta correcta
        if (feedbackText) {
            feedbackText.textContent = "¡Correcto! Avanzas a la siguiente columna.";
            feedbackText.style.color = "green";
        }

        setTimeout(() => {
            if (questionModal) questionModal.classList.add('modal-hidden');
            currentColumn++;
            renderizarTablero();

            if (currentColumn >= TOTAL_COLUMNAS) {
                declararGanador();
            }
        }, 800);
    } else {
        playSoundFallo(); // Sonido gracioso de desinflado/boing al fallar
        if (feedbackText) {
            feedbackText.textContent = "Incorrecto. Intenta con otra abejita de la columna.";
            feedbackText.style.color = "red";
        }

        boardData[col][fila].fallada = true;

        setTimeout(() => {
            if (questionModal) questionModal.classList.add('modal-hidden');
            renderizarTablero();
        }, 1200);
    }
}

function declararGanador() {
    playSoundVictoria(); // Sonido sonoro de fanfarria final
    if (gameBoard) gameBoard.style.pointerEvents = "none";
    if (statusText) {
        statusText.textContent = "¡🏆 FELICIDADES, HAS GANADO LA CARRERA! 🏆";
        statusText.style.color = "#22c55e";
    }

    red.enviar({ tipo: 'GANADOR', nombre: myName });
    mostrarDiploma();
}

function mostrarDiploma() {
    const certName = document.getElementById('cert-player-name');
    const certDate = document.getElementById('cert-date');

    if (certName) certName.textContent = myName || "Estudiante";
    if (certDate) certDate.textContent = `Fecha: ${new Date().toLocaleDateString()}`;

    if (certModal) certModal.classList.remove('modal-hidden');
}

const printCertBtn = document.getElementById('print-cert-btn');
if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
        window.print();
    });
}

const restartGameBtn = document.getElementById('restart-game-btn');
if (restartGameBtn) {
    restartGameBtn.addEventListener('click', () => {
        location.reload();
    });
}