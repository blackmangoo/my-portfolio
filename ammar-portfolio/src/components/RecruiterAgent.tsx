"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  tags?: string[];
  actionLink?: { label: string; href: string };
}

let messageCounter = 10;
function nextMessageId(): string {
  return `msg_${++messageCounter}`;
}

// Grounded local answers when API is unreachable or during offline usage
const KNOWLEDGE_BASE: { keywords: string[]; answer: string; tags: string[]; link?: { label: string; href: string } }[] = [
  {
    keywords: ["git", "github", "version control", "docker", "tools", "ci/cd"],
    answer:
      "Yes, absolutely! Ammar uses Git and GitHub extensively across all his production systems and open-source repositories. His workflow includes branching strategies, GitHub Actions CI/CD pipelines, Docker containerization, and automated deployment.",
    tags: ["Git", "GitHub Actions", "Docker", "DevOps"],
    link: { label: "Visit Ammar's GitHub", href: "https://github.com/blackmangoo" },
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "who are you"],
    answer:
      "Hey there! 👋 Welcome! I'm Ammar's AI assistant representing Mian Muhammad Ammar (Ammar Akbar). Ammar is a BS Artificial Intelligence graduate from FAST-NUCES actively seeking full-time AI/ML Engineering and Full-Stack AI Developer roles. How can I help you explore his work today?",
    tags: ["Ammar's Assistant", "FAST-NUCES", "AI/ML"],
    link: { label: "Explore Projects", href: "#projects" },
  },
  {
    keywords: ["what can ammar do", "do for me", "why hire", "value", "capabilities", "skills", "experience"],
    answer:
      "Ammar bridges machine learning research and low-latency production engineering. Here is what he brings to your team:\n\n1. 👁️ Computer Vision: Custom YOLOv11 architectures (99.1% Top-1 accuracy on 26k images, ~92ms latency).\n2. ⚡ Real-Time Sensor Fusion: 1D Kalman filters denoising 20Hz CAN-bus telemetry in <1ms.\n3. 🧠 LLM Agents & RAG: Autonomous browser automation (Playwright + LLaMA-3), LoRA fine-tuning, and pgvector semantic retrieval.\n4. 🚀 High-Throughput Backends: Asynchronous FastAPI microservices with sub-15ms p95 latency.",
    tags: ["Computer Vision", "Sensor Fusion", "LLM Agents", "FastAPI"],
    link: { label: "Contact for Interview", href: "#contact" },
  },
  {
    keywords: ["yolo", "yolov11", "omnidrive", "accuracy", "dataset", "vision"],
    answer:
      "In OmniDrive AI, Ammar trained and deployed a custom YOLOv11-Large model on 26,820 annotated automotive images across 50 mechanical failure and component classes. It achieved 99.1% Top-1 accuracy with ~92ms inference latency, integrated directly with a FastAPI inference server.",
    tags: ["Computer Vision", "YOLOv11", "FastAPI"],
    link: { label: "View OmniDrive Project", href: "#projects" },
  },
  {
    keywords: ["kalman", "sensor", "filter", "obd", "fusion", "telemetry"],
    answer:
      "Ammar implemented a 1D Kalman filter sensor fusion algorithm to denoise volatile speed and acceleration telemetry streaming at 20Hz from an OBD-II CAN-bus reader. By maintaining process variance (Q) and measurement covariance (R), it provides a minimum-variance optimal state estimate for early vehicle anomaly detection.",
    tags: ["Sensor Fusion", "Kalman Filter", "Mathematics"],
    link: { label: "Test Live Kalman Denoising", href: "#projects" },
  },
  {
    keywords: ["education", "fast", "nuces", "degree", "university", "graduate"],
    answer:
      "Ammar holds a BS in Artificial Intelligence from FAST - National University of Computer and Emerging Sciences (FAST-NUCES) in Lahore, Pakistan (2022–2026). He also served as a Teaching Assistant for Programming Fundamentals, mentoring junior students in C++ and algorithmic logic.",
    tags: ["FAST-NUCES", "BS Artificial Intelligence", "Teaching Assistant"],
  },
  {
    keywords: ["agent", "job", "playwright", "groq", "llama", "automation"],
    answer:
      "Ammar built an autonomous AI Job Application Agent that pairs Playwright browser orchestration with Groq-hosted LLaMA-3 reasoning. It parses complex multi-page job listings, extracts eligibility requirements with zero hallucinations via Pydantic validators, auto-completes application forms, and provides a human-in-the-loop confirmation checkpoint.",
    tags: ["Autonomous Agents", "Groq / LLaMA-3", "Playwright"],
    link: { label: "View Agent Repository", href: "https://github.com/blackmangoo/AI-agent-job-automation" },
  },
  {
    keywords: ["lora", "serene", "fine-tuning", "mental health", "sentiment"],
    answer:
      "Serene is an AI mental wellness assistant where Ammar fine-tuned causal language models using LoRA (Low-Rank Adaptation) and PEFT on empathetic conversational data. It integrates a local DistilRoBERTa emotion classifier providing real-time sentiment telemetry and psychiatric safety guardrails.",
    tags: ["LoRA Fine-Tuning", "PyTorch", "Hugging Face"],
  },
  {
    keywords: ["contact", "hire", "email", "phone", "availability", "role"],
    answer:
      "Ammar is actively seeking full-time AI/ML Engineering and Full-Stack AI Developer roles. You can reach him directly at ammar.akbar2002@gmail.com or connect via LinkedIn.",
    tags: ["Available for Hire", "Full-Time"],
    link: { label: "Jump to Contact", href: "#contact" },
  },
];

// Patterns that are genuinely asking for free coding / homework / script generation
const UNRELATED_CODE_PATTERNS = [
  /write\s+(me\s+)?(a\s+)?(python|js|javascript|code|script|program|bot|app|game)/i,
  /code\s+(me\s+)?(a\s+)?(game|calculator|bot|app|script)/i,
  /build\s+(me\s+)?(a\s+)?(snake|game|calculator|bot|app|website)/i,
  /solve\s+(this\s+)?(leetcode|homework|assignment|exam)/i,
  /do\s+my\s+(homework|assignment|exam|project)/i,
];

const SUGGESTIONS = [
  "Does Ammar know Git and Docker?",
  "What can Ammar do for my team?",
  "Explain the OmniDrive YOLOv11 & Kalman setup",
  "What is Ammar's FAST-NUCES background?",
  "Tell me about the AI Job Application Agent",
];

export function RecruiterAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I am Ammar's AI Assistant, powered by Google Gemini and grounded in his verified projects, FAST-NUCES degree, and technical toolkit. Ask me anything about his skills, experience, or hiring details!",
      timestamp: "Just now",
      tags: ["Gemini AI", "FAST-NUCES", "AI Engineer"],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: nextMessageId(),
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();
      if (data.reply) {
        const botResponse: Message = {
          id: nextMessageId(),
          sender: "bot",
          text: data.reply,
          timestamp: "Just now",
          tags: ["Gemini 3.6 Flash", "AI Assistant"],
        };
        setMessages((prev) => [...prev, botResponse]);
        return;
      }
      throw new Error("No reply received");
    } catch (err) {
      console.warn("Using local grounded knowledge base:", err);

      // ONLY throw the playful refusal joke if the user explicitly asked to write unrelated code/homework
      const isAskingForUnrelatedCode = UNRELATED_CODE_PATTERNS.some((pattern) => pattern.test(query));

      if (isAskingForUnrelatedCode) {
        const jokeResponse: Message = {
          id: nextMessageId(),
          sender: "bot",
          text: "Whoa there! 🛑 I'm Ammar's personal assistant, not a free junior developer on demand! If you want custom code or apps written, you'll have to hire Ammar first 😉. But ask me anything about his real projects, architecture, or how to schedule an interview!",
          timestamp: "Just now",
          tags: ["Assistant Guardian", "Hire Ammar"],
          actionLink: { label: "Contact Ammar for Hire", href: "#contact" },
        };
        setMessages((prev) => [...prev, jokeResponse]);
        return;
      }

      // Normal queries & greetings: match knowledge base or give helpful response
      const qLower = query.toLowerCase();
      const bestMatch = KNOWLEDGE_BASE.find((entry) =>
        entry.keywords.some((kw) => qLower.includes(kw))
      );

      const botResponse: Message = bestMatch
        ? {
            id: nextMessageId(),
            sender: "bot",
            text: bestMatch.answer,
            timestamp: "Just now",
            tags: bestMatch.tags,
            actionLink: bestMatch.link,
          }
        : {
            id: nextMessageId(),
            sender: "bot",
            text: `Ammar is an AI/ML Engineer from FAST-NUCES specializing in Computer Vision (YOLOv11), sensor fusion (Kalman filters), autonomous agent pipelines, and high-performance FastAPI backends.\n\nHe is proficient with Git, GitHub Actions, Docker, PyTorch, Supabase, Flutter, and Next.js. What specific aspect of his work would you like to know more about?`,
            timestamp: "Just now",
            tags: ["AI Assistant", "FAST-NUCES"],
            actionLink: { label: "Contact Ammar for Hire", href: "#contact" },
          };

      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="fixed bottom-5 right-5 z-40" aria-label="AI Twin Assistant">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-[92vw] sm:w-[440px] h-[540px] bg-[var(--color-panel)] border border-[var(--color-border)] rounded-md shadow-2xl flex flex-col overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[var(--color-foreground)] text-[var(--color-background)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    <span>Ammar&apos;s AI Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-white/70 font-mono">Powered by Gemini 3.6 Flash</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/70 hover:text-white rounded transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-[var(--color-background)] border-b border-[var(--color-border)] flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
              {SUGGESTIONS.map((sugg, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sugg)}
                  disabled={isLoading}
                  className="px-2.5 py-1 bg-[var(--color-panel)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-foreground)] rounded-full whitespace-nowrap transition-colors disabled:opacity-50"
                >
                  {sugg}
                </button>
              ))}
            </div>

            {/* Chat Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-md leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-[var(--color-foreground)] text-[var(--color-background)] rounded-br-none"
                        : "bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.actionLink && (
                      <a
                        href={msg.actionLink.href}
                        onClick={() => {
                          if (msg.actionLink?.href.startsWith("#")) setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-semibold text-[var(--color-accent)] hover:underline"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {msg.tags && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {msg.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 bg-[var(--color-border)]/50 rounded-sm text-[var(--color-muted)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-md w-fit text-[var(--color-muted)]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--color-accent)]" />
                  <span className="text-[11px] font-mono">Thinking as Ammar&apos;s Assistant...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[var(--color-background)] border-t border-[var(--color-border)] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Git, YOLOv11, Kalman math, hiring..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-xs bg-[var(--color-panel)] border border-[var(--color-border)] rounded-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] min-h-[40px] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-[var(--color-foreground)] text-[var(--color-background)] hover:bg-[var(--color-accent)] disabled:opacity-40 transition-colors rounded-sm min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Send query"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-[var(--color-foreground)] text-[var(--color-background)] hover:bg-[var(--color-accent)] shadow-xl rounded-full transition-all border border-white/10 font-medium text-xs min-h-[44px]"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span className="font-mono">Ask AI Assistant</span>
      </button>
    </aside>
  );
}
