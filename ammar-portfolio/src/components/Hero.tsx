"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Input Layer (4), Hidden 1 (6), Hidden 2 (6), Output Layer (2)
  const layers = [4, 6, 6, 2];
  const layerSpacing = 2.5;
  const nodeSpacing = 1.0;
  
  const nodes = useMemo(() => {
    const pts = [];
    let startX = -(layers.length - 1) * layerSpacing / 2;
    
    for (let i = 0; i < layers.length; i++) {
      const numNodes = layers[i];
      const startY = -(numNodes - 1) * nodeSpacing / 2;
      const layerPts = [];
      for (let j = 0; j < numNodes; j++) {
        layerPts.push(new THREE.Vector3(
          startX + (Math.random() - 0.5) * 0.4,
          startY + j * nodeSpacing + (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 1.5 - 1.5 // Placed behind the face
        ));
      }
      pts.push(layerPts);
      startX += layerSpacing;
    }
    return pts;
  }, []);

  const lines = useMemo(() => {
    const positions = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      for (const nodeA of nodes[i]) {
        for (const nodeB of nodes[i+1]) {
          // 60% connection probability for a more organic, slightly sparse web
          if (Math.random() > 0.4) {
            positions.push(nodeA.x, nodeA.y, nodeA.z);
            positions.push(nodeB.x, nodeB.y, nodeB.z);
          }
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  const flatNodes = useMemo(() => {
    const positions = [];
    for (const layer of nodes) {
      for (const node of layer) {
        positions.push(node.x, node.y, node.z);
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow organic rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      
      // Parallax interaction
      groupRef.current.position.x += (state.pointer.x * 1.0 - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (state.pointer.y * 1.0 - groupRef.current.position.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2C5545" transparent opacity={0.15} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[flatNodes, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#2C5545" transparent opacity={0.6} sizeAttenuation={true} />
      </points>
    </group>
  );
}

function InteractiveHint() {
  const textRef = useRef<any>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Keep it visible for 10 seconds unless a key is pressed
    const timer = setTimeout(() => setVisible(false), 10000);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=" || e.key === "-" || e.key === "_") {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useFrame((state) => {
    if (!textRef.current) return;
    
    // Gentle floating
    textRef.current.position.y = -2.2 + Math.sin(state.clock.elapsedTime * 2.5) * 0.04;
    
    // Fade out logic
    if (!visible) {
      textRef.current.fillOpacity = THREE.MathUtils.lerp(textRef.current.fillOpacity, 0, 0.05);
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, -2.2, 2.5]}
      fontSize={0.18}
      color="#2C5545"
      anchorX="center"
      anchorY="middle"
      fillOpacity={0.9}
    >
      Try pressing + and -
    </Text>
  );
}

function FacePointCloud() {
  const ref = useRef<THREE.Points>(null);
  const targetScale = useRef(0.065);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") {
        targetScale.current = Math.min(targetScale.current + 0.015, 0.15);
      } else if (e.key === "-" || e.key === "_") {
        targetScale.current = Math.max(targetScale.current - 0.015, 0.03);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
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
      // Highly sensitive tracking
      const targetX = (state.pointer.x * Math.PI) / 0.8;
      
      // Shift targetY slightly down (adding an offset) so the mouse points at the nose/eyes instead of lips
      const targetY = (state.pointer.y * Math.PI) / 0.8 - 0.2;
      
      // Fast, smooth interpolation
      ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.15;
      ref.current.rotation.x += (-targetY - ref.current.rotation.x) * 0.15;

      // Add a subtle continuous floating animation
      ref.current.position.y = -1.25 + Math.sin(state.clock.elapsedTime) * 0.1;

      // Smooth scale interpolation
      const currentScale = ref.current.scale.x;
      const newScale = currentScale + (targetScale.current - currentScale) * 0.1;
      ref.current.scale.set(newScale, newScale, newScale);
    }
  });

  if (positions.length === 0) return null;

  return (
    <points ref={ref} scale={0.065} position={[0, -1.25, 0]}>
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
              <NeuralNetwork />
              <FacePointCloud />
              <InteractiveHint />
            </Suspense>
          </Canvas>
          {/* Subtle overlay to soften it */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
