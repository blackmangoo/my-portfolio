"use client";

import { siteConfig } from "@/data/site";
import { MotionWrapper } from "./MotionWrapper";
import { Mail, Phone, Github, Linkedin, Globe, ArrowUp } from "lucide-react";

export function ContactSection() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="pt-24 pb-8 relative z-10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ── Contact CTA Area ── */}
        <MotionWrapper className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Let&apos;s Build Something <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Great</span>
          </h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            I am currently open to full-time AI/ML Engineering and Full-Stack Software Development roles. If you&apos;re looking for a dedicated engineer who builds robust, scalable AI systems, let&apos;s connect.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              <Mail className="w-4 h-4" /> Email Me
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 glass-panel hover:bg-slate-800 text-white font-medium rounded-xl transition-all"
            >
              <Phone className="w-4 h-4" /> {siteConfig.phone}
            </a>
          </div>
        </MotionWrapper>

        {/* ── Footer ── */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`https://${siteConfig.portfolio}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Portfolio Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>

          <div className="text-slate-500 text-sm text-center">
            © {currentYear} {siteConfig.shortName} | Crafted with Next.js, Tailwind & Framer Motion
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
