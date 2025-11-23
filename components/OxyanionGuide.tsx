import React, { useState } from 'react';
import ChemicalDisplay from './ChemicalDisplay';
import { Info } from 'lucide-react';

type FamilyType = 'halogen' | 'sulfur' | 'nitrogen' | 'phosphorus';

const OxyanionGuide: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<FamilyType>('halogen');

  const families = [
    { id: 'halogen', name: 'Halogens', desc: 'Group 17 (Cl, Br, I)' },
    { id: 'sulfur', name: 'Sulfur', desc: 'Group 16' },
    { id: 'nitrogen', name: 'Nitrogen', desc: 'Group 15' },
    { id: 'phosphorus', name: 'Phosphorus', desc: 'Group 15' },
  ];

  const renderContent = () => {
    switch (selectedFamily) {
      case 'halogen':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="p-3 sm:p-4 bg-cyan-50 border border-cyan-200 rounded-2xl">
                <p className="text-cyan-800 text-xs sm:text-sm leading-relaxed">
                   Halogens (Chlorine, Bromine, Iodine) form the most complete series of oxyanions. The name changes based on the number of oxygen atoms relative to the standard <strong>-ate</strong> ion.
                </p>
             </div>

             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[300px]">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                        <tr>
                            <th className="p-2 sm:p-3 text-left font-bold text-[10px] sm:text-xs uppercase tracking-wider">Rule</th>
                            <th className="p-2 sm:p-3 text-center font-bold text-[10px] sm:text-xs uppercase tracking-wider">Prefix/Suffix</th>
                            <th className="p-2 sm:p-3 text-center font-bold text-[10px] sm:text-xs uppercase tracking-wider">Example</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className="bg-emerald-50/30">
                            <td className="p-2 sm:p-3 text-slate-600 text-[10px] sm:text-sm">+1 Oxygen</td>
                            <td className="p-2 sm:p-3 text-center font-mono font-bold text-emerald-600 text-xs sm:text-sm">per-...-ate</td>
                            <td className="p-2 sm:p-3 text-center"><div className="font-serif font-bold text-base sm:text-lg"><ChemicalDisplay symbol="ClO4" charge={-1} showCharge={true} /></div><div className="text-[9px] text-slate-400 font-bold uppercase">Perchlorate</div></td>
                        </tr>
                        <tr className="bg-blue-50/50">
                            <td className="p-2 sm:p-3 text-slate-800 font-bold text-[10px] sm:text-sm">Standard</td>
                            <td className="p-2 sm:p-3 text-center font-mono font-bold text-blue-600 text-xs sm:text-sm">...-ate</td>
                            <td className="p-2 sm:p-3 text-center"><div className="font-serif font-bold text-base sm:text-lg"><ChemicalDisplay symbol="ClO3" charge={-1} showCharge={true} /></div><div className="text-[9px] text-slate-400 font-bold uppercase">Chlorate</div></td>
                        </tr>
                        <tr>
                            <td className="p-2 sm:p-3 text-slate-600 text-[10px] sm:text-sm">-1 Oxygen</td>
                            <td className="p-2 sm:p-3 text-center font-mono font-bold text-amber-600 text-xs sm:text-sm">...-ite</td>
                            <td className="p-2 sm:p-3 text-center"><div className="font-serif font-bold text-base sm:text-lg"><ChemicalDisplay symbol="ClO2" charge={-1} showCharge={true} /></div><div className="text-[9px] text-slate-400 font-bold uppercase">Chlorite</div></td>
                        </tr>
                        <tr>
                            <td className="p-2 sm:p-3 text-slate-600 text-[10px] sm:text-sm">-2 Oxygens</td>
                            <td className="p-2 sm:p-3 text-center font-mono font-bold text-rose-600 text-xs sm:text-sm">hypo-...-ite</td>
                            <td className="p-2 sm:p-3 text-center"><div className="font-serif font-bold text-base sm:text-lg"><ChemicalDisplay symbol="ClO" charge={-1} showCharge={true} /></div><div className="text-[9px] text-slate-400 font-bold uppercase">Hypochlorite</div></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-3 mt-4">
                 <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Bromine Example</p>
                    <div className="font-serif font-bold text-base sm:text-lg text-slate-700"><ChemicalDisplay symbol="BrO3" charge={-1} showCharge={true} /></div>
                    <p className="text-[10px] sm:text-xs font-bold text-blue-600">Bromate</p>
                 </div>
                 <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Iodine Example</p>
                    <div className="font-serif font-bold text-base sm:text-lg text-slate-700"><ChemicalDisplay symbol="IO3" charge={-1} showCharge={true} /></div>
                    <p className="text-[10px] sm:text-xs font-bold text-blue-600">Iodate</p>
                 </div>
             </div>
          </div>
        );

      case 'sulfur':
         return (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                     Sulfur oxyanions typically follow the <strong>-ate</strong> (standard) and <strong>-ite</strong> (one less oxygen) pattern. Notice the charge stays -2.
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-emerald-100 shadow-lg shadow-emerald-50 flex flex-col items-center">
                     <span className="text-[10px] sm:text-xs font-black text-emerald-300 uppercase tracking-widest mb-1 sm:mb-2">Standard</span>
                     <div className="font-serif font-black text-2xl sm:text-4xl text-emerald-600 mb-1 sm:mb-2">
                        <ChemicalDisplay symbol="SO4" charge={-2} showCharge={true} />
                     </div>
                     <span className="text-sm sm:text-lg font-bold text-slate-700">Sulfate</span>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
                     <span className="text-[10px] sm:text-xs font-black text-amber-300 uppercase tracking-widest mb-1 sm:mb-2">-1 Oxygen</span>
                     <div className="font-serif font-black text-2xl sm:text-4xl text-amber-600 mb-1 sm:mb-2">
                        <ChemicalDisplay symbol="SO3" charge={-2} showCharge={true} />
                     </div>
                     <span className="text-sm sm:text-lg font-bold text-slate-700">Sulfite</span>
                  </div>
               </div>
            </div>
         );

      case 'nitrogen':
         return (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                  <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                     Nitrogen forms two very common oxyanions. Remember: <strong>Nitrate</strong> is the standard "ate" form.
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-blue-100 shadow-lg shadow-blue-50 flex flex-col items-center">
                     <span className="text-[10px] sm:text-xs font-black text-blue-300 uppercase tracking-widest mb-1 sm:mb-2">Standard</span>
                     <div className="font-serif font-black text-2xl sm:text-4xl text-blue-600 mb-1 sm:mb-2">
                        <ChemicalDisplay symbol="NO3" charge={-1} showCharge={true} />
                     </div>
                     <span className="text-sm sm:text-lg font-bold text-slate-700">Nitrate</span>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
                     <span className="text-[10px] sm:text-xs font-black text-amber-300 uppercase tracking-widest mb-1 sm:mb-2">-1 Oxygen</span>
                     <div className="font-serif font-black text-2xl sm:text-4xl text-amber-600 mb-1 sm:mb-2">
                        <ChemicalDisplay symbol="NO2" charge={-1} showCharge={true} />
                     </div>
                     <span className="text-sm sm:text-lg font-bold text-slate-700">Nitrite</span>
                  </div>
               </div>
            </div>
         );

      case 'phosphorus':
         return (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="p-3 sm:p-4 bg-purple-50 border border-purple-200 rounded-2xl">
                  <p className="text-purple-800 text-xs sm:text-sm leading-relaxed">
                     Phosphorus oxyanions generally carry a -3 charge. Phosphate is a crucial ion in biology (DNA/ATP).
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-purple-100 shadow-lg shadow-purple-50 flex flex-col items-center">
                     <span className="text-[10px] sm:text-xs font-black text-purple-300 uppercase tracking-widest mb-1 sm:mb-2">Standard</span>
                     <div className="font-serif font-black text-2xl sm:text-4xl text-purple-600 mb-1 sm:mb-2">
                        <ChemicalDisplay symbol="PO4" charge={-3} showCharge={true} />
                     </div>
                     <span className="text-sm sm:text-lg font-bold text-slate-700">Phosphate</span>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
                     <span className="text-[10px] sm:text-xs font-black text-amber-300 uppercase tracking-widest mb-1 sm:mb-2">-1 Oxygen</span>
                     <div className="font-serif font-black text-2xl sm:text-4xl text-amber-600 mb-1 sm:mb-2">
                        <ChemicalDisplay symbol="PO3" charge={-3} showCharge={true} />
                     </div>
                     <span className="text-sm sm:text-lg font-bold text-slate-700">Phosphite</span>
                  </div>
               </div>
            </div>
         );
    }
  };

  return (
    <div className="p-2 md:p-6 max-w-4xl mx-auto pb-24 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">OXYANION <span className="text-cyan-600">DECK</span></h2>
        <div className="h-1 flex-1 bg-slate-100 rounded-full"></div>
      </div>

      <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2 snap-x no-scrollbar">
        {families.map((f) => (
           <button
             key={f.id}
             onClick={() => setSelectedFamily(f.id as FamilyType)}
             className={`
                shrink-0 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border-2 text-left transition-all snap-start
                ${selectedFamily === f.id 
                    ? 'bg-slate-800 border-slate-800 text-white shadow-lg shadow-slate-200 scale-100' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-cyan-300 hover:text-cyan-600'
                }
             `}
           >
              <div className="font-bold text-xs sm:text-sm">{f.name}</div>
              <div className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-wider ${selectedFamily === f.id ? 'text-slate-400' : 'text-slate-300'}`}>{f.desc}</div>
           </button>
        ))}
      </div>

      <div className="flex-1 bg-white rounded-3xl p-1">
          {renderContent()}
      </div>

      <div className="mt-4 md:mt-6 flex gap-3 p-3 md:p-4 bg-indigo-50 rounded-xl border border-indigo-100">
         <Info className="w-5 h-5 text-indigo-600 shrink-0" />
         <p className="text-[10px] md:text-xs text-indigo-800 leading-relaxed">
            <strong>Pro Tip:</strong> The prefixes and suffixes (per-, -ate, -ite, hypo-) tell you about the number of oxygen atoms. The <strong>charge usually stays the same</strong> across the series for a given element (e.g., all Chlorine oxyanions are -1).
         </p>
      </div>
    </div>
  );
};

export default OxyanionGuide;