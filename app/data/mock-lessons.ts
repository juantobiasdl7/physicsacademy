export interface Prerequisite {
  name: string;
  completed: boolean;
}

export interface Section {
  kind: "EXPLAINER" | "EXAMPLE" | "EXERCISE";
  content: string;       // por ahora solo texto plano
}

export interface Lesson {
  id: number;
  title: string;
  xp: number;
  locked: boolean;
  prerequisites: Prerequisite[];
  sections: Section[];
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
    ],
    sections: [
      { kind: "EXPLAINER", content: "The addition law of probability allows us to find the probability of the union of two events. For any two events A and B, P(A ∪ B) = P(A) + P(B) - P(A ∩ B)" },
      { kind: "EXAMPLE", content: "If the probability of rain tomorrow is 0.3 and the probability of wind is 0.5, and the probability of both rain and wind is 0.2, what is the probability of either rain or wind tomorrow?" },
      { kind: "EXERCISE", content: "A card is drawn from a standard deck. What is the probability of drawing a king or a heart?" }
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
    ],
    sections: [
      { kind: "EXPLAINER", content: "Newton's First Law: An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force." },
      { kind: "EXPLAINER", content: "Newton's Second Law: The acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass. F = ma" },
      { kind: "EXAMPLE", content: "A 5 kg object is pushed with a force of 10 N. What is its acceleration?" },
      { kind: "EXERCISE", content: "A 1500 kg car accelerates from 0 to 27 m/s in 10 seconds. What is the net force acting on the car?" }
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
    ],
    sections: [
      { kind: "EXPLAINER", content: "Quantum mechanics is a fundamental theory in physics that describes nature at the scale of atoms and subatomic particles." },
      { kind: "EXPLAINER", content: "The Heisenberg Uncertainty Principle states that we cannot simultaneously know the exact position and momentum of a particle." },
      { kind: "EXAMPLE", content: "The wave function of a particle in an infinite square well demonstrates quantized energy levels and probability distributions." },
      { kind: "EXERCISE", content: "Calculate the de Broglie wavelength of an electron moving at 5.0 × 10^6 m/s." },
      { kind: "EXERCISE", content: "What is the energy of a photon with a wavelength of 500 nm?" }
    ]
  }
];