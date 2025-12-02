
import React, { useState } from 'react';
import { Unit, Topic, Lesson, QuizQuestion } from '../../portal/types';
import LessonPage from './LessonPage';
import { BookOpen, CheckCircle, ChevronRight, Menu, X, Play, BrainCircuit, FileText } from 'lucide-react';
import { LessonProgress } from '../../types';

interface UnitViewerProps {
  unit: Unit;
  onExit: () => void;
  onLaunchSimulation: () => void;
  completedLessons: string[];
  onLessonComplete: (lessonId: string) => void;
  lessonProgress: Record<string, LessonProgress>;
  onUpdateLessonProgress: (lessonId: string, progress: LessonProgress) => void;
}

type ViewMode = { type: 'LESSON', lessonId: string } | { type: 'QUIZ', topicId: string } | { type: 'MOCK' };

const UnitViewer: React.FC<UnitViewerProps> = ({ 
    unit, onExit, onLaunchSimulation, completedLessons, onLessonComplete, 
    lessonProgress, onUpdateLessonProgress 
}) => {
  const [currentView, setCurrentView] = useState<ViewMode>({ 
      type: 'LESSON', 
      lessonId: unit.topics[0].lessons[0].id 
  });
  
  const [showSidebar, setShowSidebar] = useState(true);

  // Calculate Unit Progress
  const totalLessons = unit.topics.reduce((acc, topic) => acc + topic.lessons.length, 0);
  const finishedLessons = unit.topics.reduce((acc, topic) => {
      return acc + topic.lessons.filter(l => completedLessons.includes(l.id)).length;
  }, 0);
  const progressPercent = Math.round((finishedLessons / totalLessons) * 100) || 0;

  // Flatten lessons for navigation context
  const allLessons: Lesson[] = [];
  unit.topics.forEach(t => allLessons.push(...t.lessons));
  
  const currentLessonIndex = currentView.type === 'LESSON' 
      ? allLessons.findIndex(l => l.id === currentView.lessonId) 
      : -1;

  const getCurrentLesson = () => {
    if (currentView.type !== 'LESSON') return null;
    return allLessons[currentLessonIndex] || null;
  };

  const handleNextLesson = () => {
      if (currentView.type !== 'LESSON') return;
      
      if (currentLessonIndex !== -1 && currentLessonIndex < allLessons.length - 1) {
          // Go to next lesson
          setCurrentView({ type: 'LESSON', lessonId: allLessons[currentLessonIndex + 1].id });
          window.scrollTo(0, 0);
      } else {
          // End of unit logic (optional: go to dashboard or mock exam)
          onExit();
      }
  };

  const handlePrevLesson = () => {
      if (currentView.type !== 'LESSON') return;

      if (currentLessonIndex > 0) {
          setCurrentView({ type: 'LESSON', lessonId: allLessons[currentLessonIndex - 1].id });
          window.scrollTo(0, 0);
      }
  };

  const renderQuiz = (questions: QuizQuestion[], title: string) => {
      return (
          <div className="max-w-4xl mx-auto py-10">
              <h1 className="text-3xl font-black text-slate-800 mb-6">{title}</h1>
              <div className="space-y-6">
                  {questions.map((q, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                          <p className="font-bold text-lg mb-4 flex gap-3">
                              <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-sm h-fit mt-1">{idx + 1}</span>
                              {q.question}
                          </p>
                          <div className="grid gap-2 pl-10">
                              {q.options.map((opt, i) => (
                                  <button key={i} className="text-left px-4 py-3 rounded-xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 font-medium transition-colors">
                                      {opt}
                                  </button>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Mobile Header */}
      <div className="md:hidden p-4 border-b border-slate-200 flex justify-between items-center bg-white">
         <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 text-slate-600">
             <Menu className="w-6 h-6" />
         </button>
         <span className="font-bold text-sm truncate max-w-[200px]">{unit.title}</span>
         <button onClick={onExit} className="text-xs font-bold text-slate-400 uppercase">Exit</button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-0 md:relative z-40 bg-slate-50 border-r border-slate-200 w-full md:w-80 flex flex-col transition-transform duration-300
        ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden'}
      `}>
          <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">Edexcel IGCSE</h2>
                    <h1 className="font-black text-slate-800 text-xl leading-tight">{unit.title}</h1>
                  </div>
                  <button onClick={onExit} className="md:hidden p-2 bg-white rounded-full shadow-sm"><X className="w-4 h-4" /></button>
              </div>
              
              {/* Unit Progress */}
              <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Unit Progress</span>
                      <span>{progressPercent}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                  </div>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {unit.topics.map(topic => (
                  <div key={topic.id}>
                      <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{topic.title}</h3>
                      <div className="space-y-1">
                          {topic.lessons.map(lesson => {
                              const isComplete = completedLessons.includes(lesson.id);
                              return (
                                  <button
                                    key={lesson.id}
                                    onClick={() => {
                                        setCurrentView({ type: 'LESSON', lessonId: lesson.id });
                                        if (window.innerWidth < 768) setShowSidebar(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-between gap-3 transition-colors ${
                                        currentView.type === 'LESSON' && currentView.lessonId === lesson.id
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                        : 'text-slate-600 hover:bg-white hover:shadow-sm'
                                    }`}
                                  >
                                      <div className="flex items-center gap-3 overflow-hidden">
                                          {currentView.type === 'LESSON' && currentView.lessonId === lesson.id ? <Play className="w-3 h-3 fill-current shrink-0" /> : <FileText className="w-3 h-3 opacity-50 shrink-0" />}
                                          <span className="truncate">{lesson.title}</span>
                                      </div>
                                      {isComplete && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                                  </button>
                              );
                          })}
                          {topic.quiz && (
                              <button
                                onClick={() => {
                                    setCurrentView({ type: 'QUIZ', topicId: topic.id });
                                    if (window.innerWidth < 768) setShowSidebar(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${
                                    currentView.type === 'QUIZ' && currentView.topicId === topic.id
                                    ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                                    : 'text-amber-700 hover:bg-amber-50'
                                }`}
                              >
                                  <BrainCircuit className="w-3 h-3" />
                                  Topic Quiz
                              </button>
                          )}
                      </div>
                  </div>
              ))}

              {unit.mockExam && (
                   <div className="pt-6 border-t border-slate-200">
                       <button
                           onClick={() => {
                               setCurrentView({ type: 'MOCK' });
                               if (window.innerWidth < 768) setShowSidebar(false);
                           }}
                           className={`w-full text-left px-4 py-3 rounded-xl text-sm font-black flex items-center gap-3 transition-all ${
                               currentView.type === 'MOCK'
                               ? 'bg-slate-800 text-white shadow-lg'
                               : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300'
                           }`}
                       >
                           <BookOpen className="w-4 h-4" />
                           UNIT MOCK EXAM
                       </button>
                   </div>
              )}
          </div>
          
          <div className="p-4 border-t border-slate-200 bg-white md:block hidden">
               <button 
                onClick={onExit}
                className="w-full py-2 text-center text-xs font-bold text-slate-400 hover:text-slate-600"
               >
                   ← Return to Dashboard
               </button>
          </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white relative">
          <div className="w-full h-full p-4 md:p-8 lg:p-12">
               {currentView.type === 'LESSON' && getCurrentLesson() && (
                   <LessonPage 
                        lesson={getCurrentLesson()!} 
                        onLaunchSimulation={onLaunchSimulation}
                        onComplete={onLessonComplete}
                        onNext={handleNextLesson}
                        onPrev={currentLessonIndex > 0 ? handlePrevLesson : undefined}
                        initialProgress={lessonProgress[getCurrentLesson()!.id]}
                        onUpdateProgress={onUpdateLessonProgress}
                   />
               )}

               {currentView.type === 'QUIZ' && (
                   renderQuiz(
                       unit.topics.find(t => t.id === currentView.topicId)?.quiz || [],
                       `${unit.topics.find(t => t.id === currentView.topicId)?.title} - Quiz`
                   )
               )}

               {currentView.type === 'MOCK' && unit.mockExam && (
                   renderQuiz(unit.mockExam, 'Unit 1: Mock Exam')
               )}
          </div>
      </div>

    </div>
  );
};

export default UnitViewer;
