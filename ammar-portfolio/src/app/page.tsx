import { ExternalLink, Github, Cpu, ShieldCheck, MapPin, Activity } from "lucide-react";

export default function Home() {
  const projects = [
    {
      title: "Hybrid Travel Recommender",
      desc: "LLM-based RAG system using FAISS & Annoy for semantic retrieval.",
      icon: <MapPin className="text-blue-400" />,
      tags: ["RAG", "LLM", "FAISS"],
      link: "#"
    },
    {
      title: "Breast Cancer Detection",
      desc: "ML pipeline optimized for Recall using SMOTE & benchmarking.",
      icon: <Activity className="text-emerald-400" />,
      tags: ["Scikit-Learn", "SMOTE", "MLOps"],
      link: "#"
    },
    {
      title: "Helmet Detection System",
      desc: "Real-time safety monitoring using YOLOv5 and Transfer Learning.",
      icon: <ShieldCheck className="text-orange-400" />,
      tags: ["Computer Vision", "YOLOv5", "Python"],
      link: "#"
    },
    {
      title: "Smart Exam Sitting Plan",
      desc: "K-Means Clustering to optimize student placement & minimize malpractice.",
      icon: <Cpu className="text-purple-400" />,
      tags: ["Unsupervised Learning", "Algorithms"],
      link: "#"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 md:p-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Ammar Akbar
        </h1>
        <p className="mt-4 text-xl text-slate-400 max-w-2xl">
          BS Artificial Intelligence @ FAST NU. Specialist in building
          <span className="text-blue-400"> Agentic RAG Systems</span> and
          <span className="text-purple-400"> Computer Vision Pipelines</span>.
        </p>
      </section>

      {/* Projects Bento Grid */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Github className="w-8 h-8" /> Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition group cursor-pointer">
              <div className="mb-4">{project.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">{project.title}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-300 border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}