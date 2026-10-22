"use client";

import { skillGroups } from "@/data/skills";
import { MotionWrapper } from "./MotionWrapper";
import { Brain, Layers, Server, Monitor, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function SkillsSection() {
  const iconMap: Record<string, React.ReactNode> = {
    brain: <Brain className="w-5 h-5 text-[var(--color-accent)]" />,
    layers: <Layers className="w-5 h-5 text-[var(--color-accent)]" />,
    server: <Server className="w-5 h-5 text-[var(--color-accent)]" />,
    monitor: <Monitor className="w-5 h-5 text-[var(--color-accent)]" />,
    terminal: <Terminal className="w-5 h-5 text-[var(--color-accent)]" />,
  };

  return (
    <section id="skills" className="py-24 relative z-10 bg-[var(--color-background)] border-t border-[var(--color-border)] transition-colors scroll-mt-16">
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
              Core frameworks and technologies used across machine learning research, inference backends, and full-stack delivery. Highlighted badges indicate core production competencies.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {skillGroups.map((group, index) => (
            <MotionWrapper key={group.category} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -4, borderColor: "var(--color-accent)" }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="flex flex-col p-6 rounded-sm border border-[var(--color-border)] bg-[var(--color-panel)] transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[var(--color-border)]">
                  {iconMap[group.icon]}
                  <h3 className="text-base font-semibold text-[var(--color-foreground)]">
                    {group.category}
                  </h3>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-3">
                  {group.skills.map((skill) => {
                    const isPrimary = group.primarySkills?.includes(skill);
                    return (
                      <motion.li
                        key={skill}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className={`text-xs font-mono flex items-center gap-2 cursor-default py-1 px-1.5 rounded ${
                          isPrimary
                            ? "text-[var(--color-foreground)] font-semibold bg-[var(--color-accent)]/8 border border-[var(--color-accent)]/20"
                            : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isPrimary ? "bg-[var(--color-accent)]" : "bg-[var(--color-muted)]/40"
                          }`}
                        />
                        <span className="truncate">{skill}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
