// script.js - ANIMA | Sistema Quântico de Revelação v3.0

// ========== SISTEMA DE ESTADO GLOBAL ==========
const STATE = {
    // Sistema de Questões
    currentQuestion: 0,
    scores: {},
    questions: [],
    animals: {},
    
    // Jornada na Árvore da Vida
    treeJourney: {
        currentSephirah: 'MALKUTH',
        activatedSephiroth: new Set(['MALKUTH']),
        completedMilestones: new Set(),
        milestoneThresholds: {
            'n': 3, 'c': 5, 'a': 7, 's': 9, 'i': 11,
            'd': 13, 'p': 15, 'e': 17, 'f': 19
        },
        milestoneToSephirah: {
            'n': 'YESOD', 'c': 'HOD', 'a': 'NETZACH',
            's': 'TIPHARETH', 'i': 'GEBURAH', 'd': 'CHESED',
            'p': 'BINAH', 'e': 'CHOCHMAH', 'f': 'KETHER'
        }
    },
    
    // Sistema Quântico
    quantumState: {
        superposition: new Map(),
        collapsedAnimal: null,
        observationPoints: 0,
        entropy: 0,
        coherence: 0
    },
    
    // Configurações
    maxQuestions: 60,
    currentAnimal: null
};

// ========== ÁRVORE DA VIDA ==========
const TREE_OF_LIFE = {
    sephiroth: {
        'MALKUTH': { 
            level: 1, 
            name: 'REINO', 
            questionRange: [1, 6],
            milestone: null,
            color: '#8B4513',
            element: 'TERRA'
        },
        'YESOD': { 
            level: 2, 
            name: 'FUNDAÇÃO', 
            questionRange: [7, 12],
            milestone: 'n',
            color: '#9B59B6',
            element: 'LUA'
        },
        'HOD': { 
            level: 3, 
            name: 'GLÓRIA', 
            questionRange: [13, 18],
            milestone: 'c',
            color: '#3498DB',
            element: 'MERCÚRIO'
        },
        'NETZACH': { 
            level: 4, 
            name: 'VITÓRIA', 
            questionRange: [19, 24],
            milestone: 'a',
            color: '#2ECC71',
            element: 'VÊNUS'
        },
        'TIPHARETH': { 
            level: 5, 
            name: 'BELEZA', 
            questionRange: [25, 30],
            milestone: 's',
            color: '#F1C40F',
            element: 'SOL'
        },
        'GEBURAH': { 
            level: 6, 
            name: 'JULGAMENTO', 
            questionRange: [31, 36],
            milestone: 'i',
            color: '#E74C3C',
            element: 'MARTE'
        },
        'CHESED': { 
            level: 7, 
            name: 'MISERICÓRDIA', 
            questionRange: [37, 42],
            milestone: 'd',
            color: '#1ABC9C',
            element: 'JÚPITER'
        },
        'BINAH': { 
            level: 8, 
            name: 'ENTENDIMENTO', 
            questionRange: [43, 48],
            milestone: 'p',
            color: '#34495E',
            element: 'SATURNO'
        },
        'CHOCHMAH': { 
            level: 9, 
            name: 'SABEDORIA', 
            questionRange: [49, 54],
            milestone: 'e',
            color: '#2C3E50',
            element: 'ZODÍACO'
        },
        'KETHER': { 
            level: 10, 
            name: 'COROA', 
            questionRange: [55, 60],
            milestone: 'f',
            color: '#ECF0F1',
            element: 'PRIMUM MOBILE'
        }
    }
};

// ========== INICIALIZAÇÃO DO SISTEMA ==========
async function initApp() {
    console.log('[ANIMA] Inicializando Sistema Quântico...');
    
    try {
        // Carregar dados
        if (typeof QUESTIONS_DATA !== 'undefined') {
            STATE.questions = shuffleArray(QUESTIONS_DATA.questions);
            console.log(`✅ ${STATE.questions.length} questões quânticas carregadas`);
        }
        
        if (typeof ANIMALS_DATA !== 'undefined') {
            STATE.animals = ANIMALS_DATA;
            console.log(`✅ ${Object.keys(STATE.animals).length} arquétipos animais carregados`);
            
            // Inicializar superposição quântica
            initializeQuantumSuperposition();
        }
    } catch (err) {
        console.error('[ANIMA] Erro ao inicializar sistema:', err);
        showError('Falha na inicialização quântica');
        return;
    }
    
    // Configurar interface
    initMenu();
    initQuantumWheel();
    initTreeCanvas();
    
    // Configurar eventos PRIMEIRO
    setupEventListeners();
    
    // Inicializar partículas
    initParticles();
    
    // Atualizar botão de início
    updateInitButton();
    
    console.log('[ANIMA] Sistema quântico pronto para sincronização');
}

// ========== CONFIGURAÇÃO DE EVENT LISTENERS ==========
function setupEventListeners() {
    // Botão INICIAR JORNADA
    const initBtn = document.getElementById('initBtn');
    if (initBtn) {
        console.log('[EVENTS] Configurando botão de início...');
        initBtn.addEventListener('click', handleInitClick);
    }
    
    // Botão de observação
    const observeBtn = document.getElementById('observe-btn');
    if (observeBtn) {
        observeBtn.addEventListener('click', performObservation);
    }
    
    // Botão continuar jornada
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (STATE.currentQuestion < STATE.maxQuestions) {
                showScreen('sc-quiz');
                renderQuestion();
            }
        });
    }
    
    // Botão completar árvore
    const completeBtn = document.getElementById('complete-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', completeTreeJourney);
    }
    
    // Botão reiniciar
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', resetSystem);
    }
    
    // Botão spin (roda quântica)
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) {
        spinBtn.addEventListener('click', handleSpinClick);
    }
}

// ========== HANDLERS ESPECÍFICOS ==========
function handleInitClick() {
    console.log('[INIT] Iniciando jornada quântica...');
    
    // Resetar o sistema para nova jornada
    resetSystem();
    
    // Mostrar tela da roda quântica
    showScreen('sc-wheel');
    
    // Atualizar status
    const statusMonitor = document.querySelector('.status-monitor');
    if (statusMonitor) {
        statusMonitor.textContent = 'SISTEMA_ATIVO // JORNADA_INICIADA';
    }
}

function handleSpinClick() {
    const spinBtn = document.getElementById('spinBtn');
    const wheel = document.getElementById('mainWheel');
    
    if (!spinBtn || !wheel) return;
    
    // Desativar botão durante animação
    spinBtn.disabled = true;
    spinBtn.innerHTML = '<span class="spin-glow"></span>ATIVANDO PORTAL...';
    
    // Animação da roda
    const spins = 720 + Math.floor(Math.random() * 720);
    wheel.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
    wheel.style.transform = `rotate(${spins}deg)`;
    
    // Efeitos visuais
    const portalRing = document.querySelector('.portal-ring');
    if (portalRing) {
        portalRing.style.animationDuration = '5s';
    }
    
    const quantumStatus = document.querySelector('.quantum-status');
    if (quantumStatus) {
        quantumStatus.style.opacity = '0.5';
    }
    
    // Transição para o quiz
    setTimeout(() => {
        showScreen('sc-quiz');
        renderQuestion();
        
        // Resetar roda após transição
        setTimeout(() => {
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotate(0deg)';
            spinBtn.disabled = false;
            spinBtn.innerHTML = '<span class="spin-glow"></span>ATIVAR PORTAL QUÂNTICO';
            
            if (portalRing) {
                portalRing.style.animationDuration = '20s';
            }
            
            if (quantumStatus) {
                quantumStatus.style.opacity = '1';
            }
        }, 100);
    }, 3800);
}

// ========== SISTEMA DE QUESTÕES ==========
function renderQuestion() {
    // Verificar se completou a jornada
    if (STATE.treeJourney.completedMilestones.size >= 9 || 
        STATE.currentQuestion >= STATE.maxQuestions) {
        showTreeJourney();
        return;
    }
    
    const questionIndex = STATE.currentQuestion % STATE.questions.length;
    const question = STATE.questions[questionIndex];
    
    // Atualizar elementos da interface
    updateQuestionUI(question);
    updateJourneyProgress();
    updateQuantumDisplay();
}

function updateQuestionUI(question) {
    const qText = document.getElementById('q-text');
    const qPortal = document.getElementById('q-portal');
    const qOptions = document.getElementById('q-options');
    const questionCounter = document.getElementById('question-counter');
    
    if (!qText || !qPortal || !qOptions) return;
    
    // Atualizar texto da pergunta
    qText.textContent = question.q;
    
    // Atualizar subtítulo com Sephirah atual
    const sephirahName = TREE_OF_LIFE.sephiroth[STATE.treeJourney.currentSephirah].name;
    qPortal.textContent = `SEPHIRAH: ${sephirahName}`;
    
    // Atualizar contador
    if (questionCounter) {
        const counterValue = STATE.currentQuestion + 1;
        questionCounter.querySelector('.counter-value').textContent = 
            counterValue.toString().padStart(2, '0');
    }
    
    // Limpar opções anteriores
    qOptions.innerHTML = '';
    
    // Adicionar novas opções com animação
    question.a.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = answer.t;
        button.style.animationDelay = `${index * 0.1}s`;
        
        button.addEventListener('click', () => {
            handleAnswer(answer.s, answer.t);
        });
        
        qOptions.appendChild(button);
    });
}

function handleAnswer(animalSlug, answerText) {
    // Atualizar pontuação
    STATE.scores[animalSlug] = (STATE.scores[animalSlug] || 0) + 1;
    
    // Atualizar estado quântico
    updateQuantumState(animalSlug);
    
    // Atualizar jornada na Árvore
    updateTreeJourney();
    
    // Verificar milestones
    checkMilestones();
    
    // Avançar para próxima questão
    STATE.currentQuestion++;
    
    // Renderizar próxima questão ou mostrar resultados
    if (STATE.currentQuestion < STATE.maxQuestions && 
        STATE.treeJourney.completedMilestones.size < 9) {
        setTimeout(renderQuestion, 300);
    } else {
        setTimeout(() => {
            showTreeJourney();
        }, 500);
    }
}

// ========== SISTEMA QUÂNTICO ==========
function updateQuantumState(animalSlug) {
    const superposition = STATE.quantumState.superposition;
    const totalQuestions = STATE.currentQuestion + 1;
    
    // Calcular incremento baseado na coerência
    const increment = 0.15 + (STATE.quantumState.coherence * 0.05);
    
    // Atualizar probabilidades
    superposition.forEach((prob, animal) => {
        if (animal === animalSlug) {
            // Aumentar probabilidade do animal escolhido
            superposition.set(animal, Math.min(0.95, prob + increment));
        } else {
            // Reduzir gradualmente outros
            superposition.set(animal, Math.max(0.05, prob * 0.85));
        }
    });
    
    // Normalizar probabilidades
    normalizeProbabilities();
    
    // Atualizar entropia e coerência
    updateQuantumMetrics();
    
    // Atualizar display
    updateQuantumDisplay();
}

function normalizeProbabilities() {
    const superposition = STATE.quantumState.superposition;
    const total = Array.from(superposition.values()).reduce((a, b) => a + b, 0);
    
    if (total === 0) return;
    
    superposition.forEach((prob, animal) => {
        superposition.set(animal, prob / total);
    });
}

function updateQuantumMetrics() {
    const superposition = STATE.quantumState.superposition;
    const probabilities = Array.from(superposition.values());
    
    // Calcular entropia de Shannon
    let entropy = 0;
    probabilities.forEach(p => {
        if (p > 0) {
            entropy -= p * Math.log2(p);
        }
    });
    
    // Calcular coerência (inverso da entropia normalizada)
    const maxEntropy = Math.log2(superposition.size);
    const normalizedEntropy = entropy / maxEntropy;
    const coherence = 1 - normalizedEntropy;
    
    STATE.quantumState.entropy = entropy;
    STATE.quantumState.coherence = coherence;
}

function updateQuantumDisplay() {
    const superposition = STATE.quantumState.superposition;
    
    // Encontrar animal mais provável
    let maxProb = 0;
    let mostProbableAnimal = null;
    
    superposition.forEach((prob, animal) => {
        if (prob > maxProb) {
            maxProb = prob;
            mostProbableAnimal = animal;
        }
    });
    
    // Atualizar valores na interface
    const probabilityElement = document.getElementById('probability-value');
    const coherenceElement = document.getElementById('quantum-coherence');
    const questionsAnswered = document.getElementById('questions-answered');
    const totalEntropy = document.getElementById('total-entropy');
    
    if (probabilityElement) {
        probabilityElement.textContent = `${Math.round(maxProb * 100)}%`;
    }
    
    if (coherenceElement) {
        const coherenceValue = coherenceElement.querySelector('.coherence-value');
        if (coherenceValue) {
            coherenceValue.textContent = `${Math.round(STATE.quantumState.coherence * 100)}%`;
        }
    }
    
    if (questionsAnswered) {
        questionsAnswered.textContent = STATE.currentQuestion + 1;
    }
    
    if (totalEntropy) {
        totalEntropy.textContent = `${Math.round(STATE.quantumState.entropy * 10) / 10} bits`;
    }
}

// ========== ÁRVORE DA VIDA ==========
function initTreeCanvas() {
    const canvas = document.getElementById('tree-canvas');
    if (!canvas) return;
    
    // Configurar canvas
    const resizeCanvas = () => {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        drawTreeOfLife();
    };
    
    // Redimensionar canvas quando a janela muda de tamanho
    window.addEventListener('resize', resizeCanvas);
    
    // Desenhar inicialmente
    resizeCanvas();
}

function drawTreeOfLife() {
    const canvas = document.getElementById('tree-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Posições das Sephiroth
    const positions = calculateSephirothPositions(width, height);
    
    // Desenhar caminhos primeiro
    drawPaths(ctx, positions);
    
    // Desenhar Sephiroth
    drawSephiroth(ctx, positions);
}

function calculateSephirothPositions(width, height) {
    return {
        'KETHER': { x: width * 0.5, y: height * 0.1 },
        'CHOCHMAH': { x: width * 0.25, y: height * 0.25 },
        'BINAH': { x: width * 0.75, y: height * 0.25 },
        'CHESED': { x: width * 0.15, y: height * 0.45 },
        'GEBURAH': { x: width * 0.85, y: height * 0.45 },
        'TIPHARETH': { x: width * 0.5, y: height * 0.45 },
        'NETZACH': { x: width * 0.3, y: height * 0.65 },
        'HOD': { x: width * 0.7, y: height * 0.65 },
        'YESOD': { x: width * 0.5, y: height * 0.8 },
        'MALKUTH': { x: width * 0.5, y: height * 0.95 }
    };
}

function drawPaths(ctx, positions) {
    // Desenhar linhas entre as Sephiroth (caminhos simplificados)
    const connections = [
        ['KETHER', 'CHOCHMAH'],
        ['KETHER', 'BINAH'],
        ['CHOCHMAH', 'TIPHARETH'],
        ['BINAH', 'TIPHARETH'],
        ['CHOCHMAH', 'GEBURAH'],
        ['BINAH', 'GEBURAH'],
        ['GEBURAH', 'CHESED'],
        ['TIPHARETH', 'NETZACH'],
        ['TIPHARETH', 'HOD'],
        ['NETZACH', 'HOD'],
        ['NETZACH', 'YESOD'],
        ['HOD', 'YESOD'],
        ['YESOD', 'MALKUTH'],
        ['CHESED', 'NETZACH'],
        ['CHESED', 'TIPHARETH'],
        ['GEBURAH', 'TIPHARETH'],
        ['GEBURAH', 'HOD'],
        ['TIPHARETH', 'YESOD'],
        ['CHESED', 'GEBURAH'],
        ['NETZACH', 'HOD'],
        ['HOD', 'MALKUTH'],
        ['YESOD', 'MALKUTH']
    ];
    
    connections.forEach(([from, to]) => {
        const fromPos = positions[from];
        const toPos = positions[to];
        
        if (!fromPos || !toPos) return;
        
        ctx.beginPath();
        ctx.moveTo(fromPos.x, fromPos.y);
        ctx.lineTo(toPos.x, toPos.y);
        
        // Estilo do caminho
        const isActivated = STATE.treeJourney.activatedSephiroth.has(from) && 
                           STATE.treeJourney.activatedSephiroth.has(to);
        
        ctx.strokeStyle = isActivated ? 
            `rgba(0, 242, 255, ${0.3 + STATE.quantumState.coherence * 0.3})` : 
            'rgba(255, 255, 255, 0.1)';
        
        ctx.lineWidth = isActivated ? 3 : 1;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Brilho para caminhos ativados
        if (isActivated) {
            ctx.shadowColor = '#00f2ff';
            ctx.shadowBlur = 15;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    });
}

function drawSephiroth(ctx, positions) {
    Object.entries(positions).forEach(([sephirah, pos]) => {
        const sephirahData = TREE_OF_LIFE.sephiroth[sephirah];
        const isActivated = STATE.treeJourney.activatedSephiroth.has(sephirah);
        const isCurrent = STATE.treeJourney.currentSephirah === sephirah;
        
        // Tamanho baseado no estado
        let radius = isCurrent ? 25 : isActivated ? 20 : 15;
        let glowIntensity = isCurrent ? 25 : isActivated ? 15 : 0;
        
        // Cor baseada no estado
        let color = isActivated ? sephirahData.color : '#333333';
        
        // Desenhar brilho
        if (glowIntensity > 0) {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius + 10, 0, Math.PI * 2);
            ctx.fillStyle = `${color}${Math.floor(glowIntensity * 1.5).toString(16).padStart(2, '0')}`;
            ctx.fill();
        }
        
        // Desenhar círculo principal
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Borda
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = isActivated ? '#00f2ff' : '#666666';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Nome da Sephirah
        if (isActivated) {
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Orbitron';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(sephirahData.name, pos.x, pos.y);
            
            // Elemento
            ctx.fillStyle = '#00f2ff';
            ctx.font = '10px Orbitron';
            ctx.fillText(sephirahData.element, pos.x, pos.y + radius + 15);
        }
    });
}

function updateTreeJourney() {
    // Determinar Sephirah atual baseado na questão
    const questionNumber = STATE.currentQuestion + 1;
    let currentSephirah = 'MALKUTH';
    
    Object.entries(TREE_OF_LIFE.sephiroth).forEach(([sephirah, data]) => {
        if (questionNumber >= data.questionRange[0] && 
            questionNumber <= data.questionRange[1]) {
            currentSephirah = sephirah;
        }
    });
    
    // Atualizar estado
    STATE.treeJourney.currentSephirah = currentSephirah;
    STATE.treeJourney.activatedSephiroth.add(currentSephirah);
    
    // Atualizar UI
    updateJourneyUI();
    drawTreeOfLife();
}

function updateJourneyUI() {
    // Atualizar tracker da Sephirah
    const sephirahTracker = document.getElementById('current-sephirah');
    if (sephirahTracker) {
        sephirahTracker.textContent = STATE.treeJourney.currentSephirah;
    }
    
    // Atualizar progresso da jornada
    const journeyProgress = document.getElementById('journey-progress');
    if (journeyProgress) {
        const activatedCount = STATE.treeJourney.activatedSephiroth.size;
        journeyProgress.textContent = `${activatedCount}/10 SEPHIROTH`;
    }
    
    // Atualizar barra de progresso
    updateProgressBar();
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const milestoneDots = document.querySelectorAll('.milestone-dot');
    
    if (!progressFill) return;
    
    // Calcular progresso baseado nas Sephiroth ativadas
    const totalSephiroth = Object.keys(TREE_OF_LIFE.sephiroth).length;
    const activatedCount = STATE.treeJourney.activatedSephiroth.size;
    const progressPercentage = (activatedCount / totalSephiroth) * 100;
    
    progressFill.style.width = `${progressPercentage}%`;
    
    // Atualizar milestones
    milestoneDots.forEach(dot => {
        const milestone = dot.dataset.milestone;
        if (STATE.treeJourney.completedMilestones.has(milestone)) {
            dot.classList.add('active', 'unlocked');
        } else if (STATE.treeJourney.milestoneThresholds[milestone] <= 
                  (STATE.currentQuestion + 1)) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active', 'unlocked');
        }
    });
}

// ========== SISTEMA DE MILESTONES ==========
function checkMilestones() {
    // Encontrar animal com maior pontuação
    let maxScore = 0;
    let leadingAnimal = null;
    
    Object.entries(STATE.scores).forEach(([animal, score]) => {
        if (score > maxScore) {
            maxScore = score;
            leadingAnimal = animal;
        }
    });
    
    if (!leadingAnimal) return;
    
    // Verificar cada milestone
    Object.entries(STATE.treeJourney.milestoneThresholds).forEach(([milestone, threshold]) => {
        if (maxScore >= threshold && !STATE.treeJourney.completedMilestones.has(milestone)) {
            // Desbloquear milestone
            STATE.treeJourney.completedMilestones.add(milestone);
            
            // Revelar informação
            revealMilestone(milestone, leadingAnimal);
            
            // Notificação visual
            showMilestoneNotification(milestone, leadingAnimal);
            
            // Atualizar botão de observação
            updateObservationButton();
        }
    });
}

function revealMilestone(milestone, animalKey) {
    const animalData = STATE.animals[animalKey];
    if (!animalData) return;
    
    switch(milestone) {
        case 'n':
            revealName(animalData);
            break;
        case 'c':
            revealChakra(animalData);
            break;
        case 'a':
        case 's':
        case 'i':
            revealStats(animalData);
            break;
        case 'd':
            revealDescription(animalData);
            break;
        case 'p':
        case 'e':
        case 'f':
            // Para os outros milestones, apenas atualizar o botão de observação
            break;
    }
}

function revealName(animalData) {
    const nameElement = document.getElementById('animal-name');
    const hintElement = document.getElementById('animal-hint');
    const card = document.getElementById('revelation-name');
    
    if (nameElement) nameElement.textContent = animalData.n;
    if (hintElement) hintElement.textContent = animalData.d.split('.')[0];
    if (card) card.style.display = 'block';
}

function revealChakra(animalData) {
    const chakraElement = document.getElementById('animal-chakra');
    const symbolElement = document.getElementById('chakra-symbol');
    const card = document.getElementById('revelation-chakra');
    
    if (chakraElement) chakraElement.textContent = animalData.c;
    if (symbolElement) {
        // Mapear chakra para símbolo
        const chakraSymbols = {
            'RAIZ': '🜃', 'SACRO': '🜄', 'PLEXO SOLAR': '🜂',
            'CORAÇÃO': '🜁', 'GARGANTA': '🗣️', 'TERCEIRO OLHO': '👁️',
            'COROA': '👑'
        };
        symbolElement.textContent = chakraSymbols[animalData.c] || '●';
    }
    if (card) card.style.display = 'block';
}

function revealStats(animalData) {
    // Mostrar container de stats
    const statsContainer = document.getElementById('stats-revelation');
    if (statsContainer) statsContainer.style.display = 'block';
    
    // Atualizar valores com animação
    setTimeout(() => {
        updateStat('action', animalData.a);
        updateStat('sensibility', animalData.s);
        updateStat('intuition', animalData.i);
    }, 300);
}

function updateStat(stat, value) {
    const valueElement = document.getElementById(`${stat}-value`);
    const fillElement = document.getElementById(`${stat}-fill`);
    
    if (valueElement) {
        valueElement.textContent = Math.round(value * 100);
    }
    
    if (fillElement) {
        // Animação suave da barra
        setTimeout(() => {
            fillElement.style.width = `${value * 100}%`;
        }, 500);
    }
}

function revealDescription(animalData) {
    const descElement = document.getElementById('animal-description');
    const card = document.getElementById('revelation-desc');
    
    if (descElement) descElement.textContent = animalData.d;
    if (card) card.style.display = 'block';
}

function showMilestoneNotification(milestone, animalKey) {
    const animalData = STATE.animals[animalKey];
    const sephirah = STATE.treeJourney.milestoneToSephirah[milestone];
    const sephirahData = TREE_OF_LIFE.sephiroth[sephirah];
    
    if (!sephirahData) return;
    
    // Criar notificação
    const notification = document.createElement('div');
    notification.className = 'sephirah-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="sephirah-name">${sephirahData.name}</div>
            <div class="revelation-text">${getMilestoneName(milestone)} REVELADO</div>
            <div class="element-tag">${sephirahData.element}</div>
        </div>
    `;
    
    document.querySelector('.tree-canvas-wrapper').appendChild(notification);
    
    // Animação
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }, 10);
}

function getMilestoneName(milestone) {
    const names = {
        'n': 'NOME', 'c': 'CHAKRA', 'a': 'AÇÃO',
        's': 'SENSIBILIDADE', 'i': 'INTUIÇÃO', 'd': 'DESCRIÇÃO',
        'p': 'POLARIDADE', 'e': 'ELEMENTOS', 'f': 'FUNÇÃO'
    };
    return names[milestone] || milestone;
}

// ========== SISTEMA DE OBSERVAÇÃO ==========
function updateObservationButton() {
    const observeBtn = document.getElementById('observe-btn');
    if (!observeBtn) return;
    
    const completedCount = STATE.treeJourney.completedMilestones.size;
    
    if (completedCount > 0) {
        observeBtn.disabled = false;
        observeBtn.querySelector('.btn-text').textContent = 
            `OBSERVAR (${completedCount}/9)`;
    }
    
    // Se todos os milestones estão completos, ativar botão de completar
    if (completedCount >= 9) {
        const completeBtn = document.getElementById('complete-btn');
        if (completeBtn) {
            completeBtn.disabled = false;
        }
    }
}

function performObservation() {
    if (STATE.quantumState.collapsedAnimal) {
        // Já colapsado, mostrar resultado completo
        showCompleteResult();
        return;
    }
    
    // Colapsar a função de onda
    collapseWaveFunction();
    
    // Atualizar interface
    updatePostObservationUI();
    
    // Revelar todos os milestones do animal colapsado
    revealAllMilestones();
}

function collapseWaveFunction() {
    const superposition = STATE.quantumState.superposition;
    const probabilities = Array.from(superposition.values());
    const animals = Array.from(superposition.keys());
    
    // Simulação do colapso quântico
    let random = Math.random();
    let cumulative = 0;
    let collapsedAnimal = null;
    
    for (let i = 0; i < probabilities.length; i++) {
        cumulative += probabilities[i];
        if (random <= cumulative) {
            collapsedAnimal = animals[i];
            break;
        }
    }
    
    STATE.quantumState.collapsedAnimal = collapsedAnimal;
    STATE.quantumState.observationPoints = STATE.treeJourney.completedMilestones.size;
    
    console.log('[QUANTUM] Função de onda colapsada:', collapsedAnimal);
}

function updatePostObservationUI() {
    // Atualizar estado quântico
    const stateElement = document.getElementById('quantum-state');
    if (stateElement) {
        stateElement.textContent = 'COLAPSADO';
        stateElement.style.color = '#ff00ff';
    }
    
    // Desativar botão de observação
    const observeBtn = document.getElementById('observe-btn');
    if (observeBtn) {
        observeBtn.disabled = true;
        observeBtn.innerHTML = '<span class="btn-icon">⚛️</span><span class="btn-text">COLAPSADO</span>';
    }
    
    // Ativar todos os caminhos na árvore
    Object.keys(TREE_OF_LIFE.sephiroth).forEach(sephirah => {
        STATE.treeJourney.activatedSephiroth.add(sephirah);
    });
    
    // Redesenhar árvore
    drawTreeOfLife();
}

function revealAllMilestones() {
    if (!STATE.quantumState.collapsedAnimal) return;
    
    const animalData = STATE.animals[STATE.quantumState.collapsedAnimal];
    if (!animalData) return;
    
    // Revelar todos os milestones disponíveis
    STATE.treeJourney.completedMilestones.forEach(milestone => {
        revealMilestone(milestone, STATE.quantumState.collapsedAnimal);
    });
    
    // Adicionar milestones restantes
    const allMilestones = ['n', 'c', 'a', 's', 'i', 'd', 'p', 'e', 'f'];
    allMilestones.forEach(milestone => {
        if (!STATE.treeJourney.completedMilestones.has(milestone)) {
            STATE.treeJourney.completedMilestones.add(milestone);
            revealMilestone(milestone, STATE.quantumState.collapsedAnimal);
        }
    });
}

function completeTreeJourney() {
    if (!STATE.quantumState.collapsedAnimal) {
        performObservation();
        return;
    }
    
    const animalData = STATE.animals[STATE.quantumState.collapsedAnimal];
    
    // Efeito visual de completude
    const treeWrapper = document.querySelector('.tree-canvas-wrapper');
    if (treeWrapper) {
        treeWrapper.style.boxShadow = '0 0 60px #00ff00, inset 0 0 30px rgba(0, 255, 0, 0.2)';
    }
    
    // Mostrar mensagem final
    showCompletionMessage(animalData);
}

function showCompletionMessage(animalData) {
    // Criar mensagem de completude
    const message = document.createElement('div');
    message.className = 'sephirah-notification';
    message.innerHTML = `
        <div class="notification-content">
            <div class="sephirah-name">JORNADA COMPLETA</div>
            <div class="revelation-text">${animalData.n} REVELADO</div>
            <div style="margin-top: 20px; font-size: 0.9rem; color: rgba(255,255,255,0.8)">
                A Árvore da Vida foi completamente ativada.<br>
                Seu arquétipo animal foi revelado em sua totalidade.
            </div>
        </div>
    `;
    
    document.querySelector('.tree-canvas-wrapper').appendChild(message);
    
    // Animação
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
}

// ========== TRANSIÇÕES DE TELA ==========
function showScreen(screenId) {
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar tela solicitada
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        
        // Ajustar overflow do body
        if (screenId === 'sc-tree') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function showTreeJourney() {
    showScreen('sc-tree');
    updateTreeJourneyUI();
}

function updateTreeJourneyUI() {
    // Atualizar todos os elementos da interface da árvore
    updateQuantumDisplay();
    updateJourneyUI();
    updateObservationButton();
    drawTreeOfLife();
}

// ========== SISTEMA DE MENU ==========
function initMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    
    if (!menuBtn || !sideMenu || !overlay) return;
    
    const toggleMenu = () => {
        const isActive = sideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    };
    
    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Fechar menu com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// ========== RODA QUÂNTICA ==========
function initQuantumWheel() {
    // A função handleSpinClick já está configurada em setupEventListeners
    console.log('[WHEEL] Roda quântica inicializada');
}

// ========== PARTÍCULAS ==========
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Configurar canvas
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Criar partículas
    const particles = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(0, ${Math.floor(242 + Math.random() * 13)}, 255, ${Math.random() * 0.4 + 0.1})`
        });
    }
    
    // Loop de animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            // Atualizar posição
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Rebater nas bordas
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Desenhar partícula
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Conexões
            particles.forEach(other => {
                const dx = p.x - other.x;
                const dy = p.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(0, 242, 255, ${0.1 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.3;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ========== FUNÇÕES UTILITÁRIAS ==========
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function updateInitButton() {
    const initBtn = document.getElementById('initBtn');
    if (initBtn) {
        initBtn.disabled = false;
        initBtn.textContent = 'INICIAR JORNADA QUÂNTICA';
        console.log('[UI] Botão de início atualizado e pronto');
    }
}

function resetSystem() {
    console.log('[SYSTEM] Reiniciando sistema quântico...');
    
    // Resetar estado
    STATE.currentQuestion = 0;
    STATE.scores = {};
    STATE.treeJourney = {
        currentSephirah: 'MALKUTH',
        activatedSephiroth: new Set(['MALKUTH']),
        completedMilestones: new Set(),
        milestoneThresholds: {
            'n': 3, 'c': 5, 'a': 7, 's': 9, 'i': 11,
            'd': 13, 'p': 15, 'e': 17, 'f': 19
        },
        milestoneToSephirah: {
            'n': 'YESOD', 'c': 'HOD', 'a': 'NETZACH',
            's': 'TIPHARETH', 'i': 'GEBURAH', 'd': 'CHESED',
            'p': 'BINAH', 'e': 'CHOCHMAH', 'f': 'KETHER'
        }
    };
    
    STATE.quantumState = {
        superposition: new Map(),
        collapsedAnimal: null,
        observationPoints: 0,
        entropy: 0,
        coherence: 0
    };
    
    STATE.currentAnimal = null;
    
    // Reinicializar superposição
    initializeQuantumSuperposition();
    
    // Resetar UI
    resetUI();
    
    console.log('[SYSTEM] Sistema reiniciado com sucesso');
}

function resetUI() {
    // Resetar progresso visual
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
    }
    
    // Resetar milestones
    const milestoneDots = document.querySelectorAll('.milestone-dot');
    milestoneDots.forEach(dot => {
        dot.classList.remove('active', 'unlocked');
    });
    
    // Resetar contadores
    const questionCounter = document.getElementById('question-counter');
    if (questionCounter) {
        questionCounter.querySelector('.counter-value').textContent = '01';
    }
    
    const questionsAnswered = document.getElementById('questions-answered');
    if (questionsAnswered) {
        questionsAnswered.textContent = '0';
    }
    
    // Resetar probabilidade
    const probabilityValue = document.getElementById('probability-value');
    if (probabilityValue) {
        probabilityValue.textContent = '--%';
    }
    
    // Resetar coerência
    const coherenceElement = document.getElementById('quantum-coherence');
    if (coherenceElement) {
        const coherenceValue = coherenceElement.querySelector('.coherence-value');
        if (coherenceValue) {
            coherenceValue.textContent = '0%';
        }
    }
    
    // Resetar entropia
    const totalEntropy = document.getElementById('total-entropy');
    if (totalEntropy) {
        totalEntropy.textContent = '0%';
    }
    
    // Esconder todas as revelações
    hideAllRevelations();
    
    // Resetar estado quântico na UI
    const quantumStateElement = document.getElementById('quantum-state');
    if (quantumStateElement) {
        quantumStateElement.textContent = 'SUPERPOSIÇÃO';
        quantumStateElement.style.color = '';
    }
    
    // Resetar botão de observação
    const observeBtn = document.getElementById('observe-btn');
    if (observeBtn) {
        observeBtn.disabled = true;
        observeBtn.innerHTML = '<span class="btn-icon">👁️</span><span class="btn-text">OBSERVAR (0/9)</span>';
    }
    
    // Resetar botão completar
    const completeBtn = document.getElementById('complete-btn');
    if (completeBtn) {
        completeBtn.disabled = true;
    }
    
    // Redesenhar árvore
    drawTreeOfLife();
}

function hideAllRevelations() {
    const revelations = [
        'revelation-name',
        'revelation-chakra',
        'stats-revelation',
        'revelation-desc'
    ];
    
    revelations.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
        }
    });
}

function initializeQuantumSuperposition() {
    const animals = Object.keys(STATE.animals);
    const initialProbability = 1 / animals.length;
    
    animals.forEach(animal => {
        STATE.quantumState.superposition.set(animal, initialProbability);
    });
    
    console.log('[QUANTUM] Superposição inicializada com', 
        STATE.quantumState.superposition.size, 'animais');
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'sephirah-notification';
    errorDiv.innerHTML = `
        <div class="notification-content">
            <div class="sephirah-name" style="color: #ff4444;">ERRO</div>
            <div class="revelation-text">${message}</div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-top: 20px; padding: 10px 20px; background: #ff4444; border: none; color: white; cursor: pointer;">
                FECHAR
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.classList.add('show'), 10);
}

// ========== INICIALIZAÇÃO ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}