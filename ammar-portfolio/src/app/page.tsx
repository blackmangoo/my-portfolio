"use client";

import { Github, Cpu, ShieldCheck, MapPin, Activity, Mail, Linkedin, Globe, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const projects = [
    {
      title: "Hybrid Travel Recommender",
      desc: "LLM-based RAG system utilizing Fine-Tuning and FAISS/Annoy for semantic retrieval.",
      icon: <MapPin className="text-blue-400" />,
      tags: ["RAG", "LLM", "FAISS"],
      link: "https://github.com/blackmangoo"
    },
    {
      title: "Breast Cancer Detection",
      desc: "End-to-end ML pipeline optimized for Recall using SMOTE and rigorous benchmarking.",
      icon: <Activity className="text-emerald-400" />,
      tags: ["Python", "Scikit-Learn", "SMOTE"],
      link: "https://github.com/blackmangoo"
    },
    {
      title: "Helmet Detection System",
      desc: "Real-time safety monitoring using YOLOv5 with transfer learning for construction sites.",
      icon: <ShieldCheck className="text-orange-400" />,
      tags: ["Computer Vision", "YOLOv5", "Python"],
      link: "https://github.com/blackmangoo"
    },
    {
      title: "Disease Outcome Prediction",
      desc: "Multi-disease system analyzing patient features using SVC and Random Forest architectures.",
      icon: <Activity className="text-red-400" />,
      tags: ["Supervised Learning", "SVC", "NLP"],
      link: "https://github.com/blackmangoo"
    },
    {
      title: "Smart Exam Sitting Plan",
      desc: "Unsupervised learning system using K-Means Clustering to optimize student placement.",
      icon: <Cpu className="text-purple-400" />,
      tags: ["K-Means", "Algorithms", "Python"],
      link: "https://github.com/blackmangoo"
    }
  ];

  const skills = [
    "Python", "C++", "PyTorch", "TensorFlow", "Hugging Face",
    "FastAPI", "Docker", "PostgreSQL", "React", "Node.js", "Supabase", "Vercel"
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden text-slate-50">

      {/* Background Glowing Orbs */}
      <div className="bg-glow bg-glow-blue w-[600px] h-[600px] top-[-10%] left-[-10%]" />
      <div className="bg-glow bg-glow-purple w-[700px] h-[700px] bottom-[20%] right-[-20%]" />
      <div className="bg-glow bg-glow-emerald w-[500px] h-[500px] top-[40%] left-[30%] opacity-30" />

      {/* 1. Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-8 text-center pt-20 z-10">
        <motion.div
          initial="hidden" animate="visible" variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-blue-300 rounded-full glass-panel border-blue-500/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Available for AI/ML Roles
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-br from-white via-blue-100 to-slate-400 bg-clip-text text-transparent drop-shadow-2xl">
            Ammar Akbar
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-8 text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed font-light">
            BS Artificial Intelligence student at <span className="text-white font-medium">FAST NU</span>.
            Architecting <span className="text-blue-400 font-medium drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Large Language Models</span> and
            <span className="text-emerald-400 font-medium drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"> Computer Vision</span> pipelines for production.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <a href="#projects" className="px-8 py-4 bg-white text-slate-950 hover:bg-blue-50 hover:scale-105 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Explore Projects
            </a>
            <a href="https://linkedin.com/in/ammar-akbar2002" target="_blank" className="px-8 py-4 glass-panel hover:bg-white/10 hover:scale-105 rounded-full font-semibold transition-all flex items-center gap-2">
              <Linkedin className="w-5 h-5" /> LinkedIn Profile
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Skills Marquee */}
      <section className="py-16 relative z-10 border-y border-white/5 bg-slate-950/40 backdrop-blur-md">
        <div className="mask-edges overflow-hidden container mx-auto px-4">
          <div className="animate-scroll flex gap-8 items-center whitespace-nowrap">
            {[...skills, ...skills, ...skills].map((skill, i) => (
              <div key={i} className="glass-panel px-6 py-3 rounded-2xl flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Experience / Internship Placeholder */}
      <section id="experience" className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="flex items-center gap-6 mb-16"
        >
          <h2 className="text-4xl font-bold flex items-center gap-4 text-white">
            <Briefcase className="w-10 h-10 text-emerald-400" /> Experience
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group border-emerald-500/20"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-500/20 transition-all duration-700"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Machine Learning Intern (Placeholder)</h3>
                <h4 className="text-xl text-emerald-400 font-medium">Company Name</h4>
              </div>
              <span className="px-4 py-2 glass-panel rounded-full text-sm font-medium text-slate-300 w-fit">
                Start Date - End Date
              </span>
            </div>

            <ul className="space-y-4 text-slate-300 text-lg leading-relaxed list-disc list-inside">
              <li>Please provide the details of your internship from your CV or LinkedIn.</li>
              <li>I could not automatically fetch it because LinkedIn blocks automated tools.</li>
              <li>Once you provide it, I will update this section beautifully!</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* 4. Projects Grid */}
      <section id="projects" className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="flex items-center gap-6 mb-16"
        >
          <h2 className="text-4xl font-bold flex items-center gap-4 text-white">
            <Github className="w-10 h-10 text-blue-400" /> Featured Work
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={fadeUp}>
              <a href={project.link} target="_blank" rel="noreferrer" className="block h-full group">
                <div className="h-full flex flex-col glass-panel p-8 rounded-3xl hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)] hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden">

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="mb-8 p-4 glass-panel rounded-2xl w-fit shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-300 text-base mb-8 flex-grow leading-relaxed">{project.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-slate-900/80 backdrop-blur-sm text-xs font-semibold px-4 py-2 rounded-full text-slate-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-blue-400 group-hover:text-white transition-colors mt-auto">
                    View Repository <Globe className="w-4 h-4 ml-1 group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Footer */}
      <footer className="relative z-10 mt-12 py-16 border-t border-white/5 bg-slate-950/40 backdrop-blur-md text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Let's Build Something Great</h2>
          <p className="text-slate-300 text-lg mb-10">Currently exploring AI Engineering & ML opportunities.</p>

          <div className="flex justify-center gap-8 mb-16">
            <a href="mailto:ammar.akbar2000@gmail.com" className="p-4 glass-panel rounded-full hover:bg-white hover:text-slate-950 hover:scale-110 transition-all">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://github.com/blackmangoo" className="p-4 glass-panel rounded-full hover:bg-white hover:text-slate-950 hover:scale-110 transition-all">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/ammar-akbar2002" className="p-4 glass-panel rounded-full hover:bg-white hover:text-slate-950 hover:scale-110 transition-all">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>

          <p className="text-sm text-slate-500 font-medium tracking-wide">
            © {new Date().getFullYear()} Ammar Akbar | Crafted with Next.js, Tailwind & Framer Motion
          </p>
        </div>
      </footer>
    </main>
  );
}