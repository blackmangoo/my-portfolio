"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { staggerItem } from "./MotionWrapper";

interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  github: string;
  index?: number;
}

export function ProjectCard({
  title,
  description,
  stack,
  highlights,
  github,
}: ProjectCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="group relative flex flex-col h-full rounded-2xl glass-panel overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-colors duration-500" />
      
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-700 group-hover:via-blue-500 to-transparent transition-colors duration-500" />

      <div className="relative p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {title}
          </h3>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md p-1"
            aria-label={`View ${title} source on GitHub`}
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        <p className="text-sm text-slate-400 mb-6 leading-relaxed flex-1">
          {description}
        </p>

        <div className="mb-6">
          <ul className="space-y-2">
            {highlights.slice(0, 4).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-blue-500 mt-1 flex-shrink-0">▹</span>
                <span className="leading-tight">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-700/50 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-medium px-2 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
