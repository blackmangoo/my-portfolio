"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Cpu, Database, Eye, Smartphone, Zap, Play, Pause, Copy, Check } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface PipelineStep {
  id: string;
  name: string;
  category: string;
  latencyNote: string;
  icon: React.ComponentType<{ className?: string }>;
  tensorInput: string;
  tensorOutput: string;
  description: string;
  codeSnippet: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "telemetry",
    name: "OBD-II Ingestion",
    category: "Signal Acquisition",
    latencyNote: "Illustrative Flow",
    icon: Activity,
    tensorInput: "CAN-bus PID hex stream @ 20Hz",
    tensorOutput: "Vector [RPM, Speed, Throttle, CoolantTemp]",
    description: "Queries vehicle telemetry over standard ELM327 / STN1110 protocol, ingesting speed and acceleration streams.",
    codeSnippet: `async def read_obd_stream(port: str):
    connection = obd.Async(port)
    connection.watch(obd.commands.SPEED, callback=on_speed)
    connection.watch(obd.commands.RPM, callback=on_rpm)
    connection.start()
    return connection`,
  },
  {
    id: "kalman",
    name: "1D Kalman Filter",
    category: "Sensor Fusion & Denoising",
    latencyNote: "< 1ms Compute",
    icon: Zap,
    tensorInput: "Scalar z_k (Noisy raw velocity/accel)",
    tensorOutput: "Scalar x_hat_k (Optimal minimum variance estimate)",
    description: "Recursively denoises sensor noise and suppresses accelerometer drift using predictive covariance updates.",
    codeSnippet: `class KalmanFilter1D:
    def __init__(self, q=1e-4, r=1e-2):
        self.q, self.r = q, r  # Process & Measurement variance
        self.x, self.p = 0.0, 1.0

    def update(self, z: float) -> float:
        # Predict & Correct cycle
        self.p += self.q
        k = self.p / (self.p + self.r)  # Kalman Gain
        self.x += k * (z - self.x)
        self.p *= (1.0 - k)
        return self.x`,
  },
  {
    id: "gateway",
    name: "FastAPI Gateway",
    category: "Async Routing",
    latencyNote: "Async Serving",
    icon: Cpu,
    tensorInput: "Multipart image payload + telemetry frame",
    tensorOutput: "Asynchronous task queue & JSON response",
    description: "High-throughput asynchronous ASGI microservice routing multi-modal frames to CPU-clamped inference workers.",
    codeSnippet: `@app.post("/predict")
async def predict_car_part(file: UploadFile = File(...)):
    model = get_yolo_model()
    image = Image.open(io.BytesIO(await file.read()))
    predictions, inference_time = await asyncio.to_thread(
        _sync_yolo_inference, model, image
    )
    return {"success": True, "predictions": predictions, "latency_ms": inference_time}`,
  },
  {
    id: "vision",
    name: "YOLO11-Large Core",
    category: "Edge Vision Perception",
    latencyNote: "~90–110 ms (CPU)",
    icon: Eye,
    tensorInput: "Image Tensor: [1, 3, 224, 224] normalized RGB",
    tensorOutput: "Top-5 Predicted Classes with Confidence Scores",
    description: "Custom fine-tuned YOLO11-Large champion model recognizing 50 automotive mechanical component and failure classes.",
    codeSnippet: `model = YOLO("models/car_parts_large_v1.pt")
with torch.inference_mode():
    results = model.predict(source=image, imgsz=224, verbose=False)
result = results[0]
predictions = [
    {"class": result.names[idx], "confidence": float(conf) * 100}
    for idx, conf in zip(result.probs.top5, result.probs.top5conf)
]`,
  },
  {
    id: "rag",
    name: "pgvector RAG",
    category: "Semantic Retrieval",
    latencyNote: "Vector Cosine Search",
    icon: Database,
    tensorInput: "Diagnostic Trouble Code (DTC) + Text Query",
    tensorOutput: "Top-k grounded technical repair manuals",
    description: "Retrieves OEM maintenance procedures via Supabase match_documents RPC for verified mechanical repair workflows.",
    codeSnippet: `-- Supabase pgvector cosine similarity search
SELECT id, title, content, 1 - (embedding <=> query_vec) AS similarity
FROM automotive_technical_bulletins
WHERE 1 - (embedding <=> query_vec) > 0.70
ORDER BY embedding <=> query_vec
LIMIT 3;`,
  },
  {
    id: "client",
    name: "Flutter HUD",
    category: "Client Telemetry UI",
    latencyNote: "Clean Arch + Riverpod",
    icon: Smartphone,
    tensorInput: "Streamed WebSocket State DTO",
    tensorOutput: "Real-time interactive HUD display",
    description: "Cross-platform mobile client displaying live sensor dials, DTC alerts, and sub-sample milestone timing.",
    codeSnippet: `StreamBuilder<TelemetryState>(
  stream: telemetryBloc.stream,
  builder: (context, snapshot) {
    return SpeedometerWidget(velocity: snapshot.data?.filteredVelocity ?? 0.0);
  },
)`,
  },
];

export function OmniDriveExplorer() {
  const [selectedStep, setSelectedStep] = useState<string>("kalman");
  const [isRunning, setIsRunning] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeStep = pipelineSteps.find((s) => s.id === selectedStep) || pipelineSteps[1];

  // Pause simulation when off-screen or when tab is hidden
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else if (el) {
        const rect = el.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Copy code snippet helper
  const handleCopy = () => {
    navigator.clipboard.writeText(activeStep.codeSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Kalman Filter Simulation on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const historyLength = 140;
    const rawHistory: number[] = [];
    const kalmanHistory: number[] = [];

    let currentTrueSpeed = 60;
    let kalmanState = 60;
    let kalmanCov = 1.0;
    const Q = 0.02; // Process variance
    const R = 18.0; // Measurement variance

    let frameCount = 0;
    const updateEveryNFrames = 3;

    const render = () => {
      if (isRunning && isVisible && !shouldReduceMotion) {
        frameCount++;

        if (frameCount % updateEveryNFrames === 0) {
          currentTrueSpeed += (Math.random() - 0.5) * 0.9;
          currentTrueSpeed = Math.max(35, Math.min(85, currentTrueSpeed));

          let noise = (Math.random() - 0.5) * 24.0;
          if (Math.random() > 0.78) {
            noise += (Math.random() - 0.5) * 16.0;
          }
          const noisyMeasurement = currentTrueSpeed + noise;

          kalmanCov += Q;
          const K = kalmanCov / (kalmanCov + R);
          kalmanState += K * (noisyMeasurement - kalmanState);
          kalmanCov *= (1.0 - K);

          rawHistory.push(noisyMeasurement);
          kalmanHistory.push(kalmanState);

          if (rawHistory.length > historyLength) rawHistory.shift();
          if (kalmanHistory.length > historyLength) kalmanHistory.shift();
        }
      }

      // Draw canvas
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background grid lines
      ctx.strokeStyle = "rgba(120, 120, 120, 0.12)";
      ctx.lineWidth = 1;
      for (let y = 15; y < height; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const minY = 10;
      const maxY = 110;
      const getY = (val: number) => height - ((val - minY) / (maxY - minY)) * height;
      const stepX = width / (historyLength - 1);

      // 1. Draw Raw Noisy Sensor Line
      if (rawHistory.length > 1) {
        ctx.beginPath();
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = "rgba(249, 115, 22, 0.75)";
        ctx.lineWidth = 1.8;
        for (let i = 0; i < rawHistory.length; i++) {
          const x = i * stepX;
          const y = getY(rawHistory[i]);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = "rgba(249, 115, 22, 0.6)";
        for (let i = Math.max(0, rawHistory.length - 25); i < rawHistory.length; i += 2) {
          const x = i * stepX;
          const y = getY(rawHistory[i]);
          ctx.beginPath();
          ctx.arc(x, y, 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw Kalman Smoothed Output
      if (kalmanHistory.length > 1) {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 2.8;
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = 8;
        for (let i = 0; i < kalmanHistory.length; i++) {
          const x = i * stepX;
          const y = getY(kalmanHistory[i]);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, isVisible, shouldReduceMotion]);

  return (
    <div ref={containerRef} className="w-full bg-[var(--color-panel)] border border-[var(--color-border)] rounded-sm p-6 sm:p-8 mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)] mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
            Interactive Architecture Inspector
          </span>
          <h4 className="text-xl font-semibold text-[var(--color-foreground)] mt-1">
            OmniDrive Signal-Flow & Edge Processing Pipeline
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            aria-pressed={!isRunning}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium border border-[var(--color-border)] rounded-sm hover:border-[var(--color-accent)] text-[var(--color-foreground)] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            {isRunning ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4 text-emerald-500" />}
            <span>{isRunning ? "Pause Telemetry" : "Resume Stream"}</span>
          </button>
        </div>
      </div>

      {/* Pipeline Navigation Horizontal Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {pipelineSteps.map((step) => {
          const Icon = step.icon;
          const isSelected = selectedStep === step.id;
          return (
            <motion.button
              key={step.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStep(step.id)}
              className={`relative p-3 rounded-sm text-left transition-colors border flex flex-col justify-between min-h-[85px] z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                isSelected
                  ? "border-[var(--color-accent)] shadow-sm"
                  : "bg-[var(--color-background)] border-[var(--color-border)] hover:border-[var(--color-foreground)]/30"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activePipelineStepHighlight"
                  className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-sm -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <div className="flex items-center justify-between w-full">
                <Icon className={`w-4 h-4 ${isSelected ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`} />
                <span className="text-[10px] font-mono text-[var(--color-accent)] font-medium">{step.latencyNote}</span>
              </div>
              <div className="mt-2">
                <div className={`text-xs font-semibold ${isSelected ? "text-[var(--color-foreground)]" : "text-[var(--color-muted)]"}`}>
                  {step.name}
                </div>
                <div className="text-[10px] text-[var(--color-muted)] truncate">{step.category}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Deep Dive Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* Left: Metadata & Live Kalman Filter Sparkline (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[var(--color-muted)]">Live Sensor Denoising (Kalman vs Raw)</span>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-orange-500">
                    <span className="w-2.5 h-0.5 bg-orange-500 inline-block" /> Raw Noise
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                    <span className="w-2.5 h-1 bg-emerald-500 inline-block" /> Denoised State
                  </span>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                width={540}
                height={140}
                className="w-full h-[140px] bg-black/5 dark:bg-black/30 rounded-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-[var(--color-border)] bg-[var(--color-background)] rounded-sm">
                <span className="text-[10px] uppercase font-mono text-[var(--color-muted)] block mb-1">Tensor Input</span>
                <span className="font-mono text-[var(--color-foreground)]">{activeStep.tensorInput}</span>
              </div>
              <div className="p-3 border border-[var(--color-border)] bg-[var(--color-background)] rounded-sm">
                <span className="text-[10px] uppercase font-mono text-[var(--color-muted)] block mb-1">Tensor Output</span>
                <span className="font-mono text-[var(--color-accent)] font-semibold">{activeStep.tensorOutput}</span>
              </div>
            </div>

            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {activeStep.description}
            </p>
          </div>

          {/* Right: Code Snippet with Copy Button */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] text-white/80 rounded-t-sm text-xs font-mono border-b border-white/10">
              <span>{activeStep.id}.py</span>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy code snippet to clipboard"
                className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] p-1 rounded"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-[#141414] text-emerald-200/90 font-mono text-xs overflow-x-auto rounded-b-sm leading-relaxed max-h-[260px] scrollbar-thin">
              <code>{activeStep.codeSnippet}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
