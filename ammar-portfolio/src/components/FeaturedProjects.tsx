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
import { Github, Layers } from "lucide-react";
import { OmniDriveExplorer } from "./OmniDriveExplorer";

const categories: ProjectCategory[] = [
  "All",
  "Computer Vision",
  "LLM & Agents",
  "Sensor Fusion & Edge",
  "Systems & Web",
];

type ProjectItem = FlagshipProject | FeaturedProject;

function CaseStudy({ project, isFlagship = false }: { project: ProjectItem; isFlagship?: boolean }) {
  const isFlagshipType = (p: ProjectItem): p is FlagshipProject => "modules" in p;

  return (
    <div className={`flex flex-col gap-8 py-10 ${isFlagship ? "border-b border-[var(--color-border)] mb-12" : "mb-12"}`}>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        {/* LEFT: Problem statement & Description */}
        <div className="w-full lg:w-5/12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full">
              {project.category}
            </span>
            {isFlagship && (
              <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
                Flagship System
              </span>
            )}
          </div>

          <h3 className="text-2xl font-semibold text-[var(--color-foreground)] mb-2">{project.title}</h3>
          {project.subtitle && (
            <p className="text-sm font-medium text-[var(--color-accent)] mb-4">{project.subtitle}</p>
          )}
          <p className="text-[var(--color-muted)] leading-relaxed mb-6 text-sm sm:text-base">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-accent)] min-h-[44px]"
          >
            <span>View Architecture & Code</span>
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* RIGHT: Architecture / Metrics Cards */}
        <div className="w-full lg:w-7/12 border border-[var(--color-border)] p-6 sm:p-8 bg-[var(--color-panel)] rounded-sm shadow-sm">
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-6 border-b border-[var(--color-border)]">
              {project.metrics.map((metric: OmniDriveMetric | { value: string; label: string }) => (
                <div key={metric.label}>
                  <div className="text-2xl font-bold font-mono text-[var(--color-foreground)]">{metric.value}</div>
                  <div className="text-xs text-[var(--color-muted)] mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {project.architecture && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-4">
                Pipeline Architecture
              </h4>
              <div className="flex flex-wrap gap-2 items-center">
                {project.architecture.map((node: string | ArchitectureNode, idx: number) => {
                  const label = typeof node === "string" ? node : node.label;
                  const latency = typeof node === "object" ? node.latency : null;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="flex flex-col text-xs text-[var(--color-foreground)] bg-[var(--color-background)] border border-[var(--color-border)] px-3 py-1.5 rounded-sm">
                        <span className="font-medium">{label}</span>
                        {latency && <span className="text-[10px] font-mono text-[var(--color-accent)]">{latency}</span>}
                      </div>
                      {idx < (project.architecture?.length ?? 0) - 1 && (
                        <span className="text-[var(--color-muted)] font-mono text-xs">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {"highlights" in project && project.highlights && (
            <div>
              <h4 className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-3">
                Key Engineering Highlights
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight: string, idx: number) => (
                  <li key={idx} className="text-sm text-[var(--color-muted)] flex items-start gap-2.5">
                    <span className="text-[var(--color-accent)] font-bold mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isFlagshipType(project) && project.modules && (
            <div className="space-y-5">
              <h4 className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-2">
                Ecosystem Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.modules.map((mod: OmniDriveModule) => (
                  <div key={mod.id} className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-sm">
                    <h5 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">{mod.title}</h5>
                    <ul className="space-y-1.5">
                      {mod.bullets.map((bullet: string, idx: number) => (
                        <li key={idx} className="text-xs text-[var(--color-muted)] flex items-start gap-2 leading-relaxed">
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
        </div>
      </div>

      {/* Embedded Live Simulation for Flagship Project */}
      {isFlagship && <OmniDriveExplorer />}
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

  return (
    <section id="projects" className="py-24 relative z-10 bg-[var(--color-background)] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <MotionWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl font-semibold text-[var(--color-foreground)] tracking-tight mt-1 mb-3">
                Featured AI & Systems Engineering
              </h2>
              <p className="text-[var(--color-muted)] max-w-2xl text-base sm:text-lg">
                End-to-end production systems covering computer vision, autonomous agents, sensor fusion, and high-performance backends.
              </p>
            </div>

            {/* Discipline Category Filter */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors min-h-[36px] ${
                    selectedCategory === cat
                      ? "bg-[var(--color-foreground)] text-[var(--color-background)] font-semibold shadow-sm"
                      : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Flagship: OmniDrive AI */}
        {showFlagship && (
          <MotionWrapper>
            <CaseStudy project={omniDrive} isFlagship={true} />
          </MotionWrapper>
        )}

        {/* Filtered Featured Projects */}
        <MotionWrapper>
          {filteredProjects.map((project) => (
            <CaseStudy key={project.title} project={project} />
          ))}
        </MotionWrapper>

        {/* Minor Projects & Research Prototypes */}
        <MotionWrapper>
          <div className="mt-16 pt-12 border-t border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Research Prototypes & Client Systems</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {minorProjects.map((project) => (
                <div
                  key={project.title}
                  className="p-5 border border-[var(--color-border)] bg-[var(--color-panel)] rounded-sm hover:border-[var(--color-accent)] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-[var(--color-accent)] font-semibold uppercase block mb-1">
                      {project.category}
                    </span>
                    <h4 className="text-sm font-semibold text-[var(--color-foreground)] mb-2">{project.title}</h4>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4">{project.tagline}</p>
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)] underline underline-offset-2"
                    >
                      <span>Repository</span>
                      <Github className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
