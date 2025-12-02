import React, { useState, useEffect } from 'react';
import { Snowflake, Droplets, Wind, Flame, RefreshCw } from 'lucide-react';

type StateOfMatter = 'SOLID' | 'LIQUID' | 'GAS';

const ParticleStateSim: React.FC = () => {
  const [state, setState] = useState<StateOfMatter>('SOLID');
  const [particles, setParticles] = useState<any[]>([]);

  // Regenerate particle positions when state changes
  useEffect(() => {
    const newParticles = [];
    const count = state === 'SOLID' ? 25 : state === 'LIQUID' ? 40 : 12;

    for (let i = 0; i < count; i++) {
      const randomX = Math.random() * 90; // 0-90% width
      const randomY_Liquid = Math.random() * 35; // 0-35% height (from bottom)
      const randomY_Gas = Math.random() * 90; // 0-90% height
      
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 3;

      newParticles.push({
        id: i,
        x: randomX,
        yLiquid: randomY_Liquid,
        yGas: randomY_Gas,
        delay,
        duration
      });
    }
    setParticles(newParticles);
  }, [state]);

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border-4 border-slate-800 my-8 select-none relative group">
      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes vibrate {
          0% { transform: translate(0, 0); }
          25% { transform: translate(1px, 1px); }
          50% { transform: translate(-1px, -1px); }
          75% { transform: translate(-1px, 1px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes liquidDrift {
          0% { transform: translate(0, 0); }
          33% { transform: translate(15px, 5px); }
          66% { transform: translate(-10px, 10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes gasFly {
          0% { transform: translate(0, 0); opacity: 0.8; }
          50% { transform: translate(60px, -60px); opacity: 1; }
          100% { transform: translate(0, 0); opacity: 0.8; }
        }
        .animate-particle-solid { animation: vibrate 0.2s infinite linear; }
        .animate-particle-liquid { animation: liquidDrift 4s infinite ease-in-out alternate; }
        .animate-particle-gas { animation: gasFly 5s infinite linear; }
      `}</style>

      {/* Header / Controls */}
      <div className="bg-slate-800 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 z-10 relative border-b border-slate-700">
        <h3 className="text-white font-black uppercase tracking-widest flex items-center gap-2 text-sm">
          <span className={`w-3 h-3 rounded-full animate-pulse ${state === 'SOLID' ? 'bg-cyan-400' : state === 'LIQUID' ? 'bg-blue-400' : 'bg-purple-400'}`}></span>
          Particle Model
        </h3>
        
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setState('SOLID')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2 transition-all ${state === 'SOLID' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Snowflake className="w-3 h-3" /> Solid
          </button>
          <button
            onClick={() => setState('LIQUID')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2 transition-all ${state === 'LIQUID' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Droplets className="w-3 h-3" /> Liquid
          </button>
          <button
            onClick={() => setState('GAS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2 transition-all ${state === 'GAS' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            <Wind className="w-3 h-3" /> Gas
          </button>
        </div>
      </div>

      {/* Simulation Viewport */}
      <div className="relative h-80 bg-slate-900 w-full overflow-hidden">
        
        {/* Background Heat Visual */}
        <div className={`absolute bottom-0 left-0 w-full transition-all duration-1000 ${state === 'SOLID' ? 'h-0 opacity-0' : state === 'LIQUID' ? 'h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent opacity-50' : 'h-full bg-gradient-to-t from-red-900/10 to-transparent opacity-50'}`}></div>

        {/* Container */}
        <div className="absolute inset-0 p-6">
            
            {/* SOLID: Grid Layout */}
            {state === 'SOLID' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-5 gap-1 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm shadow-2xl">
                    {particles.map((p) => (
                        <div 
                            key={p.id} 
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-inner border border-cyan-300/50 animate-particle-solid"
                            style={{ animationDelay: `${p.delay * 0.1}s` }}
                        ></div>
                    ))}
                </div>
            )}

            {/* LIQUID: Absolute Layout (Bottom Clustered) */}
            {state === 'LIQUID' && particles.map((p) => (
                <div 
                    key={p.id}
                    className="absolute w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-lg border border-blue-300/50 animate-particle-liquid"
                    style={{
                        left: `${p.x}%`,
                        bottom: `${p.yLiquid}%`, // KEY FIX: Position from bottom
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`
                    }}
                ></div>
            ))}

            {/* GAS: Absolute Layout (Full Screen) */}
            {state === 'GAS' && particles.map((p) => (
                <div 
                    key={p.id}
                    className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-600 shadow-lg border border-purple-300/50 animate-particle-gas opacity-90"
                    style={{
                        left: `${p.x}%`,
                        bottom: `${p.yGas}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration * 0.8}s`
                    }}
                ></div>
            ))}

        </div>

        {/* Info Overlay */}
        <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-md text-white text-xs p-3 rounded-xl border border-slate-700 shadow-lg max-w-[220px] pointer-events-none">
            <p className="font-bold text-cyan-300 mb-1 uppercase tracking-wider text-[10px]">
                {state === 'SOLID' && 'State: Solid'}
                {state === 'LIQUID' && 'State: Liquid'}
                {state === 'GAS' && 'State: Gas'}
            </p>
            <p className="opacity-80 leading-snug">
                {state === 'SOLID' && 'Particles held tightly in fixed lattice. Only vibration allowed.'}
                {state === 'LIQUID' && 'Particles touching but disordered. They slide past each other.'}
                {state === 'GAS' && 'Particles far apart, moving randomly at high speeds.'}
            </p>
        </div>

        {/* Heat Meter */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 h-48 w-4 bg-slate-800 rounded-full overflow-hidden border border-slate-600 shadow-inner">
            <div 
                className={`absolute bottom-0 w-full transition-all duration-700 ${state === 'SOLID' ? 'h-[20%] bg-cyan-500' : state === 'LIQUID' ? 'h-[50%] bg-blue-500' : 'h-[90%] bg-gradient-to-t from-orange-500 to-red-500'}`}
            ></div>
        </div>
        <div className="absolute right-9 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-500 rotate-[-90deg] origin-right whitespace-nowrap">
            INTERNAL ENERGY
        </div>

      </div>
      
      {/* Interaction Hint */}
      <div className="bg-slate-950 p-2 text-center border-t border-slate-800">
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-wider flex items-center justify-center gap-2">
             <Flame className={`w-3 h-3 ${state !== 'SOLID' ? 'text-orange-500' : 'text-slate-700'}`} />
             System Heat: {state === 'SOLID' ? 'Low' : state === 'LIQUID' ? 'Medium' : 'High'}
          </p>
      </div>
    </div>
  );
};

export default ParticleStateSim;