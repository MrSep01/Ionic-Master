
import React, { useState, useEffect, useRef } from 'react';
import { Filter, RotateCcw, ArrowRight, Flame, Droplets } from 'lucide-react';

const FiltrationSim: React.FC = () => {
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  
  // --- ANIMATION STATE ---
  
  // Stage 1: Dissolving
  const [stirFrame, setStirFrame] = useState(0);
  const [dissolveProgress, setDissolveProgress] = useState(0);

  // Stage 2: Filtration
  const [tiltAngle, setTiltAngle] = useState(0); // 0 to 45 degrees
  const [beakerVolume, setBeakerVolume] = useState(100); // 100% full
  const [flaskVolume, setFlaskVolume] = useState(0); // 0% full
  const [residueAmount, setResidueAmount] = useState(0); // 0 to 100 scale of fill
  const [drops, setDrops] = useState<{id: number, y: number}[]>([]);

  // Stage 3: Crystallisation
  const [heatTime, setHeatTime] = useState(0);
  const [coolTime, setCoolTime] = useState(0);
  const [isHeating, setIsHeating] = useState(true);
  const [steamParticles, setSteamParticles] = useState<{id: number, x: number, y: number, o: number}[]>([]);

  const reqRef = useRef<number | null>(null);

  // --- CONTROLS ---

  const reset = () => {
    if (reqRef.current) cancelAnimationFrame(reqRef.current);
    setStirFrame(0);
    setDissolveProgress(0);
    setTiltAngle(0);
    setBeakerVolume(100);
    setFlaskVolume(0);
    setResidueAmount(0);
    setDrops([]);
    setHeatTime(0);
    setCoolTime(0);
    setIsHeating(true);
    setSteamParticles([]);
  };

  const handleStageChange = (newStage: 1 | 2 | 3) => {
    reset();
    setStage(newStage);
  };

  // --- ANIMATION LOOPS ---

  useEffect(() => {
    const loop = () => {
      // Stage 1: Stirring
      if (stage === 1) {
        setStirFrame(prev => prev + 0.15);
        setDissolveProgress(prev => Math.min(100, prev + 0.3));
      }

      // Stage 2: Filtering
      if (stage === 2) {
        // 1. Tilt Beaker
        setTiltAngle(prev => {
            if (prev < 45) return prev + 0.5;
            return 45;
        });

        // 2. Pour Liquid (only after tilting starts)
        if (tiltAngle > 20 && beakerVolume > 0) {
            setBeakerVolume(prev => Math.max(0, prev - 0.25));
            setFlaskVolume(prev => Math.min(60, prev + 0.25)); // Cap visual fill
            setResidueAmount(prev => Math.min(100, prev + 0.3)); // Sand accumulates
            
            // Add Drops
            if (Math.random() > 0.7) {
                setDrops(prev => [...prev, { id: Math.random(), y: 0 }]);
            }
        }

        // 3. Animate Drops
        setDrops(prev => prev
            .map(d => ({ ...d, y: d.y + 4 }))
            .filter(d => d.y < 150) // Limit drop travel distance
        );
      }

      // Stage 3: Crystallisation
      if (stage === 3) {
          if (isHeating) {
              setHeatTime(prev => {
                  const next = prev + 0.25;
                  if (next >= 100) {
                      setIsHeating(false); // Stop heating after time
                      return 100;
                  }
                  return next;
              });

              // Generate Steam
              if (Math.random() > 0.6) {
                  setSteamParticles(prev => [...prev, { 
                      id: Math.random(), 
                      x: (Math.random() - 0.5) * 40, 
                      y: 0, 
                      o: 1.0 
                  }]);
              }
          } else {
              setCoolTime(prev => Math.min(100, prev + 0.5));
          }

          // Move Steam
          setSteamParticles(prev => prev
              .map(p => ({ ...p, y: p.y - 1.5, o: p.o - 0.02 }))
              .filter(p => p.o > 0)
          );
      }

      reqRef.current = requestAnimationFrame(loop);
    };

    reqRef.current = requestAnimationFrame(loop);
    return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [stage, tiltAngle, beakerVolume, isHeating]); // Dependencies for loop logic

  // --- HELPERS ---

  // Beaker Spout Logic for Stage 2
  const pivotX = 240; 
  const pivotY = 150; 
  
  // Calculate spout position in world space based on rotation
  const rad = (tiltAngle * Math.PI) / 180;
  // Spout is relative to pivot. If pivot is center of group...
  // Beaker is drawn from -30 to 30. Spout is at x=30, y=-40.
  const spoutXLocal = 30 * Math.cos(rad) - (-40) * Math.sin(rad);
  const spoutYLocal = 30 * Math.sin(rad) + (-40) * Math.cos(rad);
  const streamStartX = pivotX + spoutXLocal; 
  const streamStartY = pivotY + spoutYLocal;

  const funnelTopX = 380; // Center of funnel
  const funnelTopY = 220;

  return (
    <div className="bg-white rounded-3xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none flex flex-col ring-4 ring-indigo-50 my-10">
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
          {[
              { id: 1, label: '1. Dissolve', icon: Droplets },
              { id: 2, label: '2. Filter', icon: Filter },
              { id: 3, label: '3. Crystallise', icon: Flame },
          ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleStageChange(item.id as any)}
                className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold transition-all relative overflow-hidden ${stage === item.id ? 'text-indigo-700 bg-white' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                  {stage === item.id && <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>}
                  <item.icon className={`w-4 h-4 ${stage === item.id ? 'text-indigo-600' : 'text-slate-400'}`} /> 
                  <span className="hidden sm:inline">{item.label}</span>
              </button>
          ))}
      </div>

      {/* Visual Stage */}
      <div className="relative min-h-[500px] bg-slate-100 flex items-center justify-center p-4 overflow-hidden">
          <svg className="w-full max-w-4xl h-[450px]" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                  <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="liquidClear" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#bae6fd" />
                      <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="liquidMuddy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#92400e" />
                  </linearGradient>
                  <radialGradient id="flame" cx="0.5" cy="0.8" r="0.5">
                     <stop offset="0%" stopColor="#fef08a" />
                     <stop offset="100%" stopColor="transparent" />
                 </radialGradient>
                 {/* Flask Shape for Clipping Liquid */}
                 <clipPath id="flaskClip">
                      <path d="M -20 -80 L -50 80 L 50 80 L 20 -80 Z" />
                 </clipPath>
                 {/* Beaker Shape for Clipping Liquid */}
                 <clipPath id="beakerClip">
                      <path d="M -29 -38 L -27 39 L 27 39 L 29 -38 Z" />
                 </clipPath>
              </defs>

              {/* === STAGE 1: DISSOLVING === */}
              {stage === 1 && (
                  <g transform="translate(300, 250)">
                      {/* Beaker */}
                      <path d="M -40 -60 L -35 60 L 35 60 L 40 -60" fill="url(#glass)" stroke="#94a3b8" strokeWidth="2" />
                      
                      {/* Liquid */}
                      <rect x="-35" y="-30" width="70" height="90" fill="url(#liquidClear)" opacity="0.6" />
                      
                      {/* Stirring Rod */}
                      <line 
                        x1="0" y1="-100" 
                        x2={Math.sin(stirFrame) * 20} y2="40" 
                        stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" 
                      />

                      {/* Particles */}
                      <g>
                          {/* Sand (Brown, stays visible) */}
                          {Array.from({length: 30}).map((_, i) => (
                              <circle 
                                key={`sand-${i}`} 
                                cx={(Math.random()-0.5) * 60 + Math.sin(stirFrame + i)*10} 
                                cy={40 - Math.random() * 60} 
                                r={2} 
                                fill="#d97706" 
                              />
                          ))}
                          {/* Salt (White, disappears) */}
                          {Array.from({length: 30}).map((_, i) => (
                              <circle 
                                key={`salt-${i}`} 
                                cx={(Math.random()-0.5) * 60 + Math.sin(stirFrame + i*2)*15} 
                                cy={40 - Math.random() * 60} 
                                r={1.5} 
                                fill="white" 
                                opacity={1 - dissolveProgress/100}
                              />
                          ))}
                      </g>
                      
                      {/* Labels */}
                      <text x="70" y="0" className="text-xs font-bold fill-slate-500">Mixture: Salt + Sand</text>
                      <line x1="65" y1="0" x2="30" y2="10" stroke="#cbd5e1" strokeDasharray="2 2" />
                  </g>
              )}

              {/* === STAGE 2: FILTRATION === */}
              {stage === 2 && (
                  <g>
                      {/* --- FLASK ASSEMBLY --- */}
                      <g transform={`translate(${funnelTopX}, 300)`}>
                          
                          {/* Conical Flask */}
                          <path d="M -20 -80 L -50 80 L 50 80 L 20 -80" fill="none" stroke="#94a3b8" strokeWidth="2" />
                          <path d="M -50 80 L 50 80" stroke="#94a3b8" strokeWidth="2" />
                          
                          {/* Liquid in Flask (Clear Blue Filtrate) */}
                          <g clipPath="url(#flaskClip)">
                              <rect 
                                x="-50" y={80 - flaskVolume} 
                                width="100" height={flaskVolume}
                                fill="url(#liquidClear)"
                              />
                          </g>

                          {/* Falling Drops (Centered on Funnel Stem) */}
                          {drops.map(d => (
                              <circle 
                                key={d.id} 
                                cx="0" 
                                cy={-40 + d.y} 
                                r="2.5" 
                                fill="#3b82f6" 
                                opacity={d.y > (80 + 40 - flaskVolume) ? 0 : 0.8} /* Hide if hits liquid */
                              />
                          ))}

                          {/* Funnel (Sitting on flask neck) */}
                          <g transform="translate(0, -90)">
                              {/* Glass Funnel */}
                              <path d="M -40 -40 L 0 40 L 40 -40" fill="url(#glass)" stroke="#94a3b8" strokeWidth="2" />
                              <line x1="0" y1="40" x2="0" y2="90" stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.5" />
                              
                              {/* Filter Paper (White Cone) */}
                              <path d="M -35 -38 L 0 35 L 35 -38 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                              <line x1="0" y1="35" x2="0" y2="-38" stroke="#cbd5e1" strokeWidth="1" /> {/* Fold line */}
                              
                              {/* Accumulating Residue (Sand) - Fills from bottom */}
                              <clipPath id="residueClip">
                                  <path d="M -35 -38 L 0 35 L 35 -38 Z" />
                              </clipPath>
                              <rect 
                                x="-40" 
                                y={35 - (residueAmount/100)*30} // Grows upwards from tip
                                width="80" 
                                height={(residueAmount/100)*30}
                                fill="#d97706"
                                clipPath="url(#residueClip)"
                              />
                          </g>
                      </g>

                      {/* --- STREAM --- */}
                      {tiltAngle > 20 && beakerVolume > 0 && (
                          <path 
                            d={`M ${streamStartX} ${streamStartY} Q ${streamStartX + 20} ${streamStartY + 20} ${funnelTopX} ${funnelTopY - 120}`}
                            stroke="#b45309" // Muddy stream color
                            strokeWidth="3" 
                            fill="none" 
                            strokeLinecap="round"
                          />
                      )}

                      {/* --- BEAKER (ROTATING) --- */}
                      <g transform={`translate(${pivotX}, ${pivotY}) rotate(${tiltAngle})`}>
                          <g transform="translate(0, 0)"> 
                              {/* Beaker Body */}
                              <path d="M -30 -40 L -28 40 L 28 40 L 30 -40" fill="url(#glass)" stroke="#94a3b8" strokeWidth="2" />
                              
                              {/* Liquid (Muddy Brown) - Counter Rotated to stay flat */}
                              <g clipPath="url(#beakerClip)">
                                  <rect 
                                    x="-50" y={40 - (beakerVolume/100)*60} 
                                    width="100" height="100" 
                                    fill="url(#liquidMuddy)" 
                                    transform={`rotate(${-tiltAngle})`} /* Physics: Liquid stays horizontal */
                                    style={{ transformOrigin: 'center' }}
                                  />
                              </g>
                          </g>
                      </g>

                      {/* Labels */}
                      <g className="pointer-events-none animate-in fade-in delay-700">
                          <text x="450" y="150" className="text-xs font-bold fill-amber-700">Residue (Sand)</text>
                          <line x1="445" y1="150" x2="400" y2="150" stroke="#d97706" strokeDasharray="2 2" />

                          <text x="450" y="250" className="text-xs font-bold fill-blue-600">Filtrate (Salt Water)</text>
                          <line x1="445" y1="250" x2="400" y2="250" stroke="#3b82f6" strokeDasharray="2 2" />
                      </g>
                  </g>
              )}

              {/* === STAGE 3: CRYSTALLISATION === */}
              {stage === 3 && (
                  <g transform="translate(300, 250)">
                      
                      {/* Tripod */}
                      <g stroke="#475569" strokeWidth="3" strokeLinecap="round">
                          <line x1="-40" y1="0" x2="-60" y2="80" />
                          <line x1="40" y1="0" x2="60" y2="80" />
                          <line x1="-50" y1="0" x2="50" y2="0" />
                      </g>

                      {/* Bunsen Burner */}
                      <rect x="-10" y="40" width="20" height="40" fill="#334155" />
                      {isHeating && (
                          <path d="M 0 40 Q -10 10 0 0 Q 10 10 0 40" fill="url(#flame)" className="animate-pulse" />
                      )}

                      {/* Evaporating Basin */}
                      <g transform="translate(0, -10)">
                          <path d="M -40 0 A 40 20 0 0 0 40 0 Z" fill="white" stroke="#94a3b8" strokeWidth="2" />
                          
                          {/* Liquid (Evaporates) */}
                          <clipPath id="basinLiquid">
                              <path d="M -38 0 A 38 18 0 0 0 38 0 Z" />
                          </clipPath>
                          
                          <rect 
                            x="-40" 
                            y={0 + (heatTime/100)*20} 
                            width="80" height="20" 
                            fill="url(#liquidClear)" 
                            clipPath="url(#basinLiquid)"
                          />
                          
                          {/* Crystals Forming (Only when Cooling) */}
                          {!isHeating && (
                              <g opacity={coolTime/100}>
                                  <rect x="-10" y="10" width="6" height="6" fill="white" stroke="#cbd5e1" transform="rotate(45 -7 13)"/>
                                  <rect x="5" y="8" width="8" height="8" fill="white" stroke="#cbd5e1" transform="rotate(15 9 12)"/>
                                  <rect x="-20" y="5" width="5" height="5" fill="white" stroke="#cbd5e1" transform="rotate(-10 -17 7)"/>
                              </g>
                          )}
                      </g>

                      {/* Steam */}
                      {steamParticles.map(p => (
                          <circle 
                            key={p.id} cx={p.x} cy={-20 + p.y} r="3" 
                            fill="white" opacity={p.o * 0.5} 
                          />
                      ))}

                      {/* Labels / Status */}
                      <text x="-150" y="-50" className="text-xs font-bold fill-slate-500">
                          {isHeating ? 'Evaporating Water...' : 'Cooling: Crystals Forming'}
                      </text>
                  </g>
              )}

          </svg>
      </div>

      {/* Description & Controls */}
      <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-200">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex-1">
                  <h4 className="font-black text-slate-800 text-lg mb-2 flex items-center gap-2">
                      {stage === 1 && 'Step 1: Dissolving'}
                      {stage === 2 && 'Step 2: Filtration'}
                      {stage === 3 && 'Step 3: Crystallisation'}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                      {stage === 1 && "Salt dissolves in water. Sand is insoluble and sinks to the bottom."}
                      {stage === 2 && "The mixture is poured into the funnel. The Sand (Residue) gets trapped in the filter paper. The Salt Water (Filtrate) passes through."}
                      {stage === 3 && "Heat to evaporate water until saturation point. Then stop heating. As it cools, salt solubility decreases and pure crystals form."}
                  </p>
              </div>
              <div className="flex gap-3 shrink-0">
                  <button 
                    onClick={() => handleStageChange(stage)} 
                    className="p-3 rounded-xl border-2 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
                    title="Replay Animation"
                  >
                      <RotateCcw className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleStageChange(stage === 3 ? 1 : stage + 1 as any)} 
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 active:scale-95"
                  >
                      {stage === 3 ? 'Start Over' : 'Next Step'} <ArrowRight className="w-5 h-5" />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default FiltrationSim;
