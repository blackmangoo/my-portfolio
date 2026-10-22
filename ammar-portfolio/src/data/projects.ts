// ─── Project Data Types ─────────────────────────────────────────────────────

export type ProjectCategory =
  | "All"
  | "LLM & Agents"
  | "Computer Vision"
  | "Sensor Fusion & Edge"
  | "Creative Engineering"
  | "Systems & Web";

export interface OmniDriveModule {
  id: string;
  title: string;
  bullets: string[];
}

export interface OmniDriveMetric {
  value: string;
  label: string;
  footnote?: string;
}

export interface ArchitectureNode {
  label: string;
  sublabel?: string;
  status?: string;
}

export interface FlagshipProject {
  title: string;
  subtitle: string;
  description: string;
  projectType: string;
  github: string;
  liveUrl?: string;
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
  github?: string;
  liveUrl?: string;
  metrics?: { value: string; label: string; footnote?: string }[];
  architecture?: string[];
}

export interface MinorProject {
  title: string;
  tagline: string;
  category: ProjectCategory;
  stack?: string[];
  github?: string;
  liveUrl?: string;
}

// ─── Flagship Project: OmniDrive AI ──────────────────────────────────────────

export const omniDrive: FlagshipProject = {
  title: "OmniDrive AI (Final Year Project)",
  subtitle: "Edge AI Computer Vision Diagnostics & Physical Dynamics Telemetry Platform",
  description:
    "An automotive diagnostic and safety platform combining edge computer vision (YOLO11-Large), physical dynamics sensor fusion via a 2-state discrete Kalman filter, context-grounded RAG assistance, and a transactional multi-role marketplace.",
  projectType: "Full-Stack Edge AI & Sensor Fusion Platform",
  category: "Computer Vision",
  github: "https://github.com/blackmangoo/OmniDrive",
  stack: [
    "Python",
    "YOLO11-Large",
    "FastAPI",
    "ONNX Runtime",
    "Kalman Filter",
    "Supabase",
    "PostgreSQL",
    "pgvector",
    "Flutter",
  ],
  metrics: [
    {
      value: "96.2%",
      label: "Held-out Test Top-1",
      footnote: "Empirically verified on held-out test split (2,089 images). Validation split achieved 99.34% Top-1 and 99.85% Top-5 across 5,480 images (26,820 total images across 50 classes).",
    },
    {
      value: "50",
      label: "Car-part Classes",
      footnote: "Discrete automotive mechanical components and failure modes.",
    },
    {
      value: "~90–110 ms",
      label: "Latency (CPU, single-threaded)",
      footnote: "Benchmarked on CPU inference with PyTorch thread clamping (<280MB peak RAM).",
    },
    {
      value: "26,820",
      label: "Empirical Dataset Frames",
      footnote: "Curated dataset split into 71.8% train, 20.4% validation, and 7.8% holdout test.",
    },
  ],
  modules: [
    {
      id: "vision-engine",
      title: "Edge Computer Vision Core (YOLO11-Large)",
      bullets: [
        "Trained YOLO11-Large champion model on 26,820 images across 50 car-part classes, reaching 96.2% holdout test accuracy (99.34% validation top-1).",
        "Optimized inference runtime on CPU constrained under 280MB RAM using ONNX / PyTorch single-threaded execution (~90–110ms latency).",
        "On-device pre-compression pipeline in Flutter cutting mobile camera payload by 99.5% (<150ms network dispatch).",
      ],
    },
    {
      id: "sensor-telemetry",
      title: "Physical Dynamics Telemetry (2-State Kalman Filter)",
      bullets: [
        "Custom 2-state discrete-time Kalman filter fusing 50 Hz linear acceleration with 1–10 Hz GNSS Doppler fixes.",
        "Zero-Velocity Updates (ZUPT) and stationary gravity isolation preventing resting drift under heavy vehicle vibration.",
        "Sub-sample linear milestone interpolation calculating millimeter-accurate 0–60, 0–100 km/h, and quarter-mile acceleration benchmarks.",
      ],
    },
    {
      id: "nlp-assistant",
      title: "RAG Diagnostic Assistant (Supabase pgvector)",
      bullets: [
        "// TODO(ammar): pgvector RAG module is verified in repo (api/main.py), add to CV if desired.",
        "Context-grounded retrieval-augmented generation engine indexing technical automotive documentation using pgvector (768-dim embeddings).",
        "Synthesizes verified mechanical repair workflows via Google Gemini with multi-model fallback and strict XML prompt isolation.",
      ],
    },
    {
      id: "platform-architecture",
      title: "Transactional Multi-Role Marketplace & Security",
      bullets: [
        "Supabase PostgreSQL managing row-level security (RLS) across 4 roles: Customer, Vendor, Rider, and Admin with TOTP MFA.",
        "PostgreSQL row-level write locks (`SELECT ... FOR UPDATE`) preventing race conditions on rider order claims and inventory decrements.",
        "Cross-platform Flutter application (Clean Architecture + Riverpod) rendering real-time telemetry HUDs and interactive diagnostics.",
      ],
    },
  ],
  architecture: [
    { label: "IMU & GNSS Stream", sublabel: "50Hz Accel + Doppler" },
    { label: "2-State Kalman Filter", sublabel: "Longitudinal Fusion" },
    { label: "FastAPI / ONNX", sublabel: "CPU Clamped (<280MB)" },
    { label: "YOLO11-Large Core", sublabel: "50 Mechanical Classes" },
    { label: "pgvector RAG", sublabel: "Semantic TSB Search" },
    { label: "Flutter Mobile HUD", sublabel: "Clean Architecture" },
  ],
  whyItMatters:
    "OmniDrive AI demonstrates end-to-end production AI engineering: from dataset curation and training custom YOLO11 architectures to mathematical sensor fusion, containerized low-latency API serving, and cross-platform mobile delivery.",
};

// ─── Featured Core AI & Engineering Projects ──────────────────────────────────

export const featuredProjects: FeaturedProject[] = [
  {
    title: "WhatsApp Digital Twin — Fine-Tuned LLM & Hybrid RAG",
    subtitle: "4-Bit QLoRA Qwen 2.5 7B & Supabase pgvector HNSW",
    category: "LLM & Agents",
    description:
      "Architected a bilingual conversational AI pairing 4-bit QLoRA fine-tuning of Qwen 2.5 7B for stylistic alignment with a hybrid RAG engine for factual grounding. Features a deterministic PII/sensitive-data filtering guardrail and episodic memory retrieval from an HNSW-indexed Supabase pgvector database.",
    stack: [
      "Qwen 2.5 7B",
      "QLoRA / PEFT",
      "Unsloth",
      "Supabase",
      "pgvector (HNSW)",
      "Python",
      "FastAPI",
      "Docker",
    ],
    liveUrl: undefined,
    github: "https://github.com/blackmangoo/whatsapp-digital-twin-ai",
    metrics: [
      { value: "4-bit", label: "QLoRA Quantization", footnote: "Unsloth 4-bit parameter-efficient fine-tuning on bilingual WhatsApp conversational export." },
      { value: "HNSW", label: "pgvector Indexing", footnote: "Fast cosine similarity vector retrieval on Supabase for episodic memory and factual grounding." },
      { value: "Bilingual", label: "Stylistic Alignment", footnote: "Maintains natural tone and nuance across both English and Urdu/Roman Urdu." },
    ],
    highlights: [
      "4-bit QLoRA fine-tuning of Qwen 2.5 7B for authentic conversational cadence, vocabulary, and tone alignment.",
      "Deterministic pre-generation PII/sensitive-data filtering guardrail preventing disclosure of private credentials or personal data.",
      "Hybrid RAG engine retrieving episodic conversation history and entity knowledge from Supabase pgvector.",
      "Containerized webhook server built with FastAPI and Docker for asynchronous message ingestion and real-time dispatch.",
    ],
    architecture: [
      "WhatsApp Inbound",
      "Deterministic PII Filter",
      "HNSW Vector Retrieval",
      "QLoRA Qwen 2.5 7B",
      "Webhook Dispatch",
    ],
  },
  {
    title: "AI Job Application Agent",
    subtitle: "Autonomous Multi-Agent Workflow with Human-in-the-Loop Review",
    category: "LLM & Agents",
    description:
      "An autonomous agentic workflow that scrapes job listings, evaluates candidate eligibility using Groq LLaMA 3.3 70B, prepares tailored application responses, automates form-filling via Playwright, and logs outcomes to Google Sheets.",
    stack: [
      "Python",
      "Groq LLaMA 3.3 70B",
      "Playwright",
      "BeautifulSoup",
      "Google Sheets API",
      "Pydantic",
    ],
    metrics: [
      { value: "LLaMA 3.3", label: "Groq 70B Reasoning", footnote: "Sub-second inference for CV parsing and job eligibility scoring." },
      { value: "Pydantic", label: "Schema Conformance", footnote: "Structured JSON validation ensuring zero hallucinated application answers." },
      { value: "Human-in-Loop", label: "CAPTCHA & 2FA Gate", footnote: "Automated escalation to human operator on 2FA, OTP, and custom essay questions." },
    ],
    highlights: [
      "Dynamic browser orchestration utilizing Playwright with human-like behavioral emulation to navigate modern SPAs.",
      "Structured LLM reasoning ensuring strict output schema conformance via Pydantic validators.",
      "Human-in-the-loop handoff for CAPTCHAs, login walls, OTP/2FA verification, and bespoke essay prompts.",
      "Automated outcome tracking and audit logging synchronized in real-time with Google Sheets API.",
    ],
    architecture: [
      "Job Source",
      "Playwright Extraction",
      "LLaMA 3.3 Reasoning",
      "Form Automation",
      "Human-in-the-Loop Gate",
      "Google Sheets Log",
    ],
    github: "https://github.com/blackmangoo/AI-agent-job-automation",
  },
  {
    title: "Serene — Mental Health & Crisis Triage AI",
    subtitle: "DistilRoBERTa Emotion Detection + LoRA GPT-Neo-125M & FAISS",
    category: "LLM & Agents",
    description:
      "An NLP pipeline pairing DistilRoBERTa for real-time emotion classification with a LoRA-fine-tuned GPT-Neo-125M model for empathetic text generation. Features FAISS vector retrieval for grounding and a deterministic safety layer that intercepts severe distress signals to escalate to human crisis support.",
    stack: [
      "PyTorch",
      "DistilRoBERTa",
      "GPT-Neo-125M",
      "LoRA / PEFT",
      "FAISS",
      "Hugging Face",
      "FastAPI",
    ],
    metrics: [
      { value: "DistilRoBERTa", label: "Emotion Detection", footnote: "Local classifier identifying sentiment polarity and distress cues." },
      { value: "LoRA", label: "GPT-Neo-125M Adapter", footnote: "Parameter-efficient fine-tuning on supportive empathetic conversational corpora." },
      { value: "Deterministic", label: "Crisis Safety Gate", footnote: "Hard-coded safety intercept that overrides the LLM with verified helpline protocols on self-harm signals." },
    ],
    highlights: [
      "Fine-tuned causal language model (GPT-Neo-125M) using LoRA to retain empathetic conversational nuance without catastrophic forgetting.",
      "Integrated DistilRoBERTa emotion classifier monitoring sentiment state throughout the interaction.",
      "Dual-layer architecture: FAISS retrieval grounds conversation context, while a deterministic safety layer escalates detected crisis signals.",
      "Containerized inference service built with FastAPI and deployed as part of DevelopersHub applied AI systems.",
    ],
    architecture: [
      "User Dialogue",
      "DistilRoBERTa Classifier",
      "Deterministic Safety Intercept",
      "FAISS Context Grounding",
      "LoRA GPT-Neo Response",
    ],
    github: "https://github.com/blackmangoo/mental-health-support-chatbot",
  },
  {
    title: "DocuMind — Context-Aware RAG Pipeline",
    subtitle: "Document-Grounded Conversational QA with Semantic Chunking & FAISS",
    category: "LLM & Agents",
    description:
      "A document-grounded conversational RAG pipeline using overlapping semantic chunking, MiniLM embeddings, and FAISS top-k retrieval, paired with sliding-window conversational memory to achieve >85% top-3 chunk relevance.",
    stack: [
      "LangChain",
      "MiniLM (all-MiniLM-L6-v2)",
      "FAISS",
      "Hugging Face",
      "Python",
      "Streamlit",
      "FastAPI",
    ],
    metrics: [
      { value: "> 85%", label: "Top-3 Chunk Relevance", footnote: "Evaluated on complex technical document query benchmarks." },
      { value: "MiniLM", label: "Dense Embeddings", footnote: "Low-latency sentence embedding generation for real-time semantic search." },
      { value: "FAISS", label: "Vector Search Index", footnote: "In-memory Euclidean & cosine index for sub-20ms nearest-neighbor retrieval." },
    ],
    highlights: [
      "Overlapping semantic chunking pipeline ensuring context continuity across technical document boundaries.",
      "Sliding-window conversational memory maintaining multi-turn context without token exhaustion.",
      "Benchmarked retrieval accuracy achieving >85% top-3 chunk relevance on complex technical queries.",
      "Shipped as a containerized inference service with interactive Streamlit verification interface.",
    ],
    architecture: [
      "Document Ingestion",
      "Semantic Chunking",
      "MiniLM Embeddings",
      "FAISS Indexing",
      "Sliding-Window Memory",
      "Grounded Generation",
    ],
    github: "https://github.com/blackmangoo/DocuMind",
  },
  {
    title: "NewsLens & TicketIQ: NLP Classification Systems",
    subtitle: "Fine-Tuned BERT & Zero-Shot NLI Classification Engine",
    category: "LLM & Agents",
    description:
      "Production-oriented NLP pipelines combining fine-tuned BERT for hierarchical news categorization (achieving 94% test accuracy) with BART-large-MNLI for zero-shot and few-shot customer support ticket classification and intent routing.",
    stack: [
      "Python",
      "BERT",
      "BART-large-MNLI",
      "Transformers",
      "FastAPI",
      "Docker",
    ],
    metrics: [
      { value: "94.0%", label: "BERT Test Accuracy", footnote: "Evaluated on multi-class hierarchical news topic test split." },
      { value: "BART-MNLI", label: "Zero-Shot Triage", footnote: "Zero-shot natural language inference pipeline routing support tickets without re-training." },
      { value: "Containerized", label: "Docker OCI Service", footnote: "Microservice ready for horizontal pod scaling with sub-25ms CPU inference." },
    ],
    highlights: [
      "Fine-tuned transformer encoder heads (BERT) for multi-class hierarchical topic classification.",
      "Zero-shot natural language inference pipeline (BART-large-MNLI) for dynamic ticket triage without re-training.",
      "Containerized microservice architecture built with FastAPI and Docker for scalable production deployment.",
    ],
    architecture: [
      "Raw Stream",
      "Tokenization",
      "BERT Classifier",
      "Zero-Shot NLI",
      "Webhook Routing",
    ],
    // TODO(ammar): add repository link for NewsLens and TicketIQ once open-sourced
    github: undefined,
  },
  {
    title: "Ferrari LaFerrari: 3D Engineering & Aerodynamics Showcase",
    subtitle: "Interactive WebGL Hypercar Experience with 963 CV HY-KERS V12 & Audio Synthesis",
    category: "Creative Engineering",
    description:
      "A high-fidelity 3D WebGL and React Three Fiber engineering exploration of the Ferrari LaFerrari. Features a high-poly 3D model with custom physically based rendering (PBR) metallic car paint shaders, continuous 3D scroll rotation across 7 technical stages, real-time Web Audio V12 engine acoustics, and a bespoke Maranello configurator.",
    stack: [
      "React 19",
      "React Three Fiber",
      "Three.js",
      "Drei",
      "WebGL",
      "Web Audio API",
      "Tailwind CSS",
      "GSAP",
    ],
    liveUrl: "https://auto-engineering-3d-frk6.vercel.app/",
    github: "https://github.com/blackmangoo/auto-engineering-3d",
    metrics: [
      { value: "963 CV", label: "HY-KERS Powertrain" },
      { value: "60 FPS", label: "WebGL 3D Rendering" },
      { value: "7 Stages", label: "Choreographed Journey" },
    ],
    highlights: [
      "High-poly 3D WebGL model with studio HDR reflections, metallic clear-coat shaders, and carbon fiber composite materials.",
      "7-stage scroll choreography covering active aerodynamics (Aerodinamica Attiva), 963 CV HY-KERS powertrain, and composite chassis.",
      "Real-time Web Audio V12 synthesizer simulating 6.3L engine ignition, 9,250 RPM revving, and track flybys.",
      "Atelier Maranello 3D configurator with live exterior paint switching (Rosso Corsa, Giallo Modena, Nero Stellato, Grigio Silverstone, Blu Tour de France).",
      "Cinema View mode providing distraction-free 3D orbit inspection and responsive touch controls.",
    ],
    architecture: [
      "High-Poly GLB Model",
      "PBR Shaders & HDR",
      "7-Stage Scroll Choreography",
      "Web Audio V12 Engine",
      "Atelier 3D Configurator",
    ],
  },
  {
    title: "Rolex Calibre 3235: Haute Horlogerie 3D Deconstruction",
    subtitle: "Continuous Scroll Movement Deconstruction with 240-Frame Canvas Scrubbing & Atelier Configurator",
    category: "Creative Engineering",
    description:
      "An ultra-luxury interactive continuous-scroll deconstruction of the legendary Rolex Calibre 3235 mechanical movement. Features a high-performance 240-frame Canvas 2D render loop scrubbed via GSAP ScrollTrigger, Lenis inertial smooth scrolling, mechanical ticking sound design, and an Atelier commission configurator.",
    stack: [
      "React 19",
      "HTML5 Canvas 2D Engine",
      "GSAP ScrollTrigger",
      "Lenis Smooth Scroll",
      "Web Audio API",
      "Tailwind CSS",
      "TypeScript",
    ],
    liveUrl: "https://rolex-calibre-horology.vercel.app/",
    github: "https://github.com/blackmangoo/rolex-calibre-horology",
    metrics: [
      { value: "240 Frames", label: "Canvas Scrubbing" },
      { value: "28,800 VPH", label: "4Hz Chronergy Escapement" },
      { value: "70 Hours", label: "Power Reserve" },
    ],
    highlights: [
      "60 FPS continuous scroll deconstruction scrubbing through 240 high-resolution WebP frames detailing mechanical levitation and the blue Parachrom hairspring.",
      "Deep technical breakdown of Genevan horology: 14 patents, Chronergy escapement, Paraflex shock absorbers, and microscopic anglage finish.",
      "Interactive timepiece configurator allowing users to customize dial faces, precious metal alloys, and bracelet ergonomics with VIP commission dispatch.",
      "Spatial Web Audio integration delivering authentic mechanical movement ticks and crown winding feedback.",
      "Lenis inertial smooth scrolling tightly synchronized with GSAP ScrollTrigger pinning and scrub timelines.",
    ],
    architecture: [
      "240-Frame WebP Manifest",
      "HTML5 Canvas 2D Loop",
      "GSAP ScrollTrigger & Lenis",
      "Web Audio Soundscape",
      "Atelier Timepiece Configurator",
    ],
  },
  {
    title: "Protomotive Car Care Studio",
    subtitle: "High-Performance Interactive Digital Showcase",
    category: "Creative Engineering",
    description:
      "High-end detailing studio showcase engineered with Next.js App Router, GSAP timeline choreography, Lenis inertial smooth scrolling, and Tailwind CSS v4.",
    stack: ["Next.js 15+", "Tailwind CSS v4", "GSAP", "Lenis", "TypeScript"],
    liveUrl: "https://protomotive-demo.vercel.app/",
    metrics: [
      { value: "60 FPS", label: "Animation Budget", footnote: "Smooth GSAP timeline choreography with Lenis inertia." },
      { value: "< 0.05", label: "Zero Layout Shift (CLS)", footnote: "Measured with zero cumulative layout shift on page load." },
      { value: "Next.js 15+", label: "App Router SSR", footnote: "Server-side rendering for instant page structure and assets." },
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
    category: "Creative Engineering",
    stack: ["Three.js", "WebGL", "TypeScript"],
  },
  {
    title: "Clinical Heart Disease Prediction",
    tagline: "Supervised classification pipeline benchmarked across Random Forest and XGBoost ensembles.",
    category: "Systems & Web",
    stack: ["Python", "Scikit-Learn", "XGBoost"],
  },
  {
    title: "Smart Exam Sitting Plan Optimizer",
    tagline: "Automated exam hall seating allocation using K-Means clustering to prevent malpractice.",
    category: "Systems & Web",
    stack: ["Python", "Scikit-Learn", "NumPy"],
  },
];
