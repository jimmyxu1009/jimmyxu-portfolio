"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { navLinks, siteName } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const sectionIds = navLinks
      .map((l) => l.href.replace("#", ""))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrolled(currentY > 50);
          setHidden(currentY > 100 && currentY > lastScrollYRef.current);
          lastScrollYRef.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-deep-900/80 backdrop-blur-xl border-b border-white/[0.03]"
            : "bg-transparent"
        )}
      >
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="relative flex items-center gap-3 group">
                <span className="font-display text-xl md:text-2xl tracking-wide text-text-primary">
                  {siteName}
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = sectionId
                    ? activeSection === sectionId
                    : false;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "nav-link text-sm font-medium transition-colors",
                        isActive
                          ? "text-accent active"
                          : "text-text-tertiary hover:text-text-primary"
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              <button
                className="md:hidden w-11 h-11 flex items-center justify-center"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <motion.span
                    animate={
                      sidebarOpen
                        ? { rotate: 45, y: 7, width: "100%" }
                        : { rotate: 0, y: 0, width: "100%" }
                    }
                    className="block h-[1.5px] bg-text-primary origin-center"
                  />
                  <motion.span
                    animate={sidebarOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block h-[1.5px] bg-text-primary"
                  />
                  <motion.span
                    animate={
                      sidebarOpen
                        ? { rotate: -45, y: -7, width: "100%" }
                        : { rotate: 0, y: 0, width: "100%" }
                    }
                    className="block h-[1.5px] bg-text-primary origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-deep-900/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className="text-3xl font-display text-text-primary hover:text-accent transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
