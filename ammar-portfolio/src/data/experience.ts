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
      'Completed a 6-week AI/ML Engineering internship with exceptional performance recognition.',
      'Built applied AI systems across LLMs, RAG, NLP, ML pipelines, Streamlit dashboards, and deployment.',
      'Developed Serene, DocuMind, NewsLens, TicketIQ, Luxe Estate, and other AI systems.',
      'Worked with Hugging Face, FAISS, LangChain, BERT, LoRA, Streamlit, Supabase, Docker, and XGBoost.',
    ],
  },
  {
    role: 'AI Developer Intern',
    organization: 'Nexium',
    location: 'Lahore, Pakistan',
    dates: 'Jun 2025 – Aug 2025',
    type: 'internship',
    bullets: [
      'Built full-stack AI applications using React, Next.js, Tailwind, Supabase, n8n, Vercel, and Gemini API.',
      'Developed an AI Recipe Generator with Supabase magic-link authentication, n8n workflow orchestration, Gemini generation, and real-time dashboard updates.',
      'Built a Blog Summariser & Translator using React, Node.js, jsdom scraping, Supabase persistence, and Urdu translation.',
      'Built Gemini-powered Quote Generator with responsive React UI and prompt-engineered topic generation.',
    ],
  },
  {
    role: 'Teaching Assistant — Programming Fundamentals',
    organization: 'FAST-NUCES',
    location: 'Lahore, Pakistan',
    dates: 'Sep 2024 – Jun 2025',
    type: 'teaching',
    bullets: [
      'Mentored students in C++ and programming fundamentals.',
      'Guided debugging, logic-building, project development, and code quality.',
      'Supported student teams from planning to implementation.',
    ],
  },
];
