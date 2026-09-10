"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { MotionWrapper } from "./MotionWrapper";
import { X, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function CertificationSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (imagePath: string, title: string, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setSelectedImage(imagePath);
    setSelectedTitle(title);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedTitle("");
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!selectedImage) return;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "Tab") {
        const dialog = document.getElementById("cert-dialog");
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section id="certifications" className="py-24 relative z-10 bg-[var(--color-panel)] border-t border-[var(--color-border)] transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <MotionWrapper>
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-2">
              Verified Credentials
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              Formal industry internship certifications in AI/ML engineering and production systems.
            </p>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {siteConfig.certifications.map((cert, index) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <div className="flex flex-col p-6 rounded-sm border border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-accent)] transition-colors">
                <div className="text-xs text-[var(--color-muted)] font-medium mb-1">{cert.dates}</div>
                <h3 className="text-base font-semibold text-[var(--color-foreground)] mb-1">{cert.title}</h3>
                <div className="text-sm font-medium text-[var(--color-accent)] mb-3">{cert.organization}</div>
                <p className="text-sm text-[var(--color-muted)] mb-5 leading-relaxed">{cert.details}</p>

                <button
                  onClick={(e) => openModal(cert.imagePath, cert.title, e)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-foreground)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] px-4 py-2.5 rounded-sm w-fit transition-colors min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  aria-haspopup="dialog"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            id="cert-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-dialog-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
            onClick={closeModal}
          >
            <h2 id="cert-dialog-title" className="sr-only">
              {selectedTitle} Certificate Verification
            </h2>

            <button
              ref={closeBtnRef}
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close certificate dialog"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-[4/3] bg-[var(--color-panel)] rounded-sm overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={`Official Certificate for ${selectedTitle}`}
                fill
                sizes="(max-width: 1024px) 95vw, 900px"
                priority
                className="object-contain p-2 sm:p-4"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
