

import React, { useState, useEffect } from 'react';
import { Beaker, Plus, RefreshCcw, Calculator, Check, X, Scale, Eye } from 'lucide-react';

const SolubilityCalcSim: React.FC = () => {
  // Game State
  const [waterMass, setWaterMass] = useState(50); // Randomly set between 20-80g
  const [saltAdded, setSaltAdded] = useState(0);
  const [targetSolubility, setTargetSolubility] = useState(40); // The "real" solubility per 100g (hidden)
  
  // User Input State
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect' | 'under' | 'over'>('idle');
  const [showAnswer, setShowAnswer] = useState(false);

  const init = () => {
    // Randomize scenario
    const newWater = Math.floor(Math.random() * 6 + 2) * 10; // 20, 30, 40... 80g
    const newSolubility = Math.floor(Math.random() * 30 + 30); // 30-60g per 100g
    setWaterMass(newWater);
    setTargetSolubility(newSolubility);
    setSaltAdded(0);
    setUserAnswer('');
    setFeedback('idle');
    setShowAnswer(false);
  };

  useEffect(() => {
    init();
  }, []);

  // Calculate the mass needed to saturate the CURRENT water amount
  const saturationPoint = (targetSolubility / 100) * waterMass;
  const isSaturated = saltAdded > saturationPoint;

  const handleAddSalt = (amount: number) => {
    setSaltAdded(prev => prev + amount);
    setFeedback('idle');
    setShowAnswer(false);
  };

  const handleInputChange = (val: string) => {
      setUserAnswer(val);
      if (feedback !== 'idle') setFeedback('idle');
      if (showAnswer) setShowAnswer(false);
  };

  const checkAnswer = () => {
    const val = parseFloat(userAnswer);
    if (isNaN(val)) return;

    // FIXED LOGIC: Compare the student's answer against the CALCULATED value from their experiment data
    // Formula: (Mass Salt Added / Mass Water) * 100
    // This rewards them for doing the math correctly based on the experiment, 
    // even if they slightly overshot the "true" saturation point in the simulation.
    const studentExperimentResult = (saltAdded / waterMass) * 100;

    // Allow small margin of error for rounding
    if (Math.abs(val - studentExperimentResult) < 2) {
        setFeedback('correct');
    } else {
        setFeedback('incorrect');
    }
  };

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden select-none">
      
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-500" />
          Solubility Calculator Lab
        </h3>
        <button 
            onClick={init}
            className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
        >
            <RefreshCcw className="w-3 h-3" /> New Problem
        </button>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 bg-slate-50">
        
        {/* Visual Experiment Area */}
        <div className="flex-1 bg-white rounded-2xl border-4 border-slate-200 p-6 flex flex-col items-center relative shadow-inner">
            
            <div className="absolute top-4 left-4 bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-xs font-bold border border-blue-100">
                Water: {waterMass}g
            </div>

            <div className="absolute top-4 right-4 bg-amber-50 text-amber-800 px-3 py-1 rounded-lg text-xs font-bold border border-amber-100">
                Salt Added: {saltAdded}g
            </div>

            {/* Beaker Graphic */}
            <div className="mt-10 relative w-40 h-56 border-x-4 border-b-4 border-slate-300 rounded-b-3xl bg-white/50 backdrop-blur-sm shadow-xl">
                
                {/* Water Level */}
                <div 
                    className="absolute bottom-0 left-0 w-full bg-blue-400/30 transition-all duration-500 ease-out border-t border-blue-300/50"
                    style={{ height: `${40 + (waterMass/100)*40}%` }}
                >
                    {/* Dissolved Particles (Dots) */}
                    <div className="w-full h-full opacity-50" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                </div>

                {/* Precipitate (Solid at bottom) */}
                {isSaturated && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-white opacity-90 rounded-full shadow-sm animate-in zoom-in duration-300 flex items-center justify-center">
                        <div className="w-1 h-1 bg-slate-300 rounded-full mx-0.5"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full mx-0.5"></div>
                        <div className="w-1 h-1 bg-slate-300 rounded-full mx-0.5"></div>
                    </div>
                )}
            </div>

            {/* Status Text */}
            <div className="mt-4 h-8 text-center">
                {isSaturated ? (
                    <span className="text-xs font-black uppercase tracking-wider text-rose-500 bg-rose-50 px-3 py-1 rounded-full animate-pulse">
                        Solution Saturated!
                    </span>
                ) : (
                    <span className="text-xs font-bold text-slate-400">
                        Solution is clear...
                    </span>
                )}
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-4">
                <button 
                    onClick={() => handleAddSalt(1)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 border border-slate-300 transition-colors flex items-center gap-1"
                >
                    <Plus className="w-3 h-3" /> 1g
                </button>
                <button 
                    onClick={() => handleAddSalt(5)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 border border-slate-300 transition-colors flex items-center gap-1"
                >
                    <Plus className="w-3 h-3" /> 5g
                </button>
            </div>
        </div>

        {/* Calculation Panel */}
        <div className="w-full md:w-72 flex flex-col justify-center gap-4">
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <h4 className="font-black text-indigo-900 text-sm uppercase mb-2">Your Task</h4>
                <p className="text-xs text-indigo-800 mb-3 leading-relaxed">
                    1. Add salt until crystals <strong>just</strong> appear (saturation).<br/>
                    2. Calculate the solubility for standard <strong>100g</strong> of water.
                </p>
                
                {isSaturated && (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <div className="bg-white p-3 rounded-xl border border-indigo-100 mb-3">
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Experiment Data</p>
                            <p className="text-sm font-medium text-slate-700">
                                Mass Water: <strong>{waterMass}g</strong>
                            </p>
                            <p className="text-sm font-medium text-slate-700">
                                Saturated at: <strong>~{saltAdded}g</strong> (approx)
                            </p>
                        </div>

                        <label className="block text-xs font-bold text-indigo-900 mb-1">
                            Calculate Solubility (g per 100g):
                        </label>
                        <div className="flex gap-2">
                            <input 
                                type="number" 
                                value={userAnswer}
                                onChange={(e) => handleInputChange(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border-2 border-indigo-200 focus:border-indigo-500 outline-none font-bold text-slate-800"
                                placeholder="?"
                            />
                            <button 
                                onClick={checkAnswer}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors"
                            >
                                <Check className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Feedback */}
            {feedback === 'correct' && (
                <div className="bg-emerald-100 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center gap-2 animate-in zoom-in">
                    <Check className="w-5 h-5" /> Correct! You scaled up the data perfectly.
                </div>
            )}
            
            {feedback === 'incorrect' && (
                <div className="space-y-2 animate-in shake">
                    <div className="bg-rose-100 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-bold flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <X className="w-5 h-5" /> Incorrect.
                        </div>
                        {!showAnswer && (
                            <button 
                                onClick={() => setShowAnswer(true)}
                                className="px-2 py-1 bg-white/50 hover:bg-white rounded text-[10px] uppercase tracking-wider border border-rose-200"
                            >
                                Show Answer
                            </button>
                        )}
                    </div>
                    
                    {showAnswer && (
                        <div className="bg-white border-2 border-indigo-100 p-3 rounded-xl text-xs space-y-2 animate-in fade-in slide-in-from-top-2">
                            <p className="font-black text-indigo-900 uppercase tracking-wider text-[10px]">Calculation Steps</p>
                            <div className="flex justify-between text-slate-600">
                                <span>1. Ratio (Salt ÷ Water):</span>
                                <span className="font-mono">{saltAdded} ÷ {waterMass} = {(saltAdded/waterMass).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>2. Scale to 100g:</span>
                                <span className="font-mono">{(saltAdded/waterMass).toFixed(2)} × 100</span>
                            </div>
                            <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-indigo-600">
                                <span>Answer:</span>
                                <span>{Math.round((saltAdded/waterMass)*100)}g</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default SolubilityCalcSim;