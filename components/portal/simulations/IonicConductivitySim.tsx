
import React, { useState, useEffect, useRef } from 'react';
import { Zap, Lightbulb, Beaker, Battery } from 'lucide-react';

type StateMode = 'SOLID' | 'MOLTEN' | 'SOLUTION';

const IonicConductivitySim: React.FC = () => {
  const [mode, setMode] = useState<StateMode>('SOLID');
  const [ions, setIons] = useState<{id: number, x: number, y: number, type: 'POS' | 'NEG', vx: number, vy: number}[]>([]);
  
  const reqRef = useRef<number>();

  // Initialize Particles
  useEffect(() => {
    const newIons = [];
    const count = 30; // Total ions
    
    if (mode === 'SOLID') {
      // Grid Arrangement
      for (let i = 0; i < count; i++) {
        const col = i % 6;
        const row = Math.floor(i / 6);
        newIons.push({
          id: i,
          x: 35 + col * 6, // Centered tightly
          y: 60 + row * 6, // Bottom of beaker
          type: (col + row) % 2 === 0 ? 'POS' : 'NEG',
          vx: 0, vy: 0
        });
      }
    } else {
      // Random Arrangement
      for (let i = 0; i < count; i++) {
        newIons.push({
          id: i,
          x: 30 + Math.random() * 40,
          y: 50 + Math.random() * 30,
          type: i % 2 === 0 ? 'POS' : 'NEG',
          vx: 0, vy: 0
        });
      }
    }
    setIons(newIons as any);
  }, [mode]);

  // Animation Loop
  useEffect(() => {
    const animate = () => {
      setIons(prev => prev.map(ion => {
        let { x, y, vx, vy, type } = ion;

        if (mode === 'SOLID') {
          // Vibrate in place
          x += (Math.random() - 0.5) * 0.2;
          y += (Math.random() - 0.5) * 0.2;
          
          // Keep strictly bounded to grid origin roughly
          // (Simplified vibration logic)
        } else {
          // Free movement
          vx = (Math.random() - 0.5) * 0.5;
          vy = (Math.random() - 0.5) * 0.5;

          // Electric Field Drift
          // Cathode (Left, -) attracts POS
          // Anode (Right, +) attracts NEG
          if (type === 'POS') vx -= 0.3; // Drift Left
          if (type === 'NEG') vx += 0.3; // Drift Right

          x += vx;
          y += vy;

          // Boundaries
          if (x < 25) x = 75; // Wrap for continuous flow effect
          if (x > 75) x = 25;
          if (y < 45) y = 45;
          if (y > 85) y = 85;
        }

        return { ...ion, x, y };
      }));
      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);
    return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [mode]);

  const isConducting = mode !== 'SOLID';

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden select-none">
      
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Conductivity Tester
        </h3>
        
        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
            {['SOLID', 'MOLTEN', 'SOLUTION'].map((m) => (
                <button
                    key={m}
                    onClick={() => setMode(m as StateMode)}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${mode === m ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    {m}
                </button>
            ))}
        </div>
      </div>

      <div className="p-8 bg-slate-100 flex flex-col items-center">
          
          {/* Circuit Visual */}
          <div className="relative w-full max-w-md h-80 bg-white rounded-2xl border-4 border-slate-200 shadow-inner overflow-hidden">
              
              {/* Background Liquid Color */}
              <div className={`absolute bottom-0 left-[20%] right-[20%] h-[50%] transition-colors duration-500 ${mode === 'SOLID' ? 'opacity-0' : mode === 'MOLTEN' ? 'bg-orange-100' : 'bg-blue-50'}`}></div>

              {/* Electrodes */}
              <div className="absolute top-[20%] left-[30%] w-4 h-[60%] bg-slate-600 rounded-b-lg border-2 border-slate-700"></div> {/* Cathode */}
              <div className="absolute top-[20%] right-[30%] w-4 h-[60%] bg-slate-600 rounded-b-lg border-2 border-slate-700"></div> {/* Anode */}
              
              {/* Wires */}
              <svg className="absolute inset-0 pointer-events-none">
                  <path d="M 140 80 L 140 40 L 220 40" fill="none" stroke="#475569" strokeWidth="4" />
                  <path d="M 308 80 L 308 40 L 220 40" fill="none" stroke="#475569" strokeWidth="4" />
                  
                  {/* Battery */}
                  <rect x="200" y="30" width="40" height="20" fill="#334155" rx="4" />
              </svg>

              {/* Bulb */}
              <div className={`absolute top-4 left-1/2 -translate-x-1/2 transition-all duration-300 ${isConducting ? 'drop-shadow-[0_0_30px_rgba(250,204,21,0.8)]' : 'opacity-50'}`}>
                  <Lightbulb className={`w-12 h-12 ${isConducting ? 'text-yellow-400 fill-yellow-400' : 'text-slate-400 fill-slate-200'}`} />
              </div>

              {/* Particles */}
              {ions.map(ion => (
                  <div 
                    key={ion.id}
                    className={`absolute w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm transition-transform
                        ${ion.type === 'POS' ? 'bg-blue-500' : 'bg-green-500'}
                    `}
                    style={{
                        left: `${ion.x}%`,
                        top: `${ion.y}%`
                    }}
                  >
                      {ion.type === 'POS' ? '+' : '-'}
                  </div>
              ))}

              {/* Solid Container Outline */}
              {mode === 'SOLID' && (
                  <div className="absolute left-[33%] top-[60%] w-[34%] h-[30%] border-2 border-slate-300 bg-white/20 pointer-events-none"></div>
              )}

              {/* Labels */}
              <div className="absolute bottom-2 left-2 text-[10px] font-bold text-slate-400">
                  {mode === 'SOLID' && "Ions fixed in lattice"}
                  {mode === 'MOLTEN' && "Ions mobile (Heat)"}
                  {mode === 'SOLUTION' && "Ions mobile (Water)"}
              </div>
          </div>

          <div className={`mt-6 px-6 py-3 rounded-xl border-l-4 text-sm font-medium transition-all ${isConducting ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-slate-200 border-slate-400 text-slate-600'}`}>
              Status: <strong>{isConducting ? 'CONDUCTING' : 'INSULATOR'}</strong> — {isConducting ? 'Ions are free to move to electrodes.' : 'Ions are locked in place.'}
          </div>

      </div>
    </div>
  );
};

export default IonicConductivitySim;
