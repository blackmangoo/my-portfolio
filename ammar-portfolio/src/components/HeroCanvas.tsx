"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
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
// Calibrated layer X coordinates to fit 100% within the visible canvas frustum
const LAYER_X = [-2.2, -0.75, 0.75, 2.2];
const NUM_PULSES = 54;

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollSpeedBoostRef = useRef<number>(1.0);

  // Track window scroll speed to dynamically accelerate neural network forward propagation
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;
      // Scroll velocity temporarily accelerates synaptic pulses
      scrollSpeedBoostRef.current = Math.min(3.5, 1.0 + delta * 0.05);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate deterministic layered feedforward architecture
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
        // 3D curvature wrapping in depth around and behind the face
        const z = -1.1 - Math.sin((l / (LAYER_CONFIG.length - 1)) * Math.PI) * 0.45;
        const pt = new THREE.Vector3(LAYER_X[l], y, z);
        layerNodes.push(pt);
        flatNodeCoords.push(pt.x, pt.y, pt.z);
      }
      nodesByLayer.push(layerNodes);
    }

    // 2. Build Synaptic Connections (Feedforward adjacent layers)
    const allSynapses: Synapse[] = [];
    const flatLineCoords: number[] = [];

    for (let l = 0; l < LAYER_CONFIG.length - 1; l++) {
      const currentLayer = nodesByLayer[l];
      const nextLayer = nodesByLayer[l + 1];

      for (let i = 0; i < currentLayer.length; i++) {
        const src = currentLayer[i];
        for (let j = 0; j < nextLayer.length; j++) {
          const dst = nextLayer[j];
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
      speed: 0.38 + ((p * 37) % 10) * 0.04,
    }))
  );

  useFrame((state, delta) => {
    const pulses = pulsesRef.current;
    const posAttr = pulseGeometry.getAttribute("position") as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    // Decay scroll speed boost back to baseline 1.0
    scrollSpeedBoostRef.current = THREE.MathUtils.damp(
      scrollSpeedBoostRef.current,
      1.0,
      2.5,
      delta
    );
    const speedMultiplier = scrollSpeedBoostRef.current;

    // 1. Advance Forward-Propagation Signal Pulses (Left -> Right)
    for (let p = 0; p < pulses.length; p++) {
      const pulse = pulses[p];
      pulse.progress += delta * pulse.speed * speedMultiplier;

      // When pulse reaches destination neuron, step forward to next layer or loop back
      if (pulse.progress >= 1.0) {
        pulse.progress = 0.0;
        const currentSyn = synapses[pulse.synapseIdx];
        const nextLayerIdx = (currentSyn.layerIdx + 1) % (LAYER_CONFIG.length - 1);

        // Find candidate synapses in the next layer starting near current destination
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

    // 2. Parallax tracking with cursor
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      const targetParallaxX = state.pointer.x * 0.18;
      const targetParallaxY = -state.pointer.y * 0.12;
      const targetRotY = state.pointer.x * 0.1 + Math.sin(t * 0.25) * 0.03;
      const targetRotX = -state.pointer.y * 0.06;

      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        targetParallaxX,
        3.5,
        delta
      );
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        targetParallaxY,
        3.5,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.9]}>
      {/* 1. Synaptic Axons (High-contrast visible connection lines) */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2C5545" transparent opacity={0.28} />
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
          opacity={0.88}
          sizeAttenuation
        />
      </points>

      {/* 3. Real-Time Forward Propagation Pulses (Signals flowing left -> right) */}
      <points geometry={pulseGeometry}>
        <pointsMaterial
          size={0.2}
          color="#10B981"
          transparent
          opacity={0.98}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ─── 2. Detailed Biometric Face Point Cloud with Shaders & Motion ───────────

const FACE_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uScanY;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Subtle organic respiration micro-motion along real 3D vertex normals
    vec3 displaced = position + normal * (sin(uTime * 2.2 + position.y * 0.12) * 0.35);

    // Depth-based topological shading (nose/lips/cheeks emerald, periphery forest pine)
    float depthFactor = smoothstep(-25.0, 20.0, position.z);
    vec3 colorBase = vec3(0.172, 0.333, 0.270); // Deep forest green (#2C5545)
    vec3 colorHighlight = vec3(0.063, 0.725, 0.505); // Luminous emerald (#10B981)

    // Biometric scanning wave sweeping vertically across facial geometry
    float scanDist = abs(position.y - uScanY);
    float scanGlow = smoothstep(7.0, 0.0, scanDist) * 0.45;

    vColor = mix(colorBase, colorHighlight, depthFactor) + vec3(scanGlow * 0.5);
    vAlpha = 0.75 + depthFactor * 0.2 + scanGlow * 0.25;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    // Smooth particle sizing with scanning wave flare
    gl_PointSize = (22.0 / -mvPosition.z) * (1.0 + scanGlow * 0.4);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FACE_FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Render circular anti-aliased particles instead of square OpenGL pixels
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function FacePointCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
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

  // Dedicated custom biometric shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: FACE_VERTEX_SHADER,
      fragmentShader: FACE_FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uScanY: { value: 36.0 },
      },
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // 1. Update shader uniforms for biometric scan wave and organic respiration
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      // Oscillate scanning beam vertically across the full face height (Y: -2 to +75)
      materialRef.current.uniforms.uScanY.value = Math.sin(t * 1.4) * 38.0 + 36.0;
    }

    if (!pointsRef.current) return;

    // 2. Natural calibrated human head rotation bounds:
    // Yaw (left-right): max ~20 degrees (+/- 0.35 rad)
    // Pitch (up-down): max ~13 degrees (+/- 0.22 rad)
    // Roll (subtle neck bank): max ~3.0 degrees (+/- 0.05 rad)
    const targetYaw = state.pointer.x * 0.35;
    const targetPitch = -state.pointer.y * 0.20 - 0.08;
    const targetRoll = -state.pointer.x * 0.05;

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
    pointsRef.current.position.y = -1.05 + Math.sin(t * 1.1) * 0.04;
    pointsRef.current.position.x = Math.sin(t * 0.5) * 0.015;
  });

  if (!geometry) return null;

  return (
    // Perfectly framed zoom scale (0.050) sitting centered in front of the neural network
    <points
      ref={pointsRef}
      geometry={geometry}
      material={shaderMaterial}
      scale={0.050}
      position={[0, -1.05, 0.3]}
    >
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
}

// ─── 3. Clean, Balanced Hero Canvas ─────────────────────────────────────────

export function HeroCanvas() {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[600px] flex items-center justify-center pointer-events-none lg:pointer-events-auto">
      <div className="w-full h-full relative cursor-default touch-pan-y">
        {/* Zoomed out camera position [0, 0, 5.4] with balanced 46 FOV */}
        <Canvas camera={{ position: [0, 0, 5.4], fov: 46 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <NeuralNetwork />
            <FacePointCloud />
          </Suspense>
        </Canvas>

        {/* Soft edge blend into the editorial typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent pointer-events-none w-16" />
      </div>
    </div>
  );
}

useGLTF.preload("/face-standard.glb");
