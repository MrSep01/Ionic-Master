
import React, { useState, useEffect, useRef } from 'react';
import { Scale, Flame, Thermometer, Snowflake, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

const SolubilityPracticalSim: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Weigh, 2: Heat, 3: Cool, 4: Result
  const [temp, setTemp] = useState(25);
  const [isHeating, setIsHeating] = useState(false);
  const [isCooling, setIsCooling] = useState(false);
  const [isDissolved, setIsDissolved] = useState(false);
  const [crystalsFormed, setCrystalsFormed] = useState(false);
  const [recordedTemp, setRecordedTemp] = useState<number | null>(null);
  
  // Experiment Data
  const MASS_WATER = 10;
  const MASS_SOLUTE = 4; // Ammonium Chloride approx
  const CRYSTAL_POINT = 55; // Temp where crystals appear

  const coolingRef = useRef<number>();

  const reset = () => {
    setStep(1);
    setTemp(25);
    setIsHeating(false);
    setIsCooling(false);
    setIsDissolved(false);
    setCrystalsFormed(false);
    setRecordedTemp(null);
  };

  // Heating Effect
  useEffect(() => {
    let interval: any;
    if (isHeating) {
      interval = setInterval(() => {
        setTemp(prev => {
          const next = prev + 1;
          if (next >= 80) {
            setIsHeating(false);
            setIsDissolved(true);
            return 80;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isHeating]);

  // Cooling Effect
  useEffect(() => {
    if (isCooling) {
      coolingRef.current = window.setInterval(() => {
        setTemp(prev => {
          const next = prev - 0.2; // Slow cooling
          
          // Visual trigger for crystals (hidden from user logic)
          if (next <= CRYSTAL_POINT && !crystalsFormed) {
            setCrystalsFormed(true);
          }

          if (next <= 20) {
            clearInterval(coolingRef.current);
            setIsCooling(false);
            return 20;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(coolingRef.current);
  }, [isCooling, crystalsFormed]);

  const handleRecord = () => {
    setRecordedTemp(temp);
    clearInterval(coolingRef.current);
    setIsCooling(false);
    setStep(4);
  };

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden select-none">
      
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-indigo-500" />
          Virtual Lab: Solubility Point
        </h3>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500">
                Step {step} of 4
            </span>
            <button onClick={reset} className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                <RotateCcw className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="p-6 md:p-12 bg-slate-100 flex flex-col md:flex-row gap-12 items-center justify-center min-h-[400px]">
        
        {/* --- STEP 1: PREPARATION --- */}
        {step === 1 && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
                <div className="relative w-48 h-48 bg-white rounded-full shadow-xl border-4 border-slate-200 flex items-center justify-center mb-8">
                    <Scale className="w-20 h-20 text-indigo-200" />
                    <div className="absolute -bottom-4 bg-slate-800 text-green-400 font-mono text-xl px-4 py-2 rounded-lg border-2 border-slate-600 shadow-lg">
                        {MASS_WATER + MASS_SOLUTE}.00 g
                    </div>
                </div>
                
                <div className="text-center max-w-sm">
                    <h2 className="text-xl font-black text-slate-800 mb-2">Prepare the Solution</h2>
                    <p className="text-slate-600 mb-6">We have weighed <strong>{MASS_WATER}g of water</strong> and added <strong>{MASS_SOLUTE}g of Ammonium Chloride</strong> into a boiling tube.</p>
                    <button 
                        onClick={() => setStep(2)}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 mx-auto"
                    >
                        Start Heating <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        )}

        {/* --- STEP 2: HEATING --- */}
        {step === 2 && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300 w-full max-w-md">
                <div className="relative h-64 w-32 bg-blue-100/50 rounded-b-3xl border-x-4 border-b-4 border-blue-200 mb-6 overflow-hidden backdrop-blur-sm">
                    {/* Water Bath Water */}
                    <div className="absolute bottom-0 w-full h-3/4 bg-blue-400/20"></div>
                    
                    {/* Boiling Tube */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-48 border-x-2 border-b-2 border-slate-400 bg-white/40 rounded-b-xl overflow-hidden flex flex-col justify-end">
                        {/* Solution inside tube */}
                        <div className="w-full h-1/2 bg-transparent relative transition-all duration-1000">
                            {/* Solid Particles */}
                            {!isDissolved && (
                                <div className="absolute bottom-0 w-full h-8 bg-white opacity-80 transition-opacity duration-1000 flex justify-center items-end pb-1 gap-0.5 flex-wrap px-1">
                                    {Array.from({length:12}).map((_,i) => <div key={i} className="w-2 h-2 bg-slate-300 rounded-full"></div>)}
                                </div>
                            )}
                            <div className={`absolute inset-0 bg-indigo-500/10 transition-opacity duration-1000 ${isDissolved ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>
                    </div>

                    {/* Bubbles */}
                    {isHeating && (
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute bottom-2 left-4 w-2 h-2 bg-white/50 rounded-full animate-ping"></div>
                            <div className="absolute bottom-4 right-8 w-3 h-3 bg-white/50 rounded-full animate-ping delay-100"></div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <Thermometer className={`w-8 h-8 ${temp > 50 ? 'text-rose-500' : 'text-blue-500'}`} />
                    <div className="flex-1">
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-400 to-rose-500 transition-all duration-300" style={{ width: `${temp}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs font-bold text-slate-400">
                            <span>20°C</span>
                            <span className="text-slate-800">{Math.round(temp)}°C</span>
                            <span>100°C</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    {!isDissolved ? (
                        <button 
                            onClick={() => setIsHeating(true)}
                            disabled={isHeating}
                            className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 mx-auto ${isHeating ? 'bg-orange-100 text-orange-400 cursor-wait' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                        >
                            <Flame className={`w-4 h-4 ${isHeating ? 'animate-pulse' : ''}`} /> 
                            {isHeating ? 'Heating...' : 'Heat Solution'}
                        </button>
                    ) : (
                        <button 
                            onClick={() => { setStep(3); setIsCooling(true); }}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg animate-in fade-in slide-in-from-bottom-2"
                        >
                            Solid Dissolved! Start Cooling
                        </button>
                    )}
                </div>
            </div>
        )}

        {/* --- STEP 3: COOLING (THE TEST) --- */}
        {step === 3 && (
            <div className="flex flex-col items-center w-full max-w-md animate-in fade-in">
                
                <div className="bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-lg animate-pulse">
                    Watch closely for crystals!
                </div>

                {/* Boiling Tube View */}
                <div className="relative h-64 w-24 border-x-4 border-b-4 border-slate-300 rounded-b-3xl bg-slate-200/30 overflow-hidden shadow-2xl mb-6">
                    {/* Solution */}
                    <div className="absolute bottom-0 w-full h-3/4 bg-blue-100/20 transition-all duration-500">
                        {/* Crystals appearing effect */}
                        <div className={`absolute inset-0 bg-white transition-opacity duration-300 ${crystalsFormed ? 'opacity-80' : 'opacity-0'}`}>
                            {crystalsFormed && (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Snowflake className="w-12 h-12 text-slate-300 animate-spin-slow" />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Thermometer Inside */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-slate-300/50 rounded-b-full">
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full"></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-full bg-rose-500 transition-all duration-100" style={{ height: `${temp}%` }}></div>
                    </div>
                </div>

                <div className="text-4xl font-mono font-black text-slate-800 mb-6">
                    {temp.toFixed(1)}°C
                </div>

                <button 
                    onMouseDown={handleRecord}
                    className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <Snowflake className="w-6 h-6" /> RECORD TEMP
                </button>
                <p className="text-xs text-slate-400 mt-3 text-center">Click immediately when solution turns cloudy.</p>
            </div>
        )}

        {/* --- STEP 4: RESULT --- */}
        {step === 4 && (
            <div className="text-center max-w-md animate-in zoom-in duration-500">
                <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                
                <h2 className="text-2xl font-black text-slate-800 mb-2">Experiment Complete</h2>
                <p className="text-slate-600 mb-6">You recorded the crystallisation point.</p>

                <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-slate-500 uppercase">Recorded Temp</span>
                        <span className="text-xl font-mono font-black text-indigo-600">{recordedTemp?.toFixed(1)}°C</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-2 mt-2">
                        <span className="text-sm font-bold text-slate-500 uppercase">True Value</span>
                        <span className="text-sm font-mono font-bold text-slate-400">{CRYSTAL_POINT}°C</span>
                    </div>
                    <div className="mt-4 text-xs text-slate-400 bg-slate-50 p-2 rounded-lg">
                        Difference: <span className={Math.abs((recordedTemp || 0) - CRYSTAL_POINT) < 3 ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
                            {Math.abs((recordedTemp || 0) - CRYSTAL_POINT).toFixed(1)}°C
                        </span>
                    </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-left">
                    <h4 className="text-xs font-bold text-indigo-800 uppercase mb-2">Analysis Calculation</h4>
                    <p className="text-sm text-indigo-900 font-mono mb-1">Mass Solute: {MASS_SOLUTE}g</p>
                    <p className="text-sm text-indigo-900 font-mono mb-2">Mass Water: {MASS_WATER}g</p>
                    <p className="text-sm text-indigo-900 font-bold">
                        Solubility = ({MASS_SOLUTE} ÷ {MASS_WATER}) × 100 = 40g/100g
                    </p>
                    <p className="text-[10px] text-indigo-400 mt-2">At {recordedTemp?.toFixed(1)}°C</p>
                </div>

                <button onClick={reset} className="mt-8 text-slate-400 hover:text-indigo-600 font-bold text-sm underline">
                    Repeat Experiment
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default SolubilityPracticalSim;
