
import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Pencil, PenTool, Beaker, Ruler, Calculator, Check, X, AlertTriangle } from 'lucide-react';

interface ChromatographySimProps {
  mode: 'SETUP' | 'RUN' | 'RF';
}

const ChromatographySim: React.FC<ChromatographySimProps> = ({ mode }) => {
  // --- SETUP MODE STATE ---
  const [lineType, setLineType] = useState<'PENCIL' | 'INK'>('PENCIL');
  const [solventLevel, setSolventLevel] = useState<'BELOW' | 'ABOVE'>('BELOW');
  const [setupStatus, setSetupStatus] = useState<'IDLE' | 'RUNNING' | 'FAIL_INK' | 'FAIL_LEVEL' | 'SUCCESS' | 'FINISHED'>('IDLE');
  const [setupProgress, setSetupProgress] = useState(0);

  // --- RUN MODE STATE ---
  const [runProgress, setRunProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // --- RF MODE STATE ---
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [userRf, setUserRf] = useState('');
  const [rfFeedback, setRfFeedback] = useState<'IDLE' | 'CORRECT' | 'WRONG'>('IDLE');

  const reqRef = useRef<number | null>(null);

  // --- ANIMATION LOOPS ---

  // Setup Animation Loop
  useEffect(() => {
    if (setupStatus === 'RUNNING') {
      const loop = () => {
        setSetupProgress(prev => {
          if (prev >= 100) {
            // Determine Result at end of run
            if (lineType === 'INK') setSetupStatus('FAIL_INK');
            else if (solventLevel === 'ABOVE') setSetupStatus('FAIL_LEVEL');
            else setSetupStatus('SUCCESS');
            return 100;
          }
          return prev + 0.5;
        });
        reqRef.current = requestAnimationFrame(loop);
      };
      loop();
    }
    return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [setupStatus, lineType, solventLevel]);

  // Run Animation Loop
  useEffect(() => {
    if (isRunning) {
      const loop = () => {
        setRunProgress(prev => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 0.4; // Speed of simulation
        });
        reqRef.current = requestAnimationFrame(loop);
      };
      loop();
    }
    return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [isRunning]);


  // --- RENDERERS ---

  const renderSetupMode = () => {
    // Dynamic styles based on progress
    // Solvent moves from 15% to 85% height
    const solventHeight = solventLevel === 'BELOW' 
        ? 15 + (setupProgress * 0.7) 
        : 35 + (setupProgress * 0.5);
    
    // Spot logic during animation
    // Baseline is at approx 20% of paper height (inside the beaker relative logic)
    // If Ink: It smears. If Pencil + Below: It moves.
    
    // Check failure condition immediately for visual feedback
    const isWashedAway = solventLevel === 'ABOVE';
    const isSmearing = lineType === 'INK' && !isWashedAway;
    
    return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1 w-full bg-slate-50 rounded-2xl border-2 border-slate-200 relative min-h-[350px] flex justify-center items-end pb-4 overflow-hidden">
        
        {/* Beaker */}
        <div className="relative w-48 h-72 border-x-4 border-b-4 border-slate-300 bg-white/60 rounded-b-3xl overflow-hidden shadow-sm">
           
           {/* Solvent Liquid */}
           <div 
             className="absolute bottom-0 w-full bg-cyan-200/60 border-t border-cyan-300 transition-all duration-75"
             style={{ height: `${solventHeight}%` }}
           ></div>
           
           {/* Chromatography Paper */}
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-64 bg-white shadow-md border border-slate-100 flex justify-center">
              
              {/* Baseline (2rem from bottom = 32px) */}
              <div 
                className={`absolute bottom-8 w-full h-0.5 ${lineType === 'PENCIL' ? 'bg-slate-400' : 'bg-blue-600'}`}
              ></div>
              
              {/* The Spot */}
              {!isWashedAway && (
                  <div 
                    className="absolute w-4 h-4 bg-red-500 rounded-full"
                    style={{ 
                        bottom: isSmearing 
                            ? '2rem' // Stays at bottom but smears up (handled by smear div below)
                            : `calc(2rem + ${setupProgress * 1.5}px)`, // Moves up
                        opacity: isSmearing ? 0 : 1 // Hide original dot if smearing
                    }}
                  ></div>
              )}

              {/* Failure Visuals */}
              
              {/* 1. Washed Away (Solvent Above) */}
              {isWashedAway && setupProgress > 5 && (
                  <div 
                    className="absolute w-full h-full bg-red-500/10 transition-opacity duration-1000"
                    style={{ opacity: setupProgress / 50 }}
                  >
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  </div>
              )}

              {/* 2. Ink Smear (Ink Line) */}
              {isSmearing && (
                  <div 
                    className="absolute bottom-8 w-1/2 bg-gradient-to-t from-blue-600 via-purple-500 to-transparent blur-sm opacity-80"
                    style={{ height: `${setupProgress * 1.5}px` }}
                  ></div>
              )}
              {isSmearing && (
                  <div 
                    className="absolute bottom-8 w-4 bg-gradient-to-t from-red-600 to-transparent blur-md"
                    style={{ height: `${setupProgress * 1.5}px`, left: '50%', transform: 'translateX(-50%)' }}
                  ></div>
              )}

           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full md:w-64 space-y-6">
          <div className="space-y-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">1. Baseline Material</p>
              <div className="flex gap-2">
                  <button 
                    onClick={() => { setLineType('PENCIL'); setSetupStatus('IDLE'); setSetupProgress(0); }}
                    disabled={setupStatus === 'RUNNING'}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 ${lineType === 'PENCIL' ? 'border-slate-600 bg-slate-100 text-slate-800' : 'border-slate-200 text-slate-400'}`}
                  >
                      <Pencil className="w-4 h-4" /> Pencil
                  </button>
                  <button 
                    onClick={() => { setLineType('INK'); setSetupStatus('IDLE'); setSetupProgress(0); }}
                    disabled={setupStatus === 'RUNNING'}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 ${lineType === 'INK' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-400'}`}
                  >
                      <PenTool className="w-4 h-4" /> Ink Pen
                  </button>
              </div>
          </div>

          <div className="space-y-3">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">2. Solvent Level</p>
              <div className="flex gap-2">
                  <button 
                    onClick={() => { setSolventLevel('BELOW'); setSetupStatus('IDLE'); setSetupProgress(0); }}
                    disabled={setupStatus === 'RUNNING'}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all ${solventLevel === 'BELOW' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-400'}`}
                  >
                      Below Line
                  </button>
                  <button 
                    onClick={() => { setSolventLevel('ABOVE'); setSetupStatus('IDLE'); setSetupProgress(0); }}
                    disabled={setupStatus === 'RUNNING'}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all ${solventLevel === 'ABOVE' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-400'}`}
                  >
                      Above Line
                  </button>
              </div>
          </div>

          <button 
            onClick={() => {
                if (setupStatus === 'RUNNING') return;
                if (setupStatus !== 'IDLE') {
                    setSetupStatus('IDLE');
                    setSetupProgress(0);
                } else {
                    setSetupStatus('RUNNING');
                }
            }}
            className={`w-full py-3 rounded-xl font-black text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${setupStatus === 'IDLE' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-400 hover:bg-slate-500'}`}
          >
              {setupStatus === 'IDLE' ? <><Play className="w-4 h-4" /> START EXPERIMENT</> : <><RotateCcw className="w-4 h-4" /> RESET</>}
          </button>

          {setupStatus === 'FAIL_INK' && (
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded text-xs text-blue-800 animate-in fade-in slide-in-from-top-2">
                  <strong>Failed:</strong> The ink dissolved in the solvent and ruined the chromatogram! Always use pencil.
              </div>
          )}
          {setupStatus === 'FAIL_LEVEL' && (
              <div className="bg-amber-100 border-l-4 border-amber-500 p-3 rounded text-xs text-amber-800 animate-in fade-in slide-in-from-top-2">
                  <strong>Failed:</strong> The solvent washed the spots off the paper! Level must be below the line.
              </div>
          )}
          {setupStatus === 'SUCCESS' && (
              <div className="bg-emerald-100 border-l-4 border-emerald-500 p-3 rounded text-xs text-emerald-800 animate-in fade-in slide-in-from-top-2">
                  <strong>Success:</strong> Perfect setup! The solvent travels up, carrying the dye.
              </div>
          )}
      </div>
    </div>
  )};

  const renderRunMode = () => (
    <div className="flex flex-col md:flex-row gap-8 items-center">
       <div className="bg-white p-4 rounded-xl border-2 border-slate-200 shadow-sm">
           <h4 className="text-center font-bold text-slate-700 mb-2">Chromatogram</h4>
           
           <div className="relative w-56 h-80 bg-white border border-slate-300 shadow-inner overflow-hidden">
               {/* Paper Texture */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-20 pointer-events-none"></div>

               {/* Baseline (Start) */}
               <div className="absolute bottom-8 w-full h-0.5 bg-slate-400 z-10"></div>
               <div className="absolute bottom-2 right-2 text-[9px] text-slate-400 font-bold">Baseline (Start)</div>

               {/* Solvent Front */}
               <div 
                 className="absolute bottom-0 w-full bg-cyan-100/30 border-t-2 border-cyan-300/50 transition-all duration-75 z-20"
                 style={{ height: `calc(2rem + ${runProgress * 0.8}%)` }} // Starts at baseline (2rem) approx
               ></div>

               {/* --- SPOTS --- */}
               {/* 
                  Positioning: 
                  bottom: calc(2rem + X) 
                  where 2rem is the baseline height (bottom-8)
                  X is the distance travelled based on runProgress.
                  Max travel is approx 80% of container height.
               */}

               {/* Mixture M (Green + Red) */}
               <div className="absolute left-[20%] -translate-x-1/2 z-30" style={{ bottom: '2rem' }}>
                   {/* Green Component - Moves fast (High Rf) */}
                   <div 
                        className="absolute w-4 h-4 bg-green-500 rounded-full shadow-sm"
                        style={{ bottom: `${runProgress * 2.2}px`, opacity: 0.9 }}
                   ></div>
                   {/* Red Component - Moves slow (Low Rf) */}
                   <div 
                        className="absolute w-4 h-4 bg-red-500 rounded-full shadow-sm"
                        style={{ bottom: `${runProgress * 0.8}px`, opacity: 0.9 }}
                   ></div>
                   {/* Initial Spot (Ghost) */}
                   <div className="w-4 h-4 bg-slate-800 rounded-full opacity-10"></div>
                   <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-black text-slate-500">M</span>
               </div>

               {/* Pure A (Red) */}
               <div className="absolute left-[50%] -translate-x-1/2 z-30" style={{ bottom: '2rem' }}>
                   <div 
                        className="absolute w-4 h-4 bg-red-500 rounded-full shadow-sm"
                        style={{ bottom: `${runProgress * 0.8}px`, opacity: 0.9 }}
                   ></div>
                   <div className="w-4 h-4 bg-slate-800 rounded-full opacity-10"></div>
                   <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-black text-slate-500">A</span>
               </div>

               {/* Pure B (Blue) */}
               <div className="absolute left-[80%] -translate-x-1/2 z-30" style={{ bottom: '2rem' }}>
                   <div 
                        className="absolute w-4 h-4 bg-blue-500 rounded-full shadow-sm"
                        style={{ bottom: `${runProgress * 1.5}px`, opacity: 0.9 }}
                   ></div>
                   <div className="w-4 h-4 bg-slate-800 rounded-full opacity-10"></div>
                   <span className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-black text-slate-500">B</span>
               </div>
           </div>
       </div>

       <div className="flex-1 space-y-6">
           <div className="space-y-2">
               <h3 className="font-black text-slate-800 text-lg">Interpretation Challenge</h3>
               <p className="text-slate-600 text-sm">
                   <strong>Mixture M</strong> is composed of different dyes. Run the simulation to separate them.
                   <br/><br/>
                   Analyze the result: Does Mixture M contain Dye A or Dye B?
               </p>
           </div>

           <button 
             onClick={() => { setIsRunning(true); setRunProgress(0); }}
             disabled={isRunning}
             className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black shadow-lg shadow-indigo-200 transition-all flex items-center gap-3 active:scale-95"
           >
               {isRunning ? 'Running...' : runProgress > 0 ? 'Run Again' : 'Start Separation'} <Play className="w-5 h-5" />
           </button>

           {runProgress >= 100 && (
               <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-bottom-2">
                   <p className="font-black text-slate-800 mb-3 uppercase tracking-wide text-xs">Analysis Results:</p>
                   <ul className="text-sm space-y-3 text-slate-700 font-medium">
                       <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-500 bg-emerald-100 rounded-full p-1" /> Mixture M contains <strong>Dye A</strong> (Red spots match height).</li>
                       <li className="flex items-center gap-3"><X className="w-5 h-5 text-rose-500 bg-rose-100 rounded-full p-1" /> Mixture M does <strong>not</strong> contain Dye B (No Blue spot).</li>
                       <li className="flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-amber-500 bg-amber-100 rounded-full p-1" /> Mixture M also contains a mystery Green dye.</li>
                   </ul>
               </div>
           )}
       </div>
    </div>
  );

  const renderRfMode = () => {
      // Distances in imaginary pixels
      // Baseline at 250px from top
      // Solvent moves to 50px from top (dist = 200px)
      // Spot moves to 130px from top (dist = 120px)
      // Rf = 120 / 200 = 0.6

      const checkRf = () => {
          const val = parseFloat(userRf);
          if (Math.abs(val - 0.6) < 0.05) setRfFeedback('CORRECT');
          else setRfFeedback('WRONG');
      };

      return (
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 relative">
                <div className="relative w-48 h-80 bg-white border border-slate-300 shadow-sm mx-auto select-none">
                    {/* Baseline */}
                    <div className="absolute top-[250px] w-full h-0.5 bg-slate-400"></div>
                    <div className="absolute top-[252px] -left-12 text-[10px] font-bold text-slate-500 w-10 text-right">Start</div>

                    {/* Solvent Front */}
                    <div className="absolute top-[50px] w-full h-0.5 bg-slate-300 border-t border-dashed border-slate-400"></div>
                    <div className="absolute top-[42px] -left-12 text-[10px] font-bold text-slate-500 w-10 text-right">Front</div>

                    {/* Spot */}
                    <div className="absolute top-[130px] left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full opacity-90 shadow-sm border border-purple-600/20"></div>
                    
                    {/* Measurement Lines (Show on toggle) */}
                    {showMeasurements && (
                        <>
                            {/* Solvent Arrow */}
                            <div className="absolute right-2 top-[50px] h-[200px] w-px bg-slate-400"></div>
                            <div className="absolute right-2 top-[50px] w-2 h-px bg-slate-400"></div>
                            <div className="absolute right-2 top-[250px] w-2 h-px bg-slate-400"></div>
                            <div className="absolute right-4 top-[150px] bg-white px-1 text-xs font-bold text-slate-600 border border-slate-200 rounded">10.0 cm</div>

                            {/* Spot Arrow */}
                            <div className="absolute left-1/2 top-[138px] h-[112px] w-px bg-purple-400"></div>
                            <div className="absolute left-[55%] top-[190px] bg-white px-1 text-xs font-bold text-purple-600 border border-purple-200 rounded">6.0 cm</div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex-1 space-y-6">
                <div className="space-y-2">
                    <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-indigo-500" />
                        Calculate Rf
                    </h3>
                    <p className="text-sm text-slate-600">
                        Rf = <span className="font-mono bg-slate-100 px-1 rounded text-indigo-600 font-bold">Distance Spot Moved</span> ÷ <span className="font-mono bg-slate-100 px-1 rounded text-slate-600 font-bold">Distance Solvent Moved</span>
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setShowMeasurements(!showMeasurements)}
                        className="px-4 py-2 bg-white border-2 border-slate-200 hover:border-indigo-300 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2 transition-all"
                    >
                        <Ruler className="w-4 h-4" /> {showMeasurements ? 'Hide' : 'Show'} Measurements
                    </button>
                </div>

                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <label className="block text-xs font-bold text-indigo-900 mb-2 uppercase tracking-wide">Enter Rf Value:</label>
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            step="0.1"
                            value={userRf}
                            onChange={(e) => setUserRf(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-indigo-200 outline-none focus:border-indigo-500 font-mono font-bold text-lg"
                            placeholder="0.0"
                        />
                        <button 
                            onClick={checkRf}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                        >
                            Check
                        </button>
                    </div>
                    {rfFeedback === 'CORRECT' && (
                        <p className="mt-3 text-sm font-bold text-emerald-600 flex items-center gap-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100"><Check className="w-4 h-4" /> Correct! Rf = 6.0 ÷ 10.0 = 0.6</p>
                    )}
                    {rfFeedback === 'WRONG' && (
                        <p className="mt-3 text-sm font-bold text-rose-600 flex items-center gap-2 bg-rose-50 p-2 rounded-lg border border-rose-100"><X className="w-4 h-4" /> Incorrect. Use the formula: Spot ÷ Solvent</p>
                    )}
                </div>
            </div>
        </div>
      );
  };

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden select-none">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Beaker className="w-5 h-5 text-indigo-500" />
          Chromatography Lab: {mode === 'SETUP' ? 'Setup' : mode === 'RUN' ? 'Separation' : 'Analysis'}
        </h3>
      </div>
      <div className="p-6 md:p-8">
          {mode === 'SETUP' && renderSetupMode()}
          {mode === 'RUN' && renderRunMode()}
          {mode === 'RF' && renderRfMode()}
      </div>
    </div>
  );
};

export default ChromatographySim;
