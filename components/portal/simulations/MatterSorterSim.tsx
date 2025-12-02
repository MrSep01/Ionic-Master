
import React, { useState, useEffect } from 'react';
import { Box, Atom, RefreshCcw, Check, X, Eye, Hand, ArrowRight } from 'lucide-react';

interface Particle {
  id: number;
  type: 'ELEMENT' | 'COMPOUND' | 'MIXTURE';
  label: string;
  visual: 'atom' | 'molecule' | 'mix';
  color: string;
  status: 'pending' | 'correct' | 'incorrect';
}

interface VisualChallenge {
  type: 'ELEMENT' | 'COMPOUND' | 'MIXTURE';
  description: string;
  particles: { x: number; y: number; color: string; isBonded: boolean; secondaryColor?: string }[];
}

const MatterSorterSim: React.FC = () => {
  const [mode, setMode] = useState<'DRAG' | 'MATCH'>('DRAG');
  
  // --- DRAG MODE STATE ---
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // --- MATCH MODE STATE ---
  const [matchChallenge, setMatchChallenge] = useState<VisualChallenge | null>(null);
  const [matchFeedback, setMatchFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [matchStreak, setMatchStreak] = useState(0);

  // Initialize Drag Mode
  const initDrag = () => {
    const data: Particle[] = [
      { id: 1, type: 'ELEMENT', label: 'Gold (Au)', visual: 'atom', color: 'bg-yellow-400', status: 'pending' },
      { id: 2, type: 'COMPOUND', label: 'Water (H₂O)', visual: 'molecule', color: 'bg-blue-400', status: 'pending' },
      { id: 3, type: 'MIXTURE', label: 'Air', visual: 'mix', color: 'bg-slate-300', status: 'pending' },
      { id: 4, type: 'ELEMENT', label: 'Oxygen (O₂)', visual: 'molecule', color: 'bg-red-400', status: 'pending' },
      { id: 5, type: 'COMPOUND', label: 'Salt (NaCl)', visual: 'atom', color: 'bg-white border-2 border-slate-200', status: 'pending' },
      { id: 6, type: 'MIXTURE', label: 'Salt Water', visual: 'mix', color: 'bg-cyan-200', status: 'pending' },
    ];
    setParticles(data.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore(0);
    setCompleted(false);
  };

  // Initialize Match Mode
  const generateMatchChallenge = () => {
    const types: ('ELEMENT' | 'COMPOUND' | 'MIXTURE')[] = ['ELEMENT', 'COMPOUND', 'MIXTURE'];
    const selectedType = types[Math.floor(Math.random() * types.length)];
    
    let generatedParticles = [];
    const count = 8;

    for (let i = 0; i < count; i++) {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        
        if (selectedType === 'ELEMENT') {
            // Either single atoms or diatomic
            const isDiatomic = Math.random() > 0.5;
            generatedParticles.push({
                x, y, 
                color: 'bg-emerald-500', 
                isBonded: isDiatomic
            });
        } else if (selectedType === 'COMPOUND') {
            generatedParticles.push({
                x, y,
                color: 'bg-blue-500',
                isBonded: true,
                secondaryColor: 'bg-red-500'
            });
        } else if (selectedType === 'MIXTURE') {
            // Mix of elements and compounds
            const isElement = Math.random() > 0.5;
            generatedParticles.push({
                x, y,
                color: isElement ? 'bg-amber-500' : 'bg-purple-500',
                isBonded: !isElement, // Compounds bonded, elements single for simplicity here
                secondaryColor: !isElement ? 'bg-white' : undefined
            });
        }
    }

    setMatchChallenge({
        type: selectedType,
        description: 'Classify this substance based on the particle diagram.',
        particles: generatedParticles
    });
    setMatchFeedback('idle');
  };

  useEffect(() => { 
      initDrag(); 
      generateMatchChallenge();
  }, []);

  // --- HANDLERS ---

  const handleSortDrag = (target: 'ELEMENT' | 'COMPOUND' | 'MIXTURE') => {
    if (completed) return;
    const current = particles[currentIndex];
    
    if (current.type === target) {
      const newParticles = [...particles];
      newParticles[currentIndex].status = 'correct';
      setParticles(newParticles);
      setScore(s => s + 1);
      
      setTimeout(() => {
        if (currentIndex < particles.length - 1) {
          setCurrentIndex(i => i + 1);
        } else {
          setCompleted(true);
        }
      }, 500);
    } else {
      const newParticles = [...particles];
      newParticles[currentIndex].status = 'incorrect';
      setParticles(newParticles);
      setTimeout(() => {
         newParticles[currentIndex].status = 'pending';
         setParticles([...newParticles]);
      }, 500);
    }
  };

  const handleMatchGuess = (guess: 'ELEMENT' | 'COMPOUND' | 'MIXTURE') => {
      if (matchFeedback !== 'idle' || !matchChallenge) return;

      if (guess === matchChallenge.type) {
          setMatchFeedback('correct');
          setMatchStreak(s => s + 1);
      } else {
          setMatchFeedback('incorrect');
          setMatchStreak(0);
      }
  };

  const nextMatch = () => {
      generateMatchChallenge();
  };

  // --- RENDERERS ---

  const renderVisualParticles = () => {
      if (!matchChallenge) return null;
      return (
          <div className="relative w-64 h-64 bg-white rounded-full border-4 border-slate-300 shadow-inner overflow-hidden mx-auto mb-6">
              {matchChallenge.particles.map((p, i) => (
                  <div 
                    key={i} 
                    className="absolute transition-all duration-1000"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                      {p.isBonded ? (
                          <div className="flex items-center -space-x-1">
                              <div className={`w-4 h-4 rounded-full ${p.color} border border-slate-400 shadow-sm`}></div>
                              <div className={`w-4 h-4 rounded-full ${p.secondaryColor || p.color} border border-slate-400 shadow-sm`}></div>
                          </div>
                      ) : (
                          <div className={`w-4 h-4 rounded-full ${p.color} border border-slate-400 shadow-sm`}></div>
                      )}
                  </div>
              ))}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] rounded-full"></div>
          </div>
      );
  };

  const currentParticle = particles[currentIndex];

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden select-none">
      
      {/* Header with Toggle */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Box className="w-5 h-5 text-indigo-500" />
          Particle Lab
        </h3>
        
        <div className="flex bg-slate-200 p-1 rounded-lg">
            <button 
                onClick={() => setMode('DRAG')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${mode === 'DRAG' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Hand className="w-3 h-3" /> Sorter
            </button>
            <button 
                onClick={() => setMode('MATCH')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${mode === 'MATCH' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Eye className="w-3 h-3" /> Visual Match
            </button>
        </div>
      </div>

      <div className="p-8 bg-slate-100 min-h-[450px] flex flex-col items-center justify-center relative">
        
        {/* --- DRAG MODE --- */}
        {mode === 'DRAG' && (
            <>
                <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 uppercase">
                    Progress: {score}/{particles.length}
                </div>

                {!completed && currentParticle && (
                    <div className={`relative z-20 transition-all duration-300 mb-12 ${currentParticle.status === 'incorrect' ? 'animate-shake' : ''}`}>
                        <div className={`w-40 h-40 rounded-3xl shadow-xl flex flex-col items-center justify-center border-4 border-white ${currentParticle.color} transition-transform ${currentParticle.status === 'correct' ? 'scale-0 opacity-0' : 'scale-100'}`}>
                            <Atom className="w-12 h-12 text-slate-800/50 mb-3" />
                            <span className="font-black text-slate-900 text-center px-2 leading-tight text-lg">{currentParticle.label}</span>
                            
                            {currentParticle.status === 'incorrect' && (
                                <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center rounded-2xl">
                                    <X className="w-16 h-16 text-rose-600" />
                                </div>
                            )}
                            {currentParticle.status === 'correct' && (
                                <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center rounded-2xl">
                                    <Check className="w-16 h-16 text-emerald-600" />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {completed && (
                    <div className="text-center animate-in zoom-in mb-8">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Sorting Complete!</h2>
                        <button 
                            onClick={initDrag}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-colors mt-4"
                        >
                            Reset
                        </button>
                    </div>
                )}

                {/* Bins */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mt-auto">
                    {['ELEMENT', 'COMPOUND', 'MIXTURE'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleSortDrag(type as any)}
                            disabled={completed}
                            className="h-32 rounded-2xl border-4 border-dashed border-slate-300 bg-slate-200/50 hover:bg-white hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col items-center justify-center group"
                        >
                            <span className="font-black text-slate-400 group-hover:text-indigo-600 uppercase tracking-widest text-xs sm:text-sm">{type}</span>
                        </button>
                    ))}
                </div>
            </>
        )}

        {/* --- MATCH MODE --- */}
        {mode === 'MATCH' && (
            <div className="w-full max-w-2xl text-center">
                <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 uppercase">
                    Streak: {matchStreak} 🔥
                </div>

                <h2 className="text-xl font-black text-slate-700 mb-2">Identify the Substance</h2>
                <p className="text-sm text-slate-500 mb-6">Look at the particle arrangement below.</p>

                {renderVisualParticles()}

                {matchFeedback === 'idle' ? (
                    <div className="grid grid-cols-3 gap-4">
                        {['ELEMENT', 'COMPOUND', 'MIXTURE'].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleMatchGuess(type as any)}
                                className="py-4 rounded-xl bg-white border-2 border-slate-200 hover:border-indigo-400 hover:shadow-md font-bold text-slate-600 hover:text-indigo-700 transition-all uppercase tracking-wide text-sm"
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className={`p-6 rounded-2xl border-2 animate-in zoom-in ${matchFeedback === 'correct' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                        <h3 className={`text-xl font-black mb-2 ${matchFeedback === 'correct' ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {matchFeedback === 'correct' ? 'Correct!' : `Incorrect. It was a ${matchChallenge?.type}.`}
                        </h3>
                        <p className="text-sm text-slate-600 mb-6">
                            {matchChallenge?.type === 'ELEMENT' && "Contains only one type of atom (same color)."}
                            {matchChallenge?.type === 'COMPOUND' && "Different atoms chemically bonded together."}
                            {matchChallenge?.type === 'MIXTURE' && "Different particles mixed but not bonded."}
                        </p>
                        <button 
                            onClick={nextMatch}
                            className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center gap-2 mx-auto ${matchFeedback === 'correct' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-700 hover:bg-slate-800'}`}
                        >
                            Next Challenge <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default MatterSorterSim;
