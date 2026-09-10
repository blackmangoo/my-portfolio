"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Brain, User, TrendingDown, Car, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export type VisualizerMode = "network" | "face" | "loss" | "perception";

// Pure deterministic pseudo-random generator for idempotent renders
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// ─── 1. Neural Network Visualization ────────────────────────────────────────

const NN_LAYERS = [4, 6, 6, 2];
const NN_LAYER_SPACING = 2.4;
const NN_NODE_SPACING = 0.95;

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const { flatNodes, lines } = useMemo(() => {
    let seed = 1;
    const pts: THREE.Vector3[][] = [];
    const flat: number[] = [];
    let startX = (-(NN_LAYERS.length - 1) * NN_LAYER_SPACING) / 2;

    for (let i = 0; i < NN_LAYERS.length; i++) {
      const numNodes = NN_LAYERS[i];
      const startY = (-(numNodes - 1) * NN_NODE_SPACING) / 2;
      const layerPts: THREE.Vector3[] = [];

      for (let j = 0; j < numNodes; j++) {
        const pt = new THREE.Vector3(
          startX + (seededRandom(seed++) - 0.5) * 0.25,
          startY + j * NN_NODE_SPACING + (seededRandom(seed++) - 0.5) * 0.25,
          (seededRandom(seed++) - 0.5) * 0.8
        );
        layerPts.push(pt);
        flat.push(pt.x, pt.y, pt.z);
      }
      pts.push(layerPts);
      startX += NN_LAYER_SPACING;
    }

    const lineCoords: number[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      for (const nodeA of pts[i]) {
        for (const nodeB of pts[i + 1]) {
          if (seededRandom(seed++) > 0.35) {
            lineCoords.push(nodeA.x, nodeA.y, nodeA.z);
            lineCoords.push(nodeB.x, nodeB.y, nodeB.z);
          }
        }
      }
    }

    return {
      flatNodes: new Float32Array(flat),
      lines: new Float32Array(lineCoords),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      Math.sin(t * 0.3) * 0.25 + state.pointer.x * 0.4,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.3,
      4,
      delta
    );
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Synaptic connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2C5545" transparent opacity={0.25} />
      </lineSegments>

      {/* Primary Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[flatNodes, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#2C5545"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ─── 2. Biometric 3D Face Point Cloud ───────────────────────────────────────

function FacePointCloud({ targetScale }: { targetScale: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { scene } = useGLTF("/face-standard.glb");

  const geometry = useMemo(() => {
    let meshGeo: THREE.BufferGeometry | null = null;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !meshGeo) {
        meshGeo = (child as THREE.Mesh).geometry.clone();
      }
    });
    return meshGeo;
  }, [scene]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Head orientation tracking
    const targetX = (state.pointer.x * Math.PI) / 0.75;
    const targetY = (state.pointer.y * Math.PI) / 0.85 - 0.15;

    pointsRef.current.rotation.y = THREE.MathUtils.damp(
      pointsRef.current.rotation.y,
      targetX,
      6,
      delta
    );
    pointsRef.current.rotation.x = THREE.MathUtils.damp(
      pointsRef.current.rotation.x,
      -targetY,
      6,
      delta
    );

    // Smooth scale damping
    const currentScale = pointsRef.current.scale.x;
    const newScale = THREE.MathUtils.damp(currentScale, targetScale, 6, delta);
    pointsRef.current.scale.set(newScale, newScale, newScale);

    // Subtle natural floating
    pointsRef.current.position.y =
      -1.25 + Math.sin(state.clock.elapsedTime * 1.1) * 0.08;
  });

  if (!geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry} scale={targetScale} position={[0, -1.25, 0]}>
      <pointsMaterial
        size={0.038}
        color="#2C5545"
        sizeAttenuation
        transparent
        opacity={0.92}
      />
    </points>
  );
}

// ─── 3. 3D Optimization Loss Landscape ──────────────────────────────────────

function LossLandscape() {
  const groupRef = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Mesh>(null);

  const { positions, lines } = useMemo(() => {
    const size = 32;
    const step = 0.2;
    const offset = (size * step) / 2;
    const pts: number[] = [];
    const linePts: number[] = [];

    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        const x = i * step - offset;
        const y = j * step - offset;
        const r = Math.sqrt(x * x + y * y);
        // Cost surface with local minima
        const z = Math.sin(r * 2.0) * 0.35 + (r * r) * 0.08 - 0.5;

        pts.push(x, z, y);

        // Grid lines along X
        if (i < size) {
          const xNext = (i + 1) * step - offset;
          const rNext = Math.sqrt(xNext * xNext + y * y);
          const zNext = Math.sin(rNext * 2.0) * 0.35 + (rNext * rNext) * 0.08 - 0.5;
          linePts.push(x, z, y, xNext, zNext, y);
        }
        // Grid lines along Y
        if (j < size) {
          const yNext = (j + 1) * step - offset;
          const rNext = Math.sqrt(x * x + yNext * yNext);
          const zNext = Math.sin(rNext * 2.0) * 0.35 + (x * x + yNext * yNext) * 0.08 - 0.5;
          linePts.push(x, z, y, x, zNext, yNext);
        }
      }
    }

    return {
      positions: new Float32Array(pts),
      lines: new Float32Array(linePts),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      t * 0.2 + state.pointer.x * 0.5,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      0.45 - state.pointer.y * 0.3,
      4,
      delta
    );

    // Gradient descent optimization step ball
    if (ballRef.current) {
      const angle = t * 1.5;
      const decay = Math.exp(-((t * 0.3) % 4));
      const radius = 1.6 * decay + 0.15;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const r = Math.sqrt(x * x + y * y);
      const z = Math.sin(r * 2.0) * 0.35 + (r * r) * 0.08 - 0.5;
      ballRef.current.position.set(x, z + 0.08, y);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Wireframe Surface */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2C5545" transparent opacity={0.3} />
      </lineSegments>

      {/* Surface Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#2C5545" transparent opacity={0.7} sizeAttenuation />
      </points>

      {/* Gradient Descent Optimizer Point */}
      <mesh ref={ballRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
    </group>
  );
}

// ─── 4. Autonomous Perception LiDAR Grid (OmniDrive) ────────────────────────

function PerceptionCloud() {
  const groupRef = useRef<THREE.Group>(null);

  const { groundGrid, boundingBox } = useMemo(() => {
    let seed = 42;
    // LiDAR ground scanning concentric rings
    const groundPts: number[] = [];
    for (let r = 0.5; r <= 3.5; r += 0.5) {
      const count = Math.floor(r * 24);
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        groundPts.push(
          Math.cos(theta) * r + (seededRandom(seed++) - 0.5) * 0.08,
          -0.8 + (seededRandom(seed++) - 0.5) * 0.03,
          Math.sin(theta) * r + (seededRandom(seed++) - 0.5) * 0.08
        );
      }
    }

    // 3D Object Detection Bounding Box vertices
    const w = 1.2, h = 0.8, d = 2.0;
    const x0 = -w / 2, x1 = w / 2;
    const y0 = -0.7, y1 = y0 + h;
    const z0 = -d / 2, z1 = d / 2;

    const boxLines = [
      // Bottom face
      x0, y0, z0, x1, y0, z0,
      x1, y0, z0, x1, y0, z1,
      x1, y0, z1, x0, y0, z1,
      x0, y0, z1, x0, y0, z0,
      // Top face
      x0, y1, z0, x1, y1, z0,
      x1, y1, z0, x1, y1, z1,
      x1, y1, z1, x0, y1, z1,
      x0, y1, z1, x0, y1, z0,
      // Pillars
      x0, y0, z0, x0, y1, z0,
      x1, y0, z0, x1, y1, z0,
      x1, y0, z1, x1, y1, z1,
      x0, y0, z1, x0, y1, z1,
    ];

    return {
      groundGrid: new Float32Array(groundPts),
      boundingBox: new Float32Array(boxLines),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      t * 0.25 + state.pointer.x * 0.4,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      0.35 - state.pointer.y * 0.2,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Concentric Ground LiDAR scanning points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[groundGrid, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#2C5545" transparent opacity={0.65} sizeAttenuation />
      </points>

      {/* 3D YOLOv11 Vehicle Bounding Box */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[boundingBox, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#10B981" />
      </lineSegments>
    </group>
  );
}

// ─── Main Hero Canvas Controller ────────────────────────────────────────────

export function HeroCanvas() {
  const [mode, setMode] = useState<VisualizerMode>("network");
  const [scale, setScale] = useState(0.065);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.02, 0.25));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.015, 0.02));
  }, []);

  const handleReset = useCallback(() => {
    setScale(0.065);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-" || e.key === "_") handleZoomOut();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleZoomIn, handleZoomOut]);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[620px] flex flex-col items-center justify-center">
      {/* 3D WebGL Canvas */}
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing touch-pan-y">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          {mode === "network" && <NeuralNetwork />}
          {mode === "face" && <FacePointCloud targetScale={scale} />}
          {mode === "loss" && <LossLandscape />}
          {mode === "perception" && <PerceptionCloud />}
        </Canvas>

        {/* Ambient Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent pointer-events-none w-20" />
      </div>

      {/* Floating Controls Row */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 max-w-full px-4">
        {/* Mode Selector Segmented Pill */}
        <div className="flex items-center gap-1 p-1 bg-[var(--color-panel)]/90 backdrop-blur-md border border-[var(--color-border)] rounded-full shadow-lg">
          <button
            onClick={() => setMode("network")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[36px] ${
              mode === "network"
                ? "bg-[#2C5545] text-white shadow-sm"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            }`}
            title="Neural Network Graph"
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Neural Net</span>
          </button>

          <button
            onClick={() => setMode("face")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[36px] ${
              mode === "face"
                ? "bg-[#2C5545] text-white shadow-sm"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            }`}
            title="Biometric Face Point Cloud"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Face Cloud</span>
          </button>

          <button
            onClick={() => setMode("loss")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[36px] ${
              mode === "loss"
                ? "bg-[#2C5545] text-white shadow-sm"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            }`}
            title="3D Gradient Descent Surface"
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Loss Surface</span>
          </button>

          <button
            onClick={() => setMode("perception")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all min-h-[36px] ${
              mode === "perception"
                ? "bg-[#2C5545] text-white shadow-sm"
                : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
            }`}
            title="OmniDrive Perception LiDAR"
          >
            <Car className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Perception</span>
          </button>
        </div>

        {/* Zoom & Reset Buttons */}
        <div className="flex items-center gap-1 p-1 bg-[var(--color-panel)]/90 backdrop-blur-md border border-[var(--color-border)] rounded-full shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Zoom In"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Zoom Out"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Reset Camera"
            title="Reset Scale"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
