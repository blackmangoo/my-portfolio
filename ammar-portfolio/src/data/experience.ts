export interface Experience {
  role: string;
  organization: string;
  location: string;
  dates: string;
  type: 'internship' | 'teaching';
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    role: 'AI/ML Engineering Intern',
    organization: 'DevelopersHub Corporation',
    location: 'Remote / Pakistan',
    dates: 'Apr 2026 – Jun 2026',
    type: 'internship',
    bullets: [
      'Designed and deployed applied AI systems focusing on LLMs, RAG pipelines, and NLP classification.',
      'Engineered modular applications integrating Hugging Face models, FAISS vector stores, and Streamlit interfaces.',
      'Implemented fine-tuning pipelines using LoRA for custom instruction-following tasks.'
    ],
  },
  {
    role: 'AI Developer Intern',
    organization: 'Nexium',
    location: 'Lahore, Pakistan',
    dates: 'Jun 2025 – Aug 2025',
    type: 'internship',
    bullets: [
      'Built full-stack applications using React, Next.js, and Supabase.',
      'Integrated the Gemini API and automated LLM workflows using n8n orchestration.',
      'Developed data pipelines for web scraping, translation, and structured data generation.'
    ],
  },
  {
    role: 'Teaching Assistant — Programming Fundamentals',
    organization: 'FAST-NUCES',
    location: 'Lahore, Pakistan',
    dates: 'Sep 2024 – Jun 2025',
    type: 'teaching',
    bullets: [
      'Mentored students in C++ and core programming fundamentals.',
      'Evaluated code quality, logic-building, and project implementation.'
    ],
  },
];
