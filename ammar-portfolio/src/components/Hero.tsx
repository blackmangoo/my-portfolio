"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/data/site";
import { ArrowDown, FileText, Github } from "lucide-react";

// Dynamically import the WebGL 3D Canvas with ssr: false to guarantee fast FCP
const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[480px] lg:h-[620px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[var(--color-muted)]">
          <div className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)] animate-spin" />
          <span className="text-xs font-mono tracking-wider uppercase">Loading 3D Visualizer...</span>
        </div>
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-20 px-6 z-10 overflow-hidden bg-[var(--color-background)] transition-colors">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* LEFT COLUMN: Editorial Narrative (7 Cols) */}
        <div className="lg:col-span-6 flex flex-col z-10">

          {/* Availability Status Chip */}
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {siteConfig.hero.cta}
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-foreground)] leading-[1.12] mb-6">
            Engineering <span className="text-[var(--color-accent)] font-semibold">applied AI</span> from model weights to production systems.
          </h1>

          {/* Subheadline with clear value proposition */}
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-xl mb-8">
            BS Artificial Intelligence graduate from FAST-NUCES. Specializing in computer vision pipelines (YOLOv11), sensor fusion (Kalman filters), autonomous agents, and low-latency FastAPI architectures.
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mb-10">
            {siteConfig.hero.badges.map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 text-xs font-mono font-medium text-[var(--color-foreground)] bg-[var(--color-panel)] border border-[var(--color-border)] rounded-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Action CTAs with accessible touch targets */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-foreground)] text-[var(--color-background)] text-sm font-medium hover:bg-[var(--color-accent)] transition-colors rounded-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-panel)] text-[var(--color-foreground)] border border-[var(--color-border)] text-sm font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors rounded-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </a>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors min-h-[44px] underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive 3D WebGL Visualization (6 Cols) */}
        <div className="lg:col-span-6 relative w-full">
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
