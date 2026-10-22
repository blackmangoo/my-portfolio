export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export const siteConfig = {
  name: 'Ammar Akbar',
  shortName: 'Ammar Akbar',
  role: 'AI/ML Engineer | LLM Orchestration & RAG',
  title: 'AI/ML Engineer',
  email: 'ammar.akbar2002@gmail.com',
  github: 'https://github.com/blackmangoo',
  linkedin: 'https://linkedin.com/in/ammar-akbar2002',
  portfolio: 'ammar.works',
  cvPath: '/files/ammar-akbar-cv.pdf?v=2026-10',
  location: 'Lahore, Pakistan',
  education: {
    institution: 'FAST - National University of Computer and Emerging Sciences',
    degree: 'Bachelor of Science in Artificial Intelligence',
    dates: 'Aug 2022 – Jun 2026',
    location: 'Faisalabad, Pakistan',
  },
  hero: {
    headline: 'AI/ML Engineer specializing in LLM orchestration, RAG, and applied NLP.',
    subheadline: 'BS Artificial Intelligence graduate from FAST-NUCES building context-aware AI systems with deterministic safety controls, from LoRA/QLoRA fine-tuning and vector retrieval to deployment with FastAPI and Supabase.',
    badges: ['Python', 'FastAPI', 'LangChain', 'pgvector (HNSW)', 'LoRA / QLoRA', 'YOLO11', 'Three.js / WebGL'],
    cta: 'Open to full-time AI/ML Engineering roles (Remote & Onsite)',
  },
  navItems: [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Client Work', href: '#clients' },
    { label: 'Skills', href: '#skills' },
    { label: 'About', href: '#about' },
    { label: 'Credentials', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],
  certifications: [
    {
      title: 'AI/ML Engineering Internship Certificate',
      organization: 'DevelopersHub Corporation',
      details: 'Delivered 5 applied AI systems spanning NLP classification, LLM orchestration, and RAG.',
      dates: 'Apr 2026 – Jun 2026',
      imagePath: '/certificates/developershub-certificate.png',
    },
    {
      title: 'AI Developer Internship Certificate',
      organization: 'Nexium',
      details: 'Full-stack AI workflows using React, Next.js, Supabase, n8n, and Gemini API on Vercel.',
      dates: 'Jun 2025 – Aug 2025',
      imagePath: '/certificates/nexium-certificate.png',
    }
  ],
} as const;
