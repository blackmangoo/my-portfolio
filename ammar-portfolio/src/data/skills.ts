export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI / ML',
    icon: 'brain',
    skills: ['Python', 'PyTorch', 'Scikit-learn', 'Computer Vision', 'NLP', 'LLMs', 'RAG', 'LoRA'],
  },
  {
    category: 'Models & Retrieval',
    icon: 'layers',
    skills: ['YOLOv11', 'BERT', 'GPT-Neo', 'DistilRoBERTa', 'BART-large-MNLI', 'FAISS', 'BM25', 'SentenceTransformers'],
  },
  {
    category: 'Backend & Data',
    icon: 'server',
    skills: ['FastAPI', 'REST APIs', 'PostgreSQL', 'Supabase', 'Firebase', 'Node.js'],
  },
  {
    category: 'Frontend',
    icon: 'monitor',
    skills: ['Flutter', 'React', 'Next.js', 'Streamlit'],
  },
  {
    category: 'Infrastructure & Tools',
    icon: 'terminal',
    skills: ['Docker', 'Git', 'GitHub Actions', 'Vercel', 'n8n', 'Postman'],
  },
];
