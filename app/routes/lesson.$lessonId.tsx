import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mockLessons } from "~/data/mock-lessons";

export const loader = ({ params }: LoaderFunctionArgs) => {
  const lessonId = params.lessonId ? parseInt(params.lessonId) : -1;
  const lesson = mockLessons.find(l => l.id === lessonId);
  if (!lesson) throw new Response("Not Found", { status: 404 });
  return Response.json({ lesson });
};

export default function LessonPage() {
  const { lesson } = useLoaderData<typeof loader>();
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">{lesson.title}</h1>
      <p className="mt-4">🚧 Lesson placeholder 🚧</p>
    </main>
  );
} 