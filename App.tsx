
import React, { useState, useEffect, useCallback } from 'react';
import { Ion, IonType, Challenge, GameState, DifficultyLevel, LEVEL_ORDER } from './types';
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
import Footer from './components/Footer';
import { FlaskConical, Trophy, BrainCircuit, LayoutGrid, Layers, BookOpen, Lock, CheckCircle, Settings, NotebookPen } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  // Lazy initialization to check for saved game
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = StorageService.loadProgress();
    const baseState: GameState = {
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
        notes: ''
    };

    if (saved) {
        return {
            ...baseState,
            ...saved,
            // Ensure level is valid
            level: LEVEL_ORDER.includes(saved.level) ? saved.level : DifficultyLevel.NOVICE,
        };
    }
    return baseState;
  });

  const [activeTab, setActiveTab] = useState<'periodic' | 'polyatomic' | 'oxyanions' | 'notebook'>('periodic');
  const [isAILoading, setIsAILoading] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [completedLevel, setCompletedLevel] = useState<DifficultyLevel | null>(null);

  // --- Auto-Save Effect ---
  useEffect(() => {
      StorageService.saveProgress(gameState);
  }, [gameState.score, gameState.level, gameState.unlockedLevels, gameState.levelWins, gameState.streak, gameState.notes]);

  // --- Game Logic ---

  const generateChallenge = useCallback((level: DifficultyLevel): Challenge => {
    const config = LEVEL_CONFIG[level];
    // Pick random cation and anion from the allowed lists
    const cIdx = Math.floor(Math.random() * config.ions.cations.length);
    const aIdx = Math.floor(Math.random() * config.ions.anions.length);
    
    const cation = config.ions.cations[cIdx];
    const anion = config.ions.anions[aIdx];

    return {
      targetName: `${cation.name} ${anion.name}`,
      cation,
      anion
    };
  }, []);

  // Initialize game / Ensure challenge exists
  useEffect(() => {
    if (!gameState.currentChallenge) {
      const challenge = generateChallenge(gameState.level);
      setGameState(prev => ({ ...prev, currentChallenge: challenge }));
    }
  }, [gameState.level, gameState.currentChallenge, generateChallenge]);

  const handleIonSelect = (ion: Ion) => {
    if (gameState.gameStatus !== 'playing') return;
    
    setGameState(prev => ({
      ...prev,
      selectedCation: ion.type === IonType.CATION ? ion : prev.selectedCation,
      selectedAnion: ion.type === IonType.ANION ? ion : prev.selectedAnion,
      // Reset counts when changing ions
      cationCount: ion.type === IonType.CATION ? 1 : prev.cationCount,
      anionCount: ion.type === IonType.ANION ? 1 : prev.anionCount,
      feedbackMessage: '',
      showTutor: false
    }));
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

  const handleResetProgress = () => {
    StorageService.clearProgress();
    const newLevel = DifficultyLevel.NOVICE;
    setGameState({
        level: newLevel,
        score: 0,
        streak: 0,
        currentChallenge: generateChallenge(newLevel),
        selectedCation: null,
        selectedAnion: null,
        cationCount: 1,
        anionCount: 1,
        gameStatus: 'playing',
        feedbackMessage: '',
        showTutor: false,
        unlockedLevels: [DifficultyLevel.NOVICE],
        levelWins: 0,
        notes: ''
    });
    setShowSettings(false);
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
    const { currentChallenge, selectedCation, selectedAnion, cationCount, anionCount } = gameState;
    if (!currentChallenge || !selectedCation || !selectedAnion) return;

    const isCorrectIons = selectedCation.symbol === currentChallenge.cation.symbol && 
                          selectedAnion.symbol === currentChallenge.anion.symbol;
    
    // For Transition metals like Iron(II) vs Iron(III), the symbol is Fe for both, so we check charge too
    const isCorrectCharges = selectedCation.charge === currentChallenge.cation.charge &&
                             selectedAnion.charge === currentChallenge.anion.charge;

    const netCharge = (selectedCation.charge * cationCount) + (selectedAnion.charge * anionCount);
    const isBalanced = netCharge === 0;

    const isSuccess = isCorrectIons && isCorrectCharges && isBalanced;

    setIsAILoading(true);
    
    const feedback = await GeminiService.getAIFeedback(
        selectedCation,
        selectedAnion,
        cationCount,
        anionCount,
        currentChallenge.targetName,
        isSuccess
    );

    setIsAILoading(false);

    if (isSuccess) {
      const newWins = gameState.levelWins + 1;
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10 + (prev.streak * 2),
        streak: prev.streak + 1,
        levelWins: newWins,
        gameStatus: 'success',
        feedbackMessage: feedback,
        showTutor: true
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
    // Check if level is complete
    if (gameState.levelWins >= WINS_TO_ADVANCE) {
         setCompletedLevel(gameState.level);
         setShowCertificate(true);
         
         // Unlock logic
         const currentIdx = LEVEL_ORDER.indexOf(gameState.level);
         if (currentIdx < LEVEL_ORDER.length - 1) {
             const nextLevel = LEVEL_ORDER[currentIdx + 1];
             setGameState(prev => ({
                 ...prev,
                 unlockedLevels: prev.unlockedLevels.includes(nextLevel) 
                   ? prev.unlockedLevels 
                   : [...prev.unlockedLevels, nextLevel]
             }));
         }
    } else {
        // Reset for next question
        setGameState(prev => ({
            ...prev,
            gameStatus: 'playing',
            currentChallenge: generateChallenge(prev.level),
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
          currentChallenge: generateChallenge(level),
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
          currentChallenge: generateChallenge(prev.level),
          selectedCation: null,
          selectedAnion: null,
          cationCount: 1,
          anionCount: 1,
          feedbackMessage: '',
          showTutor: false,
          levelWins: 0
      }));
  };

  const currentConfig = LEVEL_CONFIG[gameState.level];
  const currentLevelIdx = LEVEL_ORDER.indexOf(gameState.level);

  return (
    <div className="min-h-screen h-dvh bg-indigo-50 flex flex-col overflow-hidden font-sans">
      
      {/* Settings Modal */}
      {showSettings && (
          <SettingsModal 
            onClose={() => setShowSettings(false)}
            onReset={handleResetProgress}
            currentLevel={gameState.level}
            score={gameState.score}
          />
      )}

      {/* Certificate Modal */}
      {showCertificate && completedLevel && (
          <Certificate 
            level={completedLevel} 
            onNext={handleNextLevel}
            onClose={handleCloseCertificate}
            hasNextLevel={currentLevelIdx < LEVEL_ORDER.length - 1}
          />
      )}

      {/* --- Header --- */}
      <header className="bg-white border-b border-indigo-100 px-3 py-2 md:px-6 md:py-4 flex items-center justify-between shadow-sm z-30 shrink-0 relative h-12 md:h-16">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
            
            <div className="flex items-center gap-2 md:gap-6">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-500 p-1 md:p-2 rounded-lg md:rounded-xl shadow-lg shadow-indigo-200">
                         <FlaskConical className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    <h1 className="text-sm md:text-2xl font-black tracking-tight text-slate-800 flex flex-col md:block leading-none">
                        <span>IONIC</span><span className="text-emerald-600">MASTER</span>
                    </h1>
                </div>
                
                {/* Desktop/Tablet Level Selector */}
                <div className="hidden lg:flex bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200">
                    {LEVEL_ORDER.map((lvl) => {
                        const isUnlocked = gameState.unlockedLevels.includes(lvl);
                        const isCurrent = gameState.level === lvl;
                        return (
                            <button
                                key={lvl}
                                onClick={() => changeLevel(lvl)}
                                disabled={!isUnlocked}
                                className={`
                                    px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2
                                    ${isCurrent ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'}
                                    ${!isUnlocked ? 'opacity-40 cursor-not-allowed' : ''}
                                `}
                            >
                                {lvl}
                                {!isUnlocked && <Lock className="w-3 h-3" />}
                                {isUnlocked && !isCurrent && gameState.unlockedLevels.indexOf(lvl) < currentLevelIdx && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                            </button>
                        );
                    })}
                </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-6">
                {/* Level Progress Bar */}
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

                <div className="flex items-center gap-1.5 md:gap-3 bg-white text-slate-800 px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-black border border-slate-200 shadow-sm">
                    <Trophy className="w-3.5 h-3.5 md:w-5 md:h-5 text-amber-500 drop-shadow-sm" />
                    <span>{gameState.score}</span>
                </div>

                {/* Settings Button */}
                <button 
                    onClick={() => setShowSettings(true)}
                    className="p-2 md:p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                    <Settings className="w-4 h-4 md:w-6 md:h-6" />
                </button>
            </div>
      </header>

      {/* --- Main Content Grid --- */}
      <main className="flex-1 overflow-hidden flex flex-col xl:flex-row relative">
        
        {/* LEFT/TOP: Gameplay Area */}
        <div className="flex-1 flex flex-col p-2 md:p-6 overflow-y-auto gap-2 md:gap-6 relative z-10 bg-indigo-50/50">
            
            {/* Target Display */}
            <div className="bg-white rounded-xl md:rounded-3xl p-3 md:p-6 shadow-md shadow-indigo-100 border border-indigo-100 text-center relative overflow-hidden shrink-0 max-w-[1920px] mx-auto w-full">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
                 <div className="flex justify-between items-start">
                     <div className="flex-1">
                         <h2 className="text-slate-400 uppercase tracking-[0.2em] text-[9px] md:text-xs font-bold mb-0.5 mt-1">Target Compound</h2>
                         <h1 className="text-xl md:text-5xl 2xl:text-6xl font-black text-slate-800 tracking-tight leading-tight break-words px-2">
                            {gameState.currentChallenge?.targetName}
                         </h1>
                     </div>
                     {gameState.gameStatus === 'playing' && (
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

            {/* Workstation */}
            <div className="flex-1 min-h-[250px] md:min-h-[350px] w-full max-w-[1920px] mx-auto">
                <Workstation 
                    cation={gameState.selectedCation}
                    anion={gameState.selectedAnion}
                    cationCount={gameState.cationCount}
                    anionCount={gameState.anionCount}
                    onUpdateCount={handleCountUpdate}
                    onSubmit={handleSubmit}
                    onNext={handleNextChallenge}
                    onClear={handleClear}
                    isSubmitting={isAILoading}
                    gameStatus={gameState.gameStatus}
                >
                    {/* Inject AI Tutor here */}
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

        {/* RIGHT/BOTTOM: Ion Selection Tabs */}
        <div className="h-[40dvh] md:h-[55dvh] xl:h-auto xl:w-[45%] bg-white border-t xl:border-t-0 xl:border-l border-indigo-100 flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.05)] xl:shadow-none z-20 relative">
            
            {/* Scrollable Tabs Container */}
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

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 pb-safe">
                {activeTab === 'periodic' && (
                    <div className="p-2 md:p-4 pb-20">
                        <PeriodicTable 
                            onSelectIon={handleIonSelect} 
                            allowedCations={currentConfig.ions.cations.filter(i => !i.isPolyatomic)}
                            allowedAnions={currentConfig.ions.anions.filter(i => !i.isPolyatomic)}
                        />
                    </div>
                )}
                
                {activeTab === 'polyatomic' && (
                     <div className="p-2 md:p-4 pb-20">
                        <PolyatomicTable 
                            ions={[...currentConfig.ions.cations, ...currentConfig.ions.anions].filter(i => i.isPolyatomic)}
                            onSelectIon={handleIonSelect}
                        />
                     </div>
                )}

                {activeTab === 'oxyanions' && <OxyanionGuide />}

                {activeTab === 'notebook' && (
                    <Notebook 
                        notes={gameState.notes} 
                        onUpdateNotes={handleUpdateNotes} 
                    />
                )}
            </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
