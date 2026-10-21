"use client";

import { useState } from "react";
import { clientProjects, type ClientProject } from "@/data/clients";
import { MotionWrapper } from "./MotionWrapper";
import {
  ExternalLink,
  Star,
  CheckCircle,
  Building2,
  UtensilsCrossed,
  MonitorCheck,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ClientCard({ client }: { client: ClientProject }) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const isFood = client.id === "fine-burger";

  return (
    <div
      className={`relative rounded-sm border p-6 sm:p-10 transition-all overflow-hidden ${
        isFood
          ? "border-amber-500/25 bg-gradient-to-b from-amber-500/[0.04] via-[var(--color-panel)] to-[var(--color-panel)] shadow-sm hover:border-amber-500/40"
          : "border-cyan-500/25 bg-gradient-to-b from-cyan-500/[0.04] via-[var(--color-panel)] to-[var(--color-panel)] shadow-sm hover:border-cyan-500/40"
      }`}
    >
      {/* Background ambient decorative glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{
          background: isFood
            ? "radial-gradient(circle, #FFB400 0%, transparent 70%)"
            : "radial-gradient(circle, #00F0FF 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top Meta Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[var(--color-border)]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider rounded-full ${
              isFood
                ? "text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30"
                : "text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30"
            }`}
          >
            {isFood ? <UtensilsCrossed className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
            <span>{client.badge}</span>
          </span>

          <span className="text-xs font-mono text-[var(--color-muted)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Delivered & Live in Production</span>
          </span>
        </div>

        <motion.a
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          href={client.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-sm transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          style={{
            backgroundColor: isFood ? "#FFB400" : "#0E1110",
            color: isFood ? "#1A1A1A" : "#00F0FF",
            border: isFood ? "1px solid #D97706" : "1px solid rgba(0, 240, 255, 0.4)",
          }}
        >
          <span>Launch Live Platform</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.a>
      </div>

      {/* Hero Headline & Problem-Solution */}
      <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-foreground)] mb-2">
            {client.name}
          </h3>
          <p className="text-sm sm:text-base font-medium text-[var(--color-accent)] mb-4">
            {client.tagline}
          </p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
            {client.overview}
          </p>

          {/* Business Impact Box */}
          <div className="p-4 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] mb-6">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-semibold text-[var(--color-foreground)] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Commercial Transformation & Impact</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-foreground)]/85 leading-relaxed">
              {client.businessImpact}
            </p>
          </div>

          {/* Deliverables Interactive Navigator */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-[var(--color-foreground)] uppercase tracking-wider">
                Full Systems Delivered (Click to Inspect)
              </h4>
              <span className="text-[11px] font-mono text-[var(--color-muted)]">
                {activeTab + 1} of {client.deliverables.length}
              </span>
            </div>

            {/* Step Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              {client.deliverables.map((deliv, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={deliv.title}
                    onClick={() => setActiveTab(idx)}
                    className={`relative p-3 text-left rounded-sm border text-xs transition-all min-h-[58px] flex flex-col justify-between ${
                      isActive
                        ? "border-[var(--color-accent)] bg-[var(--color-background)] shadow-sm"
                        : "border-[var(--color-border)] bg-[var(--color-background)]/60 hover:border-[var(--color-foreground)]/30 text-[var(--color-muted)]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId={`active-tab-${client.id}`}
                        className="absolute inset-0 rounded-sm border-2 border-[var(--color-accent)] pointer-events-none"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="font-semibold text-[var(--color-foreground)] truncate block">
                      {deliv.title}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-accent)] block mt-1">
                      {deliv.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Deliverable Detail Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={client.deliverables[activeTab].title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-[var(--color-foreground)] flex items-center gap-1.5">
                    <MonitorCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>{client.deliverables[activeTab].title}</span>
                  </span>
                  {client.deliverables[activeTab].url && (
                    <a
                      href={client.deliverables[activeTab].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Direct Portal Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {client.deliverables[activeTab].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Key Metrics & Verified Owner Review Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 p-5 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] shadow-sm">
            {client.metrics.map((m) => (
              <div key={m.label} className="p-2.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--color-foreground)]">
                  {m.value}
                </div>
                <div className="text-[11px] text-[var(--color-muted)] mt-0.5 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Verified Owner Review Card */}
          <div
            className="relative rounded-sm border p-6 bg-[var(--color-background)] shadow-sm transition-all"
            style={{
              borderColor: isFood ? "rgba(255, 180, 0, 0.4)" : "rgba(0, 240, 255, 0.4)",
            }}
          >
            {/* Review Card Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  {[...Array(client.review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--color-muted)]">
                  Verified Client Review
                </span>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span>Verified Owner</span>
              </span>
            </div>

            {/* Highlighted Quote Header */}
            <p className="text-sm font-semibold text-[var(--color-foreground)] italic mb-3 leading-snug">
              &ldquo;{client.review.highlightText}&rdquo;
            </p>

            {/* Full Quote */}
            <blockquote className="text-xs text-[var(--color-muted)] leading-relaxed mb-5">
              &ldquo;{client.review.text}&rdquo;
            </blockquote>

            {/* Author Attribution */}
            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[var(--color-foreground)]">
                  {client.review.clientName}
                </div>
                <div className="text-[11px] text-[var(--color-accent)] font-medium">
                  {client.review.clientRole}
                </div>
                <div className="text-[10px] text-[var(--color-muted)]">
                  {client.review.companyName}
                  {client.review.location ? ` • ${client.review.location}` : ""}
                </div>
              </div>
              <span className="text-[10px] font-mono text-[var(--color-muted)]">{client.review.date}</span>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5">
            {client.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)]/80 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientDeliveriesSection() {
  return (
    <section id="clients" className="py-24 relative z-10 bg-[var(--color-background)] border-t border-[var(--color-border)] transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <MotionWrapper>
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Commercial Deliveries & Founder Reviews</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-foreground)] tracking-tight mt-1 mb-3">
              Production Client Systems
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)] max-w-2xl leading-relaxed">
              Full-scale platforms engineered and delivered directly to business owners and enterprise co-founders, verified in live production.
            </p>
          </div>
        </MotionWrapper>

        {/* Client Cards Stack */}
        <div className="space-y-12">
          {clientProjects.map((client, index) => (
            <MotionWrapper key={client.id} delay={index * 0.15}>
              <ClientCard client={client} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
