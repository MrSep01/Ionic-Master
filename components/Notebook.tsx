
import React from 'react';
import { NotebookPen, Book, AlertCircle } from 'lucide-react';

interface NotebookProps {
  notes: string;
  onUpdateNotes: (text: string) => void;
}

const Notebook: React.FC<NotebookProps> = ({ notes, onUpdateNotes }) => {
  return (
    <div className="p-2 md:p-6 max-w-4xl mx-auto pb-24 h-full flex flex-col gap-4 md:gap-6">
      
      {/* Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">LAB <span className="text-amber-600">NOTEBOOK</span></h2>
        <div className="h-1 flex-1 bg-slate-100 rounded-full"></div>
      </div>

      {/* Rules Reference Section (Restored) */}
      <div className="bg-white rounded-2xl border-2 border-amber-100 shadow-sm overflow-hidden shrink-0">
          <div className="bg-amber-50 px-4 py-3 border-b border-amber-100 flex items-center gap-2">
              <Book className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Quick Naming Rules</h3>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-2">
                  <p className="font-bold text-slate-700 border-b border-slate-100 pb-1">1. Cations (Metals)</p>
                  <ul className="list-disc list-inside text-slate-500 space-y-1 ml-1">
                      <li>Use the element name directly (e.g., Sodium).</li>
                      <li>For Transition Metals, include charge in roman numerals (e.g., Iron(II)).</li>
                  </ul>
              </div>
              <div className="space-y-2">
                  <p className="font-bold text-slate-700 border-b border-slate-100 pb-1">2. Anions (Non-Metals)</p>
                  <ul className="list-disc list-inside text-slate-500 space-y-1 ml-1">
                      <li>Change the ending to <strong>-ide</strong> (e.g., Chlorine → Chloride).</li>
                      <li>Polyatomic ions keep their special names (e.g., Sulfate).</li>
                  </ul>
              </div>
              <div className="col-span-1 sm:col-span-2 bg-slate-50 p-2 rounded-lg border border-slate-100 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-500 text-[10px] sm:text-xs">
                      <strong>Golden Rule:</strong> The total positive charge must equal the total negative charge. The net charge of the compound must be zero.
                  </p>
              </div>
          </div>
      </div>

      {/* Notes Text Area */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl border-2 border-slate-100 shadow-lg overflow-hidden relative group focus-within:ring-4 focus-within:ring-amber-100 focus-within:border-amber-400 transition-all">
          <div className="absolute top-0 left-0 w-full h-8 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-10 pointer-events-none"></div>
          
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <NotebookPen className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">My Field Notes</span>
              </div>
              <span className="text-[10px] text-emerald-500 font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">
                  Saving...
              </span>
          </div>

          <textarea 
            value={notes}
            onChange={(e) => onUpdateNotes(e.target.value)}
            placeholder="Type your observations, memory hooks, or questions here..."
            className="flex-1 w-full p-4 resize-none outline-none text-slate-700 leading-relaxed font-medium placeholder:text-slate-300 text-sm sm:text-base bg-[linear-gradient(transparent_1.5rem,#f1f5f9_1.5rem)] bg-[length:100%_1.55rem] bg-local attachment-local"
            style={{ lineHeight: '1.55rem' }}
          />
      </div>
    </div>
  );
};

export default Notebook;
