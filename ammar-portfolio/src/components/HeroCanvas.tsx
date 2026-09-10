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
    // Enhanced responsive mouse tracking
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      Math.sin(t * 0.3) * 0.2 + state.pointer.x * 1.1,
      5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.7,
      5,
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
    const step = 0.22;
    const offset = (size * step) / 2;
    const pts: number[] = [];
    const linePts: number[] = [];

    for (let i = 0; i <= size; i++) {
      for (let j = 0; j <= size; j++) {
        const x = i * step - offset;
        const y = j * step - offset;
        const r = Math.sqrt(x * x + y * y);
        // Cost surface with local minima and saddle points
        const z = Math.sin(r * 2.2) * 0.42 + (r * r) * 0.09 - 0.55;

        pts.push(x, z, y);

        // Grid lines along X
        if (i < size) {
          const xNext = (i + 1) * step - offset;
          const rNext = Math.sqrt(xNext * xNext + y * y);
          const zNext = Math.sin(rNext * 2.2) * 0.42 + (rNext * rNext) * 0.09 - 0.55;
          linePts.push(x, z, y, xNext, zNext, y);
        }
        // Grid lines along Y
        if (j < size) {
          const yNext = (j + 1) * step - offset;
          const rNext = Math.sqrt(x * x + yNext * yNext);
          const zNext = Math.sin(rNext * 2.2) * 0.42 + (x * x + yNext * yNext) * 0.09 - 0.55;
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

    // HIGHLY RESPONSIVE MOUSE TILT & ROTATION
    // Wide rotational range on pointer X and steep topological tilt on pointer Y
    const targetRotY = t * 0.12 + state.pointer.x * 1.7;
    const targetRotX = 0.65 - state.pointer.y * 0.95;
    const targetRotZ = -state.pointer.x * 0.35; // Aerodynamic Z-banking

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      6,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      6,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      6,
      delta
    );

    // Dynamic gradient descent optimizer ball rolling down the loss surface
    if (ballRef.current) {
      const angle = t * 1.8;
      const decay = Math.exp(-((t * 0.3) % 4));
      const radius = 1.6 * decay + 0.15;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const r = Math.sqrt(x * x + y * y);
      const z = Math.sin(r * 2.2) * 0.42 + (r * r) * 0.09 - 0.55;
      ballRef.current.position.set(x, z + 0.09, y);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Wireframe Surface */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2C5545" transparent opacity={0.35} />
      </lineSegments>

      {/* Surface Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.065} color="#2C5545" transparent opacity={0.75} sizeAttenuation />
      </points>

      {/* Gradient Descent Optimizer Point */}
      <mesh ref={ballRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#10B981" />
      </mesh>
    </group>
  );
}

// ─── 4. Autonomous Perception LiDAR Grid (OmniDrive) ────────────────────────

function PerceptionCloud() {
  const groupRef = useRef<THREE.Group>(null);
  const scannerRingRef = useRef<THREE.LineLoop>(null);

  const { groundGrid, boundingBox, vehicleCabin, headingArrow } = useMemo(() => {
    let seed = 42;
    // Concentric ground LiDAR scanning rings
    const groundPts: number[] = [];
    for (let r = 0.6; r <= 3.8; r += 0.45) {
      const count = Math.floor(r * 26);
      for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2;
        groundPts.push(
          Math.cos(theta) * r + (seededRandom(seed++) - 0.5) * 0.09,
          -0.85 + (seededRandom(seed++) - 0.5) * 0.04,
          Math.sin(theta) * r + (seededRandom(seed++) - 0.5) * 0.09
        );
      }
    }

    // 1. Vehicle Lower Chassis 3D Bounding Box
    const w = 1.3, h = 0.55, d = 2.4;
    const x0 = -w / 2, x1 = w / 2;
    const y0 = -0.75, y1 = y0 + h;
    const z0 = -d / 2, z1 = d / 2;

    const boxLines = [
      x0, y0, z0, x1, y0, z0,
      x1, y0, z0, x1, y0, z1,
      x1, y0, z1, x0, y0, z1,
      x0, y0, z1, x0, y0, z0,
      x0, y1, z0, x1, y1, z0,
      x1, y1, z0, x1, y1, z1,
      x1, y1, z1, x0, y1, z1,
      x0, y1, z1, x0, y1, z0,
      x0, y0, z0, x0, y1, z0,
      x1, y0, z0, x1, y1, z0,
      x1, y0, z1, x1, y1, z1,
      x0, y0, z1, x0, y1, z1,
    ];

    // 2. Vehicle Cabin Top Bounding Box
    const cw = 1.0, ch = 0.45, cd = 1.3;
    const cx0 = -cw / 2, cx1 = cw / 2;
    const cy0 = y1, cy1 = cy0 + ch;
    const cz0 = -cd / 2 + 0.1, cz1 = cd / 2 + 0.1;

    const cabinLines = [
      cx0, cy0, cz0, cx1, cy0, cz0,
      cx1, cy0, cz0, cx1, cy0, cz1,
      cx1, cy0, cz1, cx0, cy0, cz1,
      cx0, cy0, cz1, cx0, cy0, cz0,
      cx0, cy1, cz0, cx1, cy1, cz0,
      cx1, cy1, cz0, cx1, cy1, cz1,
      cx1, cy1, cz1, cx0, cy1, cz1,
      cx0, cy1, cz1, cx0, cy1, cz0,
      cx0, cy0, cz0, cx0, cy1, cz0,
      cx1, cy0, cz0, cx1, cy1, cz0,
      cx1, cy0, cz1, cx1, cy1, cz1,
      cx0, cy0, cz1, cx0, cy1, cz1,
    ];

    // 3. Autonomous Velocity Heading Arrow
    const arrowLines = [
      0, y1, z1, 0, y1, z1 + 0.6,
      0, y1, z1 + 0.6, -0.15, y1, z1 + 0.45,
      0, y1, z1 + 0.6, 0.15, y1, z1 + 0.45,
    ];

    return {
      groundGrid: new Float32Array(groundPts),
      boundingBox: new Float32Array(boxLines),
      vehicleCabin: new Float32Array(cabinLines),
      headingArrow: new Float32Array(arrowLines),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // HIGHLY RESPONSIVE AUTONOMOUS CAR TRACKING
    // Direct pointer tracking with strong rotational response
    const targetRotY = t * 0.12 + state.pointer.x * 2.0;
    const targetRotX = 0.52 - state.pointer.y * 0.95;
    const targetRotZ = -state.pointer.x * 0.3; // Responsive banking

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      6,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      6,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      6,
      delta
    );

    // Rotating LiDAR active laser sweep beam
    if (scannerRingRef.current) {
      scannerRingRef.current.rotation.y += delta * 3.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Concentric Ground LiDAR scanning points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[groundGrid, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.065} color="#2C5545" transparent opacity={0.65} sizeAttenuation />
      </points>

      {/* 3D YOLOv11 Vehicle Chassis Bounding Box */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[boundingBox, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#10B981" />
      </lineSegments>

      {/* Vehicle Cabin Upper Bounding Box */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[vehicleCabin, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#10B981" transparent opacity={0.85} />
      </lineSegments>

      {/* Forward Velocity Vector Arrow */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[headingArrow, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#34D399" linewidth={2} />
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
