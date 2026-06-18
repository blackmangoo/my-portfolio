export interface SkillGroup {
  category: string;
  icon: string; // descriptive identifier for the component to pick an icon
  color: string; // tailwind color class prefix like 'blue', 'emerald', 'purple', 'cyan', 'orange', 'rose'
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'AI / ML',
    icon: 'brain',
    color: 'blue',
    skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'LLMs', 'RAG', 'LoRA Fine-Tuning', 'Prompt Engineering', 'Model Evaluation', 'Feature Engineering'],
  },
  {
    category: 'Models & Frameworks',
    icon: 'layers',
    color: 'purple',
    skills: ['YOLOv5', 'YOLOv8', 'YOLOv11', 'BERT', 'GPT-Neo', 'DistilRoBERTa', 'BART-large-MNLI', 'XGBoost', 'Scikit-learn', 'PyTorch', 'Hugging Face', 'SentenceTransformers'],
  },
  {
    category: 'RAG / LLM Tools',
    icon: 'sparkles',
    color: 'cyan',
    skills: ['LangChain', 'FAISS', 'BM25', 'RRF', 'Groq', 'Gemini', 'Hugging Face Inference API', 'pgvector'],
  },
  {
    category: 'Backend',
    icon: 'server',
    color: 'emerald',
    skills: ['FastAPI', 'REST APIs', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Firebase FCM', 'API Integration'],
  },
  {
    category: 'Frontend',
    icon: 'monitor',
    color: 'orange',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Streamlit', 'Flutter'],
  },
  {
    category: 'DevOps & Tools',
    icon: 'terminal',
    color: 'rose',
    skills: ['Docker', 'Vercel', 'Git', 'GitHub', 'Postman', 'n8n', 'GitHub Actions'],
  },
];
