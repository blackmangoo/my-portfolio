// ─── Project Data Types ─────────────────────────────────────────────────────

export type ProjectCategory =
  | "All"
  | "Computer Vision"
  | "LLM & Agents"
  | "Sensor Fusion & Edge"
  | "Systems & Web";

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
  sublabel?: string;
  latency?: string;
  status?: string;
}

export interface FlagshipProject {
  title: string;
  subtitle: string;
  description: string;
  projectType: string;
  github: string;
  category: ProjectCategory;
  stack: string[];
  metrics: OmniDriveMetric[];
  modules: OmniDriveModule[];
  architecture: ArchitectureNode[];
  whyItMatters: string;
}

export interface FeaturedProject {
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  highlights: string[];
  github: string;
  metrics?: { value: string; label: string }[];
  architecture?: string[];
}

export interface MinorProject {
  title: string;
  tagline: string;
  category: ProjectCategory;
  stack?: string[];
  github?: string;
}

// ─── Flagship Project: OmniDrive AI ──────────────────────────────────────────

export const omniDrive: FlagshipProject = {
  title: "OmniDrive AI",
  subtitle: "Intelligent Automotive Diagnostic & Edge Perception Ecosystem",
  description:
    "An automotive diagnostic and safety platform combining real-time computer vision, multi-modal OBD-II sensor data, 1D Kalman filter sensor fusion, and retrieval-augmented mechanical assistance.",
  projectType: "Full-Stack AI & Edge Perception Platform",
  category: "Computer Vision",
  github: "https://github.com/blackmangoo/OmniDrive",
  stack: [
    "Python",
    "FastAPI",
    "YOLOv11",
    "1D Kalman Filter",
    "Supabase",
    "PostgreSQL",
    "Flutter",
    "RAG",
    "pgvector",
  ],
  metrics: [
    { value: "99.1%", label: "Top-1 Accuracy" },
    { value: "50", label: "Component Classes" },
    { value: "92ms", label: "Inference Latency" },
    { value: "26,820", label: "Annotated Frames" },
  ],
  modules: [
    {
      id: "sensor-telemetry",
      title: "CAN-Bus & Telemetry Ingestion",
      bullets: [
        "Real-time OBD-II PID polling pipeline streaming diagnostic telemetry at 20Hz.",
        "1D Kalman filter sensor fusion denoising speed, acceleration, and RPM fluctuations.",
        "Engine anomaly detection flagging overheating and misfires prior to CEL triggers.",
      ],
    },
    {
      id: "diagnostic-engine",
      title: "Edge Computer Vision Core",
      bullets: [
        "Custom YOLOv11 model fine-tuned on 26,820 automotive engine and chassis images.",
        "Multi-label classification of 50 mechanical failure modes and wear indicators.",
        "FastAPI inference server optimized with batched tensor ingestion and asynchronous dispatch.",
      ],
    },
    {
      id: "nlp-assistant",
      title: "Retrieval-Augmented Diagnostic Assistant",
      bullets: [
        "RAG pipeline indexed with pgvector cosine similarity over vehicle technical service bulletins.",
        "Context-grounded troubleshooting engine outputting verified step-by-step DIY repair workflows.",
        "Integration with vehicle diagnostic codes (DTC) for automated root-cause analysis.",
      ],
    },
    {
      id: "platform-architecture",
      title: "Production Infrastructure & Client HUD",
      bullets: [
        "Supabase PostgreSQL managing row-level security, auth, and relational telemetry history.",
        "Role-based ecosystem supporting vehicle owners, certified mechanics, and fleet managers.",
        "Cross-platform Flutter application rendering real-time telemetry HUD and AR diagnostics.",
      ],
    },
  ],
  // Correct pipeline order: Sensor Ingestion -> Kalman Filter -> Inference -> Vision -> RAG -> Client
  architecture: [
    { label: "OBD-II CAN Bus", sublabel: "20Hz Telemetry", latency: "< 5ms" },
    { label: "1D Kalman Filter", sublabel: "Sensor Fusion", latency: "< 1ms" },
    { label: "FastAPI Gateway", sublabel: "Async Router", latency: "12ms" },
    { label: "YOLOv11 Vision Core", sublabel: "Tensor Detection", latency: "92ms" },
    { label: "pgvector RAG", sublabel: "Semantic Index", latency: "18ms" },
    { label: "Flutter Client HUD", sublabel: "Real-time Display", latency: "60 FPS" },
  ],
  whyItMatters:
    "OmniDrive proves end-to-end engineering capability: from collecting and annotating 26k images, training and tuning custom YOLOv11 architectures, implementing mathematical sensor fusion, through architecting production FastAPI backends and cross-platform mobile delivery.",
};

// ─── Featured Core AI & Engineering Projects ──────────────────────────────────

export const featuredProjects: FeaturedProject[] = [
  {
    title: "AI Job Application Agent",
    subtitle: "Autonomous Multi-Agent Pipeline with Human-in-the-Loop Review",
    category: "LLM & Agents",
    description:
      "Autonomous AI agent that orchestrates web scraping via Playwright, evaluates candidate-role alignment using Groq LLaMA-3 reasoning, completes multi-step application workflows, and logs submissions to Google Sheets.",
    stack: ["Python", "Groq / LLaMA-3", "Playwright", "Google Sheets API", "Pydantic"],
    metrics: [
      { value: "4.2x", label: "Speed Multiplier" },
      { value: "98.5%", label: "Field Extraction" },
      { value: "0", label: "Hallucinated Fields" },
    ],
    highlights: [
      "Dynamic browser orchestration utilizing Playwright with human-behavior emulation.",
      "Structured LLM reasoning ensuring exact schema conformance via Pydantic validators.",
      "Human-in-the-loop validation checkpoint prior to irreversible application dispatch.",
      "Real-time status synchronization and rate-limit handling across job boards.",
    ],
    architecture: [
      "Target Board",
      "DOM Parser",
      "LLaMA-3 Reasoning",
      "Form Automation",
      "Review Checkpoint",
      "Live Audit Sheet",
    ],
    github: "https://github.com/blackmangoo/AI-agent-job-automation",
  },
  {
    title: "Serene: AI Mental Health Companion",
    subtitle: "LoRA Fine-Tuned LLM with Local Emotion Classification",
    category: "LLM & Agents",
    description:
      "Mental wellness assistant fine-tuned with Low-Rank Adaptation (LoRA) on custom empathetic dialogue corpora, combined with a local DistilRoBERTa emotion classifier for real-time sentiment tracking.",
    stack: ["PyTorch", "Hugging Face", "LoRA / PEFT", "DistilRoBERTa", "FastAPI", "Streamlit"],
    metrics: [
      { value: "16-bit", label: "Quantized Weights" },
      { value: "7", label: "Emotion Dimensions" },
      { value: "< 45ms", label: "Sentiment Latency" },
    ],
    highlights: [
      "Fine-tuned causal language models using PEFT/LoRA to retain domain knowledge without catastrophic forgetting.",
      "Integrated lightweight emotion classifier providing conversational guardrails and crisis detection.",
      "Deterministic safety evaluation pipeline preventing ungrounded psychiatric recommendations.",
      "Deployed with FastAPI inference backend and responsive Streamlit clinician dashboard.",
    ],
    architecture: [
      "User Dialogue",
      "DistilRoBERTa Classifier",
      "Safety Gate",
      "LoRA Fine-Tuned LM",
      "Response Synthesis",
    ],
    github: "https://github.com/blackmangoo",
  },
  {
    title: "NewsLens & TicketIQ: NLP Intelligence",
    subtitle: "Fine-Tuned BERT & Zero-Shot Classification Engine",
    category: "LLM & Agents",
    description:
      "Production-oriented NLP pipeline combining fine-tuned BERT for high-throughput news categorization with BART-large-MNLI for zero-shot customer support ticket classification and intent routing.",
    stack: ["Python", "BERT", "BART-large-MNLI", "Transformers", "FastAPI", "Docker"],
    metrics: [
      { value: "94.8%", label: "BERT F1-Score" },
      { value: "14", label: "Topic Taxonomies" },
      { value: "< 25ms", label: "CPU Throughput" },
    ],
    highlights: [
      "Fine-tuned transformer encoder heads for multi-class hierarchical topic classification.",
      "Zero-shot natural language inference pipeline for dynamic triage without re-training.",
      "ONNX runtime model quantization delivering 3.2x CPU throughput acceleration.",
      "Containerized microservice ready for Kubernetes horizontal pod auto-scaling.",
    ],
    architecture: [
      "Raw Stream",
      "Tokenization",
      "BERT Classifier",
      "Zero-Shot NLI",
      "Webhook Routing",
    ],
    github: "https://github.com/blackmangoo",
  },
  {
    title: "Protomotive Car Care Studio",
    subtitle: "High-Performance Interactive Digital Showcase",
    category: "Systems & Web",
    description:
      "High-end detailing studio showcase engineered with Next.js App Router, GSAP timeline choreography, Lenis inertial smooth scrolling, and Tailwind CSS v4.",
    stack: ["Next.js 15+", "Tailwind CSS v4", "GSAP", "Lenis", "TypeScript"],
    metrics: [
      { value: "100", label: "Lighthouse Performance" },
      { value: "60 FPS", label: "Animation Budget" },
      { value: "< 0.05", label: "CLS Score" },
    ],
    highlights: [
      "Inertial smooth scrolling architecture integrated with GSAP ScrollTrigger.",
      "Server-rendered Next.js architecture with zero layout shift (CLS < 0.05).",
      "Micro-interactions and fluid viewport-aware visual typography.",
    ],
    architecture: [
      "Next.js SSR",
      "Lenis Smooth Scroll",
      "GSAP Timelines",
      "Fluid Layout",
    ],
    github: "https://github.com/blackmangoo/protomotive-demo",
  },
];

// ─── Secondary Projects & Experiments ─────────────────────────────────────────

export const minorProjects: MinorProject[] = [
  {
    title: "Construction Helmet Detection",
    tagline: "Edge computer vision model trained on YOLOv5 for construction safety PPE compliance.",
    category: "Computer Vision",
    stack: ["Python", "YOLOv5", "OpenCV"],
  },
  {
    title: "Mesh Shift Visualizer",
    tagline: "Interactive WebGL visualization for complex 3D mesh topological coordinate transforms.",
    category: "Computer Vision",
    stack: ["Three.js", "WebGL", "TypeScript"],
  },
  {
    title: "Clinical Heart Disease Prediction",
    tagline: "Supervised classification pipeline benchmarked across Random Forest and XGBoost ensembles.",
    category: "Sensor Fusion & Edge",
    stack: ["Python", "Scikit-Learn", "XGBoost"],
  },
  {
    title: "Verto Digital Agency Platform",
    tagline: "High-conversion digital growth agency platform with dynamic Framer Motion interactions.",
    category: "Systems & Web",
    stack: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/blackmangoo/verto-digital-site",
  },
];
