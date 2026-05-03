"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const glow = ref.current;
    if (!glow) return;

    // Disable on touch devices
    if ("ontouchstart" in window) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const handler = (e: MouseEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        glow.style.setProperty("--mx", `${x}%`);
        glow.style.setProperty("--my", `${y}%`);
        glow.style.opacity = "0.12";
        rafRef.current = null;
      });
    };

    const leave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", handler, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", handler);
      document.removeEventListener("mouseleave", leave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[9998] transition-opacity duration-500"
      style={{
        opacity: 0,
        background:
          "radial-gradient(600px at var(--mx, 50%) var(--my, 50%), var(--color-accent), transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
