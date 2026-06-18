"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// ─── Shared Animation Variants ──────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ─── MotionWrapper Props ────────────────────────────────────────────────────

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  /** Use stagger container variant instead of single fadeUp */
  stagger?: boolean;
  /** Viewport margin for triggering animation */
  margin?: string;
  /** Custom delay in seconds */
  delay?: number;
}

// ─── MotionWrapper Component ────────────────────────────────────────────────

export function MotionWrapper({
  children,
  className = "",
  stagger = false,
  margin = "-100px",
  delay,
}: MotionWrapperProps) {
  const variants = stagger ? staggerContainer : fadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={variants}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
