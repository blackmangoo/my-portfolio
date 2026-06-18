"use client";

import { experiences } from "@/data/experience";
import { MotionWrapper } from "./MotionWrapper";
import { SectionHeader } from "./SectionHeader";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Experience"
          subtitle="Professional internships and academic roles in AI engineering and software development."
          accentColor="emerald"
        />

        <div className="relative pl-6 md:pl-8">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-0 md:left-2 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/30 to-purple-500/10" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <MotionWrapper
                key={index}
                delay={index * 0.15}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-6 md:-left-8 top-1.5 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />

                <div
                  className={`glass-panel rounded-2xl p-6 md:p-8 ${
                    index === 0
                      ? "border border-emerald-500/30 shadow-lg shadow-emerald-500/5 relative overflow-hidden"
                      : ""
                  }`}
                >
                  {/* Subtle highlight for top role */}
                  {index === 0 && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {exp.role}
                        </h3>
                        {exp.type === "internship" && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            Internship
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm font-medium">
                        <span className="text-emerald-400">{exp.organization}</span>
                        <span className="hidden md:inline text-slate-600">•</span>
                        <span className="text-slate-400">{exp.location}</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-800/80 text-slate-300 text-sm font-medium border border-slate-700/50 whitespace-nowrap lg:shrink-0">
                      {exp.dates}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-slate-300 text-sm md:text-base leading-relaxed"
                      >
                        <span className="text-emerald-500 mt-1">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
