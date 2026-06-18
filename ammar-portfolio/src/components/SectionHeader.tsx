"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/components/MotionWrapper";

// ─── SectionHeader Props ────────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  /** Accent color class for the gradient line, e.g. "from-blue-500/50" */
  accentFrom?: string;
  /** Optional icon element to display before the title */
  icon?: React.ReactNode;
}

// ─── SectionHeader Component ────────────────────────────────────────────────

export function SectionHeader({
  title,
  subtitle,
  accentColor,
  accentFrom = "from-blue-500/50",
  icon,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeUp}
      className="mb-16"
    >
      <div className="flex items-center gap-6 mb-4">
        <h2 className="text-4xl font-bold flex items-center gap-4 text-white">
          {icon}
          {title}
        </h2>
        <div
          className={`h-px flex-1 bg-gradient-to-r ${accentFrom} to-transparent`}
          aria-hidden="true"
        />
      </div>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}
