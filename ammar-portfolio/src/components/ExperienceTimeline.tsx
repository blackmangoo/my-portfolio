"use client";

import { experiences } from "@/data/experience";
import { MotionWrapper } from "./MotionWrapper";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative z-10 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-6">
        <MotionWrapper>
          <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-12">Experience</h2>
        </MotionWrapper>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                {/* Dates (Left column on md) */}
                <div className="md:w-1/4 shrink-0 text-sm font-medium text-[#6B7280]">
                  {exp.dates}
                </div>

                {/* Content (Right column on md) */}
                <div className="md:w-3/4">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">{exp.role}</h3>
                  <div className="text-sm font-medium text-[#2C5545] mb-4">
                    {exp.organization} — {exp.location}
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-[#6B7280] leading-relaxed flex items-start gap-2">
                        <span className="text-[#D1D5DB] mt-0.5">-</span>
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
