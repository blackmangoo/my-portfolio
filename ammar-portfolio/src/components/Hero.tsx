"use client";

import { useRef, useMemo } from "react";
import { siteConfig } from "@/data/site";
import { Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

function FacePointCloud() {
  const ref = useRef<THREE.Points>(null);
  
  // Load the face model
  const obj = useLoader(OBJLoader, '/face.obj');
  
  const positions = useMemo(() => {
    let pos: Float32Array | null = null;
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Just take the first mesh's positions
        if (!pos) pos = child.geometry.attributes.position.array;
      }
    });
    return pos || new Float32Array(0);
  }, [obj]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Prominent parallax effect: aggressive tracking
      const targetX = (state.pointer.x * Math.PI) / 1.5;
      const targetY = (state.pointer.y * Math.PI) / 1.5;
      
      // Smooth interpolation using lerp
      ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.1;
      ref.current.rotation.x += (-targetY - ref.current.rotation.x) * 0.1;

      // Add a subtle continuous floating animation
      ref.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  if (positions.length === 0) return null;

  return (
    <points ref={ref} scale={0.065} position={[0, -1.2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#2C5545"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.9}
      />
    </points>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative pt-24 pb-20 px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* LEFT: Editorial Text */}
        <div className="flex flex-col z-10">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-xs font-medium text-[#2C5545] bg-[#2C5545]/10 border border-[#2C5545]/20 rounded-full">
              {siteConfig.hero.cta}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A] leading-[1.15] mb-6">
            {siteConfig.hero.headline}
          </h1>
          
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-xl mb-10">
            {siteConfig.hero.subheadline}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2C5545] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2C5545]"
            >
              View my work
            </a>
            <a
              href={siteConfig.cvPath}
              className="px-6 py-3 bg-white text-[#1A1A1A] border border-[#E5E7EB] text-sm font-medium hover:bg-slate-50 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2C5545]"
            >
              Download CV
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 text-sm font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors focus-visible:outline-none underline underline-offset-4 decoration-transparent hover:decoration-[#1A1A1A]"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* RIGHT: Restrained 3D Visual */}
        <div className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center -mr-12 opacity-80 pointer-events-none lg:pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <FacePointCloud />
            </Suspense>
          </Canvas>
          {/* Subtle overlay to soften it */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
