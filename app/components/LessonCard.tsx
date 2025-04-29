import React, { useState } from "react";

interface Prerequisite {
  name: string;
  completed: boolean;
}

interface LessonCardProps {
  title: string;
  xp: number;
  locked?: boolean;
  prerequisites?: Prerequisite[];
}

export default function LessonCard({ 
  title, 
  xp, 
  locked = false,
  prerequisites = [] 
}: LessonCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

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
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-12 rounded-full text-xl transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle start lesson logic here
              }}
            >
              Start
            </button>
          </div>
        </>
      )}
    </div>
  );
} 