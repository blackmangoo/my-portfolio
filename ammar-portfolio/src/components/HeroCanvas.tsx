"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ─── Biometric Face Point Cloud with Custom Shaders & Organic Motion ────────

const FACE_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uScanY;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Subtle organic respiration micro-motion along real 3D vertex normals
    vec3 displaced = position + normal * (sin(uTime * 2.2 + position.y * 0.12) * 0.35);

    // Depth-based topological feature coloring (nose/lips/cheeks emerald, periphery forest pine)
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
  const isVisibleRef = useRef<boolean>(true);
  const { scene } = useGLTF("/face-standard.glb");

  useEffect(() => {
    const handleScroll = () => {
      isVisibleRef.current = window.scrollY < 850 && !document.hidden;
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
    if (!isVisibleRef.current) return;
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
    <points
      ref={pointsRef}
      geometry={geometry}
      scale={0.050}
      position={[0, -1.05, 0]}
    >
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
}

// ─── Focused 3D Face Showcase ───────────────────────────────────────────────

export function HeroCanvas() {
  const [hasWebGL] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  });

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[600px] flex items-center justify-center">
        {/* Static Biometric Visual Fallback when WebGL is disabled or unsupported */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-[var(--color-accent)]/20 flex items-center justify-center bg-[var(--color-panel)] shadow-sm">
          <svg
            viewBox="0 0 100 100"
            className="w-48 h-48 text-[var(--color-accent)] opacity-60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          >
            <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="32" />
            <path d="M 50 20 L 50 80 M 20 50 L 80 50" strokeOpacity="0.4" />
            <circle cx="50" cy="42" r="3" fill="currentColor" />
            <circle cx="38" cy="46" r="2" fill="currentColor" />
            <circle cx="62" cy="46" r="2" fill="currentColor" />
            <circle cx="50" cy="62" r="2" fill="currentColor" />
            <path d="M 36 68 Q 50 76 64 68" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[600px] flex items-center justify-center pointer-events-none lg:pointer-events-auto">
      <div className="w-full h-full relative cursor-default touch-pan-y">
        <Canvas camera={{ position: [0, 0, 5.0], fov: 46 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <FacePointCloud />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/face-standard.glb");
