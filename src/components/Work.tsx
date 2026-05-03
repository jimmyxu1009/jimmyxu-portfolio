"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, filterTags } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionReveal from "@/components/SectionReveal";

export default function Work() {
  const [activeFilter, setActiveFilter] = useState(filterTags[0]);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const filtered = projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section id="work" className="relative py-32 lg:py-40 overflow-hidden section-divider">
      {/* Section label */}
      <div className="absolute left-6 lg:left-12 top-28 flex items-center gap-3">
        <span className="text-accent font-mono text-xs tracking-[0.2em]">02</span>
        <span className="w-6 h-px bg-accent/40" />
        <span className="text-text-muted text-xs tracking-[0.15em] uppercase">作品</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <SectionReveal>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] text-text-primary mb-4">
            我的作品
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-text-secondary text-base max-w-xl mb-12 leading-relaxed">
            这里展示了一部分我的作品，欢迎查看！我还有更多有趣的内容正在创作中。
          </p>
        </SectionReveal>

        {/* Filter tags */}
        <SectionReveal delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-10">
            {filterTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  activeFilter === tag
                    ? "bg-accent text-white shadow-[0_0_20px_rgba(129,140,248,0.2)]"
                    : "bg-white/5 text-text-tertiary hover:bg-white/10 hover:text-text-primary border border-white/[0.06]"
                )}
                whileTap={{ scale: 0.97 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </SectionReveal>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project, index) => {
                const hasLink = !!project.link;
                return (
                  <motion.div
                    key={project.id + activeFilter}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <div
                      className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(129,140,248,0.08)]"
                      onMouseEnter={() => setSelectedProject(project.id)}
                      onMouseLeave={() => setSelectedProject(null)}
                    >
                      {hasLink ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <CardContent
                            project={project}
                            isHovered={selectedProject === project.id}
                          />
                        </a>
                      ) : (
                        <div
                          className="cursor-pointer"
                          onClick={() => setLightbox(project.image)}
                        >
                          <CardContent
                            project={project}
                            isHovered={selectedProject === project.id}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <p className="text-text-muted text-sm">该分类暂无作品</p>
              </motion.div>
            )}
          </AnimatePresence>
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

function CardContent({
  project,
  isHovered,
}: {
  project: {
    image: string;
    title: string;
    tags: string[];
    hideTitle?: boolean;
    techs?: string[];
    description?: string;
  };
  isHovered: boolean;
}) {
  return (
    <>
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-105" : "scale-100"
          )}
        />

        {/* Gradient overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-deep-900/80 via-transparent to-transparent transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Tags overlay */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-300",
                isHovered
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "bg-black/30 text-text-secondary border border-white/10"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Corner arrow on hover */}
        <motion.div
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center"
          animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent">
            <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        {!project.hideTitle && (
          <h3
            className={cn(
              "text-lg font-display text-text-primary transition-colors duration-300",
              isHovered && "text-accent"
            )}
          >
            {project.title}
          </h3>
        )}

        {project.description && (
          <p
            className={cn(
              "text-sm text-text-tertiary mt-1 transition-all duration-300 line-clamp-2",
              isHovered ? "opacity-100" : "opacity-70"
            )}
          >
            {project.description}
          </p>
        )}

        {project.techs && project.techs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-2 py-0.5 rounded-md text-xs transition-all duration-300",
                  isHovered
                    ? "bg-accent/10 text-accent"
                    : "bg-white/5 text-text-tertiary"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
