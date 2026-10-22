"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/data/site";
import { ArrowDown, FileText, Github, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { NeuralNetworkBackground } from "./NeuralNetworkBackground";

// Dynamically import the 3D Face Canvas with ssr: false to guarantee immediate FCP
const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[480px] lg:h-[600px] flex items-center justify-center">
        <div className="relative w-48 h-48 rounded-full border border-[var(--color-accent)]/20 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border border-dashed border-[var(--color-accent)]/30" />
        </div>
      </div>
    ),
  }
);

const proofFacts = [
  { value: "96.2%", label: "Top-1 Held-out Test Accuracy (OmniDrive YOLO11)" },
  { value: "5 AI Systems", label: "Shipped in 6 Weeks (DevelopersHub)" },
  { value: "2 Production", label: "Live Commercial Client Deployments" },
];

export function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 px-6 z-10 overflow-hidden bg-[var(--color-background)] transition-colors">
      {/* 1. Ambient Neural Network Formulation Background Layer */}
      <NeuralNetworkBackground />

      {/* 2. Main Hero Grid Content */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* LEFT COLUMN: Editorial Narrative (Rendered immediately to guarantee instant LCP) */}
        <div className="lg:col-span-6 flex flex-col z-10">

          {/* Availability Status Chip */}
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full">
              {siteConfig.hero.cta}
            </span>
          </div>

          {/* Master Headline - LLM & RAG First Positioning */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-foreground)] leading-[1.12] mb-6">
            Engineering <span className="text-[var(--color-accent)] font-semibold">context-aware AI</span> from model fine-tuning to low-latency production.
          </h1>

          {/* Subheadline with verified CV positioning */}
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-xl mb-8">
            {siteConfig.hero.subheadline}
          </p>

          {/* Tech stack badges: 6 aligned to LLM, RAG, and Vision */}
          <div className="flex flex-wrap gap-2 mb-8">
            {siteConfig.hero.badges.map((badge) => (
              <motion.span
                key={badge}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="px-2.5 py-1 text-xs font-mono font-medium text-[var(--color-foreground)] bg-[var(--color-panel)] border border-[var(--color-border)] rounded-sm cursor-default shadow-xs"
              >
                {badge}
              </motion.span>
            ))}
          </div>

          {/* Action CTAs: One primary, one secondary with version label, one GitHub icon */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-foreground)] text-[var(--color-background)] text-sm font-medium hover:bg-[var(--color-accent)] transition-colors rounded-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={siteConfig.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Ammar Akbar CV (PDF, updated Oct 2026)"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[var(--color-panel)] text-[var(--color-foreground)] border border-[var(--color-border)] text-sm font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors rounded-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                Oct 2026
              </span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ammar Akbar GitHub Profile (@blackmangoo)"
              className="inline-flex items-center justify-center w-11 h-11 text-[var(--color-muted)] hover:text-[var(--color-foreground)] border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-panel)] rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Proof Strip: 3 verified CV facts */}
          <div className="pt-6 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-4">
            {proofFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <span className="text-sm font-bold font-mono text-[var(--color-foreground)] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  <span>{fact.value}</span>
                </span>
                <span className="text-[11px] text-[var(--color-muted)] leading-tight mt-0.5">
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Focused 3D Biometric Face Model */}
        <div className="lg:col-span-6 relative w-full">
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
