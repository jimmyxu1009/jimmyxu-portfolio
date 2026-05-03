"use client";

import { useRef, useEffect, useState } from "react";

interface CharRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  hero?: boolean;
}

function prefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CharReveal({
  text,
  className = "",
  stagger = 30,
  delay = 0,
  as: Tag = "span",
  hero = false,
}: CharRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(prefersReduced());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (revealed) return;

    const el = ref.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [revealed]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setRevealed(true);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const words = text.split(" ");

  if (hero) {
    return (
      <Tag ref={ref as never} className={className} aria-label={text} data-motion>
        {words.map((word, wi) => (
          <span
            key={wi}
            className="hero-word inline-block"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed
                ? "translate(0px, 0px) rotate(0deg)"
                : "translate(0px, 30px) rotate(5deg)",
              transition: revealed
                ? `opacity 0.6s ease ${delay + wi * stagger}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + wi * stagger}ms`
                : "none",
            }}
          >
            {word}
            {wi < words.length - 1 && " "}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={className} aria-label={text} data-motion>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{
            position: "relative",
            display: "inline-block",
            overflow: "clip",
            verticalAlign: "top",
          }}
        >
          <span
            style={{
              position: "relative",
              display: "inline-block",
              transform: revealed ? "translate(0%, 0%)" : "translate(0%, 110%)",
              transition: revealed
                ? `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + wi * stagger}ms`
                : "none",
            }}
          >
            {[...word].map((char, ci) => (
              <span
                key={ci}
                className="char"
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
