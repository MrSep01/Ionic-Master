
import React, { useState } from 'react';
import { FlaskConical, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  onSetNickname: (name: string) => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSetNickname }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a name or nickname.');
      return;
    }
    if (name.length > 15) {
        setError('Name is too long (max 15 chars).');
        return;
    }
    onSetNickname(name.trim());
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white ring-4 ring-indigo-500/20 relative animate-in zoom-in-95 duration-500">
        
        {/* Header Graphic */}
        <div className="bg-indigo-600 p-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
             <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-inner ring-1 ring-white/30">
                <FlaskConical className="w-10 h-10 text-white" />
             </div>
             <h1 className="text-2xl font-black text-white tracking-tight">IONIC<span className="text-emerald-300">MASTER</span></h1>
             <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mt-1">Chemistry Simulation Lab</p>
        </div>

        <div className="p-8">
            <h2 className="text-center text-slate-800 font-bold text-lg mb-6">Create Your ID Card</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nickname" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                        Lab Nickname
                    </label>
                    <input 
                        type="text" 
                        id="nickname"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        placeholder="e.g. Proton Pete"
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all placeholder:text-slate-300"
                        autoFocus
                    />
                    {error && <p className="text-rose-500 text-xs font-bold mt-2 ml-1 animate-in slide-in-from-left-2">{error}</p>}
                </div>

                <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl font-black shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                    ENTER LAB <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
            
            <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
                This name will appear on your<br/><strong>Certificates of Mastery</strong>.
            </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
