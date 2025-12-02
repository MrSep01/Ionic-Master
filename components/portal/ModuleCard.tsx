
import React from 'react';
import { Module } from '../../portal/data';
import { Lock, CheckCircle, FileText, Video, ExternalLink, ArrowRight, BookOpen } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  onLaunchApp: () => void;
  progress?: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onLaunchApp, progress = 0 }) => {
  const isLocked = module.status === 'LOCKED';
  const isActive = module.status === 'ACTIVE';
  const isCompleted = module.status === 'COMPLETED' || progress === 100;

  return (
    <div 
      className={`
        group relative flex flex-col rounded-3xl border-2 transition-all duration-300 overflow-hidden
        ${isLocked 
            ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed' 
            : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 cursor-pointer'
        }
        ${isActive ? 'ring-4 ring-indigo-50/50 border-indigo-100' : ''}
      `}
      onClick={!isLocked ? onLaunchApp : undefined}
    >
      {/* Decorative Gradient Overlay on Hover */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-transparent to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}

      {/* Header Section */}
      <div className="relative p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <span className={`
            px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border
            ${isActive 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : isLocked 
                    ? 'bg-slate-200 text-slate-500 border-slate-200' 
                    : 'bg-emerald-100 text-emerald-700 border-emerald-200'}
          `}>
            Unit {module.unitNumber}
          </span>
          
          {isCompleted && <CheckCircle className="w-6 h-6 text-emerald-500" />}
          {isLocked && <Lock className="w-5 h-5 text-slate-300" />}
        </div>
        
        <h3 className={`text-xl md:text-2xl font-black mb-2 tracking-tight leading-tight ${isLocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-indigo-900 transition-colors'}`}>
          {module.title}
        </h3>
        
        <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-2">
          {module.description}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 mx-6"></div>

      {/* Footer / Resources Area */}
      <div className="relative p-6 pt-4 flex-1 flex flex-col justify-end bg-slate-50/30">
        
        {/* Progress Bar (Only for active modules) */}
        {!isLocked && (
            <div className="mb-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        )}

        {/* Resources Preview */}
        {module.resources.length > 0 && !isLocked ? (
          <div className="space-y-3 mb-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resources Included</p>
            <div className="flex flex-wrap gap-2">
                {module.resources.map((res, idx) => (
                    <a 
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent launching module when clicking resource
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm hover:border-indigo-300 transition-colors"
                    >
                        {res.type === 'PDF' && <FileText className="w-3 h-3 text-rose-500" />}
                        {res.type === 'VIDEO' && <Video className="w-3 h-3 text-blue-500" />}
                        {res.type === 'LINK' && <ExternalLink className="w-3 h-3 text-emerald-500" />}
                        <span className="truncate max-w-[150px]">{res.title}</span>
                    </a>
                ))}
            </div>
          </div>
        ) : (
            !isLocked && <div className="flex-1"></div> // Spacer
        )}

        {/* CTA */}
        {!isLocked && (
            <div className="flex items-center justify-between text-indigo-600 font-bold text-sm mt-2 group-hover:translate-x-1 transition-transform">
                <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {progress > 0 ? 'Continue Module' : 'Start Module'}
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;