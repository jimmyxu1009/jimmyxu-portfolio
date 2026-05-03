"use client";

import CharReveal from "@/components/CharReveal";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Pre-heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent/20 text-xs tracking-[0.15em] text-accent font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              AI 学习者 · 创意开发者
            </span>
          </motion.div>

          {/* Main heading */}
          <h1
            className="font-display text-[clamp(2.8rem,10vw,7rem)] leading-[1.1] text-text-primary max-w-5xl"
            aria-label="以好奇心驱动学习 以创造力探索 AI 的更多可能"
          >
            <span className="block">
              <CharReveal
                text="以好奇心"
                as="span"
                stagger={100}
                delay={600}
                className="inline-block"
                hero
              />
              {" "}
              <CharReveal
                text="驱动学习"
                as="span"
                stagger={100}
                delay={900}
                className="inline-block"
                hero
              />
            </span>
            <span className="block mt-1">
              <CharReveal
                text="以创造力"
                as="span"
                stagger={100}
                delay={1200}
                className="inline-block"
                hero
              />
              {" "}
              <CharReveal
                text="探索"
                as="span"
                stagger={100}
                delay={1500}
                className="inline-block"
                hero
              />
              {" "}
              <span className="inline-block relative">
                <CharReveal
                  text="AI"
                  as="span"
                  stagger={100}
                  delay={1700}
                  className="inline-block"
                  hero
                />
                {/* Glow behind AI */}
                <span className="absolute -inset-4 bg-accent/10 blur-2xl rounded-full opacity-60" />
              </span>
              {" "}
              <CharReveal
                text="的更多可能"
                as="span"
                stagger={100}
                delay={1900}
                className="inline-block"
                hero
              />
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mt-8 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
          >
            专注于 AI 工具实践、前端开发与创意交互设计，
            <br className="hidden sm:block" />
            用技术将想法转化为真实可见的成果。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-full text-sm font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(129,140,248,0.3)] btn-ripple"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--rx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                e.currentTarget.style.setProperty('--ry', `${((e.clientY - rect.top) / rect.height) * 100}%`);
              }}
            >
              <span className="relative z-10">查看我的作品</span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20 rounded-full text-sm font-medium transition-all duration-300"
            >
              联系我
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <span className="text-text-muted text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
