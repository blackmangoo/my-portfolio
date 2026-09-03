"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// ─── Shared Animation Variants ──────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 20, stiffness: 100 },
  },
};

// ─── MotionWrapper Props ────────────────────────────────────────────────────

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  margin?: string;
  delay?: number;
}

// ─── MotionWrapper Component ────────────────────────────────────────────────

export function MotionWrapper({
  children,
  className = "",
  stagger = false,
  margin = "-100px",
  delay = 0,
}: MotionWrapperProps) {
  const customFadeUp = {
    hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 20, stiffness: 100, delay },
    },
  };

  const variants = stagger ? staggerContainer : customFadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: margin as any }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
