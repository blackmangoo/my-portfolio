"use client";

import { siteConfig } from "@/data/site";
import { MotionWrapper } from "./MotionWrapper";
import { SectionHeader } from "./SectionHeader";
import { Award, Image as ImageIcon } from "lucide-react";

export function CertificationSection() {
  return (
    <section id="certificate" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Certifications"
          subtitle="Professional recognition and completed programs."
          accentFrom="from-cyan-500/50"
        />

        <div className="flex flex-col gap-12">
          {siteConfig.certifications.map((cert, index) => (
            <MotionWrapper key={index}>
              <div className="relative group rounded-3xl glass-panel p-1 max-w-4xl mx-auto overflow-hidden">
                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-slate-900/90 rounded-[22px] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center border border-slate-700/50">
                  
                  {/* Text Content */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 mb-2">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {cert.organization}
                    </h3>
                    <h4 className="text-xl font-semibold text-white">
                      {cert.title}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {cert.details}
                    </p>
                    <div className="pt-4 inline-block px-4 py-1.5 rounded-full bg-slate-800 text-sm font-medium text-slate-300 border border-slate-700">
                      {cert.dates}
                    </div>
                  </div>

                  {/* Image / Placeholder Container */}
                  <div className="w-full md:w-[320px] shrink-0">
                    <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/50 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative transition-colors group-hover:border-cyan-500/50 group-hover:bg-slate-800/80">
                      <ImageIcon className="w-10 h-10 text-slate-500 mb-3 group-hover:text-cyan-400 transition-colors" />
                      <p className="text-sm text-slate-400 font-medium">Certificate Image Pending</p>
                      <p className="text-xs text-slate-500 mt-2 font-mono">
                        Add to: public{cert.imagePath.replace('/certificates', '/certificates')}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
