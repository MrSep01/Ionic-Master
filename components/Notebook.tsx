
import React, { useState } from 'react';
import { NotebookPen, Book, AlertCircle, History, Award, ScrollText, PenLine, User } from 'lucide-react';
import { HistoryEntry, CertificateEntry, DifficultyLevel } from '../types';
import ChemicalDisplay from './ChemicalDisplay';

interface NotebookProps {
  notes: string;
  onUpdateNotes: (text: string) => void;
  history: HistoryEntry[];
  certificates: CertificateEntry[];
  onViewCertificate: (level: DifficultyLevel) => void;
  nickname: string;
}

type Tab = 'notes' | 'log' | 'achievements' | 'reference';

const Notebook: React.FC<NotebookProps> = ({ notes, onUpdateNotes, history, certificates, onViewCertificate, nickname }) => {
  const [activeTab, setActiveTab] = useState<Tab>('notes');

  const renderReference = () => (
      <div className="bg-white rounded-2xl border-2 border-amber-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-2">
          <div className="bg-amber-50 px-4 py-3 border-b border-amber-100 flex items-center gap-2">
              <Book className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Naming Rules Cheatsheet</h3>
          </div>
          <div className="p-4 grid grid-cols-1 gap-4 text-xs sm:text-sm">
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
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-slate-500 text-[10px] sm:text-xs">
                      <strong>Golden Rule:</strong> The total positive charge must equal the total negative charge. The net charge of the compound must be zero.
                  </p>
              </div>
          </div>
      </div>
  );

  const renderLog = () => (
      <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
          {history.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <History className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">No compounds synthesized yet.</p>
                  <p className="text-xs text-slate-300 mt-1">Start the game to fill your log!</p>
              </div>
          ) : (
              history.map((entry) => (
                  <div key={entry.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                          <div>
                              {/* Added mb-2 here to prevent overlap with the name below */}
                              <div className="font-serif font-black text-xl text-slate-800 flex items-center gap-2 mb-2">
                                  <ChemicalDisplay 
                                    symbol={entry.cation.symbol} 
                                    count={entry.cationCount} 
                                    isPoly={entry.cation.isPolyatomic} 
                                  />
                                  <ChemicalDisplay 
                                    symbol={entry.anion.symbol} 
                                    count={entry.anionCount} 
                                    isPoly={entry.anion.isPolyatomic} 
                                  />
                              </div>
                              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{entry.targetName}</p>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full shrink-0 ml-2">
                              {new Date(entry.timestamp).toLocaleDateString()}
                          </span>
                      </div>
                      <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-50">
                          <p className="text-xs text-indigo-800 leading-relaxed italic">
                              "{entry.funFact}"
                          </p>
                      </div>
                  </div>
              ))
          )}
      </div>
  );

  const renderAchievements = () => (
      <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
          {certificates.length > 0 && (
             <div className="flex items-center gap-2 px-2 py-1 bg-amber-50 rounded-lg w-fit border border-amber-100">
                <User className="w-3 h-3 text-amber-500" />
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Awarded to {nickname}</span>
             </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.length === 0 ? (
                  <div className="col-span-full text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                      <Award className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-400 font-medium">No certificates earned yet.</p>
                      <p className="text-xs text-slate-300 mt-1">Master a level to earn your first award!</p>
                  </div>
              ) : (
                  certificates.map((cert, idx) => (
                      <button 
                        key={idx}
                        onClick={() => onViewCertificate(cert.level)}
                        className="bg-white p-6 rounded-2xl border-2 border-amber-100 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all group text-left relative overflow-hidden"
                      >
                          <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-50 rounded-full group-hover:bg-amber-100 transition-colors"></div>
                          <Award className="w-8 h-8 text-amber-500 mb-3 relative z-10" />
                          <h3 className="font-black text-slate-800 text-lg relative z-10">{cert.level} Chemist</h3>
                          <p className="text-xs text-slate-400 font-medium relative z-10">Earned on {new Date(cert.timestamp).toLocaleDateString()}</p>
                          <div className="mt-4 text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                              View Certificate <ScrollText className="w-3 h-3" />
                          </div>
                      </button>
                  ))
              )}
          </div>
      </div>
  );

  return (
    <div className="p-2 md:p-6 max-w-4xl mx-auto pb-24 h-full flex flex-col gap-4">
      
      {/* Header & Tabs */}
      <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">LAB <span className="text-amber-600">NOTEBOOK</span></h2>
            <div className="h-1 flex-1 bg-slate-100 rounded-full"></div>
          </div>

          <div className="flex bg-slate-100/50 p-1 rounded-xl overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab('notes')}
                className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'notes' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                  <PenLine className="w-3.5 h-3.5" /> Notes
              </button>
              <button 
                onClick={() => setActiveTab('log')}
                className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'log' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                  <History className="w-3.5 h-3.5" /> Lab Log
              </button>
              <button 
                onClick={() => setActiveTab('achievements')}
                className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'achievements' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                  <Award className="w-3.5 h-3.5" /> Awards
              </button>
              <button 
                onClick={() => setActiveTab('reference')}
                className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'reference' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                  <Book className="w-3.5 h-3.5" /> Rules
              </button>
          </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto min-h-[300px]">
          {activeTab === 'notes' && (
             <div className="h-full flex flex-col bg-white rounded-3xl border-2 border-slate-100 shadow-lg overflow-hidden relative group focus-within:ring-4 focus-within:ring-amber-100 focus-within:border-amber-400 transition-all">
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
          )}

          {activeTab === 'log' && renderLog()}
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'reference' && renderReference()}
      </div>
    </div>
  );
};

export default Notebook;
