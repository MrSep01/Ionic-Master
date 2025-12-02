
import React, { useState, useEffect, useRef } from 'react';
import { Lesson } from '../../portal/types';
import { LessonProgress } from '../../types';
import { Lightbulb, HelpCircle, Book, FlaskConical, Check, X, AlertCircle, ClipboardList, CheckCircle2, ArrowRight, ArrowLeft, PenTool, RotateCcw, Award } from 'lucide-react';
import ParticleStateSim from './simulations/ParticleStateSim';
import HeatingCurveSim from './simulations/HeatingCurveSim';
import DiffusionSim from './simulations/DiffusionSim';
import SolutionSim from './simulations/SolutionSim';
import SolubilityCalcSim from './simulations/SolubilityCalcSim';
import SolubilityCurveSim from './simulations/SolubilityCurveSim';
import SolubilityPracticalSim from './simulations/SolubilityPracticalSim';
import MatterSorterSim from './simulations/MatterSorterSim';
import MixtureTypeSim from './simulations/MixtureTypeSim';
import MeltingPointSim from './simulations/MeltingPointSim';
import SimpleDistillationSim from './simulations/SimpleDistillationSim';
import FiltrationSim from './simulations/FiltrationSim';
import ChromatographySim from './simulations/ChromatographySim';
import IonFormationSim from './simulations/IonFormationSim';
import OxyanionBuilderSim from './simulations/OxyanionBuilderSim';
import DotCrossSim from './simulations/DotCrossSim';

interface LessonPageProps {
  lesson: Lesson;
  onLaunchSimulation: () => void;
  onComplete: (lessonId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  initialProgress?: LessonProgress;
  onUpdateProgress: (lessonId: string, progress: LessonProgress) => void;
}

// Helper: Smart Normalization
// Removes ALL spaces and converts to lowercase
const normalizeAnswer = (str: string) => {
    return str.replace(/\s+/g, '').toLowerCase().trim();
};

const LessonPage: React.FC<LessonPageProps> = ({ 
    lesson, onLaunchSimulation, onComplete, onNext, onPrev, 
    initialProgress, onUpdateProgress 
}) => {
  const [selections, setSelections] = useState<Record<number, number>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [validatedInputs, setValidatedInputs] = useState<Record<number, boolean>>({}); // true = correct, false = incorrect, undefined = not checked
  const [attempts, setAttempts] = useState<Record<number, number>>({}); // Track attempt count
  const [currentScore, setCurrentScore] = useState(0);

  // Flag to prevent saving when just loading initial state
  const isHydrating = useRef(true);

  // Hydrate state when lesson changes
  useEffect(() => {
      isHydrating.current = true;
      if (initialProgress) {
          setSelections(initialProgress.selections || {});
          setTextAnswers(initialProgress.textAnswers || {});
          setValidatedInputs(initialProgress.validatedInputs || {});
          setAttempts(initialProgress.attempts || {});
          setIsCompleted(initialProgress.isCompleted || false);
          setCurrentScore(initialProgress.score || 0);
      } else {
          setSelections({});
          setTextAnswers({});
          setValidatedInputs({});
          setAttempts({});
          setIsCompleted(false);
          setCurrentScore(0);
      }
      
      // Allow saving after initial render cycle
      setTimeout(() => { isHydrating.current = false; }, 50);
  }, [lesson.id]);

  // Auto-Save Effect
  useEffect(() => {
      if (isHydrating.current) return;

      const progress: LessonProgress = {
          selections,
          textAnswers,
          validatedInputs,
          attempts,
          score: currentScore,
          isCompleted
      };
      
      onUpdateProgress(lesson.id, progress);
  }, [selections, textAnswers, validatedInputs, attempts, currentScore, isCompleted, lesson.id]);

  const handleSelect = (blockIdx: number, optionIdx: number) => {
    // Only allow changing selection if not currently marked as correct
    if (validatedInputs[blockIdx] === true) return;
    
    setSelections(prev => ({ ...prev, [blockIdx]: optionIdx }));
    // Reset validation status for this block so user can "Check" again
    if (validatedInputs[blockIdx] === false) {
        const newVal = { ...validatedInputs };
        delete newVal[blockIdx];
        setValidatedInputs(newVal);
    }
  };

  const handleTextChange = (blockIdx: number, val: string) => {
      // Only allow changing text if not currently marked as correct
      if (validatedInputs[blockIdx] === true) return;

      setTextAnswers(prev => ({ ...prev, [blockIdx]: val }));
      
      // Reset validation status so "Check" button reappears
      if (validatedInputs[blockIdx] === false) {
          const newVal = { ...validatedInputs };
          delete newVal[blockIdx];
          setValidatedInputs(newVal);
      }
  };

  const calculateTotalScore = () => {
      const checkpoints = lesson.blocks.filter(b => b.type === 'checkpoint');
      if (checkpoints.length === 0) return 100;

      let totalPoints = 0;
      const maxPoints = checkpoints.length * 100;

      lesson.blocks.forEach((block, idx) => {
          if (block.type === 'checkpoint') {
              const attemptCount = attempts[idx] || 0;
              const isCorrect = validatedInputs[idx] === true;
              
              if (isCorrect) {
                  // 100 for 1st try, 50 for 2nd, 25 for 3rd, 10 minimum
                  if (attemptCount <= 1) totalPoints += 100;
                  else if (attemptCount === 2) totalPoints += 50;
                  else if (attemptCount === 3) totalPoints += 25;
                  else totalPoints += 10;
              }
          }
      });

      return Math.round((totalPoints / maxPoints) * 100);
  };

  // CHECK ONE BY ONE
  const handleCheckSingle = (blockIdx: number) => {
      const block = lesson.blocks[blockIdx];
      if (!block.checkpoint) return;

      // Increment Attempt
      setAttempts(prev => ({ ...prev, [blockIdx]: (prev[blockIdx] || 0) + 1 }));

      let isCorrect = false;
      if (block.checkpoint.variant === 'text-input') {
          const userAns = normalizeAnswer(textAnswers[blockIdx] || '');
          const accepted = block.checkpoint.acceptedAnswers?.map(normalizeAnswer) || [];
          isCorrect = accepted.includes(userAns);
      } else {
          isCorrect = selections[blockIdx] === block.checkpoint.correctIndex;
      }

      setValidatedInputs(prev => ({ ...prev, [blockIdx]: isCorrect }));
  };

  const handleRetry = (blockIdx: number) => {
      // Reset validation state to allow editing
      const newVal = { ...validatedInputs };
      delete newVal[blockIdx];
      setValidatedInputs(newVal);
  };

  // CHECK ALL (Final Completion)
  const handleFinish = () => {
      const checkpoints = lesson.blocks
        .map((b, idx) => ({ block: b, idx }))
        .filter(item => item.block.type === 'checkpoint');
      
      const allDone = checkpoints.every(item => validatedInputs[item.idx] === true);

      if (allDone || checkpoints.length === 0) {
          const finalScore = calculateTotalScore();
          setCurrentScore(finalScore);
          setIsCompleted(true);
          onComplete(lesson.id);
          
          // Scroll to bottom
          setTimeout(() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }, 100);
      } else {
          // If they click finish but haven't checked everything, run checks on unchecked items
          checkpoints.forEach(item => {
              if (validatedInputs[item.idx] === undefined) {
                  handleCheckSingle(item.idx);
              }
          });
      }
  };

  const hasUncheckedQuestions = lesson.blocks
      .map((b, idx) => ({ type: b.type, idx }))
      .filter(item => item.type === 'checkpoint')
      .some(item => validatedInputs[item.idx] !== true);

  return (
    <div className="w-full max-w-none mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start gap-4 max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 leading-tight">
                {lesson.title}
            </h1>
            <p className="text-slate-500 font-medium">Edexcel IGCSE (9-1) Specification Content</p>
          </div>
          {isCompleted && (
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide flex items-center gap-2 animate-in zoom-in shrink-0 shadow-sm border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5" /> Completed • Score: {currentScore}%
              </div>
          )}
      </div>

      <div className="space-y-8 w-full">
        {lesson.blocks.map((block, idx) => {
          switch (block.type) {
            case 'learning-objectives':
              return (
                <div key={idx} className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-10 shadow-sm max-w-6xl mx-auto">
                    <h3 className="font-bold text-teal-900 uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                        <ClipboardList className="w-4 h-4" /> Specification Objectives
                    </h3>
                    <div className="text-teal-800 font-medium space-y-2 text-sm md:text-base leading-relaxed">
                        {block.items?.map((item, i) => (
                            <p key={i} className="flex gap-3">
                                <span className="font-bold bg-teal-200 text-teal-800 px-1.5 py-0.5 rounded text-[10px] h-fit mt-1 shrink-0">{item.split(' ')[0]}</span> 
                                <span>{item.substring(item.indexOf(' ') + 1)}</span>
                            </p>
                        ))}
                    </div>
                </div>
              );

            case 'header':
              return (
                <div key={idx} className="flex items-center gap-3 mt-12 mb-6 max-w-7xl mx-auto">
                    <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                        {block.content}
                    </h2>
                </div>
              );
            
            case 'paragraph':
              return (
                <div key={idx} className="text-slate-700 leading-relaxed text-base md:text-lg font-medium max-w-7xl mx-auto">
                   <span dangerouslySetInnerHTML={{ 
                        __html: block.content?.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>').replace(/_(.*?)_/g, '<em class="text-slate-800">$1</em>') || '' 
                   }} />
                </div>
              );

            case 'list':
              return (
                <ul key={idx} className="space-y-4 ml-2 md:ml-6 my-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-7xl mx-auto">
                  {block.items?.map((item, i) => (
                    <li key={i} className="flex gap-4 text-slate-700 leading-relaxed text-base md:text-lg">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2.5 shrink-0"></div>
                        <span dangerouslySetInnerHTML={{ 
                            __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-900">$1</strong>') 
                        }} />
                    </li>
                  ))}
                </ul>
              );

            case 'key-vocab':
              return (
                <div key={idx} className="my-8 bg-gradient-to-br from-white to-indigo-50 border border-indigo-200 rounded-2xl overflow-hidden max-w-7xl mx-auto shadow-sm">
                    <div className="bg-indigo-600 px-6 py-4 flex items-center gap-2 text-white">
                        <Book className="w-5 h-5" />
                        <h3 className="font-black uppercase tracking-wider text-sm">Key Definitions</h3>
                    </div>
                    <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {block.vocabItems?.map((v, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                <p className="font-bold text-indigo-700 mb-2 border-b border-indigo-50 pb-2">{v.term}</p>
                                <p className="text-sm text-slate-600 leading-snug">{v.definition}</p>
                            </div>
                        ))}
                    </div>
                </div>
              );

            case 'image':
              return (
                <div key={idx} className="my-10 group max-w-5xl mx-auto">
                    <div className="relative rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden bg-slate-100">
                        <img 
                            src={block.src} 
                            alt={block.caption || 'Diagram'} 
                            className="w-full max-h-[600px] object-contain bg-white p-4"
                            loading="lazy"
                        />
                    </div>
                    {block.caption && (
                        <div className="flex justify-center mt-3">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                                Figure: {block.caption}
                            </p>
                        </div>
                    )}
                </div>
              );

            case 'exam-hint':
              return (
                <div key={idx} className="my-8 bg-amber-50 border-l-8 border-amber-400 p-6 md:p-8 rounded-r-2xl shadow-sm relative overflow-hidden max-w-5xl mx-auto group hover:shadow-md transition-all">
                   <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                   <div className="flex items-start gap-4 relative z-10">
                      <div className="bg-white p-2.5 rounded-full shadow-sm text-amber-500 shrink-0 border border-amber-200">
                        <Lightbulb className="w-6 h-6" />
                      </div>
                      <div>
                          <h4 className="font-black text-amber-800 uppercase text-xs tracking-widest mb-2">Examiner's Tip / A-Level Bridge</h4>
                          <p className="text-amber-900 text-base md:text-lg font-medium leading-relaxed">{block.content}</p>
                      </div>
                   </div>
                </div>
              );
            
            case 'practical':
                return (
                    <div key={idx} className="my-10 bg-white rounded-3xl border-2 border-purple-100 shadow-lg overflow-hidden relative max-w-7xl mx-auto">
                        <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 flex items-center gap-3">
                            <FlaskConical className="w-6 h-6 text-purple-600" />
                            <h3 className="font-black text-purple-900 uppercase tracking-wide text-sm">Core Practical</h3>
                        </div>
                        <div className="p-6 md:p-8">
                            <h4 className="text-xl font-bold text-slate-800 mb-4">{block.content}</h4>
                            <ul className="space-y-3">
                                {block.items?.map((step, i) => (
                                    <li key={i} className="flex gap-4 text-slate-700">
                                        <span className="font-bold text-purple-400 text-lg">{i + 1}.</span>
                                        <span dangerouslySetInnerHTML={{ __html: step }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );

            case 'checkpoint':
              const isTextInput = block.checkpoint?.variant === 'text-input';
              
              const validationState = validatedInputs[idx];
              const hasAnswered = validationState !== undefined;
              const isCorrect = validationState === true;
              const attemptCount = attempts[idx] || 0;

              return (
                <div key={idx} className="my-10 bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow max-w-5xl mx-auto">
                   <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-200 flex gap-3 items-center justify-between">
                       <div className="flex gap-3 items-center">
                           <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600">
                               {isTextInput ? <PenTool className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
                           </div>
                           <h4 className="font-black text-slate-700 uppercase tracking-wide text-sm">
                               {isTextInput ? 'Fill in the Blank' : 'Knowledge Checkpoint'}
                           </h4>
                       </div>
                       {attemptCount > 0 && (
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                               Attempt: {attemptCount}
                           </span>
                       )}
                   </div>
                   <div className="p-6 md:p-8">
                       <p className="text-xl font-bold text-slate-800 mb-6 leading-snug">
                           <span className="text-slate-400 mr-2 text-sm font-black uppercase tracking-widest block mb-1">Question {idx + 1}</span>
                           {block.checkpoint?.question}
                       </p>
                       
                       {isTextInput ? (
                           <div className="mb-6 flex flex-col sm:flex-row gap-3">
                               <input 
                                    type="text" 
                                    value={textAnswers[idx] || ''}
                                    onChange={(e) => handleTextChange(idx, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleCheckSingle(idx);
                                    }}
                                    placeholder="Type answer here..."
                                    disabled={isCorrect} 
                                    className={`flex-1 p-4 rounded-xl border-2 font-medium outline-none transition-all ${
                                        hasAnswered 
                                            ? (isCorrect 
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                                                : 'border-rose-300 bg-rose-50 text-rose-900 focus:border-rose-400')
                                            : 'border-slate-200 focus:border-indigo-500 focus:bg-slate-50'
                                    }`}
                               />
                               {/* Check Button */}
                               {(!hasAnswered || !isCorrect) && (
                                   <button 
                                        onClick={() => handleCheckSingle(idx)}
                                        disabled={!textAnswers[idx]}
                                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md transition-all active:scale-95 shrink-0"
                                   >
                                       {hasAnswered ? 'Re-Check' : 'Check'}
                                   </button>
                               )}
                           </div>
                       ) : (
                           // Multiple Choice
                           <div className="space-y-4">
                               <div className="grid gap-3 sm:grid-cols-2">
                                   {block.checkpoint?.options?.map((option, i) => {
                                       const selected = selections[idx];
                                       const isSelected = selected === i;
                                       
                                       let btnClass = "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm text-slate-700";
                                       
                                       if (hasAnswered) {
                                           if (i === block.checkpoint?.correctIndex) {
                                               // Highlight the correct one ONLY if user got it right or we want to show it
                                               // But usually we just highlight user selection style
                                               if (isCorrect) {
                                                    btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500 shadow-md";
                                               } else {
                                                    // If wrong, show selected as wrong
                                                    if (isSelected) btnClass = "bg-rose-50 border-rose-300 text-rose-800 opacity-70";
                                                    else btnClass = "border-slate-100 text-slate-400 opacity-50 bg-slate-50";
                                               }
                                           } else {
                                               if (isSelected) {
                                                   btnClass = "bg-rose-50 border-rose-300 text-rose-800 opacity-70";
                                               } else {
                                                   btnClass = "border-slate-100 text-slate-400 opacity-50 bg-slate-50";
                                               }
                                           }
                                       } else if (isSelected) {
                                           btnClass = "border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200";
                                       }

                                       return (
                                           <button
                                                key={i}
                                                onClick={() => !isCorrect && handleSelect(idx, i)}
                                                disabled={isCorrect}
                                                className={`text-left px-5 py-4 rounded-xl border-2 font-bold transition-all flex items-center justify-between ${btnClass}`}
                                           >
                                               <span dangerouslySetInnerHTML={{ __html: option }} />
                                               {hasAnswered && isCorrect && i === block.checkpoint?.correctIndex && <Check className="w-5 h-5 text-emerald-600" />}
                                               {hasAnswered && !isCorrect && isSelected && <X className="w-5 h-5 text-rose-600" />}
                                           </button>
                                       )
                                   })}
                               </div>
                               
                               {/* Check Button for MC (Allows checking after selection) */}
                               {(!hasAnswered) && selections[idx] !== undefined && (
                                   <div className="flex justify-end animate-in fade-in slide-in-from-left-2">
                                       <button
                                            onClick={() => handleCheckSingle(idx)}
                                            className="px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95"
                                       >
                                           Check Answer
                                       </button>
                                   </div>
                               )}
                           </div>
                       )}

                       {hasAnswered && (
                           <div className={`mt-6 p-5 rounded-xl border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-rose-50 border-rose-500 text-rose-900'} animate-in fade-in slide-in-from-top-2 shadow-sm`}>
                               <div className="flex items-start gap-3">
                                   <div className={`p-1.5 rounded-full shrink-0 ${isCorrect ? 'bg-emerald-200' : 'bg-rose-200'}`}>
                                       {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                   </div>
                                   <div className="flex-1">
                                       <strong className="block text-xs font-black uppercase tracking-widest mb-2">
                                           {isCorrect ? 'Correct!' : 'Incorrect'}
                                       </strong>
                                       
                                       <p className="text-base leading-relaxed font-medium mb-3">
                                           {block.checkpoint?.explanation}
                                       </p>

                                       {/* Try Again Button */}
                                       {!isCorrect && (
                                           <button 
                                                onClick={() => handleRetry(idx)}
                                                className="mt-2 text-xs font-black uppercase tracking-wider text-rose-700 flex items-center gap-1 hover:underline"
                                           >
                                               <RotateCcw className="w-3 h-3" /> Try Again
                                           </button>
                                       )}
                                       
                                       {/* ALWAYS SHOW THE ACCEPTED ANSWER FOR TEXT INPUTS if they struggle */}
                                       {isTextInput && block.checkpoint?.acceptedAnswers && attemptCount > 2 && !isCorrect && (
                                           <div className="mt-3 text-sm p-3 rounded-lg border bg-white/60 border-rose-200/50 inline-block">
                                               <span className="font-bold opacity-70 block mb-1 text-[10px] uppercase">
                                                   Answer Key
                                               </span> 
                                               <span className="font-mono text-base font-bold">{block.checkpoint.acceptedAnswers[0]}</span>
                                           </div>
                                       )}
                                   </div>
                               </div>
                           </div>
                       )}
                   </div>
                </div>
              );

            case 'simulation':
              const SimWrapper: React.FC<{children: React.ReactNode}> = ({children}) => (
                  <div className="my-12 w-full max-w-5xl mx-auto">{children}</div>
              );

              if (block.simulationId === 'particle-model') return <SimWrapper key={idx}><ParticleStateSim /></SimWrapper>;
              if (block.simulationId === 'heating-curve') return <SimWrapper key={idx}><HeatingCurveSim /></SimWrapper>;
              if (block.simulationId === 'diffusion') return <SimWrapper key={idx}><DiffusionSim /></SimWrapper>;
              if (block.simulationId === 'solution-dissolving') return <SimWrapper key={idx}><SolutionSim /></SimWrapper>;
              if (block.simulationId === 'solubility-calc') return <SimWrapper key={idx}><SolubilityCalcSim /></SimWrapper>;
              if (block.simulationId === 'solubility-curve') return <SimWrapper key={idx}><SolubilityCurveSim /></SimWrapper>;
              if (block.simulationId === 'solubility-practical') return <SimWrapper key={idx}><SolubilityPracticalSim /></SimWrapper>;
              if (block.simulationId === 'matter-sorter') return <SimWrapper key={idx}><MatterSorterSim /></SimWrapper>;
              if (block.simulationId === 'mixture-types') return <SimWrapper key={idx}><MixtureTypeSim /></SimWrapper>;
              if (block.simulationId === 'melting-point') return <SimWrapper key={idx}><MeltingPointSim /></SimWrapper>;
              if (block.simulationId === 'simple-distillation') return <SimWrapper key={idx}><SimpleDistillationSim /></SimWrapper>;
              if (block.simulationId === 'filtration') return <SimWrapper key={idx}><FiltrationSim /></SimWrapper>;
              if (block.simulationId === 'chromatography-setup') return <SimWrapper key={idx}><ChromatographySim mode="SETUP" /></SimWrapper>;
              if (block.simulationId === 'chromatography-run') return <SimWrapper key={idx}><ChromatographySim mode="RUN" /></SimWrapper>;
              if (block.simulationId === 'chromatography-rf') return <SimWrapper key={idx}><ChromatographySim mode="RF" /></SimWrapper>;
              if (block.simulationId === 'ion-formation') return <SimWrapper key={idx}><IonFormationSim /></SimWrapper>;
              if (block.simulationId === 'oxyanion-builder') return <SimWrapper key={idx}><OxyanionBuilderSim /></SimWrapper>;
              if (block.simulationId === 'dot-cross-ionic') return <SimWrapper key={idx}><DotCrossSim /></SimWrapper>;

              return (
                <div key={idx} className="my-12 bg-slate-900 rounded-3xl p-1 md:p-2 shadow-2xl overflow-hidden ring-4 ring-indigo-100 relative group max-w-6xl mx-auto">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
                    
                    <div className="relative z-10 bg-white rounded-2xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center p-8 md:p-16">
                         <div className="mb-6 p-5 bg-indigo-50 rounded-full animate-bounce-slow">
                            <AlertCircle className="w-10 h-10 text-indigo-600" />
                         </div>
                         <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">Interactive Lab Available</h3>
                         <p className="text-slate-500 text-lg max-w-lg mb-8 leading-relaxed">
                            Launch the <strong className="text-indigo-600">IonicMaster</strong> simulation to practice forming compounds in a virtual environment. This activity tracks your progress in your notebook.
                         </p>
                         <button 
                            onClick={onLaunchSimulation}
                            className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
                         >
                             ENTER SIMULATION
                         </button>
                    </div>
                </div>
              );

            default:
              return null;
          }
        })}
        
        {/* Completion Area */}
        <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center animate-in fade-in slide-in-from-bottom-4 max-w-5xl mx-auto">
            {isCompleted ? (
                <div className="mb-8">
                    <div className="inline-block p-4 rounded-full bg-emerald-100 mb-4 shadow-sm border border-emerald-200">
                        <Award className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Lesson Complete!</h2>
                    <div className="inline-flex items-center gap-2 text-lg font-bold text-slate-600 bg-white px-6 py-2 rounded-xl border border-slate-200 shadow-sm">
                        Score: <span className="text-emerald-600 text-2xl">{currentScore}%</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-4 max-w-md mx-auto">
                        Your progress and score have been saved. You can review your answers or move to the next topic.
                    </p>
                </div>
            ) : hasUncheckedQuestions && (
                <div className="mb-6 p-4 bg-amber-50 text-amber-800 rounded-xl font-bold flex items-center justify-center gap-2 border border-amber-200">
                    <AlertCircle className="w-5 h-5" /> You have unanswered questions. Complete them to get your score!
                </div>
            )}
            
            <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4">
                {onPrev && (
                    <button 
                        onClick={onPrev}
                        className="px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-white hover:shadow-sm hover:text-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" /> Previous Lesson
                    </button>
                )}

                {!isCompleted ? (
                    <button 
                        onClick={handleFinish}
                        className="w-full md:w-auto px-8 py-4 rounded-2xl font-black text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        {hasUncheckedQuestions ? 'Check All & Finish' : 'Finish Lesson'} <ArrowRight className="w-5 h-5" />
                    </button>
                ) : (
                    onNext && (
                        <button 
                            onClick={onNext}
                            className="w-full md:w-auto px-8 py-4 rounded-2xl font-black text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-200 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            Next Lesson <ArrowRight className="w-5 h-5" />
                        </button>
                    )
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
