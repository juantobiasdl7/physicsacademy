import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/components/Navbar";
import LessonCard from "~/components/LessonCard";
import { mockLessons } from "~/data/mock-lessons";

export const meta: MetaFunction = () => {
  return [
    { title: "Physics Academy" },
    { name: "description", content: "Learn physics concepts with Physics Academy" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center space-y-6">
          {mockLessons.map(l => (
            <LessonCard
              key={l.id}
              title={l.title}
              xp={l.xp}
              locked={l.locked}
              prerequisites={l.prerequisites}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

