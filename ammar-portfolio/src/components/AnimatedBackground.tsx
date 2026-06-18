"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div className="absolute inset-0 animated-grid" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMC43IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpIi8+PC9zdmc+")`,
        }}
      />

      {/* Parallax gradient orbs */}
      <motion.div
        style={{ y: y1 }}
        className="bg-glow bg-glow-blue w-[700px] h-[700px] top-[-15%] left-[-10%] absolute"
      />
      <motion.div
        style={{ y: y2 }}
        className="bg-glow bg-glow-purple w-[600px] h-[600px] bottom-[10%] right-[-15%] absolute"
      />
      <motion.div
        style={{ y: y3 }}
        className="bg-glow bg-glow-emerald w-[500px] h-[500px] top-[50%] left-[20%] opacity-30 absolute"
      />
      <motion.div
        style={{ y: y1 }}
        className="bg-glow bg-glow-cyan w-[400px] h-[400px] top-[20%] right-[10%] opacity-20 absolute"
      />
    </div>
  );
}
