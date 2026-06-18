"use client";

import { featuredProjects, minorProjects } from "@/data/projects";
import { MotionWrapper, staggerContainer } from "./MotionWrapper";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 relative z-10 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Featured AI/ML Projects"
          subtitle="Production-grade AI systems, LLM integrations, and robust full-stack applications."
          accentColor="blue"
        />

        {/* ── Featured Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} index={i} {...project} />
          ))}
        </motion.div>

        {/* ── Minor Projects ── */}
        <MotionWrapper>
          <h3 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-4">
            More Systems
            <div className="h-px flex-1 bg-slate-800" />
          </h3>
          <div className="flex flex-wrap gap-4">
            {minorProjects.map((project) => (
              <div
                key={project.title}
                className="flex flex-col gap-1 px-5 py-3 rounded-xl glass-panel border-slate-800 hover:border-slate-700 transition-colors"
              >
                <span className="text-sm font-bold text-slate-200">
                  {project.title}
                </span>
                <span className="text-xs text-slate-400">
                  {project.tagline}
                </span>
              </div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
