import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ammar.works"),
  title: "Ammar Akbar | AI/ML Engineer | LLM Orchestration & RAG",
  description:
    "AI/ML Engineer and BS Artificial Intelligence graduate from FAST-NUCES specializing in LLM orchestration, RAG, and applied NLP. Building context-aware AI systems with deterministic safety controls.",
  alternates: {
    canonical: "https://ammar.works",
  },
  authors: [{ name: "Ammar Akbar", url: "https://ammar.works" }],
  creator: "Ammar Akbar",
  openGraph: {
    title: "Ammar Akbar | AI/ML Engineer",
    description:
      "AI/ML Engineer and BS Artificial Intelligence graduate from FAST-NUCES specializing in LLM orchestration, RAG, and applied NLP.",
    url: "https://ammar.works",
    siteName: "Ammar Akbar Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ammar Akbar | AI/ML Engineer",
    description:
      "AI/ML Engineer and BS Artificial Intelligence graduate from FAST-NUCES specializing in LLM orchestration, RAG, and applied NLP.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ammar Akbar",
  jobTitle: "AI/ML Engineer",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "FAST - National University of Computer and Emerging Sciences",
  },
  url: "https://ammar.works",
  sameAs: [
    "https://github.com/blackmangoo",
    "https://linkedin.com/in/ammar-akbar2002",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Large Language Models (LLMs)",
    "Retrieval-Augmented Generation (RAG)",
    "Natural Language Processing (NLP)",
    "LoRA / QLoRA Fine-Tuning",
    "pgvector (HNSW)",
    "FastAPI",
    "Computer Vision",
    "YOLO11",
    "Sensor Fusion",
    "Kalman Filter",
    "Three.js / WebGL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors`}
      >
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--color-foreground)] focus:text-[var(--color-background)] focus:rounded-sm focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] font-medium text-xs"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
