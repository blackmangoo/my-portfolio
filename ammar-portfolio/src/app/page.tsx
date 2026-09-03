"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificationSection } from "@/components/CertificationSection";
import { ContactSection } from "@/components/ContactSection";
import { MotionWrapper } from "@/components/MotionWrapper";

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto px-6">
        <MotionWrapper>
          <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-6">About</h2>
          <div className="text-lg text-[#1A1A1A] leading-relaxed space-y-6">
            <p>
              I am a final-year BS Artificial Intelligence student at FAST-NUCES with a strong focus on practical, deployable AI engineering. I like building systems where the model is only one part of the solution.
            </p>
            <p>
              My work spans across computer vision, LLM applications, retrieval systems, and backend API architecture. Rather than relying on boilerplate generation, I engineer end-to-end solutions—from data collection and model fine-tuning to building the necessary infrastructure for production deployment.
            </p>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#FAF9F6] selection:bg-[#2C5545]/15 selection:text-[#2C5545]">
      <Navbar />
      <Hero />
      <AboutSection />
      <FeaturedProjects />
      <ExperienceTimeline />
      <SkillsSection />
      <CertificationSection />
      <ContactSection />
    </main>
  );
}