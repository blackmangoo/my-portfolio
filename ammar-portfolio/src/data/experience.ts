export interface Experience {
  role: string;
  organization: string;
  location: string;
  dates: string;
  type: 'internship' | 'teaching' | 'education';
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    role: 'AI/ML Engineering Intern',
    organization: 'DevelopersHub Corporation',
    location: 'Lahore, Pakistan',
    dates: 'Apr 2026 – Jun 2026',
    type: 'internship',
    bullets: [
      'Delivered 5 applied AI systems in 6 weeks (Serene, DocuMind, NewsLens, TicketIQ, Luxe Estate) spanning NLP classification, LLM orchestration, and RAG, shipped as containerized inference services.',
      'Built deterministic crisis-safety controls for the Serene health platform that intercept severe-distress signals and override the LLM with safe fallback responses.',
    ],
  },
  {
    role: 'AI Developer Intern',
    organization: 'Nexium',
    location: 'Lahore, Pakistan',
    dates: 'Jun 2025 – Aug 2025',
    type: 'internship',
    bullets: [
      'Shipped production AI workflows using React, Next.js, and the Gemini API, deploying consumer-facing applications on Vercel with event-driven automation via n8n.',
      'Designed Supabase persistence layers and validated structured LLM outputs (JSON validation) before feeding them into real-time front-end state management.',
    ],
  },
  {
    role: 'Teaching Assistant — Programming Fundamentals',
    organization: 'FAST-NUCES',
    location: 'Lahore, Pakistan',
    dates: 'Sep 2024 – Jun 2025',
    type: 'teaching',
    bullets: [
      'Mentored 60+ students in C++ memory management, algorithm debugging, and software architecture.',
    ],
  },
  {
    role: 'Bachelor of Science in Artificial Intelligence',
    organization: 'FAST - National University of Computer and Emerging Sciences',
    location: 'Faisalabad, Pakistan',
    dates: 'Aug 2022 – Jun 2026',
    type: 'education',
    bullets: [
      'Graduated with specialization in Machine Learning, Deep Learning, Computer Vision, and Applied NLP.',
      'Final Year Project: OmniDrive AI — real-time edge computer vision (YOLO11-Large), 2-state Kalman-filter sensor fusion, and RAG diagnostic platform.',
    ],
  },
];
