
import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Info, Thermometer, TestTube } from 'lucide-react';

const DiffusionSim: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  
  // Particle animation ref
  const requestRef = useRef<number>(0);

  // NH3 (Ammonia) Mr = 17
  // HCl (Hydrochloric Acid) Mr = 36.5
  // Rate ratio approx 1.46 : 1
  // NH3 travels ~60% of distance, HCl travels ~40%
  const meetingPoint = 60; 

  const animate = () => {
    setProgress(prev => {
      if (prev >= 100) {
        setIsFinished(true);
        setIsRunning(false);
        return 100;
      }
      return prev + 0.2; // SLOWER SPEED
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setProgress(0);
  };

  // Generate static particles for visuals
  const nh3Particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    y: Math.random() * 60 + 20, // Random vertical position
    delay: Math.random() * 2,
  }));

  const hclParticles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    y: Math.random() * 60 + 20,
    delay: Math.random() * 2,
  }));

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden select-none">
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <TestTube className="w-5 h-5 text-indigo-500" />
          Virtual Fume Cupboard
        </h3>
        <div className="flex gap-2">
            {!isRunning && !isFinished ? (
                <button 
                    onClick={() => setIsRunning(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
                >
                    <Play className="w-3 h-3 fill-current" /> START EXPERIMENT
                </button>
            ) : (
                <button 
                    onClick={handleReset}
                    className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                >
                    <RotateCcw className="w-3 h-3" /> RESET
                </button>
            )}
        </div>
      </div>

      <div className="p-8 md:p-12 bg-slate-800">
        
        {/* Glass Tube Container */}
        <div className="relative h-40 bg-slate-900 border-4 border-slate-600 rounded-full overflow-hidden shadow-2xl ring-1 ring-white/10">
            
            {/* Inner reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-20"></div>

            {/* Cotton Wool Left (NH3) */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-slate-300 border-r-4 border-slate-400 flex flex-col items-center justify-center z-10 shadow-xl">
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-50 absolute inset-0"></div>
                <span className="font-black text-slate-700 text-xs z-10 mb-1">Cotton Wool</span>
                <span className="font-bold text-blue-700 text-[10px] bg-blue-100 px-1.5 py-0.5 rounded z-10 border border-blue-200 text-center leading-tight">Ammonia<br/>Sol.</span>
            </div>

            {/* Cotton Wool Right (HCl) */}
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-slate-300 border-l-4 border-slate-400 flex flex-col items-center justify-center z-10 shadow-xl">
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-50 absolute inset-0"></div>
                <span className="font-black text-slate-700 text-xs z-10 mb-1">Cotton Wool</span>
                <span className="font-bold text-green-800 text-[10px] bg-green-100 px-1.5 py-0.5 rounded z-10 border border-green-200 text-center leading-tight">Conc.<br/>HCl</span>
            </div>

            {/* Moving Particles Area (Inside Tube) */}
            <div className="absolute inset-x-24 inset-y-0 overflow-hidden">
                
                {/* NH3 Particles (Left -> Right) */}
                {nh3Particles.map(p => (
                    <div 
                        key={`nh3-${p.id}`}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_5px_rgba(96,165,250,0.8)]"
                        style={{
                            top: `${p.y}%`,
                            left: isRunning || isFinished 
                                ? `${Math.min(meetingPoint, progress * (meetingPoint/100) * 1.5 + (Math.random()*5))}%` 
                                : '2%', // Start near cotton
                            transition: isRunning ? 'none' : 'left 0.5s ease-out',
                            opacity: isFinished ? 0.2 : 0.8
                        }}
                    ></div>
                ))}

                {/* HCl Particles (Right -> Left) */}
                {hclParticles.map(p => (
                    <div 
                        key={`hcl-${p.id}`}
                        className="absolute w-3 h-3 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)]"
                        style={{
                            top: `${p.y}%`,
                            right: isRunning || isFinished
                                ? `${Math.min(100 - meetingPoint, progress * ((100-meetingPoint)/100) * 1.5 + (Math.random()*5))}%` 
                                : '2%', // Start near cotton
                            transition: isRunning ? 'none' : 'right 0.5s ease-out',
                            opacity: isFinished ? 0.2 : 0.8
                        }}
                    ></div>
                ))}

                {/* The White Ring (Result) */}
                <div 
                    className={`absolute top-0 bottom-0 w-4 bg-white/90 shadow-[0_0_25px_white] transition-all duration-1000 blur-sm ${isFinished ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                    style={{ left: `${meetingPoint}%` }}
                >
                </div>
                
                {/* Label for Ring */}
                <div 
                    className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 z-30 ${isFinished ? 'opacity-100' : 'opacity-0'}`}
                    style={{ left: `${meetingPoint}%`, transform: 'translate(-50%, -50%)' }}
                >
                     <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-500 whitespace-nowrap shadow-xl">
                         White Solid Formed
                     </div>
                </div>

            </div>
        </div>

        {/* Labels / Indicators */}
        <div className="mt-8 flex justify-between items-start text-white">
            <div className="w-1/2 pr-2">
                <div className="text-xs font-black text-blue-300 uppercase tracking-wider mb-1">Ammonia Gas (NH<sub>3</sub>)</div>
                <p className="text-[10px] text-slate-400 font-medium leading-snug">
                    Particles are lighter (M<sub>r</sub> = 17). They diffuse faster and travel further.
                </p>
            </div>
            
            <div className="w-1/2 pl-2 text-right">
                <div className="text-xs font-black text-green-400 uppercase tracking-wider mb-1">Hydrogen Chloride Gas (HCl)</div>
                <p className="text-[10px] text-slate-400 font-medium leading-snug">
                    Particles are heavier (M<sub>r</sub> = 36.5). They diffuse slower and travel less distance.
                </p>
            </div>
        </div>

        {/* Equation Centered Below - Removed Absolute Positioning */}
        <div className="mt-8 flex justify-center w-full">
             <div className={`transition-all duration-700 ${isFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 text-center">Chemical Reaction</p>
                 <div className="bg-slate-900/50 border border-slate-700 px-6 py-3 rounded-xl shadow-sm backdrop-blur-sm">
                     <span className="font-serif font-bold text-white text-sm md:text-base tracking-wide whitespace-nowrap">
                         <span>NH<sub>3</sub>(g) + HCl(g) → NH<sub>4</sub>Cl(s)</span>
                     </span>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default DiffusionSim;
