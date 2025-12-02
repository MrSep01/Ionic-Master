
import React, { useState } from 'react';
import { Plus, Minus, Info, Atom } from 'lucide-react';

type ElementType = 'Cl' | 'S' | 'N' | 'P';

const OxyanionBuilderSim: React.FC = () => {
  const [element, setElement] = useState<ElementType>('Cl');
  const [oxygenCount, setOxygenCount] = useState(3); // Start with standard "ate"

  // Data Definitions
  const definitions: Record<ElementType, {
    name: string;
    symbol: string;
    charge: number;
    color: string;
    maxO: number;
    baseO: number; // The amount for "-ate"
    forms: Record<number, string>;
  }> = {
    Cl: {
      name: 'Chlorine',
      symbol: 'Cl',
      charge: -1,
      color: 'border-green-500 bg-green-100 text-green-800',
      maxO: 4,
      baseO: 3,
      forms: {
        0: 'Chloride',
        1: 'Hypochlorite',
        2: 'Chlorite',
        3: 'Chlorate',
        4: 'Perchlorate'
      }
    },
    S: {
      name: 'Sulfur',
      symbol: 'S',
      charge: -2,
      color: 'border-amber-500 bg-amber-100 text-amber-800',
      maxO: 4,
      baseO: 4,
      forms: {
        0: 'Sulfide',
        3: 'Sulfite',
        4: 'Sulfate'
      }
    },
    N: {
      name: 'Nitrogen',
      symbol: 'N',
      charge: -1,
      color: 'border-blue-500 bg-blue-100 text-blue-800',
      maxO: 3,
      baseO: 3,
      forms: {
        0: 'Nitride',
        2: 'Nitrite',
        3: 'Nitrate'
      }
    },
    P: {
      name: 'Phosphorus',
      symbol: 'P',
      charge: -3,
      color: 'border-purple-500 bg-purple-100 text-purple-800',
      maxO: 4,
      baseO: 4,
      forms: {
        0: 'Phosphide',
        3: 'Phosphite',
        4: 'Phosphate'
      }
    }
  };

  const currentData = definitions[element];
  const currentName = currentData.forms[oxygenCount] || 'Unstable/Unknown';
  
  // Naming Rule Logic
  const getRuleDescription = () => {
    if (oxygenCount === 0) return "No Oxygen. The elemental anion ending in '-ide'.";
    if (oxygenCount === currentData.baseO) return "The standard form. Ends in '-ate'.";
    if (oxygenCount === currentData.baseO - 1) return "One less oxygen than standard. Ends in '-ite'.";
    if (oxygenCount === currentData.baseO - 2) return "Two less oxygens. Prefix 'hypo-' and suffix '-ite'.";
    if (oxygenCount === currentData.baseO + 1) return "One extra oxygen. Prefix 'per-' and suffix '-ate'.";
    return "Intermediate or less common form.";
  };

  const handleElementChange = (el: ElementType) => {
    setElement(el);
    setOxygenCount(definitions[el].baseO); // Reset to "ate" form
  };

  return (
    <div className="my-10 bg-white rounded-3xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none ring-4 ring-indigo-50">
      
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Atom className="w-5 h-5 text-indigo-500" />
          Oxyanion Constructor
        </h3>
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
          {(Object.keys(definitions) as ElementType[]).map((el) => (
            <button
              key={el}
              onClick={() => handleElementChange(el)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                element === el 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              {definitions[el].name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-10 flex flex-col md:flex-row gap-10 items-center justify-center bg-slate-50/50">
        
        {/* Visualizer Area */}
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Orbits / Bonds */}
            {oxygenCount > 0 && (
                <div className="absolute inset-0 animate-spin-slow opacity-20 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" className="text-slate-400" />
                    </svg>
                </div>
            )}

            {/* Central Atom */}
            <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 ${currentData.color} transition-all duration-500`}>
                <span className="text-2xl font-black">{currentData.symbol}</span>
                {/* Charge Bubble */}
                <div className="absolute -top-2 -right-2 bg-slate-800 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    {currentData.charge < 0 ? currentData.charge : `+${currentData.charge}`}
                </div>
            </div>

            {/* Oxygen Atoms */}
            {Array.from({ length: oxygenCount }).map((_, i) => {
                const angle = (i / oxygenCount) * 2 * Math.PI - (Math.PI / 2);
                const radius = 60; // Distance from center
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <div 
                        key={i}
                        className="absolute w-12 h-12 bg-rose-100 border-2 border-rose-300 text-rose-700 rounded-full flex items-center justify-center shadow-sm font-bold animate-in zoom-in duration-300"
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                        O
                    </div>
                );
            })}
        </div>

        {/* Controls & Info */}
        <div className="flex-1 w-full max-w-sm space-y-6">
            
            {/* Display Box */}
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current Ion</p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-1 transition-all">
                    {currentName}
                </h2>
                <div className="font-mono text-xl font-bold text-indigo-600 bg-indigo-50 inline-block px-4 py-1 rounded-lg border border-indigo-100 mt-2">
                    {currentData.symbol}{oxygenCount > 0 ? `O` : ''}{oxygenCount > 1 ? <sub>{oxygenCount}</sub> : ''}
                    <sup className="-top-1">{Math.abs(currentData.charge)}-</sup>
                </div>
            </div>

            {/* Oxygen Controls */}
            <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <button
                    onClick={() => setOxygenCount(c => Math.max(0, c - 1))}
                    disabled={oxygenCount === 0 || (element === 'S' && oxygenCount === 3) || (element === 'N' && oxygenCount === 2) || (element === 'P' && oxygenCount === 3)} 
                    className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <Minus className="w-6 h-6" />
                </button>
                
                <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Oxygen Atoms</p>
                    <p className="text-xl font-black text-slate-800">{oxygenCount}</p>
                </div>

                <button
                    onClick={() => setOxygenCount(c => Math.min(currentData.maxO, c + 1))}
                    disabled={oxygenCount === currentData.maxO || (element === 'S' && oxygenCount === 0) || (element === 'N' && oxygenCount === 0)}
                    className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-600 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </div>

            {/* Explanation Box */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-indigo-900 text-xs uppercase tracking-wide mb-1">Naming Rule</h4>
                        <p className="text-sm text-indigo-800 leading-snug">
                            {getRuleDescription()}
                        </p>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default OxyanionBuilderSim;
