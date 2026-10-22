"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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

const LAYER_CONFIG = [5, 8, 8, 5]; // Input (5) -> Hidden 1 (8) -> Hidden 2 (8) -> Output (5)
const LAYER_X = [-4.6, -1.5, 1.5, 4.6]; // Wide landscape spread across background
const NUM_PULSES = 60;

function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef<number>(0);
  const scrollSpeedRef = useRef<number>(1.0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastY);
      lastY = currentY;

      // Pause rendering calculations when hero is scrolled out of view
      isVisibleRef.current = currentY < 850 && !document.hidden;
      scrollRef.current = Math.min(1.0, currentY / 700);
      scrollSpeedRef.current = Math.min(3.8, 1.0 + delta * 0.06);
    };

    const handleVisibility = () => {
      isVisibleRef.current = window.scrollY < 850 && !document.hidden;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Generate wide feedforward neural network geometry
  const { nodePositions, linePositions, synapses } = useMemo(() => {
    const nodesByLayer: THREE.Vector3[][] = [];
    const flatNodeCoords: number[] = [];

    // 1. Build Layer Neurons
    for (let l = 0; l < LAYER_CONFIG.length; l++) {
      const count = LAYER_CONFIG[l];
      const layerNodes: THREE.Vector3[] = [];
      const totalSpan = (count - 1) * 0.58;
      const startY = -totalSpan / 2;

      for (let i = 0; i < count; i++) {
        const y = startY + i * 0.58;
        // Subtle concave arc in depth so outer layers curve forward
        const z = -2.2 + Math.abs(l - 1.5) * 0.35;
        const pt = new THREE.Vector3(LAYER_X[l], y, z);
        layerNodes.push(pt);
        flatNodeCoords.push(pt.x, pt.y, pt.z);
      }
      nodesByLayer.push(layerNodes);
    }

    // 2. Build Synaptic Connections between adjacent layers
    const allSynapses: Synapse[] = [];
    const flatLineCoords: number[] = [];

    for (let l = 0; l < LAYER_CONFIG.length - 1; l++) {
      const currentLayer = nodesByLayer[l];
      const nextLayer = nodesByLayer[l + 1];

      for (let i = 0; i < currentLayer.length; i++) {
        const src = currentLayer[i];
        for (let j = 0; j < nextLayer.length; j++) {
          const dst = nextLayer[j];
          const weight = 0.3 + ((i * 7 + j * 13) % 10) * 0.07;
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

  // Dynamic buffer geometry for traveling activation packets
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
      speed: 0.35 + ((p * 37) % 10) * 0.04,
    }))
  );

  useFrame((state, delta) => {
    if (!isVisibleRef.current) return;
    const pulses = pulsesRef.current;
    const posAttr = pulseGeometry.getAttribute("position") as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    // Decay scroll speed boost back to baseline
    scrollSpeedRef.current = THREE.MathUtils.damp(
      scrollSpeedRef.current,
      1.0,
      2.5,
      delta
    );
    const speedMultiplier = scrollSpeedRef.current;

    // 1. Advance Forward-Propagation Signal Pulses (Left -> Right)
    for (let p = 0; p < pulses.length; p++) {
      const pulse = pulses[p];
      pulse.progress += delta * pulse.speed * speedMultiplier;

      // When pulse reaches destination neuron, step forward to next layer or loop back
      if (pulse.progress >= 1.0) {
        pulse.progress = 0.0;
        const currentSyn = synapses[pulse.synapseIdx];
        const nextLayerIdx = (currentSyn.layerIdx + 1) % (LAYER_CONFIG.length - 1);

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

    // 2. Scroll Formulation & Parallax Sway
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      const scrollRatio = scrollRef.current;

      // As user scrolls down, network gently tilts in 3D perspective and ascends
      const targetRotX = scrollRatio * 0.18 - state.pointer.y * 0.05;
      const targetRotY = state.pointer.x * 0.12 + Math.sin(t * 0.2) * 0.03;
      const targetPosY = -scrollRatio * 0.45;

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        3.0,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        3.0,
        delta
      );
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        targetPosY,
        3.0,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Synaptic Axons (High-contrast, clearly visible feedforward lines) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2C5545" transparent opacity={0.22} />
      </lineSegments>

      {/* 2. Layer Neurons (Nodes) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#2C5545"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* 3. Real-Time Forward Propagation Pulses (Signals flowing left -> right) */}
      <points geometry={pulseGeometry}>
        <pointsMaterial
          size={0.22}
          color="#10B981"
          transparent
          opacity={0.95}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export function NeuralNetworkBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-90 z-0">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <NetworkScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
