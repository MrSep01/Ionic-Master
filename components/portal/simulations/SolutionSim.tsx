
import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, Thermometer, Zap, RotateCcw } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'WATER' | 'SOLUTE';
  isDissolved: boolean;
}

const SolutionSim: React.FC = () => {
  const [temp, setTemp] = useState(20); // 0 to 100 C
  const [isStirring, setIsStirring] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<number | null>(null);

  // Initialize Simulation
  const init = () => {
    const newParticles: Particle[] = [];
    
    // Create Water Particles (Solvent) - Spread randomly
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 80, // Top 80%
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        type: 'WATER',
        isDissolved: true
      });
    }

    // Create Crystal Lattice (Solute) - Grid at bottom
    let idCounter = 100;
    const rows = 4;
    const cols = 6;
    const startX = 35; // Percent
    const startY = 75; // Percent
    const gap = 5;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newParticles.push({
          id: idCounter++,
          x: startX + (c * gap),
          y: startY + (r * gap),
          vx: 0,
          vy: 0,
          type: 'SOLUTE',
          isDissolved: false
        });
      }
    }

    setParticles(newParticles);
  };

  useEffect(() => {
    init();
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, []);

  // Animation Loop
  const animate = () => {
    setParticles(prev => {
      // Speed factor based on Temp and Stirring
      const speedFactor = 0.2 + (temp / 100) * 0.8 + (isStirring ? 0.5 : 0);
      const latticeBreakProb = 0.005 + (temp / 2000) + (isStirring ? 0.02 : 0);

      return prev.map(p => {
        let { x, y, vx, vy, isDissolved, type } = p;

        if (type === 'WATER') {
          // Random Brownian Motion
          vx += (Math.random() - 0.5) * 0.1;
          vy += (Math.random() - 0.5) * 0.1;
          
          // Apply speed limit
          const maxSpeed = speedFactor;
          vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
          vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));

          x += vx;
          y += vy;

          // Bounce off walls
          if (x <= 0 || x >= 96) vx *= -1;
          if (y <= 0 || y >= 96) vy *= -1;
        } 
        
        else if (type === 'SOLUTE') {
          if (isDissolved) {
            // Move like water but slower (heavier)
            vx += (Math.random() - 0.5) * 0.05;
            vy += (Math.random() - 0.5) * 0.05;
            
            const maxSpeed = speedFactor * 0.6;
            vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
            vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));

            x += vx;
            y += vy;

            if (x <= 0 || x >= 96) vx *= -1;
            if (y <= 0 || y >= 96) vy *= -1;
          } else {
            // Chance to break free if "hit" by energy (simplified probability)
            if (Math.random() < latticeBreakProb) {
              isDissolved = true;
              // Initial pop up
              vy = -0.5 * speedFactor;
              vx = (Math.random() - 0.5) * speedFactor;
            }
          }
        }

        return { ...p, x, y, vx, vy, isDissolved };
      });
    });

    reqRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    reqRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [temp, isStirring]);

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden select-none">
      
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Play className="w-5 h-5 text-blue-500" />
          Microscopic View: Dissolving
        </h3>
        <button 
            onClick={init}
            className="bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
        >
            <RotateCcw className="w-3 h-3" /> Reset Crystal
        </button>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 bg-slate-50">
        
        {/* Simulation Viewport */}
        <div className="relative h-80 w-full bg-white rounded-2xl border-4 border-slate-200 shadow-inner overflow-hidden group">
            
            {/* Water Background */}
            <div className="absolute inset-0 bg-blue-50/30"></div>
            
            {/* Particles */}
            {particles.map(p => (
                <div 
                    key={p.id}
                    className={`absolute rounded-full shadow-sm transition-colors duration-500
                        ${p.type === 'WATER' 
                            ? 'w-3 h-3 bg-blue-300/60 border border-blue-400/30' 
                            : `w-4 h-4 border ${p.isDissolved ? 'bg-orange-400 border-orange-500 shadow-md' : 'bg-orange-500 border-orange-600 rounded-sm'}`
                        }
                    `}
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        transition: 'background-color 0.3s' 
                    }}
                ></div>
            ))}

            {/* Labels */}
            <div className="absolute top-2 left-2 text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-white/80 px-2 py-1 rounded">
                Solvent (Water)
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] font-bold text-orange-500 uppercase tracking-wider bg-white/80 px-2 py-1 rounded">
                Solute (Salt)
            </div>

        </div>

        {/* Controls */}
        <div className="w-full md:w-64 flex flex-col gap-6">
            
            {/* Temperature Control */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-slate-500 uppercase flex items-center gap-2">
                        <Thermometer className="w-4 h-4" /> Temperature
                    </span>
                    <span className={`text-sm font-bold ${temp > 50 ? 'text-rose-500' : 'text-blue-500'}`}>
                        {temp}°C
                    </span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={temp} 
                    onChange={(e) => setTemp(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                    Higher temperature increases particle kinetic energy, breaking the crystal lattice faster.
                </p>
            </div>

            {/* Stirring Control */}
            <button
                onMouseDown={() => setIsStirring(true)}
                onMouseUp={() => setIsStirring(false)}
                onMouseLeave={() => setIsStirring(false)}
                onTouchStart={() => setIsStirring(true)}
                onTouchEnd={() => setIsStirring(false)}
                className={`p-4 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 select-none
                    ${isStirring 
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-700 shadow-inner' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600 shadow-sm hover:shadow-md'
                    }
                `}
            >
                <RefreshCw className={`w-5 h-5 ${isStirring ? 'animate-spin' : ''}`} />
                {isStirring ? 'STIRRING...' : 'HOLD TO STIR'}
            </button>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
                <div className="flex gap-2 mb-1">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-xs font-bold text-amber-800 uppercase">Concept Check</span>
                </div>
                <p className="text-[10px] text-amber-700 leading-relaxed">
                    Dissolving happens when solvent particles collide with the solute and surround them. It is NOT melting.
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SolutionSim;
