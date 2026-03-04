import { Github, Cpu, ShieldCheck, MapPin, Activity, Mail, Linkedin, Globe } from "lucide-react";

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

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">

      {/* 1. Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center pt-20">
        <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-blue-400 rounded-full bg-blue-500/10 border border-blue-500/20">
          Available for AI/ML Roles
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
          Ammar Akbar
        </h1>
        <p className="mt-6 text-xl text-slate-400 max-w-2xl leading-relaxed">
          BS Artificial Intelligence student at <span className="text-white font-medium">FAST NU</span>.
          Architecting <span className="text-blue-400">Large Language Models</span> and
          <span className="text-emerald-400"> Computer Vision</span> pipelines for production.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20">
            View My Work
          </a>
          <a href="https://linkedin.com/in/ammar-akbar" target="_blank" className="px-8 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-full font-semibold transition-all">
            LinkedIn
          </a>
        </div>
      </section>

      {/* 2. Skills Marquee */}
      <section className="py-12 overflow-hidden bg-slate-900/30 border-y border-slate-900">
        <div className="animate-scroll flex gap-12 items-center whitespace-nowrap">
          {[...skills, ...skills].map((skill, i) => (
            <span key={i} className="text-2xl font-bold text-slate-600 hover:text-blue-400/60 transition cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Projects Grid */}
      <section id="projects" className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-slate-800"></div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Github className="w-8 h-8 text-slate-400" /> Featured Work
          </h2>
          <div className="h-px flex-1 bg-slate-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/40 hover:bg-slate-900 transition-all group">
              <div className="mb-6 p-3 bg-slate-950 rounded-2xl w-fit border border-slate-800 shadow-inner">
                {project.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-slate-950 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full text-slate-400 border border-slate-800">
                    {tag}
                  </span>
                ))}
              </div>
              <a href={project.link} target="_blank" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition">
                View Repository <Globe className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Simple Footer/Contact */}
      <footer className="max-w-7xl mx-auto px-8 py-20 border-t border-slate-900 text-center">
        <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
        <p className="text-slate-400 mb-8">Currently looking for AI Engineering opportunities.</p>
        <div className="flex justify-center gap-6">
          <a href="mailto:ammar.akbar2000@gmail.com" className="text-slate-400 hover:text-white transition"><Mail className="w-6 h-6" /></a>
          <a href="https://github.com/blackmangoo" className="text-slate-400 hover:text-white transition"><Github className="w-6 h-6" /></a>
          <a href="https://linkedin.com/in/ammar-akbar" className="text-slate-400 hover:text-white transition"><Linkedin className="w-6 h-6" /></a>
        </div>
        <p className="mt-12 text-sm text-slate-600">© 2026 Ammar Akbar | Built with Next.js & Tailwind</p>
      </footer>
    </main>
  );
}