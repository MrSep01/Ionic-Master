
import React, { useState, useEffect, useRef } from 'react';
import { Layers, Hammer, Flame, RotateCcw, ArrowRight, Zap, Box, Grid, Play, Pause } from 'lucide-react';

type Mode = '2D_LATTICE' | '3D_CUBE' | 'BRITTLE' | 'MELT';

const IonicLatticeSim: React.FC = () => {
  const [mode, setMode] = useState<Mode>('2D_LATTICE');
  
  // --- 3D ROTATION STATE ---
  const [rotation, setRotation] = useState({ x: -20, y: 45 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // --- BRITTLE MODE STATE ---
  const [brittleStage, setBrittleStage] = useState<'IDLE' | 'SHIFTING' | 'REPELLING' | 'BROKEN'>('IDLE');
  
  // --- MELT MODE STATE ---
  const [temp, setTemp] = useState(20);
  const [particles, setParticles] = useState<{id: number, x: number, y: number, vx: number, vy: number, type: 'POS' | 'NEG'}[]>([]);

  // --- ANIMATION REFS ---
  const reqRef = useRef<number | null>(null);

  const reset = () => {
    setBrittleStage('IDLE');
    setTemp(20);
    initMeltParticles();
    if (reqRef.current) cancelAnimationFrame(reqRef.current);
  };

  const handleModeChange = (m: Mode) => {
    reset();
    setMode(m);
  };

  // --- 3D ROTATION LOOP ---
  useEffect(() => {
    if (mode === '3D_CUBE' && isAutoRotating) {
      const loop = () => {
        setRotation(prev => ({ ...prev, y: (prev.y + 0.5) % 360 }));
        reqRef.current = requestAnimationFrame(loop);
      };
      loop();
    }
    return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [mode, isAutoRotating]);

  // --- BRITTLE ANIMATION ---
  useEffect(() => {
      if (mode === 'BRITTLE' && brittleStage === 'SHIFTING') {
          const timer = setTimeout(() => {
              setBrittleStage('REPELLING');
          }, 600);
          return () => clearTimeout(timer);
      }
      if (mode === 'BRITTLE' && brittleStage === 'REPELLING') {
          const timer = setTimeout(() => {
              setBrittleStage('BROKEN');
          }, 800);
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
                  x: 30 + x * 10,
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
                  const vibration = temp / 200;
                  
                  if (temp < 800) {
                      // Solid behavior
                      const anchorX = 30 + (p.id % 5) * 10;
                      const anchorY = 30 + Math.floor(p.id / 5) * 10;
                      vx += (anchorX - x) * 0.1;
                      vy += (anchorY - y) * 0.1;
                      vx += (Math.random() - 0.5) * vibration;
                      vy += (Math.random() - 0.5) * vibration;
                      vx *= 0.8;
                      vy *= 0.8;
                  } else {
                      // Liquid behavior
                      vx += (Math.random() - 0.5) * 0.5;
                      vy += (Math.random() - 0.5) * 0.5;
                      vx += (50 - x) * 0.001; // Weak gravity/cohesion
                      vy += (50 - y) * 0.001;
                      if (x < 10) vx += 0.5;
                      if (x > 90) vx -= 0.5;
                      if (y < 10) vy += 0.5;
                      if (y > 90) vy -= 0.5;
                      const speed = Math.sqrt(vx*vx + vy*vy);
                      if (speed > 2) { vx = (vx/speed)*2; vy = (vy/speed)*2; }
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

  const render2DLattice = () => {
      const gridSize = 5;
      const cells = [];
      for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
              const isPos = (x + y) % 2 === 0;
              cells.push({ x, y, isPos });
          }
      }

      return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 relative">
              <div className="grid grid-cols-5 gap-2 p-8 bg-white rounded-xl shadow-sm border border-slate-200">
                  {cells.map((cell, i) => (
                      <div 
                        key={i}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm border-2
                            ${cell.isPos ? 'bg-blue-500 border-blue-600' : 'bg-green-500 border-green-600'}
                        `}
                      >
                          {cell.isPos ? '+' : '-'}
                      </div>
                  ))}
              </div>
              <div className="mt-8 text-center text-slate-500 text-sm max-w-xs">
                  <p className="font-bold mb-1 text-slate-800">Giant Ionic Lattice (2D Slice)</p>
                  <p className="text-xs leading-relaxed">Notice the regular alternating arrangement. Every positive ion is surrounded by negative ions, and vice versa.</p>
              </div>
          </div>
      );
  };

  const render3DCube = () => {
      // 2x2x2 Cube
      const size = 2;
      const spacing = 100; // px
      const offset = (size - 1) * spacing / 2;
      
      const ions = [];
      // Generate Ions
      for (let z = 0; z < size; z++) {
          for (let y = 0; y < size; y++) {
              for (let x = 0; x < size; x++) {
                  ions.push({ x, y, z, isPos: (x+y+z)%2 === 0 });
              }
          }
      }

      // Generate Connections (Edges of cube)
      const connections = [];
      // Horizontal (x)
      for (let z = 0; z < size; z++) {
          for (let y = 0; y < size; y++) {
              for (let x = 0; x < size - 1; x++) {
                  connections.push({ 
                      x: x * spacing + spacing/2, 
                      y: y * spacing, 
                      z: z * spacing, 
                      axis: 'X' 
                  });
              }
          }
      }
      // Vertical (y)
      for (let z = 0; z < size; z++) {
          for (let x = 0; x < size; x++) {
              for (let y = 0; y < size - 1; y++) {
                  connections.push({ 
                      x: x * spacing, 
                      y: y * spacing + spacing/2, 
                      z: z * spacing, 
                      axis: 'Y' 
                  });
              }
          }
      }
      // Depth (z)
      for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
              for (let z = 0; z < size - 1; z++) {
                  connections.push({ 
                      x: x * spacing, 
                      y: y * spacing, 
                      z: z * spacing + spacing/2, 
                      axis: 'Z' 
                  });
              }
          }
      }

      return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
              <div 
                className="relative preserve-3d transition-transform duration-100 ease-linear"
                style={{ 
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d',
                    width: '0px',
                    height: '0px'
                }}
              >
                  {/* Draw Connections (Forces) */}
                  {connections.map((c, i) => (
                      <div 
                        key={`conn-${i}`}
                        className="absolute bg-slate-400 opacity-50"
                        style={{
                            width: c.axis === 'X' ? `${spacing}px` : '4px',
                            height: c.axis === 'Y' ? `${spacing}px` : '4px',
                            transform: `
                                translate3d(${c.x * 1 - offset - (c.axis==='X'?spacing/2:2)}px, ${c.y * 1 - offset - (c.axis==='Y'?spacing/2:2)}px, ${c.z * 1 - offset}px)
                                ${c.axis === 'Z' ? `rotateX(90deg) scaleY(${spacing/4})` : ''} 
                            `,
                        }}
                      >
                      </div>
                  ))}
                  
                  {/* Better Z-Axis Lines */}
                  {connections.filter(c => c.axis === 'Z').map((c, i) => (
                       <div 
                        key={`z-conn-${i}`}
                        className="absolute bg-slate-400 opacity-50"
                        style={{
                            width: `4px`,
                            height: `${spacing}px`,
                            transformOrigin: 'top center',
                            transform: `translate3d(${c.x - offset - 2}px, ${c.y - offset}px, ${c.z - offset}px) rotateX(90deg)`
                        }}
                      />
                  ))}

                  {/* Draw Ions */}
                  {ions.map((ion, i) => (
                      <div
                        key={`ion-${i}`}
                        className={`absolute rounded-full flex items-center justify-center text-white font-bold border-2 border-white/20 shadow-xl backface-hidden
                            ${ion.isPos ? 'bg-blue-500 w-12 h-12 text-sm' : 'bg-green-500 w-16 h-16 text-lg'}
                        `}
                        style={{
                            transform: `translate3d(${ion.x * spacing - offset - (ion.isPos?24:32)}px, ${ion.y * spacing - offset - (ion.isPos?24:32)}px, ${ion.z * spacing - offset}px)`,
                        }}
                      >
                          {ion.isPos ? '+' : '-'}
                      </div>
                  ))}
              </div>

              <div className="absolute bottom-8 flex gap-4 text-xs font-bold bg-white/80 p-3 rounded-xl backdrop-blur-sm shadow-sm border border-white/50">
                  <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div> Cation
                  </div>
                  <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div> Anion
                  </div>
                  <div className="flex items-center gap-2 pl-4 border-l border-slate-300">
                      <div className="w-8 h-1 bg-slate-400 rounded-full"></div> Electrostatic Force
                  </div>
              </div>
              
              <button 
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className="absolute top-4 right-4 bg-white hover:bg-slate-50 p-3 rounded-xl shadow-sm border border-slate-200 transition-colors"
              >
                  {isAutoRotating ? <Pause className="w-4 h-4 text-slate-700" /> : <Play className="w-4 h-4 text-slate-700" />}
              </button>
          </div>
      );
  };

  const renderBrittleness = () => {
      // Two rows of 4 ions (2D)
      const rowTop = [true, false, true, false]; // + - + -
      const rowBot = [false, true, false, true]; // - + - +

      return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-50 overflow-hidden">
              
              <div 
                className={`absolute left-[10%] top-[35%] flex items-center transition-opacity duration-300 ${brittleStage === 'IDLE' ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
              >
                  <span className="font-black text-slate-400 mr-2 text-xs uppercase">Strike</span>
                  <ArrowRight className="w-12 h-12 text-slate-800" />
              </div>

              <div className="relative scale-125">
                  {/* TOP ROW */}
                  <div 
                    className={`flex gap-1 mb-1 transition-all duration-500 ease-out`}
                    style={{ 
                        transform: 
                            brittleStage === 'IDLE' ? 'translateX(0)' : 
                            brittleStage === 'SHIFTING' ? 'translateX(52px)' : 
                            'translateX(52px) translateY(-60px) rotate(15deg)'
                    }}
                  >
                      {rowTop.map((isPos, i) => (
                          <div key={`t-${i}`} className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 shadow-sm ${isPos ? 'bg-blue-500 border-blue-600' : 'bg-green-500 border-green-600'}`}>
                              {isPos ? '+' : '-'}
                          </div>
                      ))}
                  </div>

                  {/* REPULSION ARROWS */}
                  <div 
                    className={`absolute inset-0 flex justify-center items-center pointer-events-none transition-opacity duration-200 z-10 ${brittleStage === 'REPELLING' ? 'opacity-100' : 'opacity-0'}`}
                    style={{ left: '52px' }} 
                  >
                      <div className="flex gap-1 w-full justify-start pl-2">
                          <Zap className="w-10 h-10 text-yellow-500 fill-yellow-400 animate-ping absolute top-1 left-2" />
                          <Zap className="w-10 h-10 text-yellow-500 fill-yellow-400 animate-ping delay-75 absolute top-1 left-14" />
                          <Zap className="w-10 h-10 text-yellow-500 fill-yellow-400 animate-ping delay-100 absolute top-1 left-28" />
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

              <div className="absolute bottom-8 flex flex-col items-center">
                  <div className="h-10 mb-4 text-center">
                      {brittleStage === 'IDLE' && <p className="text-slate-500 text-sm">Opposite charges aligned. Strong attraction.</p>}
                      {brittleStage === 'SHIFTING' && <p className="text-slate-800 font-bold text-sm">Force shifts the top layer...</p>}
                      {brittleStage === 'REPELLING' && <p className="text-rose-600 font-black text-sm uppercase">LIKE CHARGES REPEL!</p>}
                      {brittleStage === 'BROKEN' && <p className="text-slate-500 text-sm font-medium">The crystal shatters.</p>}
                  </div>

                  {brittleStage === 'IDLE' ? (
                      <button 
                        onClick={() => setBrittleStage('SHIFTING')}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                      >
                          <Hammer className="w-5 h-5" /> HIT CRYSTAL
                      </button>
                  ) : (
                      <button 
                        onClick={reset}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors"
                      >
                          <RotateCcw className="w-4 h-4" /> Reset
                      </button>
                  )}
              </div>
          </div>
      );
  };

  const renderMelting = () => {
      return (
          <div className="w-full h-full flex flex-col items-center bg-slate-50 p-6">
              
              <div className="relative w-full max-w-md aspect-square bg-white rounded-2xl border-4 border-slate-200 shadow-inner overflow-hidden mb-6">
                  {/* Heat Glow */}
                  <div 
                    className="absolute inset-0 bg-orange-500 transition-opacity duration-300 pointer-events-none"
                    style={{ opacity: (temp - 20) / 2000 }}
                  ></div>

                  {particles.map(p => (
                      <div
                        key={p.id}
                        className={`absolute w-8 h-8 rounded-full shadow-sm border-2 flex items-center justify-center font-bold text-white text-xs
                            ${p.type === 'POS' ? 'bg-blue-500 border-blue-600' : 'bg-green-500 border-green-600'}
                        `}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                      >
                          {p.type === 'POS' ? '+' : '-'}
                      </div>
                  ))}
                  
                  <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 rounded text-xs font-bold text-slate-500">
                      {temp < 800 ? 'Solid (Vibrating)' : 'Liquid (Flowing)'}
                  </div>
              </div>

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
    <div className="my-10 bg-white rounded-3xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none ring-4 ring-indigo-50 h-[650px] flex flex-col">
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 shrink-0 overflow-x-auto">
          <button 
            onClick={() => handleModeChange('2D_LATTICE')}
            className={`flex-1 min-w-[100px] py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-4 ${mode === '2D_LATTICE' ? 'bg-white text-indigo-700 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'}`}
          >
              <Grid className="w-4 h-4" /> 2D Lattice
          </button>
          <button 
            onClick={() => handleModeChange('3D_CUBE')}
            className={`flex-1 min-w-[100px] py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-4 ${mode === '3D_CUBE' ? 'bg-white text-indigo-700 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'}`}
          >
              <Box className="w-4 h-4" /> 3D Unit Cell
          </button>
          <button 
            onClick={() => handleModeChange('BRITTLE')}
            className={`flex-1 min-w-[100px] py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-4 ${mode === 'BRITTLE' ? 'bg-white text-rose-700 border-rose-600' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'}`}
          >
              <Hammer className="w-4 h-4" /> Brittleness
          </button>
          <button 
            onClick={() => handleModeChange('MELT')}
            className={`flex-1 min-w-[100px] py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-4 ${mode === 'MELT' ? 'bg-white text-orange-700 border-orange-600' : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'}`}
          >
              <Flame className="w-4 h-4" /> Melting
          </button>
      </div>

      {/* Viewport */}
      <div className="flex-1 bg-white relative overflow-hidden">
          {mode === '2D_LATTICE' && render2DLattice()}
          {mode === '3D_CUBE' && render3DCube()}
          {mode === 'BRITTLE' && renderBrittleness()}
          {mode === 'MELT' && renderMelting()}
      </div>

    </div>
  );
};

export default IonicLatticeSim;
