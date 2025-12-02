
import React, { useState, useEffect } from 'react';
import { RotateCcw, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

type Scenario = 'NaCl' | 'MgO' | 'LiF';

const IonFormationSim: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('NaCl');
  const [stage, setStage] = useState<'ATOMS' | 'TRANSFER' | 'IONS'>('ATOMS');
  const [animFrame, setAnimFrame] = useState(0);

  // Animation Loop for Transfer
  useEffect(() => {
    let interval: any;
    if (stage === 'TRANSFER') {
      interval = setInterval(() => {
        setAnimFrame((prev) => {
          if (prev >= 100) {
            setStage('IONS');
            return 0;
          }
          return prev + 2;
        });
      }, 16);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const reset = (newScenario?: Scenario) => {
    if (newScenario) setScenario(newScenario);
    setStage('ATOMS');
    setAnimFrame(0);
  };

  // --- DATA ---
  const getData = (scen: Scenario) => {
    if (scen === 'NaCl') return {
      metal: { sym: 'Na', name: 'Sodium', protons: 11, config: [2, 8, 1], color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300' },
      nonMetal: { sym: 'Cl', name: 'Chlorine', protons: 17, config: [2, 8, 7], color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300' },
      electronsToTransfer: 1,
      product: 'Sodium Chloride (NaCl)'
    };
    if (scen === 'MgO') return {
      metal: { sym: 'Mg', name: 'Magnesium', protons: 12, config: [2, 8, 2], color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-300' },
      nonMetal: { sym: 'O', name: 'Oxygen', protons: 8, config: [2, 6], color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-300' },
      electronsToTransfer: 2,
      product: 'Magnesium Oxide (MgO)'
    };
    return { // LiF
      metal: { sym: 'Li', name: 'Lithium', protons: 3, config: [2, 1], color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300' },
      nonMetal: { sym: 'F', name: 'Fluorine', protons: 9, config: [2, 7], color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-300' },
      electronsToTransfer: 1,
      product: 'Lithium Fluoride (LiF)'
    };
  };

  const data = getData(scenario);

  // --- RENDERERS ---
  const renderShells = (cx: number, cy: number, config: number[], isIon: boolean, type: 'METAL' | 'NONMETAL') => {
    // Determine current electron count based on stage
    // For metal: loses electrons. For non-metal: gains.
    let displayConfig = [...config];
    
    // During TRANSFER, we draw static inner shells, and animate the outer electrons
    const outerShellIndex = config.length - 1;
    
    return (
      <g>
        {/* Nucleus */}
        <circle cx={cx} cy={cy} r={15} fill={type === 'METAL' ? '#e0e7ff' : '#dcfce7'} stroke={type === 'METAL' ? '#6366f1' : '#22c55e'} strokeWidth="2" />
        <text x={cx} y={cy} dy="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 pointer-events-none">
          {type === 'METAL' ? data.metal.sym : data.nonMetal.sym}
        </text>

        {/* Shells */}
        {config.map((count, shellIdx) => {
          const r = 25 + (shellIdx * 15);
          // Don't draw empty outer shell for metal ion
          if (isIon && type === 'METAL' && shellIdx === outerShellIndex) return null;

          return (
            <g key={shellIdx}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#cbd5e1" strokeWidth="1" />
              {/* Electrons */}
              {Array.from({ length: count }).map((_, eIdx) => {
                // Calculate position on circle
                const angle = (eIdx / count) * 2 * Math.PI - (Math.PI / 2);
                const ex = cx + r * Math.cos(angle);
                const ey = cy + r * Math.sin(angle);

                // Handle Transfer Animation
                if (stage === 'TRANSFER' && shellIdx === outerShellIndex && type === 'METAL') {
                   // These are the electrons moving away
                   // Target is the outer shell of the Non-Metal
                   // Non-Metal position (cx is approx 350 for non-metal, 150 for metal)
                   
                   // Determine target slot on non-metal outer shell
                   // Non-metal config is e.g. [2, 8, 7]. Target is index 2.
                   const targetShellIdx = data.nonMetal.config.length - 1;
                   const targetR = 25 + (targetShellIdx * 15);
                   
                   // We need to map the eIdx of metal electron to an empty slot on non-metal
                   // Non-metal has `data.nonMetal.config[targetShellIdx]` electrons already.
                   // Slot index = existing + eIdx
                   const existing = data.nonMetal.config[targetShellIdx];
                   const totalSlots = existing + data.electronsToTransfer; // Should fill the shell (usually 8)
                   const slotIdx = existing + eIdx;
                   const targetAngle = (slotIdx / totalSlots) * 2 * Math.PI - (Math.PI / 2); // Simplified distribution
                   
                   const targetX = 350 + targetR * Math.cos(targetAngle); // 350 is NonMetal CX
                   const targetY = 150 + targetR * Math.sin(targetAngle); // 150 is CY

                   const currX = ex + (targetX - ex) * (animFrame / 100);
                   const currY = ey + (targetY - ey) * (animFrame / 100);

                   return <circle key={eIdx} cx={currX} cy={currY} r={4} fill="#ef4444" />;
                }

                if (stage === 'IONS' && type === 'NONMETAL' && shellIdx === config.length - 1) {
                    // Draw the gained electrons in Red
                    // The original electrons are count - transferred
                    // The new electrons are the last 'transferred' ones
                    const originalCount = data.nonMetal.config[shellIdx]; // e.g. 7
                    const finalCount = originalCount + data.electronsToTransfer; // e.g. 8
                    
                    // We need to render the full 8, but color the last ones red
                    // This loop renders 'count' which is the ORIGINAL config for non-metal passed into func
                    // Wait, we need to handle the 'Ion' state config logic outside or override here
                }

                return <circle key={eIdx} cx={ex} cy={ey} r={3} fill="#3b82f6" />;
              })}
            </g>
          );
        })}
        
        {/* Draw Gained Electrons on Non-Metal manually if needed for IONS state */}
        {stage === 'IONS' && type === 'NONMETAL' && (
             <g>
                 {Array.from({ length: data.electronsToTransfer }).map((_, i) => {
                     const shellIdx = data.nonMetal.config.length - 1;
                     const r = 25 + (shellIdx * 15);
                     // Position them in the "gap" visually? 
                     // Simplified: Just draw them at specific angles for standard octets
                     const angle = ((data.nonMetal.config[shellIdx] + i) / 8) * 2 * Math.PI - (Math.PI / 2);
                     const ex = cx + r * Math.cos(angle);
                     const ey = cy + r * Math.sin(angle);
                     return <circle key={`new-${i}`} cx={ex} cy={ey} r={4} fill="#ef4444" />;
                 })}
             </g>
        )}
      </g>
    );
  };

  const getChargeStr = (protons: number, electrons: number) => {
      const diff = protons - electrons;
      if (diff === 0) return '0';
      if (diff === 1) return '+';
      if (diff === 2) return '2+';
      if (diff === -1) return '-';
      if (diff === -2) return '2-';
      return diff.toString();
  };

  return (
    <div className="my-8 bg-white rounded-3xl border-4 border-indigo-50 shadow-xl overflow-hidden select-none">
      
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Atomic Simulator
        </h3>
        
        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
            {(['NaCl', 'MgO', 'LiF'] as Scenario[]).map(s => (
                <button
                    key={s}
                    onClick={() => reset(s)}
                    disabled={stage === 'TRANSFER'}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${scenario === s ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    {s}
                </button>
            ))}
        </div>
      </div>

      <div className="p-4 md:p-8 flex flex-col items-center">
          
          <div className="relative w-full max-w-lg h-[300px] bg-slate-50 rounded-2xl border border-slate-200 mb-6 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 500 300">
                  {/* Metal Atom/Ion (Left) */}
                  {renderShells(150, 150, data.metal.config, stage === 'IONS', 'METAL')}
                  
                  {/* Non-Metal Atom/Ion (Right) */}
                  {renderShells(350, 150, data.nonMetal.config, stage === 'IONS', 'NONMETAL')}

                  {/* Electron Path Arrow (During Transfer) */}
                  {stage === 'TRANSFER' && (
                      <path 
                        d="M 190 100 Q 250 50 310 100" 
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="2" 
                        strokeDasharray="4 2"
                        className="animate-pulse"
                      />
                  )}

                  {/* Brackets for Ions */}
                  {stage === 'IONS' && (
                      <>
                          {/* Metal Bracket */}
                          <path d="M 110 100 L 100 100 L 100 200 L 110 200" fill="none" stroke="#94a3b8" strokeWidth="2" />
                          <path d="M 190 100 L 200 100 L 200 200 L 190 200" fill="none" stroke="#94a3b8" strokeWidth="2" />
                          <text x="210" y="110" className="text-xl font-black fill-blue-600">
                              {getChargeStr(data.metal.protons, data.metal.protons - data.electronsToTransfer)}
                          </text>

                          {/* Non-Metal Bracket */}
                          <path d="M 310 90 L 300 90 L 300 210 L 310 210" fill="none" stroke="#94a3b8" strokeWidth="2" />
                          <path d="M 390 90 L 400 90 L 400 210 L 390 210" fill="none" stroke="#94a3b8" strokeWidth="2" />
                          <text x="410" y="100" className="text-xl font-black fill-red-600">
                              {getChargeStr(data.nonMetal.protons, data.nonMetal.protons + data.electronsToTransfer)}
                          </text>
                      </>
                  )}
              </svg>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-lg">
              
              <div className="flex justify-between w-full text-sm font-bold text-slate-500 uppercase tracking-wider px-8">
                  <div className={stage === 'IONS' ? 'text-blue-600' : ''}>
                      {stage === 'IONS' ? `${data.metal.name} Ion` : `${data.metal.name} Atom`}
                  </div>
                  <div className={stage === 'IONS' ? 'text-green-600' : ''}>
                      {stage === 'IONS' ? `${data.nonMetal.name} Ion` : `${data.nonMetal.name} Atom`}
                  </div>
              </div>

              {stage === 'ATOMS' && (
                  <button 
                    onClick={() => setStage('TRANSFER')}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black shadow-lg transition-transform hover:-translate-y-1 active:scale-95"
                  >
                      TRANSFER ELECTRONS <ArrowRight className="w-5 h-5" />
                  </button>
              )}

              {stage === 'IONS' && (
                  <div className="text-center animate-in zoom-in">
                      <div className="flex items-center justify-center gap-2 text-emerald-600 font-black text-xl mb-3">
                          <CheckCircle2 className="w-6 h-6" /> Stable Octet Achieved!
                      </div>
                      <p className="text-slate-600 text-sm mb-4">
                          Electrostatic attraction between the positive and negative ions creates the ionic bond.
                      </p>
                      <button 
                        onClick={() => reset()}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold transition-colors mx-auto"
                      >
                          <RotateCcw className="w-4 h-4" /> Replay
                      </button>
                  </div>
              )}

              {stage === 'TRANSFER' && (
                  <div className="text-slate-400 font-bold text-sm animate-pulse">
                      Transferring Electrons...
                  </div>
              )}

          </div>

      </div>
    </div>
  );
};

export default IonFormationSim;
