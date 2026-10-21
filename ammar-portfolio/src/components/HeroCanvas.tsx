"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Pure deterministic pseudo-random generator for idempotent renders
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// ─── Neural Network Synaptic Backing ────────────────────────────────────────

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
          startX + (seededRandom(seed++) - 0.5) * 0.3,
          startY + j * NN_NODE_SPACING + (seededRandom(seed++) - 0.5) * 0.3,
          (seededRandom(seed++) - 0.5) * 1.4 - 1.2
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
          if (seededRandom(seed++) > 0.38) {
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
      Math.sin(t * 0.2) * 0.15 + state.pointer.x * 0.25,
      3,
      delta
    );
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      state.pointer.x * 0.3,
      3,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, -1.5]}>
      {/* Synaptic connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2C5545" transparent opacity={0.16} />
      </lineSegments>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[flatNodes, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#2C5545"
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ─── Biometric Face Point Cloud ─────────────────────────────────────────────

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

    // Fluid pointer tracking
    const targetX = (state.pointer.x * Math.PI) / 0.85;
    const targetY = (state.pointer.y * Math.PI) / 0.95 - 0.2;

    pointsRef.current.rotation.y = THREE.MathUtils.damp(
      pointsRef.current.rotation.y,
      targetX,
      5,
      delta
    );
    pointsRef.current.rotation.x = THREE.MathUtils.damp(
      pointsRef.current.rotation.x,
      -targetY,
      5,
      delta
    );

    // Natural subtle breathing hover
    pointsRef.current.position.y =
      -1.25 + Math.sin(state.clock.elapsedTime * 1.1) * 0.06;
  });

  if (!geometry) return null;

  return (
    <points ref={pointsRef} geometry={geometry} scale={0.065} position={[0, -1.25, 0]}>
      <pointsMaterial
        size={0.036}
        color="#2C5545"
        sizeAttenuation
        transparent
        opacity={0.88}
      />
    </points>
  );
}

// ─── Clean, Focused Hero Canvas ─────────────────────────────────────────────

export function HeroCanvas() {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center pointer-events-none lg:pointer-events-auto">
      <div className="w-full h-full relative cursor-default touch-pan-y">
        <Canvas camera={{ position: [0, 0, 4.8], fov: 52 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <NeuralNetwork />
            <FacePointCloud />
          </Suspense>
        </Canvas>

        {/* Ambient subtle gradient fade on the left edge to blend seamlessly with typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent pointer-events-none w-24" />
      </div>
    </div>
  );
}

useGLTF.preload("/face-standard.glb");
