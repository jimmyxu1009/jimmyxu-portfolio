"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/data";
import type { FAQ as FAQType } from "@/types";
import { cn } from "@/lib/utils";
import SectionReveal from "@/components/SectionReveal";

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: FAQType;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <SectionReveal delay={index * 0.08}>
      <div
        className={cn(
          "group rounded-xl border transition-all duration-300",
          isOpen
            ? "border-accent/30 bg-accent/[0.02]"
            : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
        )}
      >
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300",
                isOpen
                  ? "bg-accent text-white"
                  : "bg-white/10 text-text-tertiary"
              )}
            >
              {faq.id.padStart(2, "0")}
            </span>
            <span className="text-base md:text-lg font-medium text-text-primary pr-4">
              {faq.question}
            </span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-white/10 group-hover:border-white/20 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-text-tertiary"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 pl-16">
                <motion.p
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-text-secondary leading-relaxed text-sm"
                >
                  {faq.answer}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="relative py-32 lg:py-40 overflow-hidden section-divider">
      {/* Section label */}
      <div className="absolute left-6 lg:left-12 top-28 flex items-center gap-3">
        <span className="text-accent font-mono text-xs tracking-[0.2em]">03</span>
        <span className="w-6 h-px bg-accent/40" />
        <span className="text-text-muted text-xs tracking-[0.15em] uppercase">问题</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <SectionReveal>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] text-text-primary mb-4 text-center">
              常见问题
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto text-sm leading-relaxed">
              关于工作方式与服务范围的常见问题。
            </p>
          </SectionReveal>

          {/* FAQ list */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
