import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ClientDeliveriesSection } from "@/components/ClientDeliveriesSection";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificationSection } from "@/components/CertificationSection";
import { ContactSection } from "@/components/ContactSection";
import { MotionWrapper } from "@/components/MotionWrapper";
import { PhysicsDroplet } from "@/components/PhysicsDroplet";

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[var(--color-background)] transition-colors border-t border-[var(--color-border)] scroll-mt-16">
      <div className="max-w-4xl mx-auto px-6">
        <MotionWrapper>
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
            Engineering Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--color-foreground)] tracking-tight mt-1 mb-8">
            Building systems where the machine learning model is only one piece of the puzzle.
          </h2>

          <div className="text-base sm:text-lg text-[var(--color-foreground)]/90 leading-relaxed space-y-6">
            <p>
              I am an AI/ML Engineer and BS Artificial Intelligence graduate from FAST-NUCES specializing in LLM orchestration, Retrieval-Augmented Generation (RAG), and applied NLP. I build context-aware AI systems with deterministic safety controls—from 4-bit LoRA/QLoRA fine-tuning and dense vector retrieval to low-latency deployment with FastAPI and Supabase.
            </p>
            <p>
              Alongside language models, my foundation covers edge computer vision (YOLO11), physical dynamics sensor fusion (Kalman filters), and full-stack product delivery with Next.js and Flutter. Rather than building fragile notebook prototypes, I engineer end-to-end production systems where inference latency, throughput, and retrieval relevance are empirically verified.
            </p>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-[var(--color-accent)]/15 selection:text-[var(--color-accent)] transition-colors">
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <ExperienceTimeline />
      <ClientDeliveriesSection />
      <SkillsSection />
      <AboutSection />
      <CertificationSection />
      <ContactSection />
      <PhysicsDroplet />
    </main>
  );
}
