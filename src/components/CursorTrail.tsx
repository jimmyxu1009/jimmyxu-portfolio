"use client";

import { useEffect, useRef } from "react";

const HOVERED = "a, button, [role=button], input, select, textarea, label";
const SIZE = 32;

export default function CursorTrail() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const rafId = useRef(0);
  const hoverRef = useRef(false);
  const scaleRef = useRef(1);
  const readyRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide default cursor globally
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important }";
    document.head.appendChild(style);
    document.body.style.cursor = "none";

    // ── Canvas setup ──
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw fallback (always visible)
    ctx.clearRect(0, 0, SIZE, SIZE);
    ctx.save();
    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 0.5, 0, Math.PI * 2);
    ctx.clip();
    const grad = ctx.createRadialGradient(
      SIZE * 0.3, SIZE * 0.3, 0,
      SIZE / 2, SIZE / 2, SIZE / 2
    );
    grad.addColorStop(0, "#818cf8");
    grad.addColorStop(0.6, "#6366f1");
    grad.addColorStop(1, "#3730a3");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.restore();

    // ── Load Earth texture ──
    const c = ctx;
    function drawEarthOnCanvas() {
      c.clearRect(0, 0, SIZE, SIZE);
      c.save();
      c.beginPath();
      c.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, Math.PI * 2);
      c.clip();
      c.drawImage(img, 0, 0, SIZE, SIZE);
      const shade = c.createRadialGradient(
        SIZE * 0.35, SIZE * 0.35, 0,
        SIZE / 2, SIZE / 2, SIZE / 2
      );
      shade.addColorStop(0, "rgba(0,0,0,0)");
      shade.addColorStop(0.55, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(0,0,0,0.45)");
      c.fillStyle = shade;
      c.fillRect(0, 0, SIZE, SIZE);
      c.restore();
    }

    const img = new Image();
    img.onload = drawEarthOnCanvas;
    img.src = "/textures/solar-system/earth_daymap.jpg";
    // Handle cached image
    if (img.complete && img.naturalWidth > 0) drawEarthOnCanvas();

    readyRef.current = true;

    // ── Mouse tracking ──
    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
    }

    function onHover(e: MouseEvent) {
      const hit = (e.target as HTMLElement).closest(HOVERED);
      hoverRef.current = !!hit;
    }

    function tick() {
      const el = cursorRef.current;
      if (!el) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const target = hoverRef.current ? 1.3 : 1;
      scaleRef.current += (target - scaleRef.current) * 0.12;

      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${scaleRef.current})`;

      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onHover, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover);
      cancelAnimationFrame(rafId.current);
      style.remove();
      document.body.style.cursor = "";
      img.onload = null;
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[99999] pointer-events-none"
      style={{ transform: "translate(-100px, -100px)" }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        {/* Atmosphere glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 90,
            height: 90,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.35) 0%, rgba(129,140,248,0.1) 35%, transparent 65%)",
          }}
        />
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          style={{ width: SIZE, height: SIZE, borderRadius: "50%", display: "block" }}
        />
      </div>
    </div>
  );
}
