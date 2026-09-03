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
    headline: 'AI/ML Engineer building practical machine learning systems.',
    subheadline: 'BS Artificial Intelligence student at FAST-NUCES focused on computer vision, LLM applications, RAG, and production-oriented AI engineering.',
    badges: ['Python', 'FastAPI', 'YOLOv11', 'RAG', 'Supabase', 'Flutter', 'Hugging Face', 'Streamlit'],
    cta: 'Open to full-time AI/ML Engineering roles',
  },
  navItems: [
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],
  certifications: [
    {
      title: 'AI/ML Engineering Internship Certificate',
      organization: 'DevelopersHub Corporation',
      details: '6-week AI/ML Engineering internship.',
      dates: 'Apr 2026 – Jun 2026',
      imagePath: '/certificates/developershub-certificate.png',
    },
    {
      title: 'AI Developer Internship Certificate',
      organization: 'Nexium',
      details: 'Full-stack AI application development using React, Next.js, and Gemini API.',
      dates: 'Jun 2025 – Aug 2025',
      imagePath: '/certificates/nexium-certificate.png',
    }
  ],
} as const;
