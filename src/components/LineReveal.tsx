"use client";

import { useRef, useEffect, useState } from "react";

interface LineRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "p" | "span" | "div";
}

export default function LineReveal({
  text,
  className = "",
  stagger = 150,
  delay = 0,
  as: Tag = "p",
}: LineRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lines = text.split("\n");

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask" style={{ display: "block" }}>
          <span
            className="line-inner"
            style={{
              display: "block",
              transform: revealed ? "translateY(0)" : "translateY(100%)",
              opacity: revealed ? 1 : 0,
              transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms, opacity 0.6s ease ${delay + i * stagger}ms`,
            }}
          >
            {line || " "}
          </span>
        </span>
      ))}
    </Tag>
  );
}
