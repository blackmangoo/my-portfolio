"use client";

import { useRef, useMemo } from "react";
import { siteConfig } from "@/data/site";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function PointCloud() {
  const ref = useRef<THREE.Points>(null);
  const particleCount = 2000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2.5 + Math.random() * 0.5;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Just a slow idle rotation, OrbitControls handles the rest
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#2C5545"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            <PointCloud />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.0} />
          </Canvas>
          {/* Subtle overlay to soften it */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
