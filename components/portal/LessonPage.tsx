
import React, { useState, useEffect } from 'react';
import { Lesson } from '../../portal/types';
import { Lightbulb, HelpCircle, Book, FlaskConical, Check, X, AlertCircle, ClipboardList, CheckCircle2, ArrowRight, ArrowLeft, PenTool } from 'lucide-react';
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
import IonicLatticeSim from './simulations/IonicLatticeSim';
import IonicConductivitySim from './simulations/IonicConductivitySim';
import { saveLessonProgress, getLessonProgress } from '../../services/storage';

interface LessonPageProps {
  lesson: Lesson;
  onLaunchSimulation: () => void;
  onComplete: (lessonId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

// Wrapper for simulations to ensure consistent styling
// Defined OUTSIDE the component to prevent re-mounting on every render
const SimWrapper: React.FC<{children: React.ReactNode}> = ({children}) => (
    <div className="my-12 w-full max-w-5xl mx-auto">{children}</div>
);

// Helper: Smart Normalization
// Removes ALL spaces and converts to lowercase
const normalizeAnswer = (str: string) => {
    return str.replace(/\s+/g, '').toLowerCase().trim();
};

const LessonPage: React.FC<LessonPageProps> = ({ lesson, onLaunchSimulation, onComplete, onNext, onPrev }) => {
  // Initialize state lazily from storage if available
  const [selections, setSelections] = useState<Record<number, number>>(() => getLessonProgress(lesson.id)?.selections || {});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>(() => getLessonProgress(lesson.id)?.textAnswers || {});
  const [isCompleted, setIsCompleted] = useState(() => getLessonProgress(lesson.id)?.isCompleted || false);
  const [validatedInputs, setValidatedInputs] = useState<Record<number, boolean>>(() => getLessonProgress(lesson.id)?.validatedInputs || {});
  
  const [showError, setShowError] = useState(false);

  // Auto-Save Effect
  useEffect(() => {
      saveLessonProgress(lesson.id, {
          selections,
          textAnswers,
          validatedInputs,
          isCompleted
      });
  }, [selections, textAnswers, validatedInputs, isCompleted, lesson.id]);

  const handleSelect = (blockIdx: number, optionIdx: number) => {
    setSelections(prev => ({ ...prev, [blockIdx]: optionIdx }));
    
    // Immediate Validation for Multiple Choice
    const block = lesson.blocks[blockIdx];
    if (block.checkpoint && block.checkpoint.variant !== 'text-input') {
        const isCorrect = optionIdx === block.checkpoint.correctIndex;
        setValidatedInputs(prev => ({ ...prev, [blockIdx]: isCorrect }));
    }
    setShowError(false);
  };

  const handleTextChange = (blockIdx: number, val: string) => {
      setTextAnswers(prev => ({ ...prev, [blockIdx]: val }));
      // If user types after an error, reset validation state to allow retry immediately
      if (validatedInputs[blockIdx] === false) {
          const newValidated = { ...validatedInputs };
          delete newValidated[blockIdx]; // Remove "false" status so it looks active again
          setValidatedInputs(newValidated);
      }
      setShowError(false);
  };

  // CHECK ONE BY ONE (For Text Inputs mostly)
  const handleCheckSingle = (blockIdx: number) => {
      const block = lesson.blocks[blockIdx];
      if (!block.checkpoint) return;

      let isCorrect = false;
      if (block.checkpoint.variant === 'text-input') {
          const userAns = normalizeAnswer(textAnswers[blockIdx] || '');
          const accepted = block.checkpoint.acceptedAnswers?.map(normalizeAnswer) || [];
          isCorrect = accepted.includes(userAns);
      } else {
          // Fallback for MC if needed manually (though handleSelect does it now)
          isCorrect = selections[blockIdx] === block.checkpoint.correctIndex;
      }

      setValidatedInputs(prev => ({ ...prev, [blockIdx]: isCorrect }));
  };

  // CHECK ALL (Final Completion)
  const handleFinish = () => {
      const checkpoints = lesson.blocks
        .map((b, idx) => ({ block: b, idx }))
        .filter(item => item.block.type === 'checkpoint');
      
      const totalCheckpoints = checkpoints.length;
      
      if (totalCheckpoints > 0) {
          let correctCount = 0;
          const newValidatedInputs = { ...validatedInputs };

          checkpoints.forEach(item => {
              let isCorrect = false;
              // Check existing validation state first (for MC mostly)
              if (newValidatedInputs[item.idx] === true) {
                  isCorrect = true;
              } else if (item.block.checkpoint?.variant === 'text-input') {
                  const userAns = normalizeAnswer(textAnswers[item.idx] || '');
                  const accepted = item.block.checkpoint.acceptedAnswers?.map(normalizeAnswer) || [];
                  isCorrect = accepted.includes(userAns);
                  newValidatedInputs[item.idx] = isCorrect;
              } else {
                  // Multiple Choice fallback check
                  if (selections[item.idx] === item.block.checkpoint?.correctIndex) {
                      isCorrect = true;
                      newValidatedInputs[item.idx] = true;
                  } else {
                      // Mark as incorrect if checked and wrong
                      newValidatedInputs[item.idx] = false;
                  }
              }
              
              if (isCorrect) correctCount++;
          });

          setValidatedInputs(newValidatedInputs);

          if (correctCount === totalCheckpoints) {
              setIsCompleted(true);
              onComplete(lesson.id);
              if (onNext) onNext();
          } else {
              setShowError(true);
          }
      } else {
          setIsCompleted(true);
          onComplete(lesson.id);
          if (onNext) onNext();
      }
  };

  return (
    <div className="w-full max-w-none mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 border-b border-slate-200 pb-6 flex justify-between items-start gap-4 max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 leading-tight">
                {lesson.title}
            </h1>
            <p className="text-slate-500 font-medium">Edexcel IGCSE (9-1) Specification Content</p>
          </div>
          {isCompleted && (
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide flex items-center gap-2 animate-in zoom-in shrink-0">
                  <CheckCircle2 className="w-5 h-5" /> Completed
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
              // For MC: validationState true = Correct, false = Incorrect.
              // For Text: validationState true = Correct, false = Incorrect.
              const isCorrect = validationState === true;

              return (
                <div key={idx} className="my-10 bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow max-w-5xl mx-auto">
                   <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-4 border-b border-slate-200 flex gap-3 items-center">
                       <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600">
                           {isTextInput ? <PenTool className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
                       </div>
                       <h4 className="font-black text-slate-700 uppercase tracking-wide text-sm">
                           {isTextInput ? 'Fill in the Blank' : 'Knowledge Checkpoint'}
                       </h4>
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
                                    disabled={isCorrect} // Lock ONLY if correct
                                    className={`flex-1 p-4 rounded-xl border-2 font-medium outline-none transition-all ${
                                        hasAnswered 
                                            ? (isCorrect 
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                                                : 'border-rose-300 bg-rose-50 text-rose-900 focus:border-rose-400')
                                            : 'border-slate-200 focus:border-indigo-500 focus:bg-slate-50'
                                    }`}
                               />
                               {/* Check Button: Visible if not correct yet */}
                               {(!hasAnswered || !isCorrect) && (
                                   <button 
                                        onClick={() => handleCheckSingle(idx)}
                                        disabled={!textAnswers[idx]}
                                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md transition-all active:scale-95 shrink-0"
                                   >
                                       Check
                                   </button>
                               )}
                           </div>
                       ) : (
                           <div className="grid gap-3 sm:grid-cols-2">
                               {block.checkpoint?.options?.map((option, i) => {
                                   const selected = selections[idx];
                                   const isSelected = selected === i;
                                   
                                   // Logic: 
                                   // If question is CORRECT (validationState === true), lock everything.
                                   // If question is INCORRECT (validationState === false), keep enabled so user can switch.
                                   
                                   const isLocked = validationState === true; 
                                   
                                   let btnClass = "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm text-slate-700";
                                   
                                   if (isSelected) {
                                       if (validationState === true) {
                                           // Correct Selection
                                           btnClass = "bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500 shadow-md";
                                       } else if (validationState === false) {
                                           // Incorrect Selection
                                           btnClass = "bg-rose-50 border-rose-300 text-rose-800 opacity-100";
                                       } else {
                                           // Just selected (shouldn't happen with immediate val)
                                           btnClass = "border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200";
                                       }
                                   } else {
                                       if (isLocked) {
                                           // Correct answer found, dim others
                                           btnClass = "border-slate-100 text-slate-400 opacity-50 bg-slate-50 cursor-not-allowed";
                                       } else {
                                           // Normal state
                                           btnClass = "border-slate-200 bg-white hover:border-indigo-300 text-slate-700";
                                       }
                                   }

                                   return (
                                       <button
                                            key={i}
                                            onClick={() => !isLocked && handleSelect(idx, i)} // Lock only if correct
                                            disabled={isLocked} 
                                            className={`text-left px-5 py-4 rounded-xl border-2 font-bold transition-all flex items-center justify-between ${btnClass}`}
                                       >
                                           <span dangerouslySetInnerHTML={{ __html: option }} />
                                           {isSelected && validationState === true && <Check className="w-5 h-5 text-emerald-600" />}
                                           {isSelected && validationState === false && <X className="w-5 h-5 text-rose-600" />}
                                       </button>
                                   )
                               })}
                           </div>
                       )}

                       {/* Feedback Area */}
                       {hasAnswered && (
                           <div className={`mt-6 p-5 rounded-xl border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-rose-50 border-rose-500 text-rose-900'} animate-in fade-in slide-in-from-top-2 shadow-sm`}>
                               <strong className="block text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                                   {isCorrect ? <><CheckCircle2 className="w-4 h-4" /> Correct Answer</> : <><AlertCircle className="w-4 h-4" /> Incorrect</>}
                               </strong>
                               
                               {/* Only show explanation if CORRECT or if it's a Text Input (since text input doesn't have multiple options to try) */}
                               {(isCorrect || isTextInput) && (
                                   <p className="text-base leading-relaxed font-medium mb-3">{block.checkpoint?.explanation}</p>
                               )}
                               
                               {!isCorrect && !isTextInput && (
                                   <p className="text-sm font-bold opacity-80">Try again! Select another option.</p>
                               )}
                               
                               {/* ALWAYS SHOW THE ACCEPTED ANSWER FOR TEXT INPUTS, EVEN IF CORRECT */}
                               {isTextInput && block.checkpoint?.acceptedAnswers && (
                                   <div className={`text-sm p-3 rounded-lg border ${isCorrect ? 'bg-emerald-100/50 border-emerald-200' : 'bg-white/60 border-rose-100/50'} inline-block`}>
                                       <span className="font-bold opacity-70 block mb-1 text-[10px] uppercase">
                                           {isCorrect ? 'Standard Format' : 'Accepted Answer'}
                                       </span> 
                                       <span className="font-mono text-base font-bold">{block.checkpoint.acceptedAnswers[0]}</span>
                                   </div>
                               )}
                           </div>
                       )}
                   </div>
                </div>
              );

            case 'simulation':
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
              if (block.simulationId === 'ionic-lattice') return <SimWrapper key={idx}><IonicLatticeSim /></SimWrapper>;
              if (block.simulationId === 'ionic-conductivity') return <SimWrapper key={idx}><IonicConductivitySim /></SimWrapper>;

              // Default / IonicMaster simulation launcher
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
            {showError && (
                <div className="mb-6 p-4 bg-rose-100 text-rose-800 rounded-xl font-bold flex items-center justify-center gap-2 animate-bounce">
                    <AlertCircle className="w-5 h-5" /> Please complete all checkpoints correctly first!
                </div>
            )}
            
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                <button 
                    onClick={onPrev}
                    className={`px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-white hover:shadow-sm hover:text-slate-700 transition-all flex items-center justify-center gap-2 ${!onPrev ? 'invisible pointer-events-none' : ''}`}
                >
                    <ArrowLeft className="w-5 h-5" /> Previous Lesson
                </button>

                <button 
                    onClick={handleFinish}
                    className={`w-full md:w-auto px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3
                        ${isCompleted 
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-200' 
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-200'}
                    `}
                >
                    {isCompleted ? 'Next Lesson' : 'Check All / Finish'} <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
