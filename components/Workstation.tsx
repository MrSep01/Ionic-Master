
import React, { useState, useEffect, useRef } from 'react';
import { Ion, IonType, DifficultyLevel } from '../types';
import { Plus, Minus, Beaker, Check, X, ArrowRight, Zap, ChevronDown, Map, Lightbulb } from 'lucide-react';
import ChemicalDisplay from './ChemicalDisplay';
import BlueprintGuide from './BlueprintGuide';
import TrainingActiveGuide from './TrainingActiveGuide';

interface WorkstationProps {
  level: DifficultyLevel;
  cation: Ion | null;
  anion: Ion | null;
  cationCount: number;
  anionCount: number;
  cationOptions?: string[]; // For GM/Naming level
  anionOptions?: string[];  // For GM/Naming level
  onUpdateCount: (type: IonType, change: number) => void;
  onSelectName?: (type: IonType, name: string) => void; // For GM/Naming level
  onSubmit: () => void;
  onNext: () => void;
  onClear: () => void;
  isSubmitting: boolean;
  gameStatus: 'playing' | 'success' | 'error';
  isNamingMode?: boolean; 
  isTrainingMode?: boolean; // NEW PROP
  children?: React.ReactNode;
}

const Workstation: React.FC<WorkstationProps> = ({
  level,
  cation,
  anion,
  cationCount,
  anionCount,
  cationOptions,
  anionOptions,
  onUpdateCount,
  onSelectName,
  onSubmit,
  onNext,
  onClear,
  isSubmitting,
  gameStatus,
  isNamingMode = false,
  isTrainingMode = false,
  children
}) => {
  const [animationStage, setAnimationStage] = useState<'idle' | 'reacting' | 'merged'>('idle');
  const [showCationOptions, setShowCationOptions] = useState(false);
  const [showAnionOptions, setShowAnionOptions] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const useMultipleChoice = level === DifficultyLevel.GRANDMASTER || isNamingMode;

  // Reset animation when game goes back to playing or inputs change
  useEffect(() => {
    if (gameStatus === 'playing') {
      setAnimationStage('idle');
      setShowCationOptions(false);
      setShowAnionOptions(false);
      setShowBlueprint(false);
    } else if (gameStatus === 'success') {
      // Start reaction sequence
      setAnimationStage('reacting');
      const timer = setTimeout(() => {
        setAnimationStage('merged');
        // Auto-scroll to feedback/fun fact after animation
        setTimeout(() => {
             feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }, 800); // 800ms reaction time
      return () => clearTimeout(timer);
    }
  }, [gameStatus, cation, anion, cationCount, anionCount]);

  const calculateNetCharge = () => {
    const cCharge = cation ? cation.charge * cationCount : 0;
    const aCharge = anion ? anion.charge * anionCount : 0;
    return cCharge + aCharge;
  };

  const netCharge = calculateNetCharge();
  // In Naming Mode/GM, balance check is implicitly true if names are selected
  const isBalanced = useMultipleChoice 
    ? (cation && anion) 
    : (cation && anion && netCharge === 0);
    
  const hasSelection = cation || anion;

  // Helper to render the final neutral formula with parentheses if needed
  const renderFinalFormula = () => {
    if (!cation || !anion) return null;

    // IN NAMING MODE: Result is the NAME of the compound (since target was formula)
    if (useMultipleChoice) {
        return (
             <div className="flex flex-col items-center animate-in zoom-in duration-500">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-teal-500 text-center leading-tight">
                    {cation.name}
                </span>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-teal-500 text-center leading-tight">
                    {anion.name}
                </span>
             </div>
        );
    }

    return (
      <div className="flex flex-wrap items-baseline justify-center text-4xl sm:text-5xl lg:text-7xl font-mono font-bold text-emerald-600 animate-in zoom-in duration-500 drop-shadow-sm px-2 break-all py-4">
        {/* Cation Part */}
        <div className="flex items-baseline whitespace-nowrap">
            {cation.isPolyatomic && cationCount > 1 && <span className="text-emerald-600/70">(</span>}
            <ChemicalDisplay 
                symbol={cation.symbol} 
                showCharge={false} // No charge in final compound
                isPoly={cation.isPolyatomic}
            />
            {cation.isPolyatomic && cationCount > 1 && <span className="text-emerald-600/70">)</span>}
            {cationCount > 1 && <sub className="text-2xl sm:text-4xl ml-0.5 sm:ml-1 text-emerald-600">{cationCount}</sub>}
        </div>

        {/* Anion Part */}
        <div className="flex items-baseline whitespace-nowrap ml-0.5 sm:ml-1">
            {anion.isPolyatomic && anionCount > 1 && <span className="text-emerald-600/70">(</span>}
            <ChemicalDisplay 
                symbol={anion.symbol} 
                showCharge={false} // No charge in final compound
                isPoly={anion.isPolyatomic}
            />
            {anion.isPolyatomic && anionCount > 1 && <span className="text-emerald-600/70">)</span>}
            {anionCount > 1 && <sub className="text-2xl sm:text-4xl ml-0.5 sm:ml-1 text-emerald-600">{anionCount}</sub>}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-3xl shadow-xl shadow-indigo-100 border-2 sm:border-4 border-white flex flex-col ring-1 ring-indigo-50 w-full relative">
      {/* Header / Screen - COMPACT MODE */}
      <div className={`relative p-2 sm:p-4 text-center overflow-hidden transition-all duration-700 min-h-[120px] sm:min-h-[160px] flex flex-col items-center justify-center border-b-2 border-slate-100 ${animationStage === 'merged' ? 'bg-emerald-50' : 'bg-slate-50'}`}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Success Glow Background */}
        <div className={`absolute inset-0 opacity-0 bg-gradient-to-br from-emerald-100/50 via-teal-50/30 to-transparent transition-opacity duration-1000 ${animationStage === 'merged' ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Flash Effect Overlay */}
        <div className={`absolute inset-0 bg-white pointer-events-none transition-opacity duration-500 ease-out z-20 ${animationStage === 'reacting' ? 'opacity-90' : 'opacity-0'}`}></div>

        <h3 className={`text-[9px] sm:text-xs uppercase tracking-[0.2em] font-bold mb-2 sm:mb-4 relative z-10 transition-colors ${animationStage === 'merged' ? 'text-emerald-600' : 'text-slate-400'}`}>
            {animationStage === 'merged' ? 'Success!' : useMultipleChoice ? 'Nomenclature Chamber' : 'Reaction Chamber'}
        </h3>
        
        <div className="flex items-center justify-center gap-1 sm:gap-6 relative z-10 w-full">
          {!hasSelection ? (
            <div className="flex flex-col items-center gap-1 sm:gap-2 animate-pulse opacity-60">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center bg-white">
                    <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-slate-300" />
                </div>
                <span className="text-slate-400 font-mono text-[10px] sm:text-xs font-bold">
                    {useMultipleChoice ? 'Identify Components' : 'Select Ions'}
                </span>
            </div>
          ) : animationStage === 'merged' ? (
            // --- Final Result View ---
            renderFinalFormula()
          ) : (
            // --- Building View ---
            <div className={`flex items-center justify-center gap-1 sm:gap-4 md:gap-8 transition-all duration-500 ${animationStage === 'reacting' ? 'scale-75 opacity-50 blur-sm' : ''}`}>
                
                {/* Cation Display */}
                {cation && (
                    <div className="flex flex-col items-center animate-in zoom-in duration-300 min-w-0 shrink-1">
                         {useMultipleChoice ? (
                             // Naming Mode: Show Name
                             <div className="text-base sm:text-xl md:text-2xl font-black text-cyan-600 px-2 sm:px-3 py-1 sm:py-2 bg-white rounded-lg border-2 border-cyan-100 shadow-sm max-w-[120px] sm:max-w-none truncate">
                                {cation.name}
                             </div>
                         ) : (
                             // Standard Mode: Show Symbol
                             <div className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-mono text-cyan-600 font-bold drop-shadow-sm bg-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-2xl border-2 border-cyan-100 shadow-lg shadow-cyan-100 min-w-[3.5rem] sm:min-w-[5rem] md:min-w-[6rem] text-center">
                                <ChemicalDisplay 
                                    symbol={cation.symbol} 
                                    isPoly={cation.isPolyatomic} 
                                    charge={cation.charge}
                                    showCharge={true}
                                />
                             </div>
                         )}
                         
                         {cationCount > 1 && !useMultipleChoice && (
                             <div className="text-[9px] sm:text-xs text-cyan-900 bg-cyan-200 font-bold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full mt-1 sm:mt-2">
                                × {cationCount}
                             </div>
                         )}
                    </div>
                )}
                
                {cation && anion && <Plus className="w-4 h-4 sm:w-6 sm:h-6 text-slate-300 mx-0.5 shrink-0" />}

                {/* Anion Display */}
                {anion && (
                    <div className="flex flex-col items-center animate-in zoom-in duration-300 min-w-0 shrink-1">
                         {useMultipleChoice ? (
                             // Naming Mode: Show Name
                             <div className="text-base sm:text-xl md:text-2xl font-black text-emerald-600 px-2 sm:px-3 py-1 sm:py-2 bg-white rounded-lg border-2 border-emerald-100 shadow-sm max-w-[120px] sm:max-w-none truncate">
                                {anion.name}
                             </div>
                         ) : (
                             // Standard Mode: Show Symbol
                             <div className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-mono text-emerald-600 font-bold drop-shadow-sm bg-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-2xl border-2 border-emerald-100 shadow-lg shadow-emerald-100 min-w-[3.5rem] sm:min-w-[5rem] md:min-w-[6rem] text-center">
                                <ChemicalDisplay 
                                    symbol={anion.symbol} 
                                    isPoly={anion.isPolyatomic} 
                                    charge={anion.charge}
                                    showCharge={true}
                                />
                             </div>
                         )}
                         
                         {anionCount > 1 && !useMultipleChoice && (
                             <div className="text-[9px] sm:text-xs text-emerald-900 bg-emerald-200 font-bold px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full mt-1 sm:mt-2">
                                × {anionCount}
                             </div>
                         )}
                    </div>
                )}
            </div>
          )}
        </div>

        {hasSelection && animationStage !== 'merged' && !useMultipleChoice && (
            <div className={`mt-2 sm:mt-4 inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-wide transition-all duration-300 border shadow-sm ${netCharge === 0 ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-rose-100 border-rose-200 text-rose-700'}`}>
                Net: {netCharge > 0 ? `+${netCharge}` : netCharge}
                {netCharge === 0 ? <Check className="w-3 h-3 ml-1" /> : <X className="w-3 h-3 ml-1" />}
            </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-2 sm:p-4 md:p-6 flex flex-col justify-center gap-2 sm:gap-4 relative bg-white">
        
        {/* NEW: Training Active Guide */}
        {isTrainingMode && !isNamingMode && gameStatus === 'playing' && (
             <TrainingActiveGuide cation={cation} anion={anion} netCharge={netCharge} />
        )}

        {/* Helper Toggle Button */}
        {hasSelection && !useMultipleChoice && gameStatus === 'playing' && (
            <div className="flex justify-end -mt-2 mb-1">
                <button
                    onClick={() => setShowBlueprint(!showBlueprint)}
                    className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-indigo-500 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-lg transition-colors"
                >
                    {showBlueprint ? 'Hide Steps' : 'Show Blueprint'}
                    {showBlueprint ? <Map className="w-3 h-3" /> : <Lightbulb className="w-3 h-3" />}
                </button>
            </div>
        )}

        {/* Blueprint Guide Injection */}
        {showBlueprint && cation && anion && (
            <BlueprintGuide cation={cation} anion={anion} onClose={() => setShowBlueprint(false)} />
        )}
        
        {/* Cation Control */}
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-white rounded-xl border-2 border-slate-100 hover:border-cyan-300 shadow-sm hover:shadow-lg hover:shadow-cyan-100 transition-all group touch-manipulation relative">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center font-bold font-serif shadow-inner transition-colors shrink-0 ${cation ? 'bg-cyan-50 border-2 border-cyan-200 text-lg sm:text-xl md:text-2xl text-cyan-700' : 'bg-slate-50 text-slate-300'}`}>
                    {cation ? (
                        <ChemicalDisplay symbol={cation.symbol} charge={cation.charge} showCharge={true} />
                    ) : (
                        <Plus className="w-5 h-5 opacity-30" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[9px] sm:text-[10px] text-cyan-600 font-black uppercase tracking-wider mb-0.5">Cation</p>
                    <p className="text-slate-800 font-bold text-xs sm:text-base leading-tight truncate pr-1">
                        {cation ? cation.name : 'Select'}
                    </p>
                </div>
            </div>
            
            {/* Control Buttons (Count vs Select Name) */}
            {useMultipleChoice ? (
                <div className="relative">
                    <button 
                        onClick={() => {
                            setShowCationOptions(!showCationOptions);
                            setShowAnionOptions(false);
                        }}
                        disabled={gameStatus === 'success'}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-md shadow-cyan-200 flex items-center gap-2 active:scale-95 transition-transform"
                    >
                        {cation ? 'Change' : 'Select Name'} <ChevronDown className="w-4 h-4" />
                    </button>
                    {showCationOptions && cationOptions && (
                        <div className="absolute right-0 bottom-full mb-2 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-2 grid grid-cols-1 sm:grid-cols-2 gap-2 w-max min-w-[200px] animate-in zoom-in-95 origin-bottom-right">
                            {cationOptions.map(name => (
                                <button
                                    key={name}
                                    onClick={() => {
                                        if (onSelectName) onSelectName(IonType.CATION, name);
                                        setShowCationOptions(false);
                                    }}
                                    className="text-left px-3 py-2 rounded-lg hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 font-bold text-xs sm:text-sm whitespace-nowrap"
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-1 sm:gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100 shrink-0">
                    <button 
                        onClick={() => onUpdateCount(IonType.CATION, -1)}
                        disabled={!cation || cationCount <= 1 || gameStatus === 'success'}
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg transition-all active:scale-90
                            ${!cation || cationCount <= 1 
                                ? 'text-slate-300 cursor-not-allowed' 
                                : gameStatus === 'success'
                                    ? 'bg-white text-cyan-300 cursor-default' 
                                    : 'bg-white text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 shadow-sm cursor-pointer border border-slate-200'
                            }
                        `}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg sm:text-xl font-black text-slate-700 w-6 sm:w-8 text-center font-mono">{cationCount}</span>
                    <button 
                        onClick={() => onUpdateCount(IonType.CATION, 1)}
                        disabled={!cation || gameStatus === 'success'}
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg transition-all active:scale-90
                            ${!cation 
                                ? 'text-slate-300 cursor-not-allowed'
                                : gameStatus === 'success'
                                    ? 'bg-cyan-500 text-white cursor-default'
                                    : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-md shadow-cyan-200 cursor-pointer'
                            }
                        `}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>

        {/* Anion Control */}
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-white rounded-xl border-2 border-slate-100 hover:border-emerald-300 shadow-sm hover:shadow-lg hover:shadow-emerald-100 transition-all group touch-manipulation relative">
             <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl flex items-center justify-center font-bold font-serif shadow-inner transition-colors shrink-0 ${anion ? 'bg-emerald-50 border-2 border-emerald-200 text-lg sm:text-xl md:text-2xl text-emerald-700' : 'bg-slate-50 text-slate-300'}`}>
                    {anion ? (
                        <ChemicalDisplay symbol={anion.symbol} charge={anion.charge} showCharge={true} />
                    ) : (
                        <Minus className="w-5 h-5 opacity-30" />
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[9px] sm:text-[10px] text-emerald-600 font-black uppercase tracking-wider mb-0.5">Anion</p>
                    <p className="text-slate-800 font-bold text-xs sm:text-base leading-tight truncate pr-1">
                        {anion ? anion.name : 'Select'}
                    </p>
                </div>
            </div>
            
            {/* Control Buttons (Count vs Select Name) */}
            {useMultipleChoice ? (
                <div className="relative">
                    <button 
                        onClick={() => {
                            setShowAnionOptions(!showAnionOptions);
                            setShowCationOptions(false);
                        }}
                        disabled={gameStatus === 'success'}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-bold shadow-md shadow-emerald-200 flex items-center gap-2 active:scale-95 transition-transform"
                    >
                        {anion ? 'Change' : 'Select Name'} <ChevronDown className="w-4 h-4" />
                    </button>
                    {showAnionOptions && anionOptions && (
                        <div className="absolute right-0 bottom-full mb-2 bg-white rounded-xl border border-slate-200 shadow-xl z-50 p-2 grid grid-cols-1 sm:grid-cols-2 gap-2 w-max min-w-[200px] animate-in zoom-in-95 origin-bottom-right">
                            {anionOptions.map(name => (
                                <button
                                    key={name}
                                    onClick={() => {
                                        if (onSelectName) onSelectName(IonType.ANION, name);
                                        setShowAnionOptions(false);
                                    }}
                                    className="text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold text-xs sm:text-sm whitespace-nowrap"
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-1 sm:gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100 shrink-0">
                    <button 
                        onClick={() => onUpdateCount(IonType.ANION, -1)}
                        disabled={!anion || anionCount <= 1 || gameStatus === 'success'}
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg transition-all active:scale-90
                            ${!anion || anionCount <= 1 
                                ? 'text-slate-300 cursor-not-allowed' 
                                : gameStatus === 'success'
                                    ? 'bg-white text-emerald-300 cursor-default' 
                                    : 'bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 shadow-sm cursor-pointer border border-slate-200'
                            }
                        `}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg sm:text-xl font-black text-slate-700 w-6 sm:w-8 text-center font-mono">{anionCount}</span>
                    <button 
                        onClick={() => onUpdateCount(IonType.ANION, 1)}
                        disabled={!anion || gameStatus === 'success'}
                        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg transition-all active:scale-90
                            ${!anion 
                                ? 'text-slate-300 cursor-not-allowed'
                                : gameStatus === 'success'
                                    ? 'bg-emerald-500 text-white cursor-default'
                                    : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200 cursor-pointer'
                            }
                        `}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
        
        {/* Injected Content (AI Tutor / Fun Fact) */}
        <div ref={feedbackRef} className="scroll-mt-4">
            {children}
        </div>

        <div className="mt-auto flex gap-2 sm:gap-4 relative z-20 touch-manipulation pb-1">
             {gameStatus !== 'success' && (
                <button 
                    onClick={onClear}
                    className="px-3 sm:px-4 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm border border-slate-200"
                >
                    Clear
                </button>
             )}
            
            {gameStatus === 'success' ? (
                <button 
                    onClick={onNext}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl sm:rounded-2xl font-black text-white shadow-xl shadow-emerald-500/30 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transform hover:-translate-y-1 transition-all animate-in fade-in text-sm sm:text-base active:scale-[0.98]"
                >
                    {level === DifficultyLevel.GRANDMASTER || isNamingMode ? 'NEXT CHALLENGE' : 'NEXT CHALLENGE'} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            ) : (
                <button 
                    onClick={onSubmit}
                    disabled={!isBalanced || isSubmitting}
                    className={`
                        flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 rounded-xl sm:rounded-2xl font-black text-white shadow-xl transition-all duration-300 group text-sm sm:text-base active:scale-[0.98]
                        ${!isBalanced
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:-translate-y-1'}
                    `}
                >
                    {isSubmitting ? 'ANALYZING...' : (
                        <>
                            <Beaker className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
                            {useMultipleChoice ? 'IDENTIFY' : 'SYNTHESIZE'}
                        </>
                    )}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Workstation;
