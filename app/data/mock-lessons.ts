interface Prerequisite {
  name: string;
  completed: boolean;
}

interface Lesson {
  id: number;
  title: string;
  xp: number;
  locked: boolean;
  prerequisites: Prerequisite[];
}

export const mockLessons: Lesson[] = [
  {
    id: 1,
    title: "The Addition Law of Probability",
    xp: 15,
    locked: false,
    prerequisites: [
      {
        name: "Independent Events",
        completed: true
      }
    ]
  },
  {
    id: 2,
    title: "Newton's Laws of Motion",
    xp: 20,
    locked: false,
    prerequisites: [
      {
        name: "Basic Kinematics",
        completed: true
      }
    ]
  },
  {
    id: 3, 
    title: "Quantum Mechanics Fundamentals",
    xp: 30,
    locked: true,
    prerequisites: [
      {
        name: "Wave Properties",
        completed: false
      },
      {
        name: "Modern Physics",
        completed: true
      }
    ]
  }
];