
import React, { useState, useEffect } from 'react';
import { RotateCcw, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

type Scenario = 'NaCl' | 'MgCl2' | 'Na2O';

const IonicBondingSim: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('NaCl');
  const [stage, setStage] = useState<'ATOMS' | 'TRANSFER' | 'IONS'>('ATOMS');
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (stage === 'TRANSFER') {
      interval = setInterval(() => {
        setAnimProgress(prev => {
          if (prev >= 100) {
            setStage('IONS');
            return 0;
          }
          return prev + 1.5;
        });
      }, 16);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const reset = (s?: Scenario) => {
    if (s) setScenario(s);
    setStage('ATOMS');
    setAnimProgress(0);
  };

  const getScenarioData = (s: Scenario) => {
    if (s === 'NaCl') {
      return {
        metals: [{ id: 'na1', symbol: 'Na', x: 150, y: 150, electrons: [2, 8, 1], transfer: [{ targetId: 'cl1', shellIdx: 2 }] }],
        nonMetals: [{ id: 'cl1', symbol: 'Cl', x: 450, y: 150, electrons: [2, 8, 7], color: 'green' }],
        ratio: '1:1',
        name: 'Sodium Chloride'
      };
    }
    if (s === 'MgCl2') {
      return {
        metals: [{ id: 'mg1', symbol: 'Mg', x: 300, y: 150, electrons: [2, 8, 2], transfer: [{ targetId: 'cl1', shellIdx: 2 }, { targetId: 'cl2', shellIdx: 2 }] }],
        nonMetals: [
          { id: 'cl1', symbol: 'Cl', x: 100, y: 150, electrons: [2, 8, 7], color: 'green' },
          { id: 'cl2', symbol: 'Cl', x: 500, y: 150, electrons: [2, 8, 7], color: 'green' }
        ],
        ratio: '1:2',
        name: 'Magnesium Chloride'
      };
    }
    // Na2O
    return {
      metals: [
        { id: 'na1', symbol: 'Na', x: 100, y: 150, electrons: [2, 8, 1], transfer: [{ targetId: 'o1', shellIdx: 1 }] },
        { id: 'na2', symbol: 'Na', x: 500, y: 150, electrons: [2, 8, 1], transfer: [{ targetId: 'o1', shellIdx: 1 }] }
      ],
      nonMetals: [{ id: 'o1', symbol: 'O', x: 300, y: 150, electrons: [2, 6], color: 'red' }],
      ratio: '2:1',
      name: 'Sodium Oxide'
    };
  };

  const data = getScenarioData(scenario);

  const renderAtom = (atom: any, type: 'METAL' | 'NONMETAL') => {
    const isMetal = type === 'METAL';
    const baseColor = isMetal ? '#6366f1' : (atom.color === 'red' ? '#e11d48' : '#16a34a');
    const lightColor = isMetal ? '#e0e7ff' : (atom.color === 'red' ? '#ffe4e6' : '#dcfce7');

    return (
      <g key={atom.id}>
        {/* Nucleus */}
        <circle cx={atom.x} cy={atom.y} r={18} fill={lightColor} stroke={baseColor} strokeWidth="2" />
        <text x={atom.x} y={atom.y} dy="5" textAnchor="middle" className={`text-xs font-black select-none ${isMetal ? 'fill-indigo-700' : (atom.color === 'red' ? 'fill-rose-700' : 'fill-green-700')}`}>
          {atom.symbol}
        </text>

        {/* Shells */}
        {atom.electrons.map((count: number, i: number) => {
          const isOuter = i === atom.electrons.length - 1;
          // In IONS stage, metals lose outer shell
          if (stage === 'IONS' && isMetal && isOuter) return null;

          const r = 28 + (i * 14);
          
          return (
            <g key={i}>
              <circle cx={atom.x} cy={atom.y} r={r} fill="none" stroke="#cbd5e1" strokeWidth="1" />
              {Array.from({ length: count }).map((_, eIdx) => {
                // Calculate position
                const angle = (eIdx / count) * 2 * Math.PI - (Math.PI / 2);
                const ex = atom.x + r * Math.cos(angle);
                const ey = atom.y + r * Math.sin(angle);

                // Handle Transfer Animation
                if (stage === 'TRANSFER' && isMetal && isOuter) {
                   // Logic for moving electron
                   // Find the target for THIS specific electron
                   // Simplified: Atom transfer array maps roughly to electron index
                   const targetInfo = atom.transfer[eIdx]; 
                   if (targetInfo) {
                       const targetAtom = data.nonMetals.find((n: any) => n.id === targetInfo.targetId);
                       if (targetAtom) {
                           // Target position (Outer shell of non-metal)
                           const tShellIdx = targetAtom.electrons.length - 1;
                           const tRadius = 28 + (tShellIdx * 14);
                           // Find open slot angle. 
                           // Non-metal has `targetAtom.electrons[tShellIdx]` electrons currently.
                           // We add to the end.
                           const currentCount = targetAtom.electrons[tShellIdx];
                           const totalCount = 8; // Assuming octet goal
                           // To space them nicely, we target the "empty" spots of an 8-electron shell
                           // e.g. Cl has 7. Slot 8 is angle for index 7.
                           // e.g. O has 6. Slots 7,8 are empty.
                           
                           // Very Simplified slot finding for animation visual:
                           // Cl (7) -> Target is top-leftish? 
                           // Let's just interpolate to the center of the target atom for simplicity, then snap to shell in IONS stage
                           
                           // Better: Target specific angles on the target shell
                           // Oxygen (6): Needs 2. Slot 6 and 7 (if 0-indexed).
                           // Chlorine (7): Needs 1. Slot 7.
                           
                           // Determine "slot index" for this incoming electron
                           // If multiple metals target same non-metal, we need global index? 
                           // Hack: Use metal ID to offset or just simple math
                           
                           let slotOffset = 0;
                           if (atom.id === 'na2') slotOffset = 1; // 2nd Na fills 2nd slot of Oxygen
                           if (atom.id === 'mg1' && targetAtom.id === 'cl2') slotOffset = 0; // Mg fills Cl2's only slot
                           
                           const targetSlot = currentCount + slotOffset;
                           const tAngle = (targetSlot / totalCount) * 2 * Math.PI - (Math.PI / 2);
                           
                           const tx = targetAtom.x + tRadius * Math.cos(tAngle);
                           const ty = targetAtom.y + tRadius * Math.sin(tAngle);

                           const mx = ex + (tx - ex) * (animProgress / 100);
                           const my = ey + (ty - ey) * (animProgress / 100);

                           return <circle key={eIdx} cx={mx} cy={my} r={4} fill="#fbbf24" stroke="#d97706" strokeWidth="1" />;
                       }
                   }
                }

                // Standard Dot/Cross Rendering
                if (isMetal) {
                    return <circle key={eIdx} cx={ex} cy={ey} r={3} fill="#fbbf24" />; // Metal = Gold Dot
                } else {
                    // Non-metal = X (drawn as small path or circle for simplicity)
                    return (
                        <g key={eIdx} transform={`translate(${ex}, ${ey})`}>
                            <line x1="-2" y1="-2" x2="2" y2="2" stroke={baseColor} strokeWidth="2" />
                            <line x1="2" y1="-2" x2="-2" y2="2" stroke={baseColor} strokeWidth="2" />
                        </g>
                    );
                }
              })}
            </g>
          );
        })}

        {/* Draw Transferred Electrons on Non-Metal in IONS stage */}
        {!isMetal && stage === 'IONS' && (
            <g>
                {/* Find how many electrons this non-metal gained */}
                {/* Reverse lookup: find metals targeting this atom */}
                {data.metals.map((m: any) => {
                    return m.transfer.map((t: any, tIdx: number) => {
                        if (t.targetId === atom.id) {
                            // This electron came from metal 'm'
                            // Where should it sit?
                            const shellIdx = atom.electrons.length - 1;
                            const r = 28 + (shellIdx * 14);
                            const currentCount = atom.electrons[shellIdx];
                            
                            // Determine slot based on source to avoid overlap
                            // For Na2O: na1 targets slot 6, na2 targets slot 7
                            let slot = currentCount;
                            if (scenario === 'Na2O' && m.id === 'na2') slot += 1;
                            
                            const angle = (slot / 8) * 2 * Math.PI - (Math.PI / 2);
                            const ex = atom.x + r * Math.cos(angle);
                            const ey = atom.y + r * Math.sin(angle);
                            
                            return <circle key={`gained-${m.id}-${tIdx}`} cx={ex} cy={ey} r={4} fill="#fbbf24" stroke="#d97706" strokeWidth="1" />;
                        }
                        return null;
                    });
                })}
            </g>
        )}

        {/* Brackets & Charge (IONS Stage) */}
        {stage === 'IONS' && (
            <g>
               <path d={`M ${atom.x - 45} ${atom.y - 45} L ${atom.x - 55} ${atom.y - 45} L ${atom.x - 55} ${atom.y + 45} L ${atom.x - 45} ${atom.y + 45}`} fill="none" stroke="#94a3b8" strokeWidth="2" />
               <path d={`M ${atom.x + 45} ${atom.y - 45} L ${atom.x + 55} ${atom.y - 45} L ${atom.x + 55} ${atom.y + 45} L ${atom.x + 45} ${atom.y + 45}`} fill="none" stroke="#94a3b8" strokeWidth="2" />
               <text x={atom.x + 60} y={atom.y - 30} className={`text-xl font-black ${isMetal ? 'fill-indigo-600' : 'fill-rose-600'}`}>
                   {isMetal ? (
                       atom.symbol === 'Mg' ? '2+' : '+'
                   ) : (
                       atom.symbol === 'O' ? '2-' : '-'
                   )}
               </text>
            </g>
        )}
      </g>
    );
  };

  return (
    <div className="my-10 bg-white rounded-3xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Ionic Bonding Simulator
        </h3>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            {(['NaCl', 'MgCl2', 'Na2O'] as Scenario[]).map(s => (
                <button
                    key={s}
                    onClick={() => reset(s)}
                    disabled={stage === 'TRANSFER'}
                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${scenario === s ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    {s === 'NaCl' ? '1:1 (NaCl)' : s === 'MgCl2' ? '1:2 (MgCl₂)' : '2:1 (Na₂O)'}
                </button>
            ))}
        </div>
      </div>

      <div className="p-4 md:p-8 flex flex-col items-center bg-slate-50/50">
          <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-slate-800">{data.name}</h2>
              <p className="text-slate-500 text-sm font-medium">
                  {scenario === 'NaCl' && "One Sodium gives one electron to one Chlorine."}
                  {scenario === 'MgCl2' && "Magnesium needs to lose 2 electrons. It needs TWO Chlorines to accept them."}
                  {scenario === 'Na2O' && "Oxygen needs 2 electrons. It needs TWO Sodiums to provide them."}
              </p>
          </div>

          <div className="relative w-full max-w-2xl h-[300px] bg-white rounded-2xl border border-slate-200 shadow-inner overflow-hidden mb-6">
              <svg className="w-full h-full" viewBox="0 0 600 300">
                  {data.metals.map((m: any) => renderAtom(m, 'METAL'))}
                  {data.nonMetals.map((n: any) => renderAtom(n, 'NONMETAL'))}
              </svg>
          </div>

          <div className="flex gap-4">
              {stage === 'ATOMS' && (
                  <button 
                    onClick={() => setStage('TRANSFER')}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                  >
                      TRANSFER ELECTRONS <ArrowRight className="w-5 h-5" />
                  </button>
              )}
              {stage === 'TRANSFER' && (
                  <div className="px-8 py-3 bg-slate-100 text-slate-400 rounded-xl font-bold animate-pulse cursor-wait">
                      Transferring...
                  </div>
              )}
              {stage === 'IONS' && (
                  <button 
                    onClick={() => reset()}
                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                  >
                      <RotateCcw className="w-5 h-5" /> REPLAY
                  </button>
              )}
          </div>
      </div>
    </div>
  );
};

export default IonicBondingSim;
