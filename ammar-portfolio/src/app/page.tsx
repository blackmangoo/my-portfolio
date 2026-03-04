"use client";

import { Github, ShieldCheck, MapPin, Activity, Mail, Linkedin, Globe, Briefcase, GraduationCap, Sparkles, School, Code2, Phone } from "lucide-react";
import { motion, type Variants } from "framer-motion";

export default function Home() {
  const experiences = [
    {
      role: "AI Developer Intern",
      org: "NEXIUM",
      location: "Lahore",
      date: "Jun 2025 - Aug 2025",
      bullets: [
        "AI Automation (Recipe Generator): Built an automated recipe generation system using n8n and Gemini API, creating efficient workflows to transform user dietary data into structured, AI-generated meal plans.",
        "AI Integration (Quote Generator): Integrated the Gemini 2.0 Flash LLM into a responsive React application, utilizing Prompt Engineering to deliver high-quality, topic-specific motivational content.",
      ],
    },
    {
      role: "Teacher Assistant — Programming Fundamentals",
      org: "FAST - National University of Computer and Emerging Sciences",
      location: "Lahore",
      date: "Sep 2024 - Jun 2025",
      bullets: [
        "Directed student development workflows by providing technical mentorship in C++ and feature engineering.",
        "Managed team-based project lifecycles to improve collaborative outcomes and system performance.",
      ],
    },
  ];

  const projects = [
    {
      title: "Breast Cancer Detection System",
      desc: "Developed an end-to-end Breast Cancer Classification pipeline using supervised learning, advanced feature engineering, and imbalanced data handling (SMOTE). Conducted rigorous model benchmarking to optimize for Recall and improve early detection sensitivity.",
      icon: <Activity className="text-emerald-400" />,
      tags: ["Machine Learning", "SMOTE", "Recall", "Feature Engineering"],
      link: "https://github.com/hafizqaim/NLP-Assignment-2.git"
    },
    {
      title: "Hybrid Travel Destination Recommendation",
      desc: "Developed six LLM-based recommendation systems utilizing Fine-Tuning and RAG architectures to deliver explainable, human-like outputs. Integrated FAISS and Annoy for high-efficiency semantic retrieval and optimized ranking/generation quality.",
      icon: <MapPin className="text-blue-400" />,
      tags: ["Recommender Systems", "RAG", "FAISS", "Annoy"],
      link: "https://github.com/Ausaaf572/Applied-Recommender-System.git"
    },
    {
      title: "Helmet Detection System",
      desc: "Developed a construction site helmet detection system using YOLOv5 with transfer learning and dataset preprocessing. Evaluated model performance using mAP and deployed an inference pipeline for real-time worker safety monitoring.",
      icon: <ShieldCheck className="text-orange-400" />,
      tags: ["Computer Vision", "YOLOv5", "Transfer Learning", "mAP"],
      link: "https://github.com/blackmangoo/helmet-detection-yolov5.git"
    },
    {
      title: "Smart Exam Sitting Plan",
      desc: "Designed a sitting arrangement system using K-Means Clustering to optimize student placement and minimize chances of malpractice during exams.",
      icon: <GraduationCap className="text-purple-400" />,
      tags: ["Unsupervised Learning", "K-Means Clustering", "Optimization"],
      link: "https://github.com/blackmangoo/Smart-Exam-sitting-Plan.git"
    }
  ];

  const skills = [
    "Python", "JavaScript", "C++", "Vercel", "Supabase", "PostgreSQL", "Postman"
  ];

  const aiSkills = [
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "LLMs",
    "Hugging Face",
    "NLP",
    "Prompt Engineering",
    "Process Automation",
    "Computer Vision",
  ];

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden text-slate-50 bg-slate-950">

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
            <a href="#experience" className="px-8 py-4 glass-panel hover:bg-white/10 hover:scale-105 rounded-full font-semibold transition-all flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> Experience
            </a>
            <a href="https://linkedin.com/in/ammar-akbar2002" target="_blank" className="px-8 py-4 glass-panel hover:bg-white/10 hover:scale-105 rounded-full font-semibold transition-all flex items-center gap-2">
              <Linkedin className="w-5 h-5" /> LinkedIn Profile
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Summary + Education */}
      <section className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-5 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-400" /> Professional Summary
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              Aspiring AI Engineer and BS Artificial Intelligence student at FAST NU with a proven track record in architecting Python-based data pipelines and fine-tuning LLM-powered applications. Experienced in building end-to-end AI products, full-stack integration with React/Node.js, and workflow automation with n8n.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-5 flex items-center gap-3">
              <School className="w-8 h-8 text-emerald-400" /> Education
            </h2>
            <h3 className="text-xl font-semibold text-white">FAST - National University of Computer and Emerging Sciences</h3>
            <p className="text-emerald-400 mt-1">BS Artificial Intelligence</p>
            <p className="text-slate-400 mt-3 text-sm">Aug 2022 - Present</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Skills Marquee */}
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

      {/* 4. Core AI Skills */}
      <section className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="flex items-center gap-6 mb-12"
        >
          <h2 className="text-4xl font-bold flex items-center gap-4 text-white">
            <Code2 className="w-10 h-10 text-purple-400" /> AI & Data Strengths
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="glass-panel rounded-3xl p-8 md:p-10 border border-white/10 flex flex-wrap gap-3">
          {aiSkills.map((skill) => (
            <motion.span key={skill} variants={fadeUp} className="bg-slate-900/80 backdrop-blur-sm text-sm font-semibold px-4 py-2 rounded-full text-slate-300 border border-slate-700">
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* 5. Experience */}
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

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8">
          {experiences.map((item, index) => (
            <motion.div key={item.role} variants={fadeUp} className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group border border-emerald-500/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-500/20 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{item.role}</h3>
                    <h4 className="text-xl text-emerald-400 font-medium">{item.org}</h4>
                    <p className="text-slate-400 mt-1">{item.location}</p>
                  </div>
                  <span className="px-4 py-2 glass-panel rounded-full text-sm font-medium text-slate-300 w-fit">
                    {item.date}
                  </span>
                </div>

                <ul className="space-y-4 text-slate-300 text-lg leading-relaxed list-disc list-inside">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              {index === 0 ? <div className="absolute inset-0 pointer-events-none border border-emerald-400/20 rounded-3xl" /> : null}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. Projects Grid */}
      <section id="projects" className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="flex items-center gap-6 mb-16"
        >
          <h2 className="text-4xl font-bold flex items-center gap-4 text-white">
            <Github className="w-10 h-10 text-blue-400" /> Featured Projects
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

      {/* 7. Contact */}
      <section className="max-w-7xl mx-auto px-8 pb-10 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass-panel rounded-3xl p-8 md:p-10 border border-blue-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Open to AI Engineering opportunities</h2>
          <div className="flex flex-wrap gap-4 text-slate-300">
            <a href="mailto:ammar.akbar2000@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full hover:bg-white/10 transition">
              <Mail className="w-4 h-4 text-blue-400" /> ammar.akbar2000@gmail.com
            </a>
            <a href="tel:+923214797778" className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full hover:bg-white/10 transition">
              <Phone className="w-4 h-4 text-emerald-400" /> +92 321 4797778
            </a>
            <a href="https://github.com/blackmangoo" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full hover:bg-white/10 transition">
              <Github className="w-4 h-4 text-slate-200" /> github.com/blackmangoo
            </a>
          </div>
        </motion.div>
      </section>

      {/* 8. Footer */}
      <footer className="relative z-10 mt-12 py-16 border-t border-white/5 bg-slate-950/40 backdrop-blur-md text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Let&apos;s Build Something Great</h2>
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