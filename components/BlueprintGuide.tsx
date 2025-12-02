
import React from 'react';
import { Ion } from '../types';
import ChemicalDisplay from './ChemicalDisplay';
import { Calculator, ArrowRight, Scale, CheckCircle2 } from 'lucide-react';

interface BlueprintGuideProps {
  cation: Ion;
  anion: Ion;
  onClose: () => void;
}

const BlueprintGuide: React.FC<BlueprintGuideProps> = ({ cation, anion, onClose }) => {
  
  // Math Logic
  const cCharge = cation.charge;
  const aCharge = Math.abs(anion.charge);
  
  const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
  const lcm = (cCharge * aCharge) / gcd(cCharge, aCharge);
  
  const cCount = lcm / cCharge;
  const aCount = lcm / aCharge;

  return (
    <div className="bg-slate-50 rounded-2xl border-2 border-indigo-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 shadow-xl">
      <div className="bg-indigo-100/50 px-4 py-3 flex justify-between items-center border-b border-indigo-100">
        <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-600" />
            <h3 className="font-black text-indigo-900 text-xs uppercase tracking-widest">Formula Blueprint</h3>
        </div>
        <button 
            onClick={onClose}
            className="text-xs font-bold text-indigo-500 hover:text-indigo-700 underline"
        >
            Close
        </button>
      </div>
      
      <div className="p-4 grid gap-4">
        {/* Step 1: Identify */}
        <div className="flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-bold text-slate-400 shrink-0 shadow-sm">1</div>
            <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Identify Charges</p>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-700">
                    <div className="flex items-center gap-1.5">
                        <ChemicalDisplay symbol={cation.symbol} showCharge={true} charge={cation.charge} className="text-cyan-600" />
                        <span>= +{cCharge}</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200"></div>
                    <div className="flex items-center gap-1.5">
                        <ChemicalDisplay symbol={anion.symbol} showCharge={true} charge={anion.charge} className="text-emerald-600" />
                        <span>= -{aCharge}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Step 2: LCM */}
        <div className="flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center font-bold text-slate-400 shrink-0 shadow-sm">2</div>
            <div className="flex-1 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Balance The Scale (LCM)</p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                    <Scale className="w-4 h-4 text-amber-500" />
                    <span>Common multiple of <strong>{cCharge}</strong> and <strong>{aCharge}</strong> is</span>
                    <span className="font-black text-amber-600 text-lg">{lcm}</span>
                </div>
            </div>
        </div>

        {/* Step 3: Ratio */}
        <div className="flex gap-4 items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md ring-2 ring-indigo-100">3</div>
            <div className="flex-1 bg-gradient-to-r from-indigo-50 to-white p-3 rounded-xl border border-indigo-100 shadow-sm">
                <p className="text-[10px] uppercase font-bold text-indigo-400 mb-2">The Recipe</p>
                <div className="flex items-center justify-around">
                    <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Positives needed</div>
                        <div className="font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded border border-cyan-100">
                            {lcm} ÷ {cCharge} = <span className="text-lg">{cCount}</span>
                        </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                    <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Negatives needed</div>
                        <div className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                            {lcm} ÷ {aCharge} = <span className="text-lg">{aCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlueprintGuide;
