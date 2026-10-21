"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ─── 1. Forward-Propagating Real Neural Network ─────────────────────────────

interface Synapse {
  src: THREE.Vector3;
  dst: THREE.Vector3;
  weight: number;
  layerIdx: number;
}

interface SignalPulse {
  synapseIdx: number;
  progress: number;
  speed: number;
}

const LAYER_CONFIG = [5, 8, 8, 4]; // Input (5) -> Hidden 1 (8) -> Hidden 2 (8) -> Output (4)
const LAYER_X = [-3.8, -1.3, 1.3, 3.8];
const NUM_PULSES = 54;

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate deterministic layered architecture
  const { nodePositions, linePositions, synapses } = useMemo(() => {
    const nodesByLayer: THREE.Vector3[][] = [];
    const flatNodeCoords: number[] = [];

    // 1. Build Layer Neurons
    for (let l = 0; l < LAYER_CONFIG.length; l++) {
      const count = LAYER_CONFIG[l];
      const layerNodes: THREE.Vector3[] = [];
      const totalSpan = (count - 1) * 0.65;
      const startY = -totalSpan / 2;

      for (let i = 0; i < count; i++) {
        const y = startY + i * 0.65;
        // Subtle 3D curvature wrapping behind the face
        const z = -1.2 - Math.sin((l / (LAYER_CONFIG.length - 1)) * Math.PI) * 0.5;
        const pt = new THREE.Vector3(LAYER_X[l], y, z);
        layerNodes.push(pt);
        flatNodeCoords.push(pt.x, pt.y, pt.z);
      }
      nodesByLayer.push(layerNodes);
    }

    // 2. Build Synaptic Weight Connections (Adjacent Layers)
    const allSynapses: Synapse[] = [];
    const flatLineCoords: number[] = [];

    for (let l = 0; l < LAYER_CONFIG.length - 1; l++) {
      const currentLayer = nodesByLayer[l];
      const nextLayer = nodesByLayer[l + 1];

      for (let i = 0; i < currentLayer.length; i++) {
        const src = currentLayer[i];
        for (let j = 0; j < nextLayer.length; j++) {
          const dst = nextLayer[j];
          // Connect with high density to reflect a real fully connected feedforward network
          const weight = 0.35 + ((i * 7 + j * 13) % 10) * 0.06;
          allSynapses.push({ src, dst, weight, layerIdx: l });
          flatLineCoords.push(src.x, src.y, src.z, dst.x, dst.y, dst.z);
        }
      }
    }

    return {
      nodePositions: new Float32Array(flatNodeCoords),
      linePositions: new Float32Array(flatLineCoords),
      synapses: allSynapses,
    };
  }, []);

  // BufferGeometry for dynamic pulse positions
  const pulseGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(NUM_PULSES * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  // Mutable pulse animation states stored in ref
  const pulsesRef = useRef<SignalPulse[]>(
    Array.from({ length: NUM_PULSES }, (_, p) => ({
      synapseIdx: Math.floor((p / NUM_PULSES) * synapses.length),
      progress: p / NUM_PULSES,
      speed: 0.35 + ((p * 37) % 10) * 0.035,
    }))
  );

  useFrame((state, delta) => {
    const pulses = pulsesRef.current;
    const posAttr = pulseGeometry.getAttribute("position") as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    // 1. Advance Forward-Propagation Signal Pulses
    for (let p = 0; p < pulses.length; p++) {
      const pulse = pulses[p];
      pulse.progress += delta * pulse.speed;

      // When pulse reaches destination neuron, step forward to next layer or loop back
      if (pulse.progress >= 1.0) {
        pulse.progress = 0.0;
        const currentSyn = synapses[pulse.synapseIdx];
        const nextLayerIdx = (currentSyn.layerIdx + 1) % (LAYER_CONFIG.length - 1);

        // Find candidate synapses in the next layer
        const candidateIndices = synapses
          .map((s, idx) => (s.layerIdx === nextLayerIdx ? idx : -1))
          .filter((idx) => idx !== -1);

        if (candidateIndices.length > 0) {
          const pick = Math.floor(Math.random() * candidateIndices.length);
          pulse.synapseIdx = candidateIndices[pick];
        }
      }

      // Linear interpolation between source and destination neuron
      const syn = synapses[pulse.synapseIdx];
      const x = syn.src.x + (syn.dst.x - syn.src.x) * pulse.progress;
      const y = syn.src.y + (syn.dst.y - syn.src.y) * pulse.progress;
      const z = syn.src.z + (syn.dst.z - syn.src.z) * pulse.progress;

      array[p * 3] = x;
      array[p * 3 + 1] = y;
      array[p * 3 + 2] = z;
    }

    posAttr.needsUpdate = true;

    // 2. Subtle ambient 3D parallax tracking with cursor
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      const targetParallaxX = state.pointer.x * 0.2;
      const targetParallaxY = -state.pointer.y * 0.15;
      const targetRotY = state.pointer.x * 0.12 + Math.sin(t * 0.25) * 0.04;
      const targetRotX = -state.pointer.y * 0.08;

      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        targetParallaxX,
        3,
        delta
      );
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        targetParallaxY,
        3,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        3,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        3,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1.0]}>
      {/* 1. Synaptic Axons (Connections with calibrated weight transparency) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2C5545" transparent opacity={0.14} />
      </lineSegments>

      {/* 2. Layer Neurons (Nodes) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#2C5545"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* 3. Real-Time Forward Propagation Pulses (Signals flowing left -> right) */}
      <points geometry={pulseGeometry}>
        <pointsMaterial
          size={0.18}
          color="#10B981"
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ─── 2. Biometric Face Point Cloud with Natural Head Pose ───────────────────

function FacePointCloud() {
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

    // Natural human head rotation bounds:
    // Yaw (left-right): max ~22 degrees (+/- 0.38 rad)
    // Pitch (up-down): max ~14 degrees (+/- 0.24 rad)
    // Roll (subtle neck bank): max ~3.5 degrees (+/- 0.06 rad)
    const targetYaw = state.pointer.x * 0.38;
    const targetPitch = -state.pointer.y * 0.22 - 0.08;
    const targetRoll = -state.pointer.x * 0.06;

    // Muscular neck easing with delta-time damping
    pointsRef.current.rotation.y = THREE.MathUtils.damp(
      pointsRef.current.rotation.y,
      targetYaw,
      4.5,
      delta
    );
    pointsRef.current.rotation.x = THREE.MathUtils.damp(
      pointsRef.current.rotation.x,
      targetPitch,
      4.5,
      delta
    );
    pointsRef.current.rotation.z = THREE.MathUtils.damp(
      pointsRef.current.rotation.z,
      targetRoll,
      4.5,
      delta
    );

    // Natural breathing hover
    const t = state.clock.elapsedTime;
    pointsRef.current.position.y = -1.1 + Math.sin(t * 1.0) * 0.04;
    pointsRef.current.position.x = Math.sin(t * 0.5) * 0.02;
  });

  if (!geometry) return null;

  return (
    // Zoomed out scale (0.052 vs previous 0.065) with comfortable framing
    <points ref={pointsRef} geometry={geometry} scale={0.052} position={[0, -1.1, 0.2]}>
      <pointsMaterial
        size={0.035}
        color="#2C5545"
        sizeAttenuation
        transparent
        opacity={0.88}
      />
    </points>
  );
}

// ─── 3. Clean, Natural Hero Canvas ──────────────────────────────────────────

export function HeroCanvas() {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[600px] flex items-center justify-center pointer-events-none lg:pointer-events-auto">
      <div className="w-full h-full relative cursor-default touch-pan-y">
        {/* Zoomed out camera position [0, 0, 5.5] with balanced 48 FOV */}
        <Canvas camera={{ position: [0, 0, 5.5], fov: 48 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <NeuralNetwork />
            <FacePointCloud />
          </Suspense>
        </Canvas>

        {/* Subtle left-side gradient fade into the typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent pointer-events-none w-20" />
      </div>
    </div>
  );
}

useGLTF.preload("/face-standard.glb");
