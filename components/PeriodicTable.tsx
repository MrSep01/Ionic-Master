import React, { useState } from 'react';
import { PeriodicElement, Ion, IonType } from '../types';
import { PERIODIC_ELEMENTS, formatCharge } from '../constants';
import ChemicalDisplay from './ChemicalDisplay';
import { X, ChevronRight } from 'lucide-react';

interface PeriodicTableProps {
  onSelectIon: (ion: Ion) => void;
  allowedCations: Ion[];
  allowedAnions: Ion[];
}

const PeriodicTable: React.FC<PeriodicTableProps> = ({ onSelectIon, allowedCations, allowedAnions }) => {
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(null);

  // Create a map of available ions for easier lookup
  const getAvailableIons = (elementSymbol: string): Ion[] => {
    const cations = allowedCations.filter(c => c.elementSymbol === elementSymbol);
    const anions = allowedAnions.filter(a => a.elementSymbol === elementSymbol);
    return [...cations, ...anions];
  };

  const handleElementClick = (element: PeriodicElement) => {
    const ions = getAvailableIons(element.symbol);
    
    if (ions.length === 0) return; // Not interactable for current level

    if (ions.length === 1) {
      onSelectIon(ions[0]);
      setSelectedElement(null);
    } else {
      // Open sub-menu for variable charges
      setSelectedElement(element);
    }
  };

  // 18 columns, 7 rows generally (simplified)
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(18, minmax(32px, 1fr))', // Fixed min size for scrollable table
    gap: '4px',
  };

  // Render a single cell
  const renderCell = (element: PeriodicElement) => {
    const ions = getAvailableIons(element.symbol);
    const isInteractive = ions.length > 0;
    
    // Color coding categories - VIBRANT PALETTE
    let bgClass = 'bg-white text-slate-300 border-slate-100'; // Default inactive
    let hoverClass = '';
    let shadowClass = '';

    if (isInteractive) {
        switch(element.category) {
            case 'alkali':
            case 'alkaline':
                bgClass = 'bg-cyan-100 border-cyan-300 text-cyan-900';
                hoverClass = 'hover:bg-cyan-200 hover:border-cyan-400 md:hover:scale-110 md:hover:z-10';
                shadowClass = 'hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]';
                break;
            case 'transition':
            case 'post-transition':
            case 'lanthanoid':
            case 'actinoid':
                bgClass = 'bg-blue-100 border-blue-300 text-blue-900';
                hoverClass = 'hover:bg-blue-200 hover:border-blue-400 md:hover:scale-110 md:hover:z-10';
                shadowClass = 'hover:shadow-[0_0_15px_rgba(96,165,250,0.4)]';
                break;
            case 'nonmetal':
            case 'halogen':
                bgClass = 'bg-emerald-100 border-emerald-300 text-emerald-900';
                hoverClass = 'hover:bg-emerald-200 hover:border-emerald-400 md:hover:scale-110 md:hover:z-10';
                shadowClass = 'hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]';
                break;
            case 'metalloid':
                 bgClass = 'bg-amber-100 border-amber-300 text-amber-900';
                 hoverClass = 'hover:bg-amber-200 hover:border-amber-400 md:hover:scale-110 md:hover:z-10';
                 shadowClass = 'hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]';
                 break;
            case 'noble':
                bgClass = 'bg-violet-50 border-violet-100 text-violet-300'; // Usually inactive
                break;
        }
    }

    return (
      <div
        key={element.symbol}
        onClick={() => handleElementClick(element)}
        style={{ gridColumn: element.group, gridRow: element.period }}
        className={`
            relative aspect-square flex flex-col items-center justify-center rounded-md border-2 transition-all duration-200 select-none cursor-pointer active:scale-95
            ${bgClass} ${hoverClass} ${shadowClass}
            ${!isInteractive ? 'cursor-default opacity-60' : ''}
        `}
      >
        <span className="text-[0.4rem] md:text-[0.5rem] font-bold absolute top-0.5 left-0.5 md:left-1 opacity-60">{element.atomicNumber}</span>
        <span className="font-black text-[10px] xs:text-xs sm:text-base leading-none">{element.symbol}</span>
        {/* Charge Indicator DOTS */}
        {isInteractive && (
            <div className="flex gap-0.5 mt-0.5 absolute bottom-0.5 md:bottom-1">
                {ions.map((ion, idx) => (
                    <div 
                        key={idx} 
                        className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${ion.type === IonType.CATION ? 'bg-cyan-500 shadow-sm' : 'bg-emerald-500 shadow-sm'}`} 
                    />
                ))}
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full relative">
      <div className="overflow-x-auto custom-scrollbar pb-4 -mx-2 px-2">
          {/* Modal Overlay for Variable Charges */}
        {selectedElement && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-2xl shadow-blue-500/20 border-4 border-indigo-50 text-center max-w-sm md:max-w-xl w-[95vw] max-h-[80vh] overflow-y-auto relative animate-in zoom-in duration-300">
                    <button 
                        onClick={() => setSelectedElement(null)}
                        className="absolute top-3 right-3 p-1 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                    
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-black mb-4 shadow-lg transform -rotate-3">
                        {selectedElement.symbol}
                    </div>
                    
                    <h3 className="font-black text-slate-800 mb-1 text-lg sm:text-xl">{selectedElement.name}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6 font-medium">
                        Select the specific ion charge:
                    </p>
                    <div className="flex flex-col gap-2 sm:gap-3">
                        {getAvailableIons(selectedElement.symbol).map((ion, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    onSelectIon(ion);
                                    setSelectedElement(null);
                                }}
                                className={`
                                    relative group px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transition-all active:scale-[0.98] flex items-center justify-between border-2
                                    ${ion.type === IonType.CATION 
                                        ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-700 border-blue-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100' 
                                        : 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-100'
                                    }
                                `}
                            >
                                <span className="font-serif text-xl sm:text-2xl">
                                    <ChemicalDisplay symbol={ion.symbol} charge={ion.charge} showCharge={true} />
                                </span>
                                <span className="text-xs sm:text-sm font-sans font-bold opacity-60 group-hover:opacity-100 tracking-wide">
                                    {ion.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )}

        <div className="min-w-[650px] relative">
            <div style={gridStyle} className="p-1">
                {PERIODIC_ELEMENTS.map(renderCell)}
            </div>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none xl:hidden flex items-center justify-end pr-1 opacity-50">
           <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-6 mt-2 text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-wide">
             <div className="flex items-center gap-1"><div className="w-2 h-2 md:w-3 md:h-3 bg-blue-100 border-2 border-blue-300 rounded-sm"></div> Metals</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-100 border-2 border-emerald-300 rounded-sm"></div> Non-Metals</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 md:w-3 md:h-3 bg-amber-100 border-2 border-amber-300 rounded-sm"></div> Metalloids</div>
      </div>
    </div>
  );
};

export default PeriodicTable;