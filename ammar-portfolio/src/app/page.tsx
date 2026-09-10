import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificationSection } from "@/components/CertificationSection";
import { ContactSection } from "@/components/ContactSection";
import { RecruiterAgent } from "@/components/RecruiterAgent";
import { MotionWrapper } from "@/components/MotionWrapper";

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[var(--color-background)] transition-colors border-t border-[var(--color-border)]">
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
              I am a BS Artificial Intelligence graduate from FAST-NUCES with a deep commitment to practical, deployable AI engineering. While training models in Jupyter notebooks is foundational, true engineering begins when that model must interact with raw, noisy physical signals, high-throughput microservices, and human operators.
            </p>
            <p>
              My work spans from edge computer vision (YOLOv11 custom architectures) and mathematical sensor fusion (Kalman filters) to autonomous agent orchestration and retrieval-augmented assistance. I believe in engineering complete feedback loops: from data curation and fine-tuning (LoRA/PEFT) to containerized inference pipelines with sub-100ms latency guarantees.
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
      <AboutSection />
      <FeaturedProjects />
      <ExperienceTimeline />
      <SkillsSection />
      <CertificationSection />
      <ContactSection />
      <RecruiterAgent />
    </main>
  );
}
