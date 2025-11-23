import React from 'react';
import { FlaskConical } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 py-3 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between shrink-0 z-30 text-[10px] md:text-xs text-slate-400 font-medium select-none gap-2 sm:gap-0">
      <div className="flex items-center gap-2">
        <FlaskConical className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 opacity-80" />
        <span className="font-semibold text-slate-500">IonicMaster v1.2</span>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
        <span>© {currentYear} Sep Alamouti. All Rights Reserved.</span>
        <span className="hidden sm:inline text-slate-300">|</span>
        <a 
          href="https://sepalamouti.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-emerald-600 transition-colors cursor-pointer"
        >
          sepalamouti.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;