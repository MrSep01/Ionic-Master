
import React, { useState, useEffect, useCallback } from 'react';
import { Ion, IonType, Challenge, GameState, DifficultyLevel, LEVEL_ORDER, HistoryEntry, GameMode, TrainingConfig } from './types';
import { CATIONS, ANIONS, LEVEL_CONFIG, WINS_TO_ADVANCE } from './constants';
import * as GeminiService from './services/gemini';
import * as StorageService from './services/storage';
import Workstation from './components/Workstation';
import AITutor from './components/AITutor';
import PeriodicTable from './components/PeriodicTable';
import PolyatomicTable from './components/PolyatomicTable';
import OxyanionGuide from './components/OxyanionGuide';
import Notebook from './components/Notebook';
import Certificate from './components/Certificate';
import SettingsModal from './components/SettingsModal';
import TrainingModal from './components/TrainingModal';
import HelpGuide from './components/HelpGuide';
import WelcomeModal from './components/WelcomeModal';
import Footer from './components/Footer';
import PortalDashboard from './components/portal/PortalDashboard';
import UnitViewer from './components/portal/UnitViewer';
import { IGCSE_UNIT_1 } from './portal/igcse-unit1';
import { IGCSE_UNIT_2 } from './portal/igcse-unit2';
import { IGCSE_UNIT_5 } from './portal/igcse-unit5';
import { FlaskConical, Trophy, BrainCircuit, LayoutGrid, Layers, BookOpen, Lock, CheckCircle, Settings, NotebookPen, HelpCircle, User, LogOut } from 'lucide-react';

// Helper for subscripts
const toSubscript = (n: number) => n.toString().split('').map(c => '₀₁₂₃₄₅₆₇₈₉'[parseInt(c)]).join('');
const formatFormula = (cation: Ion, anion: Ion, cCount: number, aCount: number) => {
    let formula = cation.symbol;
    const cationPart = cation.isPolyatomic && cCount > 1 ? `(${cation.symbol})` : cation.symbol;
    const cationSub = cCount > 1 ? toSubscript(cCount) : '';
    
    const anionPart = anion.isPolyatomic && aCount > 1 ? `(${anion.symbol})` : anion.symbol;
    const anionSub = aCount > 1 ? toSubscript(aCount) : '';
    
    const formatSymbol = (s: string) => s.replace(/\d+/g, (match) => toSubscript(parseInt(match)));

    return `${formatSymbol(cationPart)}${cationSub}${formatSymbol(anionPart)}${anionSub}`;
};

type ViewState = 'PORTAL' | 'GAME' | 'UNIT';

const App: React.FC = () => {
  // --- View State ---
  const [viewState, setViewState] = useState<ViewState>('PORTAL');
  const [currentUnitId, setCurrentUnitId] = useState<string | null>(null);

  // --- Game State ---
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = StorageService.loadProgress();
    const baseState: GameState = {
        nickname: undefined,
        gameMode: GameMode.CAREER,
        level: DifficultyLevel.NOVICE,
        score: 0,
        streak: 0,
        currentChallenge: null,
        selectedCation: null,
        selectedAnion: null,
        cationCount: 1,
        anionCount: 1,
        gameStatus: 'playing',
        feedbackMessage: '',
        showTutor: false,
        unlockedLevels: [DifficultyLevel.NOVICE],
        levelWins: 0,
        notes: '',
        history: [],
        certificates: [],
        completedLessons: []
    };

    if (saved) {
        return {
            ...baseState,
            ...saved,
            level: LEVEL_ORDER.includes(saved.level) ? saved.level : DifficultyLevel.NOVICE,
            history: saved.history || [],
            certificates: saved.certificates || [],
            completedLessons: saved.completedLessons || []
        };
    }
    return baseState;
  });

  const [activeTab, setActiveTab] = useState<'periodic' | 'polyatomic' | 'oxyanions' | 'notebook'>('periodic');
  const [isAILoading, setIsAILoading] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [completedLevel, setCompletedLevel] = useState<DifficultyLevel | null>(null);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  // --- Auto-Save Effect (Only in Career Mode) ---
  useEffect(() => {
      if (gameState.gameMode === GameMode.CAREER) {
          StorageService.saveProgress(gameState, hasSeenTutorial);
      }
  }, [gameState, hasSeenTutorial]);

  // --- Game Logic ---

  const generateChallenge = useCallback((level: DifficultyLevel, gameMode: GameMode, trainingConfig?: TrainingConfig): Challenge => {
    let cations = [];
    let anions = [];
    
    if (gameMode === GameMode.TRAINING && trainingConfig) {
        // Custom Training Pool Logic
        if (trainingConfig.pool === 'ALL') {
            cations = CATIONS;
            anions = ANIONS;
        } else if (trainingConfig.pool === 'SIMPLE') {
            cations = CATIONS.filter(c => !c.isPolyatomic && !['Fe','Cu','Pb','Sn','Hg','Mn','Zn','Ag'].includes(c.elementSymbol || ''));
            anions = ANIONS.filter(a => !a.isPolyatomic);
        } else if (trainingConfig.pool === 'POLYATOMIC') {
            cations = CATIONS.filter(c => c.isPolyatomic);
            anions = ANIONS.filter(a => a.isPolyatomic);
            // Fallback if list is too small (e.g. poly cations are few)
            if (cations.length === 0) cations = CATIONS.filter(c => !c.isPolyatomic);
        } else if (trainingConfig.pool === 'TRANSITION') {
            cations = CATIONS.filter(c => ['Fe','Cu','Pb','Sn','Hg','Mn','Zn','Ag'].includes(c.elementSymbol || ''));
            anions = ANIONS; // Transition metals bond with anything
        }
    } else {
        // Career Logic
        const config = LEVEL_CONFIG[level];
        cations = config.ions.cations;
        anions = config.ions.anions;
    }

    // Safety fallback
    if (!cations || cations.length === 0) cations = CATIONS;
    if (!anions || anions.length === 0) anions = ANIONS;

    const cIdx = Math.floor(Math.random() * cations.length);
    const aIdx = Math.floor(Math.random() * anions.length);
    const cation = cations[cIdx];
    const anion = anions[aIdx];

    let targetName = `${cation.name} ${anion.name}`;
    let cationOptions: string[] = [];
    let anionOptions: string[] = [];

    // Grandmaster or Training-Naming Mode Logic
    const isNamingTask = level === DifficultyLevel.GRANDMASTER || (gameMode === GameMode.TRAINING && trainingConfig?.type === 'NAME');

    if (isNamingTask) {
        // Calculate formula for display
        const lcm = (a, b) => {
            const gcd = (x, y) => (!y ? x : gcd(y, x % y));
            return (a * b) / gcd(a, b);
        };
        const common = lcm(cation.charge, Math.abs(anion.charge));
        const cCount = common / cation.charge;
        const aCount = common / Math.abs(anion.charge);
        
        targetName = formatFormula(cation, anion, cCount, aCount);

        // Generate Distractors
        const getRandom = (arr: Ion[], exclude: string) => {
            const filtered = arr.filter(i => i.name !== exclude);
            return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)].name : "Unknown";
        };

        const cationDistractors = new Set<string>();
        cationDistractors.add(cation.name);
        // Try to find same element (e.g. Iron II vs Iron III)
        const sameElement = cations.find(c => c.elementSymbol === cation.elementSymbol && c.name !== cation.name);
        if (sameElement) cationDistractors.add(sameElement.name);
        
        let safeLoop = 0;
        while(cationDistractors.size < 4 && safeLoop < 20) {
            cationDistractors.add(getRandom(cations, cation.name));
            safeLoop++;
        }
        cationOptions = Array.from(cationDistractors).sort(() => Math.random() - 0.5);

        const anionDistractors = new Set<string>();
        anionDistractors.add(anion.name);
        const similar = anions.find(a => 
            (a.name.startsWith(anion.name.substring(0, 3)) || anion.name.startsWith(a.name.substring(0, 3))) 
            && a.name !== anion.name
        );
        if (similar) anionDistractors.add(similar.name);

        safeLoop = 0;
        while(anionDistractors.size < 4 && safeLoop < 20) {
            anionDistractors.add(getRandom(anions, anion.name));
            safeLoop++;
        }
        anionOptions = Array.from(anionDistractors).sort(() => Math.random() - 0.5);
    }

    return {
      targetName,
      cation,
      anion,
      cationOptions,
      anionOptions
    };
  }, []);

  // Ensure initial challenge exists
  useEffect(() => {
    if (viewState === 'GAME' && !gameState.currentChallenge) {
      const challenge = generateChallenge(gameState.level, gameState.gameMode, gameState.trainingConfig);
      setGameState(prev => ({ ...prev, currentChallenge: challenge }));
    }
  }, [viewState, gameState.level, gameState.gameMode, gameState.trainingConfig, gameState.currentChallenge, generateChallenge]);

  // Validation Effect for Career Mode
  useEffect(() => {
      if (viewState === 'GAME' && gameState.gameMode === GameMode.CAREER && gameState.currentChallenge && gameState.gameStatus === 'playing') {
          const config = LEVEL_CONFIG[gameState.level];
          const isValidCation = config.ions.cations.some(c => c.symbol === gameState.currentChallenge!.cation.symbol);
          const isValidAnion = config.ions.anions.some(a => a.symbol === gameState.currentChallenge!.anion.symbol);
          
          if (!isValidCation || !isValidAnion) {
              setGameState(prev => ({
                  ...prev,
                  currentChallenge: generateChallenge(prev.level, prev.gameMode, prev.trainingConfig),
                  selectedCation: null,
                  selectedAnion: null,
                  cationCount: 1,
                  anionCount: 1,
                  feedbackMessage: '',
                  showTutor: false
              }));
          }
      }
  }, [viewState, gameState.level, gameState.currentChallenge, gameState.gameStatus, generateChallenge, gameState.gameMode]);

  const handleIonSelect = (ion: Ion) => {
    if (gameState.gameStatus !== 'playing') return;
    setGameState(prev => ({
      ...prev,
      selectedCation: ion.type === IonType.CATION ? ion : prev.selectedCation,
      selectedAnion: ion.type === IonType.ANION ? ion : prev.selectedAnion,
      cationCount: ion.type === IonType.CATION ? 1 : prev.cationCount,
      anionCount: ion.type === IonType.ANION ? 1 : prev.anionCount,
      feedbackMessage: '',
      showTutor: false
    }));
  };

  const handleGrandmasterSelect = (type: IonType, name: string) => {
      const ionList = type === IonType.CATION ? CATIONS : ANIONS;
      const ion = ionList.find(i => i.name === name);
      if (ion) {
          handleIonSelect(ion);
      }
  };

  const handleCountUpdate = (type: IonType, change: number) => {
    setGameState(prev => ({
      ...prev,
      cationCount: type === IonType.CATION ? Math.max(1, prev.cationCount + change) : prev.cationCount,
      anionCount: type === IonType.ANION ? Math.max(1, prev.anionCount + change) : prev.anionCount,
    }));
  };

  const handleClear = () => {
      setGameState(prev => ({
          ...prev,
          selectedCation: null,
          selectedAnion: null,
          cationCount: 1,
          anionCount: 1,
          feedbackMessage: '',
          gameStatus: 'playing',
          showTutor: false
      }));
  };

  const handleStartTraining = (config: TrainingConfig) => {
      setShowTraining(false);
      setGameState(prev => ({
          ...prev,
          gameMode: GameMode.TRAINING,
          trainingConfig: config,
          currentChallenge: generateChallenge(prev.level, GameMode.TRAINING, config), // level ignored in training
          selectedCation: null,
          selectedAnion: null,
          gameStatus: 'playing',
          feedbackMessage: '',
          showTutor: false
      }));
  };

  const handleExitTraining = () => {
      setGameState(prev => ({
          ...prev,
          gameMode: GameMode.CAREER,
          trainingConfig: undefined,
          currentChallenge: generateChallenge(prev.level, GameMode.CAREER),
          selectedCation: null,
          selectedAnion: null,
          gameStatus: 'playing',
          feedbackMessage: '',
          showTutor: false
      }));
  };

  const handleResetProgress = () => {
    StorageService.clearProgress();
    const newLevel = DifficultyLevel.NOVICE;
    setGameState({
        nickname: undefined,
        gameMode: GameMode.CAREER,
        level: newLevel,
        score: 0,
        streak: 0,
        currentChallenge: generateChallenge(newLevel, GameMode.CAREER),
        selectedCation: null,
        selectedAnion: null,
        cationCount: 1,
        anionCount: 1,
        gameStatus: 'playing',
        feedbackMessage: '',
        showTutor: false,
        unlockedLevels: [DifficultyLevel.NOVICE],
        levelWins: 0,
        notes: '',
        history: [],
        certificates: [],
        completedLessons: []
    });
    setHasSeenTutorial(false);
    setShowSettings(false);
    setShowHelp(true);
  };

  const handleSetNickname = (name: string) => {
      setGameState(prev => ({ ...prev, nickname: name }));
      StorageService.saveProgress({ ...gameState, nickname: name }, hasSeenTutorial);
  };

  const handleUpdateNotes = (text: string) => {
      setGameState(prev => ({ ...prev, notes: text }));
  };

  const requestTutorHelp = async () => {
    if (!gameState.currentChallenge) return;
    setIsAILoading(true);
    const help = await GeminiService.getTutorHelp(
        gameState.level, 
        gameState.currentChallenge.targetName,
        gameState.currentChallenge.cation,
        gameState.currentChallenge.anion
    );
    setIsAILoading(false);
    setGameState(prev => ({ ...prev, feedbackMessage: help, showTutor: true }));
  };

  const handleSubmit = async () => {
    const { currentChallenge, selectedCation, selectedAnion, cationCount, anionCount, level, gameMode, trainingConfig } = gameState;
    if (!currentChallenge || !selectedCation || !selectedAnion) return;

    let isSuccess = false;
    const isNamingTask = level === DifficultyLevel.GRANDMASTER || (gameMode === GameMode.TRAINING && trainingConfig?.type === 'NAME');

    if (isNamingTask) {
        // Validation for Naming
        const isCorrectCation = selectedCation.name === currentChallenge.cation.name;
        const isCorrectAnion = selectedAnion.name === currentChallenge.anion.name;
        isSuccess = isCorrectCation && isCorrectAnion;
    } else {
        // Validation for Building
        const isCorrectIons = selectedCation.symbol === currentChallenge.cation.symbol && 
                              selectedAnion.symbol === currentChallenge.anion.symbol;
        const isCorrectCharges = selectedCation.charge === currentChallenge.cation.charge &&
                                 selectedAnion.charge === currentChallenge.anion.charge;
        const netCharge = (selectedCation.charge * cationCount) + (selectedAnion.charge * anionCount);
        const isBalanced = netCharge === 0;
        isSuccess = isCorrectIons && isCorrectCharges && isBalanced;
    }

    setIsAILoading(true);
    const properName = `${currentChallenge.cation.name} ${currentChallenge.anion.name}`;
    
    const feedback = await GeminiService.getAIFeedback(
        selectedCation,
        selectedAnion,
        cationCount,
        anionCount,
        properName,
        isSuccess
    );
    setIsAILoading(false);

    if (isSuccess) {
      const newWins = gameState.levelWins + 1;
      
      const newHistoryEntry: HistoryEntry = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        targetName: properName,
        cation: selectedCation,
        anion: selectedAnion,
        cationCount: cationCount,
        anionCount: anionCount,
        funFact: feedback
      };

      setGameState(prev => ({
        ...prev,
        score: prev.gameMode === GameMode.CAREER ? prev.score + 10 + (prev.streak * 2) : prev.score,
        streak: prev.streak + 1,
        levelWins: newWins,
        gameStatus: 'success',
        feedbackMessage: feedback,
        showTutor: true,
        history: prev.gameMode === GameMode.CAREER ? [newHistoryEntry, ...prev.history] : prev.history
      }));

    } else {
      setGameState(prev => ({
        ...prev,
        streak: 0,
        gameStatus: 'error',
        feedbackMessage: feedback,
        showTutor: true
      }));
    }
  };

  const handleNextChallenge = () => {
    // Only advance level if in Career mode
    if (gameState.gameMode === GameMode.CAREER && gameState.levelWins >= WINS_TO_ADVANCE) {
         setCompletedLevel(gameState.level);
         setShowCertificate(true);
         
         const hasCertificate = gameState.certificates.some(c => c.level === gameState.level);
         let newCertificates = gameState.certificates;
         
         if (!hasCertificate) {
             newCertificates = [...gameState.certificates, {
                 level: gameState.level,
                 timestamp: Date.now()
             }];
         }

         const currentIdx = LEVEL_ORDER.indexOf(gameState.level);
         let newUnlocked = gameState.unlockedLevels;
         if (currentIdx < LEVEL_ORDER.length - 1) {
             const nextLevel = LEVEL_ORDER[currentIdx + 1];
             newUnlocked = gameState.unlockedLevels.includes(nextLevel) 
                   ? gameState.unlockedLevels 
                   : [...gameState.unlockedLevels, nextLevel];
         }

         setGameState(prev => ({
             ...prev,
             certificates: newCertificates,
             unlockedLevels: newUnlocked
         }));

    } else {
        setGameState(prev => ({
            ...prev,
            gameStatus: 'playing',
            currentChallenge: generateChallenge(prev.level, prev.gameMode, prev.trainingConfig),
            selectedCation: null,
            selectedAnion: null,
            cationCount: 1,
            anionCount: 1,
            feedbackMessage: '',
            showTutor: false
        }));
    }
  };

  const changeLevel = (level: DifficultyLevel) => {
      if (!gameState.unlockedLevels.includes(level)) return;
      setGameState(prev => ({
          ...prev,
          level: level,
          currentChallenge: generateChallenge(level, GameMode.CAREER),
          selectedCation: null,
          selectedAnion: null,
          score: 0, 
          streak: 0,
          levelWins: 0,
          feedbackMessage: '',
          gameStatus: 'playing'
      }));
  };

  const handleNextLevel = () => {
      const currentIdx = LEVEL_ORDER.indexOf(gameState.level);
      if (currentIdx < LEVEL_ORDER.length - 1) {
          const nextLevel = LEVEL_ORDER[currentIdx + 1];
          changeLevel(nextLevel);
      }
      setShowCertificate(false);
  };

  const handleCloseCertificate = () => {
      setShowCertificate(false);
      setGameState(prev => ({
          ...prev,
          gameStatus: 'playing',
          currentChallenge: generateChallenge(prev.level, prev.gameMode, prev.trainingConfig),
          selectedCation: null,
          selectedAnion: null,
          cationCount: 1,
          anionCount: 1,
          feedbackMessage: '',
          showTutor: false,
          levelWins: 0
      }));
  };

  const handleViewCertificate = (level: DifficultyLevel) => {
      setCompletedLevel(level);
      setShowCertificate(true);
  };

  const handleCloseHelp = () => {
      setShowHelp(false);
      setHasSeenTutorial(true);
  };
  
  const handleStartUnit = (unitId: string) => {
      setCurrentUnitId(unitId);
      setViewState('UNIT');
  };

  const handleLessonComplete = (lessonId: string) => {
      if (!gameState.completedLessons.includes(lessonId)) {
          setGameState(prev => ({
              ...prev,
              completedLessons: [...prev.completedLessons, lessonId]
          }));
      }
  };

  // --- PORTAL VIEW ---
  if (viewState === 'PORTAL') {
      return (
        <PortalDashboard 
            onStartUnit={handleStartUnit} 
            completedLessons={gameState.completedLessons}
        />
      );
  }

  // --- UNIT/LMS VIEW ---
  if (viewState === 'UNIT') {
      let unitData = IGCSE_UNIT_1;
      if (currentUnitId === 'igcse-topic-2') unitData = IGCSE_UNIT_2;
      if (currentUnitId === 'igcse-topic-5') unitData = IGCSE_UNIT_5;
      
      return (
        <UnitViewer 
            unit={unitData} 
            onExit={() => setViewState('PORTAL')}
            onLaunchSimulation={() => setViewState('GAME')}
            completedLessons={gameState.completedLessons}
            onLessonComplete={handleLessonComplete}
        />
      );
  }

  // --- GAME VIEW ---
  const currentConfig = LEVEL_CONFIG[gameState.level];
  const currentLevelIdx = LEVEL_ORDER.indexOf(gameState.level);
  
  let displayCations = currentConfig.ions.cations;
  let displayAnions = currentConfig.ions.anions;

  if (gameState.gameMode === GameMode.TRAINING && gameState.trainingConfig) {
      if (gameState.trainingConfig.pool === 'ALL' || gameState.trainingConfig.pool === 'TRANSITION') {
          displayCations = CATIONS;
          displayAnions = ANIONS;
      } else if (gameState.trainingConfig.pool === 'SIMPLE') {
          displayCations = CATIONS.filter(c => !c.isPolyatomic);
          displayAnions = ANIONS.filter(a => !a.isPolyatomic);
      } else if (gameState.trainingConfig.pool === 'POLYATOMIC') {
          displayCations = CATIONS;
          displayAnions = ANIONS.filter(a => a.isPolyatomic);
      }
  }

  return (
    <div className="min-h-screen h-dvh bg-indigo-50 flex flex-col overflow-hidden font-sans">
      
      {!gameState.nickname && (
          <WelcomeModal onSetNickname={handleSetNickname} />
      )}

      {showSettings && (
          <SettingsModal 
            onClose={() => setShowSettings(false)}
            onReset={handleResetProgress}
            onUpdateNickname={handleSetNickname}
            currentLevel={gameState.level}
            score={gameState.score}
            nickname={gameState.nickname}
          />
      )}

      {showTraining && (
          <TrainingModal 
             onClose={() => setShowTraining(false)}
             onStart={handleStartTraining}
          />
      )}

      {showCertificate && completedLevel && (
          <Certificate 
            level={completedLevel} 
            onNext={handleNextLevel}
            onClose={handleCloseCertificate}
            hasNextLevel={currentLevelIdx < LEVEL_ORDER.length - 1}
            nickname={gameState.nickname || 'Student'}
          />
      )}

      {showHelp && (
          <HelpGuide onClose={handleCloseHelp} />
      )}

      <header className="bg-white border-b border-indigo-100 px-3 py-2 md:px-6 md:py-4 flex items-center justify-between shadow-sm z-30 shrink-0 relative h-12 md:h-16">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
            
            <div className="flex items-center gap-2 md:gap-6">
                <button
                    onClick={() => setViewState('UNIT')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wide transition-colors"
                >
                    <LogOut className="w-3 h-3 md:w-4 md:h-4" /> Exit to Unit
                </button>

                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-500 p-1 md:p-2 rounded-lg md:rounded-xl shadow-lg shadow-indigo-200">
                         <FlaskConical className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <h1 className="text-sm md:text-2xl font-black tracking-tight text-slate-800 flex flex-col md:block leading-none">
                        <span>IONIC</span><span className="text-emerald-600">MASTER</span>
                    </h1>
                </div>
                
                {gameState.nickname && (
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                        <User className="w-3 h-3 text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">{gameState.nickname}</span>
                    </div>
                )}
                
                {gameState.gameMode === GameMode.CAREER ? (
                    <div className="hidden lg:flex bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200 overflow-x-auto max-w-[400px]">
                        {LEVEL_ORDER.map((lvl) => {
                            const isUnlocked = gameState.unlockedLevels.includes(lvl);
                            const isCurrent = gameState.level === lvl;
                            return (
                                <button
                                    key={lvl}
                                    onClick={() => changeLevel(lvl)}
                                    disabled={!isUnlocked}
                                    className={`
                                        px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 whitespace-nowrap
                                        ${isCurrent ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'}
                                        ${!isUnlocked ? 'opacity-40 cursor-not-allowed' : ''}
                                    `}
                                >
                                    {lvl === DifficultyLevel.GRANDMASTER ? 'G.Master' : lvl}
                                    {!isUnlocked && <Lock className="w-3 h-3" />}
                                    {isUnlocked && !isCurrent && gameState.unlockedLevels.indexOf(lvl) < currentLevelIdx && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-700 font-bold uppercase text-xs tracking-wider">
                         <FlaskConical className="w-4 h-4" /> Training Lab Active
                         <button onClick={handleExitTraining} className="ml-2 text-xs underline opacity-70 hover:opacity-100">Exit</button>
                    </div>
                )}
            </div>
            
            <div className="flex items-center gap-2 md:gap-6">
                
                <button
                    onClick={() => setShowTraining(true)}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-slate-800 text-white rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-md hover:bg-slate-700 transition-colors"
                >
                    <FlaskConical className="w-3 h-3 md:w-4 md:h-4" /> Training
                </button>

                {gameState.gameMode === GameMode.CAREER && (
                    <div className="flex flex-col items-end justify-center">
                        <div className="text-[10px] font-bold uppercase text-slate-400 mb-1 tracking-wider hidden sm:block">
                            Level Progress
                        </div>
                        <div className="w-16 md:w-32 h-2 md:h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                style={{ width: `${Math.min(100, (gameState.levelWins / WINS_TO_ADVANCE) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {gameState.gameMode === GameMode.CAREER && (
                    <div className="flex items-center gap-1.5 md:gap-3 bg-white text-slate-800 px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-black border border-slate-200 shadow-sm">
                        <Trophy className="w-3.5 h-3.5 md:w-5 md:h-5 text-amber-500 drop-shadow-sm" />
                        <span>{gameState.score}</span>
                    </div>
                )}

                <button 
                    onClick={() => setShowHelp(true)}
                    className="p-2 md:p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                    title="How to Play"
                >
                    <HelpCircle className="w-4 h-4 md:w-6 md:h-6" />
                </button>

                <button 
                    onClick={() => setShowSettings(true)}
                    className="p-2 md:p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                    <Settings className="w-4 h-4 md:w-6 md:h-6" />
                </button>
            </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col lg:flex-row relative">
        <div className="flex-1 flex flex-col p-2 md:p-6 overflow-y-auto gap-2 md:gap-6 relative z-10 bg-indigo-50/50">
            <div className="bg-white rounded-xl md:rounded-3xl p-3 md:p-6 shadow-md shadow-indigo-100 border border-indigo-100 text-center relative overflow-hidden shrink-0 max-w-[1920px] mx-auto w-full">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
                 <div className="flex justify-between items-start">
                     <div className="flex-1">
                         <h2 className="text-slate-400 uppercase tracking-[0.2em] text-[9px] md:text-xs font-bold mb-0.5 mt-1">Target Compound</h2>
                         <h1 className="text-xl md:text-5xl 2xl:text-6xl font-black text-slate-800 tracking-tight leading-tight break-words px-2">
                            {gameState.currentChallenge?.targetName}
                         </h1>
                     </div>
                     {gameState.gameStatus === 'playing' && gameState.level !== DifficultyLevel.GRANDMASTER && (
                         <button 
                            onClick={requestTutorHelp}
                            className="p-1.5 -mr-1 md:mr-0 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                            title="Ask AI Tutor"
                         >
                             <BrainCircuit className="w-5 h-5 md:w-6 md:h-6" />
                         </button>
                     )}
                 </div>
            </div>

            <div className="flex-1 min-h-[250px] w-full max-w-[1920px] mx-auto">
                <Workstation 
                    level={gameState.level}
                    cation={gameState.selectedCation}
                    anion={gameState.selectedAnion}
                    cationCount={gameState.cationCount}
                    anionCount={gameState.anionCount}
                    cationOptions={gameState.currentChallenge?.cationOptions}
                    anionOptions={gameState.currentChallenge?.anionOptions}
                    onUpdateCount={handleCountUpdate}
                    onSelectName={handleGrandmasterSelect}
                    onSubmit={handleSubmit}
                    onNext={handleNextChallenge}
                    onClear={handleClear}
                    isSubmitting={isAILoading}
                    gameStatus={gameState.gameStatus}
                    isNamingMode={gameState.gameMode === GameMode.TRAINING && gameState.trainingConfig?.type === 'NAME'}
                    isTrainingMode={gameState.gameMode === GameMode.TRAINING}
                >
                    {gameState.showTutor && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2">
                            <AITutor 
                                message={gameState.feedbackMessage} 
                                type={gameState.gameStatus === 'success' ? 'success' : gameState.gameStatus === 'error' ? 'error' : 'hint'}
                                isLoading={isAILoading}
                            />
                        </div>
                    )}
                </Workstation>
            </div>
        </div>

        <div className="h-[35dvh] lg:h-auto lg:w-[40%] xl:w-[45%] bg-white border-t lg:border-t-0 lg:border-l border-indigo-100 flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:shadow-none z-20 relative">
            <div className="flex p-2 gap-2 bg-indigo-50/50 overflow-x-auto no-scrollbar shrink-0">
                <button 
                    onClick={() => setActiveTab('periodic')}
                    className={`whitespace-nowrap flex-1 min-w-[100px] py-2 md:py-3 px-3 md:px-2 text-[10px] sm:text-sm font-bold uppercase tracking-wide rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 transition-all ${activeTab === 'periodic' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-indigo-100 bg-white border border-slate-100'}`}
                >
                    <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4" /> Periodic
                </button>
                <button 
                    onClick={() => setActiveTab('polyatomic')}
                    className={`whitespace-nowrap flex-1 min-w-[100px] py-2 md:py-3 px-3 md:px-2 text-[10px] sm:text-sm font-bold uppercase tracking-wide rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 transition-all ${activeTab === 'polyatomic' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-500 hover:bg-emerald-100 bg-white border border-slate-100'}`}
                >
                    <Layers className="w-3.5 h-3.5 md:w-4 md:h-4" /> Polyatomic
                </button>
                <button 
                    onClick={() => setActiveTab('oxyanions')}
                    className={`whitespace-nowrap flex-1 min-w-[100px] py-2 md:py-3 px-3 md:px-2 text-[10px] sm:text-sm font-bold uppercase tracking-wide rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 transition-all ${activeTab === 'oxyanions' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200' : 'text-slate-500 hover:bg-cyan-100 bg-white border border-slate-100'}`}
                >
                    <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" /> Oxyanions
                </button>
                <button 
                    onClick={() => setActiveTab('notebook')}
                    className={`whitespace-nowrap flex-1 min-w-[100px] py-2 md:py-3 px-3 md:px-2 text-[10px] sm:text-sm font-bold uppercase tracking-wide rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 transition-all ${activeTab === 'notebook' ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'text-slate-500 hover:bg-amber-50 bg-white border border-slate-100'}`}
                >
                    <NotebookPen className="w-3.5 h-3.5 md:w-4 md:h-4" /> Notebook
                </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 pb-safe">
                {activeTab === 'periodic' && (
                    <div className="p-2 md:p-4 pb-20">
                        <PeriodicTable 
                            onSelectIon={handleIonSelect} 
                            allowedCations={displayCations.filter(i => !i.isPolyatomic || i.elementSymbol !== undefined)}
                            allowedAnions={displayAnions.filter(i => !i.isPolyatomic || i.elementSymbol !== undefined)}
                        />
                    </div>
                )}
                
                {activeTab === 'polyatomic' && (
                     <div className="p-2 md:p-4 pb-20">
                        <PolyatomicTable 
                            ions={[...displayCations, ...displayAnions].filter(i => i.isPolyatomic)}
                            onSelectIon={handleIonSelect}
                        />
                     </div>
                )}

                {activeTab === 'oxyanions' && <OxyanionGuide />}

                {activeTab === 'notebook' && (
                    <Notebook 
                        notes={gameState.notes} 
                        onUpdateNotes={handleUpdateNotes}
                        history={gameState.history}
                        certificates={gameState.certificates}
                        onViewCertificate={handleViewCertificate}
                        nickname={gameState.nickname || 'Student'}
                    />
                )}
            </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default App;
