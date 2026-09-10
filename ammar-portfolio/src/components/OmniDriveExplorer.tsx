"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Cpu, Database, Eye, Smartphone, Zap, Play, Pause } from "lucide-react";

interface PipelineStep {
  id: string;
  name: string;
  category: string;
  latency: string;
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
    latency: "< 5ms",
    icon: Activity,
    tensorInput: "CAN-bus PID hex stream @ 20Hz",
    tensorOutput: "Vector [RPM, Speed, Throttle, CoolantTemp]",
    description: "Queries high-frequency vehicle telemetry over standard ELM327 / STN1110 protocol.",
    codeSnippet: `async def read_obd_stream(port: str):\n    connection = obd.Async(port)\n    connection.watch(obd.commands.SPEED, callback=on_speed)\n    connection.watch(obd.commands.RPM, callback=on_rpm)\n    connection.start()\n    return connection`,
  },
  {
    id: "kalman",
    name: "1D Kalman Filter",
    category: "Sensor Fusion & Denoising",
    latency: "< 1ms",
    icon: Zap,
    tensorInput: "Scalar z_k (Noisy raw velocity/accel)",
    tensorOutput: "Scalar x_hat_k (Optimal minimum variance estimate)",
    description: "Recursively denoises sensor noise and removes accelerometer drift using predictive covariance updates.",
    codeSnippet: `class KalmanFilter1D:\n    def __init__(self, q=1e-4, r=1e-2):\n        self.q, self.r = q, r  # Process & Measurement variance\n        self.x, self.p = 0.0, 1.0\n    \n    def update(self, z: float) -> float:\n        # Predict & Correct cycle\n        self.p += self.q\n        k = self.p / (self.p + self.r)  # Kalman Gain\n        self.x += k * (z - self.x)\n        self.p *= (1.0 - k)\n        return self.x`,
  },
  {
    id: "gateway",
    name: "FastAPI Gateway",
    category: "Async Routing",
    latency: "12ms (p95)",
    icon: Cpu,
    tensorInput: "JSON Payload with compressed sensor frames",
    tensorOutput: "Asynchronous task queue & WebSocket dispatch",
    description: "High-throughput asynchronous ASGI microservice routing multi-modal frames to ML inference workers.",
    codeSnippet: `@app.post("/api/v1/telemetry/frame")\nasync def ingest_frame(payload: TelemetryFrameSchema):\n    filtered_speed = kalman_tracker.update(payload.speed)\n    anomaly = anomaly_detector.predict([[payload.rpm, filtered_speed]])\n    return {"status": "ok", "denoised_speed": filtered_speed, "anomaly": bool(anomaly)}`,
  },
  {
    id: "vision",
    name: "YOLOv11 Tensor Core",
    category: "Edge Vision Perception",
    latency: "92ms",
    icon: Eye,
    tensorInput: "Image Tensor: [1, 3, 640, 640] normalized RGB",
    tensorOutput: "Tensor [N, 6]: [x1, y1, x2, y2, confidence, class_id]",
    description: "Custom fine-tuned YOLO11-Large model identifying 50 distinct mechanical failure states and road obstacles.",
    codeSnippet: `model = YOLO("weights/omni_yolo11l_best.pt")\nresults = model.predict(\n    source=frame_buffer,\n    imgsz=640,\n    conf=0.45,\n    device="cuda:0" if torch.cuda.is_available() else "cpu",\n    verbose=False\n)`,
  },
  {
    id: "rag",
    name: "pgvector RAG",
    category: "Semantic Retrieval",
    latency: "18ms",
    icon: Database,
    tensorInput: "Diagnostic Trouble Code (DTC) + Text Query",
    tensorOutput: "Top-k grounded technical repair manuals",
    description: "Retrieves OEM maintenance procedures via HNSW index similarity search for instant DIY repair instructions.",
    codeSnippet: `SELECT manual_id, content, 1 - (embedding <=> query_vec) AS similarity\nFROM automotive_service_bulletins\nWHERE dtc_code = 'P0300'\nORDER BY embedding <=> query_vec\nLIMIT 3;`,
  },
  {
    id: "client",
    name: "Flutter HUD",
    category: "Client Telemetry UI",
    latency: "60 FPS",
    icon: Smartphone,
    tensorInput: "Streamed WebSocket State DTO",
    tensorOutput: "Real-time interactive HUD display",
    description: "Low-overhead cross-platform mobile client displaying live sensor dials, DTC alerts, and repair steps.",
    codeSnippet: `StreamBuilder<TelemetryState>(\n  stream: telemetryBloc.stream,\n  builder: (context, snapshot) {\n    return SpeedometerWidget(velocity: snapshot.data?.filteredVelocity ?? 0.0);\n  },\n)`,
  },
];

export function OmniDriveExplorer() {
  const [selectedStep, setSelectedStep] = useState<string>("kalman");
  const [isRunning, setIsRunning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeStep = pipelineSteps.find((s) => s.id === selectedStep) || pipelineSteps[1];

  // Kalman Filter Simulation on HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const historyLength = 120;
    const rawHistory: number[] = [];
    const kalmanHistory: number[] = [];

    let currentTrueSpeed = 60;
    let kalmanState = 60;
    let kalmanCov = 1.0;
    const Q = 0.05; // process noise
    const R = 4.0;  // measurement noise

    const render = () => {
      if (isRunning) {
        // True speed subtle wander
        currentTrueSpeed += (Math.random() - 0.5) * 0.8;
        currentTrueSpeed = Math.max(30, Math.min(90, currentTrueSpeed));

        // Simulated noisy sensor measurement
        const noise = (Math.random() - 0.5) * 8.0;
        const noisyMeasurement = currentTrueSpeed + noise;

        // Kalman Update
        kalmanCov += Q;
        const K = kalmanCov / (kalmanCov + R);
        kalmanState += K * (noisyMeasurement - kalmanState);
        kalmanCov *= (1.0 - K);

        rawHistory.push(noisyMeasurement);
        kalmanHistory.push(kalmanState);

        if (rawHistory.length > historyLength) rawHistory.shift();
        if (kalmanHistory.length > historyLength) kalmanHistory.shift();
      }

      // Draw canvas
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Background grid lines
      ctx.strokeStyle = "rgba(100, 100, 100, 0.12)";
      ctx.lineWidth = 1;
      for (let y = 20; y < height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Map value to canvas Y
      const minY = 20;
      const maxY = 100;
      const getY = (val: number) => height - ((val - minY) / (maxY - minY)) * height;

      // Draw Raw Noisy Sensor Line (Orange / Muted Grey dashed)
      if (rawHistory.length > 1) {
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = "rgba(220, 100, 60, 0.65)";
        ctx.lineWidth = 1.5;
        const stepX = width / (historyLength - 1);
        for (let i = 0; i < rawHistory.length; i++) {
          const x = i * stepX;
          const y = getY(rawHistory[i]);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw Kalman Smoothed Output (Emerald Green solid)
      if (kalmanHistory.length > 1) {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 2.5;
        const stepX = width / (historyLength - 1);
        for (let i = 0; i < kalmanHistory.length; i++) {
          const x = i * stepX;
          const y = getY(kalmanHistory[i]);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning]);

  return (
    <div className="w-full bg-[var(--color-panel)] border border-[var(--color-border)] rounded-sm p-6 sm:p-8 mt-6">
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
            onClick={() => setIsRunning(!isRunning)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-[var(--color-border)] rounded-sm hover:border-[var(--color-accent)] transition-colors min-h-[36px]"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
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
            <button
              key={step.id}
              onClick={() => setSelectedStep(step.id)}
              className={`p-3 rounded-sm text-left transition-all border flex flex-col justify-between min-h-[85px] ${
                isSelected
                  ? "bg-[var(--color-accent)]/10 border-[var(--color-accent)] shadow-sm"
                  : "bg-[var(--color-background)] border-[var(--color-border)] hover:border-[var(--color-foreground)]/30"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon className={`w-4 h-4 ${isSelected ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`} />
                <span className="text-[10px] font-mono text-[var(--color-accent)] font-medium">{step.latency}</span>
              </div>
              <div className="mt-2">
                <div className={`text-xs font-semibold ${isSelected ? "text-[var(--color-foreground)]" : "text-[var(--color-muted)]"}`}>
                  {step.name}
                </div>
                <div className="text-[10px] text-[var(--color-muted)] truncate">{step.category}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep Dive Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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

        {/* Right: Real Implementation Code Snippet (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1A1A1A] text-white/80 rounded-t-sm text-xs font-mono border-b border-white/10">
            <span>{activeStep.id}.py</span>
            <span className="text-[10px] text-emerald-400 font-medium">Production Verified</span>
          </div>
          <pre className="p-4 bg-[#141414] text-emerald-200/90 font-mono text-xs overflow-x-auto rounded-b-sm leading-relaxed max-h-[260px]">
            <code>{activeStep.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
