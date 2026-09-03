"use client";

import { siteConfig } from "@/data/site";
import { MotionWrapper } from "./MotionWrapper";
import { ArrowUp } from "lucide-react";

export function ContactSection() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="pt-32 pb-12 relative z-10 bg-[#FAF9F6] border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Contact CTA Area */}
        <MotionWrapper>
          <div className="mb-20">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] tracking-tight mb-4">
              Have an AI problem worth building?
            </h2>
            <p className="text-lg text-[#6B7280] mb-8 max-w-2xl leading-relaxed">
              I am currently open to full-time AI/ML Engineering roles. If you&apos;re looking for an engineer who focuses on deployable, production-ready systems rather than just notebooks, let&apos;s talk.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-[#2C5545] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2C5545]"
              >
                Send an email
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1A1A1A] border border-[#E5E7EB] text-sm font-medium hover:bg-slate-50 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2C5545]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </MotionWrapper>

        {/* Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[#6B7280] text-sm">
            © {currentYear} {siteConfig.shortName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors underline underline-offset-4 decoration-transparent hover:decoration-[#1A1A1A]"
            >
              GitHub
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#1A1A1A] transition-colors focus-visible:outline-none focus-visible:underline"
              aria-label="Scroll to top"
            >
              Top <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
