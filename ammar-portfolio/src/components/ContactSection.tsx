"use client";

import { siteConfig } from "@/data/site";
import { MotionWrapper } from "./MotionWrapper";
import { ArrowUp, Mail, Linkedin, Github, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="pt-28 pb-12 relative z-10 bg-[var(--color-background)] border-t border-[var(--color-border)] transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        {/* Contact CTA Block */}
        <MotionWrapper>
          <div className="mb-20">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-foreground)] tracking-tight mt-1 mb-4">
              Have an applied AI challenge worth building?
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)] mb-8 max-w-2xl leading-relaxed">
              I am currently open to full-time AI/ML Engineering, Computer Vision, and Full-Stack AI Developer opportunities. If you value engineers who focus on deployable, low-latency production systems rather than just static notebooks, let&apos;s talk.
            </p>

            {/* Quick Info Grid */}
            <div className="flex flex-wrap gap-6 mb-10 text-xs text-[var(--color-muted)] font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Lahore, Pakistan (PKT, UTC+5)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--color-accent)]" />
                <span>{siteConfig.phone}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-foreground)] text-[var(--color-background)] text-sm font-medium hover:bg-[var(--color-accent)] transition-colors rounded-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
              >
                <Mail className="w-4 h-4" />
                <span>Send an Email</span>
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--color-panel)] text-[var(--color-foreground)] border border-[var(--color-border)] text-sm font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors rounded-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </MotionWrapper>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-muted)]">
          <div>
            © {currentYear} {siteConfig.name}. Designed & Engineered with Next.js & Three.js.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-foreground)] transition-colors min-h-[44px] underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[var(--color-foreground)] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:underline"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
