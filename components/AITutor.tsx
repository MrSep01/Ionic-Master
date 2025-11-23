import React from 'react';
import { Bot, Sparkles, AlertCircle } from 'lucide-react';

interface AITutorProps {
  message: string;
  type: 'hint' | 'success' | 'error' | 'idle';
  isLoading?: boolean;
}

const AITutor: React.FC<AITutorProps> = ({ message, type, isLoading }) => {
  if (!message && !isLoading) return null;

  let bgColor = 'bg-slate-100';
  let icon = <Bot className="w-5 h-5 text-slate-600" />;
  let textColor = 'text-slate-700';

  if (type === 'success') {
    bgColor = 'bg-green-50 border-green-200';
    icon = <Sparkles className="w-5 h-5 text-green-600" />;
    textColor = 'text-green-800';
  } else if (type === 'error') {
    bgColor = 'bg-amber-50 border-amber-200';
    icon = <AlertCircle className="w-5 h-5 text-amber-600" />;
    textColor = 'text-amber-800';
  } else if (type === 'hint') {
    bgColor = 'bg-indigo-50 border-indigo-200';
    icon = <Bot className="w-5 h-5 text-indigo-600" />;
    textColor = 'text-indigo-800';
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${bgColor} transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}>
      <div className="mt-1 shrink-0 bg-white p-1.5 rounded-full shadow-sm">
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          icon
        )}
      </div>
      <div className="flex-1">
        <h4 className={`text-sm font-bold uppercase tracking-wider mb-1 ${textColor} opacity-70`}>
            {type === 'success' ? 'Fun Fact' : type === 'error' ? 'Tutor Feedback' : 'AI Hint'}
        </h4>
        <p className={`text-sm leading-relaxed ${textColor}`}>
          {isLoading ? "Analyzing chemical structure..." : message}
        </p>
      </div>
    </div>
  );
};

export default AITutor;
