// ─── Project Data Types ─────────────────────────────────────────────────────

export interface OmniDriveModule {
  id: string;
  title: string;
  bullets: string[];
}

export interface OmniDriveMetric {
  value: string;
  label: string;
}

export interface ArchitectureNode {
  label: string;
  color: string;
}

export interface FlagshipProject {
  title: string;
  subtitle: string;
  description: string;
  projectType: string;
  github: string;
  stack: string[];
  metrics: OmniDriveMetric[];
  modules: OmniDriveModule[];
  architecture: ArchitectureNode[];
  whyItMatters: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  github: string;
}

export interface MinorProject {
  title: string;
  tagline: string;
}

// ─── Flagship Project ───────────────────────────────────────────────────────

export const omniDrive: FlagshipProject = {
  title: "OmniDrive AI",
  subtitle: "Intelligent Automotive Diagnostic Ecosystem",
  description:
    "A comprehensive, multi-module AI platform that revolutionizes automotive diagnostics through integrated machine learning pipelines, real-time sensor analysis, and intelligent decision support systems.",
  projectType: "Full-Stack AI Platform",
  github: "https://github.com/blackmangoo/OmniDrive",
  stack: [
    "Python",
    "TensorFlow",
    "Scikit-learn",
    "Flask",
    "React",
    "PostgreSQL",
    "Docker",
    "n8n",
  ],
  metrics: [
    { value: "94.7%", label: "Diagnostic Accuracy" },
    { value: "5", label: "AI Modules" },
    { value: "<200ms", label: "Inference Latency" },
    { value: "12K+", label: "Training Samples" },
  ],
  modules: [
    {
      id: "diagnostic-engine",
      title: "Diagnostic Engine",
      bullets: [
        "Real-time OBD-II sensor data ingestion and preprocessing pipeline",
        "Ensemble model combining Random Forest, XGBoost, and neural network classifiers",
        "Automated fault-code interpretation using a fine-tuned LLM module",
        "Confidence scoring and explainability via SHAP values",
      ],
    },
    {
      id: "predictive-maintenance",
      title: "Predictive Maintenance",
      bullets: [
        "Time-series forecasting with LSTM networks for component wear prediction",
        "Anomaly detection using Isolation Forest on sensor telemetry streams",
        "Maintenance scheduling optimization using constraint-based algorithms",
        "Historical trend analysis dashboard with interactive visualizations",
      ],
    },
    {
      id: "nlp-assistant",
      title: "NLP Assistant",
      bullets: [
        "Conversational interface powered by Gemini API with automotive domain fine-tuning",
        "RAG pipeline with FAISS vector store indexing repair manuals and TSBs",
        "Multi-turn context management for complex diagnostic conversations",
        "Natural language to diagnostic query translation engine",
      ],
    },
    {
      id: "vision-module",
      title: "Vision Module",
      bullets: [
        "Component damage detection using YOLOv5 with custom-trained weights",
        "Tire wear classification with CNN-based image analysis pipeline",
        "Real-time video stream processing for inspection automation",
        "Image segmentation for corrosion and fluid leak identification",
      ],
    },
    {
      id: "data-platform",
      title: "Data Platform",
      bullets: [
        "Unified data lake architecture with PostgreSQL and time-series optimization",
        "ETL pipelines for multi-source vehicle data normalization",
        "RESTful API layer with Flask serving 15+ diagnostic endpoints",
        "Role-based access control and audit logging for enterprise deployment",
      ],
    },
  ],
  architecture: [
    { label: "Sensor Input", color: "#3b82f6" },
    { label: "Data Pipeline", color: "#8b5cf6" },
    { label: "ML Engine", color: "#06b6d4" },
    { label: "NLP Layer", color: "#10b981" },
    { label: "API Gateway", color: "#f59e0b" },
    { label: "Dashboard", color: "#ef4444" },
  ],
  whyItMatters:
    "OmniDrive demonstrates end-to-end AI systems thinking — from raw sensor ingestion through ML inference to user-facing dashboards. It showcases production-grade patterns including model versioning, A/B testing infrastructure, graceful degradation, and comprehensive monitoring. This is not a Kaggle notebook; it is a deployable platform.",
};

// ─── Featured Projects ──────────────────────────────────────────────────────

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Breast Cancer Detection System",
    description:
      "End-to-end classification pipeline using supervised learning, advanced feature engineering, and imbalanced data handling (SMOTE) to optimize for early detection sensitivity.",
    stack: ["Python", "Scikit-learn", "SMOTE", "Pandas"],
    highlights: [
      "Rigorous model benchmarking across 6 classifiers",
      "SMOTE oversampling to handle class imbalance",
      "Optimized for Recall to minimize false negatives",
      "Feature importance analysis with visualization",
    ],
    github: "https://github.com/hafizqaim/NLP-Assignment-2.git",
  },
  {
    title: "Hybrid Travel Recommendation",
    description:
      "Six LLM-based recommendation systems using Fine-Tuning and RAG architectures with FAISS and Annoy for high-efficiency semantic retrieval.",
    stack: ["LLMs", "RAG", "FAISS", "Annoy", "Hugging Face"],
    highlights: [
      "6 distinct recommendation architectures compared",
      "FAISS and Annoy for vector similarity search",
      "Fine-tuned models for domain-specific generation",
      "Explainable, human-like recommendation outputs",
    ],
    github: "https://github.com/Ausaaf572/Applied-Recommender-System.git",
  },
  {
    title: "Helmet Detection System",
    description:
      "Construction site safety monitoring using YOLOv5 with transfer learning for real-time helmet detection and compliance tracking.",
    stack: ["YOLOv5", "PyTorch", "OpenCV", "Transfer Learning"],
    highlights: [
      "Custom-trained YOLOv5 with transfer learning",
      "Real-time inference pipeline for video streams",
      "mAP-based performance evaluation",
      "Deployed for construction site safety monitoring",
    ],
    github: "https://github.com/blackmangoo/helmet-detection-yolov5.git",
  },
  {
    title: "Smart Exam Sitting Plan",
    description:
      "Intelligent seating arrangement optimization using K-Means Clustering to minimize examination malpractice through data-driven student placement.",
    stack: ["K-Means", "Python", "Scikit-learn", "Optimization"],
    highlights: [
      "Unsupervised clustering for student grouping",
      "Constraint satisfaction for room allocation",
      "Minimized proximity of same-section students",
    ],
    github: "https://github.com/blackmangoo/Smart-Exam-sitting-Plan.git",
  },
  {
    title: "AI Recipe Generator",
    description:
      "Automated recipe generation system using n8n workflow automation and Gemini API, transforming dietary data into structured meal plans.",
    stack: ["n8n", "Gemini API", "Node.js", "Automation"],
    highlights: [
      "End-to-end workflow automation with n8n",
      "Gemini API integration for content generation",
      "Dietary constraint-aware meal planning",
      "Structured JSON output for frontend consumption",
    ],
    github: "https://github.com/blackmangoo",
  },
  {
    title: "AI Quote Generator",
    description:
      "Responsive React application integrated with Gemini 2.0 Flash LLM using prompt engineering for high-quality motivational content generation.",
    stack: ["React", "Gemini 2.0 Flash", "Prompt Engineering", "TypeScript"],
    highlights: [
      "Gemini 2.0 Flash LLM integration",
      "Advanced prompt engineering techniques",
      "Topic-specific content generation",
      "Responsive UI with real-time streaming",
    ],
    github: "https://github.com/blackmangoo",
  },
];

// ─── Minor Projects ─────────────────────────────────────────────────────────

export const minorProjects: MinorProject[] = [
  {
    title: "Data Pipeline Toolkit",
    tagline: "ETL utilities for ML preprocessing",
  },
  {
    title: "Model Benchmark Suite",
    tagline: "Automated ML model comparison framework",
  },
  {
    title: "Prompt Library",
    tagline: "Curated prompt engineering templates",
  },
  {
    title: "CV Annotation Tool",
    tagline: "Lightweight image labeling utility",
  },
];
