import React, { useState, useEffect, useCallback } from 'react';
import { Ion, IonType, Challenge, GameState, DifficultyLevel, LEVEL_ORDER, HistoryEntry, GameMode, TrainingConfig, LessonProgress } from './types';
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
        completedLessons: [],
        lessonProgress: {}
    };
    return saved ? { ...baseState, ...saved } : baseState;
  });

  const [activeTab, setActiveTab] = useState<'periodic' | 'polyatomic' | 'guide'>('periodic');
  const [showNotebook, setShowNotebook] = useState(false);
  const [certificateToShow, setCertificateToShow] = useState<DifficultyLevel | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Portal Helpers ---
  const getUnitById = (id: string) => {
      if (id === 'igcse-topic-1' || id === 'igcse-chem-unit1') return IGCSE_UNIT_1;
      if (id === 'igcse-topic-2' || id === 'igcse-chem-unit2') return IGCSE_UNIT_2;
      if (id === 'igcse-topic-5' || id === 'igcse-chem-unit5') return IGCSE_UNIT_5;
      return IGCSE_UNIT_1; // Fallback
  };

  // --- Game Logic ---

  useEffect(() => {
    StorageService.saveProgress(gameState, !showHelp);
  }, [gameState, showHelp]);

  // Generate Challenge
  const generateChallenge = useCallback(() => {
    const config = LEVEL_CONFIG[gameState.level];
    const cPool = config.ions.cations;
    const aPool = config.ions.anions;

    let newCation = cPool[Math.floor(Math.random() * cPool.length)];
    let newAnion = aPool[Math.floor(Math.random() * aPool.length)];

    // Training Mode Overrides
    if (gameState.gameMode === GameMode.TRAINING && gameState.trainingConfig) {
        const pool = gameState.trainingConfig.pool;
        let cFilter = CATIONS; 
        let aFilter = ANIONS;

        if (pool === 'SIMPLE') {
            cFilter = CATIONS.filter(c => !c.isPolyatomic && ['1','2','13'].includes((c.elementSymbol || '').toString())); // Approx group logic
            aFilter = ANIONS.filter(a => !a.isPolyatomic);
        } else if (pool === 'POLYATOMIC') {
            cFilter = CATIONS.filter(c => c.isPolyatomic);
            aFilter = ANIONS.filter(a => a.isPolyatomic);
            // Fallback if empty (e.g. cations)
            if (cFilter.length === 0) cFilter = CATIONS;
        } else if (pool === 'TRANSITION') {
            cFilter = CATIONS.filter(c => ['Fe','Cu','Zn','Ag','Pb','Mn'].includes(c.elementSymbol || ''));
            aFilter = ANIONS;
        }

        newCation = cFilter[Math.floor(Math.random() * cFilter.length)];
        newAnion = aFilter[Math.floor(Math.random() * aFilter.length)];
    }

    // Determine correct formula name
    let name = `${newCation.name} ${newAnion.name}`;
    
    // Generate distractors for GM level
    const cationOptions = [newCation.name];
    const anionOptions = [newAnion.name];
    if (gameState.level === DifficultyLevel.GRANDMASTER || gameState.trainingConfig?.type === 'NAME') {
        while (cationOptions.length < 4) {
            const r = CATIONS[Math.floor(Math.random() * CATIONS.length)].name;
            if (!cationOptions.includes(r)) cationOptions.push(r);
        }
        while (anionOptions.length < 4) {
            const r = ANIONS[Math.floor(Math.random() * ANIONS.length)].name;
            if (!anionOptions.includes(r)) anionOptions.push(r);
        }
        // Shuffle
        cationOptions.sort(() => Math.random() - 0.5);
        anionOptions.sort(() => Math.random() - 0.5);
    }

    setGameState(prev => ({
      ...prev,
      currentChallenge: {
        targetName: name,
        cation: newCation,
        anion: newAnion,
        cationOptions,
        anionOptions
      },
      selectedCation: null,
      selectedAnion: null,
      cationCount: 1,
      anionCount: 1,
      gameStatus: 'playing',
      feedbackMessage: '',
      showTutor: false
    }));
  }, [gameState.level, gameState.gameMode, gameState.trainingConfig]);

  // Initial Load
  useEffect(() => {
    if (!gameState.currentChallenge) {
      generateChallenge();
    }
  }, [generateChallenge, gameState.currentChallenge]);

  const handleIonSelect = (ion: Ion) => {
    if (gameState.gameStatus === 'success') return;
    
    setGameState(prev => {
        if (ion.type === IonType.CATION) {
            return { ...prev, selectedCation: ion, cationCount: 1 };
        } else {
            return { ...prev, selectedAnion: ion, anionCount: 1 };
        }
    });
  };

  const handleUpdateCount = (type: IonType, change: number) => {
    setGameState(prev => {
      if (type === IonType.CATION) {
        return { ...prev, cationCount: Math.max(1, prev.cationCount + change) };
      } else {
        return { ...prev, anionCount: Math.max(1, prev.anionCount + change) };
      }
    });
  };

  const handleClear = () => {
    setGameState(prev => ({
      ...prev,
      selectedCation: null,
      selectedAnion: null,
      cationCount: 1,
      anionCount: 1,
      feedbackMessage: '',
      gameStatus: 'playing'
    }));
  };

  const handleSubmit = async () => {
    if (!gameState.currentChallenge || !gameState.selectedCation || !gameState.selectedAnion) return;

    setIsSubmitting(true);
    const { cation, anion } = gameState.currentChallenge;
    const { selectedCation, selectedAnion, cationCount, anionCount, gameMode } = gameState;

    // Check Logic
    const isCorrectIons = selectedCation.symbol === cation.symbol && selectedAnion.symbol === anion.symbol;
    const netCharge = (selectedCation.charge * cationCount) + (selectedAnion.charge * anionCount);
    const isBalanced = netCharge === 0;

    const success = isCorrectIons && isBalanced;

    // Gemini Feedback
    const feedback = await GeminiService.getAIFeedback(
        selectedCation, 
        selectedAnion, 
        cationCount, 
        anionCount, 
        gameState.currentChallenge.targetName, 
        success
    );

    setIsSubmitting(false);

    if (success) {
        const historyEntry: HistoryEntry = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            targetName: gameState.currentChallenge.targetName,
            cation: selectedCation,
            anion: selectedAnion,
            cationCount,
            anionCount,
            funFact: feedback
        };

        // Level Progression
        let newScore = gameState.score + (gameMode === GameMode.CAREER ? 10 : 0);
        let newStreak = gameState.streak + 1;
        let newLevelWins = gameState.levelWins + 1;
        let newLevel = gameState.level;
        let newUnlocked = [...gameState.unlockedLevels];
        let certToAward: DifficultyLevel | null = null;

        if (gameMode === GameMode.CAREER && newLevelWins >= WINS_TO_ADVANCE) {
            newLevelWins = 0;
            const currentIdx = LEVEL_ORDER.indexOf(gameState.level);
            if (currentIdx < LEVEL_ORDER.length - 1) {
                newLevel = LEVEL_ORDER[currentIdx + 1];
                if (!newUnlocked.includes(newLevel)) {
                    newUnlocked.push(newLevel);
                    certToAward = gameState.level;
                }
            }
        }

        const newCertificates = certToAward 
            ? [...gameState.certificates, { level: certToAward, timestamp: Date.now() }]
            : gameState.certificates;

        setGameState(prev => ({
            ...prev,
            gameStatus: 'success',
            score: newScore,
            streak: newStreak,
            levelWins: newLevelWins,
            level: newLevel,
            unlockedLevels: newUnlocked,
            feedbackMessage: feedback,
            history: [historyEntry, ...prev.history],
            certificates: newCertificates
        }));

        if (certToAward) {
            setCertificateToShow(certToAward);
        }

    } else {
        setGameState(prev => ({
            ...prev,
            gameStatus: 'error',
            streak: 0,
            feedbackMessage: feedback
        }));
    }
  };

  const handleTutorHelp = async () => {
      if (!gameState.currentChallenge) return;
      setIsSubmitting(true);
      const hint = await GeminiService.getTutorHelp(
          gameState.level, 
          gameState.currentChallenge.targetName, 
          gameState.currentChallenge.cation, 
          gameState.currentChallenge.anion
      );
      setGameState(prev => ({
          ...prev,
          feedbackMessage: hint,
          showTutor: true
      }));
      setIsSubmitting(false);
  };

  const handleLevelChange = (lvl: DifficultyLevel) => {
      if (gameState.unlockedLevels.includes(lvl)) {
          setGameState(prev => ({ ...prev, level: lvl, levelWins: 0, gameStatus: 'playing' }));
          setTimeout(() => generateChallenge(), 50); 
      }
  };

  const handleLessonUpdate = (lessonId: string, progress: LessonProgress) => {
      setGameState(prev => ({
          ...prev,
          lessonProgress: {
              ...prev.lessonProgress,
              [lessonId]: progress
          }
      }));
  };

  const handleLessonComplete = (lessonId: string) => {
      setGameState(prev => {
          if (prev.completedLessons.includes(lessonId)) return prev;
          return {
              ...prev,
              completedLessons: [...prev.completedLessons, lessonId]
          };
      });
  };

  // --- Render ---

  // 1. Welcome Modal
  if (!gameState.nickname) {
      return <WelcomeModal onSetNickname={(name) => setGameState(prev => ({ ...prev, nickname: name }))} />;
  }

  // 2. Unit Viewer Mode
  if (viewState === 'UNIT' && currentUnitId) {
      return (
          <UnitViewer 
              unit={getUnitById(currentUnitId)}
              onExit={() => setViewState('PORTAL')}
              onLaunchSimulation={() => setViewState('GAME')}
              completedLessons={gameState.completedLessons}
              onLessonComplete={handleLessonComplete}
              lessonProgress={gameState.lessonProgress}
              onUpdateLessonProgress={handleLessonUpdate}
          />
      );
  }

  // 3. Portal Dashboard Mode
  if (viewState === 'PORTAL') {
      return (
          <PortalDashboard 
              onStartUnit={(unitId) => {
                  setCurrentUnitId(unitId);
                  setViewState('UNIT');
              }}
              onOpenLab={() => setViewState('GAME')}
              completedLessons={gameState.completedLessons}
          />
      );
  }

  // 4. Game/Lab Mode (Default)
  const isNaming = gameState.level === DifficultyLevel.GRANDMASTER || gameState.trainingConfig?.type === 'NAME';

  return (
    <div className="min-h-screen bg-indigo-50 font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 flex flex-col h-screen overflow-hidden">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-indigo-100 px-4 py-3 flex items-center justify-between shrink-0 z-20 relative">
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setViewState('PORTAL')}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
                title="Back to Portal"
            >
                <LogOut className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md shadow-indigo-200">
                    <FlaskConical className="w-5 h-5" />
                </div>
                <div className="hidden sm:block">
                    <h1 className="font-black text-lg tracking-tight text-slate-800 leading-none">Ionic<span className="text-emerald-500">Master</span></h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{gameState.gameMode}</p>
                </div>
            </div>
        </div>

        {gameState.gameMode === GameMode.CAREER && (
            <div className="hidden md:flex bg-slate-100 p-1 rounded-xl items-center">
                {LEVEL_ORDER.map((lvl) => {
                    const isUnlocked = gameState.unlockedLevels.includes(lvl);
                    const isActive = gameState.level === lvl;
                    return (
                        <button
                            key={lvl}
                            onClick={() => handleLevelChange(lvl)}
                            disabled={!isUnlocked}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all
                                ${isActive ? 'bg-white text-indigo-700 shadow-sm' : isUnlocked ? 'text-slate-500 hover:text-slate-700' : 'text-slate-300 cursor-not-allowed'}
                            `}
                        >
                            {!isUnlocked && <Lock className="w-3 h-3" />}
                            {lvl}
                        </button>
                    );
                })}
            </div>
        )}

        <div className="flex items-center gap-3">
            {gameState.gameMode === GameMode.CAREER && (
                <div className="hidden sm:flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="font-black text-slate-700">{gameState.score}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-300"></div>
                    <div className="text-xs font-bold text-slate-500">
                        Win {gameState.levelWins}/{WINS_TO_ADVANCE}
                    </div>
                </div>
            )}

            <button 
                onClick={() => setShowNotebook(true)}
                className="p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors relative group"
                title="Lab Notebook"
            >
                <NotebookPen className="w-5 h-5" />
                {gameState.gameStatus === 'success' && <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>}
            </button>

            <button 
                onClick={() => setShowSettings(true)}
                className="p-2.5 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors"
            >
                <Settings className="w-5 h-5" />
            </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0 z-10 overflow-y-auto custom-scrollbar">
            <div className="p-4 md:p-6 max-w-5xl mx-auto w-full flex flex-col gap-6 h-full">
                <div className="text-center space-y-2 shrink-0">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            {isNaming ? 'Identify Compound' : 'Target Synthesis'}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight drop-shadow-sm">
                        {isNaming 
                            ? <span className="font-mono text-indigo-600">{formatFormula(gameState.currentChallenge!.cation, gameState.currentChallenge!.anion, 1, 1)}</span>
                            : gameState.currentChallenge?.targetName
                        }
                    </h2>
                    {isNaming && (
                        <p className="text-slate-500 font-medium">Select the correct name for this formula</p>
                    )}
                </div>

                <div className="flex-1 flex flex-col justify-center min-h-[400px]">
                    <Workstation
                        level={gameState.level}
                        cation={gameState.selectedCation}
                        anion={gameState.selectedAnion}
                        cationCount={gameState.cationCount}
                        anionCount={gameState.anionCount}
                        cationOptions={gameState.currentChallenge?.cationOptions}
                        anionOptions={gameState.currentChallenge?.anionOptions}
                        onUpdateCount={handleUpdateCount}
                        onSelectName={(type, name) => {
                            const found = type === IonType.CATION 
                                ? CATIONS.find(c => c.name === name) 
                                : ANIONS.find(a => a.name === name);
                            if (found) handleIonSelect(found);
                        }}
                        onSubmit={handleSubmit}
                        onNext={generateChallenge}
                        onClear={handleClear}
                        isSubmitting={isSubmitting}
                        gameStatus={gameState.gameStatus}
                        isNamingMode={isNaming}
                        isTrainingMode={gameState.gameMode === GameMode.TRAINING}
                    >
                        <div className="mt-4">
                            {gameState.gameStatus === 'playing' && (
                                <button 
                                    onClick={handleTutorHelp}
                                    className="flex items-center gap-2 text-xs font-bold text-indigo-500 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-all mx-auto"
                                >
                                    <BrainCircuit className="w-4 h-4" /> Need a hint?
                                </button>
                            )}
                            
                            {(gameState.feedbackMessage || gameState.showTutor) && (
                                <AITutor 
                                    message={gameState.feedbackMessage} 
                                    type={gameState.gameStatus === 'success' ? 'success' : gameState.gameStatus === 'error' ? 'error' : 'hint'}
                                    isLoading={isSubmitting && !gameState.feedbackMessage} 
                                />
                            )}
                        </div>
                    </Workstation>
                </div>
            </div>
        </div>

        <div className={`
            fixed inset-y-0 right-0 w-full md:w-[480px] bg-slate-50 border-l border-slate-200 shadow-2xl transform transition-transform duration-300 z-30 flex flex-col
            ${showNotebook ? 'translate-x-0' : 'translate-x-full'}
            md:relative md:translate-x-0 md:shadow-none
        `}>
            <div className="md:hidden p-4 border-b border-slate-200 flex justify-between items-center bg-white">
                <span className="font-black text-slate-800">Lab Resources</span>
                <button onClick={() => setShowNotebook(false)} className="p-2 bg-slate-100 rounded-full"><LogOut className="w-4 h-4 rotate-180" /></button>
            </div>

            <div className="flex p-2 gap-2 bg-white border-b border-slate-200 overflow-x-auto no-scrollbar">
                {[
                    { id: 'periodic', label: 'Periodic Table', icon: LayoutGrid },
                    { id: 'polyatomic', label: 'Polyatomics', icon: Layers },
                    { id: 'guide', label: 'Naming Guide', icon: BookOpen },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap
                            ${activeTab === tab.id ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'}
                        `}
                    >
                        <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 relative">
                <div className={`transition-opacity duration-300 ${activeTab === 'periodic' ? 'opacity-100' : 'hidden'}`}>
                    <PeriodicTable 
                        onSelectIon={handleIonSelect} 
                        allowedCations={LEVEL_CONFIG[gameState.level].ions.cations}
                        allowedAnions={LEVEL_CONFIG[gameState.level].ions.anions}
                    />
                </div>
                <div className={`transition-opacity duration-300 ${activeTab === 'polyatomic' ? 'opacity-100' : 'hidden'}`}>
                    <PolyatomicTable 
                        ions={[...LEVEL_CONFIG[gameState.level].ions.cations, ...LEVEL_CONFIG[gameState.level].ions.anions].filter(i => i.isPolyatomic)}
                        onSelectIon={handleIonSelect}
                    />
                </div>
                <div className={`transition-opacity duration-300 ${activeTab === 'guide' ? 'opacity-100' : 'hidden'}`}>
                    <OxyanionGuide />
                </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-white">
                <button 
                    onClick={() => setShowNotebook(true)}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                    <NotebookPen className="w-4 h-4" /> Open Full Notebook
                </button>
            </div>
        </div>
      </main>

      {/* --- MODALS --- */}
      {showNotebook && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
              <div className="bg-white rounded-3xl w-full max-w-4xl h-[85vh] shadow-2xl flex flex-col overflow-hidden relative">
                  <button 
                    onClick={() => setShowNotebook(false)}
                    className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full z-10 transition-colors"
                  >
                      <LogOut className="w-5 h-5 text-slate-500" />
                  </button>
                  <Notebook 
                      notes={gameState.notes}
                      onUpdateNotes={(n) => setGameState(prev => ({ ...prev, notes: n }))}
                      history={gameState.history}
                      certificates={gameState.certificates}
                      onViewCertificate={(lvl) => setCertificateToShow(lvl)}
                      nickname={gameState.nickname || 'Student'}
                  />
              </div>
          </div>
      )}

      {certificateToShow && (
          <Certificate 
              level={certificateToShow}
              onClose={() => setCertificateToShow(null)}
              onNext={() => {
                  setCertificateToShow(null);
                  handleLevelChange(LEVEL_ORDER[LEVEL_ORDER.indexOf(certificateToShow) + 1]);
              }}
              hasNextLevel={LEVEL_ORDER.indexOf(certificateToShow) < LEVEL_ORDER.length - 1}
              nickname={gameState.nickname || 'Student'}
          />
      )}

      {showSettings && (
          <SettingsModal 
              onClose={() => setShowSettings(false)}
              onReset={() => {
                  StorageService.clearProgress();
                  window.location.reload();
              }}
              onUpdateNickname={(name) => setGameState(prev => ({ ...prev, nickname: name }))}
              currentLevel={gameState.level}
              score={gameState.score}
              nickname={gameState.nickname}
          />
      )}

      {showTrainingModal && (
          <TrainingModal 
              onClose={() => setShowTrainingModal(false)}
              onStart={(config) => {
                  setGameState(prev => ({ 
                      ...prev, 
                      gameMode: GameMode.TRAINING, 
                      trainingConfig: config,
                      gameStatus: 'playing'
                  }));
                  generateChallenge();
                  setShowTrainingModal(false);
              }}
          />
      )}

      {showHelp && <HelpGuide onClose={() => setShowHelp(false)} />}
      <Footer />
    </div>
  );
};

export default App;