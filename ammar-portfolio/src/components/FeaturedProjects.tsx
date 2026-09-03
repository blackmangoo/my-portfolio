"use client";

import { omniDrive, featuredProjects, minorProjects } from "@/data/projects";
import { MotionWrapper } from "./MotionWrapper";
import { Github, ExternalLink } from "lucide-react";

function CaseStudy({ project, isFlagship = false }: { project: any, isFlagship?: boolean }) {
  return (
    <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start py-12 ${isFlagship ? 'border-b border-[#E5E7EB] mb-12' : 'mb-12'}`}>
      {/* LEFT: Description */}
      <div className="w-full lg:w-5/12">
        <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-2">{project.title}</h3>
        {project.subtitle && (
          <p className="text-[#2C5545] font-medium mb-4">{project.subtitle}</p>
        )}
        <p className="text-[#6B7280] leading-relaxed mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech: string) => (
            <span key={tech} className="text-xs font-medium px-2 py-1 bg-[#F3F4F6] text-[#4B5563] rounded-sm">
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A1A] hover:text-[#2C5545] transition-colors underline underline-offset-4 decoration-[#E5E7EB] hover:decoration-[#2C5545]"
        >
          View Source <Github className="w-4 h-4" />
        </a>
      </div>

      {/* RIGHT: Architecture / Details */}
      <div className="w-full lg:w-7/12 editorial-border p-8 bg-white rounded-sm editorial-shadow">
        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-[#E5E7EB]">
            {project.metrics.map((metric: any) => (
              <div key={metric.label}>
                <div className="text-xl font-semibold text-[#1A1A1A]">{metric.value}</div>
                <div className="text-xs text-[#6B7280] mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {project.architecture && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">Architecture</h4>
            <div className="flex flex-wrap gap-2 items-center">
              {project.architecture.map((node: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-sm text-[#4B5563] bg-[#F9FAFB] border border-[#E5E7EB] px-3 py-1.5 rounded-sm">
                    {typeof node === 'string' ? node : node.label}
                  </span>
                  {idx < project.architecture.length - 1 && (
                    <span className="text-[#D1D5DB]">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {project.highlights && (
          <div>
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">Key Implementation</h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight: string, idx: number) => (
                <li key={idx} className="text-sm text-[#6B7280] flex items-start gap-2">
                  <span className="text-[#2C5545] mt-0.5">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.modules && (
          <div className="space-y-6">
            <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider mb-2">Core Modules</h4>
            {project.modules.map((mod: any) => (
              <div key={mod.id}>
                <h5 className="text-sm font-medium text-[#1A1A1A] mb-1">{mod.title}</h5>
                <ul className="space-y-1">
                  {mod.bullets.map((bullet: string, idx: number) => (
                    <li key={idx} className="text-sm text-[#6B7280] flex items-start gap-2">
                      <span className="text-[#D1D5DB] mt-0.5">-</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 relative z-10 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6">
        <MotionWrapper>
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight mb-4">Featured Work</h2>
            <p className="text-[#6B7280] max-w-2xl text-lg">
              Detailed case studies of my primary engineering projects.
            </p>
          </div>
        </MotionWrapper>

        {/* Flagship: OmniDrive */}
        <MotionWrapper>
          <CaseStudy project={omniDrive} isFlagship={true} />
        </MotionWrapper>

        {/* Other Featured */}
        <MotionWrapper>
          {featuredProjects.map((project, idx) => (
            <CaseStudy key={idx} project={project} />
          ))}
        </MotionWrapper>

        {/* Minor Projects */}
        <MotionWrapper>
          <div className="mt-16 pt-12 border-t border-[#E5E7EB]">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-6">Other Systems & Experiments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {minorProjects.map((project) => (
                <div
                  key={project.title}
                  className="p-5 border border-[#E5E7EB] bg-white rounded-sm hover:border-[#2C5545] transition-colors"
                >
                  <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2">{project.title}</h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{project.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
