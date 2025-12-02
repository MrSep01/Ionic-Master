import React, { useState } from 'react';
import { Thermometer, Play, Pause, RefreshCw } from 'lucide-react';

const HeatingCurveSim: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Total simulation duration: 100 units
  // Segments:
  // 0-20: Solid heating (Temp rises)
  // 20-40: Melting (Temp flat)
  // 40-60: Liquid heating (Temp rises)
  // 60-80: Boiling (Temp flat)
  // 80-100: Gas heating (Temp rises)

  React.useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getTemp = (t: number) => {
    if (t <= 20) return -20 + (t * 2); // -20 to 20 (Solid)
    if (t <= 40) return 20; // Melting point (flat)
    if (t <= 60) return 20 + ((t - 40) * 3); // 20 to 80 (Liquid)
    if (t <= 80) return 80; // Boiling point (flat)
    return 80 + ((t - 80) * 2); // 80+ (Gas)
  };

  const getState = (t: number) => {
    if (t < 20) return "SOLID";
    if (t < 40) return "MELTING (Solid + Liquid)";
    if (t < 60) return "LIQUID";
    if (t < 80) return "BOILING (Liquid + Gas)";
    return "GAS";
  };

  const currentTemp = getTemp(time);
  const currentState = getState(time);

  // Calculate SVG path
  const points = [];
  for (let i = 0; i <= 100; i++) {
    const x = i * 4; // Scale width
    const y = 200 - (getTemp(i) + 40); // Scale height and offset (-40 to start at bottom)
    points.push(`${x},${y}`);
  }
  const pathData = `M ${points.join(' L ')}`;

  // Current Marker Position
  const markerX = time * 4;
  const markerY = 200 - (currentTemp + 40);

  return (
    <div className="my-10 bg-white rounded-3xl border-2 border-slate-200 shadow-lg overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-rose-500" />
          Heating Curve
        </h3>
        <span className="text-xs font-mono font-bold bg-slate-200 px-2 py-1 rounded text-slate-600">
            Time: {Math.floor(time)}s
        </span>
      </div>

      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* Graph Area */}
        <div className="flex-1 relative h-64 bg-slate-50 rounded-xl border border-slate-200">
            <svg className="w-full h-full p-4 overflow-visible" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Axes */}
                <line x1="0" y1="200" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="0" y1="0" x2="0" y2="200" stroke="#cbd5e1" strokeWidth="2" />
                
                {/* The Curve */}
                <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                
                {/* The Scrubbing Marker */}
                <circle cx={markerX} cy={markerY} r="6" fill="#ef4444" stroke="white" strokeWidth="2" className="shadow-lg" />
                
                {/* Labels */}
                <text x="10" y="180" className="text-[10px] fill-slate-400 font-bold">Solid</text>
                <text x="90" y="150" className="text-[10px] fill-slate-400 font-bold">Melting</text>
                <text x="170" y="110" className="text-[10px] fill-slate-400 font-bold">Liquid</text>
                <text x="250" y="60" className="text-[10px] fill-slate-400 font-bold">Boiling</text>
                <text x="350" y="20" className="text-[10px] fill-slate-400 font-bold">Gas</text>
            </svg>
            
            {/* Axis Labels */}
            <div className="absolute bottom-1 right-4 text-[10px] font-bold text-slate-400">TIME →</div>
            <div className="absolute top-4 left-2 text-[10px] font-bold text-slate-400 rotate-[-90deg] origin-left">TEMP (°C) →</div>
        </div>

        {/* Info & Controls */}
        <div className="w-full md:w-64 flex flex-col justify-between gap-4">
            
            <div className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                currentState.includes('MELTING') || currentState.includes('BOILING')
                ? 'bg-amber-50 border-amber-200'
                : 'bg-blue-50 border-blue-200'
            }`}>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Current State</p>
                <p className={`text-lg font-black leading-tight ${
                    currentState.includes('MELTING') || currentState.includes('BOILING')
                    ? 'text-amber-600'
                    : 'text-blue-600'
                }`}>
                    {currentState}
                </p>
                <p className="text-2xl font-mono font-bold text-slate-800 mt-2">{Math.round(currentTemp)}°C</p>
            </div>

            {/* Info Box */}
            <div className="bg-slate-100 p-3 rounded-xl text-xs text-slate-600 border border-slate-200">
                {(currentState.includes('MELTING') || currentState.includes('BOILING')) ? (
                    <p><strong>Latent Heat:</strong> Temperature stays constant because heat energy is breaking bonds, not increasing kinetic energy.</p>
                ) : (
                    <p><strong>Heating:</strong> Energy is increasing the kinetic energy of particles, causing temperature to rise.</p>
                )}
            </div>

            {/* Slider Controls */}
            <div className="space-y-3">
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={time} 
                    onChange={(e) => {
                        setTime(Number(e.target.value));
                        setIsPlaying(false);
                    }}
                    className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                        {isPlaying ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Play</>}
                    </button>
                    <button 
                        onClick={() => { setTime(0); setIsPlaying(false); }}
                        className="p-2 bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default HeatingCurveSim;