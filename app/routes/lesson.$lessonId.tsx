import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { mockLessons, type Lesson, type Prerequisite } from "~/data/mock-lessons";
import LessonNavigation from "~/components/LessonNavigation";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const lessonId = params.lessonId ? parseInt(params.lessonId) : -1;
  const lesson = mockLessons.find(l => l.id === lessonId);
  if (!lesson) throw new Response("Not Found", { status: 404 });
  return Response.json({ lesson });
};

export default function LessonPage() {
  const { lesson } = useLoaderData<typeof loader>();
  
  return (
    <main className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Lessons
        </Link>
      </div>
      
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {lesson.xp} XP
            </span>
            {lesson.locked ? (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Locked
              </span>
            ) : (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Unlocked
              </span>
            )}
          </div>
        </div>
        
        {lesson.prerequisites.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Prerequisites:</h3>
            <ul className="space-y-1">
              {lesson.prerequisites.map((prereq: Prerequisite, index: number) => (
                <li 
                  key={index} 
                  className={`text-sm flex items-center gap-1 ${
                    prereq.completed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {prereq.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  )}
                  {prereq.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      
      {lesson.locked ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h2 className="text-xl font-bold text-red-700 mb-2">This lesson is locked</h2>
          <p className="text-red-600 mb-4">Complete the prerequisites to unlock this lesson.</p>
        </div>
      ) : lesson.sections.length > 0 ? (
        <LessonNavigation sections={lesson.sections} />
      ) : (
        <p className="text-gray-500">This lesson has no content yet.</p>
      )}
    </main>
  );
} 