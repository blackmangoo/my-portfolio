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
  architecture?: string[];
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
    "An automotive diagnostic platform combining computer vision, sensor data, OBD-II telemetry, and retrieval-augmented assistance.",
  projectType: "Full-Stack AI Platform",
  github: "https://github.com/blackmangoo/OmniDrive",
  stack: [
    "Python",
    "FastAPI",
    "YOLOv11",
    "Supabase",
    "PostgreSQL",
    "Flutter",
    "RAG",
    "Dart"
  ],
  metrics: [
    { value: "99.1%", label: "Top-1 Accuracy" },
    { value: "50", label: "Car-part Classes" },
    { value: "~110ms", label: "CPU Inference" },
    { value: "26,820", label: "Training Images" },
  ],
  modules: [
    {
      id: "diagnostic-engine",
      title: "Diagnostic Engine",
      bullets: [
        "Real-time OBD-II sensor data ingestion and preprocessing pipeline.",
        "Computer vision classification using a custom YOLO11-Large model.",
        "GPS/IMU sensor fusion stabilized with a 1-D Kalman filter.",
        "FastAPI inference server connecting the mobile client to the ML models."
      ],
    },
    {
      id: "nlp-assistant",
      title: "Retrieval Assistance",
      bullets: [
        "RAG-based DIY car assistance module.",
        "Semantic search across technical automotive documents using pgvector.",
        "Context-aware generation for mechanical troubleshooting."
      ],
    },
    {
      id: "platform-architecture",
      title: "Platform Infrastructure",
      bullets: [
        "Supabase PostgreSQL handling auth, roles, and relational storage.",
        "Role-based marketplace supporting customers, vendors, riders, and admins.",
        "Flutter mobile application for cross-platform delivery."
      ],
    }
  ],
  architecture: [
    { label: "Flutter Client" },
    { label: "FastAPI Inference" },
    { label: "YOLO11 Model" },
    { label: "Supabase DB" },
    { label: "Sensor Fusion" },
  ],
  whyItMatters:
    "OmniDrive demonstrates the ability to design, build, and integrate a complete AI ecosystem. Rather than just training a model, it encompasses data collection, model training, backend architecture, mobile development, and real-time sensor integration.",
};

// ─── Featured Projects ──────────────────────────────────────────────────────

export const featuredProjects: FeaturedProject[] = [
  {
    title: "AI Job Application Agent",
    description:
      "An agentic workflow for discovering, evaluating, and assisting with job applications.",
    stack: ["Python", "Groq / LLaMA", "Playwright", "Google Sheets API"],
    highlights: [
      "Job scraping and extraction using browser automation (Playwright).",
      "LLM reasoning applied to eligibility analysis and CV parsing.",
      "Structured workflows with human-in-the-loop review steps.",
      "Automated logging and tracking via Google Sheets integration."
    ],
    architecture: [
      "Job Source",
      "Extraction",
      "Eligibility Analysis",
      "LLM Reasoning",
      "Application Workflow",
      "Human Review",
      "Application Log"
    ],
    github: "https://github.com/blackmangoo",
  },
  {
    title: "MaintainIQ",
    description:
      "A hybrid retrieval pipeline combining dense and lexical search to improve technical diagnostic retrieval.",
    stack: ["FastAPI", "FAISS", "BM25", "Gemini", "Python"],
    highlights: [
      "Semantic and lexical retrieval mechanisms (FAISS + BM25).",
      "Reciprocal Rank Fusion (RRF) for optimal document ranking.",
      "FastAPI backend for high-throughput search queries.",
      "Technical documentation processing and chunking strategy."
    ],
    github: "https://github.com/blackmangoo",
  },
];

// ─── Secondary Projects ─────────────────────────────────────────────────────────

export const minorProjects: MinorProject[] = [
  {
    title: "Serene",
    tagline: "AI wellness companion with LoRA fine-tuning and local emotion detection.",
  },
  {
    title: "NewsLens",
    tagline: "Fine-tuned BERT classifier for real-time news headline categorization.",
  },
  {
    title: "TicketIQ",
    tagline: "Zero-shot and few-shot LLM classification for support tickets.",
  },
  {
    title: "Hybrid Travel Recommendation",
    tagline: "LLM-based recommendation system using FAISS and Annoy semantic retrieval.",
  }
];
