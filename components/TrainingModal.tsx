
import React, { useState } from 'react';
import { X, FlaskConical, PenTool, Beaker, Layers, Zap, Shuffle } from 'lucide-react';
import { TrainingConfig } from '../types';

interface TrainingModalProps {
  onClose: () => void;
  onStart: (config: TrainingConfig) => void;
}

const TrainingModal: React.FC<TrainingModalProps> = ({ onClose, onStart }) => {
  const [type, setType] = useState<'BUILD' | 'NAME'>('BUILD');
  const [pool, setPool] = useState<'ALL' | 'SIMPLE' | 'POLYATOMIC' | 'TRANSITION'>('ALL');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border-4 border-slate-100 relative">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-5 flex items-center justify-between border-b border-slate-100">
          <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-indigo-500" />
                TRAINING LAB
              </h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Sandbox Mode • No Score Tracking</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors border border-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
            
            {/* Step 1: Mode */}
            <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">1. Select Activity</h3>
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => setType('BUILD')}
                        className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${type === 'BUILD' ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-200' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                    >
                        <div className={`absolute top-0 right-0 p-1.5 rounded-bl-xl ${type === 'BUILD' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
                            <Beaker className="w-5 h-5" />
                        </div>
                        <span className={`block font-black text-lg mb-1 ${type === 'BUILD' ? 'text-emerald-800' : 'text-slate-700'}`}>Build Formula</span>
                        <span className="text-xs text-slate-500 font-medium leading-tight block">Given a Name, find the ions and balance the charges.</span>
                    </button>

                    <button 
                        onClick={() => setType('NAME')}
                        className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${type === 'NAME' ? 'border-cyan-500 bg-cyan-50 ring-1 ring-cyan-200' : 'border-slate-100 bg-white hover:border-cyan-200'}`}
                    >
                        <div className={`absolute top-0 right-0 p-1.5 rounded-bl-xl ${type === 'NAME' ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
                            <PenTool className="w-5 h-5" />
                        </div>
                        <span className={`block font-black text-lg mb-1 ${type === 'NAME' ? 'text-cyan-800' : 'text-slate-700'}`}>Name Compound</span>
                        <span className="text-xs text-slate-500 font-medium leading-tight block">Given a Formula, identify the correct chemical name.</span>
                    </button>
                </div>
            </div>

            {/* Step 2: Pool */}
            <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">2. Ion Pool</h3>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { id: 'SIMPLE', label: 'Simple Ions', icon: Zap, desc: 'Group 1, 2, 13-17' },
                        { id: 'POLYATOMIC', label: 'Polyatomics', icon: Layers, desc: 'Nitrate, Sulfate, etc.' },
                        { id: 'TRANSITION', label: 'Transition Metals', icon: Shuffle, desc: 'Variable charges (Fe, Cu)' },
                        { id: 'ALL', label: 'Everything', icon: FlaskConical, desc: 'Full periodic table' },
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setPool(opt.id as any)}
                            className={`px-3 py-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${pool === opt.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 hover:border-indigo-200'}`}
                        >
                            <div className={`p-2 rounded-lg ${pool === opt.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <opt.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <div className={`font-bold text-sm ${pool === opt.id ? 'text-indigo-900' : 'text-slate-700'}`}>{opt.label}</div>
                                <div className="text-[10px] text-slate-400 font-medium">{opt.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
            <button 
                onClick={onClose}
                className="flex-1 py-3 font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={() => onStart({ type, pool })}
                className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
                START SESSION
            </button>
        </div>

      </div>
    </div>
  );
};

export default TrainingModal;
