
import React, { useState } from 'react';
import { TrendingUp, Calculator, Snowflake, Info, Thermometer } from 'lucide-react';

const SolubilityCurveSim: React.FC = () => {
  const [temp, setTemp] = useState(50);
  const [selectedSalt, setSelectedSalt] = useState<'KNO3' | 'NaCl' | 'Gas'>('KNO3');
  const [mode, setMode] = useState<'EXPLORE' | 'CALC'>('EXPLORE');
  
  // Calculator State
  const [startTemp, setStartTemp] = useState(70);
  const [endTemp, setEndTemp] = useState(30);

  // Graph Dimensions & Scales
  // Increased width to improve aspect ratio on landscape displays
  const GRAPH_WIDTH = 800;
  const GRAPH_HEIGHT = 500;
  const PADDING_LEFT = 60;
  const PADDING_BOTTOM = 50;
  const PADDING_TOP = 20;
  const PADDING_RIGHT = 40; // Increased padding right for labels
  
  const SVG_WIDTH = GRAPH_WIDTH + PADDING_LEFT + PADDING_RIGHT;
  const SVG_HEIGHT = GRAPH_HEIGHT + PADDING_TOP + PADDING_BOTTOM;

  const MAX_TEMP = 100;
  const MAX_SOL = 150; // Max solubility on Y axis

  // Scales
  const xScale = GRAPH_WIDTH / MAX_TEMP;
  const yScale = GRAPH_HEIGHT / MAX_SOL;

  // Coordinate Converters
  const getX = (t: number) => PADDING_LEFT + (t * xScale);
  const getY = (s: number) => (PADDING_TOP + GRAPH_HEIGHT) - (s * yScale);

  // Data Functions (Approximate curves for demo)
  const getSolubility = (salt: string, t: number) => {
    if (salt === 'KNO3') return 13 + Math.pow(t, 1.7) / 15; // Exponential rise
    if (salt === 'NaCl') return 36 + (t * 0.04); // Flat
    if (salt === 'Gas') return Math.max(0, 60 - (t * 0.6)); // Inverse
    return 0;
  };

  // Generate Path Data
  const generatePath = (salt: string) => {
    let d = `M ${getX(0)} ${getY(getSolubility(salt, 0))}`;
    for (let i = 1; i <= 100; i+=2) {
      const s = getSolubility(salt, i);
      // Clamp to chart area
      if (s <= MAX_SOL) {
          d += ` L ${getX(i)} ${getY(s)}`; 
      }
    }
    return d;
  };

  const currentSolubility = getSolubility(selectedSalt, temp);
  const startSol = getSolubility(selectedSalt, startTemp);
  const endSol = getSolubility(selectedSalt, endTemp);
  const precipitate = Math.max(0, startSol - endSol);

  // Markers
  const exploreX = getX(temp);
  const exploreY = getY(currentSolubility);
  
  const startX = getX(startTemp);
  const startY = getY(startSol);
  
  const endX = getX(endTemp);
  const endY = getY(endSol);

  return (
    <div className="my-10 bg-white rounded-xl border-4 border-indigo-500 shadow-xl overflow-hidden select-none ring-4 ring-indigo-50">
      
      {/* Featured Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          <span className="border-l-2 border-indigo-500 pl-3">INTERACTIVE SOLUBILITY CURVES</span>
        </h3>
        
        <div className="flex bg-slate-200 p-1 rounded-lg">
            <button 
                onClick={() => setMode('EXPLORE')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'EXPLORE' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Explore
            </button>
            <button 
                onClick={() => setMode('CALC')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${mode === 'CALC' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Calculator className="w-3 h-3" /> Calc Precipitate
            </button>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Graph */}
        <div className="w-full lg:flex-[2] bg-white rounded-xl border border-slate-200 relative min-h-[500px]">
            <svg className="w-full h-full" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
                {/* Grid Lines Y */}
                {[0, 20, 40, 60, 80, 100, 120, 140].map(val => {
                    const y = getY(val);
                    return (
                        <g key={val}>
                            <line x1={PADDING_LEFT} y1={y} x2={PADDING_LEFT + GRAPH_WIDTH} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                            <text x={PADDING_LEFT - 10} y={y + 4} textAnchor="end" className="text-[12px] fill-slate-400 font-mono font-medium">{val}</text>
                        </g>
                    );
                })}
                
                {/* Grid Lines X */}
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => {
                    const x = getX(val);
                    return (
                        <g key={val}>
                            <line x1={x} y1={PADDING_TOP} x2={x} y2={PADDING_TOP + GRAPH_HEIGHT} stroke="#f1f5f9" strokeWidth="1" />
                            <text x={x} y={PADDING_TOP + GRAPH_HEIGHT + 20} textAnchor="middle" className="text-[12px] fill-slate-400 font-mono font-medium">{val}</text>
                        </g>
                    );
                })}

                {/* Axes */}
                <line x1={PADDING_LEFT} y1={PADDING_TOP} x2={PADDING_LEFT} y2={PADDING_TOP + GRAPH_HEIGHT} stroke="#94a3b8" strokeWidth="2" />
                <line x1={PADDING_LEFT} y1={PADDING_TOP + GRAPH_HEIGHT} x2={PADDING_LEFT + GRAPH_WIDTH} y2={PADDING_TOP + GRAPH_HEIGHT} stroke="#94a3b8" strokeWidth="2" />

                {/* Axis Titles */}
                <text x={SVG_WIDTH/2 + PADDING_LEFT/2} y={SVG_HEIGHT - 10} textAnchor="middle" className="text-[14px] font-bold fill-slate-500 uppercase tracking-wider">Temperature (°C)</text>
                <text x={15} y={SVG_HEIGHT/2} textAnchor="middle" transform={`rotate(-90, 15, ${SVG_HEIGHT/2})`} className="text-[14px] font-bold fill-slate-500 uppercase tracking-wider">Solubility (g/100g)</text>

                {/* Curves */}
                <path d={generatePath('KNO3')} fill="none" stroke={selectedSalt === 'KNO3' ? '#8b5cf6' : '#e2e8f0'} strokeWidth={selectedSalt === 'KNO3' ? 4 : 2} strokeLinecap="round" opacity={selectedSalt === 'KNO3' ? 1 : 0.6} />
                <path d={generatePath('NaCl')} fill="none" stroke={selectedSalt === 'NaCl' ? '#3b82f6' : '#e2e8f0'} strokeWidth={selectedSalt === 'NaCl' ? 4 : 2} strokeLinecap="round" opacity={selectedSalt === 'NaCl' ? 1 : 0.6} />
                <path d={generatePath('Gas')} fill="none" stroke={selectedSalt === 'Gas' ? '#10b981' : '#e2e8f0'} strokeWidth={selectedSalt === 'Gas' ? 4 : 2} strokeLinecap="round" strokeDasharray="4 4" opacity={selectedSalt === 'Gas' ? 1 : 0.6} />

                {/* Interactive Markers */}
                {mode === 'EXPLORE' && currentSolubility <= MAX_SOL && (
                    <>
                        <line x1={exploreX} y1={PADDING_TOP + GRAPH_HEIGHT} x2={exploreX} y2={exploreY} stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1={PADDING_LEFT} y1={exploreY} x2={exploreX} y2={exploreY} stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx={exploreX} cy={exploreY} r="6" fill="#f43f5e" stroke="white" strokeWidth="2" className="shadow-md" />
                    </>
                )}

                {mode === 'CALC' && (
                    <>
                        <circle cx={startX} cy={startY} r="5" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                        <circle cx={endX} cy={endY} r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
                        {/* Vertical Drop Line */}
                        <line x1={startX} y1={startY} x2={startX} y2={endY} stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
                        <text x={startX + 10} y={(startY + endY)/2} className="text-[12px] font-bold fill-rose-500">Δ = {Math.round(precipitate)}g</text>
                    </>
                )}
            </svg>
        </div>

        {/* Sidebar Controls */}
        <div className="w-full lg:w-72 flex flex-col gap-6">
            
            {/* Salt Selector */}
            <div className="grid grid-cols-3 gap-2">
                {['KNO3', 'NaCl', 'Gas'].map(s => (
                    <button
                        key={s}
                        onClick={() => setSelectedSalt(s as any)}
                        className={`py-2 rounded-lg text-xs font-bold border-2 transition-all ${selectedSalt === s ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-500 hover:border-slate-300'}`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {mode === 'EXPLORE' ? (
                <div className="space-y-4 animate-in fade-in">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Temperature</span>
                            <span className="text-sm font-black text-indigo-600">{temp}°C</span>
                        </div>
                        <input 
                            type="range" min="0" max="100" value={temp} onChange={(e) => setTemp(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>

                    <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg text-center">
                        <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">Solubility at {temp}°C</p>
                        <p className="text-3xl font-black">{Math.round(currentSolubility)}g <span className="text-sm font-normal opacity-80">/100g water</span></p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-slate-600 leading-tight">
                            {selectedSalt === 'KNO3' && "Potassium Nitrate solubility increases sharply with temperature."}
                            {selectedSalt === 'NaCl' && "Salt solubility changes very little with temperature."}
                            {selectedSalt === 'Gas' && "Gas solubility DECREASES as temperature increases (bubbles form)."}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 animate-in fade-in">
                    <div className="bg-white p-4 rounded-xl border-2 border-indigo-50 shadow-sm space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 flex justify-between">
                                <span>Start Temp (Hot)</span>
                                <span className="text-indigo-600">{startTemp}°C</span>
                            </label>
                            <input 
                                type="range" min="0" max="100" value={startTemp} onChange={(e) => setStartTemp(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 flex justify-between">
                                <span>End Temp (Cold)</span>
                                <span className="text-blue-600">{endTemp}°C</span>
                            </label>
                            <input 
                                type="range" min="0" max="100" value={endTemp} onChange={(e) => setEndTemp(Number(e.target.value))}
                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-400"
                            />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-4 rounded-xl shadow-lg">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Snowflake className="w-4 h-4" /> Crystals Formed
                        </h4>
                        <div className="flex justify-between text-xs mb-1 opacity-60">
                            <span>Solubility at {startTemp}°C</span>
                            <span>{Math.round(startSol)}g</span>
                        </div>
                        <div className="flex justify-between text-xs mb-3 opacity-60">
                            <span>Solubility at {endTemp}°C</span>
                            <span>- {Math.round(endSol)}g</span>
                        </div>
                        <div className="pt-3 border-t border-slate-700 flex justify-between items-end">
                            <span className="text-xs font-bold text-emerald-400">Precipitate Mass</span>
                            <span className="text-2xl font-black">{Math.round(precipitate)}g</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default SolubilityCurveSim;
