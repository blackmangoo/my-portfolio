export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
  primarySkills?: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'LLM & RAG Orchestration',
    icon: 'brain',
    skills: [
      'LangChain',
      'pgvector (HNSW)',
      'FAISS',
      'LoRA / QLoRA (PEFT)',
      'MiniLM Embeddings',
      'Qwen 2.5',
      'LLaMA 3',
      'DistilRoBERTa',
      'Agentic Workflows',
    ],
    primarySkills: ['LangChain', 'pgvector (HNSW)', 'LoRA / QLoRA (PEFT)', 'FAISS'],
  },
  {
    category: 'Machine Learning & Vision',
    icon: 'layers',
    skills: [
      'PyTorch',
      'Hugging Face',
      'YOLO11',
      'ONNX Runtime',
      'OpenCV',
      'Sensor Fusion (Kalman)',
      'Scikit-learn',
      'XGBoost',
    ],
    primarySkills: ['PyTorch', 'YOLO11', 'Hugging Face', 'Sensor Fusion (Kalman)'],
  },
  {
    category: 'Backend & Data Engineering',
    icon: 'server',
    skills: [
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Supabase',
      'Docker',
      'REST APIs & WebSockets',
      'SQL',
      'n8n Automation',
      'Playwright',
    ],
    primarySkills: ['FastAPI', 'Python', 'PostgreSQL', 'Supabase', 'Docker'],
  },
  {
    category: 'Frontend & Mobile Engineering',
    icon: 'monitor',
    skills: [
      'Flutter (Clean Arch / Riverpod)',
      'React',
      'Next.js',
      'TypeScript / JavaScript',
      'Tailwind CSS',
      'Dart',
      'Three.js / WebGL',
      'GSAP',
    ],
    primarySkills: ['Flutter (Clean Arch / Riverpod)', 'Next.js', 'React', 'Three.js / WebGL'],
  },
  {
    category: 'Core Languages & Tooling',
    icon: 'terminal',
    skills: [
      'Python',
      'C++',
      'Dart',
      'TypeScript',
      'SQL',
      'Git & GitHub Actions',
      'Linux / Bash',
      'Vercel',
    ],
    primarySkills: ['Python', 'C++', 'Git & GitHub Actions'],
  },
];
