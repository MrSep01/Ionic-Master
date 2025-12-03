
import React, { useState, useEffect, useRef } from 'react';
import { Layers, Hammer, Flame, RotateCcw, ArrowRight, Zap, Box, Maximize, Minimize } from 'lucide-react';

type Mode = 'STRUCTURE' | 'BRITTLE' | 'MELT';

const IonicLatticeSim: React.FC = () => {
  const [mode, setMode] = useState<Mode>('STRUCTURE');
  
  // --- STRUCTURE 3D STATE ---
  const [isExploded, setIsExploded] = useState(false);
  const [rotation, setRotation] = useState(0);

  // --- BRITTLE MODE STATE ---
  const [brittleStage, setBrittleStage] = useState<'IDLE' | 'SHIFTING' | 'REPELLING' | 'BROKEN'>('IDLE');
  
  // --- MELT MODE STATE ---
  const [temp, setTemp] = useState(20);
  const [isMolten, setIsMolten] = useState(false);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, vx: number, vy: number, type: 'POS' | 'NEG'}[]>([]);

  // --- ANIMATION REFS ---
  const reqRef = useRef<number>();

  const reset = () => {
    setBrittleStage('IDLE');
    setTemp(20);
    setIsMolten(false);
    initMeltParticles();
    if (reqRef.current) cancelAnimationFrame(reqRef.current);
  };

  const handleModeChange = (m: Mode) => {
    reset();
    setMode(m);
  };

  // --- 3D ROTATION LOOP ---
  useEffect(() => {
    if (mode === 'STRUCTURE') {
      const loop = () => {
        setRotation(prev => (prev + 0.5) % 360);
        reqRef.current = requestAnimationFrame(loop);
      };
      loop();
    }
    return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [mode]);

  // --- BRITTLE ANIMATION ---
  useEffect(() => {
      if (mode === 'BRITTLE' && brittleStage === 'SHIFTING') {
          const timer = setTimeout(() => {
              setBrittleStage('REPELLING');
          }, 600); // Wait for shift to finish
          return () => clearTimeout(timer);
      }
      if (mode === 'BRITTLE' && brittleStage === 'REPELLING') {
          const timer = setTimeout(() => {
              setBrittleStage('BROKEN');
          }, 800); // Wait for repulsion visual
          return () => clearTimeout(timer);
      }
  }, [brittleStage, mode]);

  // --- MELT PHYSICS LOOP ---
  const initMeltParticles = () => {
      const p = [];
      const rows = 5;
      const cols = 5;
      for(let y=0; y<rows; y++) {
          for(let x=0; x<cols; x++) {
              p.push({
                  id: y*cols + x,
                  x: 30 + x * 10, // Grid positions
                  y: 30 + y * 10,
                  vx: 0,
                  vy: 0,
                  type: (x+y)%2 === 0 ? 'POS' : 'NEG'
              } as const);
          }
      }
      setParticles(p);
  };

  useEffect(() => {
      initMeltParticles();
  }, []);

  useEffect(() => {
      if (mode === 'MELT') {
          const loop = () => {
              setParticles(prev => prev.map(p => {
                  let { x, y, vx, vy } = p;
                  
                  // Heat Vibration
                  const vibration = temp / 200;
                  
                  if (temp < 800) {
                      // Solid: Return to grid anchor with vibration
                      const anchorX = 30 + (p.id % 5) * 10;
                      const anchorY = 30 + Math.floor(p.id / 5) * 10;
                      
                      // Hooke's law pull back to anchor
                      vx += (anchorX - x) * 0.1;
                      vy += (anchorY - y) * 0.1;
                      
                      // Random thermal jitter
                      vx += (Math.random() - 0.5) * vibration;
                      vy += (Math.random() - 0.5) * vibration;
                      
                      // Damping
                      vx *= 0.8;
                      vy *= 0.8;
                  } else {
                      // Liquid: Brownian motion + containment
                      vx += (Math.random() - 0.5) * 0.5;
                      vy += (Math.random() - 0.5) * 0.5;
                      
                      // Gravity/Cohesion sim (weak pull to center)
                      vx += (50 - x) * 0.001;
                      vy += (50 - y) * 0.001;
                      
                      // Repulsion from walls
                      if (x < 10) vx += 0.5;
                      if (x > 90) vx -= 0.5;
                      if (y < 10) vy += 0.5;
                      if (y > 90) vy -= 0.5;
                      
                      // Speed limit
                      const speed = Math.sqrt(vx*vx + vy*vy);
                      if (speed > 2) {
                          vx = (vx/speed) * 2;
                          vy = (vy/speed) * 2;
                      }
                  }

                  return { ...p, x: x + vx, y: y + vy, vx, vy };
              }));
              reqRef.current = requestAnimationFrame(loop);
          };
          loop();
      }
      return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [mode, temp]);


  // --- RENDERERS ---

  const render3DStructure = () => {
      // Create a 3x3x3 Grid
      const size = 3;
      const atoms = [];
      const offset = (size - 1) / 2;
      const spacing = isExploded ? 60 : 40;

      for (let z = 0; z < size; z++) {
          for (let y = 0; y < size; y++) {
              for (let x = 0; x < size; x++) {
                  const isPos = (x + y + z) % 2 === 0;
                  atoms.push({ x: x - offset, y: y - offset, z: z - offset, isPos });
              }
          }
      }

      return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 overflow-hidden perspective-1000">
              
              <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur p-3 rounded-xl border border-slate-200 shadow-sm text-xs text-slate-600">
                  <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div> Sodium (Na⁺)
                  </div>
                  <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div> Chloride (Cl⁻)
                  </div>
              </div>

              <button 
                onClick={() => setIsExploded(!isExploded)}
                className="absolute top-4 right-4 z-10 bg-white hover:bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-sm text-slate-600 transition-colors"
                title="Toggle Exploded View"
              >
                  {isExploded ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>

              {/* 3D Scene Container */}
              <div 
                className="w-0 h-0 relative preserve-3d"
                style={{ transform: `rotateX(-20deg) rotateY(${rotation}deg)` }}
              >
                  {atoms.map((atom, i) => (
                      <div
                        key={i}
                        className={`absolute rounded-full flex items-center justify-center text-white font-bold text-xs border border-black/10 shadow-inner
                            ${atom.isPos 
                                ? 'bg-blue-500 w-8 h-8' // Na+ is smaller
                                : 'bg-green-500 w-12 h-12' // Cl- is larger
                            }
                        `}
                        style={{
                            transform: `translate3d(${atom.x * spacing}px, ${atom.y * spacing}px, ${atom.z * spacing}px)`,
                            // Sort z-index roughly for simple occlusion (not perfect but works for simple cubes)
                            zIndex: Math.round((atom.z * 10) + 50)
                        }}
                      >
                          {isExploded && (atom.isPos ? '+' : '-')}
                      </div>
                  ))}
                  
                  {/* Ionic Bonds (Lines) - Only show in exploded view to reduce clutter */}
                  {isExploded && atoms.map((atom, i) => (
                      <React.Fragment key={`lines-${i}`}>
                          {/* Draw lines to neighbors if they exist */}
                          {/* We only draw 3 lines per atom to avoid duplicates (Right, Down, Back) */}
                      </React.Fragment>
                  ))}
              </div>
              
              <div className="absolute bottom-8 text-center pointer-events-none">
                  <h3 className="font-black text-slate-700 uppercase tracking-widest text-sm mb-1">Giant Ionic Lattice</h3>
                  <p className="text-xs text-slate-500">Regular cubic arrangement (3D)</p>
              </div>
          </div>
      );
  };

  const renderBrittleness = () => {
      // Two rows of 4 ions
      const rowTop = [true, false, true, false]; // + - + -
      const rowBot = [false, true, false, true]; // - + - +

      return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-50 overflow-hidden">
              
              {/* Force Arrow */}
              <div 
                className={`absolute left-[10%] top-[40%] flex items-center transition-opacity duration-300 ${brittleStage === 'IDLE' ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
              >
                  <span className="font-black text-slate-400 mr-2 text-xs uppercase">Strike</span>
                  <ArrowRight className="w-12 h-12 text-slate-800" />
              </div>

              {/* CRYSTAL CONTAINER */}
              <div className="relative">
                  
                  {/* TOP ROW */}
                  <div 
                    className={`flex gap-1 mb-1 transition-all duration-500 ease-out`}
                    style={{ 
                        transform: 
                            brittleStage === 'IDLE' ? 'translateX(0)' : 
                            brittleStage === 'SHIFTING' ? 'translateX(52px)' : // Shift right by 1 ion width (48px + 4px gap)
                            'translateX(52px) translateY(-60px) rotate(5deg)' // Fly away
                    }}
                  >
                      {rowTop.map((isPos, i) => (
                          <div key={`t-${i}`} className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 shadow-sm ${isPos ? 'bg-blue-500 border-blue-600' : 'bg-green-500 border-green-600'}`}>
                              {isPos ? '+' : '-'}
                          </div>
                      ))}
                  </div>

                  {/* REPULSION ARROWS (Visualizing the force) */}
                  <div 
                    className={`absolute inset-0 flex justify-center items-center pointer-events-none transition-opacity duration-200 z-10 ${brittleStage === 'REPELLING' ? 'opacity-100' : 'opacity-0'}`}
                    style={{ left: '52px' }} // Align with shifted top row
                  >
                      {/* Arrows appearing between aligned ions */}
                      <div className="flex gap-1 w-full justify-start">
                          <div className="w-12 flex justify-center"><Zap className="w-8 h-8 text-yellow-500 fill-yellow-400 animate-ping" /></div>
                          <div className="w-12 flex justify-center"><Zap className="w-8 h-8 text-yellow-500 fill-yellow-400 animate-ping delay-75" /></div>
                          <div className="w-12 flex justify-center"><Zap className="w-8 h-8 text-yellow-500 fill-yellow-400 animate-ping" /></div>
                      </div>
                  </div>

                  {/* BOTTOM ROW */}
                  <div 
                    className={`flex gap-1 transition-all duration-500 ease-out`}
                    style={{ 
                        transform: 
                            brittleStage === 'BROKEN' ? 'translateY(60px) rotate(-5deg)' : 'none'
                    }}
                  >
                      {rowBot.map((isPos, i) => (
                          <div key={`b-${i}`} className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 shadow-sm ${isPos ? 'bg-blue-500 border-blue-600' : 'bg-green-500 border-green-600'}`}>
                              {isPos ? '+' : '-'}
                          </div>
                      ))}
                  </div>

              </div>

              {/* Status / Controls */}
              <div className="absolute bottom-10 flex flex-col items-center">
                  <div className="h-12 mb-4 text-center">
                      {brittleStage === 'IDLE' && <p className="text-slate-500 text-sm">Layers are aligned. Opposite charges attract.</p>}
                      {brittleStage === 'SHIFTING' && <p className="text-slate-800 font-bold text-sm">Force applied! Layers sliding...</p>}
                      {brittleStage === 'REPELLING' && <p className="text-rose-600 font-black text-sm uppercase animate-pulse">LIKE CHARGES ALIGNED!</p>}
                      {brittleStage === 'BROKEN' && <p className="text-slate-500 text-sm">Repulsion causes the crystal to cleave apart.</p>}
                  </div>

                  {brittleStage === 'IDLE' ? (
                      <button 
                        onClick={() => setBrittleStage('SHIFTING')}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                      >
                          <Hammer className="w-5 h-5" /> APPLY FORCE
                      </button>
                  ) : (
                      <button 
                        onClick={reset}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors"
                      >
                          <RotateCcw className="w-4 h-4" /> Reset Crystal
                      </button>
                  )}
              </div>
          </div>
      );
  };

  const renderMelting = () => {
      return (
          <div className="w-full h-full flex flex-col items-center bg-slate-50 p-6">
              
              {/* Particle Container */}
              <div className="relative w-full max-w-md aspect-square bg-white rounded-2xl border-4 border-slate-200 shadow-inner overflow-hidden mb-6">
                  {/* Background Glow for Heat */}
                  <div 
                    className="absolute inset-0 bg-orange-500 transition-opacity duration-300 pointer-events-none"
                    style={{ opacity: (temp - 20) / 2000 }}
                  ></div>

                  {particles.map(p => (
                      <div
                        key={p.id}
                        className={`absolute w-6 h-6 rounded-full shadow-sm border ${p.type === 'POS' ? 'bg-blue-500 border-blue-600' : 'bg-green-500 border-green-600'}`}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                  ))}
                  
                  {/* Overlay Label */}
                  <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-bold text-slate-500">
                      {temp < 800 ? 'Solid Lattice' : 'Molten Liquid'}
                  </div>
              </div>

              {/* Controls */}
              <div className="w-full max-w-md bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${temp > 800 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                              <Flame className="w-5 h-5" />
                          </div>
                          <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Temperature</p>
                              <p className={`text-xl font-black ${temp > 800 ? 'text-orange-600' : 'text-slate-700'}`}>{temp}°C</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">State</p>
                          <p className="text-sm font-bold text-indigo-600">{temp >= 800 ? 'LIQUID' : 'SOLID'}</p>
                      </div>
                  </div>

                  <input 
                    type="range" min="20" max="1200" step="10"
                    value={temp}
                    onChange={(e) => setTemp(Number(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  
                  <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-300 uppercase">
                      <span>20°C</span>
                      <span className="text-orange-400">MP: 801°C (NaCl)</span>
                      <span>1200°C</span>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="my-10 bg-white rounded-3xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none ring-4 ring-indigo-50 h-[600px] flex flex-col">
      
      {/* Header Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
          <button 
            onClick={() => handleModeChange('STRUCTURE')}
            className={`flex-1 py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-4 ${mode === 'STRUCTURE' ? 'bg-white text-indigo-700 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'}`}
          >
              <Box className="w-4 h-4" /> 3D Structure
          </button>
          <button 
            onClick={() => handleModeChange('BRITTLE')}
            className={`flex-1 py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-4 ${mode === 'BRITTLE' ? 'bg-white text-rose-700 border-rose-600' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'}`}
          >
              <Hammer className="w-4 h-4" /> Brittleness
          </button>
          <button 
            onClick={() => handleModeChange('MELT')}
            className={`flex-1 py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-4 ${mode === 'MELT' ? 'bg-white text-orange-700 border-orange-600' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'}`}
          >
              <Flame className="w-4 h-4" /> Melting
          </button>
      </div>

      {/* Viewport */}
      <div className="flex-1 bg-white relative overflow-hidden">
          {mode === 'STRUCTURE' && render3DStructure()}
          {mode === 'BRITTLE' && renderBrittleness()}
          {mode === 'MELT' && renderMelting()}
      </div>

    </div>
  );
};

export default IonicLatticeSim;
