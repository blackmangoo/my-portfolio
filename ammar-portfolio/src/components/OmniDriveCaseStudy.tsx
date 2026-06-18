"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, FileText, ChevronRight } from "lucide-react";
import { omniDrive } from "@/data/projects";
import { MotionWrapper } from "./MotionWrapper";
import { SectionHeader } from "./SectionHeader";

export function OmniDriveCaseStudy() {
  const [activeTab, setActiveTab] = useState(omniDrive.modules[0].id);

  return (
    <section id="omnidrive" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="OmniDrive AI"
          subtitle={omniDrive.subtitle}
          accentColor="cyan"
        />

        {/* ── Main Container ── */}
        <div className="gradient-border rounded-3xl bg-slate-900/60 backdrop-blur-sm p-8 md:p-12 mb-16 shadow-2xl">
          {/* Top Info Area */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                {omniDrive.projectType}
              </span>
              <p className="text-lg text-slate-300 leading-relaxed">
                {omniDrive.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {omniDrive.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a
                href={omniDrive.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors border border-slate-700"
              >
                <Github className="w-4 h-4" /> Source
              </a>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 font-medium rounded-xl transition-colors border border-cyan-500/30">
                <FileText className="w-4 h-4" /> Full Case Study
              </button>
            </div>
          </div>

          {/* ── Metrics Grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {omniDrive.metrics.map((metric, i) => (
              <MotionWrapper
                key={i}
                delay={i * 0.1}
                className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-cyan-500/30 transition-colors"
              >
                <span className="text-3xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors mb-1">
                  {metric.value}
                </span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {metric.label}
                </span>
              </MotionWrapper>
            ))}
          </div>

          {/* ── Architecture Flow ── */}
          <MotionWrapper className="mb-16">
            <h3 className="text-xl font-bold text-white mb-8">System Architecture</h3>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
              {omniDrive.architecture.map((node, i) => {
                // Map logical color to tailwind classes
                const colorMap: Record<string, string> = {
                  cyan: "border-t-cyan-400 from-cyan-500/10",
                  emerald: "border-t-emerald-400 from-emerald-500/10",
                  purple: "border-t-purple-400 from-purple-500/10",
                  blue: "border-t-blue-400 from-blue-500/10",
                  orange: "border-t-orange-400 from-orange-500/10",
                  rose: "border-t-rose-400 from-rose-500/10",
                };

                return (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-4 md:gap-2 flex-1 w-full md:w-auto">
                    {/* Node */}
                    <div
                      className={`relative w-full md:w-auto px-4 py-3 rounded-xl bg-gradient-to-b ${
                        colorMap[node.color] || colorMap.blue
                      } to-transparent border border-slate-700/50 border-t-2 flex-1 text-center whitespace-nowrap shadow-lg shadow-black/20`}
                    >
                      <span className="text-sm font-semibold text-slate-200">
                        {node.label}
                      </span>
                    </div>

                    {/* Connector Arrow (Hide on last item) */}
                    {i < omniDrive.architecture.length - 1 && (
                      <div className="hidden md:flex items-center justify-center w-8 shrink-0">
                        <div className="w-full h-px bg-slate-600 relative flow-pulse">
                          <ChevronRight className="absolute -right-2 -top-[11px] w-5 h-5 text-slate-500" />
                        </div>
                      </div>
                    )}
                    {/* Mobile vertical connector */}
                    {i < omniDrive.architecture.length - 1 && (
                      <div className="md:hidden h-6 w-px bg-slate-600 relative flow-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          </MotionWrapper>

          {/* ── Modules Tabs ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Tab Navigation */}
            <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {omniDrive.modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className={`text-left px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === mod.id
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
                  }`}
                >
                  {mod.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="lg:col-span-2 glass-panel rounded-2xl p-6 min-h-[220px]">
              <AnimatePresence mode="wait">
                {omniDrive.modules.map(
                  (mod) =>
                    activeTab === mod.id && (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="text-lg font-bold text-white mb-4">
                          {mod.title} Features
                        </h4>
                        <ul className="space-y-3">
                          {mod.bullets.map((bullet, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-3 text-slate-300"
                            >
                              <span className="text-cyan-500 mt-1">▹</span>
                              <span className="leading-relaxed">{bullet}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Why It Matters ── */}
          <MotionWrapper className="glass-panel border-l-4 border-l-cyan-500 rounded-2xl p-6 md:p-8">
            <h4 className="text-lg font-bold text-white mb-3">Why This Matters</h4>
            <p className="text-slate-300 leading-relaxed">
              {omniDrive.whyItMatters}
            </p>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
