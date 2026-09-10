"use client";

import { skillGroups } from "@/data/skills";
import { MotionWrapper } from "./MotionWrapper";
import { Brain, Layers, Server, Monitor, Terminal } from "lucide-react";

export function SkillsSection() {
  const iconMap: Record<string, React.ReactNode> = {
    brain: <Brain className="w-5 h-5 text-[var(--color-accent)]" />,
    layers: <Layers className="w-5 h-5 text-[var(--color-accent)]" />,
    server: <Server className="w-5 h-5 text-[var(--color-accent)]" />,
    monitor: <Monitor className="w-5 h-5 text-[var(--color-accent)]" />,
    terminal: <Terminal className="w-5 h-5 text-[var(--color-accent)]" />,
  };

  return (
    <section id="skills" className="py-24 relative z-10 bg-[var(--color-background)] border-t border-[var(--color-border)] transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <MotionWrapper>
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
              Capabilities & Tools
            </span>
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)] tracking-tight mt-1 mb-2">
              Technical Toolkit
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              Core frameworks and technologies used across machine learning research, inference backends, and frontend delivery.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {skillGroups.map((group, index) => (
            <MotionWrapper key={group.category} delay={index * 0.08}>
              <div className="flex flex-col p-6 rounded-sm border border-[var(--color-border)] bg-[var(--color-panel)] transition-colors">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[var(--color-border)]">
                  {iconMap[group.icon]}
                  <h3 className="text-base font-semibold text-[var(--color-foreground)]">
                    {group.category}
                  </h3>
                </div>

                <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                  {group.skills.map((skill) => (
                    <li key={skill} className="text-xs font-mono text-[var(--color-foreground)]/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/60" />
                      <span>{skill}</span>
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
