"use client";

import { useState } from "react";
import {
  omniDrive,
  featuredProjects,
  minorProjects,
  type ProjectCategory,
  type FlagshipProject,
  type FeaturedProject,
  type OmniDriveMetric,
  type ArchitectureNode,
  type OmniDriveModule,
} from "@/data/projects";
import { MotionWrapper } from "./MotionWrapper";
import { Github, ExternalLink, Layers, ChevronDown, ChevronUp, Cpu } from "lucide-react";
import { OmniDriveExplorer } from "./OmniDriveExplorer";
import { motion, AnimatePresence } from "framer-motion";

const categories: ProjectCategory[] = [
  "All",
  "LLM & Agents",
  "Computer Vision",
  "Creative Engineering",
  "Systems & Web",
];

type ProjectItem = FlagshipProject | FeaturedProject;

function CaseStudy({
  project,
  isFlagship = false,
  defaultExpanded = false,
}: {
  project: ProjectItem;
  isFlagship?: boolean;
  defaultExpanded?: boolean;
}) {
  const isFlagshipType = (p: ProjectItem): p is FlagshipProject => "modules" in p;
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  // Surface top 2 stats on compact card, full stats inside expanded case study
  const previewMetrics = project.metrics ? project.metrics.slice(0, 2) : [];
  const hasExpandedContent = Boolean(
    project.architecture ||
      ("highlights" in project && project.highlights?.length) ||
      (isFlagshipType(project) && project.modules?.length) ||
      (project.metrics && project.metrics.length > 2) ||
      isFlagship
  );

  return (
    <div
      className={`rounded-sm border border-[var(--color-border)] p-6 sm:p-8 bg-[var(--color-panel)] transition-all ${
        isFlagship ? "border-[var(--color-accent)]/30 shadow-sm" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between">
        {/* LEFT: Project Overview */}
        <div className="w-full lg:w-7/12 flex flex-col">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full">
              {project.category}
            </span>
            {isFlagship && (
              <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 rounded-full">
                Final Year Project
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-foreground)] tracking-tight mb-1.5">
            {project.title}
          </h3>

          {project.subtitle && (
            <p className="text-xs sm:text-sm font-medium text-[var(--color-accent)] mb-3">
              {project.subtitle}
            </p>
          )}

          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Primary Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.stack.slice(0, 5).map((tech: string) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] rounded-sm"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 text-[var(--color-muted)]">
                +{project.stack.length - 5} more
              </span>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 bg-[var(--color-foreground)] text-[var(--color-background)] hover:bg-[var(--color-accent)] transition-colors rounded-sm shadow-sm min-h-[44px]"
              >
                <span>
                  {project.category === "Creative Engineering"
                    ? "Launch 3D Experience"
                    : "View Live Project"}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            )}

            {project.github && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-accent)] min-h-[44px] px-2"
              >
                <span>Source Code</span>
                <Github className="w-4 h-4" />
              </motion.a>
            )}

            {hasExpandedContent && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-accent)] border border-[var(--color-accent)]/30 hover:border-[var(--color-accent)] px-3.5 py-2.5 rounded-sm transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <span>{isExpanded ? "Hide Details" : "Case Study & Architecture"}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Top 2 Key Stat Tiles Preview */}
        <div className="w-full lg:w-5/12 grid grid-cols-2 gap-3 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-sm">
          {previewMetrics.map((metric: OmniDriveMetric | { value: string; label: string; footnote?: string }) => (
            <div key={metric.label} className="p-2">
              <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--color-foreground)]">{metric.value}</div>
              <div className="text-xs text-[var(--color-muted)] mt-0.5 leading-snug">{metric.label}</div>
              {metric.footnote && (
                <div className="text-[10px] text-[var(--color-muted)]/80 mt-1 italic leading-tight line-clamp-2">
                  {metric.footnote}
                </div>
              )}
            </div>
          ))}
          {previewMetrics.length === 0 && (
            <div className="col-span-2 flex items-center justify-center p-4 text-xs font-mono text-[var(--color-muted)]">
              <Cpu className="w-4 h-4 mr-2 text-[var(--color-accent)]" />
              Production Architecture Verified
            </div>
          )}
        </div>
      </div>

      {/* EXPANDABLE ACCORDION: Complete Case Study, Full Metrics, Pipeline Stepper & Inspector */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-8 pt-6 border-t border-[var(--color-border)]"
          >
            {/* Full Metrics Breakdown */}
            {project.metrics && project.metrics.length > 2 && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-3">
                  Verified Empirical Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)]">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="p-1">
                      <div className="text-lg font-bold font-mono text-[var(--color-foreground)]">{m.value}</div>
                      <div className="text-xs text-[var(--color-muted)] mt-0.5">{m.label}</div>
                      {m.footnote && (
                        <div className="text-[10px] text-[var(--color-muted)]/80 mt-1 italic leading-tight">
                          {m.footnote}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pipeline Architecture Stepper (horizontal scroll on mobile) */}
            {project.architecture && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-3">
                  Pipeline Architecture
                </h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {project.architecture.map((node: string | ArchitectureNode, idx: number) => {
                    const label = typeof node === "string" ? node : node.label;
                    const sublabel = typeof node === "object" ? node.sublabel : null;
                    return (
                      <div key={idx} className="flex items-center gap-2 shrink-0">
                        <div className="flex flex-col text-xs text-[var(--color-foreground)] bg-[var(--color-background)] border border-[var(--color-border)] px-3 py-1.5 rounded-sm min-h-[46px] justify-center">
                          <span className="font-semibold whitespace-nowrap">{label}</span>
                          {sublabel && (
                            <span className="text-[10px] font-mono text-[var(--color-accent)] whitespace-nowrap">
                              {sublabel}
                            </span>
                          )}
                        </div>
                        {idx < (project.architecture?.length ?? 0) - 1 && (
                          <span className="text-[var(--color-muted)] font-mono text-xs px-1">→</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Highlights */}
            {"highlights" in project && project.highlights && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-2.5">
                  Engineering Highlights
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="text-xs sm:text-sm text-[var(--color-muted)] flex items-start gap-2.5">
                      <span className="text-[var(--color-accent)] font-bold mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Modules (for OmniDrive) */}
            {isFlagshipType(project) && project.modules && (
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-2">
                  System Modules
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.modules.map((mod: OmniDriveModule) => (
                    <div key={mod.id} className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-sm">
                      <h5 className="text-xs font-semibold text-[var(--color-foreground)] mb-1.5">{mod.title}</h5>
                      <ul className="space-y-1">
                        {mod.bullets.map((bullet: string, idx: number) => (
                          <li key={idx} className="text-[11px] text-[var(--color-muted)] flex items-start gap-2 leading-relaxed">
                            <span className="text-[var(--color-border)] mt-0.5">-</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Interactive Telemetry Inspector for OmniDrive */}
            {isFlagship && <OmniDriveExplorer />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === selectedCategory);

  const showFlagship = selectedCategory === "All" || omniDrive.category === selectedCategory;

  // Counts for each category
  const getCategoryCount = (cat: ProjectCategory) => {
    if (cat === "All") return featuredProjects.length + 1; // +1 for OmniDrive
    const matches = featuredProjects.filter((p) => p.category === cat).length;
    return omniDrive.category === cat ? matches + 1 : matches;
  };

  return (
    <section id="projects" className="py-24 relative z-10 bg-[var(--color-background)] transition-colors scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <MotionWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
                Technical Case Studies
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-foreground)] tracking-tight mt-1 mb-3">
                Featured Engineering Projects
              </h2>
              <p className="text-[var(--color-muted)] max-w-2xl text-base sm:text-lg">
                Production-grade systems covering LLM orchestration, hybrid RAG, edge computer vision, and physical dynamics sensor fusion.
              </p>
            </div>

            {/* Category Filter Pills: Accessible ARIA Tablist with Scroll Snap */}
            <div
              role="tablist"
              aria-label="Project categories"
              className="flex items-center gap-1.5 p-1 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-sm overflow-x-auto max-w-full scrollbar-none"
            >
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = getCategoryCount(cat);
                return (
                  <button
                    key={cat}
                    role="tab"
                    id={`cat-tab-${cat.replace(/\s+/g, "-")}`}
                    aria-selected={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap min-h-[44px] flex items-center gap-1.5 shrink-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                      isSelected
                        ? "text-[var(--color-background)] font-semibold"
                        : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-[var(--color-foreground)] rounded-sm -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-[var(--color-background)]/20 text-[var(--color-background)]"
                          : "bg-[var(--color-border)]/60 text-[var(--color-muted)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </MotionWrapper>

        {/* Dynamic Project List */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {/* Flagship: OmniDrive AI (Expanded by default on desktop) */}
            {showFlagship && (
              <motion.div
                key="flagship-omnidrive"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <CaseStudy project={omniDrive} isFlagship={true} defaultExpanded={true} />
              </motion.div>
            )}

            {/* Filtered Featured Projects (Compact cards with expandable case studies) */}
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <CaseStudy project={project} defaultExpanded={false} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Minor Projects & Research Prototypes (Clean Separation from Commercial Clients) */}
        <MotionWrapper>
          <div className="mt-16 pt-12 border-t border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Research Prototypes & Open-Source Experiments</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {minorProjects.map((project) => (
                <motion.div
                  key={project.title}
                  whileHover={{ y: -4, borderColor: "var(--color-accent)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="p-5 border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm hover:border-[var(--color-accent)] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[var(--color-accent)] font-semibold uppercase block mb-1">
                      {project.category}
                    </span>
                    <h4 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">{project.title}</h4>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4">{project.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:underline min-h-[36px]"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] underline underline-offset-2 min-h-[36px]"
                      >
                        <span>Source</span>
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
