
import React from 'react';
import { DifficultyLevel } from '../types';
import { Award, Printer, ArrowRight, Star } from 'lucide-react';

interface CertificateProps {
  level: DifficultyLevel;
  onNext: () => void;
  onClose: () => void;
  hasNextLevel: boolean;
}

const Certificate: React.FC<CertificateProps> = ({ level, onNext, onClose, hasNextLevel }) => {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto print:bg-white print:p-0 print:absolute print:z-[100]">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 print:shadow-none print:w-full print:max-w-none">
        
        {/* Decorative Border for Screen */}
        <div className="absolute inset-0 border-[12px] border-double border-amber-400 pointer-events-none rounded-xl print:border-amber-500"></div>
        
        {/* Confetti / Stars Decoration (Screen only) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none print:hidden">
           <Star className="absolute top-10 left-10 text-yellow-400 w-8 h-8 animate-pulse" />
           <Star className="absolute top-20 right-20 text-amber-400 w-6 h-6 animate-pulse delay-100" />
           <Star className="absolute bottom-10 left-20 text-yellow-500 w-10 h-10 animate-pulse delay-200" />
           <Star className="absolute bottom-32 right-8 text-amber-300 w-5 h-5 animate-pulse delay-300" />
        </div>

        <div className="p-12 text-center flex flex-col items-center relative z-10">
            <div className="mb-6 bg-amber-100 p-4 rounded-full ring-8 ring-amber-50 print:hidden">
                <Award className="w-16 h-16 text-amber-600" />
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight print:text-black">
                Certificate of Mastery
            </h1>
            
            <p className="text-slate-500 italic text-lg mb-8 print:text-slate-600">
                This certifies that the student has successfully mastered the
            </p>

            <div className="mb-8 py-4 px-12 border-y-2 border-slate-100 bg-slate-50 w-full print:bg-white print:border-slate-300">
                <h2 className="text-3xl font-bold text-indigo-700 uppercase tracking-widest print:text-black">
                    {level} Level
                </h2>
                <p className="text-sm text-slate-400 mt-2 font-semibold uppercase tracking-wide print:text-slate-500">
                    Ionic Compound Formation
                </p>
            </div>

            <p className="text-slate-600 max-w-md mx-auto leading-relaxed mb-10 print:text-black">
                For demonstrating exceptional skill in balancing charges, naming ions, and synthesizing stable compounds.
            </p>

            <div className="flex items-center gap-8 w-full justify-center mb-8 print:justify-between print:px-20 print:mt-20">
                <div className="text-left">
                    <div className="w-40 border-b border-slate-300 mb-2"></div>
                    <p className="text-xs text-slate-400 uppercase font-bold">Date</p>
                    <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                     <div className="w-40 border-b border-slate-300 mb-2 relative">
                        {/* Signature simulation */}
                        <span className="absolute -top-6 right-4 font-serif text-2xl text-blue-600 opacity-80 transform -rotate-6 print:text-black">IonicMaster</span>
                     </div>
                    <p className="text-xs text-slate-400 uppercase font-bold">Authorized Signature</p>
                </div>
            </div>

            {/* Action Buttons (Hidden in Print) */}
            <div className="flex gap-4 mt-4 print:hidden">
                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition-colors"
                >
                    <Printer className="w-5 h-5" /> Save / Print
                </button>
                {hasNextLevel ? (
                    <button 
                        onClick={onNext}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg hover:shadow-indigo-200 transition-all"
                    >
                        Next Level <ArrowRight className="w-5 h-5" />
                    </button>
                ) : (
                     <button 
                        onClick={onClose}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg transition-all"
                    >
                        Close
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
