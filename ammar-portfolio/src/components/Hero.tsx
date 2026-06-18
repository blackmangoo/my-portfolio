"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Download,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { siteConfig } from "@/data/site";

/* ═══════════════════════════════════════════════════════════
   Animation variants
   ═══════════════════════════════════════════════════════════ */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const dashboardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const panelReveal = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ═══════════════════════════════════════════════════════════
   Confidence bar data for the YOLO panel
   ═══════════════════════════════════════════════════════════ */
const detectionResults = [
  { label: "Brake Pad", confidence: 97.2, color: "from-emerald-500 to-emerald-400" },
  { label: "Tire", confidence: 94.1, color: "from-blue-500 to-cyan-400" },
  { label: "Headlight", confidence: 91.8, color: "from-purple-500 to-purple-400" },
  { label: "Windshield", confidence: 88.4, color: "from-amber-500 to-yellow-400" },
];

/* ═══════════════════════════════════════════════════════════
   Terminal log lines
   ═══════════════════════════════════════════════════════════ */
const terminalLines = [
  { prefix: "INFO", text: "YOLOv11 model loaded (47.3ms)", color: "text-blue-400" },
  { prefix: "OK", text: "4 objects detected — conf > 0.85", color: "text-emerald-400" },
  { prefix: "INFO", text: "RAG query complete — 3 docs retrieved", color: "text-blue-400" },
  { prefix: "OK", text: "Prediction pipeline finished", color: "text-emerald-400" },
];

/* ═══════════════════════════════════════════════════════════
   Sensor metrics
   ═══════════════════════════════════════════════════════════ */
const sensorMetrics = [
  { label: "Speed", value: "62 km/h", accent: "text-cyan-400" },
  { label: "RPM", value: "3,200", accent: "text-blue-400" },
  { label: "Temp", value: "87°C", accent: "text-amber-400" },
  { label: "Fuel", value: "72%", accent: "text-emerald-400" },
];

/* ═══════════════════════════════════════════════════════════
   AI Dashboard Mockup Sub-Component
   ═══════════════════════════════════════════════════════════ */
function AIDashboardMockup() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={dashboardStagger}
      className="relative w-full max-w-[540px] mx-auto"
    >
      {/* Outer glow ring */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 pointer-events-none" />

      {/* Main dashboard container */}
      <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 overflow-hidden shadow-2xl shadow-black/40">
        {/* ── Top bar ── */}
        <motion.div
          variants={panelReveal}
          className="flex items-center justify-between px-5 py-3 border-b border-slate-700/40 bg-slate-900/60"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
              OmniDrive Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-400 font-medium">LIVE</span>
          </div>
        </motion.div>

        {/* ── Dashboard body ── */}
        <div className="p-4 space-y-3">
          {/* Row 1: Car Scan + YOLO Results */}
          <div className="grid grid-cols-5 gap-3">
            {/* Car Scan Panel */}
            <motion.div
              variants={panelReveal}
              className="col-span-2 rounded-xl bg-slate-800/60 border border-slate-700/30 p-3"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                  <span className="text-[10px] text-blue-400">🚗</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
                  Car Scan
                </span>
              </div>
              {/* Simplified car wireframe */}
              <div className="relative aspect-[4/3] rounded-lg bg-slate-900/80 border border-slate-700/20 flex items-center justify-center overflow-hidden">
                {/* Scan grid lines */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute left-0 right-0 border-t border-cyan-500/40"
                      style={{ top: `${(i + 1) * 16.6}%` }}
                    />
                  ))}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute top-0 bottom-0 border-l border-cyan-500/40"
                      style={{ left: `${(i + 1) * 20}%` }}
                    />
                  ))}
                </div>
                {/* Scanning sweep */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Car label */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className="text-2xl leading-none">🏎️</div>
                  <span className="text-[9px] text-cyan-400/80 font-mono tracking-wider">
                    SCANNING
                  </span>
                </div>
              </div>
            </motion.div>

            {/* YOLO Detection Results */}
            <motion.div
              variants={panelReveal}
              className="col-span-3 rounded-xl bg-slate-800/60 border border-slate-700/30 p-3"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
                  Detection Confidence
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  YOLOv11
                </span>
              </div>
              <div className="space-y-2.5">
                {detectionResults.map((item, i) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-white font-mono font-bold">
                        {item.confidence}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-700/50 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.confidence}%` }}
                        transition={{
                          duration: 1.2,
                          delay: 0.8 + i * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 2: RAG Assistant + Architecture nodes */}
          <div className="grid grid-cols-2 gap-3">
            {/* RAG Assistant */}
            <motion.div
              variants={panelReveal}
              className="rounded-xl bg-slate-800/60 border border-slate-700/30 p-3"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-4 h-4 rounded bg-purple-500/20 flex items-center justify-center">
                  <span className="text-[8px] text-purple-400">💬</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-300">
                  RAG Assistant
                </span>
              </div>
              {/* Chat bubbles */}
              <div className="space-y-2">
                <div className="bg-slate-700/40 rounded-lg rounded-tl-none px-3 py-2 border border-slate-600/20">
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Checking service manual for brake pad replacement...
                  </p>
                </div>
                <motion.div
                  className="bg-blue-500/10 rounded-lg rounded-tr-none px-3 py-2 border border-blue-500/20 ml-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                >
                  <p className="text-[10px] text-blue-300 leading-relaxed">
                    Found 3 relevant sections. Estimated wear: 23,000 km remaining.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Architecture nodes */}
            <motion.div
              variants={panelReveal}
              className="rounded-xl bg-slate-800/60 border border-slate-700/30 p-3"
            >
              <span className="text-[11px] font-semibold text-slate-300 mb-2.5 block">
                Stack
              </span>
              <div className="flex flex-col gap-2">
                {/* Connection line SVG */}
                <svg
                  className="absolute opacity-20 pointer-events-none"
                  width="100%"
                  height="100%"
                  aria-hidden="true"
                >
                  <line
                    x1="50%"
                    y1="30%"
                    x2="50%"
                    y2="70%"
                    stroke="currentColor"
                    strokeDasharray="4 4"
                    className="text-cyan-400"
                  />
                </svg>

                {/* Node: FastAPI */}
                <motion.div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-300">
                    FastAPI
                  </span>
                  <span className="text-[8px] text-slate-500 ml-auto font-mono">
                    :8000
                  </span>
                </motion.div>

                {/* Dashed connector */}
                <div className="flex justify-center">
                  <div className="w-[1px] h-3 border-l border-dashed border-slate-600" />
                </div>

                {/* Node: Supabase */}
                <motion.div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.25, duration: 0.4 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-[10px] font-semibold text-cyan-300">
                    Supabase
                  </span>
                  <span className="text-[8px] text-slate-500 ml-auto font-mono">
                    DB
                  </span>
                </motion.div>

                {/* Dashed connector */}
                <div className="flex justify-center">
                  <div className="w-[1px] h-3 border-l border-dashed border-slate-600" />
                </div>

                {/* Node: Next.js */}
                <motion.div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-500/10 border border-slate-500/20"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-[10px] font-semibold text-slate-300">
                    Next.js
                  </span>
                  <span className="text-[8px] text-slate-500 ml-auto font-mono">
                    UI
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Row 3: Sensor Metrics */}
          <motion.div
            variants={panelReveal}
            className="grid grid-cols-4 gap-2"
          >
            {sensorMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="rounded-lg bg-slate-800/60 border border-slate-700/30 px-3 py-2.5 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
              >
                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-medium mb-0.5">
                  {metric.label}
                </p>
                <p className={`text-sm font-bold font-mono ${metric.accent}`}>
                  {metric.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Row 4: Terminal log */}
          <motion.div
            variants={panelReveal}
            className="rounded-xl bg-slate-950/80 border border-slate-700/30 p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-slate-500 font-mono">
                ~/omnidrive $
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                Pipeline Log
              </span>
            </div>
            <div className="space-y-1 font-mono">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 text-[10px]"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + i * 0.2, duration: 0.3 }}
                >
                  <span className={`${line.color} font-bold shrink-0`}>
                    [{line.prefix}]
                  </span>
                  <span className="text-slate-400">{line.text}</span>
                </motion.div>
              ))}
              {/* Blinking cursor */}
              <motion.span
                className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero Section
   ═══════════════════════════════════════════════════════════ */
export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 px-6 z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── LEFT: Text content ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col"
        >
          {/* Status badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-blue-300 rounded-full glass-panel border-blue-500/30 w-fit"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            </span>
            {siteConfig.hero.cta || "Available for AI/ML Roles"}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            <span className="bg-gradient-to-br from-white via-blue-100 to-slate-400 bg-clip-text text-transparent">
              {siteConfig.hero.headline}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed"
          >
            {siteConfig.hero.subheadline}
          </motion.p>

          {/* Tech badges */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {siteConfig.hero.badges.map((badge, i) => (
              <span
                key={badge}
                className="animate-float px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-3"
          >
            {/* Primary: View OmniDrive */}
            <a
              href="#omnidrive"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              View OmniDrive
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary: View Projects */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 glass-panel hover:bg-white/10 text-white font-medium rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              View Projects
              <ChevronRight className="w-4 h-4" />
            </a>

            {/* Download CV */}
            <a
              href={siteConfig.cvPath}
              className="inline-flex items-center gap-2 px-5 py-3 glass-panel hover:bg-white/10 text-slate-300 font-medium rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Download CV"
            >
              <Download className="w-4 h-4" /> CV
            </a>

            {/* GitHub */}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 glass-panel hover:bg-white/10 text-slate-300 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 glass-panel hover:bg-white/10 text-slate-300 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: AI Dashboard Mockup ── */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          {/* Background glow behind dashboard */}
          <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/8 via-transparent to-cyan-500/8 rounded-3xl blur-2xl pointer-events-none" />
          <AIDashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
