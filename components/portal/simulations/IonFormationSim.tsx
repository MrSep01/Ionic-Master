
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

  // --- HELPER: ELECTRON POSITIONING (PAIRED) ---
  // Calculates (x,y) for an electron to simulate "paired" filling (Top, Right, Bottom, Left)
  const getElectronPos = (n: number, total: number, r: number, shellIdx: number, cx: number, cy: number) => {
    let angle = 0;
    
    if (shellIdx === 0) {
        // Inner shell (max 2): Pair at top if 2, or single at top
        const base = -Math.PI / 2;
        if (total === 1) angle = base;
        else {
            const offset = 0.35;
            angle = base + (n === 0 ? -offset : offset);
        }
    } else {
        // Outer shells (max 8): Fill order 0:Top, 1:Right, 2:Bottom, 3:Left, then pair 4:Top, 5:Right...
        const positions = [-Math.PI/2, 0, Math.PI/2, Math.PI];
        const group = n % 4; // Which quadrant?
        const isPairing = n >= 4; // Is this the second electron of the pair?
        const hasPair = total > (group + 4); // Is there a partner for this group in the current config?
        
        let baseAngle = positions[group];
        const offset = 0.25; // Separation for pairs
        
        if (hasPair || isPairing) {
            // If it's a pair, offset them
            angle = baseAngle + (isPairing ? offset : -offset);
        } else {
            // Single electron in this quadrant
            angle = baseAngle;
        }
    }
    return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
    };
  };

  // --- RENDERERS ---
  const renderShells = (cx: number, cy: number, config: number[], isIon: boolean, type: 'METAL' | 'NONMETAL') => {
    // For metal ion, we don't draw the emptied outer shell (visual preference)
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
          
          // Hide empty outer shell for metal ion
          if (isIon && type === 'METAL' && shellIdx === outerShellIndex) return null;

          // Determine how many electrons to draw in THIS shell
          // For Metal during transfer: it still has them, but they are animating away.
          // For NonMetal during transfer: it has its original count.
          
          return (
            <g key={shellIdx}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* Electrons */}
              {Array.from({ length: count }).map((_, eIdx) => {
                
                const pos = getElectronPos(eIdx, count, r, shellIdx, cx, cy);
                let ex = pos.x;
                let ey = pos.y;

                // HANDLE TRANSFER ANIMATION (Metal loses electrons)
                if (stage === 'TRANSFER' && shellIdx === outerShellIndex && type === 'METAL') {
                   // Target Non-Metal Geometry
                   const targetShellIdx = data.nonMetal.config.length - 1;
                   const targetR = 25 + (targetShellIdx * 15);
                   const nmCx = 350; // NonMetal Center X
                   const nmCy = 150; // NonMetal Center Y
                   
                   // Calculate destination slot on non-metal
                   const existingNM = data.nonMetal.config[targetShellIdx]; // e.g. 7
                   const totalNM = existingNM + data.electronsToTransfer; // e.g. 8
                   const slotIdx = existingNM + eIdx; // Next available slots
                   
                   const targetPos = getElectronPos(slotIdx, totalNM, targetR, targetShellIdx, nmCx, nmCy);

                   // Interpolate position
                   ex = ex + (targetPos.x - ex) * (animFrame / 100);
                   ey = ey + (targetPos.y - ey) * (animFrame / 100);

                   return <circle key={eIdx} cx={ex} cy={ey} r={4} fill="#ef4444" />; // Red for moving electron
                }

                return <circle key={eIdx} cx={ex} cy={ey} r={3} fill="#3b82f6" />;
              })}
            </g>
          );
        })}
        
        {/* Draw GAINED electrons on Non-Metal (IONS stage) */}
        {stage === 'IONS' && type === 'NONMETAL' && (
             <g>
                 {Array.from({ length: data.electronsToTransfer }).map((_, i) => {
                     const shellIdx = data.nonMetal.config.length - 1;
                     const r = 25 + (shellIdx * 15);
                     
                     const existing = data.nonMetal.config[shellIdx];
                     const total = existing + data.electronsToTransfer;
                     const n = existing + i; // The index of the new electron

                     const pos = getElectronPos(n, total, r, shellIdx, cx, cy);
                     
                     return <circle key={`new-${i}`} cx={pos.x} cy={pos.y} r={4} fill="#ef4444" />;
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
    <div className="my-8 bg-white rounded-3xl border-4 border-indigo-50 shadow-xl overflow-hidden select-none relative z-20">
      
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

          <div className="flex flex-col items-center gap-4 w-full max-w-lg relative z-30">
              
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
