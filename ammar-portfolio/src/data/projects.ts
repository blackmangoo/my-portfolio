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
      "🤖 Autonomous AI Job & Internship Application Agent — Scrapes listings, analyzes eligibility via Groq LLM, fills forms with human-like behavior, and tracks applications in Google Sheets.",
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
    github: "https://github.com/blackmangoo/AI-agent-job-automation",
  },
  {
    title: "Protomotive Car Care Studio",
    description:
      "Premium Detailing & Paint Protection Demo Website featuring high-end animations and smooth scrolling.",
    stack: ["Next.js 14+", "Tailwind CSS v4", "GSAP", "Lenis"],
    highlights: [
      "Smooth scroll integration with Lenis for a premium feel.",
      "Complex scroll-triggered animations powered by GSAP.",
      "Modern app-router Next.js 14 architecture.",
      "Fully responsive and optimized for performance."
    ],
    github: "https://github.com/blackmangoo/protomotive-demo",
  },
  {
    title: "Verto Digital Agency Site",
    description:
      "Premium agency portfolio site for vertodigital.tech, a digital growth agency serving local businesses in Pakistan.",
    stack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "High-conversion landing page design tailored for a digital agency.",
      "Dynamic Framer Motion interactions and stateful components.",
      "Optimized SEO and Core Web Vitals for local business reach.",
      "Clean, maintainable component architecture."
    ],
    github: "https://github.com/blackmangoo/verto-digital-site",
  },
];

// ─── Secondary Projects ─────────────────────────────────────────────────────────

export const minorProjects: MinorProject[] = [
  {
    title: "Serene / Mental Health Chatbot",
    tagline: "AI wellness companion with LoRA fine-tuning and local emotion detection.",
  },
  {
    title: "Helmet Detection (YOLOv5)",
    tagline: "Computer vision model trained to detect safety helmets on construction workers.",
  },
  {
    title: "Mesh Shift Visualizer",
    tagline: "Interactive web application to visualize complex 3D mesh circular shifts.",
  },
  {
    title: "Heart Disease Prediction",
    tagline: "Machine learning pipeline to predict disease outcomes based on patient data.",
  },
  {
    title: "NewsLens",
    tagline: "Fine-tuned BERT classifier for real-time news headline categorization.",
  },
  {
    title: "TicketIQ",
    tagline: "Zero-shot and few-shot LLM classification for support tickets.",
  }
];
