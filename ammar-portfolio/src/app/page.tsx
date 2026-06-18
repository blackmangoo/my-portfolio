"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { OmniDriveCaseStudy } from "@/components/OmniDriveCaseStudy";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificationSection } from "@/components/CertificationSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-950 selection:bg-blue-500/30 selection:text-blue-200">
      <AnimatedBackground />
      <Navbar />
      
      <Hero />
      <OmniDriveCaseStudy />
      <FeaturedProjects />
      <ExperienceTimeline />
      <SkillsSection />
      <CertificationSection />
      <ContactSection />
    </main>
  );
}