import React from 'react';
import { formatCharge } from '../constants';

interface ChemicalDisplayProps {
  symbol: string;
  charge?: number;
  count?: number;
  isPoly?: boolean;
  showCharge?: boolean;
  className?: string;
}

const ChemicalDisplay: React.FC<ChemicalDisplayProps> = ({ 
  symbol, 
  charge, 
  count = 1, 
  isPoly = false,
  showCharge = false,
  className = ""
}) => {
  
  // Function to parse symbol and subscript numbers
  // Splits by numbers, wraps numbers in <sub> tags
  const renderSymbol = (s: string) => {
    const parts = s.split(/(\d+)/);
    return parts.map((part, i) => 
      /\d+/.test(part) ? <sub key={i} className="text-[0.6em] align-baseline relative top-[0.3em]">{part}</sub> : <span key={i}>{part}</span>
    );
  };

  return (
    <span className={`inline-flex items-baseline leading-none ${className}`}>
      {count > 1 && isPoly && <span>(</span>}
      {renderSymbol(symbol)}
      {count > 1 && isPoly && <span>)</span>}
      {count > 1 && <sub className="text-[0.6em] align-baseline relative top-[0.3em]">{count}</sub>}
      {showCharge && charge !== undefined && (
        <sup className="text-[0.6em] ml-0.5 font-bold align-baseline relative -top-[0.4em]">{formatCharge(charge)}</sup>
      )}
    </span>
  );
};

export default ChemicalDisplay;