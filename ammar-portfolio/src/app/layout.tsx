import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ammar Akbar | AI & ML Engineer",
  description: "Portfolio of Ammar Akbar, AI Engineer focused on LLMs, Computer Vision, and production-grade ML systems.",
  keywords: [
    "Ammar Akbar",
    "AI Engineer",
    "Machine Learning",
    "LLM",
    "Computer Vision",
    "YOLOv5",
    "RAG",
    "Next.js",
  ],
  openGraph: {
    title: "Ammar Akbar | AI & ML Engineer",
    description: "AI Engineer portfolio featuring LLM, RAG, and Computer Vision projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ammar Akbar | AI & ML Engineer",
    description: "AI Engineer portfolio featuring LLM, RAG, and Computer Vision projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30 selection:text-blue-200 relative bg-slate-950 text-slate-50`}
      >
        <div className="fixed inset-0 z-[-1] bg-[#020617]">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
