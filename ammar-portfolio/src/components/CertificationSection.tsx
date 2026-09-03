"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { MotionWrapper } from "./MotionWrapper";
import { X, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function CertificationSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="certifications" className="py-24 relative z-10 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-6">
        <MotionWrapper>
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">Certifications</h2>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {siteConfig.certifications.map((cert, index) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <div className="flex flex-col group">
                <div className="text-xs text-[#6B7280] font-medium mb-1">{cert.dates}</div>
                <h3 className="text-base font-semibold text-[#1A1A1A] mb-1">{cert.title}</h3>
                <div className="text-sm font-medium text-[#2C5545] mb-3">{cert.organization}</div>
                <p className="text-sm text-[#6B7280] mb-4">{cert.details}</p>
                
                <button
                  onClick={() => setSelectedImage(cert.imagePath)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#1A1A1A] border border-[#E5E7EB] hover:border-[#2C5545] px-3 py-1.5 rounded-sm w-fit transition-colors"
                >
                  View Certificate <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-[4/3] bg-white rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Certificate"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
