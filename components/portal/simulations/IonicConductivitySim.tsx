
import React, { useState, useEffect, useRef } from 'react';
import { Zap, Lightbulb, RotateCcw } from 'lucide-react';

type StateMode = 'SOLID' | 'MOLTEN' | 'SOLUTION';

const IonicConductivitySim: React.FC = () => {
  const [mode, setMode] = useState<StateMode>('SOLID');
  const [ions, setIons] = useState<{id: number, x: number, y: number, type: 'POS' | 'NEG', vx: number, vy: number}[]>([]);
  
  const reqRef = useRef<number>();

  // Initialize Particles
  useEffect(() => {
    const newIons = [];
    const count = 40; // Total ions
    
    if (mode === 'SOLID') {
      // Grid Arrangement (Solid Lattice)
      // Centered in the bottom half of the beaker
      const startX = 35; 
      const startY = 65;
      const cols = 8;
      
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        newIons.push({
          id: i,
          x: startX + col * 4.5,
          y: startY + row * 5,
          type: (col + row) % 2 === 0 ? 'POS' : 'NEG',
          vx: 0, vy: 0
        });
      }
    } else {
      // Random Arrangement (Liquid/Solution)
      for (let i = 0; i < count; i++) {
        newIons.push({
          id: i,
          x: 25 + Math.random() * 50,
          y: 55 + Math.random() * 35,
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
          x += (Math.random() - 0.5) * 0.1;
          y += (Math.random() - 0.5) * 0.1;
          
          // Slight return force to keep lattice shape roughly
          // (Simplified for visual effect)
        } else {
          // Free movement (Brownianish)
          vx = (Math.random() - 0.5) * 0.2;
          vy = (Math.random() - 0.5) * 0.2;

          // Electric Field Drift
          // Cathode (Left, -) attracts POS
          // Anode (Right, +) attracts NEG
          if (type === 'POS') vx -= 0.15; // Drift Left to Cathode
          if (type === 'NEG') vx += 0.15; // Drift Right to Anode

          x += vx;
          y += vy;

          // Boundaries (Beaker Walls)
          if (x < 22) x = 78; // Wrap effect for flow continuity visual
          if (x > 78) x = 22;
          if (y < 50) y = 50; // Surface
          if (y > 92) y = 92; // Bottom
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
    <div className="my-10 bg-white rounded-3xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none ring-4 ring-indigo-50">
      
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-500" />
          Electrolysis Simulator
        </h3>
        
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            {['SOLID', 'MOLTEN', 'SOLUTION'].map((m) => (
                <button
                    key={m}
                    onClick={() => setMode(m as StateMode)}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === m ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                >
                    {m}
                </button>
            ))}
        </div>
      </div>

      <div className="p-8 bg-slate-100 flex flex-col items-center min-h-[500px] justify-center relative overflow-hidden">
          
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          {/* Main Apparatus */}
          <div className="relative w-full max-w-lg h-[400px]">
              
              {/* --- CIRCUITRY (Top) --- */}
              <div className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none">
                  {/* Wires */}
                  <svg className="w-full h-full" viewBox="0 0 400 150">
                      {/* Left Wire (Negative) - Black */}
                      <path d="M 120 120 L 120 40 L 180 40" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                      {/* Right Wire (Positive) - Red */}
                      <path d="M 280 120 L 280 40 L 220 40" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                      
                      {/* Battery Symbol */}
                      <g transform="translate(190, 25)">
                          {/* Left (Negative) Plate */}
                          <rect x="0" y="5" width="4" height="20" fill="#1e293b" rx="1" />
                          {/* Right (Positive) Plate */}
                          <rect x="15" y="0" width="4" height="30" fill="#ef4444" rx="1" />
                          {/* Connector */}
                          <line x1="4" y1="15" x2="15" y2="15" stroke="#94a3b8" strokeWidth="2" />
                      </g>
                  </svg>

                  {/* Bulb */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className={`relative transition-all duration-300 ${isConducting ? 'drop-shadow-[0_0_35px_rgba(250,204,21,0.9)]' : 'opacity-40 grayscale'}`}>
                          <Lightbulb className={`w-16 h-16 ${isConducting ? 'text-yellow-400 fill-yellow-400 animate-pulse' : 'text-slate-400 fill-slate-200'}`} />
                          {/* Glow effect center */}
                          {isConducting && <div className="absolute inset-2 bg-yellow-100 rounded-full blur-md opacity-50 animate-pulse"></div>}
                      </div>
                      <div className="bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded mt-1 shadow-sm uppercase tracking-widest">
                          {isConducting ? 'ON' : 'OFF'}
                      </div>
                  </div>
              </div>

              {/* --- BEAKER & ELECTRODES (Bottom) --- */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-64">
                  
                  {/* Electrodes */}
                  {/* Cathode (Left) */}
                  <div className="absolute top-[-40px] left-[25%] w-4 h-48 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-700 rounded-b-lg shadow-xl z-20 border border-slate-800">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-50">
                          CATHODE (-)
                      </div>
                  </div>
                  
                  {/* Anode (Right) */}
                  <div className="absolute top-[-40px] right-[25%] w-4 h-48 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-700 rounded-b-lg shadow-xl z-20 border border-slate-800">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-50">
                          ANODE (+)
                      </div>
                  </div>

                  {/* Beaker Glass */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-blue-50/10 rounded-b-[3rem] border-x-4 border-b-4 border-white/60 shadow-2xl backdrop-blur-[2px] overflow-hidden z-10">
                      
                      {/* Liquid Layer */}
                      <div className={`absolute bottom-0 w-full transition-all duration-700 ease-in-out z-0
                          ${mode === 'SOLID' ? 'h-2/5 top-auto' : 'h-3/4'}
                          ${mode === 'MOLTEN' ? 'bg-orange-500/20' : mode === 'SOLUTION' ? 'bg-blue-400/20' : 'bg-transparent'}
                      `}>
                          {/* Liquid Surface Line */}
                          {mode !== 'SOLID' && <div className="absolute top-0 w-full h-1 bg-white/40"></div>}
                      </div>

                      {/* Solid Block Outline (Only for Solid mode) */}
                      {mode === 'SOLID' && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-32 border-2 border-slate-400/30 bg-slate-200/20 rounded-sm"></div>
                      )}

                      {/* IONS (Rendered on top of liquid/solid background) */}
                      {ions.map(ion => (
                          <div 
                            key={ion.id}
                            className={`absolute w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm transition-transform z-10
                                ${ion.type === 'POS' ? 'bg-blue-600 border border-blue-400' : 'bg-green-600 border border-green-400'}
                            `}
                            style={{
                                left: `${ion.x}%`,
                                top: `${ion.y}%`
                            }}
                          >
                              {ion.type === 'POS' ? '+' : '-'}
                          </div>
                      ))}

                  </div>
                  
                  {/* Beaker Rim Reflection */}
                  <div className="absolute -top-2 left-0 w-full h-4 bg-white/20 rounded-[100%] blur-[1px]"></div>
              </div>

          </div>

          {/* Legend / Status */}
          <div className="mt-8 flex gap-4 w-full max-w-2xl justify-center">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-xs font-bold text-slate-600">Cation (+)</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                  <span className="text-xs font-bold text-slate-600">Anion (-)</span>
              </div>
              <div className={`px-4 py-2 rounded-xl border font-bold text-xs flex items-center gap-2 ${isConducting ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                  {isConducting ? <Zap className="w-3 h-3 fill-current" /> : <RotateCcw className="w-3 h-3" />}
                  {isConducting ? 'Ions Mobile = Current Flows' : 'Ions Fixed = No Current'}
              </div>
          </div>

      </div>
    </div>
  );
};

export default IonicConductivitySim;
