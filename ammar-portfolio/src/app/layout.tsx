import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

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
  title: `${siteConfig.name} | AI/ML Engineer & Full-Stack AI Developer`,
  description: siteConfig.hero.subheadline,
  keywords: [
    siteConfig.name,
    "Ammar Akbar",
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision",
    "YOLOv11",
    "Kalman Filter",
    "FAST-NUCES",
    "FastAPI",
    "LLM Agents",
    "RAG",
    "Next.js",
  ],
  authors: [{ name: siteConfig.name, url: "https://ammar.works" }],
  creator: siteConfig.name,
  openGraph: {
    title: `${siteConfig.name} | AI/ML Engineer`,
    description: siteConfig.hero.subheadline,
    url: "https://ammar.works",
    siteName: `${siteConfig.shortName} Portfolio`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | AI/ML Engineer`,
    description: siteConfig.hero.subheadline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  jobTitle: siteConfig.role,
  alumniOf: {
    "@type": "EducationalOrganization",
    name: siteConfig.education.institution,
  },
  url: "https://ammar.works",
  sameAs: [siteConfig.github, siteConfig.linkedin],
  knowsAbout: [
    "Artificial Intelligence",
    "Computer Vision",
    "YOLOv11",
    "Sensor Fusion",
    "Kalman Filter",
    "Machine Learning",
    "FastAPI",
    "LLM Agents",
    "Three.js",
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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
