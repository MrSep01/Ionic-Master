import React from 'react';
import { Ion, IonType } from '../types';
import { formatCharge } from '../constants';
import ChemicalDisplay from './ChemicalDisplay';

interface IonCardProps {
  ion: Ion;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const IonCard: React.FC<IonCardProps> = ({ ion, selected, onClick, disabled }) => {
  const isCation = ion.type === IonType.CATION;

  // Vibrant color logic
  const baseClasses = "relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 w-20 h-20 sm:w-24 sm:h-24 border-2";
  
  const cationSelected = "bg-gradient-to-br from-cyan-50 to-blue-100 border-blue-500 ring-4 ring-blue-200 shadow-lg scale-105";
  const cationIdle = "bg-white border-slate-200 hover:border-blue-400 hover:shadow-blue-200 hover:shadow-md";
  
  const anionSelected = "bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-500 ring-4 ring-emerald-200 shadow-lg scale-105";
  const anionIdle = "bg-white border-slate-200 hover:border-emerald-400 hover:shadow-emerald-200 hover:shadow-md";

  const disabledClasses = "opacity-40 cursor-not-allowed grayscale bg-slate-100 border-slate-200";

  const activeClasses = selected 
    ? (isCation ? cationSelected : anionSelected) 
    : (isCation ? cationIdle : anionIdle);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${disabled ? disabledClasses : `${activeClasses} hover:-translate-y-1 cursor-pointer`}
      `}
    >
      <span className={`absolute top-1 right-2 text-xs font-black ${isCation ? 'text-blue-600' : 'text-emerald-600'}`}>
        {formatCharge(ion.charge)}
      </span>
      <div className={`text-xl sm:text-2xl font-black font-serif ${isCation ? 'text-slate-800' : 'text-slate-800'}`}>
        <ChemicalDisplay symbol={ion.symbol} />
      </div>
      <div className={`mt-1 text-[0.6rem] sm:text-xs font-bold truncate max-w-full px-1 ${isCation ? 'text-blue-500' : 'text-emerald-500'}`}>
        {ion.name}
      </div>
    </button>
  );
};

export default IonCard;