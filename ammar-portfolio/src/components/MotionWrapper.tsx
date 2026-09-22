"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// ─── Shared Animation Variants ──────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 24, stiffness: 120 },
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
  margin = "-60px",
  delay = 0,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  const customFadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 120,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const variants = stagger ? staggerContainer : customFadeUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
