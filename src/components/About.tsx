"use client";

import { motion } from "framer-motion";
import { siteName, galleryCategories, toolStack } from "@/lib/data";
import SectionReveal from "@/components/SectionReveal";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function About() {
  const [activeCategory, setActiveCategory] = useState(galleryCategories[0]?.id ?? "");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const currentCategory = galleryCategories.find((c) => c.id === activeCategory);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <section id="about" className="relative py-32 lg:py-40 overflow-hidden section-divider">
      {/* Section label */}
      <div className="absolute left-6 lg:left-12 top-28 flex items-center gap-3">
        <span className="text-accent font-mono text-xs tracking-[0.2em]">01</span>
        <span className="w-6 h-px bg-accent/40" />
        <span className="text-text-muted text-xs tracking-[0.15em] uppercase">关于我</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <SectionReveal>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] text-text-primary mb-8">
              关于我
            </h2>
          </SectionReveal>

          {/* Bio glass card */}
          <SectionReveal delay={0.1}>
            <div className="glass-premium rounded-2xl p-8 md:p-10 mb-8 relative">
              <span className="deco-corner deco-corner-tl rounded-tl-2xl" />
              <span className="deco-corner deco-corner-tr rounded-tr-2xl" />
              <span className="deco-corner deco-corner-bl rounded-bl-2xl" />
              <span className="deco-corner deco-corner-br rounded-br-2xl" />
              <p className="text-xl lg:text-2xl font-medium text-text-primary mb-6 leading-relaxed">
                你好，我是{siteName} — 一名热爱创造、始终保持好奇心的{" "}
                <span className="text-accent">AI 学习者</span>。
              </p>

              <div className="space-y-4 text-base leading-relaxed text-text-secondary">
                <p>
                  我正在学习 AI 训练师相关内容，关注人工智能工具的使用、
                  AI 协作流程、提示词优化、内容生成和智能应用实践。
                </p>
                <p>
                  目前我常用 Claude Code、Trae、Nano Banana、Cherry Studio 等
                  工具进行学习与创作，尝试用 AI 提升效率、拓展想法，并将创意
                  转化为真实可见的成果。
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* AI Tool Stack */}
          <SectionReveal delay={0.2}>
            <div className="glass-premium rounded-2xl p-8 md:p-10 mb-8 relative">
              <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-text-tertiary mb-5">
                AI 工具栈
              </h3>
              <div className="flex flex-wrap gap-3">
                {toolStack.map((tool) => (
                  <SkillTag key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Gallery */}
          <SectionReveal delay={0.3}>
            <div className="glass-premium rounded-2xl p-8 md:p-10 relative">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {galleryCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300",
                      activeCategory === cat.id
                        ? "bg-accent text-white"
                        : "bg-white/5 text-text-tertiary hover:bg-white/10 hover:text-text-primary"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {currentCategory && currentCategory.items.length > 0 ? (
                  currentCategory.items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      onClick={() => setLightbox(item.src)}
                      className="aspect-square rounded-xl overflow-hidden bg-white/5 cursor-pointer group"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-text-muted text-sm">
                    暂无内容，待更新...
                  </div>
                )}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}

function SkillTag({ tool }: { tool: { name: string; category: string; description: string } }) {
  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 rounded-xl bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
      <div className="relative px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] group-hover:border-accent/30 transition-all duration-300">
        <span className="text-sm text-text-secondary group-hover:text-accent transition-colors duration-300">
          {tool.name}
        </span>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-deep-700 border border-white/10 text-xs text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {tool.description}
        </div>
      </div>
    </motion.div>
  );
}
