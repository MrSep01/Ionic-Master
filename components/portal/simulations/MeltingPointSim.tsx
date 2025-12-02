
import React, { useState, useEffect, useRef } from 'react';
import { Thermometer, Play, RotateCcw, Activity, Flame, Info, Check, X, ArrowRight } from 'lucide-react';

const MeltingPointSim: React.FC = () => {
  const [sample, setSample] = useState<'A' | 'B' | 'C'>('A');
  const [temp, setTemp] = useState(20);
  const [isHeating, setIsHeating] = useState(false);
  const [history, setHistory] = useState<{t: number, temp: number}[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Sample Data
  const getSampleData = (s: string) => {
      if (s === 'A') return { name: 'Sample A', type: 'PURE', mp: 122, range: 0 };
      if (s === 'B') return { name: 'Sample B', type: 'IMPURE', mp: 115, range: 10 };
      return { name: 'Sample C', type: 'PURE', mp: 80, range: 0 };
  };

  const currentSample = getSampleData(sample);

  // Animation Frame
  const reqRef = useRef<number>();

  const animate = () => {
      setTemp(prev => {
          let next = prev;
          if (prev < 150) {
              let rate = 0.4;
              
              // If Pure: Plateau at MP (very slow temp rise)
              if (currentSample.type === 'PURE') {
                  if (prev >= currentSample.mp && prev < currentSample.mp + 2) {
                      rate = 0.02; // Plateau
                  }
              }
              // If Impure: Slope change (slower rise but not flat)
              else {
                  if (prev >= currentSample.mp && prev < currentSample.mp + currentSample.range) {
                      rate = 0.15; // Melting range slope
                  }
              }
              next = prev + rate;
          } else {
              setIsHeating(false);
              setShowResult(true);
          }
          return next;
      });

      setElapsedTime(t => t + 1);
      
      if (isHeating && temp < 150) {
          reqRef.current = requestAnimationFrame(animate);
      }
  };

  useEffect(() => {
      if (isHeating) {
          reqRef.current = requestAnimationFrame(animate);
      }
      return () => {
          if (reqRef.current) cancelAnimationFrame(reqRef.current);
      };
  }, [isHeating, sample]);

  // Record history for graph
  useEffect(() => {
      if (isHeating && elapsedTime % 5 === 0) { // optimize updates
          setHistory(prev => [...prev, { t: elapsedTime, temp }]);
      }
  }, [elapsedTime, isHeating]);

  const handleReset = () => {
      setIsHeating(false);
      setTemp(20);
      setElapsedTime(0);
      setHistory([]);
      setShowResult(false);
  };

  const handleSampleChange = (s: 'A' | 'B' | 'C') => {
      setSample(s);
      handleReset();
  };

  const getState = () => {
      if (currentSample.type === 'PURE') {
          if (temp < currentSample.mp) return 'SOLID';
          if (temp >= currentSample.mp && temp < currentSample.mp + 2) return 'MELTING';
          return 'LIQUID';
      } else {
          if (temp < currentSample.mp) return 'SOLID';
          if (temp >= currentSample.mp && temp < currentSample.mp + currentSample.range) return 'MELTING (Slush)';
          return 'LIQUID';
      }
  };

  const currentState = getState();

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden select-none relative">
      
      {/* Intro Overlay */}
      {showIntro && (
          <div className="absolute inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center border-4 border-white">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Flame className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">Melting Point Lab</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      Your task is to identify if a substance is <strong>Pure</strong> or <strong>Impure</strong> by heating it.
                      <br/><br/>
                      <span className="block text-emerald-600 font-bold">• Pure substances melt sharply (Flat line).</span>
                      <span className="block text-rose-600 font-bold">• Mixtures melt over a range (Sloped line).</span>
                  </p>
                  <button 
                    onClick={() => setShowIntro(false)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-200"
                  >
                      Start Experiment
                  </button>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-indigo-500" />
          Melting Point Apparatus
        </h3>
        <button 
            onClick={handleReset}
            className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
        >
            <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 bg-slate-100 items-start min-h-[450px]">
        
        {/* Apparatus Visual */}
        <div className="flex-1 flex flex-col items-center w-full">
            
            {/* Magnified View */}
            <div className="relative w-56 h-56 rounded-full border-8 border-slate-300 bg-slate-200 shadow-inner overflow-hidden mb-6 flex items-center justify-center group">
                {/* Background Oil */}
                <div className="absolute inset-0 bg-amber-500/10 pointer-events-none"></div>
                
                {/* Capillary Tube */}
                <div className="w-12 h-full bg-white/80 border-x border-slate-400 relative overflow-hidden backdrop-blur-sm">
                    
                    {/* SUBSTANCE VISUALS */}
                    <div className="absolute bottom-4 left-1 right-1 h-32 transition-all duration-300">
                        
                        {/* Solid (Powder) */}
                        {currentState === 'SOLID' && (
                            <div className="w-full h-full bg-[#f8fafc]" 
                                style={{ 
                                    backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', 
                                    backgroundSize: '4px 4px' 
                                }}
                            ></div>
                        )}

                        {/* Melting (Slush) */}
                        {currentState.includes('MELTING') && (
                            <div className="w-full h-full relative">
                                <div className="absolute bottom-0 w-full h-full bg-slate-100/50 animate-pulse"></div>
                                {/* Floating solid chunks */}
                                <div className="absolute bottom-2 left-1 w-3 h-3 bg-slate-300 rounded-sm animate-bounce" style={{ animationDuration: '2s' }}></div>
                                <div className="absolute bottom-8 right-2 w-2 h-2 bg-slate-300 rounded-sm animate-bounce" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute bottom-16 left-3 w-2 h-4 bg-slate-300 rounded-sm animate-bounce" style={{ animationDuration: '1.5s' }}></div>
                            </div>
                        )}

                        {/* Liquid */}
                        {currentState === 'LIQUID' && (
                            <div className="w-full h-full relative">
                                <div className="absolute bottom-0 w-full h-16 bg-blue-100/30 border-t border-blue-200/50"></div>
                                <div className="absolute bottom-16 w-full h-1 bg-blue-200/50 animate-pulse"></div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Lens Flare / Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-full"></div>
                
                {/* Temp Overlay */}
                <div className="absolute top-6 font-mono font-black text-slate-400/50 text-xl select-none">{temp.toFixed(1)}°C</div>
            </div>

            {/* Controls */}
            <div className="w-full max-w-sm bg-white p-4 rounded-2xl shadow-sm border border-slate-200 z-10">
                <div className="flex gap-2 mb-4">
                    {['A', 'B', 'C'].map(s => (
                        <button
                            key={s}
                            onClick={() => handleSampleChange(s as any)}
                            disabled={isHeating}
                            className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${sample === s ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                            Sample {s}
                        </button>
                    ))}
                </div>
                
                <button
                    onClick={() => setIsHeating(!isHeating)}
                    disabled={temp >= 150}
                    className={`w-full py-3 rounded-xl font-black text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${isHeating ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                >
                    {isHeating ? 'PAUSE HEATING' : 'START HEATING'} <Play className={`w-4 h-4 fill-current ${isHeating ? 'hidden' : ''}`} />
                </button>
            </div>

        </div>

        {/* Graph Area */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm h-96 flex flex-col relative">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Heating Curve</span>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-500">Target MP</span>
                </div>
            </div>

            <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden">
                {/* Grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <svg className="w-full h-full" preserveAspectRatio="none">
                    {/* Target Line */}
                    <line 
                        x1="0" 
                        y1={`${100 - (currentSample.mp / 150) * 100}%`} 
                        x2="100%" 
                        y2={`${100 - (currentSample.mp / 150) * 100}%`} 
                        stroke="#ef4444" 
                        strokeWidth="1" 
                        strokeDasharray="4 2" 
                    />
                    
                    {/* Melting Range Markers (Only if heating passed them) */}
                    {temp > currentSample.mp && (
                        <rect 
                            x="0" 
                            y={`${100 - ((currentSample.mp + currentSample.range) / 150) * 100}%`}
                            width="100%"
                            height={`${(currentSample.range / 150) * 100}%`}
                            fill="#fef3c7"
                            opacity="0.3"
                        />
                    )}

                    {/* The Plot */}
                    <path 
                        d={`M 0,${100 - (20/150)*100} ${history.map((h, i) => `L ${(i/(history.length + 10))*100},${100 - (h.temp/150)*100}`).join(' ')}`}
                        fill="none" 
                        stroke="#6366f1" 
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>

                {/* Axes Labels */}
                <div className="absolute bottom-1 right-2 text-[9px] font-bold text-slate-400">TIME</div>
                <div className="absolute top-2 left-1 text-[9px] font-bold text-slate-400">150°C</div>
                <div className="absolute bottom-2 left-1 text-[9px] font-bold text-slate-400">20°C</div>
            </div>

            {/* Result Summary Overlay */}
            {showResult && (
                <div className="absolute bottom-4 left-4 right-4 bg-white border-2 border-slate-100 p-4 rounded-xl shadow-xl animate-in slide-in-from-bottom-4 z-20">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-black text-slate-800 uppercase tracking-wide text-xs mb-1">Experiment Result</h4>
                            <p className="text-sm text-slate-600 mb-2">
                                Melting observed at: <span className="font-mono font-bold text-indigo-600">{currentSample.mp}°C {currentSample.range > 0 ? `- ${currentSample.mp + currentSample.range}°C` : '(Sharp)'}</span>
                            </p>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase ${currentSample.type === 'PURE' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                {currentSample.type === 'PURE' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                Conclusion: {currentSample.type}
                            </div>
                        </div>
                        <button onClick={handleReset} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default MeltingPointSim;
