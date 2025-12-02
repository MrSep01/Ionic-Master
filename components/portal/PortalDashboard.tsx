
import React, { useState } from 'react';
import { CURRICULUM, CourseLevel } from '../../portal/data';
import { IGCSE_UNIT_1 } from '../../portal/igcse-unit1';
import { IGCSE_UNIT_2 } from '../../portal/igcse-unit2';
import ModuleCard from './ModuleCard';
import { FlaskConical, GraduationCap, Mail, BookOpen, Layers } from 'lucide-react';

interface PortalDashboardProps {
  onStartUnit: (unitId: string) => void;
  completedLessons: string[];
}

const PortalDashboard: React.FC<PortalDashboardProps> = ({ onStartUnit, completedLessons }) => {
  const [activeLevel, setActiveLevel] = useState<CourseLevel>('IGCSE');

  // Filter modules based on selected level
  const displayedModules = CURRICULUM.filter(m => m.level === activeLevel);

  const getProgress = (moduleId: string) => {
      let unit = null;
      if (moduleId === 'igcse-topic-1') unit = IGCSE_UNIT_1;
      if (moduleId === 'igcse-topic-2') unit = IGCSE_UNIT_2;
      
      if (!unit) return 0;

      const totalLessons = unit.topics.reduce((acc, topic) => acc + topic.lessons.length, 0);
      if (totalLessons === 0) return 0;

      const finished = unit.topics.reduce((acc, topic) => {
          return acc + topic.lessons.filter(l => completedLessons.includes(l.id)).length;
      }, 0);

      return Math.round((finished / totalLessons) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-y-auto">
      
      {/* Hero Header */}
      <header className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className={`absolute inset-0 bg-gradient-to-br opacity-60 transition-colors duration-500 ${activeLevel === 'IGCSE' ? 'from-teal-600 to-blue-600' : 'from-indigo-600 to-purple-600'}`}></div>
        
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-in fade-in slide-in-from-bottom-4">
             <span className={`w-2 h-2 rounded-full animate-pulse ${activeLevel === 'IGCSE' ? 'bg-teal-400' : 'bg-purple-400'}`}></span>
             <span className="text-xs font-bold tracking-wide uppercase">Edexcel Curriculum • 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Chemistry<br/>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeLevel === 'IGCSE' ? 'from-teal-300 to-cyan-300' : 'from-indigo-300 to-purple-300'}`}>
              Learning Portal
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Welcome to your digital classroom. Select your course level to access simulations, past paper resources, and unit breakdowns tailored for the Edexcel specification.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                <FlaskConical className={`w-6 h-6 ${activeLevel === 'IGCSE' ? 'text-teal-400' : 'text-indigo-400'}`} />
                <div className="text-left">
                    <p className="text-xs text-slate-400 uppercase font-bold">Instructor</p>
                    <p className="font-bold">Sep Alamouti</p>
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Course Selector Tabs */}
        <div className="flex justify-center mb-12">
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex">
                <button
                    onClick={() => setActiveLevel('IGCSE')}
                    className={`
                        px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wide flex items-center gap-2 transition-all
                        ${activeLevel === 'IGCSE' 
                            ? 'bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-200' 
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}
                    `}
                >
                    <BookOpen className="w-4 h-4" /> IGCSE (9-1)
                </button>
                <button
                    onClick={() => setActiveLevel('A-LEVEL')}
                    className={`
                        px-6 py-3 rounded-xl text-sm font-black uppercase tracking-wide flex items-center gap-2 transition-all
                        ${activeLevel === 'A-LEVEL' 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}
                    `}
                >
                    <Layers className="w-4 h-4" /> A-Level (IAL)
                </button>
            </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
            <GraduationCap className={`w-8 h-8 ${activeLevel === 'IGCSE' ? 'text-teal-600' : 'text-indigo-600'}`} />
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">
                {activeLevel === 'IGCSE' ? 'Edexcel IGCSE Modules' : 'Edexcel IAL Modules'}
            </h2>
        </div>

        {/* Curriculum Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedModules.map((module) => (
            <ModuleCard 
                key={module.id} 
                module={module} 
                onLaunchApp={() => onStartUnit(module.id)}
                progress={getProgress(module.id)}
            />
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <p className="font-black text-slate-800 text-lg">CHEMISTRY PORTAL</p>
                <p className="text-slate-400 text-sm mt-1">Digital tools for modern science.</p>
            </div>
            
            <div className="flex gap-6">
                <a href="mailto:your-email@school.edu" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors">
                    <Mail className="w-4 h-4" /> Contact Instructor
                </a>
                <a href="https://sepalamouti.com" target="_blank" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors">
                   Sep Alamouti
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default PortalDashboard;
