"use client";

import { skillGroups } from "@/data/skills";
import { staggerContainer, staggerItem } from "./MotionWrapper";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";
import {
  Brain,
  Layers,
  Sparkles,
  Server,
  Monitor,
  Terminal,
} from "lucide-react";

export function SkillsSection() {
  const iconMap: Record<string, React.ReactNode> = {
    brain: <Brain className="w-5 h-5" />,
    layers: <Layers className="w-5 h-5" />,
    sparkles: <Sparkles className="w-5 h-5" />,
    server: <Server className="w-5 h-5" />,
    monitor: <Monitor className="w-5 h-5" />,
    terminal: <Terminal className="w-5 h-5" />,
  };

  const colorMap: Record<string, string> = {
    blue: "border-t-blue-500 group-hover:shadow-blue-500/10 text-blue-400",
    purple: "border-t-purple-500 group-hover:shadow-purple-500/10 text-purple-400",
    cyan: "border-t-cyan-500 group-hover:shadow-cyan-500/10 text-cyan-400",
    emerald: "border-t-emerald-500 group-hover:shadow-emerald-500/10 text-emerald-400",
    orange: "border-t-orange-500 group-hover:shadow-orange-500/10 text-orange-400",
    rose: "border-t-rose-500 group-hover:shadow-rose-500/10 text-rose-400",
  };

  return (
    <section id="skills" className="py-24 relative z-10 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Technical Skills"
          subtitle="A comprehensive toolkit for full-stack AI development, from model training to frontend integration."
          accentColor="purple"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              variants={staggerItem}
              className={`group glass-panel rounded-2xl p-6 border-t-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                colorMap[group.color]?.split(" ")[0] || "border-t-slate-500"
              } ${colorMap[group.color]?.split(" ")[1] || ""}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg bg-slate-800 ${
                    colorMap[group.color]?.split(" ")[2] || "text-slate-400"
                  }`}
                >
                  {iconMap[group.icon] || <Terminal className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-[13px] font-medium rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50 transition-colors group-hover:border-slate-600/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
