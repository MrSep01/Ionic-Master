
import React, { useState } from 'react';
import { X, Trash2, Save, RotateCcw, User, Edit2, Check } from 'lucide-react';
import { DifficultyLevel } from '../types';

interface SettingsModalProps {
  onClose: () => void;
  onReset: () => void;
  onUpdateNickname: (name: string) => void;
  currentLevel: DifficultyLevel;
  score: number;
  nickname?: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onReset, onUpdateNickname, currentLevel, score, nickname = 'Student' }) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(nickname);

  const handleSaveName = () => {
    if (newName.trim() && newName.length <= 15) {
        onUpdateNickname(newName.trim());
        setIsEditingName(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border-4 border-slate-100">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <Save className="w-5 h-5 text-indigo-500" />
            SETTINGS
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {/* Status Card */}
          <div className="bg-indigo-50 rounded-2xl p-4 mb-6 border border-indigo-100 relative">
             <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Student ID</h3>
             
             {isEditingName ? (
                 <div className="flex gap-2 mb-4">
                     <input 
                        type="text" 
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 px-3 py-1 rounded-lg border-2 border-indigo-200 font-bold text-indigo-900 outline-none focus:border-indigo-500"
                        autoFocus
                     />
                     <button 
                        onClick={handleSaveName}
                        className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                     >
                        <Check className="w-4 h-4" />
                     </button>
                 </div>
             ) : (
                 <div className="flex items-center justify-between mb-4 group">
                    <p className="text-indigo-900 font-black text-2xl">{nickname}</p>
                    <button 
                        onClick={() => setIsEditingName(true)}
                        className="p-1.5 bg-indigo-100 rounded-lg text-indigo-400 opacity-0 group-hover:opacity-100 hover:bg-indigo-200 hover:text-indigo-600 transition-all"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                 </div>
             )}

             <div className="flex justify-between items-end border-t border-indigo-100 pt-3">
                <div>
                    <p className="text-slate-500 text-xs font-semibold uppercase">Current Rank</p>
                    <p className="text-slate-700 font-bold">{currentLevel}</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-500 text-xs font-semibold uppercase">Total Score</p>
                    <p className="text-slate-700 font-bold">{score}</p>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data Management</h3>
             
             {!confirmReset ? (
                 <button 
                    onClick={() => setConfirmReset(true)}
                    className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 hover:border-rose-200 hover:bg-rose-50 group transition-all"
                 >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-rose-200 group-hover:text-rose-600 text-slate-400 transition-colors">
                            <RotateCcw className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-slate-700 group-hover:text-rose-700">Reset Progress</p>
                            <p className="text-xs text-slate-400 group-hover:text-rose-400">Clear score, levels, and badges</p>
                        </div>
                    </div>
                 </button>
             ) : (
                 <div className="bg-rose-50 border-2 border-rose-100 rounded-xl p-4 animate-in slide-in-from-bottom-2">
                     <p className="text-rose-800 font-bold text-sm mb-1">Are you sure?</p>
                     <p className="text-rose-600 text-xs mb-3">This action cannot be undone. All your progress will be lost.</p>
                     <div className="flex gap-2">
                         <button 
                            onClick={onReset}
                            className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2"
                         >
                            <Trash2 className="w-4 h-4" /> Yes, Reset
                         </button>
                         <button 
                            onClick={() => setConfirmReset(false)}
                            className="flex-1 py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-100 rounded-lg text-sm font-bold"
                         >
                            Cancel
                         </button>
                     </div>
                 </div>
             )}
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 text-center">
            <p className="text-[10px] text-slate-400">IonicMaster v1.2 • Educational Use Only</p>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
