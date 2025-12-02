
import React, { useState, useEffect } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, Circle, X as XIcon } from 'lucide-react';

type Scenario = 'NaCl' | 'MgO' | 'MgCl2' | 'Na2O';

const DotCrossSim: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('NaCl');
  const [stage, setStage] = useState<'ATOMS' | 'TRANSFER' | 'FINAL'>('ATOMS');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (stage === 'TRANSFER') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setStage('FINAL');
            return 0;
          }
          return prev + 1.5;
        });
      }, 20);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const reset = (s?: Scenario) => {
    if (s) setScenario(s);
    setStage('ATOMS');
    setProgress(0);
  };

  const getScenarioData = (s: Scenario) => {
    switch (s) {
      case 'NaCl': return {
        metal: { sym: 'Na', group: 1, color: 'text-blue-600', dotColor: 'bg-blue-500' },
        nonMetal: { sym: 'Cl', group: 7, color: 'text-green-600', crossColor: 'text-green-500' },
        ratio: { m: 1, nm: 1 },
        transfer: 1 // electrons per metal atom
      };
      case 'MgO': return {
        metal: { sym: 'Mg', group: 2, color: 'text-indigo-600', dotColor: 'bg-indigo-500' },
        nonMetal: { sym: 'O', group: 6, color: 'text-rose-600', crossColor: 'text-rose-500' },
        ratio: { m: 1, nm: 1 },
        transfer: 2
      };
      case 'MgCl2': return {
        metal: { sym: 'Mg', group: 2, color: 'text-indigo-600', dotColor: 'bg-indigo-500' },
        nonMetal: { sym: 'Cl', group: 7, color: 'text-green-600', crossColor: 'text-green-500' },
        ratio: { m: 1, nm: 2 },
        transfer: 2 // total electrons lost by metal (1 to each nm)
      };
      case 'Na2O': return {
        metal: { sym: 'Na', group: 1, color: 'text-blue-600', dotColor: 'bg-blue-500' },
        nonMetal: { sym: 'O', group: 6, color: 'text-rose-600', crossColor: 'text-rose-500' },
        ratio: { m: 2, nm: 1 },
        transfer: 1 // electrons lost per metal
      };
    }
  };

  const data = getScenarioData(scenario);

  const renderElectron = (cx: number, cy: number, type: 'DOT' | 'CROSS') => {
    if (type === 'DOT') {
      return <circle cx={cx} cy={cy} r={4} className={data.metal.dotColor} />;
    }
    return (
      <g transform={`translate(${cx}, ${cy})`}>
        <line x1="-3" y1="-3" x2="3" y2="3" stroke="currentColor" strokeWidth="2" className={data.nonMetal.crossColor} />
        <line x1="3" y1="-3" x2="-3" y2="3" stroke="currentColor" strokeWidth="2" className={data.nonMetal.crossColor} />
      </g>
    );
  };

  const renderAtom = (
    x: number, y: number, 
    type: 'METAL' | 'NONMETAL', 
    id: number,
    isIon: boolean
  ) => {
    const isMetal = type === 'METAL';
    const props = isMetal ? data.metal : data.nonMetal;
    const valenceCount = isMetal ? props.group : props.group;
    
    // Position logic
    const radius = 35;
    
    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Bracket if Ion */}
        {isIon && (
          <path 
            d="M -45 -45 L -55 -45 L -55 45 L -45 45 M 45 -45 L 55 -45 L 55 45 L 45 45" 
            fill="none" 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        )}
        
        {/* Charge */}
        {isIon && (
          <text x="60" y="-30" className={`text-lg font-bold ${isMetal ? 'fill-blue-600' : 'fill-red-600'}`}>
            {isMetal 
              ? (props.group === 1 ? '+' : '2+')
              : (props.group === 7 ? '-' : '2-')
            }
          </text>
        )}

        {/* Nucleus */}
        <circle 
          r="15" 
          className={`${isMetal ? 'fill-blue-100' : 'fill-green-100'} ${isMetal ? 'stroke-blue-300' : 'stroke-green-300'}`} 
          stroke="currentColor" 
          strokeWidth="2" 
        />
        <text y="4" textAnchor="middle" className={`text-xs font-black ${props.color}`}>{props.sym}</text>

        {/* Shell */}
        {(!isIon || !isMetal) && ( // Don't draw empty shell for metal ion
           <circle r={radius} fill="none" stroke="#cbd5e1" strokeWidth="1" />
        )}

        {/* Electrons */}
        {(!isIon || !isMetal) && Array.from({ length: valenceCount }).map((_, i) => {
           // Distribute electrons
           const angle = (i / valenceCount) * 2 * Math.PI - Math.PI/2;
           const ex = Math.cos(angle) * radius;
           const ey = Math.sin(angle) * radius;
           
           // If we are animating transfer
           if (stage === 'TRANSFER' && isMetal) {
              // Calculate target position
              // This is complex for multiple atoms. 
              // Simplified: All metal electrons go to the non-metal(s).
              
              // Find target non-metal coordinates relative to this atom
              // Scenario specific mapping
              let targetX = 0;
              let targetY = 0;
              let targetSlotAngle = 0;

              if (scenario === 'NaCl' || scenario === 'MgO') {
                  targetX = 200; // Distance to right
                  // Slot into the gap of non-metal (which has 7 or 6 electrons)
                  // 7 electrons: gap is at top (if distributed evenly). 
                  // Let's just lerp to center of non-metal for simplicity of visual flow
                  targetSlotAngle = -Math.PI/2; 
              } else if (scenario === 'MgCl2') {
                  // Metal is center. Cls are left and right.
                  // Metal e1 goes left (-150), e2 goes right (+150)
                  targetX = i === 0 ? -150 : 150;
              } else if (scenario === 'Na2O') {
                  // Metal is left/right. Oxygen center.
                  targetX = id === 0 ? 150 : -150; // Move towards center
              }

              const travelX = ex + (targetX * (progress/100));
              const travelY = ey + (0 * (progress/100)); // Simple horizontal travel
              
              return <g key={i}>{renderElectron(travelX, travelY, 'DOT')}</g>;
           }

           return <g key={i}>{renderElectron(ex, ey, isMetal ? 'DOT' : 'CROSS')}</g>;
        })}

        {/* Gained Electrons (Final State for Non-Metal) */}
        {isIon && !isMetal && (
            <g>
                {/* Draw the original crosses */}
                {Array.from({ length: valenceCount }).map((_, i) => {
                    const angle = (i / 8) * 2 * Math.PI - Math.PI/2; // Based on 8 for full shell
                    const ex = Math.cos(angle) * radius;
                    const ey = Math.sin(angle) * radius;
                    return <g key={`orig-${i}`}>{renderElectron(ex, ey, 'CROSS')}</g>;
                })}
                {/* Draw the new dots */}
                {Array.from({ length: 8 - valenceCount }).map((_, i) => {
                    const idx = valenceCount + i;
                    const angle = (idx / 8) * 2 * Math.PI - Math.PI/2;
                    const ex = Math.cos(angle) * radius;
                    const ey = Math.sin(angle) * radius;
                    return <g key={`new-${i}`}>{renderElectron(ex, ey, 'DOT')}</g>;
                })}
            </g>
        )}
      </g>
    );
  };

  const renderScene = () => {
      // Coordinate System: Center is 300, 150
      const cy = 150;
      
      if (scenario === 'NaCl' || scenario === 'MgO') {
          return (
              <>
                  {renderAtom(200, cy, 'METAL', 0, stage === 'FINAL')}
                  {renderAtom(400, cy, 'NONMETAL', 0, stage === 'FINAL')}
                  {stage === 'TRANSFER' && <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-slate-300" />}
              </>
          );
      }
      
      if (scenario === 'MgCl2') {
          // Cl - Mg - Cl
          return (
              <>
                  {renderAtom(150, cy, 'NONMETAL', 0, stage === 'FINAL')}
                  {renderAtom(300, cy, 'METAL', 0, stage === 'FINAL')}
                  {renderAtom(450, cy, 'NONMETAL', 1, stage === 'FINAL')}
              </>
          );
      }

      if (scenario === 'Na2O') {
          // Na - O - Na
          return (
              <>
                  {renderAtom(150, cy, 'METAL', 0, stage === 'FINAL')}
                  {renderAtom(300, cy, 'NONMETAL', 0, stage === 'FINAL')}
                  {renderAtom(450, cy, 'METAL', 1, stage === 'FINAL')}
              </>
          );
      }
  };

  return (
    <div className="my-10 bg-white rounded-3xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none ring-4 ring-indigo-50">
      
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Circle className="w-5 h-5 text-indigo-500 fill-indigo-100" />
          Dot-and-Cross Lab
        </h3>
        
        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
            {(['NaCl', 'MgO', 'MgCl2', 'Na2O'] as Scenario[]).map(s => (
                <button
                    key={s}
                    onClick={() => reset(s)}
                    disabled={stage === 'TRANSFER'}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${scenario === s ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    {s}
                </button>
            ))}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center bg-slate-50/50">
          
          <div className="relative w-full max-w-2xl h-[300px] bg-white rounded-2xl border border-slate-200 mb-6 shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 600 300">
                  {renderScene()}
              </svg>
              
              {/* Legend */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur p-2 rounded-lg border border-slate-100 text-[10px] shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${data.metal.dotColor}`}></div>
                      <span className="text-slate-500 font-bold">Metal Electron (Dot)</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <div className="w-2 h-2 relative">
                          <XIcon className={`w-2 h-2 ${data.nonMetal.crossColor}`} />
                      </div>
                      <span className="text-slate-500 font-bold">Non-Metal Electron (Cross)</span>
                  </div>
              </div>
          </div>

          <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-slate-600 text-center max-w-md">
                  {stage === 'ATOMS' && `Atoms are neutral. ${data.metal.sym} needs to lose e⁻, ${data.nonMetal.sym} needs to gain e⁻.`}
                  {stage === 'TRANSFER' && 'Electrons are transferring to complete the outer shells...'}
                  {stage === 'FINAL' && `Stable ions formed! ${scenario === 'NaCl' ? '1:1 Ratio' : scenario === 'MgCl2' ? '1:2 Ratio (One Mg, Two Cl)' : scenario === 'Na2O' ? '2:1 Ratio (Two Na, One O)' : '1:1 Ratio'}.`}
              </p>

              {stage === 'ATOMS' && (
                  <button 
                    onClick={() => setStage('TRANSFER')}
                    className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black shadow-lg transition-transform hover:-translate-y-1 active:scale-95"
                  >
                      Create Bond <ArrowRight className="w-5 h-5" />
                  </button>
              )}

              {stage === 'FINAL' && (
                  <button 
                    onClick={() => reset()}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold transition-colors"
                  >
                      <RotateCcw className="w-4 h-4" /> Reset
                  </button>
              )}
          </div>

      </div>
    </div>
  );
};

export default DotCrossSim;
