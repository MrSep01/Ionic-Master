
import React from 'react';
import { Ion } from '../types';
import { ArrowUp, ArrowDown, CheckCircle2, MousePointerClick, Scale } from 'lucide-react';

interface TrainingActiveGuideProps {
  cation: Ion | null;
  anion: Ion | null;
  netCharge: number;
}

const TrainingActiveGuide: React.FC<TrainingActiveGuideProps> = ({ cation, anion, netCharge }) => {
  
  // State 1: Nothing Selected
  if (!cation || !anion) {
    return (
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 sm:p-4 rounded-r-xl shadow-sm mb-4 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-full shadow-sm text-indigo-500 shrink-0">
             <MousePointerClick className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-indigo-900 text-sm uppercase tracking-wide mb-1">Step 1: Selection</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Start by choosing a <strong className="text-cyan-600">Positive Ion (Cation)</strong> and a <strong className="text-emerald-600">Negative Ion (Anion)</strong> using the <strong>Periodic Table</strong> or <strong>Polyatomic Ions</strong> tabs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Balanced (Ready)
  if (netCharge === 0) {
    return (
      <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 sm:p-4 rounded-r-xl shadow-sm mb-4 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-full shadow-sm text-emerald-500 shrink-0">
             <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-emerald-900 text-sm uppercase tracking-wide mb-1">Step 3: Stabilized!</h4>
            <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
              Perfect! The charges cancel out to zero. Press the <strong className="uppercase">Synthesize</strong> button to create the compound.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // State 3: Unbalanced (Needs Action)
  const isTooPositive = netCharge > 0;
  
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 sm:p-4 rounded-r-xl shadow-sm mb-4 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white rounded-full shadow-sm text-amber-500 shrink-0">
           <Scale className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-black text-amber-900 text-sm uppercase tracking-wide mb-1">Step 2: Balance the Charges</h4>
          
          <div className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-2">
            Current Net Charge: <span className={`font-black ${isTooPositive ? 'text-rose-500' : 'text-blue-500'}`}>{isTooPositive ? `+${netCharge}` : netCharge}</span>
          </div>

          <div className="flex items-center gap-2 font-bold text-sm bg-white/60 p-2 rounded-lg border border-amber-100">
             {isTooPositive ? (
                <>
                    <ArrowDown className="w-4 h-4 text-emerald-600" />
                    <span className="text-slate-600">Too Positive. Add more</span>
                    <span className="text-emerald-600 uppercase">{anion.name} (-)</span>
                </>
             ) : (
                <>
                    <ArrowUp className="w-4 h-4 text-cyan-600" />
                    <span className="text-slate-600">Too Negative. Add more</span>
                    <span className="text-cyan-600 uppercase">{cation.name} (+)</span>
                </>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingActiveGuide;
