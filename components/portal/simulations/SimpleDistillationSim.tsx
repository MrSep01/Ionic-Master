
import React, { useState, useEffect, useRef } from 'react';
import { Flame, Droplets, RotateCcw, Pause, Thermometer } from 'lucide-react';

const SimpleDistillationSim: React.FC = () => {
  const [isHeating, setIsHeating] = useState(false);
  const [temp, setTemp] = useState(20);
  const [flaskVolume, setFlaskVolume] = useState(100); // %
  const [beakerVolume, setBeakerVolume] = useState(0); // %
  
  const reqRef = useRef<number | null>(null);

  const reset = () => {
    setIsHeating(false);
    setTemp(20);
    setFlaskVolume(100);
    setBeakerVolume(0);
  };

  useEffect(() => {
    let interval: any;
    if (isHeating) {
      interval = setInterval(() => {
        setTemp(prev => {
            if (prev < 100) return prev + 0.5;
            return 100;
        });
        
        if (temp >= 100 && flaskVolume > 5) {
            setFlaskVolume(v => Math.max(5, v - 0.15));
            setBeakerVolume(v => Math.min(95, v + 0.15));
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isHeating, temp, flaskVolume]);

  const [bubbles, setBubbles] = useState<{id: number, x: number, y: number, r: number, speed: number}[]>([]);
  const [condenserDrops, setCondenserDrops] = useState<{id: number, p: number}[]>([]);
  const [fallingDrops, setFallingDrops] = useState<{id: number, y: number}[]>([]);

  const animateVisuals = () => {
      // 1. Bubbles in Flask
      if (temp >= 90 && flaskVolume > 10) {
          if (Math.random() > 0.8) {
              setBubbles(prev => [...prev, {
                  id: Math.random(),
                  x: 30 + Math.random() * 40,
                  y: 90,
                  r: 1 + Math.random() * 2,
                  speed: 0.5 + Math.random()
              }]);
          }
      }
      setBubbles(prev => prev.map(b => ({ ...b, y: b.y - b.speed })).filter(b => b.y > 40)); 

      // 2. Drops in Condenser
      if (temp >= 100 && flaskVolume > 5) {
          if (Math.random() > 0.85) {
              setCondenserDrops(prev => [...prev, { id: Math.random(), p: 0 }]);
          }
      }
      setCondenserDrops(prev => prev.map(d => ({ ...d, p: d.p + 0.015 })).filter(d => d.p < 1));

      // 3. Falling Drops
      if (temp >= 100 && Math.random() > 0.85) {
           setFallingDrops(prev => [...prev, { id: Math.random(), y: 0 }]);
      }
      setFallingDrops(prev => prev.map(d => ({ ...d, y: d.y + 2.5 })).filter(d => d.y < 80));

      if (isHeating) reqRef.current = requestAnimationFrame(animateVisuals);
  };

  useEffect(() => {
      if (isHeating) reqRef.current = requestAnimationFrame(animateVisuals);
      return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [isHeating, temp, flaskVolume]);

  // -- Dynamic Label Component --
  const Label = ({ x, y, text, align = 'start' }: { x: number, y: number, text: string, align?: 'start' | 'end' | 'middle' }) => {
      // Improved width calculation to prevent cutoff
      const width = Math.max(70, text.length * 7 + 20);
      const boxX = align === 'end' ? x - width : align === 'middle' ? x - width / 2 : x;
      
      return (
          <g className="pointer-events-none drop-shadow-sm">
              <rect x={boxX} y={y - 10} width={width} height="18" rx="4" fill="white" opacity="0.95" stroke="#cbd5e1" strokeWidth="1" />
              <text x={boxX + width/2} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-bold fill-slate-700 uppercase tracking-wide" dy="1">{text}</text>
          </g>
      );
  };

  const PointerLine = ({ x1, y1, x2, y2 }: { x1: number, y1: number, x2: number, y2: number }) => (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
  );

  return (
    <div className="bg-white rounded-3xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none flex flex-col lg:flex-row ring-4 ring-indigo-50">
      
      {/* Simulation Stage */}
      <div className="flex-1 bg-slate-50 relative min-h-[500px] border-b lg:border-b-0 lg:border-r border-slate-200">
         
         <div className="absolute top-6 left-6 z-10 space-y-2">
             <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                 <Thermometer className={`w-5 h-5 ${temp >= 100 ? 'text-rose-500' : 'text-slate-400'}`} />
                 <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thermometer</p>
                     <p className={`text-lg font-black ${temp >= 100 ? 'text-rose-600' : 'text-slate-700'}`}>{Math.round(temp)}°C</p>
                 </div>
             </div>
         </div>

         <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
             <defs>
                 <linearGradient id="glass3D" x1="0" x2="1" y1="0" y2="0">
                     <stop offset="0%" stopColor="#fff" stopOpacity="0.6"/>
                     <stop offset="100%" stopColor="#fff" stopOpacity="0.6"/>
                 </linearGradient>
                 <linearGradient id="inkLiquid" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9"/>
                     <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.95"/>
                 </linearGradient>
                 <linearGradient id="waterLiquid" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.6"/>
                     <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.8"/>
                 </linearGradient>
                 <radialGradient id="flameGrad" cx="0.5" cy="0.8" r="0.5">
                     <stop offset="0%" stopColor="#fef08a" />
                     <stop offset="100%" stopColor="transparent" />
                 </radialGradient>
                 <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" fill="#3b82f6">
                     <path d="M0,0 L0,6 L6,3 z" />
                 </marker>
             </defs>

             {/* --- LAB STAND & CLAMPS --- */}
             <g stroke="#64748b" strokeWidth="4" strokeLinecap="round">
                 <line x1="80" y1="380" x2="80" y2="50" />
                 <line x1="60" y1="380" x2="100" y2="380" />
                 <line x1="80" y1="150" x2="130" y2="150" strokeWidth="3" />
             </g>

             {/* --- TRIPOD & GAUZE --- */}
             <g transform="translate(100, 300)">
                 <rect x="0" y="0" width="60" height="4" fill="#94a3b8" />
                 <line x1="5" y1="4" x2="-5" y2="80" stroke="#94a3b8" strokeWidth="3" />
                 <line x1="55" y1="4" x2="65" y2="80" stroke="#94a3b8" strokeWidth="3" />
                 <rect x="15" y="40" width="30" height="40" fill="#475569" />
                 {isHeating && (
                     <path d="M 30 40 Q 20 10 30 0 Q 40 10 30 40" fill="url(#flameGrad)" className="animate-pulse" />
                 )}
             </g>

             {/* --- ROUND BOTTOM FLASK --- */}
             <g transform="translate(130, 240)">
                 <defs>
                     <clipPath id="flaskClip">
                         <circle cx="0" cy="0" r="40" />
                     </clipPath>
                 </defs>
                 <g clipPath="url(#flaskClip)">
                     <rect x="-40" y={40 - (flaskVolume/100)*80} width="80" height="80" fill="url(#inkLiquid)" style={{ transition: 'y 0.2s' }} />
                     {bubbles.map(b => (
                         <circle key={b.id} cx={b.x - 50} cy={b.y - 50} r={b.r} fill="white" opacity="0.6" />
                     ))}
                 </g>
                 <path d="M -15 -100 L -15 -35 A 40 40 0 1 0 15 -35 L 15 -100" fill="url(#glass3D)" stroke="#94a3b8" strokeWidth="2" />
                 <ellipse cx="0" cy="-100" rx="15" ry="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
             </g>

             {/* --- STILL HEAD & THERMOMETER --- */}
             <g transform="translate(130, 140)">
                 <path d="M -12 0 L -12 40 L 12 40 L 12 25 L 40 40 L 45 30 L 12 15 L 12 0 Z" fill="url(#glass3D)" stroke="#94a3b8" strokeWidth="2" />
                 <rect x="-11" y="-5" width="22" height="10" fill="#334155" />
                 <rect x="-3" y="-40" width="6" height="100" fill="#f1f5f9" stroke="#cbd5e1" />
                 <circle cx="0" cy="55" r="4" fill="#ef4444" />
                 <rect x="-1" y={-30 + (100 - temp)} width="2" height={85 - (100 - temp)} fill="#ef4444" />
             </g>

             {/* --- LIEBIG CONDENSER --- */}
             <g transform="translate(170, 170) rotate(15)">
                 <rect x="0" y="-6" width="220" height="12" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.5" />
                 {condenserDrops.map(d => (
                     <circle key={d.id} cx={10 + d.p * 200} cy="4" r="3" fill="#3b82f6" opacity="0.8" />
                 ))}
                 <rect x="20" y="-18" width="180" height="36" rx="4" fill="#bae6fd" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
                 <path d="M 30 18 L 30 40" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />
                 <path d="M 190 -18 L 190 -40" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />
             </g>

             {/* --- RECEIVER ADAPTER & BEAKER --- */}
             <g transform="translate(390, 245)">
                 <path d="M -5 -20 Q 0 0 0 20 L 0 30" fill="none" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
                 <path d="M -5 -20 Q 0 0 0 20 L 0 30" fill="none" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
                 {fallingDrops.map(d => (
                     <circle key={d.id} cx="0" cy={30 + d.y} r="3" fill="#bae6fd" />
                 ))}
                 <g transform="translate(0, 80)">
                     <path d="M -25 -40 L -20 40 L 20 40 L 25 -40" fill="url(#glass3D)" stroke="#94a3b8" strokeWidth="2" />
                     <rect x="-19" y={40 - (beakerVolume/100)*60} width="38" height={(beakerVolume/100)*60} fill="url(#waterLiquid)" />
                 </g>
             </g>

             {/* --- LABELS --- */}
             <Label x={100} y={100} text="Thermometer" align="end" />
             <PointerLine x1={100} y1={100} x2={130} y2={120} />

             <Label x={240} y={150} text="Liebig Condenser" align="start" />
             <PointerLine x1={240} y1={150} x2={220} y2={170} />

             <Label x={240} y={230} text="Cooling Water In" align="start" />
             <PointerLine x1={240} y1={230} x2={210} y2={210} />

             <Label x={330} y={140} text="Cooling Water Out" align="end" />
             <PointerLine x1={330} y1={140} x2={350} y2={160} />

             <Label x={450} y={350} text="Distillate (Pure Water)" align="end" />
             <PointerLine x1={450} y1={350} x2={400} y2={340} />

             <Label x={50} y={250} text="Round Bottom Flask" align="start" />
             <PointerLine x1={50} y1={250} x2={110} y2={250} />

             <Label x={50} y={280} text="Mixture (Salt + Water)" align="start" />
             <PointerLine x1={50} y1={280} x2={120} y2={260} />

         </svg>
      </div>

      {/* Control Panel */}
      <div className="w-full lg:w-80 bg-white p-6 lg:p-8 flex flex-col gap-6 border-l border-slate-100">
          <div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-indigo-600" />
                  Controls
              </h3>
              <p className="text-xs text-slate-500 font-medium">Heat the mixture to separate pure water.</p>
          </div>

          <div className="space-y-6">
              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                      <span>Mixture Vol</span>
                      <span>{Math.round(flaskVolume)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${flaskVolume}%` }}></div>
                  </div>
              </div>

              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                      <span>Distillate Vol</span>
                      <span>{Math.round(beakerVolume)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-sky-300 transition-all duration-300" style={{ width: `${beakerVolume}%` }}></div>
                  </div>
              </div>
          </div>

          <div className="mt-auto grid grid-cols-3 gap-3">
              <button 
                onClick={() => setIsHeating(!isHeating)}
                className={`col-span-2 py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95 ${isHeating ? 'bg-rose-50 text-rose-600 border-2 border-rose-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
              >
                  {isHeating ? <><Pause className="w-4 h-4" /> STOP HEAT</> : <><Flame className="w-4 h-4" /> START HEAT</>}
              </button>
              <button 
                onClick={reset}
                className="py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl transition-colors flex items-center justify-center"
              >
                  <RotateCcw className="w-5 h-5" />
              </button>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-[10px] text-amber-800 leading-relaxed font-medium">
              <strong>Tip:</strong> Watch the thermometer. The temperature stays constant at 100°C while water is boiling off.
          </div>
      </div>
    </div>
  );
};

export default SimpleDistillationSim;
