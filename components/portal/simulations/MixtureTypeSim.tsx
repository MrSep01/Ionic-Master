
import React, { useState } from 'react';
import { Search, Eye, ArrowLeft } from 'lucide-react';

const MixtureTypeSim: React.FC = () => {
  const [type, setType] = useState<'HOMO' | 'HETERO'>('HOMO');
  
  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden select-none">
      
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-500" />
          Mixture Microscope
        </h3>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
            <button 
                onClick={() => setType('HOMO')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${type === 'HOMO' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Homogeneous
            </button>
            <button 
                onClick={() => setType('HETERO')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${type === 'HETERO' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
                Heterogeneous
            </button>
        </div>
      </div>

      <div className="p-8 bg-slate-800 flex flex-col items-center gap-8 min-h-[400px] justify-center relative overflow-hidden">
        
        {/* Beaker */}
        <div className="relative w-40 h-56 border-x-4 border-b-4 border-white/20 rounded-b-3xl bg-white/5 backdrop-blur-sm">
            {/* Liquid */}
            <div className={`absolute bottom-0 w-full h-3/4 transition-colors duration-500 ${type === 'HOMO' ? 'bg-blue-500/40' : 'bg-amber-600/40'}`}></div>
            
            {/* Particles (Microscope View) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-white shadow-2xl bg-black overflow-hidden z-20 flex items-center justify-center scale-150">
                <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
                {type === 'HOMO' ? (
                    // Uniform Distribution
                    <div className="w-full h-full relative">
                        {Array.from({length: 30}).map((_, i) => (
                            <div 
                                key={i} 
                                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-80"
                                style={{ 
                                    left: `${Math.random() * 100}%`, 
                                    top: `${Math.random() * 100}%` 
                                }}
                            ></div>
                        ))}
                        {Array.from({length: 30}).map((_, i) => (
                            <div 
                                key={i+100} 
                                className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60"
                                style={{ 
                                    left: `${Math.random() * 100}%`, 
                                    top: `${Math.random() * 100}%` 
                                }}
                            ></div>
                        ))}
                    </div>
                ) : (
                    // Clumped Distribution (Heterogeneous)
                    <div className="w-full h-full relative">
                        {/* Layer 1: Oil/Sand */}
                        <div className="absolute top-0 w-full h-1/2 bg-amber-500/20 border-b border-white/10">
                             {Array.from({length: 40}).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="absolute w-3 h-3 bg-amber-500 rounded-full opacity-90"
                                    style={{ 
                                        left: `${Math.random() * 100}%`, 
                                        top: `${Math.random() * 80}%` 
                                    }}
                                ></div>
                            ))}
                        </div>
                        {/* Layer 2: Water */}
                        <div className="absolute bottom-0 w-full h-1/2 bg-blue-500/10">
                             {Array.from({length: 40}).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
                                    style={{ 
                                        left: `${Math.random() * 100}%`, 
                                        top: `${Math.random() * 80 + 10}%` 
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <div className="w-full h-px bg-white"></div>
                    <div className="h-full w-px bg-white absolute"></div>
                </div>
            </div>
            
            {/* Label */}
            <div className="absolute -right-24 top-1/2 text-white/80 text-xs font-bold flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> 500x Zoom
            </div>
        </div>

        <div className="text-center text-white/80 max-w-md">
            <h4 className="text-lg font-bold mb-1">{type === 'HOMO' ? 'Solution (Homogeneous)' : 'Suspension/Emulsion (Heterogeneous)'}</h4>
            <p className="text-xs opacity-70">
                {type === 'HOMO' 
                    ? 'Particles are completely mixed at the atomic/molecular level. The mixture looks the same throughout (uniform).' 
                    : 'Particles are not evenly mixed. You can see separate phases or clumps. The composition varies from point to point.'}
            </p>
        </div>

      </div>
    </div>
  );
};

export default MixtureTypeSim;
