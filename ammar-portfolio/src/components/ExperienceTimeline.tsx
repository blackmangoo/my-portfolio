"use client";

import { experiences } from "@/data/experience";
import { MotionWrapper } from "./MotionWrapper";
import { Briefcase, GraduationCap } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative z-10 bg-[var(--color-panel)] border-t border-[var(--color-border)] transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <MotionWrapper>
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
              Background & Trajectory
            </span>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)] tracking-tight mt-1 mb-2">
              Engineering Experience
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              Professional engineering internships and academic teaching appointments at FAST-NUCES.
            </p>
          </div>
        </MotionWrapper>

        <div className="space-y-12 relative">
          {/* Vertical subtle track line on desktop */}
          <div className="hidden md:block absolute left-[25%] top-2 bottom-2 w-[1px] bg-[var(--color-border)] -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 relative">
                {/* Dates & Icon (Left Column) */}
                <div className="md:w-1/4 shrink-0 flex items-center md:justify-end gap-3 text-xs font-mono text-[var(--color-muted)]">
                  <span>{exp.dates}</span>
                  <div className="w-6 h-6 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] hidden md:flex items-center justify-center text-[var(--color-accent)] z-10">
                    {exp.type === "teaching" ? (
                      <GraduationCap className="w-3.5 h-3.5" />
                    ) : (
                      <Briefcase className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                {/* Role Details (Right Column) */}
                <div className="md:w-3/4 p-6 bg-[var(--color-background)] border border-[var(--color-border)] rounded-sm">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--color-foreground)] mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-[var(--color-accent)] mb-4">
                    {exp.organization} — <span className="text-[var(--color-muted)]">{exp.location}</span>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed flex items-start gap-2.5">
                        <span className="text-[var(--color-accent)] font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
