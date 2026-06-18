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
  name: 'Mian Muhammad Ammar',
  shortName: 'Ammar Akbar',
  role: 'AI/ML Engineer & Full-Stack AI Developer',
  title: 'AI & ML Engineer',
  email: 'ammar.akbar2002@gmail.com',
  phone: '03214797778',
  github: 'https://github.com/blackmangoo',
  linkedin: 'https://linkedin.com/in/ammar-akbar2002',
  portfolio: 'ammar.works',
  cvPath: '/files/ammar-akbar-cv.pdf',
  location: 'Lahore, Pakistan',
  education: {
    institution: 'FAST - National University of Computer and Emerging Sciences',
    degree: 'BS Artificial Intelligence',
    dates: '2022 – 2026',
    location: 'Lahore, Pakistan',
  },
  hero: {
    headline: 'AI/ML Engineer building deployable Computer Vision, RAG & Full-Stack AI systems.',
    subheadline: 'Final-semester BS Artificial Intelligence student at FAST-NUCES, building production-style AI products with Python, FastAPI, Supabase, YOLOv11, LLMs, RAG pipelines, Streamlit, and modern full-stack interfaces.',
    badges: ['Python', 'FastAPI', 'YOLOv11', 'RAG', 'Supabase', 'Flutter', 'Hugging Face', 'Streamlit'],
    cta: 'Open to Summer 2026 AI/ML Engineering and Full-Stack Software Development roles.',
  },
  navItems: [
    { label: 'Home', href: '#home' },
    { label: 'OmniDrive', href: '#omnidrive' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certificate', href: '#certificate' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],
  certifications: [
    {
      title: 'AI/ML Engineering Internship Certificate',
      organization: 'DevelopersHub Corporation',
      details: '6-week AI/ML Engineering internship with exceptional performance recognition.',
      dates: '28 April 2026 – 9 June 2026',
      imagePath: '/certificates/developershub-certificate.png',
    },
    {
      title: 'AI Developer Internship Certificate',
      organization: 'Nexium',
      details: 'Full-stack AI application development using React, Next.js, and Gemini API.',
      dates: 'June 2025 – August 2025',
      imagePath: '/certificates/nexium-certificate.png',
    }
  ],
} as const;
