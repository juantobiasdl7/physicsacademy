import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { mockLessons, type Lesson, type Prerequisite } from "~/data/mock-lessons";
import LessonNavigation from "~/components/LessonNavigation";
import Navbar from "~/components/Navbar";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const lessonId = params.lessonId ? parseInt(params.lessonId) : -1;
  const lesson = mockLessons.find(l => l.id === lessonId);
  if (!lesson) throw new Response("Not Found", { status: 404 });
  return Response.json({ lesson });
};

export default function LessonPage() {
  const { lesson } = useLoaderData<typeof loader>();
  const { lessonId } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-3xl">
            <div className="mb-6">
              <Link to="/" className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Lessons
              </Link>
            </div>
            
            <div className="border rounded-lg shadow-sm overflow-hidden bg-white mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="text-blue-500 mr-2">
                      {lesson.locked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 ml-2">Lesson</h2>
                  </div>
                  <div className="text-xl text-gray-500">{lesson.xp} XP</div>
                </div>
                <h1 className="text-3xl font-medium text-slate-700 mb-4">{lesson.title}</h1>
              </div>
            </div>
            
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
              <LessonNavigation 
                sections={lesson.sections} 
              />
            ) : (
              <p className="text-gray-500">This lesson has no content yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 