"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = siteConfig.navItems
      .map((item) => document.querySelector(item.href) as HTMLElement | null)
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className="text-base font-medium text-[#1A1A1A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2C5545] rounded-sm"
          aria-label="Go to home"
        >
          Ammar Akbar
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {siteConfig.navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2C5545] rounded-sm ${
                  isActive ? "text-[#1A1A1A]" : "text-[#6B7280] hover:text-[#1A1A1A]"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 -bottom-[6px] h-[1.5px] bg-[#2C5545]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          
          <a
            href={siteConfig.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 text-sm font-medium text-white bg-[#1A1A1A] hover:bg-[#2C5545] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2C5545]"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-[#1A1A1A] hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2C5545] rounded-sm"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-[60px] bg-black/10 backdrop-blur-sm z-40"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden relative z-50 bg-[#FAF9F6] border-b border-[#E5E7EB] overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {siteConfig.navItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`px-4 py-3 text-left text-sm font-medium rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2C5545] ${
                        isActive
                          ? "text-[#1A1A1A] bg-[#2C5545]/5"
                          : "text-[#6B7280] hover:text-[#1A1A1A] hover:bg-black/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <a
                  href={siteConfig.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 mx-4 px-4 py-3 text-center text-sm font-medium text-white bg-[#1A1A1A] hover:bg-[#2C5545] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2C5545]"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
