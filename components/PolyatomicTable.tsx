import React from 'react';
import { Ion } from '../types';
import ChemicalDisplay from './ChemicalDisplay';

interface PolyatomicTableProps {
  ions: Ion[];
  onSelectIon: (ion: Ion) => void;
}

const PolyatomicTable: React.FC<PolyatomicTableProps> = ({ ions, onSelectIon }) => {
  // Group ions by charge
  const groupedIons = {
    '+1': ions.filter(i => i.charge === 1),
    '-1': ions.filter(i => i.charge === -1),
    '-2': ions.filter(i => i.charge === -2),
    '-3': ions.filter(i => i.charge === -3),
  };

  const renderGroup = (title: string, groupIons: Ion[], theme: 'blue' | 'green') => {
    if (groupIons.length === 0) return null;
    
    const isBlue = theme === 'blue';
    
    const containerClass = isBlue 
        ? 'border-cyan-200 shadow-cyan-100'
        : 'border-emerald-200 shadow-emerald-100';
        
    const headerClass = isBlue
        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
        : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
    
    const textClass = isBlue ? 'text-blue-700' : 'text-emerald-700';
    const hoverBorder = isBlue ? 'hover:border-cyan-400' : 'hover:border-emerald-400';

    return (
      <div className={`rounded-2xl sm:rounded-3xl border-2 ${containerClass} overflow-hidden bg-white shadow-xl mb-6 sm:mb-8`}>
        <div className={`${headerClass} px-3 sm:px-6 py-3 sm:py-4 font-black text-[10px] sm:text-sm uppercase tracking-widest flex items-center justify-between shadow-md`}>
          <span className="drop-shadow-sm">{title}</span>
          <span className="bg-white/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[9px] sm:text-[10px] font-bold backdrop-blur-sm">{groupIons.length} ions</span>
        </div>
        <div className="p-2 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {groupIons.map((ion, idx) => (
            <button
              key={idx}
              onClick={() => onSelectIon(ion)}
              className={`flex flex-col items-center justify-center p-2 sm:p-4 bg-slate-50/50 rounded-xl sm:rounded-2xl border-2 border-slate-100 ${hoverBorder} hover:shadow-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 group touch-manipulation`}
            >
              <span className={`font-serif font-black text-lg sm:text-2xl mb-1 sm:mb-2 ${textClass} group-hover:scale-110 transition-transform`}>
                <ChemicalDisplay symbol={ion.symbol} charge={ion.charge} showCharge={true} isPoly={true} />
              </span>
              <span className="text-[9px] sm:text-xs font-bold text-slate-500 text-center leading-tight uppercase tracking-tight break-words w-full">
                {ion.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 sm:p-4 pb-24 max-w-4xl mx-auto">
        {/* Ordered list as requested: +1, -1, -2, -3 */}
        
        {renderGroup('Charge +1 (Cations)', groupedIons['+1'], 'blue')}
        
        <div className="my-4 sm:my-8 flex items-center gap-4">
            <div className="h-1 bg-slate-200 rounded-full flex-1"></div>
            <span className="text-slate-300 text-[10px] sm:text-sm font-black uppercase tracking-[0.2em]">Negative Ions</span>
            <div className="h-1 bg-slate-200 rounded-full flex-1"></div>
        </div>

        {renderGroup('Charge -1 (Anions)', groupedIons['-1'], 'green')}
        {renderGroup('Charge -2 (Anions)', groupedIons['-2'], 'green')}
        {renderGroup('Charge -3 (Anions)', groupedIons['-3'], 'green')}

        {Object.values(groupedIons).every(g => g.length === 0) && (
             <div className="text-center p-10 text-slate-400 font-medium italic bg-white rounded-3xl border-2 border-dashed border-slate-200">
                 No polyatomic ions available in this difficulty mode.
             </div>
        )}
    </div>
  );
};

export default PolyatomicTable;