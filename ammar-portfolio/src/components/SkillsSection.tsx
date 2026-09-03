"use client";

import { skillGroups } from "@/data/skills";
import { MotionWrapper } from "./MotionWrapper";
import { Brain, Layers, Server, Monitor, Terminal } from "lucide-react";

export function SkillsSection() {
  const iconMap: Record<string, React.ReactNode> = {
    brain: <Brain className="w-5 h-5 text-[#2C5545]" />,
    layers: <Layers className="w-5 h-5 text-[#2C5545]" />,
    server: <Server className="w-5 h-5 text-[#2C5545]" />,
    monitor: <Monitor className="w-5 h-5 text-[#2C5545]" />,
    terminal: <Terminal className="w-5 h-5 text-[#2C5545]" />,
  };

  return (
    <section id="skills" className="py-24 relative z-10 bg-[#FAF9F6] border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-6">
        <MotionWrapper>
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">Technical Toolkit</h2>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {skillGroups.map((group, index) => (
            <MotionWrapper key={group.category} delay={index * 0.1}>
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-4 border-b border-[#E5E7EB] pb-2">
                  {iconMap[group.icon]}
                  <h3 className="text-base font-semibold text-[#1A1A1A]">
                    {group.category}
                  </h3>
                </div>

                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {group.skills.map((skill) => (
                    <li key={skill} className="text-sm text-[#4B5563]">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
