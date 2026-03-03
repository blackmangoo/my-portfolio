export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Ammar Akbar
      </h1>
      <p className="mt-4 text-xl text-slate-400 max-w-2xl text-center">
        BS Artificial Intelligence @ FAST NU. Specialist in building
        <span className="text-blue-400"> Agentic RAG Systems</span>,
        <span className="text-purple-400"> Computer Vision Pipelines</span>, and
        <span className="text-emerald-400"> Real-time AI Automations</span>.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold transition">
          View Projects
        </button>
        <button className="border border-slate-700 hover:bg-slate-800 px-6 py-3 rounded-full font-semibold transition">
          Contact Me
        </button>
      </div>
    </main>
  );
}