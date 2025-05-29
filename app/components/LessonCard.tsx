import React, { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { type Section, type Prerequisite } from "~/data/mock-lessons";
import { getLessonProgress, hasLessonProgress } from "~/data/progress-service";

interface LessonCardProps {
  id: number;
  title: string;
  xp: number;
  locked?: boolean;
  prerequisites?: Prerequisite[];
  sections?: Section[];
}

export default function LessonCard({ 
  id,
  title, 
  xp, 
  locked = false,
  prerequisites = [],
  sections = []
}: LessonCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);
  const [currentSection, setCurrentSection] = useState<number | null>(null);
  const navigate = useNavigate();

  // Verificar si hay avance guardado para esta lección
  useEffect(() => {
    if (hasLessonProgress(id)) {
      setHasProgress(true);
      const sectionIndex = getLessonProgress(id, sections.length);
      if (sectionIndex !== null) {
        setCurrentSection(sectionIndex);
      }
    }
  }, [id, sections.length]);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Count section types
  const explainerCount = sections.filter(s => s.kind === "EXPLAINER").length;
  const exampleCount = sections.filter(s => s.kind === "EXAMPLE").length;
  const exerciseCount = sections.filter(s => s.kind === "EXERCISE").length;

  return (
    <div 
      className="w-full max-w-3xl border rounded-lg shadow-sm overflow-hidden"
      onClick={toggleExpand}
    >
      <div className="p-6 cursor-pointer">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="text-blue-500 mr-2">
              {locked ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 ml-2">Lesson</h2>
          </div>
          <div className="text-xl text-gray-500">{xp} XP</div>
        </div>
        <h3 className="text-3xl font-medium text-slate-700">{title}</h3>
        
        <div className="flex mt-4 space-x-3">
          {hasProgress && (
            <div className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {currentSection !== null ? `Progress: ${currentSection + 1}/${sections.length}` : 'In Progress'}
            </div>
          )}
          
          {explainerCount > 0 && (
            <div className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {explainerCount} {explainerCount === 1 ? 'Theory' : 'Theories'}
            </div>
          )}
          
          {exampleCount > 0 && (
            <div className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {exampleCount} {exampleCount === 1 ? 'Example' : 'Examples'}
            </div>
          )}
          
          {exerciseCount > 0 && (
            <div className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-sm flex items-center">
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {exerciseCount} {exerciseCount === 1 ? 'Exercise' : 'Exercises'}
            </div>
          )}
        </div>
      </div>

      {expanded && (
        <>
          <div className="border-t border-gray-200">
            <div className="p-6">
              <h4 className="text-xl font-bold text-indigo-900 uppercase mb-4">Prerequisites</h4>
              <ul className="space-y-3">
                {prerequisites.length > 0 ? (
                  prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">
                        {prereq.completed && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        )}
                      </span>
                      <span className="text-xl text-blue-600">{prereq.name}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    </span>
                    <span className="text-xl text-blue-600">Independent Events</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200">
            <button 
              className={`font-bold py-3 px-12 rounded-full text-xl transition-colors ${
                hasProgress 
                  ? "bg-amber-500 hover:bg-amber-600 text-white" 
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/lesson/${id}`);
              }}
            >
              {hasProgress ? "Resume" : "Start"}
            </button>
          </div>
        </>
      )}
    </div>
  );
} 